<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 2005 · Food > 99Food Protocol (Recommended) > Logistics API > Order Dispatched -->

## Self Delivery Order Dispatched

The **Self Delivery Order Dispatched** endpoint allows the developer to notify the platform that a self-fulfillment order has been picked up and is officially out for delivery.

### Basic Information

| **Name** | **Description** |
| :--- | :--- |
| **URL** | [https://openapi.99food.com/v1/order/selfdelivery/dispatch](https://openapi.99food.com/v1/order/selfdelivery/dispatch) |
| **Method** | `POST` |
| **Permission** | Available |

### Request Body Parameters

| Name | Type | Required | Description | Example |
| :--- | :--- | :--- | :--- | :--- |
| `auth_token` | string | Yes | Authentication token. Required. | `"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"` |
| `order_id` | integer | Yes | Order ID. Required. | `1000001` |
| `courier_info` | object | Yes | Courier information. Required. | |
| `vehicle` | object | No | Vehicle information. Optional. |  |
| `limit_time` | object | Yes | Time constraints. Required. |  |
| `delivery_fee` | number | No | Delivery fee. Optional. | `5.99` |

### Request Body Parameters - CourierInfo

| Name | Type | Required | Description | Example |
| :--- | :--- | :--- | :--- | :--- |
| `courier_id` | string | No | Courier's unique identifier. Optional. | `"courier_abc123"` |
| `courier_name` | string | Yes | Courier's full name. Required. | `"John Doe"` |
| `courier_first_name` | string | Yes | Courier's first name. Required. | `"John"` |
| `courier_last_name` | string | Yes | Courier's last name. Required. | `"Doe"` |
| `courier_phone_code` | string | Yes | Phone number country/region code. Required. | `"+1"` |
| `courier_phone` | string | Yes | Courier's phone number. Required. | `"13800138000"` |
| `courier_image_url` | string | No | URL of the courier's profile image. Optional. | `"https://example.com/avatar.jpg"` |

### Request Body Parameters - Vehicle

| Name | Type | Required | Description | Example |
| :--- | :--- | :--- | :--- | :--- |
| `vehicle_type` | number | No | Rider's vehicle type. Optional. Values: 100-Walking, 101-E-bike, 102-Motorcycle, 103-Bicycle, 104-Car, 105-125cc Motorcycle. | `101` |
| `vehicle_number` | string | No | Vehicle license plate number. Optional. | `"A1B2C3"` |

### Request Body Parameters - Limit Time

| Name | Type | Required | Description | Example |
| :--- | :--- | :--- | :--- | :--- |
| `pickup_time` | integer | Yes | Estimated time for the order to arrive at the store for pickup. Required. Unix timestamp (10 digits). | `1737900000` |
| `delivery_time` | integer | Yes | Estimated time for the order to be delivered to the user. Required. Unix timestamp (10 digits). | `1737903600` |

### Response Body Parameters

```json
{
    "errno":0,
    "errmsg":"ok",
    "requestId":"20fbd1a6207a3535",
    "time":1609845642,
    "data":null
}
```
