DROP TABLE IF EXISTS users;
CREATE TABLE users (
  user_id serial PRIMARY KEY,
  username VARCHAR ( 50 ) UNIQUE NOT NULL
);

INSERT INTO users(username)
VALUES('user');