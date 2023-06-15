# 🚢 BATTLESHIP 
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/JCarlosLucio/battleship#readme)

> A Battleship game using Test Driven Development with Jest.  
> Developed for The Odin Project's
> [curriculum](https://www.theodinproject.com/lessons/node-path-javascript-battleship). 

## ✨ Demo
[![Battleship Homepage](../media/battleship-desktop.webp?raw=true)](https://jcarloslucio.github.io/battleship)

## 📜 Docs

### Install

```sh
npm install
```
Installs dependencies.

### Start

```sh
npm run start
```
Starts the development server.

### Test

```sh
npm run test
```
Runs the tests. 

### Watch

```sh
npm run watch
```
Runs the test runner in watch mode.

### Build

```sh
npm run build
```

Builds the app for production to the `dist` directory.

## 🚀 Manual Deployment

[Deploy to GitHub Pages from `dist` directory](https://gist.github.com/cobyism/4730490).
1. Remove `dist`directory from `.gitignore`.

2. Create production bundle:

```sh
npm run build

```
3. Make sure git knows about your subtree (the subfolder with your site).

```sh
git add dist && git commit -m "Initial dist subtree commit"
```

4. Use subtree push to send it to the `gh-pages` branch on GitHub.

```sh
git subtree push --prefix dist origin gh-pages
```
## 📖 Lessons Learned

- How to setup testing.
- Developing using [Test Driven Development](https://web.archive.org/web/20211123190134/http://godswillokwara.com/index.php/2016/09/09/the-importance-of-test-driven-development/) with [Jest](https://jestjs.io/).
- Using Factory Functions and the Module Pattern.
- Using [SASS (or SCSS)](https://sass-lang.com/) to style the application using the [SASS guidelines](https://sass-guidelin.es/).
- Manual deployment to GitHub Pages.
- Using [webpack](https://webpack.js.org/) for bundling and compiling.
- Using [contentHash] in webpack bundles for cache busting.
## Author

👤 **Juan Carlos Lucio**

* Github: [@JCarlosLucio](https://github.com/JCarlosLucio)
