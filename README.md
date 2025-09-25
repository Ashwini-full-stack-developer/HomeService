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
    );
  2   CREATE TABLE [dbo].[history](
	        [ID] [int] IDENTITY(1,1) primary key NOT NULL,
	        [custName] [varchar](30) NULL,
	        [phNn] [varchar](10) NULL,
	        [address] [varchar](100) NULL,
	        [labourId] [varchar](6) NULL
    );
  3   CREATE TABLE [dbo].[labourregister03](
	        [ID] [int] IDENTITY(1,1) primary key NOT NULL,
	        [Email] [varchar](100) NULL,
	        [Pass] [varchar](50) NULL,
	        [name] [varchar](50) NULL,
	        [phoneNO] [varchar](10) NULL,
	        [Work] [varchar](100) NULL,
	        [labourId] [varchar](20) NOT NULL,
	        [jobrole] [varchar](10) NULL,
    );
  4   CREATE TABLE [dbo].[OrdersList](
	        [OrderID] [int] IDENTITY(1,1) primary key NOT NULL,
	        [UserID] [varchar](20) NOT NULL,
	        [LabourID] [varchar](20) NOT NULL,
	        [ServiceID] [varchar](20) NOT NULL,
	        [AddressId] [varchar](20) NOT NULL,
	        [Discount] [decimal](10, 5) NOT NULL,
	        [SurviceCost] [decimal](10, 5) NOT NULL,
	        [TotalCost] [decimal](10, 5) NOT NULL,
    );
  5   CREATE TABLE [dbo].[Register](
	        [UserID] [varchar](20) primary key NOT NULL,
	        [UserEmail] [varchar](max) NOT NULL,
	        [UserName] [varchar](20) NOT NULL,
	        [UserPhoneNumber] [varchar](10) NOT NULL,
	        [UserAddress] [varchar](max) NOT NULL,
	        [password] [varchar](200) NULL,
	        [Role] [varchar](10) NULL,
    );
  6   CREATE TABLE [dbo].[Survices](
	        [ServiceID] [varchar](20) primary key NOT NULL,
	        [ServiceName] [varchar](30) NOT NULL,
	        [ServiceImage] [varchar](max) NOT NULL,
	        [ServiceCost] [int] NOT NULL,
	        [ServiceDiscount] [int] NOT NULL,
    );
  7   CREATE TABLE [dbo].[userdetails](
	        [userEmail] [varchar](100) primary key NOT NULL,
	        [password] [varchar](100) NOT NULL
    ) ;

• Stored Procedures used in Project :
  1  CREATE PROCEDURE GetAllLocationData
	 AS BEGIN
    	SELECT * FROM addressuser;
	 END;

  2  CREATE PROCEDURE GetLabourRegisterData
	 AS BEGIN
     SET NOCOUNT ON;
    	SELECT ID,Email, Pass, name, phoneNO, Work,labourId ,jobrole FROM labourRegister03;
	 END;
	 
  3  CREATE PROCEDURE GetLocationDataById
     @AddressId varchar(100)
	 AS BEGIN
    	SELECT * FROM addressuser WHERE AddressId = @AddressId;
	 END;
	 
   4  CREATE PROCEDURE InsertLabourDetails
    	@Email VARCHAR(50),
    	@Pas s VARCHAR(100),
    	@name VARCHAR(50),
    	@phoneNO VARCHAR(10),
    	@Work VARCHAR(100),
   	    @labourId VARCHAR(50)
	AS BEGIN
    	INSERT INTO Labourregister03 ( Email, Pass, name, phoneNO, Work, labourId) VALUES ( @Email, @Pass, @name, @phoneNO, @Work, @labourId);
	END;
   5  CREATE  PROCEDURE InsertLocationData
    	@addressid varchar(20),
    	@city VARCHAR(100),
    	@street VARCHAR(255),
    	@latitude DECIMAL(10, 6),
   	   @longitude DECIMAL(10, 6),
		@FullAddress varchar(255),
		@userId varchar(20),
		@area varchar(30),
		@ward varchar(30),
   	 	@LandMark varchar(30)
		AS BEGIN
    		INSERT INTO AddressUser ( addressid, city, street, latitude, longitude, FullAddress,userId ,area, ward,LandMark) VALUES (@addressid, @city, @street, @latitude, 				@longitude, @FullAddress, @userId, @area, @ward,@LandMark);
	  END;

   6  CREATE PROCEDURE sp_GetHistoryByID
      @labourid varchar(6)
	 AS BEGIN
    	SELECT * FROM history WHERE     labourid = @labourid
	END

   7  CREATE PROCEDURE sp_InsertHistory
      @custName VARCHAR(30),
      @phNn VARCHAR(10),
      @address VARCHAR(100),
	  @labourId varchar(6)
     AS BEGIN
    	INSERT INTO history (custName, phNn, address,labourId) VALUES (@custName, @phNn, @address,@labourId)
	 END

  8  CREATE PROCEDURE UpdateLabourRegister
    @ID INT,
    @Email NVARCHAR(100),
    @Pass NVARCHAR(100),
    @Name NVARCHAR(100),
    @PhoneNO NVARCHAR(20),
    @Work NVARCHAR(100),
	@labourId varchar(6)
	AS BEGIN
    	UPDATE labourRegister03 SET Email = @Email,
        Pass = @Pass,
        Name = @Name,
        PhoneNO = @PhoneNO,
        Work = @Work
		WHERE 	labourId = @labourId;
   END;
  
