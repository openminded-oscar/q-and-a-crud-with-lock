**CHAPTER 1: Project Start**

This project rely on:
NodeJs V18
MongoDB V4.4 running on port 27017.

Run npm run start to start locally in live-reload mode.

___
**CHAPTER 2: Answers to Questions**

1 **Angular's Dependency Injection**

Angular dependency injection is a technic of relying on your code structure objects (most of all used for services) create by framework - declaratively.

This makes the code simpler (you don't have to deal with instantiation), more loose coupled and testable.

Also services provided through DI are singletons by default, meaning that only one instance of the service is created and shared across the application. This is useful for maintaining state or shared functionality

The most popular option of DI is constructor injection. Besides property injection and method injection exist.
____
2 **Given a table called users with columns `id`, `name`, `email`, and `created_at`,
write a query to find the top 10 users who have been recently created.
Describe how you would optimize this query if the table grows to over 1M
records.**

SELECT * FROM USERS ORDER BY created_at LIMIT 10

For 1M records I'd create index on field created_at.
_____
3 **HTTP status codes**

HTTP status codes are categorized into five groups, each representing different types of responses from the server:

2xx (Successful): These codes indicate that the request was successfully received, understood, and accepted.
E.g.
200 OK
201 Created

4xx (Client Error): These codes indicate that the request contains bad syntax or cannot be fulfilled by the server.
E.g.
400 Bad Request
403 Forbidden
404 Not Found

5xx (Server Error): These codes indicate that the server failed to fulfill a valid request.
E.g.
500 Internal Server Error
502 Bad Gateway
____
4 **Query Question 2**

SELECT user.name, user.email, count(*) order count, sum(orders.amount) total spent amount, users FROM orders o LEFT JOIN users u
ON orders.user_id = users.id
WHERE  o.order_date >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)
GROUP BY users.id
ORDER BY sum(orders.amount)
HAVING count(*) > 5
