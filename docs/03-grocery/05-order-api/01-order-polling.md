<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 2151 · Grocery > Order API > Order Polling -->

## Order Polling

This endpoint polls for new events related to orders from merchants associated with the authenticated user.

> **Crucial Implementation Detail:**
> * Each event received from this endpoint **must be properly acknowledged** using the **Acknowledgment Endpoint**. If not acknowledged, the event will continue to be returned in subsequent polling requests.
> * Polling usage requires whitelisting. Please reach out to the 99 Integration Team or your assigned BD/Sales contact.

### Basic Information

| **Item** | **Value**                                         |
| :--- |:--------------------------------------------------|
| **URL** | `https://openapi.99food.com/v1/order/events/list` |
| **Method** | `POST`                                            |
| **Authorization** | OAuth2                                            |
| **Permission** | Available                                         |

### Request 

#### Request Body Parameters

| **Name** | **Type** | **Required** | **Description** |
| :--- | :--- | :---: | :--- |
| `auth_token` | String | Yes | Standard API token |
| `eventType` | Array | Yes | Filter for desired event types. Events not selected in this list will be automatically acknowledged and omitted from the response. **Enum Values:** • `CREATED` • `CONFIRMED`  • `READY`  • `CONCLUDED` • `CANCELLED` • `CONSUMER_CANCELLATION_REQUESTED` • `CONSUMER_REFUND_REQUESTED` |

#### Request Example
    {
    "auth_token": "MzRlZjE0YzE0YWE4NGQ1Mjk4MjkxZjU4N2IyNTE5OGE=",
    "event_type": []
    }

### Response

#### Response Example
    {
     "errno": 0,
     "errmsg": "ok",
     "requestId": "s4213951698c2cc2127f6fd1fea70402",
     "time": 1770794178,
     "data":{
            "event_id": 5764641142240838388,
            "event_type": "CANCELLED",
            "order_id": 5764658710785887183,
            "create_time": "2026-02-11T03:29:20Z"
            },
            {
            "event_id": 5764641259798790914,
            "event_type": "CREATED",
            "order_id": 5764658710785887183,
            "create_time": "2026-02-11T03:29:12Z"
        },
    }
