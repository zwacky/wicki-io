---
title: "Time to Say Goodbye to Google Fonts"
publishDate: "2020-11-30"
description: "Partitioned browser cache renders CDN for cross-site resources unusuable."
keywords: "Google Fonts, CDN, browser partitioned cache"
image: "goodbye-google-fonts.jpg"
---

{{< figure src="/posts/2020-11-goodbye-google-fonts/goodbye-google-fonts.jpg" alt="Google Fonts" >}}

I've used Google Fonts in prototypes and in 10M+ MAU products. It's incredibly easy to get started with and provides an amazing font discovery. That's also why it's currently still used on over [42M websites](https://trends.builtwith.com/websitelist/Google-Font-API)!

This convenience has its price: Performance. Many have already pointed out [in great detail](https://wp-rocket.me/blog/self-hosting-google-fonts/) the cost of multiple requests. If you want the remaining speed boost, then you're best off downloading your used Google Fonts and self-host them.

This is nothing new. In fact it's been advocated already since years. Even Google themselves [adviced others to self-host fonts](https://www.youtube.com/watch?v=Mv-l3-tJgGk&feature=youtu.be&t=24m58s) in their Google I/O '18 talk about web performance.

{{< figure src="/posts/2020-11-goodbye-google-fonts/connection-view.png" alt="Connection View showcasing additional HTTP requests" caption="Using Google Fonts adds at least two additional HTTP requests (wp-rocket.me)" >}}

---

## The old performance argument

Google Fonts was designed to be distributed on a global CDN and reap the caching benefits from it. Users request fonts via said CDN and chances are that they have downloaded the font resources at an earlier point already from a different site.

This was reason enough for many developers to stop investigating more into performance sinkholes.

> "[...] Our cross-site caching is designed so that you only need to load a font once, with any website, and we'll use that same cached font on any other website that uses Google Fonts."
>
> — https://fonts.google.com/about

## Invalidating the old performance argument

{{% stress %}}
Since Chrome v86, released October 2020, cross-site resources like fonts can't be shared on the same CDN anymore. This is due to the partitioned browser cache (Safari has had this for years already).
{{% /stress %}}

In [this Google post](https://developers.google.com/web/updates/2020/10/http-cache-partitioning) they explain what the partitioned browser cache is and that it got mainly introduced to prevent a possible cross-site tracking mechanism.

## Cache partitioning in other browsers

Safari really cares about privacy. It circumvented this very cross-site tracking attack since years already. Then finally comes Chrome. Other browsers that are based off Chromium, still need to signal or implement the feature.

- ✅ **Chrome**: since v86 (October 2020)
- ✅ **Safari**: since 2013
- 🚫 **Firefox**: planning to implement
- 🚫 **Edge**: most likely soon
- 🚫 **Opera**: most likely soon
- 🚫 **Brave**: most likely soon
- 🚫 **Vivaldi**: most likely soon

## Conclusion

Google Fonts resources will be redownloaded for every website, regardless it being cached on the CDN. Self-host your fonts for better performance. The old performance argument is not valid anymore.

Thanks for checking this post out!
