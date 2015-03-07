# 05. Mywebsite frontend

Now lets start our frontend!

Symphony retrieves data from the Data Sources as XML and transforms it to HTML using XSLT. XSLT is a template engine language that is very easy to learn once you get the basics. I'll show you how to get started.

First thing we need now is to install the [Debug Devkit](http://symphonyextensions.com/extensions/debugdevkit/) extensions to see what's under the hood of these pages.

`git submodule add https://github.com/symphonycms/debugdevkit.git extensions/debugdevkit --recursive`

## I. Homepage

Now open your homepage [`http://localhost/mywebsite`](http://localhost/mywebsite)!

You'll see a blank page with just an `<h1>` for the page title. Perfect. Open the `/workspace/pages/homepage.xsl` and you'll see the following:

### a) Default homepage.xsl

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="xml"
  doctype-public="-//W3C//DTD XHTML 1.0 Strict//EN"
  doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"
  omit-xml-declaration="yes"
  encoding="UTF-8"
  indent="yes" />

<xsl:template match="/">
  <h1><xsl:value-of select="/data/params/page-title"/></h1>
</xsl:template>

</xsl:stylesheet>
```

### b) Homepage `?debug`

Now open the debug devkit adding `?debug` in the URL [`http://localhost/mywebsite/?debug`](http://localhost/mywebsite/?debug), and in the XML tab you'll see the following:

```xml
<?xml version="1.0" encoding="utf-8" ?>
<data>
    <params>
        <today>2014-11-05</today>
        <current-time>22:47</current-time>
        <this-year>2014</this-year>
        <this-month>11</this-month>
        <this-day>05</this-day>
        <timezone>-02:00</timezone>
        <website-name>Mywebsite</website-name>
        <page-title>Homepage</page-title>
        <root>http://localhost/mywebsite</root>
        <workspace>http://localhost/mywebsite/workspace</workspace>
        <http-host>localhost</http-host>
        <root-page>homepage</root-page>
        <current-page>homepage</current-page>
        <current-page-id>1</current-page-id>
        <current-path>/</current-path>
        <parent-path>/</parent-path>
        <current-query-string><![CDATA[debug]]></current-query-string>
        <current-url>http://localhost/mywebsite</current-url>
        <upload-limit>5242880</upload-limit>
        <symphony-version>2.5.1</symphony-version>
        <cookie-xsrf-token>5N/oAkCRtT8xqfarmBUlR2l/5Sg</cookie-xsrf-token>
        <cookie-username>bernardo</cookie-username>
        <cookie-pass>PBKDF2v1|10000|d9b1ac45e1f9ab5ad3ee|9YBlZEEMSI0/95e7PIDmJFPXtfxh5k/600rk5ppPdxMO9HHRNUy0Ag==</cookie-pass>
        <page-types>
            <item handle="index">index</item>
        </page-types>
        <page-events></page-events>
    </params>
    <events />
    <list-news>
        <section id="1" handle="news">News</section>
        <entry id="4">
            <title handle="vestibulum-nec-facilisis-augue">Vestibulum nec facilisis augue</title>
            <date iso="2014-11-02T14:18:00-02:00" timestamp="1414945080" time="14:18" weekday="7" offset="-0200">2014-11-02</date>
        </entry>
        <entry id="5">
            <title handle="praesent-dui-lorem">Praesent dui lorem</title>
            <date iso="2014-11-02T14:18:00-02:00" timestamp="1414945080" time="14:18" weekday="7" offset="-0200">2014-11-02</date>
        </entry>
        <entry id="2">
            <title handle="proin-eu-sagittis-diam">Proin eu sagittis diam</title>
            <date iso="2014-11-02T14:17:00-02:00" timestamp="1414945020" time="14:17" weekday="7" offset="-0200">2014-11-02</date>
        </entry>
        <entry id="3">
            <title handle="nullam-commodo-metus-a-felis-pharetra-faucibus">Nullam commodo metus a felis pharetra faucibus</title>
            <date iso="2014-11-02T14:17:00-02:00" timestamp="1414945020" time="14:17" weekday="7" offset="-0200">2014-11-02</date>
        </entry>
        <entry id="1">
            <title handle="lorem-ipsum-dolor-sit-amet">Lorem ipsum dolor sit amet</title>
            <date iso="2014-11-02T14:15:00-02:00" timestamp="1414944900" time="14:15" weekday="7" offset="-0200">2014-11-02</date>
        </entry>
    </list-news>
</data>
```

![debug-devkit](screenshots/26-debugdevkit.png)

### c) Edited homepage.xsl

What matters here is the `<list-news>` node, which is the result of the [List News](#a-list-news) Data Source. Now we'll make a list with this data using __XPath__ in the `/workspace/pages/homepage.xsl`, and the file will look like this:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="xml"
  doctype-public="-//W3C//DTD XHTML 1.0 Strict//EN"
  doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"
  omit-xml-declaration="yes"
  encoding="UTF-8"
  indent="yes" />

<xsl:template match="/">
  <ul>
    <xsl:for-each select="data/list-news/entry">
      <li>
        <a href="{/data/params/root}/news/{title/@handle}"><xsl:value-of select="title"/></a>
      </li>
    </xsl:for-each>
  </ul>
</xsl:template>

</xsl:stylesheet>
```

### c) Homepage output

And the HTML output will be:

```html
<!DOCTYPE ul PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<ul>
  <li>
    <a href="http://localhost/mywebsite/news/vestibulum-nec-facilisis-augue">Vestibulum nec facilisis augue</a>
  </li>
  <li>
    <a href="http://localhost/mywebsite/news/praesent-dui-lorem">Praesent dui lorem</a>
  </li>
  <li>
    <a href="http://localhost/mywebsite/news/proin-eu-sagittis-diam">Proin eu sagittis diam</a>
  </li>
  <li>
    <a href="http://localhost/mywebsite/news/nullam-commodo-metus-a-felis-pharetra-faucibus">Nullam commodo metus a felis pharetra faucibus</a>
  </li>
  <li>
    <a href="http://localhost/mywebsite/news/lorem-ipsum-dolor-sit-amet">Lorem ipsum dolor sit amet</a>
  </li>
</ul>
```

![homepage-result](screenshots/27-homepage-result.png)

## II. News page

Clicking on any of these links takes you to the __News__ page, which is the file `/workspace/pages/news.xsl`. First lets see what XML we have attached in this page. Click on any link and add `?debug` in the URL [`http://localhost/mywebsite/news/vestibulum-nec-facilisis-augue/?debug`](http://localhost/mywebsite/news/vestibulum-nec-facilisis-augue/?debug):

### a) News page ?debug

```xml
<?xml version="1.0" encoding="utf-8" ?>
<data>
    <params>
        <today>2014-11-05</today>
        <current-time>23:24</current-time>
        <this-year>2014</this-year>
        <this-month>11</this-month>
        <this-day>05</this-day>
        <timezone>-02:00</timezone>
        <website-name>Mywebsite</website-name>
        <page-title>News</page-title>
        <root>http://localhost/mywebsite</root>
        <workspace>http://localhost/mywebsite/workspace</workspace>
        <http-host>localhost</http-host>
        <root-page>news</root-page>
        <current-page>news</current-page>
        <current-page-id>2</current-page-id>
        <current-path>/news/praesent-dui-lorem</current-path>
        <parent-path>/</parent-path>
        <current-query-string><![CDATA[debug]]></current-query-string>
        <current-url>http://localhost/mywebsite/news/praesent-dui-lorem</current-url>
        <upload-limit>5242880</upload-limit>
        <symphony-version>2.5.1</symphony-version>
        <title>praesent-dui-lorem</title>
        <cookie-xsrf-token>5N/oAkCRtT8xqfarmBUlR2l/5Sg</cookie-xsrf-token>
        <cookie-username>bernardo</cookie-username>
        <cookie-pass>PBKDF2v1|10000|d9b1ac45e1f9ab5ad3ee|9YBlZEEMSI0/95e7PIDmJFPXtfxh5k/600rk5ppPdxMO9HHRNUy0Ag==</cookie-pass>
        <page-types />
        <page-events></page-events>
        <ds-current-news.system-id>
            <item handle="5">5</item>
        </ds-current-news.system-id>
        <ds-current-news>
            <item handle="5">5</item>
        </ds-current-news>
    </params>
    <events />
    <current-news>
        <section id="1" handle="news">News</section>
        <entry id="5">
            <title handle="praesent-dui-lorem">Praesent dui lorem</title>
            <date iso="2014-11-02T14:18:00-02:00" timestamp="1414945080" time="14:18" weekday="7" offset="-0200">2014-11-02</date>
            <author>
                <item id="1" handle="bernardo-dias-da-cruz" username="bernardo">Bernardo Dias da Cruz</item>
            </author>
            <text mode="formatted">
                <h1>Yey!</h1>
                <p><strong>Praesent dui lorem</strong>, efficitur in facilisis efficitur, congue vitae nulla. Morbi felis tellus, feugiat eget vulputate eu, sollicitudin in augue. Pellentesque quis magna at tellus dictum convallis eu in velit. Donec lorem ex, placerat id metus ut, placerat convallis ex. Aliquam vel massa erat. Suspendisse condimentum, dolor sit amet pharetra semper, ligula leo porttitor elit, a rhoncus lacus nibh vel tellus. Donec eget purus sagittis, volutpat sem in, finibus sem. Morbi est orci, congue in libero dapibus, lobortis tincidunt libero.</p>
                <p>Vestibulum nec facilisis augue. Morbi leo ipsum, gravida vitae dapibus nec, suscipit ac justo. Vestibulum tincidunt libero ac orci facilisis, vitae venenatis velit fringilla. Aenean quis ornare sapien. Sed eget condimentum nibh. Nulla ultricies turpis nisi, ut bibendum dui faucibus et. Aliquam mauris dui, placerat vitae turpis nec, laoreet viverra sapien. Integer sit amet semper tortor. Phasellus sollicitudin turpis eget felis mollis, a tincidunt dui vestibulum. Vestibulum lobortis risus ac nisi facilisis viverra.</p>
                <p>Proin eu sagittis diam. In feugiat egestas enim ac bibendum. Curabitur ullamcorper metus nec tellus aliquam, vel laoreet augue cursus. Suspendisse potenti. Praesent nunc nisi, hendrerit et condimentum quis, aliquam eu enim.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam commodo metus a felis pharetra faucibus. Ut vel enim vitae arcu interdum elementum a a diam. Suspendisse potenti. Sed ac turpis a mi pulvinar consectetur eget sed elit.</p>
            </text>
        </entry>
    </current-news>
    <news-images>
        <section id="2" handle="images">Images</section>
        <entry id="12">
            <caption handle="ubatuba">ubatuba</caption>
            <credits handle="andre">andré</credits>
            <image size="77 KB" bytes="79103" path="/uploads/images" type="image/jpeg">
                <filename>10743381_919876464707201_1100897924_n.jpg</filename>
                <meta creation="2014-11-02T15:11:24-02:00" width="960" height="720" />
            </image>
        </entry>
        <entry id="13">
            <caption handle="ubatuba">ubatuba</caption>
            <credits handle="andre">andré</credits>
            <image size="53 KB" bytes="54582" path="/uploads/images" type="image/jpeg">
                <filename>10749555_919876354707212_669708385_n.jpg</filename>
                <meta creation="2014-11-02T15:11:36-02:00" width="960" height="720" />
            </image>
        </entry>
        <entry id="11">
            <caption handle="ubatuba">ubatuba</caption>
            <credits handle="andre">andré</credits>
            <image size="75 KB" bytes="77705" path="/uploads/images" type="image/jpeg">
                <filename>10643250_919876458040535_2051957555_n.jpg</filename>
                <meta creation="2014-11-02T15:11:02-02:00" width="960" height="720" />
            </image>
        </entry>
        <entry id="10">
            <caption handle="ubatuba">ubatuba</caption>
            <credits handle="andre">andré</credits>
            <image size="38 KB" bytes="39575" path="/uploads/images" type="image/jpeg">
                <filename>1063075_919876374707210_1102205846_n.jpg</filename>
                <meta creation="2014-11-02T15:10:35-02:00" width="960" height="720" />
            </image>
        </entry>
        <entry id="9">
            <caption handle="ubatuba">ubatuba</caption>
            <credits handle="andre">andré</credits>
            <image size="127 KB" bytes="130549" path="/uploads/images" type="image/jpeg">
                <filename>974711_919876548040526_1619447394_n.jpg</filename>
                <meta creation="2014-11-02T15:10:30-02:00" width="960" height="720" />
            </image>
        </entry>
    </news-images>
</data>
```

Spot the `<ds-current-news.system-id>` inside `<params>`? That node has a list with all entry IDs from the __Current News__ Data Source. This is the param we used to link and filter the __News Images__ Data Source. Below in the XML you'll see `<current-news>` and `<news-images>` nodes resulted from Data Sources respectively.

### b) Edited news.xsl

After editing our `/workspace/pages/news.xsl` file it will look like this:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="xml"
  doctype-public="-//W3C//DTD XHTML 1.0 Strict//EN"
  doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"
  omit-xml-declaration="yes"
  encoding="UTF-8"
  indent="yes" />

<xsl:template match="/">
  <h1><xsl:value-of select="data/current-news/entry/title"/></h1>
  <p><xsl:value-of select="data/current-news/entry/date"/></p>
  <p><xsl:value-of select="data/current-news/entry/author/item"/></p>
  <xsl:value-of select="data/current-news/entry/text"/>

  <ul>
    <xsl:for-each select="data/news-images/entry">
      <li>
        <img src="{//data/params/workspace}{image/@path}/{image/filename}" width="500" alt=""/>
        <br/>
        <xsl:value-of select="caption"/>
        <br/>
        <xsl:value-of select="credits"/>
        <hr/>
      </li>
    </xsl:for-each>
  </ul>
</xsl:template>

</xsl:stylesheet>
```
### b) News page output

Yey! We have our news page with all content from the system. The HTML output contains just what you would expect:

```html
<!DOCTYPE h1 PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<h1>Praesent dui lorem</h1><p>2014-11-02</p><p>Bernardo Dias da Cruz</p>Yey!

Praesent dui lorem, efficitur in facilisis efficitur, congue vitae nulla. Morbi felis tellus, feugiat eget vulputate eu, sollicitudin in augue. Pellentesque quis magna at tellus dictum convallis eu in velit. Donec lorem ex, placerat id metus ut, placerat convallis ex. Aliquam vel massa erat. Suspendisse condimentum, dolor sit amet pharetra semper, ligula leo porttitor elit, a rhoncus lacus nibh vel tellus. Donec eget purus sagittis, volutpat sem in, finibus sem. Morbi est orci, congue in libero dapibus, lobortis tincidunt libero.

Vestibulum nec facilisis augue. Morbi leo ipsum, gravida vitae dapibus nec, suscipit ac justo. Vestibulum tincidunt libero ac orci facilisis, vitae venenatis velit fringilla. Aenean quis ornare sapien. Sed eget condimentum nibh. Nulla ultricies turpis nisi, ut bibendum dui faucibus et. Aliquam mauris dui, placerat vitae turpis nec, laoreet viverra sapien. Integer sit amet semper tortor. Phasellus sollicitudin turpis eget felis mollis, a tincidunt dui vestibulum. Vestibulum lobortis risus ac nisi facilisis viverra.

Proin eu sagittis diam. In feugiat egestas enim ac bibendum. Curabitur ullamcorper metus nec tellus aliquam, vel laoreet augue cursus. Suspendisse potenti. Praesent nunc nisi, hendrerit et condimentum quis, aliquam eu enim.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam commodo metus a felis pharetra faucibus. Ut vel enim vitae arcu interdum elementum a a diam. Suspendisse potenti. Sed ac turpis a mi pulvinar consectetur eget sed elit.
<ul>
  <li><img src="http://localhost/mywebsite/workspace/uploads/images/10743381_919876464707201_1100897924_n.jpg" width="500" alt="" /><br />ubatuba<br />andré<hr /></li>
  <li><img src="http://localhost/mywebsite/workspace/uploads/images/10749555_919876354707212_669708385_n.jpg" width="500" alt="" /><br />ubatuba<br />andré<hr /></li>
  <li><img src="http://localhost/mywebsite/workspace/uploads/images/10643250_919876458040535_2051957555_n.jpg" width="500" alt="" /><br />ubatuba<br />andré<hr /></li>
  <li><img src="http://localhost/mywebsite/workspace/uploads/images/1063075_919876374707210_1102205846_n.jpg" width="500" alt="" /><br />ubatuba<br />andré<hr /></li>
  <li><img src="http://localhost/mywebsite/workspace/uploads/images/974711_919876548040526_1619447394_n.jpg" width="500" alt="" /><br />ubatuba<br />andré<hr /></li>
</ul>
```

![news-simple-result](screenshots/28-news-simple-result.png)

## III. Improving News page output

But wait... Despite being unstyled (this is not a CSS tutorial, so we'll skip that part for now), the content format is wrong!!! Well, kinda wrong, we need to go deeper into the XSLT to see how we can make it better.

Let's grab some XSLT templates from SymphonyCMS website [Utilities](http://www.getsymphony.com/download/xslt-utilities/) section. We need to:

- Fix the date format,
- Fix the text output (we should see HTML instead of raw Markdown),
- Remove the inline width from images and resize it on the server side.

Let's handle those things one by one now:

### a) Fix the date format

For the date we want to use something like `2nd November, 2014` instead `2014-11-02`. To accomplish this we'll need a date format template that can be found in the official website. In the __XSLT Utilities__ section look for [Format Date/Time Advanced](http://www.getsymphony.com/download/xslt-utilities/view/20744/).

Copy the raw code in `/workspace/utilities/format-date.xsl` and include this file in the `/workspace/pages/news.xsl`, to do this add `<xsl:import href="../utilities/format-date.xsl"/>` before `<xsl:output ... />` and in place of:


```xml
<p><xsl:value-of select="data/current-news/entry/date"/></p>
```

include the `format-date` template like the following:

```xml
<p>
  <xsl:call-template name="format-date">
    <xsl:with-param name="date" select="data/current-news/entry/date"/>
    <xsl:with-param name="format" select="'%d;%ds; %m+;, %y+;'"/>
  </xsl:call-template>
</p>
```

(more instructions on how to use the template can be read in the utility file).


### b) Fix the text output (convert Markdown to HTML)

HTML manipulation is something really nice to do with XSL, because HTML is XML compatible. To accomplish this Allen Chang wrote a good technique, which is explained better in the [HTML Ninja Technique](http://www.getsymphony.com/learn/articles/view/html-ninja-technique/) article.

We'll do the same as we did with the __Format Date__ utility: create a utility file with [HTML Manipulation](http://www.getsymphony.com/download/xslt-utilities/view/20035/) and import into the page file.

To use this template just change `<xsl:value-of select="data/current-news/entry/text"/>` to `<xsl:apply-templates select="data/current-news/entry/text/*" mode="html"/>`.

In mywebsite we are already using the tag `h1` and in the sample above we also have a `h1` in the Markdown text. The "Ninja technique" is a powerful way to manipulate all HTML content from XML. In the ninja template utility include the following template:

```xml
<xsl:template match="h1 | h2 | h3 | h4" mode="html" priority="1">
  <xsl:param name="level" select="1" />
  
  <xsl:element name="h{substring-after(name(), 'h') + $level}">
    <xsl:apply-templates select="* | @* | text()" mode="html" />
  </xsl:element>
</xsl:template>
```

and all headers will be changed 1 level down.


### c) Remove the inline width from images and resize it on the server side.

This is a very nice feature to have in a CMS, and Symphony provides an extension that resize images and stores the result in cache, serving the resized image to the frontend. The extension is called [JIT Image Manipulation](http://symphonyextensions.com/extensions/jit_image_manipulation/). You can read more about it at [JIT Image Manipulation Concepts](http://www.getsymphony.com/learn/concepts/view/jit-image-manipulation/).

To install run `git submodule add https://github.com/symphonycms/jit_image_manipulation.git extensions/jit_image_manipulation --recursive` and install in the extension page in the administration.

In the news file change the line:

```<img src="{//data/params/workspace}{image/@path}/{image/filename}" width="500" alt=""/>```

to:

```<img src="{//data/params/root}/image/1/500/0{image/@path}/{image/filename}" alt=""/>```

---

The `/workspace/pages/news.xsl` file will look like this now:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:import href="../utilities/format-date.xsl"/>
<xsl:import href="../utilities/ninja.xsl"/>

<xsl:output method="xml"
  doctype-public="-//W3C//DTD XHTML 1.0 Strict//EN"
  doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"
  omit-xml-declaration="yes"
  encoding="UTF-8"
  indent="yes" />

<xsl:template match="/">
  <h1><xsl:value-of select="data/current-news/entry/title"/></h1>
  <p>
    <xsl:call-template name="format-date">
      <xsl:with-param name="date" select="data/current-news/entry/date"/>
      <xsl:with-param name="format" select="'%d;%ds; %m+;, %y+;'"/>
    </xsl:call-template>
  </p>
  <p><xsl:value-of select="data/current-news/entry/author/item"/></p>

  <xsl:apply-templates select="data/current-news/entry/text/*" mode="html"/>

  <ul>
    <xsl:for-each select="data/news-images/entry">
      <li>
        <img src="{//data/params/root}/image/1/500/0{image/@path}/{image/filename}" alt=""/>
        <br/>
        <xsl:value-of select="caption"/>
        <br/>
        <xsl:value-of select="credits"/>
        <hr/>
      </li>
    </xsl:for-each>
  </ul>
</xsl:template>

</xsl:stylesheet>
```

### The improved result:

![news-improved-result](screenshots/29-news-improved-result.png)