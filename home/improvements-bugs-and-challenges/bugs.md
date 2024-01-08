# 🐞 Bugs

addditem

in js/controller.js, we changed the addditem to additem

Before

<figure><img src="../../.gitbook/assets/image (2).png" alt=""><figcaption><p>adddItem</p></figcaption></figure>

After

<figure><img src="../../.gitbook/assets/image (3).png" alt=""><figcaption></figcaption></figure>

Todo IDs

In the js/store.js file, we modified the way the ID was generated to be more unique with date.

Before

<figure><img src="../../.gitbook/assets/image (4).png" alt=""><figcaption><p>Before: save method in the store.js</p></figcaption></figure>

After

<figure><img src="../../.gitbook/assets/image (5).png" alt=""><figcaption><p>After: save method in the store.js</p></figcaption></figure>

removeItem

Loop without action

Before:

<figure><img src="../../.gitbook/assets/image (6).png" alt=""><figcaption><p>Before: removeItem in the store.js</p></figcaption></figure>

After:

<figure><img src="../../.gitbook/assets/image (7).png" alt=""><figcaption><p>After: removeItem in the store.js</p></figcaption></figure>

The second version of the code is more simple, direct and removes the unnecessary iteration and logging.

The second version directly calls the method on the model with the given `id`. Once the item is removed from the model, it updates the UI by calling the `render` method on the view . After updating the UI, it then calls the `_filter` method to re-apply any filters that might have been applied previously.



