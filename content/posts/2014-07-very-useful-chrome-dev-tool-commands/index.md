---
title: "4 Very Useful Chrome Dev Tool Commands"
publishDate: "2014-07-04"
description: "Check out these useful Chrome Dev Tool commands."
image: "chrome.jpeg"
keywords: "hybrid apps, capacitor, ionic"
---

{{< figure src="/posts/2014-07-very-useful-chrome-dev-tool-commands/chrome.jpeg" alt="Chrome Dev Tools: Chrome" >}}

## \$\_ — last output

maybe you don't want to store results in a variable for quick calculations and just want to chain those computations.

{{< figure src="/posts/2014-07-very-useful-chrome-dev-tool-commands/last-output.jpeg" alt="Chrome Dev Tools: last output" >}}

## \$0 — currently inspected element

useful if you want to output or alter the selected element.

{{< figure src="/posts/2014-07-very-useful-chrome-dev-tool-commands/currently-inspected-element.jpeg" alt="Chrome Dev Tools: currently inspected element" >}}

## angular.element(\$0).scope() — get AngularJS's scope

combined with \$(0) this makes a great use to inspect a specific element and then check what it's scope looks like.

{{< figure src="/posts/2014-07-very-useful-chrome-dev-tool-commands/get-angularjs-scope.jpeg" alt="Chrome Dev Tools: get angularJS scope" >}}

## console.time(str) and console.timeEnd(str) — calculate the passed time

who hasn’t fiddled around with new Date(); or similar to profile a certain action in the code.

Just pass an identifyable string to each function call, so that the dev tools know where to start and to end.

{{< figure src="/posts/2014-07-very-useful-chrome-dev-tool-commands/calculate-passed-time.jpeg" alt="Chrome Dev Tools: calculate passed time" >}}

The same is possible for CPU profiling using `console.profile(msg)` and `console.profileEnd(msg)`.