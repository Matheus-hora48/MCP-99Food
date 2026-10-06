<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 1947 · Food > 99Food Protocol (Recommended) > Store API > Get Store Categories -->

## Get Store Categories

The **Get Store Categories** endpoint brings all valid categories a developer can use when updating a store basic information.

### Basic Information

| **Name** | **Description** |
| --- | --- |
| `URL` | [https://openapi.99food.com/v1/shop/shop/validCategories](https://openapi.99food.com/v1/shop/shop/validCategories) |
| `Method` | POST |
| `Permission` | Available |

### Request Body Parameters

| **Name** | **Type** | **Description** | **Required** | **Example** |
| --- | --- | --- | --- | --- |
| `auth_token` | string | The `auth_token` for the shop. | Yes | ZGQ5ZjVlZGUyYmFhNDM2ZmE0ZDA5OTE5ZjI1YzBhNjU= |

### Response Body Parameters
| **Name** | **Type** | **Description** | **Example** |
| --- | --- | --- | --- |
| `categories` | array | --- | List of valid categories. |

### Response Body Parameters - categories
| **Name** | **Type** | **Description** | **Example** |
| --- | --- | --- | --- |
| `id` | string | Category's id | 200001545088714 |
| `name` | string | Category's name | Alcohol |  


### Response Errors (errno) Descriptions

| **Code** | **Description** |
| --- | --- |
| 10001 | System error. |
| 10002 | Parameter error. |
| 10100 | Get `auth_token` failed. |
| 10102 | `auth_token` has expired. Please refresh it. |


### Response Example

```json
{
    "errno":0,
    "errmsg":"ok",
    "requestId":"ccda771f25ad9a84",
    "time":1623996528,
    "data":{
        "categories":[
            {
                "id":"200001545088714",
                "name":"Alcohol"
            },
            {
                "id":"20000897046510",
                "name":"Alitas & Pollo"
            }
        ]
    }
}
```
