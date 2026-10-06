<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 2107 · Grocery > Store API > Unbind Store -->

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

### Request Example

```json
{
    "auth_token": "MjBlMWM1N2VjNTg0NzRkN2QwMTc41DNlNzI0ZTRmYjc="
}
```

### Response Error Example

```json
{
    "errno": 10102,
    "errmsg": "The store authorization information has expired",
    "requestId": "52051536a8282b50d6006e08ebd0002",
    "time": 1786938038,
    "data": {}
}
```

### Response Example

```json
{
    "errno":0,
    "errmsg":"ok",
    "requestId":"52025226a827f47617f49f33c094c02",
    "time":1623320367,
    "data":true
}
```

