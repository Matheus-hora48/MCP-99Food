<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 1997 · Food > 99Food Protocol (Recommended) > Order API > Handle Refund Requests -->

## Handle Refund Requests

The **Handle Refund Requests** endpoint allows the store to approve or decline a refund request initiated by the customer through 99Food's Customer Service channels.

> **NOTE:**
> To use this endpoint, the store fisrt needs to configure if it wants to receive refund requests. Read more in **Store API > Set Store Cancellation/Refund**.


### Basic Information

| **Name** | **Description** |
| --- | --- |
| `URL` | [https://openapi.99food.com/v1/order/apply/refund](https://openapi.99food.com/v1/order/apply/refund) |
| `Method` | POST |
| `Permission` | Available |

### Request Body Parameters

| **Name** | **Type** | **Description** | **Required** | **Example** |
| --- | --- | --- | --- | --- |
| `auth_token` | string | The `auth_token` for the shop. | Yes | ZGQ5ZjVlZGUyYmFhNDM2ZmE0ZDA5OTE5ZjI1YzBhNjU= |
| `order_id` | long | The ID of the order in 99Food’s system. | Yes | 2352921557674426622 |
| `apply_id` | integer | The ID of the request sent by the _orderRefundApply_ webhook. | Yes | 1152921654813328202 |
| `agree` | bool | The response for the request. true: agree with the request; false: refuse the request | Yes | true |
| `base_reason_id` | string | The reason ID for the response. Select from the list provided in the _orderRefundApply_ webhook. | No. Required when refusing a request. |     |
| `base_reason` | string | The base reason for the response. Select from the list provided in the _orderRefundApply_ webhook. | No. Required when refusing a request. |     |
| `custom_reason` | string | An optional reason if the store wants to refuse the request. | No  | 600 |

### Request Example

```json
{
    "auth_token":"MWM2ZDI1N2Q2ODRiNDcxZmNlM2IwNDhiMjNmNDkyNDE=",
    "order_id":1152921650518360906,
    "apply_id":1152921650610635594,
    "agree":false,
    "reason":"already prepare"
}
```

### Response Example

```json
{
    "errno":0,
    "errmsg":"ok",
    "requestId":"1e11bfda4f8e51d1",
    "time":1628498382,
    "data":{

    }
}
```
