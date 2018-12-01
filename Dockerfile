# FROM arm32v7/node:10-slim
FROM 10-alpine
RUN apt-get update
ENV TZ=Europe/Helsinki
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "npm", "start" ]
