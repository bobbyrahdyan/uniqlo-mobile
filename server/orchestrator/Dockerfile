FROM node:16.13

WORKDIR /usr/local/orchestrator

ENV PORT=4000

COPY package.json package-lock.json /usr/local/orchestrator/

RUN npm install && npm cache clean --force

RUN npm install -g nodemon

COPY ./ ./

CMD ["npm", "run", "start"]
