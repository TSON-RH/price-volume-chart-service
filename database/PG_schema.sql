CREATE TABLE stock_info (
  id integer PRIMARY KEY,
  symbol varchar(80),
  lowest numeric,
  highest numeric,
  average_price numeric,
  current_price numeric
);

CREATE TABLE stock_history (
  stock_id integer REFERENCES stock_info (id),
  week integer,
  price numeric,
  volume numeric,
  PRIMARY KEY (stock_id, week)
);