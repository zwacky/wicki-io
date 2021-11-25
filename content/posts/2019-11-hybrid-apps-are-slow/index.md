---
title: '"Hybrid Apps are slow"'
publishDate: "2019-11-20"
description: "…and other things I’ve heard regarding Hybrid App development."
image: "hybrid-apps-are-slow.jpg"
keywords: "hybrid apps, capacitor, ionic"
featured: true
---

_…and other things I’ve heard regarding Hybrid App development._

Let’s talk about the elephant in the room: Performance. Let me just show you how fast and smooth Hybrid apps can be based on this footage of my last work: [JustWatch](https://www.justwatch.com/), a streaming search engine with 12M monthly active users. It’s been recorded on a OnePlus 6 (May 2018).

{{< youtube 0r946bZIEDA >}}

## "Hybrid Apps will never be faster than native"

Yes, this is true. But they also don’t need to be. With current hardware and browser engines the performance of Hybrid Apps is already way beyond what Facebook’s Hybrid App debacle delivered in 2012. With a good app structure, avoiding common performance pitfalls and applying good UX, your app can achieve a great performance.

## "Hybrid Apps get rejected by Apple"

Every now and then you’ll see a stream of Hybrid App developers tweeting about their app’s rejection by Apple. The causes are usually the same: bad usability and design, not Apple systematically sorting out Hybrid Apps.

[Fake emails](https://9to5mac.com/2017/12/19/apple-email-fake/) have been circulating stating apple would shut down apps built with Xamarin, PhoneGap and Appcelerator: These are a hoax.

Posts are getting more attention saying Apple wants to kill web technologies: These are unfounded opinions of other developers causing FUD.

## "You can’t do that with a Hybrid App"

Yes, there are limitations where Hybrid Apps are not the right tool for the job. I’m just going to stick my neck out there and say that most app requirements will never meet these limitations.

The native capabilities are covered in Hybrid Apps with Cordova plugins—or better and more painless with Capacitor plugins. Even though some of the Cordova ones are a pain to implement.

## "There are no big Hybrid Apps in the app stores"

Have a quick look at [Ionic’s Showcase](https://showcase.ionicframework.com/apps/top) site: All these apps boast at least 0.5M downloads on a single platform.

Besides the JustWatch app—which currently has 3M downloads for Android and 4M for iOS—there are some significantly larger apps built on Ionic. Some can be shared and some that don’t want tech details talked about publicly.

## "Hybrid Apps don’t look native"

You may have come across your fair share of apps that are basically HTML packed into a WebView: Narrow UI elements to tap on, feedbackless interactions, terrible transitions and more atrocities. I have, too.

Frameworks like Ionic have put a lot of effort in the past years into the look and feel and make their components usable and extendible with: Immediate feedback upon interaction, defaulting to the right size for your finger, seamless and jitter-less lazy loading, following platform guidelines and much more.

# Wrapping up: Hybrid Apps vs Native Apps

In the past people only knew one reason why Hybrid Apps were built: Money needed to build the app quicker on several platforms. But gradually Hybrid Apps got faster and smoother and trade offs became smaller and smaller. In case of this, other factors were getting more attention:

* Desired iteration speed across one or multiple platforms
* Your existing team structure, knowledge and hiring
* And again: Money

---

If you found this post interesting please leave a ❤️ on this tweet and consider following my 🎢 journey about #webperf, #buildinpublic and #frontend matters [on Twitter](https://twitter.com/zwacky).
<br /><br />
{{< tweet 1197177867576205312 >}}
