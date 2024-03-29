USE PhoneShopIdentity
GO

DELETE FROM Carts;
DBCC CHECKIDENT ('PhoneShopIdentity.dbo.Carts', RESEED, 0);
GO
DELETE FROM InvoiceDetails;
DBCC CHECKIDENT ('PhoneShopIdentity.dbo.InvoiceDetails', RESEED, 0);
GO
DELETE FROM Invoices;
DBCC CHECKIDENT ('PhoneShopIdentity.dbo.Invoices', RESEED, 0);
GO
DELETE FROM Comments;
DBCC CHECKIDENT ('PhoneShopIdentity.dbo.Comments', RESEED, 0);
GO
DELETE FROM Votes;
DBCC CHECKIDENT ('PhoneShopIdentity.dbo.Votes', RESEED, 0);
GO
DELETE FROM Favorites;
DBCC CHECKIDENT ('PhoneShopIdentity.dbo.Favorites', RESEED, 0);
GO
DELETE FROM Phones;
DBCC CHECKIDENT ('PhoneShopIdentity.dbo.Phones', RESEED, 0);
GO
DELETE FROM ModPhones;
DBCC CHECKIDENT ('PhoneShopIdentity.dbo.ModPhones', RESEED, 0);
GO
DELETE FROM Images;
DBCC CHECKIDENT ('PhoneShopIdentity.dbo.Images', RESEED, 0);
GO
DELETE FROM SlideShows;
DBCC CHECKIDENT ('PhoneShopIdentity.dbo.SlideShows', RESEED, 0);
GO
DELETE FROM Promotions;
DBCC CHECKIDENT ('PhoneShopIdentity.dbo.Promotions', RESEED, 0);
GO
DELETE FROM Brands;
DBCC CHECKIDENT ('PhoneShopIdentity.dbo.Brands', RESEED, 0);
GO
DELETE FROM PaymentMethods;
DBCC CHECKIDENT ('PhoneShopIdentity.dbo.PaymentMethods', RESEED, 0);
GO
DELETE FROM AspNetRoleClaims;
DBCC CHECKIDENT ('PhoneShopIdentity.dbo.AspNetRoleClaims', RESEED, 0);
GO
DELETE FROM AspNetRoles;
DBCC CHECKIDENT ('PhoneShopIdentity.dbo.AspNetRoles', RESEED, 0);
GO
DELETE FROM AspNetUserClaims;
DBCC CHECKIDENT ('PhoneShopIdentity.dbo.AspNetUserClaims', RESEED, 0);
GO
DELETE FROM AspNetUserLogins;
DBCC CHECKIDENT ('PhoneShopIdentity.dbo.AspNetUserLogins', RESEED, 0);
GO
DELETE FROM AspNetUserRoles;
DBCC CHECKIDENT ('PhoneShopIdentity.dbo.AspNetUserRoles', RESEED, 0);
GO
DELETE FROM AspNetUserTokens;
DBCC CHECKIDENT ('PhoneShopIdentity.dbo.AspNetUserTokens', RESEED, 0);
GO
DELETE FROM AspNetUsers;
DBCC CHECKIDENT ('PhoneShopIdentity.dbo.AspNetUsers', RESEED, 0);
GO

insert into Brands values('IPHONE','iphone.jpg',1)
insert into Brands values('SAMSUNG','samsung.jpg',1)
insert into Brands values('NOKIA','nokia.jpg',1)
insert into Brands values('XIAOMI','xiaomi.jpg',1)
insert into Brands values('VIVO','vivo.jpg',1)
insert into Brands values('OPPO','oppo.jpg',1)

insert into Promotions values('Giảm 10%',0.1,GETDATE(),GETDATE(),1)
insert into Promotions values('Giảm 20%',0.2,GETDATE(),GETDATE(),1)


insert into ModPhones values('iPhone 11',6.1,N'iPhone 11 128GB là một phiên bản từ siêu phẩm bộ ba của Apple vừa mới trình  làng  vào tháng 9 năm 2019. Đây được xem là sản phẩm đẳng cấp nhất cho đến thời điểm hiện tại. Phone 11 2019 được các chuyên gia nhận định là siêu phẩm có hiệu năng mạnh mẽ và toàn diện nhất cho đến thời điểm này, cùng với đó là tổ hợp nhiều tính năng cực hấp dẫn và thuận tiện mà bao tín đồ mơ ước.',4,1,'IOS','A13 Bionic',3110,'iphone-11-black.jpg',1,1)
insert into ModPhones values('iPhone 12',6.1,N'iPhone 12 64GB được xem là sự kế nhiệm cho thế hệ 11. So với thế hệ tiền nhiệm, mẫu điện thoại mang đến một sự lột xác chỉnh chu hơn để đáp ứng kì vọng của người dùng.',4,1,'IOS','A14 Bionic',2815,'iphone-12-green.jpg',1,1)
insert into ModPhones values('iPhone 13',6.1,N'iPhone 13 gây ấn tượng mạnh với bộ 5 màu sắc Đen, Trắng, Xanh, Đỏ và iPhone 13 Hồng đáng yêu. iPhone 13 vẫn được duy trì một thiết kế hao hao anh em 2020, máy vẫn có phiên bản khung viền thép, mặt lưng kính cường lực bóng bẩy và bền bỉ. ',4,1,'IOS','A15 Bionic',3240,'iphone-13-blue.jpg',1,1)
insert into ModPhones values('iPhone 14',6.1,N'Với iPhone 14 và iPhone 14 Plus năm nay, Apple vẫn cho duy trì màn hình tai thỏ như iPhone 13. Sự khác biệt được xem là phân cấp của Apple cho các dòng sản phẩm căn bản và cao cấp của mình.',6,1,'IOS','A15 Bionic',3279,'iphone-14-purple.png',1,1)
insert into ModPhones values('iPhone 15',6.1,N'iPhone 15 mở màn cho series được quan tâm nhất của Apple tại sự kiện Wonderlust. Sản phẩm là minh chứng chính xác nhất những cải tiến mà Apple đã làm cho dòng iPhone 15, từ cổng sạc USB-C, khung viền mỏng hơn và Dynamic Island - công nghệ chỉ có trên iPhone 15 Pro và Pro Max.',4,1,'IOS','A16 Bionic',3349,'iphone-15-pink.jpg',1,1)


insert into Phones values('iPhone 11 64GB','9300098723773',1,10890000,10,'black',64)
insert into Phones values('iPhone 11 64GB','9300098723766',1,10490000,10,'white',64)
insert into Phones values('iPhone 11 64GB','9300098723771',1,10590000,10,'green',64)
insert into Phones values('iPhone 11 64GB','9300098723772',1,10990000,10,'purple',64)
insert into Phones values('iPhone 11 64GB','9300098723773',1,10390000,10,'yellow',64)
insert into Phones values('iPhone 11 64GB','9300098723774',1,10290000,10,'red',64)

insert into Phones values('iPhone 11 128GB','9300098723123',1,12290000,10,'black',128)
insert into Phones values('iPhone 11 128GB','9300098723345',1,12490000,10,'white',128)
insert into Phones values('iPhone 11 128GB','9300098723678',1,12390000,10,'green',128)
insert into Phones values('iPhone 11 128GB','9300098723810',1,12490000,10,'purple',128)
insert into Phones values('iPhone 11 128GB','9300098723910',1,12190000,10,'yellow',128)
insert into Phones values('iPhone 11 128GB','9300098723990',1,12090000,10,'red',128)

insert into Phones values('iPhone 11 256GB','8300098723123',1,13690000,10,'black',256)
insert into Phones values('iPhone 11 256GB','8300098723345',1,13990000,10,'white',256)
insert into Phones values('iPhone 11 256GB','8300098723678',1,13990000,10,'green',256)
insert into Phones values('iPhone 11 256GB','8300098723810',1,13390000,10,'purple',256)
insert into Phones values('iPhone 11 256GB','8300098723910',1,13990000,10,'yellow',256)
insert into Phones values('iPhone 11 256GB','8300098723990',1,13690000,10,'red',256)

insert into Phones values('iPhone 12 64GB','7300098723123',2,13390000,10,'black',64)
insert into Phones values('iPhone 12 64GB','7300098723345',2,13390000,10,'white',64)
insert into Phones values('iPhone 12 64GB','7300098723678',2,13190000,10,'green',64)
insert into Phones values('iPhone 12 64GB','7300098723810',2,13190000,10,'purple',64)
insert into Phones values('iPhone 12 64GB','7300098723910',2,13590000,10,'blue',64)
insert into Phones values('iPhone 12 64GB','7300098723990',2,12790000,10,'red',64)

insert into Phones values('iPhone 12 128GB','9300098723123',2,15190000,10,'black',128)
insert into Phones values('iPhone 12 128GB','9300098723345',2,14990000,10,'white',128)
insert into Phones values('iPhone 12 128GB','9300098723678',2,14590000,10,'green',128)
insert into Phones values('iPhone 12 128GB','9300098723810',2,14590000,10,'purple',128)
insert into Phones values('iPhone 12 128GB','9300098723910',2,14990000,10,'blue',128)
insert into Phones values('iPhone 12 128GB','9300098723990',2,15090000,10,'red',128)

insert into Phones values('iPhone 12 256GB','8300098723123',2,17490000,10,'black',256)
insert into Phones values('iPhone 12 256GB','8300098723345',2,17490000,10,'white',256)
insert into Phones values('iPhone 12 256GB','8300098723678',2,17490000,10,'green',256)
insert into Phones values('iPhone 12 256GB','8300098723810',2,17490000,10,'purple',256)
insert into Phones values('iPhone 12 256GB','8300098723910',2,17490000,10,'blue',256)
insert into Phones values('iPhone 12 256GB','8300098723990',2,17490000,10,'red',256)

insert into Phones values('iPhone 13 128GB','3000000003320',3,16190000,10,'black',128)
insert into Phones values('iPhone 13 128GB','3000000003321',3,16190000,10,'white',128)
insert into Phones values('iPhone 13 128GB','3000000003322',3,16190000,10,'green',128)
insert into Phones values('iPhone 13 128GB','3000000003323',3,16190000,10,'pink',128)
insert into Phones values('iPhone 13 128GB','3000000003323',3,16190000,10,'blue',128)
insert into Phones values('iPhone 13 128GB','3000000003324',3,16190000,10,'red',128)

insert into Phones values('iPhone 13 256GB','3000000003325',3,19990000,10,'black',256)
insert into Phones values('iPhone 13 256GB','3000000003326',3,19990000,10,'white',256)
insert into Phones values('iPhone 13 256GB','3000000003327',3,19990000,10,'green',256)
insert into Phones values('iPhone 13 256GB','3000000003328',3,19990000,10,'pink',256)
insert into Phones values('iPhone 13 256GB','3000000003329',3,19990000,10,'blue',256)
insert into Phones values('iPhone 13 256GB','3000000003330',3,19990000,10,'red',256)

insert into Phones values('iPhone 13 512GB','3000000003331',3,24390000,10,'black',512)
insert into Phones values('iPhone 13 512GB','3000000003332',3,24390000,10,'white',512)
insert into Phones values('iPhone 13 512GB','3000000003333',3,24390000,10,'green',512)
insert into Phones values('iPhone 13 512GB','3000000003334',3,24390000,10,'pink',512)
insert into Phones values('iPhone 13 512GB','3000000003335',3,24390000,10,'blue',512)
insert into Phones values('iPhone 13 512GB','3000000003336',3,24390000,10,'red',512)

insert into Phones values('iPhone 14 128GB','3700000004201',4,18590000,10,'black',128)
insert into Phones values('iPhone 14 128GB','3700000004202',4,18590000,10,'white',128)
insert into Phones values('iPhone 14 128GB','3700000004203',4,18390000,10,'yellow',128)
insert into Phones values('iPhone 14 128GB','3700000004204',4,18590000,10,'pink',128)
insert into Phones values('iPhone 14 128GB','3700000004205',4,18590000,10,'blue',128)
insert into Phones values('iPhone 14 128GB','3700000004206',4,18590000,10,'red',128)

insert into Phones values('iPhone 14 256GB','3700000004207',4,21990000,10,'black',256)
insert into Phones values('iPhone 14 256GB','3700000004208',4,21990000,10,'white',256)
insert into Phones values('iPhone 14 256GB','3700000004209',4,21990000,10,'yellow',256)
insert into Phones values('iPhone 14 256GB','3700000004210',4,21990000,10,'pink',256)
insert into Phones values('iPhone 14 256GB','3700000004211',4,21990000,10,'blue',256)
insert into Phones values('iPhone 14 256GB','3700000004212',4,21990000,10,'red',256)

insert into Phones values('iPhone 14 512GB','3700000004213',4,24390000,10,'black',512)
insert into Phones values('iPhone 14 512GB','3700000004214',4,24390000,10,'white',512)
insert into Phones values('iPhone 14 512GB','3700000004215',4,24390000,10,'yellow',512)
insert into Phones values('iPhone 14 512GB','3700000004216',4,24390000,10,'pink',512)
insert into Phones values('iPhone 14 512GB','3700000004217',4,24390000,10,'blue',512)
insert into Phones values('iPhone 14 512GB','3700000004218',4,24390000,10,'red',512)

insert into Phones values('iPhone 15 128GB','3960000006988',5,22090000,10,'black',128)
insert into Phones values('iPhone 15 128GB','3960000006989',5,21900000,10,'blue',128)
insert into Phones values('iPhone 15 128GB','3960000006990',5,22190000,10,'yellow',128)
insert into Phones values('iPhone 15 128GB','3960000006991',5,21900000,10,'green',128)
insert into Phones values('iPhone 15 128GB','3960000006992',5,21900000,10,'pink',128)

insert into Phones values('iPhone 15 256GB','3960000006993',5,24990000,10,'black',256)
insert into Phones values('iPhone 15 256GB','3960000006994',5,24790000,10,'blue',256)
insert into Phones values('iPhone 15 256GB','3960000006995',5,24790000,10,'yellow',256)
insert into Phones values('iPhone 15 256GB','3960000006996',5,24790000,10,'green',256)
insert into Phones values('iPhone 15 256GB','3960000006997',5,25490000,10,'pink',256)

insert into Phones values('iPhone 15 512GB','3960000006998',5,28490000,10,'black',512)
insert into Phones values('iPhone 15 512GB','3960000006999',5,29990000,10,'blue',512)
insert into Phones values('iPhone 15 512GB','3960000006100',5,28990000,10,'yellow',512)
insert into Phones values('iPhone 15 512GB','3960000006101',5,28990000,10,'green',512)
insert into Phones values('iPhone 15 512GB','3960000006102',5,30490000,10,'pink',512)

insert into Images values(1,'iphone-11-black.jpg',1)
insert into Images values(1,'11Den2.jpg',1)
insert into Images values(1,'11Den3.jpg',1)

insert into Images values(2,'iphone-11-white.jpg',1)
insert into Images values(2,'11Trang2.jpg',1)
insert into Images values(2,'11Trang3.jpg',1)

insert into Images values(3,'iphone-11-green.jpg',1)
insert into Images values(3,'11Xanh2.jpg',1)
insert into Images values(3,'11Xanh3.jpg',1)

insert into Images values(4,'iphone-11-purple.jpg',1)
insert into Images values(4,'11Tim2.jpg',1)
insert into Images values(4,'11Tim3.jpg',1)

insert into Images values(7,'iphone-12-black.jpg',1)
insert into Images values(7,'12Den2.jpg',1)
insert into Images values(7,'12Den3.jpg',1)

insert into Images values(8,'iphone-12-white.jpg',1)
insert into Images values(8,'12Trang2.jpg',1)
insert into Images values(8,'12Trang3.jpg',1)

insert into Images values(9,'iphone-12-green.jpg',1)
insert into Images values(9,'12Luc2.jpg',1)
insert into Images values(9,'12Luc3.jpg',1)

insert into Images values(10,'iphone-12-purple.jpg',1)
insert into Images values(10,'12Tim2.jpg',1)
insert into Images values(10,'12Tim3.jpg',1)

insert into Images values(11,'iphone-12-blue.jpg',1)
insert into Images values(11,'12Xanh2.jpg',1)
insert into Images values(11,'12Xanh3.jpg',1)

insert into Images values(12,'iphone-12-red.jpg',1)
insert into Images values(12,'12Do2.jpg',1)
insert into Images values(12,'12Do3.jpg',1)

insert into PaymentMethods values(N'Thanh toán khi nhận hàng',1)
insert into PaymentMethods values(N'Thanh toán qua thẻ tín dụng',1)









