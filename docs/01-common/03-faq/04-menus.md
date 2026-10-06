<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 1901 · Common > FAQ > Menus -->

## Menus

### Terminology and Meanings

**1. Is  app_item_id a unique id for you or is our SKU?**
The app_item_id is the ID assigned to the item by the restaurant or POS. Each item has a unique ID in 99Food, and this field is used to map with 99Food's ID.

### Uploading Menus

**1. How long does it take for the new menu uploaded by the API to be displayed in the app?**
It takes about 1 or 2 minutes.

**2. Can we add dish sizes as modifiers?**
Yes, you can add dish sizes as modifiers.

**3. How to set the selling time of dishes?**
You can use the `sold_info_intl` interface. Read **Menu API > Upload Store Menu Details** under **Request Body Parameters - Sold_info_intl**

**4. What are the character length limits for dishes, description, etc.?**
- menu_name: 100 characters
- category_name: 100 characters
- item_name: 180 characters
- modifier_group_name: 100 characters
- short_desc: 100 characters

**5. How to map dishes if the menu in POS has a different structure than 99Food's?**
If a dish in the POS system is distinguished by size or other attributes, you need to map the dish to multiple entries when uploading to 99Food based on those differences.

**6. Can we send the whole menu always without troubles even if it just has one or two changes?**
Yes, you can upload the entire menu using the **Upload Store Menu Details** endpoint, even if there are only a few changes. Alternatively, you can use the **Update One Item** endpoint to update only specific items. 