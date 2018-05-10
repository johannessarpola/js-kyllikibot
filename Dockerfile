FROM arm32v7/node:10-slim
WORKDIR /usr/src/app
COPY package*.json ./
RUN apt-get update
RUN apt-get install -y python3 python-dev python-pip python-virtualenv && rm -rf /var/lib /apt/lists/*
RUN npm install --quiet node-gyp -g
COPY . .
CMD [ "npm", "start" ]
