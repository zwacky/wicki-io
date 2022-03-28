---
title: "The Duality of CLS with Lazy Loading Components"
publishDate: "2022-03-26"
description: "Why lazy loadable components can cause CLS on slower connections and how to prevent it."
keywords: "CLS, Cumulative Layout Shift, Core Web Vitals, lazy loading, async components"
image: "duality-of-CLS.png"
series: "Optimising for Core Web Vitals"
---

{{< figure src="/posts/2022-03-cls-with-lazy-loading-components/duality-of-CLS.png" alt="The Duality of CLS with Lazy Loading Components" >}}

When you optimise your web app, your goal is to make the experience better for the user: That means usually 'faster' by transferring and parsing less data. But caution: The same web app can cause Cumulative Layout Shift (CLS) on slower connections but runs without CLS on faster connection.

If you'd like a refresher about Core Web Vitals, I explained them with GIFs in [this post](https://wicki.io/posts/2021-07-core-web-vitals/).

{{% stress %}}
**TL;DR:** slower connections _can_ result in CLS when lazy loading components that you wouldn't see on wifi connections.

Either don't lazy load the component at all or await for the js file to be loaded and mounted.
{{% /stress %}}

## The Duality

{{< figure src="/posts/2022-03-cls-with-lazy-loading-components/CLS-slow-vs-fast-connection.gif" caption="Slow vs fast connection: Same web app with different CLS." >}}

We assume that a web app loads the same on slower connections, just _slower_. Unfortunately that's not always the case with lazy loadable components.

With lazy loadable components we deal with two _asyncnesses_:
1. async API responses (JSON)
2. async lazy loading components (JS)

What if the API responses (1) are faster than the dynamically loaded JS (2)? What if you lazy load a component that sits in the middle of your web content? The answer to these questions you see in the screencapture above: Google will punish you with CLS.

## CLS measurement

I've seen a lot of confusion about Core Web Vitals, especially CLS.

Unlike other Core Web Vitals, CLS is continuously measured and _cumulatively_ added to the score. For a classic SPA web app this means that Google will keep the CLS score on a per-route basis.

CLS has the following characteristics:

* After each route change, the CLS resets to 0
* After any user interaction, you get a grace period of 500ms where CLS is **not** taken into account

{{% stress %}}
**Measurements by real users**: Chrome users send Core Web Vitals metrics to Google directly. It's not a Googlebot that captures these metrics while crawling the site.

These real user measurements are collected as [Field Data](https://web.dev/lab-and-field-data-differences/#field-data) and flow into Google's [CrUX report](https://developers.google.com/web/tools/chrome-user-experience-report).
{{% /stress %}}

That means you need to take the real world into account: 
* If you have a lot of traffic from India, but your servers are on the other end of the world, that your LCP (Largest Contentful Paint) will probably suffer.
* If you have a lot of traffic from China, it's likely that some services are blocked by Chinese ISPs and won't load. This could cause unwanted CLS within your content.

## Solutions

We need to be in full control of what to display to the user at what time. With duality in mind, we need to know the following:
* are API requests still loading?
* are async components components still loading?

A skeleton loader is an ideal way to wait until both, API requests and async components, are ready.

### Solution #1: Don't lazy load components at all

The quickest and least error prone solution would be to pass on lazy loading components. In most cases the saved kilobytes through lazy loading doesn't justify the CLS that it might cause. If your performance budget allows it, go with this solution.

Let's assume we have a web app with 10% logged-in users.

```tsx
function render() {
	// not all users require to download and render HugeComponent
	if (isLoggedIn) {
		return <HugeComponent />;
	}
}
```

Without code splitting we'd send the JS of `<HugeComponent>` to 90% of the users that don't need it. This can affect LCP and FID.

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

Wait for async components to be lazily loaded and mounted can be tricky. You need to render the component but the mounting happens later. Here's a gist of how it could be done.

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

If we didn't use `display: hidden` for the loading state on the `<HugeComponent>`, we'd never trigger the loading of the async component. Thus, Line 28 would never be reached and the `isLoading` state would stay on `false` forever. 

---

## Conclusion

When you lost green URLs in the [Google Search Console](https://search.google.com/search-console) due to CLS and you can't reproduce it yourself, try debugging your web app with a slower connection. 

So if you're using lazy loadable components, chances are high that might be a victim of the duality of CLS.

If you found this post interesting please leave a ❤️ on this tweet and consider following my 🎢 journey about #webperf, #buildinpublic and #frontend matters [on Twitter](https://twitter.com/zwacky).
<br /><br />
{{< tweet 1508354371205185537 >}}