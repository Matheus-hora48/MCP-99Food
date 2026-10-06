<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 1993 · Food > 99Food Protocol (Recommended) > Order API > Promotion -->

## Promotion

You can currently access promotion information through the **orderNew** callback and the **Get Order Details** endpoint. If you use our API to manage the store menu, we recommend upgrading to v2 or v3 of the **Upload Store Menu Details** endpoint, which provides better support for promotions. The promotions structures are **only available for production apps**. If you are not receiving it, please contact us.

> **IMPORTANT:**
> Do NOT take promo_type as the tag to calculate which promotions shall apply to the store or not as in practise the customer can use any type of promotions that is applicable to them and get the benefits.
> Promotions can only be created with the following methods:
> - B-App/99Food's Store app (Fully subsidized by the store/brand)
> - 99food's team through our internal system
> - Flagship or event registrations


### Setting up a promotion in the testing store

You can create a promotion in your testing store directly in 99food Store to ensure your integration is handling the prices and promotions structure in the right way. In B-App, go to the menu **99food Academy** and look for the topics related to promotions. You will be able to create 4 different types of promotions directly in the **Promotions** menu. After this, follow the steps in **Testing and Debugging > Testing the Integration > Using a Test Store** to place an order to your test store and receive the promotion information in the order's JSON.

### Resources:

Stores and integrators can understand a little more about the promotion information [downloading this guide](../../../attachments/f4b457f5ea/).


### Types of Promotions Supported

| **promo_type** | **Name** | **Description** | **Applicability** |
| --- | --- | --- | --- |
| 0 | - | No promotion, default value. | None |
| 1 | Minimum Order Discount | Encourage spending by offering discounts at different price points. | Order level, both Food and Groceries |
| 2 | Sale Item Promotion | Set a special discount price to certain items. | Item level, both Food and Groceries |
| 3 | Free Delivery Event | When the customer reaches a certain spending threshold, the store waives the delivery fee. | Order level, both Food and Groceries |
| 4 | Buy X Get Y Promotion | Allows you to configure sales promotions such as "Buy 1 Get 2" or "Buy 2 Get 3". Promotions help boost sales and orders without reducing average revenue per customer. | Item level, only Food |
| 10 | Order Coupon | Coupon on the order. | Order level, both Food and Groceries |
| 11 | Dish Coupon | Coupon on the items. | Order level, only Food |
| 12 | Delivery Coupon | Coupon on the delivery fee. | Order level, both Food and Groceries |
| 20 | Delivery Member Discount | Delivery discount because the customer is a 99food Member. | Order level, both Food and Groceries |
| 30 | Share Delivery Discount | Delivery discount because of different orders share the same courier. | Order level, both Food and Groceries |
| 34 | 99food Membership Discount | 99food membership discount for customers who are part of 99food membership program. | Order level, both Food and Groceries |
| 100| New User Discount | Discounts provided to the new users of 99Food. | Either item or order level, both Food and Groceries |
| 101| Recurrent User Discount | Discounts provided to the users that have been buying recurrently in 99food | Either item or order level, both Food and Groceries |

### Important Information For Promotions in Order's Structures

#### Response Body Parameters - Order items

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| `app_item_id` | string | The ID for the item provided by the restaurant. |
| `name` | string | The menu name for the item. |
| `sku_price` | int | The price for each item/subItem. **Note:** Price is always an integer value (never decimals) because the price is set in the lowest denomination (e.g. cents for MX currency, not Peso). |
| `total_price` | int | The total price for the item in the cart as calculated below: `sku_price` * `amount`. **Note:** Price is always an integer value (never decimals) because the price is set in the lowest denomination (e.g. cents for MX currency, not Peso). |
| `amount` | int | Quantity of the item. |
| `submit_refund_amount` | int | This field represents the number of items refunded: Amount − submit_refund_amount = Actual number of items currently in order. |
| `sub_item_list` | array | List of the selected subitems of the store's modifier groups. |
| `real_price` | int | The actual amount paid by the customer for the item. |
| `promo_type` | int | The type of the promotion. Check below for all codes. **Note:** This is a new feature and the support is the same with `promotions` structure documented below. |
| `promotion_detail` | array | A json structure with `promo_type`, `promo_discount` and `shop_subside_price`. Check below for more details. |
| `promo_list` | array | List of all promotion under the item |

#### Response Body Parameters - Promotion Detail (Item level)
> 99food allows the customers to apply different types of promotions to a certain item to maximize their experience in the sense of value for money, meaning that they can apply in parallel coupons and price discounts to the same item in the same order.

Promotion detail provides the **summary** of all promotions that are applicable to a **certain item**.

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| `promo_type` | int | The type of the promotion that is applicable to the item. Please see more details in the table above. When the customer uses more than one type of promotion, 99food will always display the value 2 |
| `promo_discount` | int | The total promotion amount that is applicable to the item and perceived by the customer. If the same item is chosen more than once, to obtain the unit promotion amount perceived by the customer under the certain promo_type, this promo_discount must be divided into the amount of the main item |
| `shop_subside_price` | int | Store subsidy amount: The portion of the discount funded by the store for this item-level promotion. This cost is calculated and applied only at the main item level. |

#### Response Body Parameters - Promotion List (Item level)
> 99food allows the customers to apply different types of promotions to a certain item to maximize their experience in the sense of value for money, meaning that they can apply parallel coupons and price discounts to the same item in the same order.

Promotion detail provides **each** of the promotions that are applicable to a **certain item**.

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| `promo_type` | int | The type of the promotion that is applicable to the item. Please see more details in the table above. When the customer uses more than one type of promotion, 99food will always display the value 2 |
| `promo_discount` | int | The total promotion amount that is applicable to the item and perceived by the customer. If the same item is chosen more than once, to obtain the unit promotion amount perceived by the customer under the certain promo_type, this promo_discount must be divided into the amount of the main item |
| `shop_subside_price` | int | Store subsidy amount: The portion of the discount funded by the store for this item-level promotion. This cost is calculated and applied only at the main item level. |

#### Response Body Parameters - Promotion (Order level)
Promotion provides the **summary** of all promotions that are applicable to a **specific order**. It lists out all kinds of promotions in terms of item level, order level and delivery level.

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| `promo_type` | int | Promotion type applied to the order. Refer to the promotion types table above for specific codes. **Note:** When multiple promotion types are applied to a single item, the system will display value 2 for that item's promotion. |
| `promo_discount` | int | Customer discount amount: The  discount amount from this specific promotion that is passed on to the customer. |
| `shop_subside_price` | int | Store subsidy amount: The portion of the discount funded by the store for this promotion. |

#### 99food Delivery sample order with different types of promotions
```json
{
    "app_id":Test_99foodAPPID,
    "app_shop_id":"Test_99food",
    "type":"orderNew",
    "timestamp":1692910912,
    "data":{
        "order_id":TE5764625609393245013DD,
        "order_info":{
            "order_id":TE5764625609393245013DD,
            "status":100,
            "order_index":28,
            "remark":"",
            "country":"CO",
            "city_id":57010100,
            "timezone":"America\/test_99food",
            "pay_type":2,
            "pay_method":2,
            "pay_channel":153,
            "delivery_type":1,
            "delivery_eta":0,
            "expected_cook_eta":0,
            "expected_arrived_eta":1692912938,
            "create_time":1692910912,
            "pay_time":1692910912,
            "complete_time":0,
            "cancel_time":0,
            "shop_confirm_time":0,
            "price":{
                "order_price":5460000,
                "items_discount":2488000,
                "delivery_discount":400000,
                "shop_paid_money":0,
                "refund_price":0
            },
            "shop":{
                "shop_id":TE5764607526117835635DD,
                "app_shop_id":"Test_99food",
                "shop_addr":"Test_99food",
                "shop_name":"Test_99food (La Test_99food)",
                "shop_phone":[
                    {
                        "calling_code":00,
                        "phone":0000000000,
                        "type":"1"
                    }
                ]
            },
            "receive_address":{
                "uid":0,
                "name":"privacy protection",
                "first_name":"privacy protection",
                "last_name":"",
                "calling_code":"test_99food",
                "phone":"312***7823",
                "city":"test_99food",
                "country_code":"test_99food",
                "poi_address":"privacy protection",
                "house_number":"privacy protection",
                "poi_lat":0,
                "poi_lng":-00,
                "coordinate_type":"wgs84",
                "poi_display_name":"privacy protection"
            },
            "order_items":[
                {
                    "app_item_id":"Test_item_ID",
                    "app_external_id":"",
                    "name":"Test_main_dish,",
                    "total_price":5460000,
                    "sku_price":5460000,
                    "amount":1,
                    "remark":"",
                    "sub_item_list":[
                        {
                            "app_item_id":"Test_item_ID-0-test-50755-test-0",
                            "app_external_id":"",
                            "name":"Test_subitem1",
                            "total_price":0,
                            "sku_price":0,
                            "amount":1,
                            "app_content_id":"Test_item_ID-0",
                            "content_app_external_id":"",
                            "sub_item_list":[

                            ]
                        },
                        {
                            "app_item_id":"Test_item_ID-4-8051-53637-test-0",
                            "app_external_id":"",
                            "name":"Test_subitem2",
                            "total_price":0,
                            "sku_price":0,
                            "amount":1,
                            "app_content_id":"Test_item_ID-4",
                            "content_app_external_id":"",
                            "sub_item_list":[

                            ]
                        },
                        {
                            "app_item_id":"Test_item_ID-2-7816-50853-test-0",
                            "app_external_id":"",
                            "name":"Test_subitem3",
                            "total_price":0,
                            "sku_price":0,
                            "amount":1,
                            "app_content_id":"Test_item_ID-2",
                            "content_app_external_id":"",
                            "sub_item_list":[

                            ]
                        },
                        {
                            "app_item_id":"Test_item_ID-3-7817-50832-test-0",
                            "app_external_id":"",
                            "name":"Test_subitem4",
                            "total_price":0,
                            "sku_price":0,
                            "amount":1,
                            "app_content_id":"Test_item_ID-3",
                            "content_app_external_id":"",
                            "sub_item_list":[

                            ]
                        },
                        {
                            "app_item_id":"Test_item_ID-5-8052-53647-test-0",
                            "app_external_id":"",
                            "name":"Test_subitem2",
                            "total_price":0,
                            "sku_price":0,
                            "amount":1,
                            "app_content_id":"Test_item_ID-5",
                            "content_app_external_id":"",
                            "sub_item_list":[

                            ]
                        },
                        {
                            "app_item_id":"Test_item_ID-1-7815-50757-test-0",
                            "app_external_id":"",
                            "name":"Test_subitem5",
                            "total_price":0,
                            "sku_price":0,
                            "amount":1,
                            "app_content_id":"Test_item_ID-1",
                            "content_app_external_id":"",
                            "sub_item_list":[

                            ]
                        }
                    ],
                    "promo_type":2,
                    "real_price":3822000,
                    "promotion_detail":{
                        "promo_type":2,
                        "promo_discount":1638000,
                        "shop_subside_price":1470000
                    },
                    "promo_list":[
                        {
                            "promo_type":101,
                            "promo_discount":168000,
                            "shop_subside_price":0
                        },
                        {
                            "promo_type":2,
                            "promo_discount":1470000,
                            "shop_subside_price":1470000
                        }
                    ]
                }
            ],
            "promotions":[
                {
                    "promo_type":2,
                    "promo_discount":168000,
                    "shop_subside_price":0
                },
                {
                    "promo_type":2,
                    "promo_discount":1470000,
                    "shop_subside_price":1470000
                },
                {
                    "promo_type":3,
                    "promo_discount":400000,
                    "shop_subside_price":0
                },
                {
                    "promo_type":11,
                    "promo_discount":850000,
                    "shop_subside_price":0
                }
            ]
        }
    }
}
```
