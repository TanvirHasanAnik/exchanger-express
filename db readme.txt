users:
create table users (
    id int not null auto_increment unique primary key,
    username varchar(255) not null unique,
    password varchar(255) not null,
    address varchar(255) not null,
    email varchar(255),
    phone varchar(14),
)

product:
create table products (
    id int not null auto_increment unique primary key,
    userid int not null,
    categoryid int not null,
    productTitle text not null,
    productDescription text
);

category:
create table category (
    id int not null auto_increment unique primary key,
    categoryname varchar(30) not null unique
)

expectedproduct:
create table expectedproduct (
    id int not null auto_increment unique primary key,
    userid int not null,
    categoryid int not null
);

review:
create table review (
    id int not null auto_increment unique primary key,
    userid int not null,
    reviewerid int not null,
    content text not null,
    positive boolean
);

get product list query: (SELECT categoryname,productTitle,productDescription from category inner join products on products.categoryid = category.id where products.userid = ?)

select * from products
left join users
on products.id = users.productid