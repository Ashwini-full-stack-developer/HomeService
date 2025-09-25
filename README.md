Project --> Home Service Providers

• The Home Service Providers platform is designed to connect customers with professional service providers for a variety of household needs.
• The platform aims to simplify the process of booking reliable professionals for home services while ensuring quality, transparency, and convenience.
• For development we used technologys like CSS,React JS,SQL server, C sharp asp.Net core web API Development
• Weused MSSQLdatabase for storage and implemented the concepts like Storedprocigers, Joins.
• For Development we used the IDE’s called VS Code , Visual Studio.

Technologies Used :
  • Frontend : HTML5 , CSS3 , Javascript , Tailwind CSS , React JS.
  • Backend  : C# ASP.Net Core web API.
  • Database : MS SQL Server.
  • Other Services : Email JS , Here Maps.

Frontend Concepts :
  • React Routing , UseState() , UseEffect() , UseContext() , UseParam() , UseLocation() , UseNavigater() , Exception Handling CRUD Operations.
Backend Concepts  :
  • Authorization and athentication : JSON web Token.
Database Concepts  :
  •Tables Used in Database :
   1   CREATE TABLE [dbo].[addressuser](
	        [Addressid] [varchar](100) primary key NOT NULL,
	        [city] [varchar](100) NULL,
	        [street] [varchar](255) NULL,
	        [latitude] [decimal](10, 6) NULL,
	        [longitude] [decimal](10, 6) NULL,
	        [FullAddress] [varchar](255) NULL,
	        [userId] [varchar](20) NOT NULL,
	        [area] [varchar](30) NULL,
	        [ward] [varchar](30) NULL,
	        [LandMark] [varchar](30) NULL,
    )
  2   CREATE TABLE [dbo].[history](
	        [ID] [int] IDENTITY(1,1) primary key NOT NULL,
	        [custName] [varchar](30) NULL,
	        [phNn] [varchar](10) NULL,
	        [address] [varchar](100) NULL,
	        [labourId] [varchar](6) NULL
    )
  3   CREATE TABLE [dbo].[labourregister03](
	        [ID] [int] IDENTITY(1,1) primary key NOT NULL,
	        [Email] [varchar](100) NULL,
	        [Pass] [varchar](50) NULL,
	        [name] [varchar](50) NULL,
	        [phoneNO] [varchar](10) NULL,
	        [Work] [varchar](100) NULL,
	        [labourId] [varchar](20) NOT NULL,
	        [jobrole] [varchar](10) NULL,
    )
  4   CREATE TABLE [dbo].[OrdersList](
	        [OrderID] [int] IDENTITY(1,1) primary key NOT NULL,
	        [UserID] [varchar](20) NOT NULL,
	        [LabourID] [varchar](20) NOT NULL,
	        [ServiceID] [varchar](20) NOT NULL,
	        [AddressId] [varchar](20) NOT NULL,
	        [Discount] [decimal](10, 5) NOT NULL,
	        [SurviceCost] [decimal](10, 5) NOT NULL,
	        [TotalCost] [decimal](10, 5) NOT NULL,
    )
  5   CREATE TABLE [dbo].[Register](
	        [UserID] [varchar](20) primary key NOT NULL,
	        [UserEmail] [varchar](max) NOT NULL,
	        [UserName] [varchar](20) NOT NULL,
	        [UserPhoneNumber] [varchar](10) NOT NULL,
	        [UserAddress] [varchar](max) NOT NULL,
	        [password] [varchar](200) NULL,
	        [Role] [varchar](10) NULL,
    )
  6   CREATE TABLE [dbo].[Survices](
	        [ServiceID] [varchar](20) primary key NOT NULL,
	        [ServiceName] [varchar](30) NOT NULL,
	        [ServiceImage] [varchar](max) NOT NULL,
	        [ServiceCost] [int] NOT NULL,
	        [ServiceDiscount] [int] NOT NULL,
    )
  7   CREATE TABLE [dbo].[userdetails](
	        [userEmail] [varchar](100) primary key NOT NULL,
	        [password] [varchar](100) NOT NULL
    ) 

• Stored Procedures used in Project :
  
