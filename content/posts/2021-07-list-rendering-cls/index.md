---
title: "How List Rendering Can Cause Huge Cumulative Layout Shift"
publishDate: "2021-07-28"
description: "This post explains a hidden caveat of list rendering in JavaScript frameworks in term of CLS."
summary: "JS frameworks like Vue can give elements a unique key. In a list rendering they might be able to reuse these keyed list items, when the list is changing. The already created DOM nodes don't need to be recreated. This is a great performance gain. But when a list changes and the nodes merely switch their position, the keyed items can be considered as a shift in the DOM (CLS) by Core Web Vitals on slow connection devices."
keywords: "Core Web Vitals, SEO, webperf, Javascript"
image: "cls-slow-connection-devices.png"
series: "Optimising for Core Web Vitals"
---

Do you...
- care about Core Web Vitals, especially Cumulative Layout Shift (CLS)
- use list rendering with a JS Framework (`v-for`, `*ngFor`, ...)

If you answered both with yes, then please read on.

{{< figure src="/posts/2021-07-list-rendering-cls/update-list-cls.gif" caption="Slow connection device causes 0.51 CLS upon updating a list." >}}

JS frameworks—such as Vue, Angular or React—can cache DOM nodes of list items*. Filtering a list will therefore be faster, because DOM nodes of list items can potentially be reused. This reuse is done by moving the DOM nodes around, instead of re-creating them.

But when a list changes and the nodes of list items merely switch their positions, **the reused items are considered as a shift in the DOM (CLS) by Core Web Vitals on slow connection devices**.

*) Vue uses `:key`, React uses `key`, Angular uses `*ngFor` with `trackBy`

---

# Why only on slow connection devices?

CLS takes user interaction into account. When content is changing after a click, it's not counted towards the CLS until a grace period of 500ms. If the delay of content changing takes longer than 500ms, you'll be penalised with the full CLS score. 

Fast connection devices will usually finish updating the list before the grace period ends.

Keep an eye out in your Google Search Console for URLs that are frequented by countries that are further away from your servers/CDNs and have a lower average mobile bandwidth.

{{< figure src="/posts/2021-07-list-rendering-cls/gsc-urls-affected-by-lower-bandwith.png" caption="A whopping 433k Indian URLs are affected here by list rendering on slow connection devices." >}}

---

# Solution

Google's calculation of CLS [has been changed before](https://web.dev/evolving-cls/), so I would love to see this here too. Until then it's on us to not get penalised.

We'd have to make sure, that the DOM elements get re-created everytime a list gets updated or filtered. I wouldn't advise to completely drop the unique key (`:key`). Rather think of a key for each list item that is tied to the request itself, e.g. `:key="item.id + "-" + requestQuery"`. The filtering itself will have a brief flash due to recreating the DOM node, but considering the Green URLs that Google will give you it's worth it. 

With this you can continue with infinite scroll and page navigation without perf loss.

---

If you found this post interesting please leave a ❤️ on this tweet and consider following my 🎢 journey about #webperf, #buildinpublic and #frontend matters [on Twitter](https://twitter.com/zwacky).
<br /><br />
{{< tweet 1420640015877607424 >}}
