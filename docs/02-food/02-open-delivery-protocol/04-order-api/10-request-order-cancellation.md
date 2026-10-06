<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 2063 · Food > Open Delivery Protocol > Order API > Request Order Cancellation -->

## Request Order Cancellation

This endpoint initiates a cancellation request for a specific order.

> **Workflow Note:** If processed successfully, the system is expected to trigger a `CANCELLATION_REQUESTED` event. The actual cancellation depends on the state of the order and subsequent validation.

### Basic Information

| **Item** | **Value** |
| :--- | :--- |
| **URL** |  `https://openapi.99food.com/v4/opendelivery/v1/orders/{orderId}/requestCancellation` |
| **Method** | `POST` |
| **Permission** | OAuth2 |

### Request

#### Path Parameters

| **Name** | **Type** | **Required** | **Description** |
| :--- | :--- | :---: | :--- |
| `orderId` | String | Yes | The unique identifier of the order. |

#### Request Body Parameters

| **Name** | **Type** | **Required** | **Description** |
| :--- | :--- | :---: | :--- |
| `reason` | String | Yes | Open text field indicating the reason for the cancellation. |
| `code` | String | Yes | Standardized reason code. **Enum Values:** • `SYSTEMIC_ISSUES` • `DUPLICATE_APPLICATION` • `UNAVAILABLE_ITEM` • `RESTAURANT_WITHOUT_DELIVERY_PERSON` • `OUTDATED_MENU` • `ORDER_OUTSIDE_THE_DELIVERY_AREA` • `BLOCKED_CUSTOMER` • `OUTSIDE_DELIVERY_HOURS` • `INTERNAL_DIFFICULTIES_OF_THE_RESTAURANT` • `RISK_AREA` • `DELIVERY_PROBLEM` |
| `mode` | String | Yes | Indicates whether the cancellation request was made by an automatic or manual process in the Software Service. **Enum:** `AUTO`, `MANUAL`. |
| `outOfStockItems` | Array | No | List of IDs of items that are not in the merchant's inventory. |
| `invalidItems` | Array | No | List of IDs of items that do not exist in the merchant's inventory. |

#### Request Example

```json
{
  "reason": "Customer called and said they moved to another address.",
  "code": "DELIVERY_PROBLEM",
  "mode": "MANUAL",
  "outOfStockItems": [
    "550e8400-e29b-41d4-a716-446655440000"
  ]
}
```

### Response

#### Response Status Codes

| **Code** | **Meaning** | **Description** |
| :--- | :--- | :--- |
| `202` | **Success** | Request has been accepted for processing. |
| `400` | **Bad Request** | Invalid syntax or missing parameters. |
| `401` | **Unauthorized** | Request lacks valid authentication credentials for the target resource. |
| `403` | **Forbidden** | Authenticated participant request that violates some authorization rule. |
| `404` | **Not Found** | The requested resource was not found. |
| `422` | **Unprocessable Entity** | Server understands the content type of the request entity, and the syntax of the request entity is correct, but it was unable to process the contained instructions. (Check if the instruction has not been sent before.) |
| `503` | **Service Unavailable** | Service is not currently available. Requested service may be under maintenance or outside the operating window. |

#### Error Response Parameters

| **Name** | **Type** | **Required** | **Description** |
| :--- | :--- | :---: | :--- |
| `title` | string | Yes | Short description of the problem. |
| `status` | integer | Yes | HTTP code of the returned status. |
| `cancellationStatus` | string | **No** | **(Conditional)** Indicates the specific result of the failed cancellation attempt. **Enum:** `CANCELLED`, `CANCELLATION_REQUEST_DENIED`. |


