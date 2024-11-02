FROM oven/bun:1

WORKDIR /app/server

COPY package*.json ./
COPY bun.lockb ./

RUN bun install

COPY . .

EXPOSE 3030

CMD ["bun", "--watch", "src/index.ts"]
