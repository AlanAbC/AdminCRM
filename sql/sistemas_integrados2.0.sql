/*ALTER TABLE `purchases` DROP FOREIGN KEY `fk_purchases_users_1`;
ALTER TABLE `purchases` DROP FOREIGN KEY `fk_purchases_products_1`;
ALTER TABLE `products` DROP FOREIGN KEY `fk_products_products_types_1`;
ALTER TABLE `rate` DROP FOREIGN KEY `fk_rate_users_1`;
ALTER TABLE `rate` DROP FOREIGN KEY `fk_rate_products_1`;

DROP TABLE `users`;
DROP TABLE `products`;
DROP TABLE `purchases`;
DROP TABLE `estadistics`;
DROP TABLE `products_types`;
DROP TABLE `rate`;*/

CREATE TABLE `users` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`name` varchar(50) NULL,
`last_name` varchar(50) NULL,
`nickname` varchar(30) NOT NULL,
`mail` varchar(80) NOT NULL,
`register_date` datetime NOT NULL,
`password` varchar(255) NOT NULL,
`user_type` int(1) NOT NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `products` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`name` varchar(50) NOT NULL,
`description` varchar(255) NULL,
`price` decimal(10,2) NOT NULL,
`stock` int(11) NOT NULL DEFAULT 0,
`type_id` int(11) NULL,
`image` varchar(255) NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `purchases` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`user_id` int(11) NOT NULL,
`product_id` int(11) NOT NULL,
`quantity` int(11) NOT NULL,
`total` decimal(10,2) NOT NULL,
`date_of_purchase` datetime NOT NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `estadistics` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`clients_totals` int(11) NULL,
`purchases_totals` int(11) NULL,
`register_date` datetime NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `products_types` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`name` varchar(20) NOT NULL,
`description` varchar(255) NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `rate` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`user_id` int(11) NOT NULL,
`product_id` int(11) NOT NULL,
`score` int(11) NOT NULL,
`comment` varchar(255) NULL,
PRIMARY KEY (`id`) 
);


ALTER TABLE `purchases` ADD CONSTRAINT `fk_purchases_users_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
ALTER TABLE `purchases` ADD CONSTRAINT `fk_purchases_products_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE RESTRICT;
ALTER TABLE `products` ADD CONSTRAINT `fk_products_products_types_1` FOREIGN KEY (`type_id`) REFERENCES `products_types` (`id`);
ALTER TABLE `rate` ADD CONSTRAINT `fk_rate_users_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
ALTER TABLE `rate` ADD CONSTRAINT `fk_rate_products_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

