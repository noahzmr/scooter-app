FROM node:18.12.1

RUN mkdir -p /noerkelit/scooter/ui

COPY . /

WORKDIR /noerkelit/scooter/ui
RUN npm install

CMD ["npm","start"]
