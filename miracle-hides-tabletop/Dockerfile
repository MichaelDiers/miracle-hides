FROM node:lts-alpine as server
WORKDIR /app
COPY miracle-hides-tabletop-server/package.json miracle-hides-tabletop-server/package-lock.json ./
RUN npm install
COPY miracle-hides-tabletop-server .
RUN npm run build

FROM node:lts-alpine as client
WORKDIR /app
COPY miracle-hides-tabletop-client/package.json miracle-hides-tabletop-client/package-lock.json ./
RUN npm install
COPY miracle-hides-tabletop-client .
RUN npm run build

FROM node:lts-alpine
WORKDIR /app
COPY --from=server /app .
COPY --from=client /app/build/. ./client

ENV NODE_ENV=production
ENV MH_PROJECT_NAME=miracle-hides
ENV REACT_APP_MH_HOUSE_RULES_URL=/api/house-rules
ENV REACT_APP_MH_LANGUAGES_URL=/api/languages
ENV REACT_APP_MH_TRANSLATIONS_URL=/api/translations
ENV REACT_APP_MH_SIGN_IN_URL=/api/sign-in
ENV REACT_APP_MH_SIGN_UP_URL=/api/sign-up

EXPOSE 3000
CMD ["node", "dist/main"]
