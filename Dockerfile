FROM arm32v7/node:10-slim
WORKDIR /usr/src/app
RUN apt-get update
RUN apt-get install -y python3 python-dev python-pip python-virtualenv && rm -rf /var/lib /apt/lists/*
COPY package*.json ./
RUN npm install node-gyp -g
RUN npm install --quiet
COPY . .
CMD [ "npm", "start" ]
