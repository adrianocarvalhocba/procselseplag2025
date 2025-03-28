FROM nginx:alpine

RUN mkdir -p /usr/share/nginx/html/procselseplag2025

COPY ./dist/procselseplag2025/browser /usr/share/nginx/html/procselseplag2025

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

RUN chmod -R 755 /usr/share/nginx/html/procselseplag2025
