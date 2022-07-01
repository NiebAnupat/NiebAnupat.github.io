FROM node:16.15.1

RUN npm install && npm run build

ARG PORT=3000
EXPOSE $PORT
ENV PORT ${PORT:-3000}
CMD [ "npm", "start" ]