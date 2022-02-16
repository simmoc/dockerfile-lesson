FROM php:7.4-fpm-alpine3.15
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories && apk update --no-cache
RUN apk add --no-cache php7-zip php7-pdo php7-mysqli php7-curl php7-json php7-xml php7-gd  php7-pear  php7-imap php7-exif php7-bcmath php7-mbstring
RUN docker-php-ext-install pdo_mysql
# nginx 配置放置目录 /etc/nginx/http.d/*.conf
# php.ini 配置路径/etc/php7/php.ini php-fpm.conf 配置路径/etc/php7/php-fpm.conf
WORKDIR /var/www
ADD . .
