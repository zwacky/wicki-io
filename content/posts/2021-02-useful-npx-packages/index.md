---
title: "Useful Npx Packages for the Developer's Everyday Life"
publishDate: "2021-02-16"
description: "Check out 5 useful npx packages for killing ports, deleting node_modules folders and comparing time zones."
keywords: "npx, npm, useful npm packages, developer"
image: "npm.png"
---

Npm comes with a neat tool called `npx` that lets you directly execute packages from the npm registry. It temporarily downloads it behind the scene and won't _pollute_ your local or global npm environment.

In this post I'll skip useful packages that are bound to libraries and frameworks like Angular's `ng`, react's `create-react-app` or capacitor's `cap`. 

I focus on packages that have helped me through my daily life as a developer.

## npx npkill

{{< figure src="/posts/2021-02-useful-npx-packages/npkill.gif" alt="npx npkill" >}}

**usage:** `npx npkill`

**repo:** [npkill](https://npkill.js.org/)

It's no secret that node_modules folders [are the black holes of software development](/posts/2021-02-useful-npx-packages/node_modules-black-hole.png). This package will help you get back your disk space by selecting and deleting the node_modules of your (unused) projects.

## npx kill-port

{{< figure src="/posts/2021-02-useful-npx-packages/kill-port.gif" alt="npx kill-port" >}}

**usage:** `npx kill-port 8080`

**repo:** [npkill](https://github.com/tiaanduplessis/kill-port)

Did some webpack dev server not shut down nicely and now 8080, or any port for that matter, is in use? Just kill it with kill-port.

## npx http-server

{{< figure src="/posts/2021-02-useful-npx-packages/http-server.gif" alt="npx http-server" >}}

**usage:** `npx http-server .`

**repo:** [http-server](https://github.com/http-party/http-server)

Easily serve a directory as a simple webserver. Especially useful for compiled webapps in /build folders.

## npx timezone-compare

{{< figure src="/posts/2021-02-useful-npx-packages/timezone-compare.gif" alt="npx timezone-compare" >}}

**usage:** `npx timezone-compare`

**repo:** [timezone-compare](https://github.com/imbhargav5/timezone-compare)

This package helped me to plan quickly setting up meetings with others of different timezones.

---

## Honorable Mention: npx emoj

{{< figure src="/posts/2021-02-useful-npx-packages/emoj.gif" alt="npx emoj" >}}

**usage:** `npx emoj happy`

**repo:** [emoj](https://github.com/sindresorhus/emoj)

I used this package to death! Sadly its API, that came from getdango's [Emoji & Deep Learning](https://getdango.com/emoji-and-deep-learning/), is not maintained anymore. Thus the emoji results are not ground breaking anymore.

As a replacement I suggest using `ctrl + cmd + space` (macOS), that will help you a bit on the way of finding the right emoji.

---

If you found this post interesting please leave a ❤️ on this tweet and consider following my 🎢 journey about #webperf, #buildinpublic and #frontend matters [on Twitter](https://twitter.com/zwacky).
<br /><br />
{{< tweet 1362380781809762312 >}}
