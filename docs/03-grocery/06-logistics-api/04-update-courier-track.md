<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 2189 · Grocery > Logistics API > Update Courier Track -->

## Self Delivery Update Courier Track

The **Self Delivery Update Courier Track** endpoint allows the developer to update the real-time geographic location of the courier for a self-fulfillment order. 

### Basic Information

| **Name** | **Description** |
| :--- | :--- |
| **URL** | [https://openapi.99food.com/v1/order/selfdelivery/updateCourierTrack](https://openapi.99food.com/v1/order/selfdelivery/updateCourierTrack) |
| **Method** | `POST` |
| **Permission** | Available |

### Request Body Parameters

| Name | Type | Required | Description | Example |
| :--- | :--- | :--- | :--- | :--- |
| `auth_token` | string | Yes | Authentication token. Required. | `"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"` |
| `order_id` | integer | Yes | Order ID.  | `1000001` |
| `limit_time` | object | Yes | Time constraints.  | |
| `coordinate` | object | Yes | Location tracking information.  |  |

### Request Body Parameters - Limit Time

| Name | Type | Required | Description | Example |
| :--- | :--- | :--- | :--- | :--- |
| `pickup_time` | integer | Yes | Estimated time for the order to arrive at the store for pickup. Required. Unix timestamp (10 digits). | `1737900000` |
| `delivery_time` | integer | Yes | Estimated time for the order to be delivered to the user. Required. Unix timestamp (10 digits). | `1737903600` |

### Request Body Parameters - Coordinate
| Name | Type | Required | Description | Example |
| :--- | :--- | :--- | :--- | :--- |
| `longitude` | number | Yes | Longitude. Value must be between [-180, 180]. Must be uploaded together with latitude. | `116.397128` |
| `latitude` | number | Yes | Latitude. Value must be between [-90, 90]. Must be uploaded together with longitude. | `39.916527` |
| `timestamp` | integer | Yes | Timestamp. Unix timestamp (10 digits). | `1737900000` |


### Response Body Example

```json
{
    "errno":0,
    "errmsg":"ok",
    "requestId":"20fbd1a6207a3535",
    "time":1609845642,
    "data":null
}
```