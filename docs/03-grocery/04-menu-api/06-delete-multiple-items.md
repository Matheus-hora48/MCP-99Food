<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 2133 · Grocery > Menu API > Delete Multiple Items -->

## Delete Multiple Items

The **Delete Multiple Items** endpoint allows Partners to delete multiple items from a store's menu in a single request. This operation is synchronous and will immediately return the result of the deletion.
99food
### Basic Information

| **Name** | **Description** |
| --- | --- |
| `URL` | [https://openapi.99food.com/v3/item/item/delItem](https://openapi.99food.com/v3/item/item/delItem) |
| `Method` | POST |
| `Permission` | Available |

### Request Body Parameters

| **Name** | **Type** | **Required** | **Description** | **Example** |
| --- | --- | --- | --- | --- |
| `auth_token` | string | Yes | Access/Auth Token for the shop | `ZGQ5ZjVlZGUyYmFhNDM2ZmE0ZDA5OTE5ZjI1YzBhNjU=` |
| `item_id_list` | array | Yes | List of items to delete | `[{"app_item_id": "ABC"}, {"app_item_id": "CDF"}]` |
| `item_id_list[].app_item_id` | string | Yes | Item ID provided by the partner | `ABC` |

### Response Body Parameters

| **Name** | **Type** | **Description** | **Example** |
| --- | --- | --- | --- |
| `errno` | int | The result code of request | `0` |
| `errmsg` | string | The result message of request | `"ok"` |
| `requestId` | string | Unique ID of request | `"b16f66b1c86372ea067c65447602"` |
| `time` | int | Response time of request (Unix timestamp) | `1722927203` |
| `data` | struct | Response message (empty on success) | `{}` |

### Request Example (HTTP Body)

```json
{
    "auth_token": "MWM2ZDI1N2Q2ODRiNDcxZmNlM2IwNDhiMjNmNDkyNDE=",
    "item_id_list": [
        {
            "app_item_id": "ABC"
        },
        {
            "app_item_id": "CDF"
        }
    ]
}
```

### Response Example

```json
{
    "errno": 0,
    "errmsg": "ok",
    "requestId": "b16f66b1c86372ea067c65447602",
    "time": 1722927203,
    "data": {}
}
```
