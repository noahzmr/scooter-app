FROM node:18.12.1

RUN mkdir -p /noerkelit/scooter/backend

COPY . /

WORKDIR /noerkelit/scooter/backend
RUN npm install

CMD ["npm","start"]
