<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 2221 · Grocery > Menu API > Batch Add Items API -->

## Batch Add Items API

`POST` [https://openapi.99food.com/v3/item/item/batchAddItems](https://openapi.99food.com/v3/item/item/batchAddItems)

The **Batch Add Items** endpoint creates new items in a store's catalogue/menu synchronously, without uploading the whole menu. It is designed for frequent, small-volume item creation.

> **IMPORTANT:**  This endpoint creates items only. If an `app_item_id` already exists in the store, that item fails. To modify existing items, use the **Update Item** endpoint.

> **ATTENTION:**  Maximum 50 items per request. Exceeding this limit fails the **whole** request.

> **ATTENTION:**  If your item information is maintained by the platform, `item_name`, `short_desc`, `sold_info_intl`, `head_img`, `item_tags`, `app_category_id` and `category_name` are taken from the platform via `upc`. Any value you send for these fields is ignored.

### Request Body Parameters - Level 1

|Name|Type|Description|Required|Example|
|---|---|---|---|---|
|`auth_token`|string|The auth_token for the shop|Yes|ZGQ5ZjVlZGUyYmFhNDM2ZmE0ZDA5OTE5ZjI1YzBhNjU=|
|`item_list`|list[struct]|List of the items to be created. Maximum 50 items per request.|Yes|[{item1}, {item2}]|

### Request Body Parameters - Items

|Name|Type|Description|Required|Example|
|---|---|---|---|---|
|`app_item_id`|string|ID for the item provided by the Store. Must be unique per item. If it already exists in the store, the item fails.|Yes|Hamburguesas01|
|`upc`|string|The barcode or UPC of the item. Max 16 digits. **Required** if your item information is maintained by the platform, as it is used to map the item on the platform. The item fails if the UPC is longer than 16 digits or already used by another `app_item_id`.|No|Hamburguesas01|
|`app_external_id`|string/json|Free-form text field reserved for the Grocery's use, e.g. for Grocery integrations Info|No|{"key":"value"}|
|`app_category_id`|string|ID of the category the item is created in, provided by the Store. **Required** unless your item information is maintained by the platform, in which case it is taken from the platform via `upc`. If the category does not exist in the store's catalogue/menu, it is created at the end of the category list and `category_name` is required. The item fails if the category is not a last-level category, or if the store's category limit is reached.|No|Cate_ID_001|
|`category_name`|string|The category name to be displayed. Only required when `app_category_id` is a new category. Must be an approved category name, otherwise the item fails. Max length: 28 characters.|No|Hamburg|
|`item_name`|string|Item name to be displayed. Max length: 65 characters. **Required** unless your item information is maintained by the platform.|No|Hamburguesas|
|`short_desc`|string|An optional description for the item. Max length: 400 characters.|No|null|
|`sold_info_intl`|list[struct]|Sales period per day. The continuous time span during which the item is available. Check below for more details.|No||
|`head_img`|string|The URL for the item's image. Requirements: Hosted on a secure connection (SSL); File size with less than 10MB; Min. width and height: 150px; Max. width and height: 3000px. Formats supported: JPEG, PNG|No|https://imgurl.host/static/rlabtest/|
|`price`|int|The price to charge for ordering the item. **Note:** Price is always an integer value (never decimals) because the price is set in the lowest denomination (e.g. cents for MX currency, not Peso). Must be within the price range configured for the country.|Yes|100|
|`activity_price`|int|Is the discounted price that will be charged to the user. **Note:** Price is always an integer value (never decimals) because the price is set in the lowest denomination (e.g. cents for MX currency, not Peso). Must be within the price range configured for the country.|No|80|
|`item_tags`|list[int]|The tags of the item. 1 TOBACCO 2 WINE 4 SEX PRODUCT. Can be combined (e.g. [1,2]). Any other value fails the item.|No|[1]|
|`status`|int|Status of the item to be shown in C-App. 1: Available; 2: Unavailable. If omitted or invalid (e.g. 3, 4), it is treated as 1. If your item information is maintained by the platform, this value is **not** ignored: the item is Available only if this `status` **and** the platform-side status are both Available.|No|1|
|`tax_info_list`|list[struct]|Tax information for the item. **MX only.** See below for details.|No|[]|

### Request Body Parameters - Sold_info_intl

The time span information to make an item visible.

| **Name** | **Type** | **Description** | **Required** | **Example** |
|---|---|---|---|---|
| `time` | array | Beginning and end times when the item should be made available. **Time format:** HH:mm. | Yes. Leave empty to specify the whole day. | {"begin":"10:00","end":"12:00"} |
| `day` | array | Days in which the item is sold. **Accepted values** from 1 (Monday) to 7 (Sunday). | Yes. Leave empty if `specialDay` is specified. | [1,2,3,4,5,6,7] |
| `specialDay` | array | Special rules for specific special day(s). **Date format:** yyyy-MM-dd | No | ["2026-12-25", "2026-12-26"] |

### Request Body Parameters - tax_info_list

Detailed tax configuration for an item. **Applies to MX only.**
**Validation rules**:

- If `type` is not empty, then `rate` is **required**; otherwise the whole item creation fails.
- `type` is an enum: `1` = IVA, `2` = IEPS.
- `rate` is an integer representing the tax value in basis points (e.g. 16.00% → 1600).
  - If `type = 1` (IVA), `rate` **must be 0 or 1600** (16.00%). Any other value will cause an error.
  - If `type = 2` (IEPS), `rate` **must be between 0 and 10000** (inclusive). Any other value will cause an error.

| **Name** | **Type** | **Description** | **Required** | **Example** |
|---|---|---|---|---|
| `type` | int | Tax type. `1` = IVA, `2` = IEPS. | No. Required if `rate` is provided. | 1 |
| `rate` | int | Tax rate in integer (e.g. 1600 for 16.00%). If `type=1`, must be `0` or `1600`. If `type=2`, must be between `0` and `10000`. | No. Required if `type` is not empty. | 1600 |

### Complete Request Example

```json
{
    "auth_token": "ODZiNmE3OWU2OGI5ODM3MzgxYzQzODdiNDJhNTExYTY=",
    "item_list": [
        {
            "app_item_id": "item0008",
            "upc": "dan111224",
            "app_category_id": "Cate_ID_001",
            "category_name": "Bebidas",
            "item_name": "Sprite 355ml",
            "short_desc": "Sweet white lemon flavored drink in can of 355ml",
            "price": 2000,
            "activity_price": 1900,
            "status": 1,
            "head_img": "https://img0.didiglobal.com/static/soda_public/img_bd61ab50a3d3efc8ed09ded30ea915c6.jpg",
            "sold_info_intl": [
                {
                    "time": [
                        {
                            "begin": "08:00",
                            "end": "20:00"
                        }
                    ],
                    "day": [
                        1,
                        2,
                        3,
                        4,
                        5
                    ],
                    "specialDay": []
                }
            ],
            "item_tags": [],
            "app_external_id": {
                "source": "auto_test"
            },
            "tax_info_list": [
                {
                    "type": 1,
                    "rate": 1600
                }
            ]
        }
    ]
}
```

### Response Body Parameters

This endpoint returns the result synchronously. The response reports, per item, whether the creation succeeded or failed.

| **Name** | **Type** | **Description** | **Example** |
|---|---|---|---|
| `errno` | int | Error code | 0 |
| `errmsg` | string | Error message | ok |
| `requestId` | string | Request ID | 1e0767f77b1219ce |
| `time` | timestamp | Timestamp of the response | 1627543538 |
| `data` | struct | The list of items that failed or succeeded in the creation | {} |
| `data.success` | list | List of the items successfully created | "success":["item_1"] |
| `data.failed` | list[map] | List of the items that failed to be created, with the failure reason | "failed":[{"item_2":"failed Reason"}] |

> **ATTENTION:**  A response with `errno` = 0 does **NOT** mean every item was created. Always check `data.failed` for partial failures.

### Response Example

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
