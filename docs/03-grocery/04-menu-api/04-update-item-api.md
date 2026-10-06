<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 2219 · Grocery > Menu API > Update Item API -->

## Update Item API

`POST` [https://openapi.99food.com/v3/item/item/batchUpdateItems](https://openapi.99food.com/v3/item/item/batchUpdateItems)

The **Update Item** endpoint updates the attributes of one or more existing items in a store's catalogue/menu in a single synchronous call. Only the fields you send are updated; any field omitted from the request keeps its current value.

> **IMPORTANT:**  This endpoint updates items only. It does **NOT** create items that do not yet exist in the store's catalogue/menu. To create items, please use the **Upload Grocery Menu Details** endpoint.

> **ATTENTION:**  If your item information is maintained by the platform, the following fields are taken from the platform and any value you send will be **ignored**: `item_name`, `short_desc`, `sold_info_intl`, `head_img`, `item_tags`.

### Request Body Parameters - Level 1

This is the top level of the update request.

|Name|Type|Description|Required|Example|
|---|---|---|---|---|
|`auth_token`|string|The auth_token for the shop|Yes|ZGQ5ZjVlZGUyYmFhNDM2ZmE0ZDA5OTE5ZjI1YzBhNjU=|
|`item_list`|list[struct]|List of the grocery's items to be updated.|Yes|[{item1}, {item2}]|

### Request Body Parameters - Items

Each element identifies one existing item by `app_item_id` and carries the attributes to be updated.

|Name|Type|Description|Required|Example|
|---|---|---|---|---|
|`app_item_id`|string|ID for the item provided by the Store. Must be unique per item. Used as the key to locate the item to update.|Yes|Hamburguesas01|
|`app_category_id`|string|ID of the category the item belongs to, provided by the Store. Send it to move the item to that category. If the ID is not in the store's catalogue/menu yet, a new level 1 category is created at the end of the category list and `category_name` is required. Must point to a last-level category, otherwise the item fails.|No|Cate_ID_001|
|`category_name`|string|The category name to be displayed. Only required when `app_category_id` is a new category. Max length: 28 characters.|No|Hamburg|
|`upc`|string|The barcode or UPC of the item. This field is extremely important as 99Food uses it to map the corresponding items in our item database. Max 16 digits.|No|Hamburguesas01|
|`app_external_id`|string/json|Free-form text field reserved for the Grocery's use, e.g. for Grocery integrations Info|No|{"key":"value"}|
|`item_name`|string|Item name to be displayed. Max length: 65 characters. \*If you are a merchant in the platform's product catalog, this value will be ignored.|No|Hamburguesas|
|`short_desc`|string|An optional description for the item. Max length: 400 characters. \*If you are a merchant in the platform's product catalog, this value will be ignored.|No|null|
|`sold_info_intl`|list[struct]|Sales period per day. The continuous time span during which the item is available. Check below for more details. \*If you are a merchant in the platform's product catalog, this value will be ignored.|No||
|`head_img`|string|The URL for the item's image. Requirements: Hosted on a secure connection (SSL); File size with less than 10MB; Min. width and height: 150px; Max. width and height: 3000px. Formats supported: JPEG, PNG. \*If you are a merchant in the platform's product catalog, this value will be ignored.|No|https://imgurl.host/static/rlabtest/|
|`price`|int|The price to charge for ordering the item. **Note:** Price is always an integer value (never decimals) because the price is set in the lowest denomination (e.g. cents for MX currency, not Peso).|No|100|
|`activity_price`|int|Is the discounted price that will be charged to the user. **Note:** Price is always an integer value (never decimals) because the price is set in the lowest denomination (e.g. cents for MX currency, not Peso). For more details please see the promotion setting notes in the **Upload Grocery Menu Details** endpoint.|No|80|
|`item_tags`|list[int]|The tags of the item. 1 TOBACCO 2 WINE 4 SEX PRODUCT. Can be combined (e.g. [1,2]). \*If you are a merchant in the platform's product catalog, this value will be ignored.|No|[1]|
|`status`|int|Status of the item to be shown in C-App. 1: Available; 2: Unavailable. If your item information is maintained by the platform, this value is **not** ignored: the item is Available only if this `status` **and** the platform-side status are both Available. If omitted, the current value is not updated. An invalid value (e.g. 3, 4) is treated as 1.|No|1|

### Request Body Parameters - Sold_info_intl

The time span information to make an item visible.

| **Name** | **Type** | **Description** | **Required** | **Example** |
|---|---|---|---|---|
| `time` | array | Beginning and end times when the item should be made available. **Time format:** HH:mm. | Yes. Leave empty to specify the whole day. | {"begin":"10:00","end":"12:00"} |
| `day` | array | Days in which the item is sold. **Accepted values** from 1 (Monday) to 7 (Sunday). | Yes. Leave empty if `specialDay` is specified. | [1,2,3,4,5,6,7] |
| `specialDay` | array | Special rules for specific special day(s). **Date format:** yyyy-MM-dd | No | ["2026-12-25", "2026-12-26"] |

### Complete Request Example

```json
{
    "auth_token": "ZjA3ODc2NDc3MDE3ZTdiYTMyZGRlYzk3ZTBjNTdhOTg=",
    "item_list": [
        {
            "app_item_id": "1121241",
            "app_category_id": "Cate_ID_001",
            "category_name": "Hamburg",
            "item_name": "1121241-test",
            "short_desc": "Sweet d drink in can of 355ml",
            "price": 2100,
            "activity_price": 1900,
            "status": 1,
            "sold_info_intl": [
                {
                    "time": [],
                    "specialDay": [
                        "2026-04-12"
                    ]
                },
                {
                    "time": [
                        {
                            "begin": "02:00",
                            "end": "19:00"
                        }
                    ],
                    "specialDay": [
                        "2026-08-19"
                    ]
                }
            ],
            "head_img": "https://img-hxy021.didistatic.com/static/starimg/img/fa10Jhig4q1670385339293.jpeg",
            "upc": "1121241",
            "item_tags": [1],
            "app_external_id": ""
        }
    ]
}
```

### Response Body Parameters

This endpoint returns the result synchronously. The response reports, per item, whether the update succeeded or failed.

| **Name** | **Type** | **Description** | **Example** |
|---|---|---|---|
| `errno` | int | Error code | 0 |
| `errmsg` | string | Error message | ok |
| `requestId` | string | Request ID | 1e0767f77b1219ce |
| `time` | timestamp | Timestamp of the response | 1627543538 |
| `data` | struct | The list of items that failed or succeeded in the update | {} |
| `data.success` | list | List of the items successfully updated | "success":["item_1"] |
| `data.failed` | list[map] | List of the items that failed to update, with the failure reason | "failed":[{"item_2":"failed Reason"}] |

> **ATTENTION:**  A response with `errno` = 0 does **NOT** mean every item was updated. Always check `data.failed` for partial failures.

### Response Example if passed the first filter

```json
{
    "errno":0,
    "errmsg":"ok",
    "requestId":"cd0514a30d721dd2",
    "time":1627612911,
    "data":{
        "success":[
            "item_1"
        ],
        "failed":[
            {"item_2":"failed Reason"}
        ]
    }
}
```

### Response Example if didn't passed the first filter

```json
{
    "errno": 10001,
    "errmsg": "item name is empty, related app_item_id is KFC713_P10487",
    "requestId": "0a0f162f64dd8d858fb1d60d21d53902",
    "time": 1692241285,
    "data": {}
}
```
