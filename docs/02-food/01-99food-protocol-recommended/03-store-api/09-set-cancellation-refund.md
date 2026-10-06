<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 1951 · Food > 99Food Protocol (Recommended) > Store API > Set Cancellation Refund -->

## Set Store Cancellation/Refund

The **Set Store Cancellation/Refund** endpoint configures whether a store accepts cancellations and refunds **requested by customers** through 99Food’s Customer Service channels.

> **IMPORTANT:**
> If configured to accept cancellations and refunds from customers, we’ll send a callback of the application for the store to accept or refuse it. Read in **Handle Cancellation Requests** and **Handle Refund Requests** under Order API how to complete the settings. Check below the full flow of Cancellations and Refunds.

### Basic Information

| **Name** | **Description** |
| --- | --- |
| `URL` | [https://openapi.99food.com/v1/shop/apply/set](https://openapi.99food.com/v1/shop/apply/set) |
| `Method` | POST |
| `Permission` | Available |

### Request Body Parameters

| **Name** | **Type** | **Description** | **Required** | **Example** |
| --- | --- | --- | --- | --- |
| `auth_token` | string | The `auth_token` for the shop. | Yes | ZGQ5ZjVlZGUyYmFhNDM2ZmE0ZDA5OTE5ZjI1YzBhNjU= |
| `receive_cancel_apply` | integer | 0: Not support cancellation; 1: Support cancellation; **Note:** When set to support, we will send a callback in webhook with type _orderCancelApply_ for the store to accept it or not. We will refuse the request by default after 10 min if you do not handle it. | Yes | 0   |
| `receive_refund_apply` | integer | 0: Not support refund; 1: Support refund; **Note:** When set to support, we will send a callback in webhook with type _orderRefundApply_ for the store to accept it or not. When set to support, we will agree to refund after 24 hours if you do not handle it. | Yes | 0   |

### Response Errors (errno) Descriptions

| **Code** | **Description** |
| --- | --- |
| 10001 | System error. |
| 10002 | Parameter error. |
| 10100 | Get `auth_token` failed. |
| 10102 | `auth_token` has expired. Please refresh it. |

### Request Example

```json
{
    "auth_token":"MWM2ZDI1N2Q2ODRiNDcxZmNlM2IwNDhiMjNmNDkyNDE=",
    "receive_cancel_apply":1,
    "receive_refund_apply":1
}
```

### Response Example

```json
{
    "errno":0,
    "errmsg":"ok",
    "requestId":"cd3fc0e32fba3c55",
    "time":1629446984,
    "data":{

    }
}
```
