FROM node:6
COPY / /src/
WORKDIR /src/
RUN npm install && npm run build
CMD NODE_ENV=production node server.js
