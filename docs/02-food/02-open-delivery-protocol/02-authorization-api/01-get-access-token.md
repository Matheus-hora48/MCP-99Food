<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 2035 · Food > Open Delivery Protocol > Authorization API > Get Access Token -->

## Get Access Token

Request a new access token to access API resources. This token is unique for every shop not for application.


### Basic Information

| **Name** | **Description** |
| --- | --- |
| **URL**| `https://openapi.99food.com/v4/opendelivery/oauth/token` |
| **Method**| POST |
| **Authorization** | OAuth2 |
| **Permission** | Available |

### Request

#### Body Parameters

| **Name** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| `client_id` | String | Yes | ClientId = AppID_AppShopId. You can see all these datas on Application Management. |
| `client_secret` | String | Yes | The secret key of app_id. |
| `grant_type` | String | Yes | The OAuth grant type. Currently, the only supported grant type is client_credentials. |

### Response

#### Response Status Codes

| **Code** | **Meaning** | **Description** |
| :--- | :--- | :--- |
| `200` | **Success** | The request was handled successfully. |
| `400` | **Bad Request** | Invalid syntax or missing required parameters. |
| `401` | **Unauthorized** | Missing or invalid authentication credentials. |
| `403` | **Forbidden** | The request violates authorization rules or permissions. |
| `503` | **Service Unavailable** | Service is under maintenance or outside the operating window. |

#### Success Response Parameters

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| `access_token` | String | A code representing the access token of your application. |
| `token_type` | String | The token type. Currently, the only supported type is bearer |
| `expires_in` | Number | The token expiration time in seconds |

#### Error Response Parameters

Includes validation errors or server failures.

| **Name** | **Type** | **Description** |
| :--- | :--- | :--- |
| `title` | String | Short description of the problem. |
| `status` | Integer | HTTP code of the returned status (e.g., 400, 500). |

#### Response Example
    
```json
{
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJpc3MiOiJEaURpRm9vZF9PcGVuQXBpIiwiaWF0IjoxNzY1NTQ5NDIwLCJleHAiOjE3NjU1NjIwMjAsImRhdGEiOnsiYXBwX2lkIjoiNTc2NDYwNzU2OTExNTQ4MTM1Nl8yMjIzMyIsImNvdW50cnkiOiJCUiIsImV4cCI6MTc2NTU2MjAyMH19.",
    "token_type": "bearer",
    "expires_in": 12600
}
```