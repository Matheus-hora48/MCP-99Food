<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 2159 · Grocery > Order API > Confirm Order -->

## Confirm Order

The **Confirm Order** endpoint enables partners to acknowledge receipt of a 99Food order within their own system. 

> ATTENTION:
> 1. We require that the order is confirmed in 5 minutes after sending the *orderNew* webhook or the order will be canceled automatically by the system. The confirmation can be done either by this endpoint or by B-App, depending on the configuration set for the store. For more details, check **Set Shop Order Confirmation Method**.
2. We use long (64-bit integer) as IDs for apps, orders and stores. So please pay attention when parsing those numbers. For example, in Node.js our orderId (5764607801871631353) will be parsed as 5764607801871631000 with lib "body-parser" or "JSON.parse()". Please use json-bigint to parse it: `var jsonBig = require('json-bigint'); jsonBig.parse(data)`.

Since the `auth_token` is a crucial part for confirming the order, we recommend establishing a process for automatically refreshing the `auth_token` if necessary, as described in **Get Authtoken**.

### Basic Information

| **Name** | **Description** |
| --- | --- |
| `URL` | [https://openapi.99food.com/v1/order/order/confirm](https://openapi.99food.com/v1/order/order/confirm) |
| `Method` | POST |
| `Permission` | Available |

### Request Body Parameters
 
| **Name** | **Type** | **Description** | **Required** | **Example** |
| --- | --- | --- | --- | --- |
| `auth_token` | string | The `auth_token` for the shop. | Yes | ZGQ5ZjVlZGUyYmFhNDM2ZmE0ZDA5OTE5ZjI1YzBhNjU= |
| `order_id` | long | The ID of the order in 99Food’s system. | Yes | 2352921557674426622 |

### Response Body Parameters

| **Name** | **Type** | **Description** | **Example** |
| --- | --- | --- | --- |
| `data` | bool | The result of confirming the order | true

  

### Response Example

```json
{
"errno": 0,
"errmsg": "ok",
"requestId": "22871b9405a415c6",
"time": 1568713144,
"data": true
}
```
