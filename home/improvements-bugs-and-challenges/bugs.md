# 🐞 Bugs

addditem

in js/controller.js, we changed the addditem to additem

<figure><img src="../../.gitbook/assets/image (28).png" alt=""><figcaption><p>addItem</p></figcaption></figure>

Todo IDs

In the js/store.js file, we modified the way the ID was generated to be more unique with date.

<figure><img src="../../.gitbook/assets/image (29).png" alt=""><figcaption><p>Todo IDs</p></figcaption></figure>

removeItem

in js/controller.js, we simplified the removeItem

<figure><img src="../../.gitbook/assets/image (30).png" alt=""><figcaption><p>removeItem</p></figcaption></figure>

The second version of the code is more simple, direct and removes the unnecessary iteration and logging by directly calling the method on the model with the given `id`.&#x20;

\
Once the item is removed from the model, the UI is updated by calling the `render` method on the view , then after updating the UI, it calls the `_filter` method to re-apply any filters that might have been applied previously.



