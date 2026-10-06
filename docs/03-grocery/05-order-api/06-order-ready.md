<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 2161 · Grocery > Order API > Order Ready -->

## Order Ready

The **Order Ready** endpoint allows the developer to indicate that an order is ready for pickup/delivery. This endpoint can help us to get the real time of preparing the meal, which will be used to optimize our delivery scheme.

### Basic Information

| **Name** | **Description** |
| --- | --- |
| `URL` | [https://openapi.99food.com/v1/order/order/ready](https://openapi.99food.com/v1/order/order/ready) |
| `Method` | POST |
| `Permission` | Available |

### Request Body Parameters

| **Name** | **Type** | **Description** | **Required** | **Example** |
| --- | --- | --- | --- | --- |
| `auth_token` | string | The `auth_token` for the shop. | Yes | ZGQ5ZjVlZGUyYmFhNDM2ZmE0ZDA5OTE5ZjI1YzBhNjU= |
| `order_id` | long | The ID of the order in 99Food's system. | Yes | 2352921557674426622 |

### Response Example

```json
{
    "errno":0,
    "errmsg":"ok",
    "requestId":"22871b9405a415c6",
    "time":1568713144,
    "data":{

    }
}
```
