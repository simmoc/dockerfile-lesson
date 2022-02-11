FROM alpine:3.14
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories && apk update --no-cache
RUN apk add --no-cache php  php-fpm php-zip php-pdo php-mysqli php-curl php-json php-xml php-gd  php-pear  php-imap php-exif php-bcmath php-mbstring nginx
RUN touch /run/nginx/nginx.pid
# nginx 配置放置目录 /etc/nginx/http.d/*.conf
# php.ini 配置路径/etc/php7/php.ini php-fpm.conf 配置路径/etc/php7/php-fpm.conf
COPY ./site.conf /etc/nginx/http.d/default.conf
COPY ./index.php /var/www/index.php

WORKDIR /var/www
# 创建www用户
RUN addgroup -g 1000 -S www && adduser -s /sbin/nologin -S -D -u 1000 -G www www

COPY ./start.sh ./start.sh
RUN chown www:www ./start.sh && \
    chmod +x ./start.sh
ENTRYPOINT ["/bin/sh","/var/www/start.sh"]
EXPOSE 80