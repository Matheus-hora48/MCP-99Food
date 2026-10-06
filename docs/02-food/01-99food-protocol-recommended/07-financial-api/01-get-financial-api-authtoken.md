<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 2025 · Food > 99Food Protocol (Recommended) > Financial API > Get Financial API Authtoken -->

## Get Financial API AccessToken

The token obtained from this endpoint provides access to Financial APIs only.

### Basic Information

| **Name** | **Description** |
| --- | --- |
| `URL` | [https://openapi.99food.com/v3/auth/authtoken/signIn](https://openapi.99food.com/v3/auth/authtoken/signIn) |
| `Method` | POST |
| `Permission` | Available |


### Request Body Parameters

| **Name** | **Type** | **Required** | **Description** | **Example** |
| --- | --- | --- | --- | --- |
| `retailer` | string | Yes | The application ID (app_id). | 5764607775913806783 |
| `secret` | string | Yes | The application secret key (app_secret). | b0919c644bddc031c59288884954cf5c |


### Response Body Parameters

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| `accessToken` | string | The accessToken for the app.|
| `expiresIn` | int | The time before the token expires.|


### Response Example
```json
{
    "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOiI1NzY0NjA3NTMwNTQ4ODU1MDM0IiwiZXhwIjoxNjk3MDI1NjMxfQ.1Urt7Fmka1KX0M-sgOyNFMMij8A_9ZssQfPzhzgix18",
    "expiresIn": 21600
}
```