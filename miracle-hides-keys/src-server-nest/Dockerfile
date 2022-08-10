FROM node:lts-alpine as setup
WORKDIR /app
COPY ./dist ./package.json ./package-lock.json .
RUN npm ci --omit=dev

EXPOSE 3001

CMD ["node", "dist/main"]
