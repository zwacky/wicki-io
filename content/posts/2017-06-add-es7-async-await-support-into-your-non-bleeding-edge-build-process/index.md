---
title: "Add ES7 Async/Await Support for your Webapp in 3 Easy Steps"
publishDate: "2017-06-24"
description: "Step by step guide to add async/await in your build flow."
image: "caniuse-async-await.png"
keywords: "es7, async await"
---

{{< figure src="/posts/2017-06-add-es7-async-await-support-into-your-non-bleeding-edge-build-process/caniuse-async-await.png" alt="Async / await compatibility" caption="Nearly all evergreen browsers support Async/Await natively" >}}

Async/Await has been around the block already some time. Now that it is in stage-4 since July 2016 ([stage finished](https://tc39.github.io/process-document/) in the ECMAScript proposals) and [nearly all evergreen browsers](http://caniuse.com/#search=async-functions) support it natively, too (except IE is late to the party as usual 😪) — it’s definitely time to take a second look.

## TL;DR I WANT ASYNC/AWAIT SUPPORT NAO!!1

- use [babel-preset-env](https://github.com/babel/babel-preset-env)
- **yarn add regenerator or npm install regenerator**
- add **node_modules/regenerator-runtime/runtime.js** (10.7kb minified) into your bundle

## #1 Requirements

### #1.1 Babel

Forget **preset-stage-0**, **babel-plugin-syntax-async-functions** or whatever you can still find on outdated resources. Just use [babel-preset-env](https://github.com/babel/babel-preset-env).

Your **.babelrc** could look like this for the bare minimum to work (add your fancy plugins and more if needed):

```json
{
  "presets": [
    [
      "env",
      {
        "targets": {
          "browsers": ["last 2 versions", "IE >= 9"]
        }
      }
    ]
  ]
}
```

If you’re like me, then you can’t just forget about Internet Explorer ≥ 9. babel-preset-env lets you specify a [browserlist config](https://github.com/ai/browserslist) that calculates your needs and then automatically takes care of all the needed babel plugins.

**Note:** The babel plugins do not bloat your bundle file. Polyfills do:

### #1.2 Polyfills

> An argument could be made for the transform to inject an import for **babel-regenerator-runtime** automatically, but generally Babel has shied away from automatically injecting imports since there is no guarantee that the user will be using a module system, so the global route was taken. ([from GitHub Issue December 2015](https://github.com/babel/babel/issues/3825#issuecomment-245406852))

Babel has shied away of automagically adding polyfills for generators. Therefore you need to add your own polyfill. There is a [babel-polyfill](https://www.npmjs.com/package/babel-polyfill) that adds all possible polyfills and has a proud size of 97kb minified. If you only need the generator polyfill — which is needed for async/await — then you can just use [facebook/regenerator](https://github.com/facebook/regenerator), which is used by babel-polyfill anyway.

- **yarn add regenerator** or **npm install regenerator --save** (no dev dependency because it will be injected into your frontend bundle)
- add **node_modules/regenerator-runtime/runtime.js** (10.7kb minified) into your bundle

Or don’t use a polyfill at all.

If you have set your browser targeting to **chrome >= 39** then you simply will use the native generators and will never make use of the polyfill. But then again, you’ll save 10kb minified here. Might be easier to add the polyfill and later on make the webapp available for IE9.

## #2 Linting (ESLint)

If you’re still using ES6 to write JavaScript, then you probably came across [ESLint](http://eslint.org/). It also comes with a neat [VS Code extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), that will read your .eslintrc.json correctly and lint accordingly.

You need to tell your .eslintrc.json config, that you’re now playing with the big tools and tell it to lint for ECMAScript version 8:

```json
{
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "parserOptions": {
    "ecmaVersion": 8
  },
  "rules": {}
}
```
