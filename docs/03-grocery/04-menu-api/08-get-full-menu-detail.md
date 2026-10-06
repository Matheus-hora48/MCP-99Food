<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 2137 · Grocery > Menu API > Get Full Menu Detail -->

## Get Full Menu Detail

The **Get Full Menu Detail** endpoint initiates an asynchronous task to retrieve the complete menu structure of a store. The result is provided via a task ID, which can be used to fetch the menu details once processing is complete.

### Basic Information

| **Name** | **Description** |
| --- | --- |
| `URL` | [https://openapi.99food.com/v3/item/item/menu](https://openapi.99food.com/v3/item/item/menu) |99food
| `Method` | POST |
| `Permission` | Available |

### Request Body Parameters

| **Name** | **Type** | **Required** | **Description** | **Example** |
| --- | --- | --- | --- | --- |
| `auth_token` | string | Yes | Access/Auth Token for the shop | `"ZGQ5ZjVlZGUyYmFhNDM2ZmE0ZDA5OTE5ZjI1YzBhNjU=` |

### Response Body Parameters

The endpoint returns a task ID immediately. The task status is described below.

| **Status (of the task)** | **Description** | **Additional Info** |
| --- | --- | --- |
| 0 | waiting |  |
| 1 | success |  |
| 2 | failed |  |
| 3 | waitRetry | DiDiFood internal system is processing the tasks, therefore the retry will be performed by DiDiFood. No action is required by external parties.|
| 4 | running |  |
| 5 | partial success | When the menu presents errors that will not affect the process flow of an order execution, however it is suggested to check the details with the purpose to improve the parts with error. |

### Request Example (HTTP Body)

```json
{
    "auth_token": "MWM2ZDI1N2Q2ODRiNDcxZmNlM2IwNDhiMjNmNDkyNDE="
}
```

### Response Example if passed the first filter

```json
{
    "errno": 0,
    "errmsg": "ok",
    "requestId": "20fbd1a6207a3535",
    "time": 1609845642,
    "data": {
        "taskID": 3458764739727720400,
        "createTime": 1609845642,
        "status": 0,
        "message": "waiting"
    }
}
```

### Response Example if didn't pass the first filter

```json
{
    "errno": 10001,
    "errmsg": "item name is empty, related app_item_id is P10487",
    "requestId": "0a0f162f64dd8d858fb1d60d21d53902",
    "time": 1692241285,
    "data": {}
}
```
