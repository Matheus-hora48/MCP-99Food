<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 2021 · Food > 99Food Protocol (Recommended) > Logistics API > Logistics Webhooks -->

## Logistics Webhooks

> **ATTENTION**: We use long (64-bit integer) as IDs for app, orders and stores. So please pay attention when parsing those numbers. For example, in Node.js our orderId (5764607801871631353) will be parsed as 5764607801871631000 with lib "body-parser" or "JSON.parse()". Please use json-bigint to parse it: var jsonBig = require('json-bigint'); jsonBig.parse(data).

### Event1: deliveryStatus

This callback will be triggered when the delivery status of an order has changed. The different status can be:

| **delivery_status** | **Description** |
|-----------------|-------------|
| 120 | ASSIGNED: Assigned a courier. |
| 130 | ARRIVED_AT_B: Courier has reached the store. |
| 140 | TAKEN: The courier has picked up food. |
| 150 | ARRIVED_AT_C: The courier has reached the destination. |
| 160 | FINISH: Delivered. Order completed. |
| 170 | CANCEL: The delivery has been canceled. |
| 180 | REASSIGNED: A riders has been reassigned. |
| 190 | ABORTED: The delivery has been aborted. |

**Request Body Example**

```json
{
    "app_id": 5764607618872501234,
    "app_shop_id": "001",
    "timestamp": 1612455327,
    "type": "deliveryStatus",
    "data": {
        "order_id": 5764608647577512345,
        "delivery_status": 160,
        "rider_name": "xxx",
        "rider_phone": "15512345678",
        "rider_to_B_ETA": "1760034238"
    }
}
```