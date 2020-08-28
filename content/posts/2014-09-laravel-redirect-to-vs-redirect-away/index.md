---
title: "Laravel Redirect::to() vs Redirect::away()"
publishDate: "2014-09-16"
description: "The difference between Laravel's URL::to and URL::asset."
keywords: "laravel"
featured: false
---

For external redirection

The use case here is to redirect the user to another domain. I haven’t come across Redirect::away() before, even though it’s been added in Laravel 4.0.8.

## Redirect::to()

{{< figure src="/posts/2014-09-laravel-redirect-to-vs-redirect-away/laravel-redirect-to.png" alt="Laravel Redirect::to()" >}}

## Redirect::away()

{{< figure src="/posts/2014-09-laravel-redirect-to-vs-redirect-away/laravel-redirect-away.png" alt="Laravel Redirect::away()" >}}

## Difference

Redirect::to() does additional URL checks and generations. Those additional steps are done in **Illuminate\Routing\UrlGenerator** and do the following, if the passed URL is not a fully valid URL (even with protocol):

- Determines if URL is secure
- rawurlencode() the URL
- trim() URL
