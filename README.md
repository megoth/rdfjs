# RDF + JS = &#10084;

This is the Git repository for [rdfjs.dev](https://rdfjs.dev/), which is a website that aims to make it easier for
developers to use RDF (aka Linked Data, aka Semantic Web) in combination with JavaScript or TypeScript. The website is
not affiliated with the [RDF/JS Community Group](https://rdf.js.org/), although they've graciously allowed me to use
their logo for this website.

If you want me to add another library or otherwise improve upon the existing content, please let me know
by [creating an issue](https://github.com/megoth/rdfjs/issues). This is a project I'm maintaining on my free time,
so I cannot promise a quick reply, but I'll try to get back to you.

This website is created
using [Vite](https://vitejs.dev/), [React](https://react.dev/), [React Router](https://reactrouter.com/),
[React Hook Form](https://react-hook-form.com/), and [useLocalStorage](https://github.com/nas5w/use-local-storage). The
design is composed using [Bulma](https://bulma.io/), [React Icons](https://react-icons.github.io/react-icons/),
and [Prism](https://prismjs.com/). It's written
in [TypeScript](https://www.typescriptlang.org/), [TSX](https://react.dev/learn/typescript), [MDX](https://mdxjs.com/),
and [CSS Modules](https://github.com/css-modules/css-modules). For authentication in the Solid demos I've made use of
[@ldo/solid-react](https://github.com/o-development/ldobjects/tree/main/packages/solid-react).

## Using the website as template for your apps

The project is licensed using the [MIT License](https://en.wikipedia.org/wiki/MIT_License), so there are few
restrictions wrt reusing the code. If anything, I would like for this to be a good starting point for RDF frontend apps,
so let me know if you have any feedback on that.

To get everything up and running, clone the repo and install dependencies:

```bash
npm install
```

Now you can start development by running `npm run dev`.

If you want to build the site, run `npm run build`. You can preview the output by running `npm run preview`.

I'm using [Vercel](https://vercel.com/) for continuous integration and I can recommend it for these kinds of projects.