---
title: "Time to Say Goodbye to Google Fonts"
publishDate: "2020-11-30"
description: "This browser caching change kills the utility of cross-site resource CDNs like Google Fonts."
keywords: "Google Fonts, CDN, browser partitioned cache"
image: "goodbye-google-fonts.jpg"
---

{{< figure src="/posts/2020-11-goodbye-google-fonts/goodbye-google-fonts.jpg" alt="Google Fonts" >}}

I've used Google Fonts in prototypes and in 10M+ MAU products. It's incredibly easy to get started with and provides an amazing font discovery. That's also why it's currently still used on over [42M websites](https://trends.builtwith.com/websitelist/Google-Font-API)!

This convenience has its price: Performance. Many [have](https://blog.cloudflare.com/fast-google-fonts-with-cloudflare-workers/) [already](https://medium.com/clio-calliope/making-google-fonts-faster-aadf3c02a36d) [pointed](https://www.keycdn.com/blog/web-font-performance#disadvantages-of-web-fonts) [out](https://blog.logrocket.com/self-hosted-fonts-vs-google-fonts-api/) the cost of multiple requests. If you want the remaining speed boost, then you're best off downloading your used Google Fonts and self-host them.

This is nothing new. In fact it's been advocated already since years. Even Google themselves [advised others to self-host fonts](https://www.youtube.com/watch?v=Mv-l3-tJgGk&feature=youtu.be&t=24m58s) in their Google I/O '18 talk about web performance.

## Self-hosting fonts vs Google Fonts

By nature Google Fonts, even with all its font and CSS optimisations, can't be faster than self-hosted fonts. 

Sia wrote [a great post](https://medium.com/clio-calliope/making-google-fonts-faster-aadf3c02a36d) where she compared the performance between Google Fonts and self-hosted fonts without the impact of a CDN.

{{< figure src="/posts/2020-11-goodbye-google-fonts/with-google-fonts.png" alt="Network flow with Google Fonts" caption="Optimised Google Fonts loading with preconnect" >}}

{{< figure src="/posts/2020-11-goodbye-google-fonts/without-google-fonts.png" alt="Network flow with self-hosting fonts" caption="Optimised self-hosting fonts with preload" >}}

---

## The old performance argument

So if the bottom-line performance is in self-hosting fonts' favour: What was the argument that convinced us developers that Google Fonts is at least as performing as the self-host approach?

Google Fonts was designed to be distributed on a global CDN and reap the caching benefits from it. Users request fonts via said CDN. Chances are that they have downloaded the font resources at an earlier point already from a different site.

> "[...] Our cross-site caching is designed so that you only need to load a font once, with any website, and we'll use that same cached font on any other website that uses Google Fonts."
>
> — https://fonts.google.com/about

## Invalidating the old performance argument

{{% stress %}}
Since Chrome v86, released October 2020, cross-site resources like fonts can't be shared on the same CDN anymore. This is due to the partitioned browser cache (Safari has had this for years already).
{{% /stress %}}

In [this Google post](https://developers.google.com/web/updates/2020/10/http-cache-partitioning) they explain what the partitioned browser cache is. It got only introduced to prevent a possible cross-site tracking mechanism.

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
