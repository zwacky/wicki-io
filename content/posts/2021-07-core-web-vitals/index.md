---
title: "What are Core Web Vitals"
publishDate: "2021-07-20"
description: "The 3 new performance metrics that Google will rank against in its June 2021 update."
keywords: "core web vitals, LCP, FID, CLS, google udpate, seo"
image: "core-web-vitals.png"
---

{{< figure src="/posts/2021-07-core-web-vitals/core-web-vitals-green-urls.png" caption="Passing your Core Web Vitals and google will reward you with visibility." >}}

With Google's June 2021 update Core Web Vitals (CWV) will become a factor in SEO ranking.
It measures the quality of a site by these three metrics: **LCP**, **FID** and **CLS**.

If you pass all of them them, Google will reward you with more visibility.

You can check how well you do on these metrics via several ways:
- [Pagespeed Insights](https://developers.google.com/speed/pagespeed/insights/)
- [Search Console](https://search.google.com/)
- [WebDev Measure](https://web.dev/measure/)
- Chrome DevTools & Lighthouse
- [Web Vitals Chrome Extension](https://chrome.google.com/webstore/detail/web-vitals/ahfhijdlegdabablpippeagghigmibma?hl=en)
- [Custom event tracking with Google Analytics](https://github.com/GoogleChrome/web-vitals#send-the-results-to-google-analytics)

---

# Largest Contentful Paint (LCP)

{{% stress %}}
LCP marks the point in the page load timeline when the page's main content has likely loaded.

—[web.dev](https://web.dev/lcp/)
{{% /stress %}}

{{< figure src="/posts/2021-07-core-web-vitals/LCP-techcrunch.gif" caption="LCP will keep changing until the Largest Contentful Paint is done, which here is at 1.766s" >}}

The faster you make the biggest content on the above-the-fold appear, the better your metric will be. 

If you can preload the biggest image already, e.g. with `<link rel="preload" href="...">` or make the content appear without rendering it with your Javascript Framework, you'll win big.

Causes of LCP:
- Slow server response times
- Render-blocking Javascript and CSS
- Slow resource load times
- Client-side rendering

---

# First Input Delay (FID)

{{% stress %}}
FID measures the time from when a user first interacts with a page to the time when the browser is actually able to begin processing event handlers in response to that interaction.

—[web.dev](https://web.dev/fid/)
{{% /stress %}}

{{< figure src="/posts/2021-07-core-web-vitals/FID-imdb.gif" caption="0.666s pass until you see the website working with your interaction." >}}


Javascript is synchronous and single-threaded. If a user interaction happens while the thread is busy, you'll have to wait. If you have too many libraries that load at runtime, worse even if you don't need them right away, this can increase the FID.

It's similar to [TTI (Time to Interactive)](https://web.dev/tti/) that you might have heard of already. However FID will only start to be measured from the user interaction. Whereas TTI will be measured from the very start of loading the site.

Causes of FID:
- too much javascript code to execute right away, especially 3rd party
- ad networks can push lots of unneeded Javascript
- not using code-splitting (e.g. with [webpack](https://webpack.js.org/guides/code-splitting/), [Rollup](https://rollupjs.org/guide/en/#code-splitting), [Parcel](https://parceljs.org/code_splitting.html))

---

# Cumulative Layout Shift (CLS)

{{% stress %}}
CLS is a measure of the largest burst of layout shift scores for every unexpected layout shift that occurs during the entire lifespan of a page.

—[web.dev](https://web.dev/cls/)
{{% /stress %}}

{{< figure src="/posts/2021-07-core-web-vitals/CLS-giphy.gif" caption="CLS is happening here that makes the content jump around." >}}

Layout shifts only happen when an element higher up is making other elements move. If the element is changing and there is nothing after it, it doesn't count as a layout shift—as well as DOM changes that were caused by a user interaction with a grace period (500ms).

Note: Mobile viewports and 3G devices will cause much more CLS. Make sure to throttle your connection while optimising your page for these metrics.

Causes of CLS:
- images without size attributes
- requests finish later that will inject content above existing content
- lazy loaded components