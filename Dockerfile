FROM node:16-alpine3.11
WORKDIR /usr/4-tram-service
COPY . .
RUN npm install
RUN adduser -D appuser
RUN chown appuser: /usr/4-tram-service
RUN chmod a+x /usr/4-tram-service
USER appuser
EXPOSE 3000
CMD npm start
