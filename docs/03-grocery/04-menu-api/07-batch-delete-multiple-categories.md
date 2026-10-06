<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 2135 · Grocery > Menu API > Batch Delete Multiple Categories -->


## Batch Delete Multiple Categories

The **Batch Delete Multiple Categories** endpoint allows Partners to delete multiple categories from a store's menu. This operation is asynchronous and returns a `t99foodaskId` that can be used to track the deletion progress.

### Basic Information

| **Name** | **Description** |
| --- | --- |
| `URL` | [https://openapi.99food.com/v3/item/item/delCate](https://openapi.99food.com/v3/item/item/delCate) |
| `Method` | POST |
| `Permission` | Available |

### Request Body Parameters

| **Name** | **Type** | **Required** | **Description** | **Example** |
| --- | --- | --- | --- | --- |
| `auth_token` | string | Yes | Access/Auth Token for the shop | `ZGQ5ZjVlZGUyYmFhNDM2ZmE0ZDA5OTE5ZjI1YzBhNjU=` |
| `category_id_list` | array | Yes | List of categories to delete | `[{"app_category_id": "ABC"}, {"app_category_id": "CDF"}]` |
| `category_id_list[].app_category_id` | string | Yes | Category ID provided by the partner | `ABC` |

### Response Body Parameters

| **Name** | **Type** | **Description** | **Example** |
| --- | --- | --- | --- |
| `errno` | int | The result code of request | `0` |
| `errmsg` | string | The result message of request | `"ok"` |
| `requestId` | string | Unique ID of request | `"b16f66b1c86372ea067c65447602"` |
| `time` | int | Response time of request | `1722927203` |
| `data` | struct | Response task info | `{...}` |
| `data.taskId` | int | Batch delete multiple categories task ID | `5764629789442704000` |
| `data.createTime` | int | Task create time (Unix timestamp) | `1751609695` |
| `data.status` | enum | Task status (see table below) | `1` |
| `data.message` | string | Task status message | `"success"` |
| `data.operationList` | array | List of operations (if any) | `[]` |

#### Task Status Values

| **Status** | **Description** |
| --- | --- |
| 0 | waiting |
| 1 | success |
| 2 | failed |
| 3 | waitRetry |
| 4 | running |
| 5 | partial success |

### Request Example (HTTP Body)

```json
{
    "auth_token": "MWM2ZDI1N2Q2ODRiNDcxZmNlM2IwNDhiMjNmNDkyNDE=",
    "category_id_list": [
        {
            "app_category_id": "ABC"
        },
        {
            "app_category_id": "CDF"
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
    "data": {
        "taskID": 5764629789442704000,
        "createTime": 1751609695,
        "status": 1,
        "message": "success",
        "operationList": []
    }
}
```