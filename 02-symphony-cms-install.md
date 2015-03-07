# 02. Symphony CMS install

_Before we start, make sure you understand that **Symphony CMS** is NOT about **Symfony PHP Framework**. They're not the same thing. Ready?_ :)

Installing Symphony is very easy. In this tutorial we'll use `git` to handle all dependencies, but this task also works with `.zip` files (check out here http://www.getsymphony.com/download/, for a blank install remove the `/workspace` folder before the installation).

## I. Git clone

First step, go to [github.com/symphonycms/symphony-2](http://github.com/symphonycms/symphony-2) and clone the project in your server.

![github.com/symphonycms/symphony-2](screenshots/02-github.symphony.png)

`git clone https://github.com/symphonycms/symphony-2.git mywebsite`

With the system files cloned, now open the project in your browser [http://localhost/mywebsite/](http://localhost/mywebsite/).

_We'll not use virtual hosts on this tutorial to keep it simple, so with `http://localhost` as your Apache server root of public files, `/mywebsite` will be located there._

## II. Install wizard

In the __mywebsite__ URL you'll see the install wizard. This page is pretty informative, so go on and fill out the fields. Finally click `Install Symphony`. You'll need a DB for this project, so make sure you have created one with the MySQL tool of your choice.

![localhost/mywebsite/install](screenshots/03-install.png)

## III. Done!

All set up, ready to go!

![localhost/mywebsite/install](screenshots/04-installed.png)