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

Press '_**Alt + L + O**_' to open the _live view_ and see the results\


<figure><img src="../../../.gitbook/assets/image (9) (1).png" alt=""><figcaption><p>Jasmine test results</p></figcaption></figure>

Related Articles:\


{% content-ref url="../../tests/create-and-modify-tests/" %}
[create-and-modify-tests](../../tests/create-and-modify-tests/)
{% endcontent-ref %}

{% content-ref url="../../tests/how-to-create-tests.md" %}
[how-to-create-tests.md](../../tests/how-to-create-tests.md)
{% endcontent-ref %}
