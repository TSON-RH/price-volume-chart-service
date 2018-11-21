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
  volume integer,
  PRIMARY KEY (stock_id, week)
);

-- trying for faster load
CREATE TABLE stock_history (
  stock_id integer,
  week integer,
  price numeric,
  volume integer
);

CREATE UNIQUE INDEX symbol_idx ON stock_info (symbol);

ALTER TABLE stock_history ADD CONSTRAINT stock_idfd FOREIGN KEY (stock_id) REFERENCES stock_info (id)