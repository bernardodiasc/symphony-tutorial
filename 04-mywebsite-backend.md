# 04. Mywebsite backend

It's time to have some fun. First of all we need to understand what we are doing. Lets imagine a very simple news website, with a content structure like this:

```
- News
  - Title (one line text field)
  - Date (datetime field)
  - Text (textarea with markdown)
  - Author (author from the admin)
  - Images (gallery of images)
```

## I. Working with Sections

### a) Creating the News Section

Go to `Blueprints > Sections > Create new` and create the __News__ section as the following:

![news-section](screenshots/09-create-news-section.png)

At this moment we are not using any extensions so we just created the basic fields for the __News section__.

Now we need the Markdown formatter for the __Text field__. In your terminal, navigate to the project root and run:

`git submodule add https://github.com/symphonycms/markdown.git extensions/markdown --recursive`

_(more information about this extension here: [Markdown Text Formatter](http://symphonyextensions.com/extensions/markdown/))_

Back in the administration go to `System > Extensions`, select `Markdown Text Formatter` and in the bottom right selectbox, choose `Install` then click `Apply`.

![install-markdown-extension](screenshots/10-install-markdown-extension.png)

Go back to `Blueprints > Sections`, click on `News` and set the `Text Formatter` on the __Text field__ to `Markdown` and `Save changes`.

![apply-markdown](screenshots/11-apply-markdown.png)

### b) Filling News section with sample content

At this moment you already see the newly created section in the left side on main menu. Next we'll create some content in that section.

Go to `Content > News` and you'll see an empty list of entries. Click on the green button `Create New`.

![creating-content](screenshots/12-creating-content.png)

By now you'll be starting to understand why I love the Symphony administration interface: it's really simple!

![content-created](screenshots/13-content-created.png)

After creating a few entries with sample content you'll be able to see the entries list and sort entries as you want. This doesn't affect anything on the frontend, we'll be getting to that soon.

![news-section](screenshots/14-news-section.png)

### c) Creating the Images Section (linked sections)

Did you notice that I didn't include any image field in the __News section__. You did? Cool, you are paying attention :)

So lets create a new section called __Images__ with some meta information like __caption__ and __credits__. But first we need to create a new folder to upload all image files of this section. On your terminal run `mkdir workspace/uploads && mkdir workspace/uploads/images`.

For this section we'll need 2 more extensions. To install, run:

`git submodule add https://github.com/symphonycms/selectbox_link_field.git extensions/selectbox_link_field --recursive`

_(more information at [Selectbox Link Field](http://symphonyextensions.com/extensions/selectbox_link_field/))_

`git submodule add https://github.com/symphonists/order_entries.git extensions/order_entries --recursive`

_(more information at [Order Entries](http://symphonyextensions.com/extensions/order_entries/))_

Now go to `System > Extensions` and install both. The __Selectbox Link Field__ will provide a new kind of field that is used to link one section to another. The __Order Entries__ is also a new field type to allow sorting of entries by dragging the lines in the entries list.

![install-sbl-and-order-extensions](screenshots/15-install-sbl-and-order-extensions.png)

Now go to `Blueprints > Sections` and `Create New` section:

![creating-images-section](screenshots/16-creating-images-section.png)

After creating the __Images sections__, go to `Content > News`. See the new column called `Images` on the right side? Click on the `0 →` link of any entry to create sample content linked to that entry.

![linked-section](screenshots/17-linked-section.png)

### d) Filling Images section with sample content

Creating content is really straightforward, as we saw before. No big deal here either.

After creating some sample content, take a look in the __Images__ column of the __News Section__ entries list. You'll see something like `5 →`. Clicking this link takes you to the __Image Section__ entries list, filtered to display only related entries.

![images-section](screenshots/18-images-section.png)

## II. Working with Data Sources

So far so good! At this point we already have a complete administration interface for CRUD/BREAD stuff. Now we'll jump into Data Sources!

Data Sources are filters to fetch entries from sections on demand. To create a new Data Source go to `Blueprints > Data Sources > Create New`.

Before going further here we first need an idea of we want in the frontend. So lets imagine the following specs: In the homepage of __mywebsite__ I want to see a list of all news with links for the news page. In the list, news should be sorted by date (newest first) with date and title. In the news page I want to see all data of that news.

To accomplish this we'll need a few Data Sources. Go to `Blueprints > Data Sources > Create New` and create the following:

- List News (fetch all News, sorted by date desc)
- Current News (fetch only the current news)
- News Images (fetch all images of the current news, sorted by sort order field desc)

### a) List News

- Select source __News__ and sort by date desc.
- Disable pagination to fetch all entries.
- Select only title and date fields to output.

![list-news-datasource](screenshots/19-list-news-datasource.png)

### b) Current News

- Select source __News__ and set condition with required param `$title`.
- If this condition return false redirect to a 404 page.
- Filter by the __Title field__ with `$title` param.
- Disable pagination to fetch all entries.
- Select only title, date, author and text (formatted) to output.
- Also output `$ds-current-news.system-id` param with the results.

_Not sure where the `$title` param comes from? Hang in there, we'll see in the next section!_

![current-news-datasource](screenshots/20-current-news-datasource.png)

### c) News Images

- Select source __Images__.
- Filter by the __News field__ (the Selectbox link field) with the `$ds-current-news.system-id` param from the __Current News__ Data Source. This is called chaining datasources.
- Sort by __Sort order field__ desc.
- Disable pagination to fetch all entries.
- Select only caption, credits and image fields to output.

![news-images-datasource](screenshots/21-news-images-datasource.png)

### d) List of Data Sources

This is how `Blueprints > Data Sources` looks now:

![list-of-datasources](screenshots/22-datasources.png)

## III. Working with Pages

Now it's time to create the routes and attach data sources. Following the specs we'll have two pages: __Homepage__ and __News__.

### a) Homepage

Lets create the __Homepage__ first. This page is the only one with __Type__ `index`. To do this, go to `Blueprints > Pages`. While creating we'll also attach __List News__ Data Source on this page.

![creating-homepage](screenshots/23-creating-homepage.png)

### b) News

When creating the __News page__ we'll define the __Parameters__ with `title` value. This param is the `$title` used in the __Current News__ Data Source. We'll also attach __Current News__ and __News Images__ Data Sources in this page.

![creating-news](screenshots/24-creating-news.png)

### c) List of Pages

Now we have `Blueprints > Pages` looking like this:

![list-of-pages](screenshots/25-pages.png)