<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 2109 · Grocery > Store API > Set Store Confirmation Method -->

## Set Store Order Confirmation Method

This API sets the method a store uses to confirm orders. Choose between two modes:

- **OpenAPI**: Orders **must** be accepted or canceled through your integrated system using the respective endpoints.
- **B-App & OpenAPI**: Orders can be accepted or canceled **either** through the 99Food Store (B-App) **or** your integrated system. **Note**: To confirm orders via your system in this mode, **the store's B-App must be online.**

When a store is unbound, the confirmation method is automatically reset to **B-App & OpenAPI**.

### Basic Information

| **Name** | **Description** |
| --- | --- |
| `URL` | [https://openapi.99food.com/v1/shop/shop/setconfirmmethod](https://openapi.99food.com/v1/shop/shop/setconfirmmethod) |
| `Method` | POST |
| `Permission` | Available |

### Request Body Parameters

| **Name** | **Type** | **Description** | **Required** | **Example** |
| --- | --- | --- | --- | --- |
| `auth_token` | string | The `auth_token` for the shop. | Yes | ZGQ5ZjVlZGUyYmFhNDM2ZmE0ZDA5OTE5ZjI1YzBhNjU= |
| `order_confirm_method` | int | 1: B-App & OpenAPI;  2: OpenAPI | Yes | 1   |

### Response Body Parameters

| **Name** | **Type** | **Description** | **Example** |
| --- | --- | --- | --- |
| `order_confirm_method` | bool | The result of setting the `order_confirm_method`. | true |

### Response Errors (errno) Descriptions

| **Code** | **Description** |
| --- | --- |
| 10001 | System error. |
| 10002 | Parameter error. |
| 10100 | Get shop authorization info failed. |
| 10102 | The shop authorization info has expired. |
| 11053 | Get shop detail fail. |


### Request Example

```json
{
    "auth_token":"ZGQ5ZjVlZGUyYmFhNDM2ZmE0ZDA5OTE5ZjI1YzBhNjU=",
    "order_confirm_method":1
}
```

### Response Example

```json
{
    "errno":0,
    "errmsg":"ok",
    "requestId":"2281991a24d4db7d",
    "time":1568711984,
    "data":{
        "order_confirm_method":true
    }
}
```