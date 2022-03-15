---
title: "CLS: The Hidden Cost of Lazy Loading Components"
publishDate: "2022-03-15"
description: "Lazy loadable components let you ship less JS, but make sure you don't pay the cost of CLS."
keywords: "CLS, Cumulative Layout Shift, Core Web Vitals, lazy loading, async components"
image: "cls-hidden-cost.png"
series: "Optimising for Core Web Vitals"
---

When you optimise your web app, your goal is to make the experience better for the user: Usually that means 'faster' by transfering less data. But for lazy-loading components you could shoot yourself in the foot.

In this post I want to show you the pitfalls of lazy loading components so you don't have to pay the hidden cost with Cumulative Layout Shift (CLS).

If you'd like a refresher about Core Web Vitals, I explained them with GIFs in [this post](https://wicki.io/posts/2021-07-core-web-vitals/).

{{% stress %}}
**TL;DR:** this can be caused by slow and unstable connections (mobile). either don't lazy load the component at all or await for the js file to be loaded, like you'd do with API requests, and mounted.
{{% /stress %}}

## The problem with lazy loading components

{{< figure src="/posts/2022-03-hidden-cost-of-lazy-loading/CLS-caveat.gif" alt="CLS hidden cost: lazy loading components vs skeleton loading" caption="Wait for a lazy loaded component to be fully loaded before rendering: 0.144 CLS vs 0.0 CLS." >}}

You're right to think that cutting your web app up in smaller pieces will make it faster. But you can fall into a Core Web Vital trap if you don't know what you're doing.

With lazy loading components you open the door to more asyncness. It's possible that you lazy load a component that sits in the middle of your web content. If that component gets loaded and rendered after the content underneath, then Google will punish you with CLS.

**The evil thing**: The issue isn't always detectable. When you're using a stable connection or a desktop machine, it's very likely that JS files and components get loaded in one badge. That's why most CLS issues start appearing in the Mobile category of the Google Search Console.

## CLS measurement

I've seen a lot of confusion about Core Web Vitals, especially CLS.

Unlike other Core Web Vitals, CLS is continuously measured and _cumulatively_ added to the score. For a classic SPA web app this means that Google will keep the CLS score on a per-route basis.

CLS has the following characteristics:

* After each route change, the CLS resets to 0
* After any user interaction, you get a grace period of 500ms where CLS is **not** taken into account

{{% stress %}}
**Measurements by real users**: Chrome users send Core Web Vitals metrics to Google directly. It's not a Googlebot that captures these metrics while crawling the site.

These real user measurements are collected as [Field Data](https://web.dev/lab-and-field-data-differences/#field-data) and fow into Google's [CrUX report](https://developers.google.com/web/tools/chrome-user-experience-report).
{{% /stress %}}

That means you need to take the real world into account: 
* If you have a lot of traffic from India, but your servers are on the other end of the world, that your LCP (Largest Contentful Paint) will probably suffer.
* If you have a lot of traffic from China, it's likely that some services are blocked by Chinese ISPs and won't load. This could cause unwanted CLS within your content.

## Solutions

We need to be in full control of what to display to the user at what time. That's why we need to know the following:
* are API requests still loading?
* are async components (aka lazy loadable) components still loading?

If we check for these two things, we won't run into hidden CLS.

A skeleton loader is an ideal way to wait until both, API requests and async components, are ready.

### Solution #1: Don't lazy load components at all

The quickest and least error prone solution would be to pass on lazy loading components. In most cases the saved kilobytes through lazy loading doesn't justify the CLS that it might cause. If your performance budget allows it, go with this solution.

Let's assume we have a Vue web app with 10% logged-in users.

```tsx
function render() {
	// not all users require to download and render HugeComponent
	if (isLoggedIn) {
		return <HugeComponent />;
	}
}
```

Without code splitting we'd send the JS of `<HugeComponent>` to 90% of the useres that don't need it. This can affect LCP and FID.

With code splitting we'd pack the JS of `<HugeComponent>` into the additional-comps.js chunk and only send it over the wire when it's needed.

```typescript
// without code splitting
import HugeComponent from '@/components/HugeComponent';

// with code splitting
const HugeComponent = () => (await import(
	/* webpackChunkName: "additional-comps" */ 
	'@/components/HugeComponent')
).default;
```

There are two criterias that help you decide if you should lazy load a component or not:
* size of `<HugeComponent>`
* how often `<HugeComponent>` would be rendered for users

If you come to the conclusion that your performance budget is tight and you need to lazy load the component, see solution #2.

### Solution #2: Await loading and mounting of component

If your component isn't used for the majority of users and it would increase the bundle by a lot, have a look at this solution.

Usually we wait for an API request to resolve, before we render anything. But when lazy loading components we face an additional async layer: The JS of the component. So overall we need to await for two things:
1. async API requests to resolve
2. async component JS files to load and mount

The 2nd point from above can be tricky. You need to render the component but the mounting happens later.

```tsx {linenos=table}
function Parent({ isLoggedIn }) {
	const [isLoading, setLoading] = useState(false);
	// important: only hide the children with display: none.
	// if we used if-else, we'd never load the lazy loadable component;
	// and then we'd never change isLoading with its callback.
	const styles = { display: isLoading ? 'none' : 'block' };
	
	return (
		{/* HugeComponent is lazy loaded, because not all users will need it */}
		(isLoggedIn && <HugeComponent 
			style={ styles } 
			mounted={() => setLoading(true)}
		/>)

		{/* display skeleton element for time of loading */}
		(isLoading && <div className="skeleton-loader"></div>)
	);
}


function HugeComponent(props: { mounted: () => void }) {
	const [dataA, setData] = useState(null);

	useEffect(async () => {
		const result = await lib.request();
		setData(result);
		// tell the parent component that everything is ready to be fully rendered
		props.mounted();
	}, []);

	return (/* ... */);
}
```

<br>

If we didn't use `display: hidden` for the loading state on the `<HugeComponent>`, we'd never trigger the loading of the async loadable component. Thus Line 28 would never be reached and the `isLoading` state would stay on `false` forever. 

---

## Conclusion

Some libraries evolve fast and others aren't there yet, e.g. incompatible with server side rendering. That's why the implementation details may differ, but the CLS caveats remain.

I hope I could give you a heads up how to not lose your green URLs on Google.