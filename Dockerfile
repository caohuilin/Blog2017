FROM node:10
COPY / /src/
WORKDIR /src/
RUN find .
RUN npm install && npm run build
CMD NODE_ENV=production node server.js
