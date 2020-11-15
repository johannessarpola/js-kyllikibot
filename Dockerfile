# FROM arm32v7/node:10-slim
FROM node:15-alpine
ENV TZ=Europe/Helsinki
ENV DISCORD_BOT_TOKEN=$DISCORD_BOT_TOKEN
ENV DISCORD_OWNER_ID=$DISCORD_OWNER_ID
ENV GOOGLE_CALENDAR_ID=$GOOGLE_CALENDAR_ID
ENV GOOGLE_SERVICE_ACCOUNT=$GOOGLE_SERVICE_ACCOUNT
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "npm", "start" ]
