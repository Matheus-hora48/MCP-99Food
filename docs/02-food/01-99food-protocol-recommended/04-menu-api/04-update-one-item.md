<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 1967 · Food > 99Food Protocol (Recommended) > Menu API > Update One Item -->

## Update One Item

The **Update One Item** endpoint gives you the ability to update one item already uploaded to a menu. You can change all fields but the `app_item_id`.

>**NOTE:** It is NOT possible to update a promotion set with the menu with this endpoint. If you want to update a certain item promotion, please resubmit the whole menu through the corresponding **Upload Store Menu Details** API.

### Basic Information

| **Name** | **Description** |
| --- | --- |
| `URL` | [https://openapi.99food.com/v3/item/item/updateItem](https://openapi.99food.com.com/v3/item/item/updateItem) |
| `Method` | POST |
| `Permission` | Available |

### Request Body Parameters 

| **Name** | **Type** | **Description** | **Required** | **Example** |
| --- | --- | --- |--------------| --- |
| `auth_token` | string | The `auth_token` for the shop. | Yes          | ZGQ5ZjVlZGUyYmFhNDM2ZmE0ZDA5OTE5ZjI1YzBhNjU= |
| `app_item_id` | string | The ID for the item provided by the restaurant. | Yes          | Hamburguesas01 |
| `app_external_id` | string | Free-form text field reserved for the restaurant's use, e.g. for POS integrations. | No           | {"key":"value"} |
| `item_name` | string | Item name to be displayed. Max length: 180 characters. | Yes          | Hamburguesas |
| `short_desc` | string | An optional description for the Item. Max length: 1500 characters. | No           | null |
| `sold_info_intl` | array | Sales period per day. The continuous time span during which the item is available. | No           |     |
| `head_img` | string | The URL for the item’s image. **Requirements**: Hosted on a secure connection (SSL); File size with less than 10MB; Min. width and height: 150px; Max. width and height: 3000px. **Formats supported**: JPEG, JPG or PNG. | No           | https://imgurl.host/static/rlabtest/ |
| `price` | int | The price to charge for ordering the item. Allows overrides from items selected in modifier groups.  **Note:** Price is always an integer value (never decimals) because the price is set in the lowest denomination (e.g. cents for MX currency, not Peso). | Yes          | 100 |
| `activity_price` | int | Is the discounted price that will be charged to the user. **Note:** Price is always an integer value (never decimals) because the price is set in the lowest denomination (e.g. cents for MX currency, not Pesos). For more details please see above in promotion setting notes. | No           | 80 |
| `priority` | int | Determines the display order of items. Items are sorted in ascending order by this value (lower numbers indicate higher priority). | No           | 1   |
| `status` | int | Status of the item to be shown in C-App. 1: Available; 2: Unavailable. | Yes          | 1   |
| `is_sold_separately` | bool | true: The item can be sold separately; false: The item can only be sold as part of a modifier group. | Yes          | true   |


### Request Body Parameters - sold_info_intl

The time span information to make an item visible.

| **Name** | **Type** | **Description** | **Required** | **Example** |
|---|---|---|---|---|
| `time`  | array | Beginning and end times when the item should be made available.  **Time format:** HH:mm. **Maximum of 3 time spans allowed.** | Yes. Leave empty to specify the whole day. | {"begin":"10:00","end":"12:00"} |
| `day` | array | Days in which the item is sold.  **Accepted values** from 1 (Monday) to 7 (Sunday).      | Yes. Leave empty if `specialDay` is specified. | [1,2,3,4,5,6,7]                 |
| `specialDay` | array | Special rules for specific special day(s).  **Date format:** yyyy-MM-dd                  | No | ["2020-12-25", "2020-12-26"] |

### Request Example

```json
{
    "auth_token":"MWM2ZDI1N2Q2ODRiNDcxZmNlM2IwNDhiMjNmNDkyNDE=",
    "item_name":"item_3",
    "priority":4,
    "short_desc":"",
    "price":3000,
    "status":2,
    "app_item_id":"item_3",
    "is_sold_separately":true
}
```

### Response Example

```json
{
    "errno":0,
    "errmsg":"ok",
    "requestId":"1e0767f77b1219ce",
    "time":1627543538,
    "data":{

    }
}
```