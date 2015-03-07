# 03. Symphony administration

## I. Login

Now go to your administration page. In this tutorial we'll use the default `/symphony` path, but as you saw in the wizard you can choose any different path.

![localhost/mywebsite/symphony](screenshots/05-login.png)

## II. Administration page

After login you'll see a pretty and clear administration page.

![localhost/mywebsite/symphony](screenshots/06-symphony-admin.png)

In Symphony we have some very well defined concepts to create the awesomeness. I'll explain the basics and you can read more in the official Symphony website [concepts](http://www.getsymphony.com/learn/concepts/).

The developer tools are in these two sections on the right side of the main menu: __Blueprints__ and __System__. At this moment we really don't have any kind of content structure or pages. Like a blank piece of paper, we'll build based only on our project specification. This is one big difference in approach compared to other CMS's.

```
- Blueprints
  - Pages
  - Sections
  - Data Sources
  - Events
- System
  - Authors
  - Preferences
  - Extensions
```

From Symphony [learn](http://www.getsymphony.com/learn/) page, the following infographic explains a lot of how Symphony works!

![visual-overview](screenshots/07-visual-overview.png)

## III. Symphony Extensions

It's important to understand that Symphony is meant to be simple, and have a powerful core to be extended by the community. For this we have tonnes of extensions to fill any kind of need. The core install has the essentials, but for our tutorial we'll go further. We'll install extensions on demand as the tutorial progresses.

The official repository of extensions can be found in the [extensions](http://www.getsymphony.com/download/extensions/) section in Symphony website. While the official website is great and full of resources, a few years ago [@nickdunn](http://twitter.com/nickdunn) built a better extension repository named [symphonyextensions.com](http://symphonyextensions.com/). We'll use this one for the tutorial.

![symphony-extensions](screenshots/08-symphonyextensions.png)

## IV. Files Structure

```
mywebsite
├── extensions (all extensions go here)
├── install (installation files, for security reasons you'll want to drop off this after installation)
├── manifest (stuff, cache, log, temp files and the config.php, this is the kind of folder you include in the .gitignore)
├── symphony (the SymphonyCMS system files)
└── workspace (here is where lives all the frontend fun, your project goes here and here you'll work mostly of the time)
    ├── data-sources (each data source is a php file from here)
    ├── events (each event is a php file from here)
    ├── pages (each page is a xsl file from here)
    └── utilities (you can use this folder to include all xsl templates useful in your project)
```