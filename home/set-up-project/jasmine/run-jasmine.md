# Run Jasmine

Verify the SpecRunner.html file, it should refer to ControllerSpec.js

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Jasmine Spec Runner</title>

    <link
      rel="stylesheet"
      href="../node_modules/jasmine-core/lib/jasmine-core/jasmine.css"
    />
    <script src="../node_modules/jasmine-core/lib/jasmine-core/jasmine.js"></script>
    <script src="../node_modules/jasmine-core/lib/jasmine-core/jasmine-html.js"></script>
    <script src="../node_modules/jasmine-core/lib/jasmine-core/boot.js"></script>

    <!-- include spec files here... -->
    <script src="ControllerSpec.js"></script>

    <script>
      // Bootstrap app data
      window.app = {};
    </script>

    <script src="../js/controller.js"></script>
  </head>
  <body></body>
</html>
```

Press 'Alt + L + O' to open the live view and see the results\


<figure><img src="../../../.gitbook/assets/image (9).png" alt=""><figcaption></figcaption></figure>

