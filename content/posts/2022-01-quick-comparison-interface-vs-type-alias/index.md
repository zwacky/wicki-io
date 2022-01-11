---
title: "Interface vs Type Alias in TypeScript—Quick Comparison"
publishDate: "2022-01-06"
description: "Learn what Typescript feature is possible to implement as Type Alias or Interface and how do they compare."
keywords: "typescript, interface, type alias, interface vs type"
image: "quick-comparison.jpg"
---

{{< figure src="/posts/2022-01-quick-comparison-interface-vs-type-alias/quick-comparison.jpg" alt="Quick Comparison: Interface vs Type Alias" >}}

This can be confusing for anyone working with TypeScript—beginner or seasoned programmer. Both ways can cover similar needs.

In this post you'll quickly see what Typescript feature is possible to implement as Type Alias or Interface. I stayed brief and spicy to give the post an overview character.

<br>

👉 **TLDR:** You don't care about each difference? What should you use?

> Use `interface` until you need `type`
> 
> —[orta](https://twitter.com/orta/status/1356129195835973632)

# Overview: Interface (I) vs Type Alias (T)

| Feature | I | T | Example |
|---|---|---|---|
| Primitives | ❌ | ✅  | `type UUID = string` |
| Extend / Intersect | ✅ | ✅ | `Response & ErrorHandling` |
| Unions | ❌ | ✅ | `string | number` |
| Mapped object types  | ❌ | ✅ | `['apple' | 'orange']: number` |
| Augment existing types | ✅ | ❌ | `declare global { interface Window { … } }` |
| Declare type with typeof | ❌ | ✅ | `Response = typeof ReturnType<fetch>` |
| Tuples | ✅ | ✅ | `[string, number]` |
| Functions | ✅ | ✅ | `(x: number, y: number): void` |
| Recursion | ✅ | ✅ | `Nested { children?: Nested[] }` |

---

## Primitives

❌: Interface<br>
✅: Type Alias

`string`, `number` and `boolean` make up the Primitives in Typescript.

{{< figure src="/posts/2022-01-quick-comparison-interface-vs-type-alias/primitives.png" alt="Primitive type declaration comparison in TypeScript">}}

## Extend / Intersect

✅: Interface<br>
✅: Type Alias

Although intersect and extend are not 100% the same for interface and type alias, I put them together in this example. The differences arise when type keys appear in both types that you want to extend or intersect from.

So if the extended or intersected key is not the same type:
- Type Alias lets you do it but changes that type to `never`
- Interface spits an error that the types are not compatible

{{< figure src="/posts/2022-01-quick-comparison-interface-vs-type-alias/intersect-extend.png" alt="Extend & intersect comparison in TypeScript">}}

## Mapped object types

❌: Interface<br>
✅: Type Alias

Type the keys in your objects with this.

Here are a few useful applications of this:
- `[key: string]`: only strings as key allowed
- `[key: number]`: only numbers as key allowed
- ``[key in keyof T as `get${Capitalize<string & key>}`]``: only allow keys that start with `get...`, e.g. as seen in a Getter object

{{< figure src="/posts/2022-01-quick-comparison-interface-vs-type-alias/mapped-object-types.png" alt="Mapped object types comparison in TypeScript">}}

## Unions

❌: Interface<br>
✅: Type Alias

Typescript's equivalent to `OR`: The type is either `x` or `y` or `z` or as many as you want.

{{< figure src="/posts/2022-01-quick-comparison-interface-vs-type-alias/unions.png" alt="Unions comparison in TypeScript">}}

## Augment existing types

✅: Interface<br>
❌: Type Alias

You can add fields to already existing types. It's useful when you add a new field (e.g. `jQuery` library for auto completion) onto an existing type (e.g. `window`).

{{< figure src="/posts/2022-01-quick-comparison-interface-vs-type-alias/augment-existing-types.png" alt="Augment existing types comparison in TypeScript">}}

## Tuples

✅: Interface<br>
✅: Type Alias

If you've used hooks in react, then you know the usefulness of tuples. 

A single function call can return an array of values and functions, that are destructured and can be used as fully typed variables: `const [name, setName] = useState('')`

{{< figure src="/posts/2022-01-quick-comparison-interface-vs-type-alias/tuples.png" alt="Tuples comparison in TypeScript">}}

## Functions

✅: Interface<br>
✅: Type Alias

Functions can be annotated with Parameter Types and Return Types.

{{< figure src="/posts/2022-01-quick-comparison-interface-vs-type-alias/functions.png" alt="Functions comparison in TypeScript">}}

## Recursion

✅: Interface<br>
✅: Type Alias

Recursion are simple to use. Make sure you add the optional `?` to the recursive property. Otherwise the TS compiler spits out an error upon searching an endless recursion.

{{< figure src="/posts/2022-01-quick-comparison-interface-vs-type-alias/recursion.png" alt="Recursion comparison in TypeScript">}}

---

## More resources

- [Typescript Playground](https://www.typescriptlang.org/play)
- [Types or Interfaces in react](https://github.com/typescript-cheatsheets/react#types-or-interfaces)
- [Interfaces vs Types in TypeScript](https://stackoverflow.com/a/65948871/825444) by Mark
- [Types vs. interfaces in TypeScript](https://blog.logrocket.com/types-vs-interfaces-in-typescript/) by Leonardo Maldonado
- [Interface vs Type alias in TypeScript 2.7](https://medium.com/@martin_hotell/interface-vs-type-alias-in-typescript-2-7-2a8f1777af4c) by Martin Hochel

---

If you found this post interesting please leave a ❤️ on this tweet and consider following my 🎢 journey about #webperf, #buildinpublic and #frontend matters [on Twitter](https://twitter.com/zwacky).

{{< tweet 1480863714454687746 >}}