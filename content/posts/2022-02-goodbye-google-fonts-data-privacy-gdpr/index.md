---
title: "Time to Say Goodbye to Google Fonts: Data Privacy and GDPR"
publishDate: "2022-02-17"
description: "Google Fonts is a data privacy concern. Learn why you should care."
keywords: "GDPR, Google Fonts, data privacy"
image: "goodbye-google-fonts.jpg"
series: "Time to Say Goodbye to Google Fonts"
---

{{< figure src="/posts/2022-02-goodbye-google-fonts-data-privacy-gdpr/goodbye-google-fonts.jpg" alt="Google Fonts" >}}

The German court [has ruled](https://rewis.io/urteile/urteil/lhm-20-01-2022-3-o-1749320/) last month that Google Fonts is not in compliance with GDPR.

> The integration of dynamic web content such as Google Fonts from US web services is illegal without the consent of the visitor.

A website operator received a fine of 100€. The Munich court clearly wanted to set an example. They even mentioned the next fine will be 250.000€ for the website operator if they don't comply.

Data protection authorities (DPA) in other EU countries became all ears. It's likely to see more rulings and enforcements of this in the name of GDPR.

In this post I want to show why you should care, even if you're not from Germany.

---

## How Google Fonts collects personal data

When a user wants to load a font via Google Fonts, it uses 2 types of requests:
1. **Dynamic request**: `fonts.googleapis.com/css2?family={font}`
2. **Asset request(s)**: `fonts.gstatic.com/s/{font}/...`

{{< figure src="/posts/2022-02-goodbye-google-fonts-data-privacy-gdpr/waterfall-requests.png" alt="Requests needed for Google Fonts" caption="Requests needed for Google Fonts" >}}

The dynamic request is the reason of the German court's ruling: The user's IP address is _shared_ with Google Fonts. This is object to personally identifyable information (PII).

From the Google Fonts [FAQ](https://developers.google.com/fonts/faq#what_does_using_the_google_fonts_api_mean_for_the_privacy_of_my_users) we get a fuzzy idea of what is going on:

> Google Fonts logs records of the CSS and the font file requests, and access to this data is kept secure.

* Are they logging user's IP addresses along other fingerprinting PIIs?
* Are they using these records to fill the gaps of a user's internet journey?

What we know is that they collect and store end-user data to be able to—what they state as needed to "serve fonts efficiently".

## "I'm running Google Fonts, what are my options?"

From a GDPR point of view you have 2 options:

1. **Host the fonts locally**: You can already download them from the Google Fonts website directly.
2. **Keep using it and ask your users for consent**: Because of the data transfer to Google you're required to ask your users for their consent. Implement a Consent Banner where Google Fonts is stated as one of the Data Processing Services (DPS). On top, you need to await your user's consent before requesting the Google Font service. Postponing font files is inherently not ideal.

Just ask yourself if the additional value of Google Fonts' convenience is worth it to pay the price for data privacy.

## Why you should care

When tech companies get enough data points to connect the dots they get a pretty good picture of what you do on the internet. This data is usually used for personalised advertisement. I could live with this if it was the user's only drawback of personal data collection.

Google Fonts is one of these data points that helps connecting further puzzle pieces together.

Besides the advertisement aspect, it's problematic because of:
* the lack of control over your personal data
* leaving a profile on tech companies' servers that can be accessed under certain requirements by the US authorities
* being on the internet where data leaks and hacks happen very often

{{% stress %}}
Currently it's up to us developers to protect the end-user. This is why you should care.
{{% /stress %}}

## Closing words

I hope I could shed some light on why Google Fonts is data privacy concern.

Also: I am not a lawyer.