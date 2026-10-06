<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 2041 · Food > Open Delivery Protocol > Store & Menu API > Merchant Status -->

## Merchant Status

Get merchant status information.
Used to retrieve status information about merchantUpdate requests.


### Basic Information

| **Name** | **Description** |
| --- | --- |
| **URL** |  `https://openapi.99food.com/v4/opendelivery/v1/merchantStatus` |
| **Method** | GET |
| **Authorization** | OAuth2 |
| **Permission** | Available |


### Request 

#### Path Parameters

| **Name** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| `merchantId` | String | Yes | The Id of the Merchant for whom you want to complete or change registration info. |

### Response

#### Response Status Codes

| **Code** | **Meaning** | **Description** |
| :--- | :--- | :--- |
| `200` | **Success** | Returns the status and result of the last merchant update processing. |
| `400` | **Bad Request** | Invalid syntax or missing required parameters. |
| `401` | **Unauthorized** | Missing or invalid authentication credentials for the target resource. |
| `403` | **Forbidden** | Request violates authorization rules or permissions. |
| `404` | **Not Found** | The requested resource was not found. |
| `503` | **Service Unavailable** | Service is currently unavailable (e.g., under maintenance or outside the operating window). |

#### Success Response Parameters

The following fields are returned in the response body when the request is successful (`200 OK`).

| **Name** | **Type** | **Description** |
| :--- | :--- | :--- |
| `lastRead` | String | Date of last attempt to read merchant information. |
| `status` | String | Reading attempt status (`SUCCESS`, `PROCESSING`, `FAIL`). |
| `moreInfo` | String | Open field to provide relevant information, such as error messages or causes. |

#### Error Response Parameters

When the status code is not `200`, the system returns the following error object.

| **Name** | **Type** | **Description** |
| :--- | :--- | :--- |
| `title` | String | A short summary of the problem. |
| `status` | Integer | The HTTP status code (e.g., 400, 500). |

#### Response Example

```json
{
  "lastRead": "2025-07-21T15:00:00.000Z",
  "status": "SUCCESS",
  "moreInfo": "Integration active."
}
```