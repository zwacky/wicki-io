---
title: "One Font Format to Rule Them All: WOFF2"
publishDate: "2021-11-10"
description: "Learn why WOFF2, and WOFF as a fallback, is the only font format you need."
keywords: "woff2, woff, font format"
image: "woff2.png"
---

{{< figure src="/posts/2021-11-woff2-one-font-format-to-rule-them-all/woff2.png" alt="One Font Format to Rule Them All: WOFF2" >}}

Learn why WOFF2, and WOFF as a fallback, is the only font format you need.

If you've been around as a web developer for some time, chances are you encountered the various font formats for the web: EOT, OTF, TTF, WOFF, WOFF2 and SVG. More or less blindly we made sure all font formats were there and the CSS font-face pointed to them in our web projects.

In this post I try to give some historical perspective and a font format comparison on the web.

---

## Timeline

{{< figure src="/posts/2021-11-woff2-one-font-format-to-rule-them-all/font-formats-timeline.png" caption="Historical releases of nowadays still used font format" alt="Historical releases of nowadays still used font format" >}}

It took time and iterations to have what we've ended up with.

With more efficient font formats, thanks to compression, browsers were able to support them.

Have a look at Pedro Amado's elaborate [Font Format Timeline](https://typeforge.files.wordpress.com/2011/11/timeline_formatos_software_fontes_v10-01.jpg). This shows, that there are in fact many more facets to font formats than we think.

---

## Comparison

I'll go ahead and use the following criteria for my score to compare font formats:
- Browser support as of November 2021
- File size (aka format efficiency)

For the file size I used [Comic Sans Neue](http://comicneue.com/) and the browser support I gathered from [caniuse.com](https://caniuse.com).
Here's the let's have a look at the following table ordered historically with these criteria:

| Font Format | Release year | Browser support | File size | **Score**  |
|-------------|--------------|-----------------|-----------|------------|
| OTF/TTF     | 1985         | 98.6%           | 57 kb     | **69/100** |
| SVG         | 2001         | 19.4%           | 113 kb    | **20/100** |
| EOT         | 2007         | 0.87%           | 27 kb     | **43/100** |
| WOFF        | 2009         | 98.6%           | 30 kb     | **88/100** |
| WOFF2       | 2017         | 96.8%           | 23 kb     | **98/100** |

<br>

Let me explain why WOFF2 scored higher than WOFF in this comparison: It all comes down to the 7 kb in file size. Generally if your site shows the user content more quickly, your conversion will increase—even if the gain is only in the hundred milisecond range.

Your fonts could be:
- blocking content from appearing (invisible text)
- cause layout shifts
- delay further assets from downloading on flaky mobile networks
- sending bad signals to Google (LCP & CLS from Core Web Vitals)

---

## How to convert

It's a very good idea to self host your fonts for performance reasons. I described one case in my [Time to Say Goodbye to Google Fonts](https://wicki.io/posts/2020-11-goodbye-google-fonts/)
post.

How to best convert a font type to WOFF2 and WOFF depends where you got your font type from:

* **Google Fonts:** Download the used font types on Google Fonts and use [google-webfonts-helper](http://google-webfonts-helper.herokuapp.com/fonts) to download the other font formats.
* **everything else:** Use [Font Squirrels's Webfont Generator](https://www.fontsquirrel.com/tools/webfont-generator). Its 'optimal' setting even only spits out WOFF2 and WOFF files.

---

## Conclusion

WOFF2, and WOFF as fallback, is enough nowadays*.

*) *if* your site doesn't need support for antiquated browseres like IE8.
