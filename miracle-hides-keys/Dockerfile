FROM node:lts-alpine as setup
WORKDIR /app
COPY ./src-server-nest/dist ./src-server-nest/package.json ./src-server-nest/package-lock.json .
RUN npm ci --omit=dev

EXPOSE 3001

CMD ["node", "dist/main"]
