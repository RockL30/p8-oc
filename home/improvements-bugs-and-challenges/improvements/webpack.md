# Webpack

Install webpack

```
npm install --save-dev webpack
```

Install babel-loader

```
npm install --save-dev @babel/core babel-loader @babel/preset-env
```

create webpack.config.js

```javascript
const path = require('path');

module.exports = {
    mode: 'production',
    entry: './js/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ],
    },
};
```

Add the script to package.json

```json
  "scripts": {
    "build": "webpack --mode production"
  }
```

Create a css folder and styles.css file

Import the node\_modules to the styles.css file

```css
@import "../node_modules/todomvc-common/base.css";
@import "../node_modules/todomvc-app-css/index.css";
```

Create the dist folder and bundle.js

```
npm run build
```

Remove or comment the link to the styles in the index.html, we don't need to refer them since we are not getting the styles via the bundle.js

```html
<!DOCTYPE html>
<html lang="en" data-framework="javascript">
  <head>
    <meta charset="utf-8" />
    <!-- Missing viewport -->
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!-- Missing description -->
    <meta name="description" content="Todo Project" />
    <title>To-do list app</title>
    <!-- Loading css via webpack -->
    <!-- <link rel="stylesheet" href="/node_modules/todomvc-common/base.css" />
    <link rel="stylesheet" href="/node_modules/todomvc-app-css/index.css" /> -->
  </head>
```

Add the bundle.js to the index.html, we want our bundle.js to be the last file, we also commented the app.js since we don't need to call it anymore.

```html
    </section>
    <footer class="info">
      <p>Double-click to edit a todo</p>
      <p>Created by Oscar Godson</p>
      <p>Refactored by Christoph Burgmer</p>
    </footer>
    <!-- <script src="node_modules/todomvc-common/base.js"></script> -->
    <script src="js/helpers.js"></script>
    <script src="js/store.js"></script>
    <script src="js/model.js"></script>
    <script src="js/template.js"></script>
    <script src="js/view.js"></script>
    <script src="js/controller.js"></script>
    <!-- <script src="js/app.js"></script> -->
    <script type="module" src="dist/bundle.js"></script>
  </body>
</html>
```

\
