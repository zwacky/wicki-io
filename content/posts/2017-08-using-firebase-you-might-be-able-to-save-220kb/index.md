---
title: "Using Firebase with webpack? You might be able to save 220kb"
publishDate: "2017-08-22"
description: "Easy steps to follow to ensure you're not importing too much."
image: "firebase-webpack.png"
keywords: "firebase, webpack"
---

{{< figure src="/posts/2017-08-using-firebase-you-might-be-able-to-save-220kb/firebase-webpack.png" alt="Firebase webpack" >}}

<br>

{{% stress %}}
**MARCH 2020 UPDATE**: The new [Firebase JS SDK Alpha](https://modularfirebase.web.app/) makes your bundle up to 80% smaller! It now fully adopts tree-shaking and lets you import only what you truly need.
{{% /stress %}}

<br>

In a lot of tutorials I came across the comfortable solution of just adding import * as firebase from 'firebase' for your firebase import. As it turns out, there are 4 modular packages for Firebase. Here they are along with their sizes:

* **firebase/app:** 22.1kb `.initializeApp(firebaseConfig)`
* **firebase/auth:** 147.6kb `.auth()`
* **firebase/database:** 139.8kb `.database()`
* **firebase/storage:** 51.2kb `.storage()`

Usually you might not need all of these Firebase services and can `require()` or `import` just what is needed — with the help of webpack’s [Tree Shaking](https://webpack.js.org/guides/tree-shaking/).

## Code

**before:**

```javascript
import * as firebase from 'firebase';
```

**after:**

```javascript
import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';

// ...

firebase.initializeApp(firebaseConfig);
```

This will tell webpack (or whatever bundler you use) that they should also include storage and database. You can then still use `firebase.storage().ref(...)` in your code.

## Applied example

Let’s assume you only want to take advantage of Firebase’s great Database. Instead of adding **360.7kb**, you’d only have to add the firebase/database that imports **139.8kb**.

Resulting in **220.9kb** saved (61%)!