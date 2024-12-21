/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */

import path from 'path';
import { fileURLToPath } from 'url';
import * as deepl from 'deepl-node';
import dotenv from 'dotenv';
import fs from 'fs-extra';
import simpleGit from 'simple-git';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const authKey = import.meta.env.VITE_DEEPL_API_KEY;
const translator = new deepl.Translator(authKey);
const localesPath = path.join(__dirname, 'src', 'locales');

// Confirmed DeepL target languages
const languageMap = {
  'pt-br.json': 'pt-BR',
  'es.json': 'es',
  'fr.json': 'fr-CA',
  'zh.json': 'zh',
};

async function deepLTranslate(text, targetLang) {
  const result = await translator.translateText(text, null, targetLang);
  return result.text;
}

const translateKeys = async (text, targetLang) => {
  try {
    return await deepLTranslate(text, targetLang);
  } catch (error) {
    console.error(`Error translating "${text}" to ${targetLang}:`, error);
    return text;
  }
};

const mergeAndTranslate = async (englishObj, targetObj, targetLang) => {
  for (const key in englishObj) {
    if (typeof englishObj[key] === 'object' && englishObj[key] !== null) {
      if (!targetObj[key]) {
        targetObj[key] = {};
      }
      await mergeAndTranslate(englishObj[key], targetObj[key], targetLang);
    } else {
      if (!targetObj[key]) {
        targetObj[key] = await translateKeys(englishObj[key], targetLang);
      }
    }
  }
};

const pruneExtraKeys = (englishObj, targetObj) => {
  for (const key in targetObj) {
    if (!(key in englishObj)) {
      delete targetObj[key];
    } else if (
      typeof targetObj[key] === 'object' &&
      typeof englishObj[key] === 'object'
    ) {
      pruneExtraKeys(englishObj[key], targetObj[key]);
    }
  }
};

const getStagedLocaleFiles = async () => {
  const git = simpleGit();
  const status = await git.status();
  return status.staged.filter(
    (file) => file.endsWith('.json') && file.includes('locales/'),
  );
};

const syncTranslations = async () => {
  const stagedFiles = await getStagedLocaleFiles();

  console.log('📚 Checking staged locale files...');

  const englishFile = stagedFiles.find((file) => file.includes('en.json'));
  if (!englishFile) {
    console.log('No changes detected in en.json. Skipping...');
    return;
  }

  const englishFilePath = path.join(localesPath, 'en.json');
  const englishContent = await fs.readJson(englishFilePath);

  console.log('✅ Changes detected in en.json. Updating target languages...');

  for (const [langFile, targetLang] of Object.entries(languageMap)) {
    const filePath = path.join(localesPath, langFile);

    let targetContent = {};
    try {
      targetContent = await fs.readJson(filePath);
    } catch (error) {
      console.warn(
        `${filePath} not found. Creating a new file for ${targetLang}.`,
      );
      targetContent = {};
    }

    await mergeAndTranslate(englishContent, targetContent, targetLang);
    pruneExtraKeys(englishContent, targetContent);

    await fs.writeJson(filePath, targetContent, { spaces: 2 });
    const git = simpleGit();
    await git.add(filePath);
  }

  console.log('Translation sync completed.');
};

syncTranslations().catch(console.error);
