# Build App
FROM node:12.13 AS build

COPY package*.json /app/

WORKDIR /app

RUN npm install

COPY . .
RUN rm -rf ./server

ARG REACT_APP_API_BASE_URL

RUN npm run build

# Build Server
FROM node:12.13

COPY server/package*.json /server/

WORKDIR /server

RUN npm install

COPY ./server ./

COPY --from=build /app/build /server/build

ENV PORT=8080
EXPOSE 8080

CMD ["npm", "start"]
