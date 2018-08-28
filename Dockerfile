# FROM arm32v7/node:10-slim
FROM node:10.4-jessie
WORKDIR /usr/src/app
RUN apt-get update
RUN apt-get install -y python3 python-dev python-pip python-virtualenv && rm -rf /var/lib /apt/lists/*
ENV TZ=Europe/Helsinki
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
COPY package*.json ./
# RUN npm install node-gyp -g --quiet
RUN npm install --quiet

COPY . .
CMD [ "npm", "start" ]
