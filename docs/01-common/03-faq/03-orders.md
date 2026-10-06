<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 1899 · Common > FAQ > Orders -->

## Orders

### Receiving Orders

**1. In addition to the POS application, should 99Food's application be opened to receive orders?**
No, when using OpenAPI to receive orders, there is no need to keep 99Food's application online.

**2. Can the Get Order Details endpoint be used to view cancellation and refund details?**
Yes. You can check the `cancel_time` field to see when the order was canceled and the `refund_price` field to check the refund amount.

**3. Is the `order_id` in the order globally unique?**
The `order_id` will not be repeated.

**4. What is the difference between the order status 200, 400 and 500?**
- 200: Order accepted (The store sent confirmation)
- 400: Rider picked up the order for delivery
- 500: Rider arrived at the customer’s location

**5. Is it possible to receive through the API information like "picking up the order at the front door" or "leaving it at the front door" added in C-App?**
Currently, we only support order notes in the remarks field. For this to be used, the store must enable this field in the B-App.


### Confirming Orders

**1. Is the Confirm Order endpoint only called after we accept the order on our POS?**
The **Confirm Order** endpoint is used to send the order confirmation from the POS to us.


### Canceling Orders

**1. When an order is canceled using the Cancel Order endpoint, is there any possibility that the shop closes?**
No, the store will not be penalized for canceling an order, and the store closing after the cancellation is not a standard behavior.

**2. After an order is accepted, is it possible to cancel it?**
Yes, you can use the **Cancel Order** endpoint for that.

**3. After an order is canceled, is it possible to accept it again?**
No, once the order is canceled by the store, it is considered complete, and the customer will need to place a new order to get it accepted.

**4. How are user cancellation requests sent to the API after an order is confirmed ?**
First, the store must configure cancellation settings. We will send the information when the customer requests the order cancellation. Please refer to **Store API > Set Store Cancellation/Refund** and **Oder API > Handle Cancellation Requests** for more information.

**5. What does the base_reason_id mean in Refunds?**
When handling refunds sent by _orderRefundApply_ webhook, you need to select one of reason ids below if the store refuses the refund request.

| **Code** | **Description** |
| --- | --- |
| 1010 | Item sold out |
| 1020 | Store closed |
| 1030 | The shop is too busy to prepare a meal |
| 1040 | Unable to prepare a meal due to water or power outages |
| 1050 | Cancellation requested by customer |
| 1060 | No rider for delivery |
| 1080 | Other reason |


### Prices

**1. What does the multiple prices in the order mean?**
Refer to **Order API > Get Order Details**, under the section **Response Body Parameters - Price**, to understand the meaning of each price.


**2. Do I always have to divide the price values by 100 to get the exact number?**
Yes, prices are always represented as integer values (without decimals) and are in the lowest denomination. Therefore, you can always divide the values by 100 to get the exact amount.


### Webhooks

**1. Every event (Orders, Cancellations, Refunds, etc) goes through the same webhook? There are no special endpoints for a specific event?**
Yes, all order-related events are delivered through the same webhook endpoint


### Common Errors

**1. What does "Error retrieving the order" mean when calling Order APIs?**
This means that the `order_id` is incorrect.

**2. How to solve order_id / shop_id/ app_id incorrect in *orderNew* and GET Order Details with Node.js?**
We use 64-bit integers for app_id, order_id, and shop_id. When parsing these IDs, ensure that they are handled correctly. For example, in Node.js, an order_id like 5764607801871631353 may be parsed as 5764607801871631000 using libraries like body-parser or JSON.parse(). To avoid this issue, use json-bigint for parsing.

**3. What is the meaning of code 12007?**
This indicates that the order confirmation failed.


