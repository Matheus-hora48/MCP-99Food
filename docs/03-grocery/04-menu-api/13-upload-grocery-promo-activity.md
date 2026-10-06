<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 2147 · Grocery > Menu API > Upload Grocery Promo Activity -->

## Upload Grocery Promo Activity

The **Upload Grocery Promo Activity​** endpoint allows the developer to upload grocery promo activity 
> **ATTENTION:**
> * The number of activities created in a request depends on the quantity of items under the activity.
> * The maximum allowed quantity of items is set to 500 by default. If you want to create more activities at once, you can increase the minimum quantity of items through whitelist configuration.

### Basic Information

| **Name** | **Description** |
| :--- | :--- |
| **URL** | [https://openapi.99food.com/v1/promo/promo/uploadGrocery](https://openapi.99food.com/v1/promo/promo/uploadGrocery) |
| **Method** | `POST` |
| **Permission** | Available |


### Request Body Parameters

| Name | Type | Required | Description | Example |
| :--- | :--- | :--- | :--- | :--- |
| `auth_token` | string | Yes | The auth_token for the shop. | ZGQ5ZjVlZGUyYmFhNDM2ZmE0ZDA5OTE5ZjI1YzBhNjU= |
| `app_item_id_type` | integer | Yes | External Dish to Internal Dish Conversion Methods. 0 : app_item_id;1 : upc | 1 |
| `promo_list` | array | Yes | A list of promo. | [{promo_list1}] |


### Request Body Parameters - promo_list

| Name | Type | Required | Description                                                                                                                 | Example |
| :--- | :--- | :--- |:----------------------------------------------------------------------------------------------------------------------------| :-- |
| `action` | integer | Yes | Operation Type. 1: Create activity; 2: Stop activity.                                                                       | 1 |
| `activity_id` | integer | Yes | Activity ID                                                                                                                 | 20260319_01_discount |
| `activity_type` | integer | No | Activity Type. 2-special price; 4-buy X get Y; 8-buy X for $Y; 9-Bulk Pricing.                                              | 2 |
| `child_type` | string | No | Activity subtype. Optional; Must be 4 for "0元多规格菜" (zero-priced multi-spec dishes); not required for other cases.           | 4 |
| `activity_name` | string | No | Activity name. Optional; defaults to activity_id if not provided. Required when action=1.                                   | 20260319_01_discount |
| `start_date` | string | No | Activity start time. Date string, format: YYYY-MM-DD HH:MM:SS. Required when action=1.                                      | 2026-03-01 00:00:00 |
| `end_date` | string | No | Activity end time. Date string, format: YYYY-MM-DD HH:MM:SS. Required when action=1.                                        | 2026-03-23 00:00:00 |
| `item_activity_list` | array | No | List of all dishes and discount information participating in this activity. Required when action=1.                         | [{item_activity_list1}] |


### Request Body Parameters - item_activity_list

| Name | Type | Required | Description | Example |
| `app_item_id` | string | No | External Dish to Internal Dish Conversion Methods. | sample_item_1 |
| `discount_perc` | integer | No | Discount - Percentage. Integer, range: 5 <= discount_perc < 100. When action=1 and activity_type=2, at least one of discount_amount or discount_perc must be provided. If both are provided, only one takes effect, with discount_amount having higher priority. | 30 |
| `discount_amount` | integer | No | Discount - Fixed amount reduction (in the smallest currency unit). When action=1 and activity_type=2, at least one of discount_amount or discount_perc must be provided. If both are provided, only one takes effect, with discount_amount having higher priority. Amount is set in the smallest local currency unit (e.g., Brazilian Real in centavos, not reais). | 2000 |
| `buy_num` | integer | No | The "buy" quantity in a "Buy X Get Y" promotion; e.g., for "Buy 2 Get 3", buy_num is 2. Required when action=1 and activity_type=4. | 2 |
| `get_num` | integer | No | The "get" quantity in a "Buy X Get Y" promotion; e.g., for "Buy 2 Get 3", get_num is 3. Required when action=1 and activity_type=4. | 3 |
| `bxgy_x` | integer | No | The X value in a "Buy X Get Y off" promotion (e.g., buy X items). Required when action=1 and activity_type=8. | 2 |
| `bxgy_y` | integer | No | The Y value in a "Buy X Get Y off" promotion (e.g., save Y amount). Required when action=1 and activity_type=8. Y amount is set in the smallest local currency unit (e.g., Brazilian Real in centavos, not reais). | 10000 |
| `bpbxgy_x` | integer | No | TBulk Pricing - Quantity x. Required when action=1&&activity_type=9 | 10000 |
| `bpbxgy_y` | integer | No | Bulk Pricing - Wholesale Unit Price y.  Required when action=1&&activity_type=9; bxgy_x must be set in the smallest unit (e.g., Brazilian currency should be calculated in cents, not Reais).| 10000 |

### 【Special Price Dish - Percentage Discount】Request Example:

```json
{
  "auth_token": "YjM0NDQ5N2JhOGYyM2FkZmFiMDVmZDllMWZmMDc4NDY=",
  "promo_list":[
    {
      "action":1,
      "activity_type":2,
      "activity_id":"122345",
      "activity_name":"122345name",
      "start_date":"2025-11-20 16:37:00",
      "end_date":"2025-11-23 16:37:00",
      "item_activity_list":[
        {
          "app_item_id":"12132",
          "discount_perc":30
        }
      ]
    }
  ]
}
```

### 【Special Price Dish - Fixed Amount Reduction】Request Example:

```json
{
  "auth_token": "YjM0NDQ5N2JhOGYyM2FkZmFiMDVmZDllMWZmMDc4NDY=",
  "promo_list":[
    {
      "action":1,
      "activity_type":2,
      "activity_id":"122345",
      "activity_name":"122345name",
      "start_date":"2025-11-20 16:37:00",
      "end_date":"2025-11-23 16:37:00",
      "item_activity_list":[
        {
          "app_item_id":"12132",
          "discount_amount":500
        }
      ]
    }
  ]
}
```

### 【Buy X Get Y】Request Example:
```
{
  "auth_token": "YjlhNDM2NmUyYzYxNmE5YmNjMzUzNGU3YWQxNThmNDM=",
  "app_item_id_type": 0,
  "promo_list":[
        {
            "action":1,
            "activity_type":4,
            "child_type":5,
            "activity_id":"api商超买赠001",
            "start_date":"2025-10-23 00:00:00",
            "end_date":"2025-12-23 23:59:59",
            "item_activity_list":[
                {
                    "app_item_id":"item003",
                    "buy_num":2,
                    "get_num":3
                }
            ]
        }
    ]
}
```

### Buy More Save More】Request Example:
```
{
  "auth_token": "YjlhNDM2NmUyYzYxNmE5YmNjMzUzNGU3YWQxNThmNDM=",
  "app_item_id_type": 0,
  "promo_list":[
        {
            "action":1,
            "activity_type":8,
            "child_type":5,
            "activity_id":"api多买多省001",
            "start_date":"2025-10-23 00:00:00",
            "end_date":"2025-12-23 23:59:59",
            "item_activity_list":[
                {
                    "app_item_id":"item004",
                    "bxgy_x":2,
                    "bxgy_y":9000
                }
            ]
        }
    ]
}
```

### 【Bulk Promotion】Request Example:
```
{
  "ath_token": "YjM0NDQ5N2JhOGYyM2FkZmFiMDVmZDllMWZmMDc4NDY=",
  "promo_list":[
        {
            "action":1,
            "activity_type":9,
            "activity_id":"2026-03-25_77204店铺_批量定价_001",
            "start_date":"2026-02-23 00:00:00",
            "end_date":"2026-12-23 23:59:59",
            "item_activity_list":[
                {
                    "app_item_id":"275468",
                    "bpbxgy_x":3,
                    "bpbxgy_y":8000
                }
            ]
        }
    ]
}
```

### 【Marketing Activity Stop】Request Example:
```
{
  "auth_token": "YjM0NDQ5N2JhOGYyM2FkZmFiMDVmZDllMWZmMDc4NDY=",
  "promo_list":[
        {
            "action":2,
            "activity_id":"122345"
        }
    ]
}
```

### 【Mixed Request】Request Example:
```
{
  "auth_token": "YjlhNDM2NmUyYzYxNmE5YmNjMzUzNGU3YWQxNThmNDM=",
  "app_item_id_type": 0,
  "promo_list":[
        {
            "action":1,
            "activity_type":2,
            "activity_id":"api商超_002",
            "start_date":"2025-10-23 00:00:00",
            "end_date":"2025-12-23 23:59:59",
            "item_activity_list":[
                {
                    "app_item_id":"item025",
                    "discount_perc":30
                }
            ]
        },
        {
            "action":1,
            "activity_type":4,
            "activity_id":"api商超_买赠001",
            "start_date":"2025-10-23 00:00:00",
            "end_date":"2025-12-23 23:59:59",
            "item_activity_list":[
                {
                    "app_item_id":"item099",
                    "buy_num":2,
                    "get_num":3
                }
            ]
        },
        {
            "action":1,
            "activity_type":8,
            "activity_id":"api商超_多买多省001",
            "start_date":"2025-10-23 00:00:00",
            "end_date":"2025-12-23 23:59:59",
            "item_activity_list":[
                {
                    "app_item_id":"sx28",
                    "bxgy_x":2,
                    "bxgy_y":7000
                }
            ]
        },
        {
            "action":2,
            "activity_id":"api商超买赠001"
        }
    ]
}
```

### 【Marketing Activity Creation/Stop Response】Request Example:
```
{
    "errno": 0,
    "errmsg": "ok",
    "requestId": "s547252269251ea45fff49f135ac2202",
    "time": 1764040357,
    "data": {
        "taskID": 5764636289854736189,
        "createTime": 1764040357,
        "status": 0,
        "message": "waiting"
    }
}
```

### Response Body Example

```json
{
    "errno": 0,
    "errmsg": "ok",
    "requestId": "s351515369bbb71d0d6006e0a1227d02",
    "time": 1773909789,
    "data": {
        "taskID": 5764644057718326571,
        "createTime": 1773909789,
        "status": 0,
        "message": "waiting"
    }
}
```