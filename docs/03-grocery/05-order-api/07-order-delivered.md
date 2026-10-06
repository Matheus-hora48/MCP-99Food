<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 2163 · Grocery > Order API > Order Delivered -->

## Order Delivered

The **Order Delivered** endpoint aallows the store to mark a self-delivery order as successfully delivered to the customer. **Only used for self-delivery orders**.

### Basic Information

| **Name** | **Description** |
| --- | --- |
| `URL` | [https://openapi.99food.com/v1/order/order/delivered](https://openapi.99food.com/v1/order/order/delivered) |
| `Method` | POST |
| `Permission` | Available |

### Request Body Parameters

| **Name**     | **Type** | **Description**                           | **Required** | **Example**                                  |
| ------------ | -------- | ----------------------------------------- | ------------ | -------------------------------------------- |
| `auth_token` | string   | The `auth_token` for the shop.            | Yes          | ZGQ5ZjVlZGUyYmFhNDM2ZmE0ZDA5OTE5ZjI1YzBhNjU= |
| `order_id`   | long     | The ID of the order in 99Food’s system. | Yes          | 2352921557674426622                          |

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
