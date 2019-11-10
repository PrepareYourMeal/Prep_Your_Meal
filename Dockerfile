FROM node:10
WORKDIR /usr/src/app
COPY . .
RUN cp config/default.json.example config/default.json
RUN npm install
RUN cd client && npm install && npm run build
CMD npm run server
