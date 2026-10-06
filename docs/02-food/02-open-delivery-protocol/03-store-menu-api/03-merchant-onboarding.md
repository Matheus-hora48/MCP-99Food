<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 2043 · Food > Open Delivery Protocol > Store & Menu API > Merchant Onboarding -->

## Merchant Onboarding

Register and update the Merchant endpoint information in the Ordering Application.

### Basic Information

| **Name** | **Description** |
| --- | --- |
| **URL** |  `https://openapi.99food.com/v4/opendelivery/v1/merchantOnboarding` |
| **Method** | PUT |
| **Authorization** | OAuth2 |
| **Permission** | Available |

### Request

#### Path Parameters

| **Name** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| `merchantId` | String | Yes | The Id of the Merchant for whom you want to complete or change registration info. |

#### Request Body Parameters

| **Name** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| `getMerchantURL` | Object | Yes | Information about the merchant's Software Service access. |
| `getMerchantURL.baseURL` | String | Yes | The URL for accessing the endpoint (e.g., `api.service.com.br`). |
| `getMerchantURL.apiKey` | String | No | The API_KEY for accessing the endpoint (if required). |

### Response 

#### Response Status Codes

| **Code** | **Meaning** | **Description** |
| :--- | :--- | :--- |
| `201` | **Success** | Resource has been created (with the created object). |
| `204` | **Success** | Request has been processed. Return has no content. |
| `400` | **Bad Request** | Invalid syntax or missing parameters. |
| `401` | **Unauthorized** | Request lacks valid authentication credentials for the target resource. |
| `403` | **Forbidden** | Authenticated participant request that violates some authorization rule. |
| `404` | **Not Found** | The requested resource was not found. |
| `503` | **Service Unavailable** | Service is not currently available. Requested service may be under maintenance or outside the operating window. |

#### Error Response Parameters

| **Name** | **Type** | **Required** | **Description** |
| :--- | :--- | :--- | :--- |
| `title` | String | Yes | Short description of the problem. |
| `status` | Integer | Yes | HTTP code of the returned status (e.g., 400, 500). |

#### Response Example

```json
{
    "getMerchantUrl": {
        "baseURL": "url.com.br",
    }
}
```