<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 2215 · Food > 99Food Protocol (Recommended) > Order API > Confirm Order Pickup -->

## Confirm Order Pickup

The **Confirm Order Pickup** endpoint is used by stores to confirm that the customer has picked up the order. It applies only to self-pickup orders (`fulfillment_mode` = 1) and can only be called after the store has confirmed the order or set the order as Ready. Upon successful confirmation, the order will be completed and its status will be updated to 600 (Order Completed).

### Basic Information

| **Name** | **Description** |
| --- | --- |
| `URL` | [https://openapi.99food.com/v1/order/order/finish](https://openapi.99food.com/v1/order/order/finish) |
| `Method` | POST |
| `Permission` | Available |

### Request Body Parameters

| **Name** | **Type** | **Description** | **Required** | **Example** |
| --- | --- | --- | --- | --- |
| `auth_token` | string | The `auth_token` for the shop. | Yes | ZGQ5ZjVlZGUyYmFhNDM2ZmE0ZDA5OTE5ZjI1YzBhNjU= |
| `order_id` | long | The ID of the order in 99Food's system. | Yes | 2352921557674426622 |

### Response Body Parameters

| **Name** | **Type** | **Description** | **Example** |
| --- | --- | --- | --- |
| `errno` | int | Error code. `0` indicates success. | 0 |
| `errmsg` | string | Error message. `"ok"` indicates success. | ok |
| `requestId` | string | Unique identifier for the API request, used for troubleshooting and tracking. | 22871b9405a415c6 |
| `time` | int | Timestamp of the response (Unix timestamp). | 1568713144 |
| `data` | object | Response data payload. Returns an empty object `{}` when no additional data is returned. | {} |

### Response Example

```json
{
    "errno": 0,
    "errmsg": "ok",
    "requestId": "22871b9405a415c6",
    "time": 1568713144,
    "data": {}
}
```