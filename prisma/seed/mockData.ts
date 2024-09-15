import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const splitSql = (sql: string) => {
  return sql.split(';').filter(content => content.trim() !== '')
}

async function main() {
  const sql = `

INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('5bcf1c78-5dbf-49c3-95c6-f202e0f119c6', '1Myriam.McClure@yahoo.com', 'Bob Brown', 'https://i.imgur.com/YfJQV5z.png?id=3', 'inv012jkl', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('61a0315b-a112-49de-b5fa-3a8a11066713', '10Annie.Hettinger@gmail.com', 'Bob Brown', 'https://i.imgur.com/YfJQV5z.png?id=12', 'inv456def', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('0cf00b9d-32b1-4454-aca2-bf6a7d2c7379', '19Elroy.OConner16@gmail.com', 'Alice Jones', 'https://i.imgur.com/YfJQV5z.png?id=21', 'inv012jkl', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('bb719bba-58fb-4083-a167-dce77575d63b', '28Carrie.OKon20@hotmail.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=30', 'inv456def', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('c1823de5-9981-48ef-96e6-06baa44cfaa2', '37Manley_Gleichner39@yahoo.com', 'Charlie Davis', 'https://i.imgur.com/YfJQV5z.png?id=39', 'inv123abc', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('b56f74d4-9ca4-4e23-8356-dd20541700c9', '46Jordy93@hotmail.com', 'Bob Brown', 'https://i.imgur.com/YfJQV5z.png?id=48', 'inv456def', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('0d123034-6bef-4a10-ac8d-0e70fb980b49', '55Kaylee_Dach@gmail.com', 'Bob Brown', 'https://i.imgur.com/YfJQV5z.png?id=57', 'inv789ghi', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('faaed65c-42f1-4875-8bf8-472ab2472c3e', '73Ebony39@gmail.com', 'Charlie Davis', 'https://i.imgur.com/YfJQV5z.png?id=75', 'inv012jkl', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('d87d68d0-2e59-46e4-a304-8bfee0298094', '82Lindsey52@hotmail.com', 'Bob Brown', 'https://i.imgur.com/YfJQV5z.png?id=84', 'inv345mno', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "Category" ("id", "name", "description") VALUES ('bb0dbec2-d866-4d68-9fef-979e4576d82e', 'Clothing', 'Latest gadgets and electronic devices');
INSERT INTO "Category" ("id", "name", "description") VALUES ('db486c47-f6bc-4ae7-9de9-47961cf75dbc', 'Clothing', 'Wide range of books from various genres');
INSERT INTO "Category" ("id", "name", "description") VALUES ('7adbf7eb-848c-4fd1-882c-225a35614649', 'Electronics', 'Fashionable clothing for men women and children');
INSERT INTO "Category" ("id", "name", "description") VALUES ('1024f2ae-16fc-4e22-98e1-c42d9440ebf0', 'Sports  Outdoors', 'Equipment and gear for outdoor activities and sports');
INSERT INTO "Category" ("id", "name", "description") VALUES ('d9843615-403e-4d6b-912b-6c4fd7f2c102', 'Clothing', 'Latest gadgets and electronic devices');
INSERT INTO "Category" ("id", "name", "description") VALUES ('82267445-ac99-429f-a5d9-fc556af1b543', 'Books', 'Essentials and decor for your home and kitchen');
INSERT INTO "Category" ("id", "name", "description") VALUES ('4f00b125-05a2-4414-b1ab-e65589bc74f8', 'Clothing', 'Latest gadgets and electronic devices');
INSERT INTO "Category" ("id", "name", "description") VALUES ('903cd7bd-39cb-4da7-bcb8-52920576e1c2', 'Home  Kitchen', 'Latest gadgets and electronic devices');
INSERT INTO "Category" ("id", "name", "description") VALUES ('2f240527-4e3c-408e-989a-2bddcd71759d', 'Clothing', 'Essentials and decor for your home and kitchen');
INSERT INTO "Category" ("id", "name", "description") VALUES ('b3e964a0-d665-44e5-bbc8-9e06749559fd', 'Electronics', 'Latest gadgets and electronic devices');

INSERT INTO "Product" ("id", "name", "description", "price", "stock", "imageUrl", "categoryId") VALUES ('0c6daa6c-065e-4aad-a921-a4700e5f9814', 'Gaming Laptop', 'Highquality wireless headphones with noise cancellation', '249.99', 847, 'https://i.imgur.com/YfJQV5z.png?id=125', '1024f2ae-16fc-4e22-98e1-c42d9440ebf0');
INSERT INTO "Product" ("id", "name", "description", "price", "stock", "imageUrl", "categoryId") VALUES ('cf2f01be-16e5-4e98-ad4e-9efc38256c0f', 'Wireless Headphones', 'Portable Bluetooth speaker with excellent sound quality', '199.99', 916, 'https://i.imgur.com/YfJQV5z.png?id=131', 'd9843615-403e-4d6b-912b-6c4fd7f2c102');
INSERT INTO "Product" ("id", "name", "description", "price", "stock", "imageUrl", "categoryId") VALUES ('1bdfc665-e174-4186-bba1-48d31347f039', 'Smartphone', 'Latest model smartphone with advanced features', '199.99', 450, 'https://i.imgur.com/YfJQV5z.png?id=137', '903cd7bd-39cb-4da7-bcb8-52920576e1c2');
INSERT INTO "Product" ("id", "name", "description", "price", "stock", "imageUrl", "categoryId") VALUES ('75f46f02-2efd-41ce-ae47-e98639207b89', 'Bluetooth Speaker', 'Portable Bluetooth speaker with excellent sound quality', '249.99', 109, 'https://i.imgur.com/YfJQV5z.png?id=143', '2f240527-4e3c-408e-989a-2bddcd71759d');
INSERT INTO "Product" ("id", "name", "description", "price", "stock", "imageUrl", "categoryId") VALUES ('22162678-c0b4-4a30-b9fa-54b03fee269f', 'Smartphone', 'Latest model smartphone with advanced features', '799.99', 284, 'https://i.imgur.com/YfJQV5z.png?id=149', '1024f2ae-16fc-4e22-98e1-c42d9440ebf0');
INSERT INTO "Product" ("id", "name", "description", "price", "stock", "imageUrl", "categoryId") VALUES ('54333254-253c-4f7b-b11c-ed3497d4348d', 'Bluetooth Speaker', 'Powerful gaming laptop with highend graphics', '799.99', 301, 'https://i.imgur.com/YfJQV5z.png?id=155', '7adbf7eb-848c-4fd1-882c-225a35614649');
INSERT INTO "Product" ("id", "name", "description", "price", "stock", "imageUrl", "categoryId") VALUES ('af533010-de8f-4563-8473-727acfeca919', 'Smartwatch', 'Powerful gaming laptop with highend graphics', '249.99', 452, 'https://i.imgur.com/YfJQV5z.png?id=161', '1024f2ae-16fc-4e22-98e1-c42d9440ebf0');
INSERT INTO "Product" ("id", "name", "description", "price", "stock", "imageUrl", "categoryId") VALUES ('e9954d8e-bb14-45c4-866f-4b671a32ee95', 'Bluetooth Speaker', 'Portable Bluetooth speaker with excellent sound quality', '1299.99', 479, 'https://i.imgur.com/YfJQV5z.png?id=167', '1024f2ae-16fc-4e22-98e1-c42d9440ebf0');
INSERT INTO "Product" ("id", "name", "description", "price", "stock", "imageUrl", "categoryId") VALUES ('a226bc6a-496f-4273-85ca-b9f5a5ba6be3', 'Smartwatch', 'Latest model smartphone with advanced features', '199.99', 884, 'https://i.imgur.com/YfJQV5z.png?id=173', '2f240527-4e3c-408e-989a-2bddcd71759d');
INSERT INTO "Product" ("id", "name", "description", "price", "stock", "imageUrl", "categoryId") VALUES ('79e9b254-aaff-4c45-aca3-12a4bfac4d53', 'Smartphone', 'Powerful gaming laptop with highend graphics', '59.99', 84, 'https://i.imgur.com/YfJQV5z.png?id=179', '2f240527-4e3c-408e-989a-2bddcd71759d');

INSERT INTO "Cart" ("id", "userId") VALUES ('cd315e4f-82c4-402e-a5f3-4789932ffcbf', 'c1823de5-9981-48ef-96e6-06baa44cfaa2');
INSERT INTO "Cart" ("id", "userId") VALUES ('40fdcb58-c3de-4a47-9fce-c87311988979', 'c1823de5-9981-48ef-96e6-06baa44cfaa2');
INSERT INTO "Cart" ("id", "userId") VALUES ('f37d9500-590f-4c30-ac32-49b94779b0bf', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Cart" ("id", "userId") VALUES ('e8b53956-59f0-4964-818f-f4ed53fcde14', '0d123034-6bef-4a10-ac8d-0e70fb980b49');
INSERT INTO "Cart" ("id", "userId") VALUES ('c28be5de-2935-4ca8-8d4b-05c71db9d5b9', '0d123034-6bef-4a10-ac8d-0e70fb980b49');
INSERT INTO "Cart" ("id", "userId") VALUES ('9ad8f5d2-8e74-4665-8981-5ca1942d4bac', '61a0315b-a112-49de-b5fa-3a8a11066713');
INSERT INTO "Cart" ("id", "userId") VALUES ('a5363f7a-44dd-49ad-8c78-9cac9ecd4d27', 'faaed65c-42f1-4875-8bf8-472ab2472c3e');
INSERT INTO "Cart" ("id", "userId") VALUES ('905ecb2c-21f7-4684-bac4-b64b3dd73add', '0cf00b9d-32b1-4454-aca2-bf6a7d2c7379');
INSERT INTO "Cart" ("id", "userId") VALUES ('4f31be7a-b0c4-4117-a19e-77d490b1c7c6', '0d123034-6bef-4a10-ac8d-0e70fb980b49');
INSERT INTO "Cart" ("id", "userId") VALUES ('c47db8e7-928d-4296-9042-d65a6e0f54ff', '0d123034-6bef-4a10-ac8d-0e70fb980b49');

INSERT INTO "CartItem" ("id", "quantity", "cartId", "productId") VALUES ('f9b183e4-85df-4b53-b3f7-9e692a171497', 938, '4f31be7a-b0c4-4117-a19e-77d490b1c7c6', '75f46f02-2efd-41ce-ae47-e98639207b89');
INSERT INTO "CartItem" ("id", "quantity", "cartId", "productId") VALUES ('82b46b4e-8b25-4166-8746-943135236e78', 371, '4f31be7a-b0c4-4117-a19e-77d490b1c7c6', '75f46f02-2efd-41ce-ae47-e98639207b89');
INSERT INTO "CartItem" ("id", "quantity", "cartId", "productId") VALUES ('2df138cd-475a-4e5a-bd63-cd856b67d337', 758, '905ecb2c-21f7-4684-bac4-b64b3dd73add', 'e9954d8e-bb14-45c4-866f-4b671a32ee95');
INSERT INTO "CartItem" ("id", "quantity", "cartId", "productId") VALUES ('5f1ad20f-b9d6-4216-ac0f-2243d0d62610', 21, 'e8b53956-59f0-4964-818f-f4ed53fcde14', '75f46f02-2efd-41ce-ae47-e98639207b89');
INSERT INTO "CartItem" ("id", "quantity", "cartId", "productId") VALUES ('dcdd20f4-0967-4a68-8440-a8e749cfa69e', 251, '40fdcb58-c3de-4a47-9fce-c87311988979', 'a226bc6a-496f-4273-85ca-b9f5a5ba6be3');
INSERT INTO "CartItem" ("id", "quantity", "cartId", "productId") VALUES ('8be018f7-905e-4396-8ca4-7c295f6619e0', 771, 'c28be5de-2935-4ca8-8d4b-05c71db9d5b9', '0c6daa6c-065e-4aad-a921-a4700e5f9814');
INSERT INTO "CartItem" ("id", "quantity", "cartId", "productId") VALUES ('604d55b6-31cf-4944-b1e3-bfbf305cf42a', 536, '4f31be7a-b0c4-4117-a19e-77d490b1c7c6', 'af533010-de8f-4563-8473-727acfeca919');
INSERT INTO "CartItem" ("id", "quantity", "cartId", "productId") VALUES ('ee06976a-9071-4ef3-af6b-4dd993b934c5', 303, 'cd315e4f-82c4-402e-a5f3-4789932ffcbf', 'e9954d8e-bb14-45c4-866f-4b671a32ee95');
INSERT INTO "CartItem" ("id", "quantity", "cartId", "productId") VALUES ('c33840bf-673f-4e50-b1c7-3d512bc6189e', 872, '40fdcb58-c3de-4a47-9fce-c87311988979', '75f46f02-2efd-41ce-ae47-e98639207b89');
INSERT INTO "CartItem" ("id", "quantity", "cartId", "productId") VALUES ('cd3fcb5f-d985-42e7-8140-a30f672ce513', 481, 'a5363f7a-44dd-49ad-8c78-9cac9ecd4d27', '1bdfc665-e174-4186-bba1-48d31347f039');

INSERT INTO "Order" ("id", "totalAmount", "status", "userId") VALUES ('35d0d05f-3d52-4025-9546-f72a646c6869', '15.75', 'Cancelled', 'c1823de5-9981-48ef-96e6-06baa44cfaa2');
INSERT INTO "Order" ("id", "totalAmount", "status", "userId") VALUES ('2111fc05-cd66-4478-a520-9ba97c4a4d5b', '120.50', 'Pending', '0cf00b9d-32b1-4454-aca2-bf6a7d2c7379');
INSERT INTO "Order" ("id", "totalAmount", "status", "userId") VALUES ('8cc9bfe0-9bc1-4ce8-9292-6681fbc510be', '15.75', 'Shipped', 'bb719bba-58fb-4083-a167-dce77575d63b');
INSERT INTO "Order" ("id", "totalAmount", "status", "userId") VALUES ('79cd6127-02bf-47e7-b6d6-9a306d9fefc4', '15.75', 'Delivered', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Order" ("id", "totalAmount", "status", "userId") VALUES ('0a3973da-d256-4c3f-89e1-690ec9eea56c', '120.50', 'Shipped', '61a0315b-a112-49de-b5fa-3a8a11066713');
INSERT INTO "Order" ("id", "totalAmount", "status", "userId") VALUES ('e8ebede8-7351-4e16-8e32-e0ef27cf22f3', '200.00', 'Shipped', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Order" ("id", "totalAmount", "status", "userId") VALUES ('4eff601a-c586-46f7-a9a4-3d5cdb7fd733', '120.50', 'Delivered', '61a0315b-a112-49de-b5fa-3a8a11066713');
INSERT INTO "Order" ("id", "totalAmount", "status", "userId") VALUES ('38c76d50-f681-4f5f-bd16-ce623b74f7d8', '15.75', 'Processing', '0cf00b9d-32b1-4454-aca2-bf6a7d2c7379');
INSERT INTO "Order" ("id", "totalAmount", "status", "userId") VALUES ('08154f28-b709-4d5f-9f58-eb5a12d08b23', '120.50', 'Pending', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Order" ("id", "totalAmount", "status", "userId") VALUES ('6eeef9ba-f0cf-4484-855e-6047af285c5c', '200.00', 'Shipped', 'faaed65c-42f1-4875-8bf8-472ab2472c3e');

INSERT INTO "OrderItem" ("id", "quantity", "price", "orderId", "productId") VALUES ('510ec5dc-c4d4-4eb2-bc9e-8eb59b717a4a', 596, '22.30', '2111fc05-cd66-4478-a520-9ba97c4a4d5b', 'e9954d8e-bb14-45c4-866f-4b671a32ee95');
INSERT INTO "OrderItem" ("id", "quantity", "price", "orderId", "productId") VALUES ('04166606-5ce5-457b-918e-bd843f269c0e', 511, '22.30', '6eeef9ba-f0cf-4484-855e-6047af285c5c', '0c6daa6c-065e-4aad-a921-a4700e5f9814');
INSERT INTO "OrderItem" ("id", "quantity", "price", "orderId", "productId") VALUES ('854e6ebe-7e04-48da-baa1-3432ce9aaf50', 214, '19.99', '79cd6127-02bf-47e7-b6d6-9a306d9fefc4', 'e9954d8e-bb14-45c4-866f-4b671a32ee95');
INSERT INTO "OrderItem" ("id", "quantity", "price", "orderId", "productId") VALUES ('d53304a2-47fe-496b-a605-f23b8f5187c3', 262, '22.30', '8cc9bfe0-9bc1-4ce8-9292-6681fbc510be', '0c6daa6c-065e-4aad-a921-a4700e5f9814');
INSERT INTO "OrderItem" ("id", "quantity", "price", "orderId", "productId") VALUES ('304d4f0e-50e6-4a05-8c81-e7e698f53039', 245, '22.30', '4eff601a-c586-46f7-a9a4-3d5cdb7fd733', 'e9954d8e-bb14-45c4-866f-4b671a32ee95');
INSERT INTO "OrderItem" ("id", "quantity", "price", "orderId", "productId") VALUES ('07444951-ce2f-48ed-aa01-53efbfbd58ef', 128, '19.99', '38c76d50-f681-4f5f-bd16-ce623b74f7d8', 'cf2f01be-16e5-4e98-ad4e-9efc38256c0f');
INSERT INTO "OrderItem" ("id", "quantity", "price", "orderId", "productId") VALUES ('6864da5e-37b9-4bf7-b1ec-c0655893c5ab', 180, '35.50', '4eff601a-c586-46f7-a9a4-3d5cdb7fd733', 'a226bc6a-496f-4273-85ca-b9f5a5ba6be3');
INSERT INTO "OrderItem" ("id", "quantity", "price", "orderId", "productId") VALUES ('8213c202-a908-4f47-a4dc-42dc5106f1f1', 490, '22.30', 'e8ebede8-7351-4e16-8e32-e0ef27cf22f3', 'e9954d8e-bb14-45c4-866f-4b671a32ee95');
INSERT INTO "OrderItem" ("id", "quantity", "price", "orderId", "productId") VALUES ('e69a7ce3-bc5a-4893-8ffa-bf340859dc4b', 328, '22.30', '08154f28-b709-4d5f-9f58-eb5a12d08b23', '22162678-c0b4-4a30-b9fa-54b03fee269f');
INSERT INTO "OrderItem" ("id", "quantity", "price", "orderId", "productId") VALUES ('56e8d164-4fa2-4ccd-a9f3-eb7ab6cfb9aa', 97, '35.50', '8cc9bfe0-9bc1-4ce8-9292-6681fbc510be', '22162678-c0b4-4a30-b9fa-54b03fee269f');

INSERT INTO "Coupon" ("id", "code", "discountPercentage", "validFrom", "validTo") VALUES ('e1c11606-c3d1-4d7c-8f22-62e8efd055b8', 'HOLIDAY25', '15', '2024-11-30T04:12:33.236Z', '2025-02-09T10:06:29.264Z');
INSERT INTO "Coupon" ("id", "code", "discountPercentage", "validFrom", "validTo") VALUES ('66bb7d1e-d9bc-44b2-a0b0-26be3c41a484', 'SPRING30', '30', '2025-03-30T07:17:05.162Z', '2024-01-31T13:30:38.768Z');
INSERT INTO "Coupon" ("id", "code", "discountPercentage", "validFrom", "validTo") VALUES ('33ae8b8d-23a0-4976-9977-7fedef48211c', 'SPRING30', '20', '2025-01-26T22:23:52.484Z', '2025-01-15T11:50:49.536Z');
INSERT INTO "Coupon" ("id", "code", "discountPercentage", "validFrom", "validTo") VALUES ('a4361e29-318a-4fb4-ae94-95e719f0eedd', 'WELCOME20', '15', '2023-10-05T05:33:27.967Z', '2024-04-14T15:36:52.525Z');
INSERT INTO "Coupon" ("id", "code", "discountPercentage", "validFrom", "validTo") VALUES ('35842e33-207f-4451-843d-ecadc8dc3628', 'SAVE10', '15', '2023-10-17T21:34:55.480Z', '2024-01-20T05:15:09.738Z');
INSERT INTO "Coupon" ("id", "code", "discountPercentage", "validFrom", "validTo") VALUES ('950cf8e6-da84-4f1b-85b3-3fe6b4aa80a9', 'WELCOME20', '20', '2025-08-31T13:17:13.853Z', '2024-03-23T08:07:35.091Z');
INSERT INTO "Coupon" ("id", "code", "discountPercentage", "validFrom", "validTo") VALUES ('e5d50dd6-4bc8-4d1a-b41f-9e59797d5b2e', 'SPRING30', '15', '2024-10-03T21:13:37.334Z', '2025-07-18T05:35:09.851Z');
INSERT INTO "Coupon" ("id", "code", "discountPercentage", "validFrom", "validTo") VALUES ('68ea7ad6-c0ea-4ee9-bddd-a7485cef79d4', 'FALLSALE15', '15', '2024-10-14T21:46:58.365Z', '2023-09-23T11:02:25.749Z');
INSERT INTO "Coupon" ("id", "code", "discountPercentage", "validFrom", "validTo") VALUES ('d45977a0-4595-4b88-ab78-0780528176b5', 'FALLSALE15', '25', '2025-01-16T04:20:59.392Z', '2024-07-24T07:26:00.347Z');
INSERT INTO "Coupon" ("id", "code", "discountPercentage", "validFrom", "validTo") VALUES ('6f96f49b-f95b-453c-8c90-fb058648fb63', 'SAVE10', '15', '2025-08-22T13:29:40.995Z', '2024-12-28T14:17:42.298Z');

INSERT INTO "RewardPoint" ("id", "points", "expiryDate", "userId") VALUES ('1f454003-43ea-41e5-8ae0-5d62c9d2e9a3', 814, '2024-02-15T20:37:33.425Z', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "RewardPoint" ("id", "points", "expiryDate", "userId") VALUES ('175121ca-3a52-4c94-a955-70669501eb6b', 885, '2023-11-17T03:25:41.830Z', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "RewardPoint" ("id", "points", "expiryDate", "userId") VALUES ('cbfbfef7-d611-438d-950d-95348256846c', 519, '2024-06-24T23:37:15.916Z', 'd87d68d0-2e59-46e4-a304-8bfee0298094');
INSERT INTO "RewardPoint" ("id", "points", "expiryDate", "userId") VALUES ('6f087f25-e9e7-4089-8ee7-0dad4653c41a', 746, '2024-04-25T22:53:29.848Z', '5bcf1c78-5dbf-49c3-95c6-f202e0f119c6');
INSERT INTO "RewardPoint" ("id", "points", "expiryDate", "userId") VALUES ('25b9c0f9-0992-489e-b539-6ee069312198', 49, '2025-08-29T01:14:35.183Z', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "RewardPoint" ("id", "points", "expiryDate", "userId") VALUES ('82e881e9-3619-4a4b-98e1-e1b0a4d6343b', 513, '2023-11-04T20:10:38.710Z', '61a0315b-a112-49de-b5fa-3a8a11066713');
INSERT INTO "RewardPoint" ("id", "points", "expiryDate", "userId") VALUES ('8ff138c1-b2ae-4b88-9cd5-0e067caef6be', 361, '2025-02-18T21:56:32.125Z', '0d123034-6bef-4a10-ac8d-0e70fb980b49');
INSERT INTO "RewardPoint" ("id", "points", "expiryDate", "userId") VALUES ('0061ca74-43ba-4a65-a5e9-f1e0a95572d1', 223, '2024-02-22T16:10:15.527Z', '0d123034-6bef-4a10-ac8d-0e70fb980b49');
INSERT INTO "RewardPoint" ("id", "points", "expiryDate", "userId") VALUES ('941e407f-0ba1-4799-bb59-d2ee28072ba6', 317, '2024-10-28T05:33:16.804Z', 'faaed65c-42f1-4875-8bf8-472ab2472c3e');
INSERT INTO "RewardPoint" ("id", "points", "expiryDate", "userId") VALUES ('68de09eb-0af2-47f0-9225-c85cffefb899', 508, '2024-12-20T17:03:41.536Z', 'c1823de5-9981-48ef-96e6-06baa44cfaa2');

INSERT INTO "Address" ("id", "streetAddress", "city", "state", "country", "postalCode", "userId") VALUES ('f0d791a5-ecfa-4cd4-9c08-2955941c1c15', '351 42 E 20th St, New York, NY 10003', 'Greenville', 'Illinois', 'United States', '60601', '0d123034-6bef-4a10-ac8d-0e70fb980b49');
INSERT INTO "Address" ("id", "streetAddress", "city", "state", "country", "postalCode", "userId") VALUES ('f3f7c2f4-732a-4cb8-b53b-983e4c7f6b98', '357 91 Christopher St, New York, NY 10014', 'Springfield', 'California', 'Germany', '60601', 'faaed65c-42f1-4875-8bf8-472ab2472c3e');
INSERT INTO "Address" ("id", "streetAddress", "city", "state", "country", "postalCode", "userId") VALUES ('0091a191-2e2b-4bdf-87a8-c783bbd85c35', '363 443 E 6th St, New York, NY 10009', 'Greenville', 'Illinois', 'United States', '10001', 'c1823de5-9981-48ef-96e6-06baa44cfaa2');
INSERT INTO "Address" ("id", "streetAddress", "city", "state", "country", "postalCode", "userId") VALUES ('25e79293-0059-4305-a423-66614d0ee993', '369 443 E 6th St, New York, NY 10009', 'Lakeside', 'New York', 'Canada', '10001', 'bb719bba-58fb-4083-a167-dce77575d63b');
INSERT INTO "Address" ("id", "streetAddress", "city", "state", "country", "postalCode", "userId") VALUES ('c4ee6cd3-66e1-463e-85ca-c699b230144a', '375 42 E 20th St, New York, NY 10003', 'Greenville', 'Florida', 'United States', '94101', '61a0315b-a112-49de-b5fa-3a8a11066713');
INSERT INTO "Address" ("id", "streetAddress", "city", "state", "country", "postalCode", "userId") VALUES ('b9e8a4b2-15e0-4aaf-993a-372636a7ad97', '381 443 E 6th St, New York, NY 10009', 'Greenville', 'California', 'Australia', '33101', 'bb719bba-58fb-4083-a167-dce77575d63b');
INSERT INTO "Address" ("id", "streetAddress", "city", "state", "country", "postalCode", "userId") VALUES ('2ec592b0-34eb-4672-a2de-2fb743ac9b32', '387 136 E 13th St, New York, NY 10003', 'Greenville', 'New York', 'United Kingdom', '90210', '5bcf1c78-5dbf-49c3-95c6-f202e0f119c6');
INSERT INTO "Address" ("id", "streetAddress", "city", "state", "country", "postalCode", "userId") VALUES ('f362561c-12d1-4e70-88dc-b93126926273', '393 91 Christopher St, New York, NY 10014', 'Hilltop', 'New York', 'Germany', '33101', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Address" ("id", "streetAddress", "city", "state", "country", "postalCode", "userId") VALUES ('53010b2e-daa9-4f86-86b8-d373742153a2', '399 18 W 29th St, New York, NY 10001', 'Greenville', 'Illinois', 'Australia', '33101', '0cf00b9d-32b1-4454-aca2-bf6a7d2c7379');
INSERT INTO "Address" ("id", "streetAddress", "city", "state", "country", "postalCode", "userId") VALUES ('59c46012-05a4-4f52-8437-2482bd468345', '405 18 Spring St, New York, NY 10012', 'Greenville', 'New York', 'Canada', '90210', 'c1823de5-9981-48ef-96e6-06baa44cfaa2');

  `

  const sqls = splitSql(sql)

  for (const sql of sqls) {
    try {
      await prisma.$executeRawUnsafe(`${sql}`)
    } catch (error) {
      console.log(`Could not insert SQL: ${error.message}`)
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
