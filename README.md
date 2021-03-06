# `create-gatsby-blog-post`

[![Build Status](https://travis-ci.org/DSchau/create-gatsby-blog-post.svg?branch=master)](https://travis-ci.org/DSchau/create-gatsby-blog-post)

A utility and CLI to scaffold out a blog post that follows the gatsby `pages/` format, including a MD file with some default frontmatter (data) set up.

## Set up

`yarn add @dschau/create-gatsby-blog-post --dev`

or for global usage

`yarn global add @dschau/create-gatsby-blog-post`

## Usage

### `createPost(post: string, [options])`

```javascript
const { createPost } = require('create-gatsby-blog-post');

createPost('hello-world'); // will create the folder `src/pages/YYYY-MM-DD-hello-world` with `index.md` inside
```

#### Options

|Name|Description|Default|
|:--:|-----------|:-----:|
|`date`|Pass in a custom date object to use as the "now" value|`+new Date()`|
|`dateFormat`|Format the date according to a [date-fns format string](https://date-fns.org/docs/format)|`YYYY-MM-DD`|
|`root`|Root directory to use to place the blog post/markdown file|`src/pages`|
|`tags`|Whether to place frontmatter "tags" key in each post|`true`|

### CLI

```bash
create-post -- --date-format "YYYY-MMM-DD" hello-world
```
