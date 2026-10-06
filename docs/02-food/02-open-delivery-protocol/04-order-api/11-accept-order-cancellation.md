<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 2065 · Food > Open Delivery Protocol > Order API > Accept Order Cancellation -->

## Accept Order Cancellation

This endpoint is used to accept a pending order cancellation request. When the cancellation is accepted, the order will be effectively cancelled.

> **Workflow Note:** This action is **irreversible**. Once accepted, the order workflow stops and a `CANCELLED` event is triggered.

### Basic Information

| **Item** | **Value** |
| :--- | :--- |
| **URL** |  `https://openapi.99food.com/v4/opendelivery/v1/orders/{orderId}/acceptCancellation` |
| **Method** | `POST` |
| **Permission** | Available |

### Request

#### Path Parameters

| **Name** | **Type** | **Required** | **Description** |
| :--- | :--- | :---: | :--- |
| `orderId` | String | Yes | The unique identifier of the order. |


### Response

#### Response Status Codes

| **Code** | **Meaning** | **Description** |
| :--- | :--- | :--- |
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
| `cancellationStatus` | string | No | **(Conditional)** Indicates the specific result if the cancellation failed. **Enum:** `CANCELLED`, `CANCELLATION_REQUEST_DENIED`. |
