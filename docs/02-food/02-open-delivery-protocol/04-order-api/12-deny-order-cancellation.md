<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 2067 · Food > Open Delivery Protocol > Order API > Deny Order Cancellation -->

## Deny Order Cancellation

This endpoint is used to deny a pending order cancellation request. When the cancellation is denied, the order remains active and the workflow continues normally.

> **Workflow Note:** This action triggers a `CANCELLATION_DENIED` event, informing the customer (and the system) that the order will proceed.

### Basic Information

| **Item** | **Value** |
| :--- | :--- |
| **URL** |  `https://openapi.99food.com/v4/opendelivery/v1/orders/{orderId}/denyCancellation` |
| **Method** | `POST` |
| **Permission** | Available |

### Request

#### Path Parameters

| **Name** | **Type** | **Required** | **Description** |
| :--- | :--- | :---: | :--- |
| `orderId` | String  | Yes | The unique identifier of the order. |

#### Request Body Parameters

| **Name** | **Type** | **Required** | **Description** |
| :--- | :--- | :---: | :--- |
| `reason` | String | Yes | Text explaining the reason for denying the cancellation. |
| `code` | String | Yes | Reason code. **Enum values:** • `DISH_ALREADY_DONE` • `OUT_FOR_DELIVERY` |

#### Request Example

```json
{
  "reason": "The food is already being prepared.",
  "code": "DISH_ALREADY_DONE"
}
```


### Response

#### Response Status Codes

| **Code** | **Meaning** | **Description** |
| :--- | :--- | :--- |
| `200` | **Success** | Status 200 available for compatibility reasons. Please use status 204 instead. |
| `204` | **Success** | Order cancellation has been confirmed. No response content. |
| `400` | **Bad Request** | Invalid syntax or missing parameters. |
| `401` | **Unauthorized** | Request lacks valid authentication credentials for the target resource |
| `403` | **Forbidden** | Authenticated participant request that violates some authorization rule. |
| `404` | **Not Found** | The requested resource was not found. |
| `422` | **Unprocessable Entity** | Server understands the content type of the request entity, and the syntax of the request entity is correct, but it was unable to process the contained instructions. (Check if the instruction has not been sent before.) |
| `503` | **Service Unavailable** | Service is not currently available. Requested service may be under maintenance or outside the operating window. |

#### Error Response Parameters

| **Name** | **Type** | **Required** | **Description** |
| :--- | :--- | :---: | :--- |
| `title` | String | Yes | Short description of the problem. |
| `status` | Integer | Yes | HTTP code of the returned status. |
| `cancellationStatus` | string | No | **(Conditional)** Indicates the specific result if the action failed. **Enum:** `CANCELLED`, `CANCELLATION_REQUEST_DENIED`. |