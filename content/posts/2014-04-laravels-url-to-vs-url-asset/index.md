---
title: "Laravel's URL::to() vs URL::asset()"
publishDate: "2014-04-28"
description: "The difference between Laravel's URL::to and URL::asset."
keywords: "Laravel"
featured: false
---

**Short answer:** No, not really.

You want to have the following code:

```html
<script src="js/bootstrap.js"></script>
```

Now you can achieve this using blade syntax:

```html
// using URL::to()
<script src="{{ URL::to('js/bootstrap.js') }}"></script>

// using URL::asset()
<script src="{{ URL::asset('js/bootstrap.js') }}"></script>
```

## URL::to()

The method is [implemented](http://laravel.com/api/source-class-Illuminate.Routing.UrlGenerator.html#76-98) like this:

{{< figure src="/posts/2014-04-laravels-url-to-vs-url-asset/laravel-url-to.png" alt="Laravel URL::to()" >}}

## URL::asset()

The method is [implemented](http://laravel.com/api/source-class-Illuminate.Routing.UrlGenerator.html#112-129) like this:

{{< figure src="/posts/2014-04-laravels-url-to-vs-url-asset/laravel-url-asset.png" alt="Laravel URL::asset()" >}}

## Difference

Both methods get the job done.

- **URL::to()** additionally encodes the segments of the passed url with rawurlencode
- **URL::asset()** removes index.php from the path (which shouldn’t be in first place)

So you get more utility by using URL::to(), but also takes longer to execute (approx. 25% more than URL::asset()). But it’s strongly neglectible, since calling 100 times URL::to() takes 0.003523 ms.

## Alternatives

If you’re using blade, you can use the following to easily output style and script tags.

```
{{ HTML::script('js/bootstrap.js') }}
{{ HTML::style('css/bootstrap.min.css') }}
```

Or using any of Asset Management packages like [orchestra/asset](https://github.com/orchestral/asset).
