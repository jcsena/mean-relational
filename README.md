[![Dependency Status](https://david-dm.org/jcsena/mean-relational.svg)](https://david-dm.org/jcsena/mean-relational)


M*EAN Relational
=====================
The main idea for this repository is shamelessly stolen from [http://mean.io](http://mean.io) and mean-stack-relational [M*EAN](https://github.com/jpotts18/mean-stack-relational) . It says:

> MEAN is a boilerplate that provides a nice starting point for [MySQL], Express, Node.js, and AngularJS based applications. It is designed to give you quick and organized way to start developing of MEAN based web apps with useful modules like sequelize and passport pre-bundled and configured. We mainly try to take care of the connection points between existing popular frameworks and solve common integration problems.


The MongoDB ORM, [Mongoose](http://mongoosejs.com/), has been replaced with [Sequelize](http://sequelizejs.com/). Switching from mongoose to sequelize allows developers easy access to MySQL, MariaDB, SQLite or PostgreSQL databases by mapping database entries to objects and vice versa.

[Addy Osmani's Blog](http://addyosmani.com/blog/full-stack-javascript-with-mean-and-yeoman/) explains SQL databases, being strongly typed in nature are great at enforcing a level of consistency, ensuring many kinds of bad data simply don’t get recorded. By using SQL databases MEAN Stack Relational favors reliability over the performance gains of NoSQL databases.

## The M*EAN-relational

M*EAN is an acronym for Mysql, Express.js , Angular.js and Node.js

## Technologies

<dl class="dl-horizontal">
<dt>Mysql</dt>
<dd>Is a relational database management system (RDBMS) in July 2013, it was the world's second most widely used RDBMS, and the most widely used open-source RDBMS.</dd>
<dt>Express</dt>
<dd>The best way to understand express is through its Official Website, particularly The Express Guide; you can also go through this StackOverflow thread for more resources.</dd>
<dt>AngularJS</dt>
<dd>Angular's Official Website is a great starting point. CodeSchool and google created a <a href="https://www.codeschool.com/courses/shaping-up-with-angular-js">great tutorial</a> for beginners, and the angular videos by <a href="https://egghead.io/">Egghead</a>.
Utilice Angular <a href="https://github.com/johnpapa/angular-styleguide">Style Guide</a> and best practice make by Jhon Papa </dd>
<dt>Node.js</dt>
<dd>Start by going through Node.js Official Website and this StackOverflow thread, which should get you going with the Node.js platform in no time.</dd>
</dl>

### Additional Tools
* <a href="http://docs.sequelizejs.com/en/latest/">Sequelize</a> - Is a promise-based ORM for Node.js and io.js. It supports the dialects PostgreSQL, MySQL,
MariaDB, SQLite and MSSQL and features solid transaction support, relations, read replication and
more.
* <a href="http://passportjs.org/">Passport</a> - An authentication middleware for Node.js which supports authentication using a username and password, Facebook, Twitter, and more.
* <a href="http://getbootstrap.com/">Twitter Bootstrap</a> - The most popular HTML, CSS, and JS framework for developing responsive, mobile first projects.
* <a href="http://angular-ui.github.io/bootstrap/">UI Bootstrap</a> - Bootstrap components written in pure AngularJS


## Prerequisites
- Node.js latest [https://nodejs.org](https://nodejs.org/) or io.js <= 2.5  [https://iojs.org](https://iojs.org/en/index.html)
- MySQL - Download and Install MySQL - Make sure it's running on the default port (3306).

## Tool Prerequisites

```bash
$ npm install -g bower
$ npm install -g grunt
```

## Installation

Alright now the fun begins. First clone or download the repo to your computer.

```bash
$ git clone https://github.com/jcsena/mean-relational.git
$ cd mean-relational && npm install
```
- Config auth datebase ```/config/env/development.js```.

```bash
$ grunt
```

Thats all! Now go and open up your browser at [http://localhost:3000](http://localhost:3000), and tweet [@dendores](https://twitter.com/dendores) to say thanks!



### NPM Modules Used

- [Passport](http://passportjs.org/) - Passport is authentication middleware for Node.js. Extremely flexible and modular, Passport can be unobtrusively dropped in to any Express-based web application. A comprehensive set of strategies support authentication using a username and password, Facebook, Twitter, and more.
- [Express](http://expressjs.com/) - Express is a minimal and flexible node.js web application framework, providing a robust set of features for building single and multi-page, and hybrid web applications.
- [Sequelize](http://sequelizejs.com/) - The Sequelize library provides easy access to MySQL, MariaDB, SQLite or PostgreSQL databases by mapping database entries to objects and vice versa. To put it in a nutshell, it's an ORM (Object-Relational-Mapper). The library is written entirely in JavaScript and can be used in the Node.JS environment.


# Troubleshooting and Contact

During install some of you may encounter some issues feel free to contact me (julio-sena) via the repository issue tracker or the links provided below. I am also available on twitter at [@dendores](http://twitter.com/dendores).
