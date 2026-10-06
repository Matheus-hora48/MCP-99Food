<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 1969 · Food > 99Food Protocol (Recommended) > Menu API > Update Item Status -->

## Update Item Status

The **Update Item Status** endpoint provides the ability to update one or more items status, making them available or unavailable in the menu. The response of this request will give you the status (success or failed) for each item.

### Basic Information

| **Name** | **Description** |
| --- | --- |
| `URL` | [https://openapi.99food.com/v3/item/item/updateItemStatus](https://openapi.99food.com/v3/item/item/updateItemStatus) |
| `Method` | POST |
| `Permission` | Available |

### Request Body Parameters

| **Name** | **Type** | **Description** | **Required** | **Example** |
| --- | --- | --- | --- | --- |
| `auth_token` | string | The `auth_token` for the shop. | Yes | ZGQ5ZjVlZGUyYmFhNDM2ZmE0ZDA5OTE5ZjI1YzBhNjU= |
| `app_item_ids` | array | A list of the item IDs provided by the restaurant or POS. | Yes | ["item_1", "item_2"] |
| `status` | int | Status of the item. 1: Available; 2: Unavailable. | Yes | 1   |

### Request Body Example

```json
{
    "auth_token":"MWM2ZDI1N2Q2ODRiNDcxZmNlM2IwNDhiMjNmNDkyNDE=",
    "app_item_ids":[
        "item_1",
        "item_2"
    ],
    "status":1
}
```

### Response Example

```json
{
    "errno":0,
    "errmsg":"ok",
    "requestId":"cd0514a30d721dd2",
    "time":1627612911,
    "data":{
        "success":[
            "item_1"
        ],
        "failed":[
            "item_2"
        ]
    }
}
```