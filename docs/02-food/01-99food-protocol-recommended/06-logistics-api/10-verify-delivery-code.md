<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 2209 · Food > 99Food Protocol (Recommended) > Logistics API > Verify Delivery Code -->

## Verify Delivery Code

The **Verify Delivery Code** endpoint allows partners to validate the pick-up code provided by the customer. Upon successful verification, the order status will be updated to 600 (Order Completed).

### Basic Information

| **Name** | **Description** |
| --- | --- |
| `URL` | [https://openapi.99food.com/v1/order/selfdelivery/verifyDeliveryCode](https://openapi.99food.com/v1/order/selfdelivery/verifyDeliveryCode) |
| `Method` | POST |
| `Permission` | Available |

### Request 

#### Request Body Parameters

| **Name** | **Type** | **Description** | **Required** | **Example** |
| --- | --- | --- | --- | --- |
| `auth_token` | string | Authentication token. | Yes | NzA4MTkwNmMyOTA4ZWQ2M2UxYjRi0GJiNzUxYTd1ZmI= |
| `order_id` | int | The unique identifier of the order. | Yes | 5764665043203457174 |
| `delivery_code` | int | Delivery confirmation code provided by the customer. | Yes | 5107 |

#### Request Example

```json
{
  "auth_token": "NzA4MTkwNmMyOTA4ZWQ2M2UxYjRi0GJiNzUxYTd1ZmI=",
  "order_id": 5764665043203457174,
  "delivery_code": 5107
}
```

### Response 

#### Response Body Parameters

| **Name** | **Type** | **Description** | **Example** |
| --- | --- | --- | --- |
| `errno` | int | Error code. `0` indicates success. | 0 |
| `errmsg` | string | Error message. `"ok"` indicates success. | ok |
| `requestId` | string | Unique identifier for the API request, used for troubleshooting and tracking. | s405515369ccd0c20cf106dec7fafc02 |
| `time` | int | Timestamp of the response (Unix timestamp). | 1775030467 |
| `data` | object | Response data payload. Returns an empty object `{}` when no additional data is returned. | {} |

#### Response Example

```
{
  "errno": 0,
  "errmsg": "ok",
  "requestId": "s405515369ccd0c20cf106dec7fafc02",
  "time": 1775030467,
  "data": {}
}
```