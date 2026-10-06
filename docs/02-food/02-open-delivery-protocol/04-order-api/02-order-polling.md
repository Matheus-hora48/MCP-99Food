<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 2049 · Food > Open Delivery Protocol > Order API > Order Polling -->

## Order Polling

This endpoint polls for new events related to orders from merchants associated with the authenticated user.

> **Crucial Implementation Detail:**
> Each event received from this endpoint **must be properly acknowledged** using the **Acknowledgment Endpoint**. If not acknowledged, the event will continue to be returned in subsequent polling requests.

### Basic Information

| **Item** | **Value** |
| :--- | :--- |
| **URL** |  `https://openapi.99food.com/v4/opendelivery/v1/events:polling` |
| **Method** | `GET` |
| **Authorization** | OAuth2 |
| **Permission** | Available |

### Request 

#### Body Parameters

| **Name** | **Type** | **Required** | **Description** |
| :--- | :--- | :---: | :--- |
| `eventType` | Array | Yes | Filter for desired event types. Events not selected in this list will be automatically acknowledged and omitted from the response. **Enum Values:** • `CREATED` • `CONFIRMED`  • `READY_FOR_PICKUP`  • `DISPATCHED` • `DELIVERED` • `CONCLUDED` • `CANCELLATION_REQUESTED` • `CANCELLATION_REQUEST_DENIED` • `CANCELLED` • `ORDER_CANCELLATION_REQUEST` • `CANCELLED_DENIED` |
| `fromTime` | String | Yes | Start filter date and time. Format: `2023-10-27T10:00:00Z` |

### Response

#### Response Status Codes

| **Code** | **Meaning** | **Description** |
| :--- | :--- | :--- |
| `200` | **Success** | Successful returns list of polled events . |
| `204` | **Success** | No content. |
| `400` | **Bad Request** | Invalid syntax or missing parameters. |
| `401` | **Unauthorized** | Request lacks valid authentication credentials for the target resource |
| `403` | **Forbidden** | Authenticated participant request that violates some authorization rule. |
| `503` | **Service Unavailable** | Service is not currently available. Requested service may be under maintenance or outside the operating window. |

#### Success Response Parameters

HTTP Code: `200 OK`
Returns an **Array** of event objects found within the timeframe and criteria.

| **Name** | **Type** | **Description** |
| :--- | :--- | :--- |
| `eventId` | String | A unique identifier of the event. |
| `eventType` | String | The type of the event (matches the enum list above). |
| `orderId` | String | The unique identifier of the order. |
| `orderURL` | String | The URL to retrieve full order details. |
| `createdAt` | String | Event creation date and time (UTC ISO 8601 format). |
| `sourceAppId` | String | AppId of the **Application** that originated the order. Used for Hub applications intermediating requests between the Ordering App and the Software Service. |

#### Error Response Parameters

| **Name** | **Type** | **Required** | **Description** |
| :--- | :--- | :--- | :--- |
| `title` | String | Yes | Short description of the problem. |
| `status` | Integer | Yes | HTTP code of the returned status (e.g., 400, 500). |
