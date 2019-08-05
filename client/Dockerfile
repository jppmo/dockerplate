FROM node:8.7.0-alpine

RUN mkdir -p /srv/craapp/
WORKDIR /srv/craapp/

COPY package.json /srv/craapp/
COPY package-lock.json /srv/craapp/

RUN npm install

COPY . /srv/craapp/

CMD ["npm", "start"]