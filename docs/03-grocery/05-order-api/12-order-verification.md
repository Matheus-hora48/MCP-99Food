<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 2173 · Grocery > Order API > Order Verification -->

## Order Verification

The **Order Verification** endpoint verifies whether the scanned offline order total falls within an acceptable range of the online order price.

> **ATTENTION:** For pickup orders only.

### Basic Information

| **Name** | **Description** |
| --- | --- |
| `URL` | [https://openapi.99food.com/v1/order/order/verify](https://openapi.99food.com/v1/order/order/verify) |
| `Method` | POST |
| `Permission` | Available |

### Request Body Parameters

| **Name** | **Type** | **Description** | **Required** | **Example** |
| --- | --- | --- | --- | --- |
| `auth_token` | string | The `auth_token` for the shop. | Yes | ZGQ5ZjVlZGUyYmFhNDM2ZmE0ZDA5OTE5ZjI1YzBhNjU= |
| `order_id` | long | The ID of the order in 99Food’s system. | Yes | 2352921557674426622 |
| `offline_goods_price` | int | The total sum of money for the goods that were scanned offline. Note: Price is always an integer value (never decimals) because the price is set in the lowest denomination (e.g. cents for MX currency, not Peso). | Yes | 5000 |
| `picker_id` | long | The ID of the picker for this order. | No | 1251862887164321 |
| `cashier_id` | long | The ID of the cashier in the store. | No | 123432 |

### Response Body Parameters

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| `errno` | int | The error code. 0：Successful; Others：Failed. |
| `errmsg` | string | The error message. |
| `data` | struct | Check below for all the information sent. |

#### Response Body Parameters - Data

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| `verification` | string | The result of verification. |
| `order_id` | long | The ID of the order in 99Food’s system. |
| `online_goods_price` | string | The online order goods price. |
| `offline_goods_price` | string | The total sum of money for the goods that were scanned offline. |

### Response Example
##### Successful Response:
Case 1:
```json
{
  "errno": 0,
  "errmsg": "ok",
  "requestId": "s285868e64392326172f04fa2443a802",
  "time": 1681466151,
  "data": {
    "verification": "passed",
    "order_id": 5764623016298349623,
    "online_goods_price": 20000,
    "offline_goods_price": 20000
  }
}
```
Case 2:
```json
{
    "errno": 0,
    "errmsg": "The difference between the total price of offline items and the online order price is within the permissible range.The total price of offline items is 5000, and the online order price is 7000",
    "requestId": "s245868e64474eb6174b04fb34a4fc02",
    "time": 1682394806,
    "data": {
        "verification": "passed",
        "order_id": 5764623016264797741,
        "online_goods_price": 7000,
        "offline_goods_price": 5000
    }
}
```

##### Failed Response:
Case 1:
```json
{
    "errno": 10006,
    "errmsg": "permission denied",
    "requestId": "s24569ed6459e88267f90d7d42866f02",
    "time": 1683613827,
    "data": {}
}
```
Case 2:
```json
{
    "errno": 12005,
    "errmsg": "No permission to view the order",
    "requestId": "s24569ed64474d8c67f90d7d34196002",
    "time": 1682394509,
    "data": {}
}
```
Case 3:
```json
{
    "errno": 12014,
    "errmsg": "Incorrect order status, not ready for check out",
    "requestId": "s245868e64474eb6174b04fb34a4fc02",
    "time": 1682394806,
    "data": {
        "verification": "failed",
        "order_id": 5764623016264797741,
        "online_goods_price": 85000,
        "offline_goods_price": 5000
    }
}
```
Case 4:
```json
{
    "errno": 12015,
    "errmsg": "The difference between the total price of offline items and the online order price exceeds the permissible range.The total price of offline items is 5000, and the online order price is 85000",
    "requestId": "s245868e64474eb6174b04fb34a4fc02",
    "time": 1682394806,
    "data": {
        "verification": "failed",
        "order_id": 5764623016264797741,
        "online_goods_price": 85000,
        "offline_goods_price": 5000
    }
}
```