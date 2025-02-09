FROM node:18

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY .env ./

RUN npm install

COPY src ./src

RUN npx tsc --outDir dist

EXPOSE 3000

CMD ["npm", "run", "start"]