<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 2155 · Grocery > Order API > Order Webhooks (Recommended) -->

## Order Webhooks (Recommended)

> **ATTENTION: 64-bit Integer Precision**
> 
> We use **64-bit integers** (Long) for App, Order, and Store IDs. Standard JSON parsers may cause **precision loss** when handling these large numbers. 
>
> For example, in Node.js, an `order_id` like `5764607801871631353` will be incorrectly parsed as `5764607801871631000` using default methods like `JSON.parse()` or libraries like `body-parser`. 
>
> To ensure data integrity, please use `json-bigint` or a similar library for parsing:
> ```javascript
> var jsonBig = require('json-bigint');
> jsonBig.parse(data);
> ```

### Event1: orderNew

This callback will be triggered when a customer has created and paid successfully for an order. You must **confirm the order within 5 minutes** by calling the `/order/order/confirm` endpoint. Failure to do so will result in an **automatic cancellation**.

> **IMPORTANT:** 
> Fields such as `expected_cook_eta` and `expected_arrived_eta` are only populated after confirmation. To retrieve these, please call the `/order/order/detail` endpoint post-confirmation.

> **NOTE:** 
> Access to `promotions` data in Production requires your App to be whitelisted. If this information is missing, please contact our support team. See `Promotions` for details.

The `orderNew` webhook shares the same schema as the `/order/order/detail` endpoint. Refer to the **Get Order Details** documentation for a comprehensive breakdown of `price` models and `receive_address` fields.

#### Request Body Example

```json
{
  "app_id": 5764607584567296012,
  "app_shop_id": "7093",
  "timestamp": 1615432308,
  "type": "orderNew",
  "data": {
    "order_id": 1152921547153933576,
    "order_info": {
      "order_id": 1152921547153933576,
      "status": 100,
      "order_index": 2,
      "remark": "",
      "city_id": 55000116,
      "country": "BR",
      "timezone": "America/Sao_Paulo",
      "pay_type": 1,
      "pay_method": 1,
      "pay_channel": 150,
      "change_for": 5000,
      "delivery_type": 2,
      "expected_cook_eta": 1615432434,
      "expected_arrived_eta": 1615434234,
      "create_time": 1602832474,
      "pay_time": 1602832477,
      "complete_time": 1602832780,
      "cancel_time": 1602832780,
      "shop_confirm_time": 1615432255,
      "pickup_code": "3316",
      "need_cutlery": true,
      "fulfillment_mode": 0,
      "handover_code": "5000"
      "price": {
        "order_price": 2000,
        "real_price": 2500,
        "real_pay_price": 2500,
        "delivery_price": 500,
        "refund_price": 2500,
        "items_discount": 0,
        "delivery_discount": 0,
        "others_fees": {
          "small_order_price": 0,
          "total_tip_money": 0,
          "service_price": 0,
          "coupon_discount": 0
        },
        "customer_need_paying_money": 2500
      },
      "shop": {
        "shop_id": 5764607688097661019,
        "app_shop_id": "7093",
        "shop_addr": "R. Congonhas, 405 - Santo Ant\\u00f4nio, Belo Horizonte - MG, 30330-100, Brasil",
        "shop_name": "allinone_BR_haojing_zipeisong",
        "shop_phone": [
          {
            "calling_code": 52,
            "phone": 12345678902,
            "type": "0"
          }
        ]
      },
      "receive_address": {
        "uid": 299070223744111,
        "name": "",
        "first_name": "",
        "last_name": "",
        "calling_code": "+81",
        "phone": "00016004812",
        "city": "Belo Horizonte",
        "country_code": "BR",
        "poi_address": "R. Congonhas, 405 - Santo Ant\\u00f4nio, Belo Horizonte - MG, 30330-100, Brasil",
        "house_number": "",
        "country": "",
        "state": "",
        "city": "",
        "district": "",
        "street_name": "",
        "street_number": "",
        "formatted Address": "",
        "postalCode": "",
        "complement": "",
        "reference": "",
        "poi_lat": -19.9440597,
        "poi_lng": -43.9392454,
        "coordinate_type": "wgs84",
        "poi_display_name": "R. Congonhas, 405"
        "virtual_phone_number": "06234421637",
        "handover_page_url": "https://food-b-h5.99app.com/pt-BR/v2/confirmation-entrega",
        "locator": "56244631"
      },
      "order_items": [
        {
          "item_id": 0,
          "mdu_id": "692810A7091206BDF61EE331C8755DDB",
          "app_item_id": "110003_2_1",
          "app_external_id": "",
          "name": "King Jr. Hamburguesa de Pollo",
          "total_price": 7500,
          "sku_price": 7500,
          "amount": 1,
          "remark": "",
          "sub_item_list": [
            {
              "app_item_id": "110001_1_main",
              "app_external_id": "",
              "name": "Amiguito Pollo",
              "total_price": 0,
              "sku_price": 0,
              "amount": 1,
              "app_content_id": "110003_0",
              "content_app_external_id": "",
              "sub_item_list": [
                 
              ]
            },
            {
              "app_item_id": "110134_2_side",
              "app_external_id": "",
              "name": "Papas Chicas",
              "total_price": 0,
              "sku_price": 0,
              "amount": 1,
              "app_content_id": "110003_1",
              "content_app_external_id": "",
              "sub_item_list": [
                 
              ]
            },
            {
              "app_item_id": "110028_2_side",
              "app_external_id": "",
              "name": "Pepsi Black",
              "total_price": 0,
              "sku_price": 0,
              "amount": 1,
              "app_content_id": "110003_2",
              "content_app_external_id": "",
              "sub_item_list": [
                 
              ]
            }
          ],
          "real_price": 6000,
          "promo_type": 2,
          "promotion_detail": {
            "promo_type": 2,
            "promo_discount": 1500,
            "shop_subside_price": 1500
          },
          "promo_list": [
            {
              "promo_type": 2,
              "promo_discount": 1500,
              "shop_subside_price": 1500
            }
          ]
          "weight": 500,
          "sales_type": "weight",
          "weight_unit": "gram"
        },
        {
          "item_id": 0,
          "mdu_id": "E3679E5DEFF241F9FC1BBA93E2D50276",
          "app_item_id": "110004_2_1",
          "app_external_id": "",
          "name": "King Jr. Hamburguesa de Queso",
          "total_price": 15000,
          "sku_price": 7500,
          "amount": 2,
          "remark": "",
          "sub_item_list": [
            {
              "app_item_id": "110007_1_main",
              "app_external_id": "",
              "name": "Hamburguesa con queso",
              "total_price": 0,
              "sku_price": 0,
              "amount": 1,
              "app_content_id": "110004_0",
              "content_app_external_id": "",
              "sub_item_list": [
                 
              ]
            },
            {
              "app_item_id": "110134_2_side",
              "app_external_id": "",
              "name": "Papas Chicas",
              "total_price": 0,
              "sku_price": 0,
              "amount": 1,
              "app_content_id": "110004_1",
              "content_app_external_id": "",
              "sub_item_list": [
                 
              ]
            },
            {
              "app_item_id": "16001_2_side",
              "app_external_id": "",
              "name": "AMI TOY VIGENTE",
              "total_price": 0,
              "sku_price": 0,
              "amount": 1,
              "app_content_id": "110004_3",
              "content_app_external_id": "",
              "sub_item_list": [
                 
              ]
            },
            {
              "app_item_id": "110028_2_side",
              "app_external_id": "",
              "name": "Pepsi Black",
              "total_price": 0,
              "sku_price": 0,
              "amount": 1,
              "app_content_id": "110004_2",
              "content_app_external_id": "",
              "sub_item_list": [],
              "change": null,
              "promo_type": 0,
              "real_price": null,
              "promotion_detail": null,
              "promo_list": [],
              "weight": 500,
              "sales_type": "weight",
              "weight_unit": "gram"
        },
        {
          "item_id": 0,
          "mdu_id": "899AD17D12D528E55693D46448216EEA",
          "app_item_id": "110004_2_1",
          "app_external_id": "",
          "name": "King Jr. Hamburguesa de Queso",
          "total_price": 7500,
          "sku_price": 7500,
          "amount": 1,
          "remark": "",
          "sub_item_list": [
            {
              "app_item_id": "110007_1_main",
              "app_external_id": "",
              "name": "Hamburguesa con queso",
              "total_price": 0,
              "sku_price": 0,
              "amount": 1,
              "app_content_id": "110004_0",
              "content_app_external_id": "",
              "sub_item_list": [
                 
              ]
            },
            {
              "app_item_id": "110134_2_side",
              "app_external_id": "",
              "name": "Papas Chicas",
              "total_price": 0,
              "sku_price": 0,
              "amount": 1,
              "app_content_id": "110004_1",
              "content_app_external_id": "",
              "sub_item_list": [
                 
              ]
            },
            {
              "app_item_id": "16001_2_side",
              "app_external_id": "",
              "name": "AMI TOY VIGENTE",
              "total_price": 0,
              "sku_price": 0,
              "amount": 1,
              "app_content_id": "110004_3",
              "content_app_external_id": "",
              "sub_item_list": [
                 
              ]
            },
            {
              "app_item_id": "110028_2_side",
              "app_external_id": "",
              "name": "Pepsi Black",
              "total_price": 0,
              "sku_price": 0,
              "amount": 1,
              "app_content_id": "110004_2",
              "content_app_external_id": "",
              "sub_item_list": [
                 
              ]
            }
          ],
          "real_price": 0,
          "promo_type": 4,
          "promotion_detail": {
            "promo_type": 4,
            "promo_discount": 7500,
            "shop_subside_price": 3750
          },
          "promo_list": [
            {
              "promo_type": 4,
              "promo_discount": 7500,
              "shop_subside_price": 3750
            }
          ]
          "weight": 500,
          "sales_type": "weight",
          "weight_unit": "gram"
        }
      ],
      "promotions": [
        {
          "promo_type": 4,
          "promo_discount": 7500,
          "shop_subside_price": 3750
        },
        {
          "promo_type": 2,
          "promo_discount": 1500,
          "shop_subside_price": 1500
        },
        {
          "promo_type": 11,
          "promo_discount": 1000,
          "shop_subside_price": 900
        }
      ]
    }
  }
}
```

### Event2: orderConfirmed

This callback will be triggered when the order has been successfully confirmed.

#### Request Body Example

```json
{
    "app_id": 5764607772295955723,
    "app_shop_id": "5764608607212274059",
    "type": "orderConfirm",
    "timestamp": 1768815242,
    "data": {
        "order_id": 5764656197621845665
    }
}
```


### Event3: orderReady

This callback will be triggered when the order preparation is complete and the order is ready for pickup or dispatch.

#### Request Body Example

```json
{
    "app_id": 5764607772295955723,
    "app_shop_id": "5764608607212274059",
    "type": "orderReady",
    "timestamp": 1768815260,
    "data": {
        "order_id": 5764656197621845665
    }
}
```

### Event4:orderCancel

This callback will be triggered when an order is canceled by either 99 Food or the consumer.
    
#### Request Body Example

```json
{
    "app_id":123,
    "app_shop_id":"xxx",
    "type":"orderCancel",
    "timestamp":1592970557,
    "data":{
        "order_id":5764607801871630353
    }
}
```

### Event5:orderPartialCancel

This callback will be triggered when a portion of the order is canceled.
    
#### Request Body Example

```json
{
    "app_id":123,
    "app_shop_id":"xxx",
    "type":"orderPartialCancel",
    "timestamp":1592970557,
    "data":{
        "order_id":5764607801871630353
    }
}
```
### Event6:orderFinish

This callback will be triggered when an order is completed.

#### Request Body Example

```json    
{
    "app_id":123,
    "app_shop_id":"xxx",
    "type":"orderFinish",
    "timestamp":1592970557,
    "data":{
        "order_id":5764607801871630353
    }
}
```


### Event7:orderCancelApply

This callback will be triggered when a customer requests to cancel an order. The store will have **5 minutes** to respond, during which this callback will be sent multiple times at **2-minute intervals** as a reminder.
This function will only be triggered when the store has agreed to receive order cancellation requests from customers via the **/shop/apply/set** endpoint (read more in **Set Store Cancellation/Refund**). If the store does not respond within the allotted time, the system will automatically **refuse** the cancellation request by default.
To either agree or decline the request, you need to send the decision to the **/order/apply/cancel** endpoint (read more in **Order Cancel Apply**).


#### Request Body Example

```json
{
    "app_id":1152921654762997000,
    "app_shop_id":"0001",
    "type":"orderCancelApply",
    "timestamp":1592970557,
    "data":{
        "order_id":1152921654762996500,
        "apply_reason":"do not want",
        "apply_id":1152921654813328100,
        "reason_list":[
            {
                "reason":"preparing"
            },
            {
                "reason":"prepared"
            },
            {
                "reason":"courier arrived"
            },
            {
                "reason":"courier taken"
            }
        ]
    }
}
```

### Event8:orderRefundApply

This callback will be triggered for 25 times with 1 hour interval each when a customer applies for refund. This function will only be trigger when the store agrees to receive refunds with /shop/apply/set endpoint (read more in **Set Store Cancelation/Refund**). When set to support, by default, we will **agree** to refund if the store doesn't handle it in time. To agree or not to the request, you need to send the information to the **/order/apply/refund** endpoint (read more in **Order Refund Apply**).


#### Request Body Example

```json
{
    "app_id":1152921654762997000,
    "app_shop_id":"0001",
    "type":"orderRefundApply",
    "timestamp":1592970557,
    "data":{
        "order_id":1152921654762996500,
        "apply_reason":"missing items, I want to refund",
        "images":[
            "https://user/missing/items/image.jpg"
        ],
        "apply_id":1152921654813328100,
        "base_reason_list":[
            {
                "base_reason_id":"430001",
                "base_reason":"Communication with user redo a Delivery"
            },
            {
                "base_reason_id":"430002",
                "base_reason":"Communication with user replace with others"
            },
            {
                "base_reason_id":"430003",
                "base_reason":"The merchandise already give courier"
            },
            {
                "base_reason_id":"430004",
                "base_reason":"Courier sent miss"
            },
            {
                "base_reason_id":"430005",
                "base_reason":"User misunderstands"
            },
            {
                "base_reason_id":"430006",
                "base_reason":"I just want refund a part"
            },
            {
                "base_reason_id":"430007",
                "base_reason":"Missing user information"
            },
            {
                "base_reason_id":"430008",
                "base_reason":"Other"
            }
        ]
    }
}
```
