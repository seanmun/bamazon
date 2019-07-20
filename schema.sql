DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  primary key(item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Raspberry Pi 3 Model B Board", "Computers", 34.95, 50),
  ("Raspberry Pi 10 Inch Touch Screen", "Computers", 125.99, 50),
  ("Miuzei Raspberry Pi 3 B+ Case", "Computers", 9.95, 50),
  ("Raspberry Pi 4b Fan", "Computers", 7.95, 25),
  ("18-Piece Square Kitchen Dinnerware Set", "Kitchen", 39.25, 100),
  ("Ironwood Gourmet 28101 Fort Worth Steak Plate", "Kitchen", 20.20, 100),
  ("Wall Mounted Wine Rack", "Kitchen", 29.00, 200),
  ("LED Lantern", "House", 85.50, 5),
  ("Plant Holder", "Garden", 30.50, 100),
  ("Brussel's Bonsai ", "Garden", 19.95, 1);
