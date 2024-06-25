FROM node:20.5-alpine AS builder 

RUN mkdir /app && chown node:node /app

WORKDIR /app

USER node

COPY --chown=node:node ./package.json ./package.json
COPY --chown=node:node ./yarn.lock ./yarn.lock

RUN yarn install

COPY --chown=node:node . . 

EXPOSE 3000

CMD ["yarn", "run", "start:dev"]