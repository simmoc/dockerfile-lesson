FROM alpine:3.14
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories && apk update --no-cache
RUN apk add nodejs npm && npm install pm2 -g
RUN mkdir /var/www 
WORKDIR /var/www
COPY ./package.json /var/www/package.json
RUN npm install 
COPY ./app.js /var/www/app.js
CMD ["node","app.js"]
EXPOSE 3000
