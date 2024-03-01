-- TODO Task 3

drop schema if exists shop;

create schema if not exists shop;
use shop;

CREATE TABLE orders (
  order_id VARCHAR(26) PRIMARY KEY,
  date DATETIME DEFAULT CURRENT_TIMESTAMP,
  name VARCHAR(128),
  address VARCHAR(256),
  priority BOOLEAN,
  comments TEXT,
  cart JSON,
  
  primary key(order_id)
);


GRANT ALL PRIVILEGES ON shop.* TO 'fred'@'%';
FLUSH PRIVILEGES;

