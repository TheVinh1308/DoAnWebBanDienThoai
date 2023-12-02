create database db_WebBanDienThoai
go
use db_WebBanDienThoai
go
create table ModPhones
(
	id int,
	sku varchar(50),
	name nvarchar(max),
	screen_size float,
	description nvarchar(max),
	ram int,
	brand_id int,
	os varchar(max),
	cpu nvarchar(max),
	battery int,
	image varchar(max),
	promotion_id int,
	status bit,
	primary key(id),
	foreign key (brand_id) references Brands(id),
	foreign key (promotion_id) references Promotions(id)
)
go
create table Phones
(
	id int,
	mod_phone_id int,
	price int,
	stock int,
	color nvarchar(max),
	rom int,
	primary key(id),
	foreign key (mod_phone_id) references ModPhones(id)
)
go
create table Brands
(
	id int,
	name nvarchar(max),
	logo varchar(max),
	status bit
	
	primary key(id)
)
go
create table User_ASP
(
	id int,
	name nvarchar(max),
	
	primary key(id)
)
go
create table Comments
(
	id int,
	user_id int,
	mod_phone_id int,
	image varchar(max),
	content text,
	post_date datetime,
	comment_id int,
	status bit,
	
	primary key(id),
	foreign key (user_id) references User_ASP(id),
	foreign key (mod_phone_id) references ModPhones(id)
)
go
create table Votes
(
	id int,
	user_id int,
	mod_phone_id int,
	rate float,
	content text,
	status bit
	primary key(id)
	foreign key (user_id) references User_ASP(id),
	foreign key (mod_phone_id) references ModPhones(id)
)
go
create table Images
(
	id int,
	phone_id int,
	path varchar(max),
	status bit
	
	primary key(id)
	foreign key (phone_id) references Phones(id)
)
go
create table SlideShows
(
	id int,
	mod_phone_id int,
	title nvarchar(max),
	
	path varchar(max),
	status bit
	
	primary key(id)
	foreign key (mod_phone_id) references ModPhones(id)
)
go
create table Payment_Methods
(
	id int,
	name nvarchar(max),
	description nvarchar(max),
	status bit,
	
	primary key(id)
)
go
create table Invoices
(
	id int,
	code varchar(max),
	user_id int,
	payment_method_id int,
	issued_date datetime,
	shipping_phone varchar(10),
	shipping_address nvarchar(max),
	total int,
	status bit
	
	primary key(id)
	foreign key (user_id) references User_ASP(id),
	foreign key (payment_method_id) references Payment_Methods(id)
)
go
create table InvoiceDetails
(
	id int,
	invoice_id int,
	phone_id int,
	quantity int,
	price int,
	
	primary key(id),
	foreign key (invoice_id) references Invoices(id),
	foreign key (phone_id) references Phones(id)
)
go
create table Promotions
(
	id int,
	content nvarchar(max),
	percent_discount float,
	start_date datetime,
	end_date datetime,
	status bit,
	
	primary key(id)
)
go
create table Carts
(
	id int,
	phone_id int,
	user_id int,
	
	quantity int
	
	primary key(id),
	foreign key (user_id) references  User_ASP(id),
	foreign key (phone_id) references Phones(id)
)
go
create table Favorites
(
	id int,
	mod_phone_id int,
	user_id int,
	
	primary key(id),
	foreign key (user_id) references  User_ASP(id),
	foreign key (mod_phone_id) references ModPhones(id)
)
	
