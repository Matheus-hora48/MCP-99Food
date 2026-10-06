<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 2131 · Grocery > Menu API > Batch Add Update Grocery Items -->


## Batch Add/Update Grocery Items

Applies only to merchants with self-built menus. The **Batch Add/Update Grocery Items** endpoint allows Partners to add or update multiple grocery items in a store's menu. This operation is asynchronous and returns a `taskId` for tracking. It supports barcode (UPC) mapping and item tagging. 


### Basic Information

| **Name** | **Description** |
| --- | --- |
| `URL`| [https://openapi.99food.com/v3/item/item/updateItems](https://openapi.99food.com/v3/item/item/updateItems) |
| `Method` | POST |
| `Permission` | Available |

### Request Body Parameters

| **Name** | **Type** | **Required** | **Description** | **Example** |
| --- | --- | --- | --- | --- |
| `auth_token` | string | Yes | The auth_token for the shop | `ZGQ5ZjVlZGUyYmFhNDM2ZmE0ZDA5OTE5ZjI1YzBhNjU=` |
| `item_list` | array | Yes | The array of items to add/update | `[{item1}, {item2}]` |

### Request Body Parameters - `item_list`

Each object in `item_list` represents a grocery item.
> **Promotion Setting with the Catalogue/Menu Upload**
Promotions is a very important tool that can help to boost sales and obtain more attention from the users in the APP. With the purpose to provide a more efficient manner to set promotions, DiDiFood is providing a promo setting feature available from Sept. 8th, 2023 for the store to set up promotions directly from the catalogue/menu by providing a non-mandatory key activity_price
**Important:**
- The structure for activity_price is non-mandatory. However, if you choose not to configure any promotion, please refrain from sending this key or provide it with a value of 'Null' to prevent any misunderstandings. DiDiFood does not recognize '0' as a valid value for this key.
- In cases where activity_price exceeds the price, DiDiFood will interpret that no promotion is applied to the item.
- The difference between the price and activity_price must be equal to or greater than 1%.
- Promotions are **NOT** permitted for items tagged as with Tabacco.
- Prior to configuring a promotion through this API method, any existing promotions set in B-App or through DiDiFood's internal system must be canceled.
- In the event that an item with a previous promotion configured in B-App or through DiDiFood's internal system undergoes a change in price, the price will be updated, but the previously configured promotion will continue to be effective for users based on the new price set.
- To delete or modify a promotion (which was previously set through API), simply adjust the values of price and activity_price, and then submit the updated catalogue/menu through this API. It is **NOT** possible to delete or modify a promotion of an item which promotion that was set in B-App or through DiDiFood's internal system.
- All promotions established through this method are fully assumed by the store/brand. Therefore, it is crucial to have the necessary permissions granted in the operational interface. Under no circumstances may the store/brand make claims against DiDiFood for the promotions set using this method.


| **Name** | **Type** | **Required** | **Description** | **Example** |
| --- | --- | --- | --- | --- |
| `app_item_id` | string | Yes | ID for the item provided by the store. Must be unique per item. | `"Hamburguesas01"` |
| `upc` | string | Yes | The barcode or UPC of the item. Max 14 digits. This field is extremely important as DiDiFood uses it to map the corresponding items in our item database. | `"Hamburguesas01"` |
| `app_external_id` | string/json | No | Free-form text field reserved for the Grocery's use, e.g. for Grocery integrations Info| `{"key":"value"}` |
| `item_name` | string | Yes | Item name to be displayed. Max length: 50 characters. | `"Sprite 355ml"` |
| `short_desc` | string | No | An optional description for the item. Max length: 400 characters. | `"Sweet white lemon flavored drink in can of 355ml"` |
| `sold_info_intl` | list[struct] | No | Sales period per day. See below for structure. | `[...]` |
| `head_img` | string | No | URL for the item's image. Requirements: SSL, <10MB, min 150x150px, max 3000x3000px, JPEG/PNG. | `"https://imgurl.host/static/rlabtest/"` |
| `price` | int | Yes | The price to charge for ordering the item. Note: Price is always an integer value (never decimals) because the price is set in the lowest denomination (e.g. cents for MX currency, not Peso). | `2000` |
| `activity_price` | int | No | Is the discounted price that will be charged to the user. Note: Price is always an integer value (never decimals) because the price is set in the lowest denomination (e.g. cents for MX currency, not Peso). For more details please see above in promotion setting notes | `1900` |
| `item_tags` | list[int] | No | Tags of the item: 1=TOBACCO, 2=WINE, 4=SEX PRODUCT. Can combine (e.g., [4]). | `[4]` |
| `status` | int | Yes | Status of the item to be shown in C-App. 1=Available, 2=Unavailable. | `1` |

### Request Body Parameters - `sold_info_intl`

The time span information to make an item visible.

| **Name** | **Type** | **Required** | **Description** | **Example** |
| --- | --- | --- | --- | --- |
| `time` | list[struct] | Yes (leave empty for whole day) | Beginning and end times when the item should be made available. Format: HH:mm. | `[{"begin":"10:00","end":"12:00"}]` |
| `day` | array[int] | Yes (leave empty if `specialDay` specified) | Days in which the item is sold. (1=Monday to 7=Sunday). | `[1,2,3,4,5,6,7]` |
| `specialDay` | array[string] | Yes | Special rules for specific special day(s). Format: yyyy-MM-dd. | `["2020-12-25","2020-12-26"]` |

### Response Body Parameters

This endpoint returns a task immediately. The task status can be queried via the **Get Task Info** API.

| **Status (of the task)** | **Description** | **Additional Info** |
| --- | --- | --- |
| 0 | waiting |  |
| 1 | success |  |
| 2 | failed |  |
| 3 | waitRetry | Internal system is processing; retry will be performed by DiDiFood. No action required. |
| 4 | running |  |
| 5 | partial success | Menu has errors that won't affect order flow, but check details to improve. |

### Request Example (HTTP Body)

```json
{
    "auth_token": "YTcwM2UwZjJjNzdmjMDIxZWM1ZTAxZTk0MjFmOWM=",
    "item_list": [
        {
            "item_name": "Sprite 355ml",
            "upc": "dan111224",
            "short_desc": "Sweet white lemon flavored drink in can of 355ml",
            "price": 2000,
            "activity_price": 1900,
            "status": 2,
            "app_item_id": "sample_item_3",
            "app_category_id": "5764608132001825189",
            "head_img": "https://img-hxy021.didistatic.com/static/starimg/img/hTTrXF9MRF1670834397460.jpeg",
            "sold_info_intl": [
                {
                    "time": [],
                    "specialDay": [
                        "2025-08-08"
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
                        "2025-08-19"
                    ]
                }
            ],
            "item_tags": [
                4
            ]
        }
    ]
}
```

### Response Example if passed the first filter

```json
{
    "errno": 0,
    "errmsg": "ok",
    "requestId": "20fbd1a6207a3535",
    "time": 1609845642,
    "data": {
        "taskID": 3458764739727720400,
        "createTime": 1609845642,
        "status": 0,
        "message": "waiting"
    }
}
```

### Response Example if didn't pass the first filter

```json
{
    "errno": 10001,
    "errmsg": "item name is empty, related app_item_id is P10487",
    "requestId": "0a0f162f64dd8d858fb1d60d21d53902",
    "time": 1692241285,
    "data": {}
}
```