import { i18n as I18nType } from "i18next";
import { useTranslation as useI18NextTranslation } from "react-i18next";
import type enTranslations from "../locales/en.json";

type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: TObj[TKey] extends object
    ? `${TKey & string}.${RecursiveKeyOf<TObj[TKey]>}`
    : TKey & string;
}[keyof TObj & (string | number)];

export type TranslationKeys = RecursiveKeyOf<typeof enTranslations>;

export type TFunction = (
  _key: TranslationKeys,
  _params?: {[key: string]: string | number },
) => string;

export const useTranslations = (): {
  t: TFunction;
  i18n: I18nType;
} => {
  const { t: originalT, i18n } = useI18NextTranslation();

  const t: TFunction = (
    key: TranslationKeys,
    params?: {[key: string]: string | number },
  ) => originalT(key, params);

  return { t, i18n };
};
