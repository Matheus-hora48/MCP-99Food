<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 1991 · Food > 99Food Protocol (Recommended) > Order API > Cancel Order -->

## Cancel Order

The **Cancel Order** endpoint allows partners to cancel an order that was previously received from 99Food.

### Basic Information

| **Name** | **Description** |
| --- | --- |
| `URL` | [https://openapi.99food.com/v1/order/order/cancel](https://openapi.99food.com/v1/order/order/cancel) |
| `Method` | POST |
| `Permission` | Available |


### Request Body Parameters

| **Name** | **Type** | **Description** | **Required** | **Example** |
| --- | --- | --- | --- | --- |
| `auth_token` | string | The `auth_token` for the shop. | Yes | ZGQ5ZjVlZGUyYmFhNDM2ZmE0ZDA5OTE5ZjI1YzBhNjU= |
| `order_id` | long | The ID of the order in 99Food’s system. | Yes | 2352921557674426622 |
| `reason_id` | int | The ID of the reason for canceling the order. **Allowed values:** Please see below -- reason_id params list for reference. **CRITICAL FOR SUPPORT**: **Do not use "Other reason" (ID: 1080) with a blank description.** A specific reason is required for us to effectively track, analyze, and assist with cancellation-related issues. Your detailed input is essential for problem resolution. | Yes | 1030 |
| `reason` | string | Additional details about the cancellation. **Strongly recommended** when reason_id is 1080 to facilitate issue tracking and resolution. | No  |     |

#### reason_id List

| reason_id | Description | Applicable To |
| :--- | :--- | :--- |
| 1010 | Item sold out | All |
| 1020 | Store closed for the day | All |
| 1030 | Store too busy to prepare order | All |
| 1040 | Major accident or utility outage | All |
| 1050 | Canceled due to customer issue | All |
| 1060 | No courier available | Self-delivery ONLY |
| 1070 | Menu needs to be updated | All |
| 1071 | Order is outside the delivery area | Self-delivery ONLY |
| 1072 | Order address is in an unsafe area | Self-delivery ONLY |
| 1073 | Suspected fraud or prank | All |
| 1074 | Questions about fees or promotions | All |
| 1080 | Other reason | All |



### Response Body Parameters

| **Name** | **Type** | **Description** | **Example** |
| --- | --- | --- | --- |
| `data` | bool | The result of canceling the order | true |

### Response Example

```json
{
    "errno":0,
    "errmsg":"ok",
    "requestId":"22871b9405a415c6",
    "time":1568713144,
    "data":true
}
```