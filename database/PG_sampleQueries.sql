-- postgres queries to measure execution times
-- \timing to turn on timing measurement

SELECT id, symbol, lowest, average_price, current_price, week, price, volume 
FROM stock_info INNER JOIN stock_history
ON (stock_info.id=stock_history.stock_id)
WHERE 
id = 9999990
AND (week >= 1 AND week < 10)


SELECT id, symbol, lowest, average_price, current_price, week, price, volume 
FROM stock_info, stock_history
WHERE 
id = 9999990
AND (week >= 1 AND week < 10)
AND stock_info.id=stock_history.stock_id

SELECT id, symbol, lowest, average_price, current_price, week, price, volume 
FROM stock_info, stock_history
WHERE 
id = 9
AND (week >= 1 AND week < 10)
AND stock_info.id=stock_history.stock_id


-- queries by stock_symbol
SELECT id, symbol, lowest, average_price, current_price, week, price, volume 
FROM stock_info INNER JOIN stock_history
ON (stock_info.id=stock_history.stock_id)
WHERE 
symbol ='VWYXJ'
AND (week >= 1 AND week < 10)


SELECT id, symbol, lowest, average_price, current_price, week, price, volume 
FROM stock_info, stock_history
WHERE 
symbol ='VWYXJ'
AND (week >= 1 AND week < 10)
AND stock_info.id=stock_history.stock_id

-- insert new history or new stock
INSERT INTO stock_history VALUES
(9999990, 10, 55.25, 55);

INSERT INTO stock_info VALUES
(10000000, 'VWYXK', 5.12, 14.22, 10.00, 10.00);

-- update stock history of existing stock
update stock_info SET average = 25 WHERE id=9999990;
;



