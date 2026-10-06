<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 2017 · Food > 99Food Protocol (Recommended) > Logistics API > Delete Delivery Area -->

## Delete Delivery Area

The **Delete Delivery Area** endpoint deletes one or more delivery areas set for a store.

### Basic Information

| **Name** | **Description** |
| --- | --- |
| `URL` | [https://openapi.99food.com/v1/shop/deliveryArea/delete](https://openapi.99food.com/v1/shop/deliveryArea/delete) |
| `Method` | POST |
| `Permission` | Available |

### Request Parameters

| **Name** | **Type** | **Description** | **Required** | **Example** |
| --- | --- | --- | --- | --- |
| `auth_token` | string | The `auth_token` for the shop. | Yes | ZGQ5ZjVlZGUyYmFhNDM2ZmE0ZDA5OTE5ZjI1YzBhNjU= |
| `area_id_list` | array | The IDs of the created delivery area. | Yes | [3458764698466584428, 3458764551917602680] |


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
    "auth_token":"ZGQ5ZjVlZGUyYmFhNDM2ZmE0ZDA5OTE5ZjI1YzBhNjU=",
    "area_id_list":[
        3458764754171136000,
        3458764704095340500
    ]
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