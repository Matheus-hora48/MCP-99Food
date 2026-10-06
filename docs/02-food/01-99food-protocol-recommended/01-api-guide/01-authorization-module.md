<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 1913 · Food > 99Food Protocol (Recommended) > API Guide > Authorization Module -->

## Authorization Module

The **Authorization Module** has 2 main functions:

### Get and Refresh the Authtoken

With it, our partners have a way to get and refresh the stores’ token. The `auth_token` is used to authenticate against 99Food’s APIs and once you have this token, it’ll be used in the parameters of all other endpoints.

We recommend implementing an automatic routine to refresh the `auth_token` as seen below to prevent problems with other endpoints, especially when confirming an order.

![auth_token refresh process](../../../images/0dffc9d72c28.png)

To generate an `auth_token`, retrieve your `app_id` and `app_secret` for your app from your [Application Management](https://developer-food.99app.com/en-US/app/application/statistical). 

### Create a Webpage for Bind/Unbind Stores

With it, you'll create a webpage to ask stores the authorization to add their store to your app. This is useful specially to POS partners to bind/unbind the stores without having to contact 99Food's team and send the store agreement contract.

### APIs and Callbacks

| **Name** | **Type** | **Function** |
| --- | --- | --- |
| `/auth/authtoken/get/` | Endpoint | Get store's `auth_token`|
| `/auth/authtoken/refresh/` | Endpoint | Refresh store's `auth_token`|
| `/auth/authorizationpage/getUrl/` | Endpoint | Generate an URL for self-service store binding |