FROM php:7.0-alpine

RUN mkdir -p /home/winpc/test/laravelApp/app
WORKDIR /home/winpc/test/laravelApp/app

RUN   apk update \
	&&   apk add ca-certificates wget \
	&&   update-ca-certificates   
# Install composer:
RUN wget https://raw.githubusercontent.com/composer/getcomposer.org/1b137f8bf6db3e79a38a5bc45324414a6b1f9df2/web/installer -O - -q | php -- --quiet
RUN mv composer.phar /usr/local/bin/composer

COPY composer.json /home/winpc/test/laravelApp/app
RUN composer install

COPY . /home/winpc/test/laravelApp/app

CMD php artisan serve --host=0.0.0.0 --port=8181
EXPOSE 8181
