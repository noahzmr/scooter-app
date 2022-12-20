FROM node:18.12.1

RUN mkdir -p /noerkelit/scooter/scooter

COPY . /

WORKDIR /noerkelit/scooter/scooter
RUN npm install

CMD ["npm","start"]
