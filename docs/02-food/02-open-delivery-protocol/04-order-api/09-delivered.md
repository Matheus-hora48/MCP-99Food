<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 2061 · Food > Open Delivery Protocol > Order API > Delivered -->

## Delivered

The Delivered endpoint allows the developer to indicate that the delivery has been completed.

> **Important:** This endpoint is applicable **only for self-delivery orders**.

### Basic Information

| **Item** | **Value** |
| :--- | :--- |
| **URL** |  `https://openapi.99food.com/v4/opendelivery/v1/orders/{orderId}/delivered` |
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
| `202` | **Success** | Request has been accepted for processing. |
| `400` | **Bad Request** | Invalid syntax or missing parameters. |
| `401` | **Unauthorized** | Request lacks valid authentication credentials for the target resource |
| `403` | **Forbidden** | Authenticated participant request that violates some authorization rule. |
| `404` | **Not Found** | The requested resource was not found. |
| `422` | **Unprocessable Entity** | Server understands the content type of the request entity, and the syntax of the request entity is correct, but it was unable to process the contained instructions. (Check if the instruction has not been sent before.) |
| `503` | **Service Unavailable** | Service is not currently available. Requested service may be under maintenance or outside the operating window. |


#### Error Response Parameters

Includes validation errors or server failures.

| **Name** | **Type** | **Description** |
| :--- | :--- | :--- |
| `title` | String | Short description of the problem. |
| `status` | Integer | HTTP code of the returned status (e.g., 400, 500). |