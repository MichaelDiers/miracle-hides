FROM node:lts-alpine as server
WORKDIR /app
COPY miracle-hides-tabletop-server/package.json miracle-hides-tabletop-server/package-lock.json .
RUN npm install
COPY miracle-hides-tabletop-server .
RUN npm run build

FROM node:lts-alpine as client
WORKDIR /app
COPY miracle-hides-tabletop-client/package.json miracle-hides-tabletop-client/package-lock.json .
RUN npm install
COPY miracle-hides-tabletop-client .
RUN npm run build

FROM node:lts-alpine
WORKDIR /app
COPY --from=server /app .
COPY --from=client /app/build/. ./client

ENV NODE_ENV=production
EXPOSE 3000
