<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 2007 · Food > 99Food Protocol (Recommended) > Logistics API > Order Delivered -->

## Self Delivery Order Delivered

The **Self Delivery Order Delivered​** endpoint allows the developer to notify the platform that a self-fulfillment order **has been successfully delivered** to the end customer. 

### Basic Information

| **Name** | **Description** |
| :--- | :--- |
| **URL** | [https://openapi.99food.com/v1/order/selfdelivery/delivered](https://openapi.99food.com//v1/order/selfdelivery/delivered) |
| **Method** | `POST` |
| **Permission** | Available |


### Request Body Parameters

| Name | Type | Required | Description | Example |
| :--- | :--- | :--- | :--- | :--- |
| `auth_token` | string | Yes | The auth_token for the shop. | ZGQ5ZjVlZGUyYmFhNDM2ZmE0ZDA5OTE5ZjI1YzBhNjU= |
| `order_id` | integer | Yes | The ID of the order in 99Food’s system. | 2352921557674426622 |


### Response Body Example

```json
{
    "errno":0,
    "errmsg":"ok",
    "requestId":"20fbd1a6207a3535",
    "time":1609845642,
    "data":null
}
```