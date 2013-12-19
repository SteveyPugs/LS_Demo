Live Stream API Notes
=======================
An API to store/update/list director information from LiveStream's API


What is a director?
----------------
A ```Director``` is any account Live Stream's API. It consists of:
	
- Directors Full Name
- Directors Date of Birth
- Directors Favorite Camera (Optional)
- Directors Favorite Movies (Optional)

Installation
============
Clone the latest:
```
git clone git@github.com:SteveyPugs/LS_Demo.git
cd LS_Demo
```

Install the application's dependencies:
```
npm install .
```


Setup configuration files:
```
cp ./config/database.example.js ./config/database.js
cp ./config/database.example.js ./config/database.test.js
cp ./config/config.example.js ./config/config.js
```

Set up the database connection config in ```./config/database.js```. Make sure the credentials are correct as to avoid crashing. The database needs to be created in advance
```
exports.config = {
  type: 'mysql',
  hostname: 'localhost',
  port: 3306,
  db: 'mydbname',
  user: 'dbuser',
  password: 'dbpass'
};
```

Set up the test database connection config in ```./config/database.test.js```. Make sure the credentials are correct as to avoid crashing. The database needs to be created in advance
```
exports.config = {
  type: 'mysql',
  hostname: 'localhost',
  port: 3306,
  db: 'mydbname_test',
  user: 'dbuser',
  password: 'dbpass'
};
```

Set up the HTTP server, mail, and tls config in ```./config/config.js```. The following is customizable:
```
exports.config = {
  hostname: 'localhost',
  port: 8000,
  tls: false
};

```

Run with ```node .```!

LiveStream API Reference
=============

See [Live Stream API reference](/docs/Reference.md)

How to run tests
================
```make test```