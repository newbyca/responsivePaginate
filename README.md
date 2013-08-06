Responsive Paginate
===============

Responsive Paginate turns a bunch of HTML anchor tags into a [responsive](http://en.wikipedia.org/wiki/Responsive_web_design) pagination UI. Check out a demo here:

[Responsive Paginate Demo](http://newbyca.github.io/responsivePaginate/)

Requires [jQuery](http://jquery.com/).

### Usage

#### Add the style sheet to your HTML document's head:
```
<head>
  ...
  <link href="responsivePaginate.css" rel="stylesheet" media="screen">
</head>
```

#### In the body of your HTML document format your page links like this:
```
<div class="responsivePaginate">
  <a href="/view/?page=1">1</a>
  <a href="/view/?page=2">2</a>
  <a href="/view/?page=3" data-selected="true">3</a>
  ...
  <a href="/view/?page=n">n</a>
</div>
```
Using numbers isn't required, you can use whatever labels you want. To tell responsivePaginate which page should be marked selected, add 'data-selected="true"' to its anchor tag.

#### Bootstrap the responsivePaginate script at the end of your HTML document like this:
```
...
<script src="http://code.jquery.com/jquery.js"></script>
<script src="responsivePaginate.js"></script>
<script>

    $(document).ready(function () {
      $(".responsivePaginate").responsivePaginate();
    });

</script>
</body>
</html>
``` 

