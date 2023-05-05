FROM nginx

ENV APP_HOST web

ENV APP_PORT 3000

COPY nginx.conf.template /etc/nginx/nginx.conf.template

CMD ["/bin/bash -c", "envsubst < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'"]

EXPOSE 80