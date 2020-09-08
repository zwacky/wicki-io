---
title: "Angular’s ng-repeat Finish Event"
publishDate: "2015-09-15"
description: "Useful trick to make sure ng-repeat has finished rendering."
keywords: "angularjs"
---

## Demo

https://jsbin.com/gutahovufe/1/edit?html,js,output

## Explanation

Sometimes you need to execute code after your list has been rendered on the client side.

```javascript
// js
angular.module('ngRepeatDemo', [])
  .controller('AppCtrl', function() {
    var vm = this;
    vm.alphabet = [
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
    ];
    vm.finished = function() {
      alert('fired');
      // now javascript execution has been stopped and you should see all DOM nodes been created
      // note: interpolation may not have been done completely
    };
  });
```

```html
<!-- html -->
<div ng-repeat="letter in app.alphabet" ng-init="$last && app.finished()">
  {{letter}}
</div>
```

The whole magic comes from the `ng-init` part. the `$last` makes sure, that it only gets fired, when the last element has been rendered to the DOM.

This will also fire whenever the list changes and a change has been issued by the digest cycle.