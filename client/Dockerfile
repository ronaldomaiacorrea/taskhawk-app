FROM node:20-alpine

WORKDIR /app/client

# Install specific yarn version
RUN corepack enable && corepack prepare yarn@1.22.22 --activate

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]
