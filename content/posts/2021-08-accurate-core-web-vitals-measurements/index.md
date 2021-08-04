---
title: "Accurate Daily Measurements of Core Web Vitals with Google Analytics"
publishDate: "2021-08-04"
description: "Create accurate Core Web Vitals reports of current daily measurements, not only averaged over a rolling 28-day window."
keywords: "webperf, Core Web Vitals, SEO, Google Analytics"
image: "angular-ruler.png"
---

{{< figure src="/posts/2021-08-accurate-core-web-vitals-measurements/report-all.png" caption="Create accurate Core Web Vitals reports with metric graphs and break downs by current daily measurements." >}}

Have you ever optimised your website for the Core Web Vitals (CWV)? Did you want to check your changes the next day—but Google's various tools don't give you current daily CWV metrics due to the rolling 28-day window?

In this post I'll review Google's toolset for measuring CWV and explain an with Google Analytics (GA) to see if your changes had any effect on CWV by the day.

{{% stress %}}
**TLDR**: use [GA tracking snippet for CWV](https://github.com/GoogleChrome/web-vitals/#using-analyticsjs) and [create CWV reports](https://web-vitals-report.web.app/).
{{% /stress %}}

---

# Google's tools for measuring CWV

There are various tools by Google that let you measure over single pages, similar pages or all pages as whole.

**Field data** aka real-user experiences:
- [Google Search Console](https://search.google.com/search-console): measures similar pages
- [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/): measures a single page & all pages as a whole
- CrUX (Chrome UX Report): measures single pages & all pages as a whole

**Lab data** aka single user experience:
- [Lighthouse](https://developers.google.com/web/tools/lighthouse): measures a single page
- [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools): measures a single page
- [Web Vitals Chrome Extension](https://chrome.google.com/webstore/detail/web-vitals/ahfhijdlegdabablpippeagghigmibma?hl=en): measures

The problem with these tools are that they can't be used continuously: We can't rely on lab data because it's basically local test data. And we can't use field data because **it only aggregates the value over a rolling 28-day window**. The latter means that we only get the average over the last 28 days (—so it takes a lot of days to see any change at all.

---

# Rolling 28-day window explained

_I dedicate a paragraph to this in particular because the _rolling 28-day window_ appears many times in CWV measurement—especially in how the field data is measured._

Imagine you had **27 days** of awful Cumulative Layout Shift (CLS) of 1.0 and on **day 28** you magically fix it to 0.

At **day 28** your average CLS would be 0.96—which would be rounded up to 1.0 again:

```
Days      | 1    2    3    4    5    6    7    8    9    10   11   12   13   14   15   16   17   18   19   20   21   22   23   24   25   26   27   28
-------------------------------------------------------------------------------------------------------------------------------------------------------
Daily CLS | 1.0  1.0  1.0  1.0  1.0  1.0  1.0  1.0  1.0  1.0  1.0  1.0  1.0  1.0  1.0  1.0  1.0  1.0  1.0  1.0  1.0  1.0  1.0  1.0  1.0  1.0  1.0  0.0 
Average   | 1.0  1.0  1.0  1.0  1.0  1.0  1.0  1.0  1.0  1.0  1.0  1.0  1.0  1.0  1.0  1.0  1.0  1.0  1.0  1.0  1.0  1.0  1.0  1.0  1.0  1.0  1.0  0.96
```

In this example above your 1.0 to 0 CLS optimisation would **take +23 days** until you reach the allowed mobile CLS of 0.1.

See in the following table how slowly the average is decreasing:

```
Days      | +1   +2   +3   +4   +5   +6   +7   +8   +9   +10  +11  +12  +13  +14  +15  +16  +17  +18  +19  +20  +21  +22  +23  +24  +25  +26  +27  +28
-------------------------------------------------------------------------------------------------------------------------------------------------------
Daily CLS | 0.0  0.0  0.0  0.0  0.0  0.0  0.0  0.0  0.0  0.0  0.0  0.0  0.0  0.0  0.0  0.0  0.0  0.0  0.0  0.0  0.0  0.0  0.0  0.0  0.0  0.0  0.0  0.0 
Average   | 0.9  0.8  0.8  0.8  0.8  0.8  0.7  0.7  0.6  0.6  0.6  0.5  0.5  0.5  0.4  0.4  0.4  0.3  0.3  0.3  0.2  0.2  0.1  0.1  0.1  0.0  0.0  0.0
```

---

# Create your report

For this we need three things:
- [web-vitals](https://github.com/GoogleChrome/web-vitals): to measure CWV metrics in the frontend
- [CWV GA tracking snippet](https://github.com/GoogleChrome/web-vitals#using-analyticsjs): to send these captured metrics over to GA
- [Web Vitals Report](https://web-vitals-report.web.app/): to create your CWV report by connecting your GA with this external reporting tool

Unfortunately **Google Analytics can't display the correct CWV data**, even though the data lies inside of it. You see averaged and delta values that show you the wrong results. The tracked CWV metrics still needs aggregation per user and per URL, which is not availabe in any view or reporting tool inside of GA.

That's why Google created the Web Vitals Report. You can connect with your GA account to it and it will extract the data. If you followed the default naming inside of the CWV GA tracking snippet, everything will work out of the box. You'll be rewarded with shiny graphs and an accurate* report.

*) GA [imposes a limit](https://github.com/GoogleChromeLabs/web-vitals-report#1-million-row-limit) in each report which can lead to sampling and an inaccurate report.

---

# More resources

- [An In-Depth Guide To Measuring Core Web Vitals](https://www.smashingmagazine.com/2021/04/complete-guide-measure-core-web-vitals/)
- [Google Forum: Explanation different data points in different tools](https://groups.google.com/a/chromium.org/g/chrome-ux-report/c/PRGtZJvmGkw/m/rzQV99-kCAAJ)
- [Tracking Changes in Search Console's Ore Web Vitals Report](https://tamethebots.com/blog-n-bits/monitoring-search-console-core-web-vitals)