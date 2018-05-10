FROM arm32v7/node:10-slim
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --quiet
COPY . .
CMD [ "npm", "start" ]