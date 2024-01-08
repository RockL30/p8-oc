# ❓ Lighthouse

**Note**:\
To avoid bugs and errors obtained from installed extensions, I recommend installing the free version of chrome designed for developers, this browser will provide a separate clean chrome without any extensions, additionally it also provides extra tools for developers.

[Download Chrome Dev](https://www.google.com/chrome/dev/)

What is Lighthouse

Lighthouse allows to perform audits for perfomance, accessibility, PWAs(Progressive Web Apps), SEO(Search Engine Optimization), and more.\
[Click here to read more information about lighthouse.](https://developer.chrome.com/docs/lighthouse/overview)

\
Access Lightouse

Press F12 or right clickand inspect the browser window

<figure><img src="../../../.gitbook/assets/image (4) (1).png" alt=""><figcaption><p>Inspect page</p></figcaption></figure>

Click Lighthouse

<figure><img src="../../../.gitbook/assets/image (5) (1).png" alt=""><figcaption><p>Lighthouse</p></figcaption></figure>

Click Analyze page load

<figure><img src="../../../.gitbook/assets/image (6) (1).png" alt=""><figcaption><p>Analyze page</p></figcaption></figure>

Note: Sometimes results may vary

This is the final result, through Lighthouse we identified several small bugs and improvements in the diagnostics section.

<figure><img src="../../../.gitbook/assets/image (7) (1).png" alt=""><figcaption><p>Lighthouse Results</p></figcaption></figure>

Some Improvements include:

* 404, I opted to comment out the link to the base.js in the index.html, since it was not providing any utility to the code(CHECK)

<figure><img src="../../../.gitbook/assets/image (8) (1).png" alt=""><figcaption></figcaption></figure>

```html
    <!-- <script src="node_modules/todomvc-common/base.js"></script> -->
```

*   Missing labels, IDs and meta's for SEO

    * Viewport



    ```html
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    ```

    *   Description\


        ```html
            <meta name="description" content="Todo Project" />
        ```
    *   new-todo id\


        ```html
                <input
                  class="new-todo"
                  id="new-todo"
                  name="new-todo"
                  placeholder="What needs to be done?"
                  autofocus=""
                />
        ```
    *   toggle-all id\


        ```html
                <input class="toggle-all" type="checkbox" id="toggle-all" />
        ```
    *   used relative size for the body in node\_modules/todomvc-common\


        ```css
        body {
        	font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
        	line-height: 1.4em;
        	background: #f5f5f5;
        	color: #111111;
        	min-width: 14.38vw; /* 230px / 1600px = 0.14375 */
        	max-width: 34.38vw; /* 550px / 1600px = 0.34375 */
        	margin: 0 auto;
        	-webkit-font-smoothing: antialiased;
        	-moz-osx-font-smoothing: grayscale;
        	font-weight: 300;
        }
        ```
    *   Change the font-size to 12px for .info in node\_modules/todomvc-common, however this could also have been changed to be a relative font-size\


        ```css
        .info {
        	margin: 65px auto 0;
        	color: #4d4d4d;
        	/* changed font size */
        	font-size: 12px; 
        	text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
        	text-align: center;
        }
        ```
