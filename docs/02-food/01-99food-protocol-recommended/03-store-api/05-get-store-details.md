<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 1943 · Food > 99Food Protocol (Recommended) > Store API > Get Store Details -->

## Get Store Details

The **Get Store Details** endpoint allows a developer to pull the store's details.

> **ATTENTION:**
> We use long (64-bit integer) as IDs for apps, orders and stores. So please pay attention when parsing those numbers. For example, in Node.js our orderId (5764607801871631353) will be parsed as 5764607801871631000 with lib "body-parser" or "JSON.parse()". Please use json-bigint to parse it: `var jsonBig = require('json-bigint'); jsonBig.parse(data)`.

### Basic Information

| **Name** | **Description** |
| --- | --- |
| `URL` | [https://openapi.99food.com/v1/shop/shop/detail](https://openapi.99food.com/v1/shop/shop/detail) |
| `Method` | GET |
| `Permission` | Available |

### Request Path Parameter

| **Name** | **Type** | **Description** | **Required** | **Example** |
| --- | --- | --- | --- | --- |
| `auth_token` | string | The `auth_token` for the store. | Yes | ZGQ5ZjVlZGUyYmFhNDM2ZmE0ZDA5OTE5ZjI1YzBhNjU= |

### Response Body Parameters

| **Name** | **Type** | **Description** | **Example** |
| --- | --- | --- | --- |
| `shop_id` | long | ID of the store in **our** system. | 1152921645439779073 |
| `app_shop_id` | string | The ID of a store in **your** system. | 001 |
| `name` | string | The name of the store displayed to the customer. | test_bd_support_1 |
| `logo_img` | string | The URL for the store's logo image. |     |
| `head_img` | string | The URL for the main image displayed to the eater when browsing for a store. |     |
| `announce` | string | The top address line of the store location. |     |
| `addr` | string | The store's address. |     |
| `poi_name` | string | The store's address mapped by POI. An object representing the physical location of the store. |     |
| `lat` | double | Latitude of the store's address in Google Maps. |     |
| `lng` | double | Longitude of the store's address in Google Maps. |     |
| `biz_status` | int | The store's business status in our system. 1: Online; 2: Business Close |     |
| `sub_biz_status` | int | The store's real-time detailed business status. (See **Enum of `sub_biz_status`** below for more details.) |     |
| `auto_switch` | int | Store online control mode. 1-Manual Online, 2-Auto Online.  |     |
| `promise_produce_time` | int | The average amount of time **in seconds** configured by the store to prepare the orders. |     |
| `shop_phone` | array | A json structure of the phone number of the store. |     |
| `biz_day_time` | array | A json structure with the days and times when the store will be set as open. |     |
| `main_categories` | array | A json structure with the main, secondary and third categories set by the store. |     |
| `shop_front_photo` | string | The URL for the front of the store. |     |
| `shop_surrounding_photo` | string | The URL for the surroundings of the store. |     |
| `building_entrance_photo` | string | The URL for the building entrance of the store. |     |
| `busy_mode_info` | string | The store's busy mode configuration. (See **Response Parameters for `busy_mode_info`** below for more details.) |     |

#### Enum of `sub_biz_status` 

| **sub_biz_status** | **Description** |
| --- | --- |
| 0   | Default. |
| 1   | Store Opened. |
| 2   | Business Paused. It will be auto opened if `auto_switch` is set to 1 or 3. |
| 3   | Business Closed. It won’t open until the store is open manually. |
| 4   | Store Disconnected. 99Food’s merchant app is offline because of network connection or other reasons. |
| 5   | Store closed for the day. The store isn’t in business’ time and will be auto opened if `auto_switch` is set to 1 or 3. |
| 6   | Store blocked. The store is closed for some bad reason and can’t be open using the app or API. Contact your 99Food’s Rep to understand the case. |
| 7   | Store closed by system control. The store is closed if there’s no rider online. |

#### Response Parameters for `busy_mode_info`

| **Name** | **Type** | **Description** | **Example** |
|------|------|-------------|---------|
| `busy_state` | int | Busy status. Enum: `0` - normal, `1` - busy. | 1 |
| `busy_duration_minutes` | int | Busy duration in minutes. Automatically reverts to normal after this period. Range: 1–180. | 120 |
| `busy_cook_delay_minutes` | int | Additional preparation time in minutes added to the base time. Range: 1–30. | 15 |


#### Response Errors (errno) Descriptions

| **Code** | **Description** |
| --- | --- |
| 10001 | System error. |
| 10002 | Parameter error. |
| 10100 | Get `auth_token` failed. |
| 10102 | `auth_token` has expired. Please refresh it. |
| 11033 | Shop ID does not exist. |


### Response Example

```json
{
    "errno": 0,
    "errmsg": "ok",
    "requestId": "22bd82304fe79e62",
    "time": 1572440303,
    "data": {
        "shop_id": 1152921645439779073,
        "app_shop_id": "app_shop_yumiao003",
        "name": "test_bd_support_1",
        "logo_img": "https://soda-public.didistatic.com/static/anything/do1_nfDSvBjjfHmw6EXYnVC1",
        "head_img": "https://soda-public.didistatic.com/static/anything/do1_nfDSvBjjfHmw6EXYnVC1",
        "announce": "",
        "addr": "Av Periférico Pte Manuel Gómez Morin 527, Agrícola, 45236 Zapopan, Jal., México",
        "poi_name": "Av Periférico Pte Manuel Gómez Morin 527, Agrícola, 45236 Zapopan, Jal., México",
        "lat": 20.6152897,
        "lng": -103.4280672,
        "biz_status": 1,
        "sub_biz_status": 1,
        "auto_switch": 1,
        "promise_produce_time": 900,
        "shop_phone": [
            {
                "calling_code": 52,
                "phone": 15011498822,
                "type": 0
            },
            {
                "calling_code": 86,
                "phone": 15011498833,
                "type": 0
            }
        ],
        "biz_day_time": [
            {
                "biz_day": [1, 2, 3, 4, 5, 6, 7],
                "biz_time": [
                    {
                        "begin": "00:00",
                        "end": "24:00"
                    }
                ]
            }
        ],
        "main_categories": {
            "main_category": {
                "id": "200001545088714",
                "name": "Alcohol"
            },
            "second_category": {
                "id": "20000897046510",
                "name": "Alitas & Pollo"
            },
            "third_category": {
                "id": "200001641902623",
                "name": "Americana"
            }
        },
        "shop_front_photo": "https://example.com/abc.jpg",
        "shop_surrounding_photo": "https://example.com/abc.jpg",
        "building_entrance_photo": "https://example.com/abc.jpg",
        "busy_mode_info": {
            "busy_state": 1,
            "busy_duration_minutes": 180,
            "busy_cook_delay_minutes": 30
        }
    }  
}
```