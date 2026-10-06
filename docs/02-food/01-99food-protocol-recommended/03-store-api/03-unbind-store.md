<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 1939 · Food > 99Food Protocol (Recommended) > Store API > Unbind Store -->

## Unbind Store
The Unbind Store endpoint gives you the ability to unbind store from your app when needed, without having to request it from 99Food's team.

### Basic Information

| **Name** | **Description** |
| --- | --- |
| `URL` | [https://openapi.99food.com/v1/shop/shop/unbind](https://openapi.99food.com/v1/shop/shop/unbind) |
| `Method` | POST |
| `Permission` | Available |

### Request Body Parameters

| **Name**     | **Type** | **Description**                | **Required** | **Example**                                  |
|--------------|----------|--------------------------------|--------------|----------------------------------------------|
| `auth_token` | string   | The `auth_token` for the shop. | Yes          | ZGQ5ZjVlZGUyYmFhNDM2ZmE0ZDA5OTE5ZjI1YzBhNjU= |


### Response Errors (errno) Descriptions

| **Code** | **Description** |
| --- | --- |
| 10001 | System error. |
| 10002 | Parameter error. |
| 10100 | Get shop authorization info failed. |
| 10102 | The shop authorization info has expired. |

### Response Example

```json
{
    "errno":0,
    "errmsg":"ok",
    "requestId":"1fc5ad3e151d3a11",
    "time":1623320367,
    "data":true
}
```

