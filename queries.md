# Database Queries

### Display the ProductName and CategoryName for all products in the database. Shows 76 records.
-- FIND THE PRODUCT NAME WITH THEIR RESPECTIVE CATEGORIES BY EACH CATEGORY
-- | PRODUCTNAME | COUNT
select p.productname, c.categoryname 
from Products as p
join Categories as c
	on p.categoryid = c.categoryid


### Display the OrderID and ShipperName for all orders placed before January 9, 1997. Shows 161 records.
select o.orderid, s.shippername 
from Orders as o
join Shippers as s
	on o.shipperid = s.shipperid 
    where o.orderdate < '1997-01-09'


### Display all ProductNames and Quantities placed on order 10251. Sort by ProductName. Shows 3 records.
select o.quantity, p.productname, o.orderid 
from OrderDetails as o
join Products as p
	on o.quantity = p.productid 
    where o.orderid = '10251'


### Display the OrderID, CustomerName and the employee's LastName for every order. All columns should be labeled clearly. Displays 196 records.

### (Stretch)  Displays CategoryName and a new column called Count that shows how many products are in each category. Shows 9 records.

### (Stretch) Display OrderID and a  column called ItemCount that shows the total number of products placed on the order. Shows 196 records. 