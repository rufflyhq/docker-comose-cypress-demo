FROM cypress/base:10

COPY package*.json /cypress/

WORKDIR /cypress

COPY . .

ENV CI=1
RUN npm ci

RUN npx cypress verify

CMD ["npx", "cypress", "run", "--config", "video=false"]
