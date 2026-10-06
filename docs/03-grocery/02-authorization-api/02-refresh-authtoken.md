<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 2099 · Grocery > Authorization API > Refresh Authtoken -->

## Refresh Authtoken

The **Refresh Authtoken** endpoint will refresh the `auth_token` for the requested store when it has passed the expiration date. After refreshing it, you will need to get it again using the **Get Authtoken API**.

> **NOTE:**
> The API has a cool-down time of two minutes. It won't generate a new token until two minutes after the first request.

### Basic Information

| **Name** | **Description** |
| --- | --- |
| `URL` | [https://openapi.99food.com/v1/auth/authtoken/refresh](https://openapi.99food.com/v1/auth/authtoken/refresh) |
| `Method` | GET |
| `Permission` | Available |

### Request Path Parameters

| **Name** | **Type** | **Required** | **Description** | **Example** |
| --- | --- | --- | --- | --- |
| `app_id` | long | Yes | The ID of an app in **our** system. | 9764699999123456789 |
| `app_secret` | string | Yes | The secret key of `app_id`. | b0919c644bddc031c59288884954cf5c |
| `app_shop_id` | string | Yes | The **unique** store identifier in **your** system. | 342343227 |

### Response Errors (errno) Descriptions

| **Code** | **Description** |
| --- | --- |
| 10001 | System error. |
| 10100 | Get `auth_token` failed. |
| 10101 | This shop does not have `auth_token`. |
| 10103 | Fail to refresh `auth_token`. |
| 14103 | Get app failed. |
| 14105 | `app_id` does not exist. |
| 14106 | `app_secret` is wrong. |

### Request Example

```json
{
    "app_id": 5764607784238513302,
    "app_secret": "b152cdce532190c7dfa6d15622f7930b",
    "app_shop_id": "5764608367574909790"
}
```

### Response Error Example

```json
{
    "errno": 14105,
    "errmsg": "Application information does not exist",
    "requestId": "s52051536a827c780cf106de8ea61a02",
    "time": 1786936440,
    "data": {}
}
```

### Response Example

```json
{
    "errno":0,
    "errmsg":"ok",
    "requestId":"228bce6a34f3cf6e",
    "time":1568710550,
    "data":true
}
```