---
title: 'PWA: Create a "New Update Available" Notification using Service Workers'
publishDate: "2017-06-13"
description: "Dive into the world of PWAs covering service workers, cache busting and offline-first."
keywords: "PWA, service workers, offline-first, cache busting"
image: "new-update-available-popup.gif"
featured: true
---

{{< figure src="/posts/2017-06-pwa-create-a-new-update-available-notification-using-service-workers/new-update-available-popup.gif" alt="New Update available popup" caption="New Update available popup." >}}

PWAs are getting more and more coverage and support. They improve the web experience and can load your app instantly with their great ability for HTTP caching (among other things, but this post only covers caching).

The thing with Offline-First is, that you cache all the resources that are needed for launching up the webapp — even your index.html!

> **Note**: No sweat! Browser implementations prevent you from deploying a version that will be cached for all eternity. For instance Chrome treats max-age of 1 day or 1 week or 1 year as 24 hours.

## #1 Structure

For example reasons, the 3 needed files are linked to the source of an actual PWA ([gamemusicplayer.io](gamemusicplayer.io)) for a clearer understanding.

- **index.html** — registers the service-worker.js and is wrapped inside the isUpdateAvailable Promise
- **service-worker.js** — defines what files will be cached
- **somewhere inside your webapp** — listens to isUpdateAvailable Promise and acts accordingly

## #2 Why can’t it just load the latest version?

When the browser loads your PWA, it doesn’t know if there is a new version available. It promptly loads the cached assets. There are different cache strategies, depending on your use case.

- `networkOnly` – only fetch from network
- `cacheOnly` – only fetch from cache
- `fastest` – fetch from both, and respond with whichever comes first
- `networkFirst` – fetch from network, if that fails, fetch from cache
- `cacheFirst` – fetch from cache, but also fetch from network and update cache

In 99% of the cases you can decide on 2 user experiences:

1. Load the page instantly from the cache
2. Check first if network is available, otherwise load from cache as a fallback

Both options are offline-first. The 2nd option, if network is available, will therefore always deliver the most updated version, but with a delay.

If you want to give your users that ⚡️-fast page load experience and notify them when a newer version of their cached version is available, you’d need to hook into the onupdatefound function in your Service Worker.

## #3 How to check if your cached files have changed

We can hook into onupdatefound function on the registered Service Worker. Even though you can cache tons of files, the Service Worker only checks the hash of your registered service-worker.js. If that file has only 1 little change in it, it will be treated as a new version.

### #3.1 Register service-worker.js

The following code should be inside `<script>` tags in your **index.html**. It will add a `isUpdateAvailable` function to the global scope, so it can later be used as a Promise.

```javascript
// make the whole serviceworker process into a promise so later on we can
// listen to it and in case new content is available a toast will be shown
window.isUpdateAvailable = new Promise(function (resolve, reject) {
  // lazy way of disabling service workers while developing
  if (
    "serviceWorker" in navigator &&
    ["localhost", "127"].indexOf(location.hostname) === -1
  ) {
    // register service worker file
    navigator.serviceWorker
      .register("service-worker.js")
      .then((reg) => {
        reg.onupdatefound = () => {
          const installingWorker = reg.installing;
          installingWorker.onstatechange = () => {
            switch (installingWorker.state) {
              case "installed":
                if (navigator.serviceWorker.controller) {
                  // new update available
                  resolve(true);
                } else {
                  // no update available
                  resolve(false);
                }
                break;
            }
          };
        };
      })
      .catch((err) => console.error("[SW ERROR]", err));
  }
});

// Update:
// this also can be incorporated right into e.g. your run() function in angular,
// to avoid using the global namespace for such a thing.
// because the registering of a service worker doesn't need to be executed on the first load of the page.
```

### #3.2 Check if update is available

In this example i’m using [Ionic 3](http://ionicframework.com/) to easily display a toast that will tell the user that there has been an update — in case of an update.

## #4 Caveats

Problems can arise when you use a hosting service, that automatically adds `max-age` headers to your resources — especially your service-worker.js.

For instance if you host your PWA over [Firebase Hosting](https://firebase.google.com/docs/hosting/), you’ll find this configuration useful.

(Bonus: the public folder is set to `./platforms/browser/www/` because [Ionic 3](https://ionicframework.com/) makes it very easy for PWAs from start to finish!)

```json
{
  "hosting": {
    "public": "./platforms/browser/www/",
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "service-worker.js",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=0"
          }
        ]
      }
    ]
  }
}
```

## #5 Summary

Service Workers aren’t as scary as they seem at first. With the appropriate safety mechanisms in place (never cache more than 24 hours) you can create a great experience for your users without having to change your domain name.

---

If you found this post interesting please leave a ❤️ on this tweet and consider following my 🎢 journey about #webperf, #buildinpublic and #frontend matters [on Twitter](https://twitter.com/zwacky).
<br /><br />
{{< tweet 874976958748270592 >}}
