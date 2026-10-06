<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 2153 · Grocery > Order API > Acknowledgment -->

## Acknowledgment

This endpoint allows you to acknowledge a list of events simultaneously via the request body. This is useful for processing batches of events retrieved from the polling endpoint.
> **Crucial Implementation Detail:**
> * Polling usage requires whitelisting. Please reach out to the 99 Integration Team or your assigned BD/Sales contact.


### Basic Information

| **Item** | **Value**                                         |
| :--- |:--------------------------------------------------|
| **URL** | `https://openapi.99food.com//v1/order/events/ack` |
| **Method** | `POST`                                            |
| **Authorization** | OAuth2                                            |
| **Permission** | Available                                         |

### Request 

#### Request Body Parameters

| **Name** | **Type** | **Required** | **Description** |
| :--- | :--- | :---: | :--- |
| `auth_token` | String | Yes | Standard API token |
| `polling_events` | Array | Yes | Filter for desired event types. Events not selected in this list will be automatically acknowledged and omitted from the response. **Enum Values:** • `CREATED` • `CONFIRMED`  • `READY`  • `CONCLUDED` • `CANCELLED` • `CONSUMER_CANCELLATION_REQUESTED` • `CONSUMER_REFUND_REQUESTED` |
| `polling_events[].event_id` | int | Yes | event_id |
| `polling_events[].order_id` | int | Yes | order_id |



#### Request Example
{
    "auth_token": "MzRlZjE0YzE0YWE4NGQ1Mjk4MjkxZjU4N2IyNTE5OGE=",
    "polling_events": [
        {
            "event_id": 5764640420019441388,
            "order_id": 5764657937880515791
        }
    ]
}

### Response

#### Response Example
    {
    "errno": 0,
    "errmsg": "ok",
    "requestId": "s4215153698c31520c4506dd557aae02",
    "time": 1770795346,
    "data": {}
}
