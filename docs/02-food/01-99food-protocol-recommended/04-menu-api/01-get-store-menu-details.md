<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 1961 · Food > 99Food Protocol (Recommended) > Menu API > Get Store Menu Details -->

## Get Store Menu Details

The **Get Store Menu Details** endpoint provides the ability to fetch all menu items of a store.
> **IMPORTANT:** This endpoint provides you a reference of all the menu items however it is **NOT** possible for you to use the structure directly to re-submit the menu through the **Upload Store Menu Details - V3** as it will report errors that need to be fixed one by one before being successfully sent. It is only recommended to be used to get the app_item_id and item_name relation only.

### Basic Information

| **Name** | **Description** |
| --- | --- |
| `URL` | [https://openapi.99food.com/v3/item/item/list](https://openapi.99food.com/v3/item/item/list) |
| `Method` | GET |
| `Permission` | Available |

### Request Path Parameters

| **Name**       | **Type** | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                      | **Required** | **Example**                                  |
|----------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------|----------------------------------------------|
| `auth_token`   | string   | The `auth_token` for the shop                                                                                                                                                                                                                                                                                                                                                                                                        | Yes          | ZGQ5ZjVlZGUyYmFhNDM2ZmE0ZDA5OTE5ZjI1YzBhNjU= |

### Response Body Parameters - Structure - Level 1

This is the first level of the menu configuration for a store.

| **Name**          | **Type**     | **Description**                                       | **Example**                |
|-------------------|--------------|-------------------------------------------------------|----------------------------|
| `menus`           | array | List of menus. Currently, only one menu is supported. | [{menu1}]                  |
| `categories`      | array | List of the store’s menu categories.                  | [{category1}, {category2}] |
| `items`           | array | List of the store’s items.                            | [{item1}, {item2}]         |
| `modifier_groups` | array | List of the store’s modifier groups.                  | [{mg1}, {mg2}]             |


### Response Body Parameters - Menus

The identifiers of different menus.

| **Name**           | **Type**     | **Description**                                                                                                                      | **Example**                                |
|--------------------|--------------|--------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------|
| `app_menu_id`      | string       | ID for the menu in **your** system, provided by the restaurant or POS. Multiple menus shall be mapped to 1 menu.                     | menuID01                                   |
| `menu_name`        | string       | Menu name displayed.                                                                                                                 | Main Menu                                  |
| `app_category_ids` | array | All of the IDs for the menu categories available in **your** system while this menu is active.                                       | ["Hamburguesas01","Pollo02"]               |


### Response Body Parameters - Categories

A grouping that allows related items to be displayed together on a menu.

| **Name**          | **Type**     | **Description**                                                                                                                       | **Example**                                |
|-------------------|--------------|---------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------|
| `app_category_id` | string       | ID for the category in **your** system, provided by the restaurant or POS. Map directly.                                              | Hamburguesas01                             |
| `category_name`   | string       | The category name displayed. Map directly.                                                                                            | Hamburguesas                               |
| `app_item_ids`    | array | All of the IDs for the items in **your** system, provided by the restaurant. The sequence of the items is shown in the same sequence. | ["Classic Burger01", "BBQ Burger02"]       |
| `priority`        | int          | The priority (order) of the category displayed in C-App.                                                                              | 1                                          |

### Response Body Parameters - Items

Individual objects that can be ordered and configured to be visible in specific days, times and special dates.

| **Name**                 | **Type**     | **Description**                                                                                                                                                                                                                                             | **Example**                                |
|--------------------------|--------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------|
| `app_item_id`            | string       | ID for the item in **your** system, provided by the restaurant or POS. Map directly.                                                                                                                                                                        | Hamburguesas01                             |
| `app_external_id`        | string  | Free-form text field reserved for the restaurant's use, e.g. for POS integrations.                                                                                                                                                                          | Hamburguesas                               |
| `item_name`              | string       | Item name displayed.                                                                                                                                                                                                                                        | Hamburguesas                               |
| `short_desc`             | string       | An optional description for the Item.                                                                                                                                                                                                                       | null                                       |
| `head_img`               | string       | The URL of the Items’ image.                                                                                                                                                                                                                                | https://imgurl.host/static/rlabtest/       |
| `sold_info_intl`         | array | Sales period per day. The continuous time span during which the item is available.|                                            |
| `price`                  | int          | The price to charge for ordering the item. Allows overrides from items selected in modifier groups. **Note:** Price is always an integer value (never decimals) because the price is set in the lowest denomination (e.g. cents for MX currency, not Peso). | 100                                        |
| `activity_price`               | int          | The price to charge for ordering the item. Allows overrides from items selected in modifier groups.<br>**Note:** Price is always an integer value (never decimals) because the price is set in the lowest denomination (e.g. cents for MX currency, not Peso).| 100                                        |
| `priority`               | int          | The priority (order) of the item inside the category.                                                                                                                                                                                                       | 1                                          |
| `status`                 | int          | Status of the item shown in C-App. 1: Available; 2: Unavailable.                                                                                                                                                                                            | 1                                          |
| `is_sold_separately`     | bool         | true: The item can be sold separately; false: The item can only be sold as part of a modifier group.                                                                                                                                                        | true                                       |
| `app_modifier_group_ids` | array | The list of the IDs of modifier groups the item contains in **your** system.| ["mg1", "mg2"]|

### Response Body Parameters - sold_info_intl

The time span information to make an item visible.

| **Name** | **Type** | **Description** | **Required** | **Example** |
|---|---|---|---|---|
| `time`  | array | Beginning and end times when the item should be made available.  **Time format:** HH:mm. | Yes. Leave empty to specify the whole day. | {"begin":"10:00","end":"12:00"} |
| `day` | array | Days in which the item is sold.  **Accepted values** from 1 (Monday) to 7 (Sunday).      | Yes. Leave empty if `specialDay` is specified. | [1,2,3,4,5,6,7]                 |
| `specialDay` | array | Special rules for specific special day(s).  **Date format:** yyyy-MM-dd                  | No | ["2020-12-25", "2020-12-26"] |

### Response Body Parameters - Modifier Groups

A group of items to be selected as a customization or additional item under a parent item.

| **Name**                 | **Type**    | **Description**                                                                                                          | **Example**         |
|--------------------------|-------------|--------------------------------------------------------------------------------------------------------------------------|---------------------|
| `modifier_group_name`    | string      | The modifier group name displayed in C-App.                                                                              | Drinks              |
| `app_modifier_group_id`  | string      | ID for the modifier group in **your** system provided by the restaurant or POS.                                          | 30001_01            |
| `app_external_id`        | string | Reserved for the restaurant's use, e.g. for POS integrations.                                                            | {"key":"value"}     |
| `is_required`            | int         | Is a selection required? 1: Required; 2: Not required                                                                    | 1                   |
| `quantity_min_permitted` | int         | The minimum quantity allowed (inclusive).                                                                                | 0                   |
| `quantity_max_permitted` | int         | The maximum quantity allowed (inclusive).                                                                                | 5                   |
| `buy_mode`               | int         | 0: Single; 1: Multi (Multi means a customer can pick the same item multiple times).                                      | 0                   |
| `app_mg_items `               | array	         | The app_item_id and price of the items in the modifier group.| [{"app_item_id": "item1", "price": 100}]|

### Response Body Parameters - app_mg_items

The items to be displayed in the modifier group.

| **Name**      | **Type** | **Description**                                                                                                                                                                                                     | **Example**         |
|---------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------|
| `app_item_id` | string   | The ID for the item in **your** system provided by the restaurant.                                                                                                                                                  | Hamburguesas01      |
| `price`       | int      | Change the price when this item is in this modifier group.  **Note:** Price is always an integer value (never decimals) because the price is set in the lowest denomination (e.g. cents for MX currency, not Peso). | 100                 |


### Response Errors (errno) Descriptions

| **Code** | **Description** |
| --- | --- |
| 10000 | Get shop authorization info failed. |
| 10001 | System error. |
| 10002 | Parameter error. |
| 10102 | The shop authorization info has expired. |



### Response Example

```json
{
    "errno":0,
    "errmsg":"ok",
    "requestId":"1e0f220f079eb02e",
    "time":1627542552,
    "data":{
        "menus":[
            {
                "menu_name":"menu",
                "app_menu_id":"menu",
                "app_category_ids":[
                    "cate1",
                    "cate2",
                    "cate3",
                    "cate4",
                    "cate5"
                ]
            }
        ],
        "categories":[
            {
                "app_category_id":"cate1",
                "category_name":"cate1",
                "app_item_ids":[
                    "item2_has_mg",
                    "item1_has_mg",
                    "item_in_mg4",
                    "item2_in_mg2"
                ],
                "priority":1
            },
            {
                "app_category_id":"cate2",
                "category_name":"cate2",
                "app_item_ids":[
                    "item_in_mg3",
                    "item_10",
                    "item_9",
                    "item_8",
                    "item_7",
                    "item_6",
                    "item_5",
                    "item_4"
                ],
                "priority":2
            },
            {
                "app_category_id":"cate3",
                "category_name":"cate3",
                "app_item_ids":[
                    "item_2"
                ],
                "priority":3
            },
            {
                "app_category_id":"cate4",
                "category_name":"cate4",
                "app_item_ids":[
                    "item_in_mg2",
                    "item_3"
                ],
                "priority":4
            },
            {
                "app_category_id":"cate5",
                "category_name":"cate5",
                "app_item_ids":[
                    "item_in_mg1",
                    "item_1"
                ],
                "priority":5
            }
        ],
        "items":[
            {
                "app_item_id":"item2_has_mg",
                "item_name":"item2_has_mg",
                "short_desc":"23",
                "price":1200,
                "priority":17,
                "status":1,
                "is_sold_separately":true,
                "app_modifier_group_ids":[
                    "mg4"
                ]
            },
            {
                "app_item_id":"item1_has_mg",
                "item_name":"item1_has_mg",
                "price":2400,
                "priority":16,
                "status":1,
                "is_sold_separately":true,
                "app_modifier_group_ids":[
                    "mg3"
                ]
            },
            {
                "app_item_id":"item_in_mg4",
                "item_name":"item_in_mg4",
                "price":400,
                "priority":15,
                "status":1,
                "is_sold_separately":true
            },
            {
                "app_item_id":"item2_in_mg2",
                "item_name":"item2_in_mg2",
                "price":3400,
                "priority":6,
                "status":1,
                "is_sold_separately":true
            },
            {
                "app_item_id":"item_in_mg3",
                "item_name":"item_in_mg3",
                "price":400,
                "priority":14,
                "status":1,
                "is_sold_separately":true
            },
            {
                "app_item_id":"item_10",
                "item_name":"item_10",
                "short_desc":"ShortDesc--test",
                "price":1200,
                "priority":13,
                "status":1,
                "head_img":"http://10.90.28.42:8052/static/anything/do1_VUvDUiBSqLlWz62rrTAq",
                "is_sold_separately":true
            },
            {
                "app_item_id":"item_9",
                "item_name":"item_9",
                "price":0,
                "priority":12,
                "status":1,
                "is_sold_separately":true
            },
            {
                "app_item_id":"item_8",
                "item_name":"item_8",
                "short_desc":"ShortDesc--test",
                "price":1200,
                "priority":11,
                "status":1,
                "head_img":"http://10.90.28.42:8052/static/anything/do1_VUvDUiBSqLlWz62rrTAq",
                "is_sold_separately":true,
                "app_modifier_group_ids":[
                    "mg1",
                    "mg3"
                ]
            },
            {
                "app_item_id":"item_7",
                "item_name":"item_7",
                "price":0,
                "priority":10,
                "status":1,
                "is_sold_separately":true
            },
            {
                "app_item_id":"item_6",
                "item_name":"item_6",
                "short_desc":"ShortDesc--test",
                "price":400,
                "priority":9,
                "status":1,
                "head_img":"http://10.90.28.42:8052/static/anything/do1_VUvDUiBSqLlWz62rrTAq",
                "is_sold_separately":true
            },
            {
                "app_item_id":"item_5",
                "item_name":"item_5",
                "price":0,
                "priority":8,
                "status":1,
                "is_sold_separately":true
            },
            {
                "app_item_id":"item_4",
                "item_name":"item_4",
                "price":0,
                "priority":7,
                "status":1,
                "is_sold_separately":true
            },
            {
                "app_item_id":"item_2",
                "item_name":"item_2",
                "price":10000,
                "priority":3,
                "status":1,
                "is_sold_separately":true
            },
            {
                "app_item_id":"item_in_mg2",
                "item_name":"item_in_mg2",
                "price":3400,
                "priority":5,
                "status":1,
                "is_sold_separately":true
            },
            {
                "app_item_id":"item_3",
                "item_name":"item_3",
                "price":500000,
                "priority":4,
                "status":1,
                "is_sold_separately":true
            },
            {
                "app_item_id":"item_in_mg1",
                "item_name":"item_in_mg1",
                "price":500,
                "priority":2,
                "status":1,
                "is_sold_separately":false
            },
            {
                "app_item_id":"item_1",
                "item_name":"item_1",
                "price":100000,
                "priority":1,
                "status":1,
                "sold_info_intl":[
                    {
                        "time":[
                            {
                                "begin":"01:00",
                                "end":"08:00"
                            }
                        ],
                        "day":[
                            2,
                            3
                        ]
                    }
                ],
                "is_sold_separately":true,
                "app_modifier_group_ids":[
                    "mg5"
                ]
            }
        ],
        "modifier_groups":[
            {
                "app_modifier_group_id":"mg2",
                "modifier_group_name":"mg2",
                "is_required":2,
                "quantity_min_permitted":0,
                "quantity_max_permitted":1,
                "buy_mode":0,
                "app_mg_items":[
                    {
                        "app_item_id":"item_in_mg2",
                        "price":3800
                    },
                    {
                        "app_item_id":"item2_in_mg2",
                        "price":2000
                    }
                ]
            },
            {
                "app_modifier_group_id":"mg4",
                "modifier_group_name":"mg4",
                "is_required":1,
                "quantity_min_permitted":1,
                "quantity_max_permitted":1,
                "buy_mode":0,
                "app_mg_items":[
                    {
                        "app_item_id":"item_in_mg4",
                        "price":0
                    }
                ]
            },
            {
                "app_modifier_group_id":"mg3",
                "modifier_group_name":"mg3",
                "is_required":1,
                "quantity_min_permitted":1,
                "quantity_max_permitted":1,
                "buy_mode":1,
                "app_mg_items":[
                    {
                        "app_item_id":"item_in_mg3",
                        "price":0
                    }
                ]
            },
            {
                "app_modifier_group_id":"mg1",
                "modifier_group_name":"mg1",
                "is_required":1,
                "quantity_min_permitted":1,
                "quantity_max_permitted":1,
                "buy_mode":0,
                "app_mg_items":[
                    {
                        "app_item_id":"item_in_mg1",
                        "price":100
                    }
                ]
            },
            {
                "app_modifier_group_id":"mg5",
                "modifier_group_name":"mg5",
                "is_required":1,
                "quantity_min_permitted":1,
                "quantity_max_permitted":1,
                "buy_mode":0,
                "app_mg_items":[
                    {
                        "app_item_id":"item_in_mg1",
                        "price":200
                    }
                ]
            }
        ]
    }
}
```