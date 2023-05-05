FROM node:alpine

# ENV POSTGRES_HOST postgres
# ENV POSTGRES_PORT 5432
# ENV POSTGRES_PASSWORD docker
# ENV POSTGRES_DB user
# ENV POSTGRES_USER postgres

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
