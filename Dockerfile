FROM node:20-alpine

LABEL authors="ddung203"

WORKDIR /app

COPY yarn.lock ./

COPY . .

RUN yarn

ENV NODE_ENV production

CMD [ "yarn", "start" ]

EXPOSE 3001