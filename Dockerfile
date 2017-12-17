FROM node:6
COPY / /src/
WORKDIR /src/
CMD NODE_ENV=production node server.js
