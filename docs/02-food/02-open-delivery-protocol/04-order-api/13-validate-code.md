<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 2069 · Food > Open Delivery Protocol > Order API > Validate Code -->

## Validate Code

This endpoint validates a delivery code provided by the consumer so the delivery person can verify the recipient.

> **Important:** Unlike other endpoints, this path must be handled **SYNCHRONOUSLY** and will not generate events in polling or webhooks.

### Basic Information

| **Item** | **Value** |
| :--- | :--- |
| **URL** |  `https://openapi.99food.com/v4/opendelivery/v1/orders/{orderId}/validateCode` |
| **Method** | `POST` |
| **Permission** | Available |

### Request 

#### Path Parameters

| **Name** | **Type** | **Required** | **Description** |
| :--- | :--- | :---: | :--- |
| `orderId` | String | Yes | The unique identifier of the order. |

#### Query Parameters

| **Name** | **Type** | **Required** | **Description** |
| :--- | :--- | :---: | :--- |
| `deliveryCode` | String | Yes | The delivery confirmation code to validate. |

### Response

#### Response Status Codes

| **Code** | **Meaning** | **Description** |
| :--- | :--- | :--- |
| `200` | **Success** | Confirmation Code is correct. You can proceed with the delivery. |
| `400` | **Bad Request** | Invalid syntax or missing parameters. |
| `401` | **Unauthorized** | Request lacks valid authentication credentials for the target resource |
| `503` | **Service Unavailable** | Service is not currently available. Requested service may be under maintenance or outside the operating window. |

#### Error Response Parameters

Includes validation errors or server failures.

| **Name** | **Type** | **Description** |
| :--- | :--- | :--- |
| `title` | String | Short description of the problem. |
| `status` | Integer | HTTP code of the returned status (e.g., 400, 500). |

