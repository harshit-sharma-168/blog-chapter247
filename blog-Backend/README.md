#create tables 
create table USERS(personid serial8 NOT NULL,
	first_name varchar(50) NOT NULL,
	email varchar(50) NOT NULL,
	"password" varchar(100) NOT NULL,
	CONSTRAINT users_email_key UNIQUE (email),
	CONSTRAINT users_pkey PRIMARY KEY (personid)
);


create table blogs(
	blogid serial8 NOT NULL,
	title varchar(50) NOT NULL,
	content varchar(1000) NOT NULL,
	lastEditedBy varchar(50) NOT NULL,
	isLocked boolean NOT NULL,
	lockedBy varchar(50) NOT NULL,
	lockedAt TIMESTAMP NOT NULL,
	archive int NOT NULL,
	CONSTRAINT blog_title_key UNIQUE (title),
	CONSTRAINT blog_pkey PRIMARY KEY (blogid)
);

















