<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 1983 · Food > 99Food Protocol (Recommended) > Order API > Get Order Details -->

 ## Get Order Details

This **Get Order Details** endpoint allows a developer to retrieve the details of a single order.

> **ATTENTION:**
> 1. We use long (64-bit integer) as IDs for apps, orders and stores. So please pay attention when parsing those numbers. For example, in Node.js our orderId (5764607801871631353) will be parsed as 5764607801871631000 with lib "body-parser" or "JSON.parse()". Please use json-bigint to parse it: `var jsonBig = require('json-bigint'); jsonBig.parse(data)`.
2. We'll send new order notification to the webhook provided by the Integrator to receive any new event from 99Food. Please differentiate them with  `type`. For more details please check the documentation in  **Order Webhooks**.

### Basic Information

| **Name** | **Description** |
| --- | --- |
| `URL` | [https://openapi.99food.com/v1/order/order/detail](https://openapi.99food.com/v1/order/order/detail) |
| `Method` | GET |
| `Permission` | Available |

### Request Path Parameters

|Name| Type|Description|Required|Example|
| --- | --- | --- | --- | --- |
|`auth_token`|string|The auth_token for the shop.|Yes|ZGQ5ZjVlZGUyYmFhNDM2ZmE0ZDA5OTE5ZjI1YzBhNjU=|
|`order_id`|long|The ID of the order in 99Food’s system.|Yes|5764607653830199020|


### Response Body Parameters

|Name|Type|Description|Required|
| --- | --- | --- | --- |
|`order_id`|long| 19-digit unique identification order number in 99Food system that is used for tracking and after sales services|Yes|
|`status`|int|The current state of the order. Check the table below for details.|Yes|
|`shop_accept_status`|int|The status of the order |No|
|`before_status`|int|The status of the order before the one displayed in status. Check the table below for details|No|
|`order_index`|int|A handshake number (which is much simpler than the 19 digit `order_id`) of the order that is used to match the number in the courier APP. This number will be repeated in **every store**, **every day** starting from 1 until the last sequence number of the order of the day in 99Food|Yes|
|`remark`|string|Instructions from a customer in regards to the preparation of the order. This function can be enabled or disabled in the 99Food Store application|Yes|
|`city_id`|int|The ID of the city in 99Food’s system|Yes|
|`country`|string|The identification of the country of the order|Yes|
|`timezone`|string|The identification of the time zone of the order|Yes|
|`pay_type`|int| **(This is a legacy field. For a more complete and detailed breakdown of the payment method, it is recommended to use `pay_channel` instead.)** The payment method chosen by the customer to 99Food. It is important to highlight that when they pay cash it doesn't mean that the store needs to receive cash. It is essential to combine the results of `pay_type` 2 with values > 0 under `shop_paid_money` for 99Food delivery and `pay_type` 2 with values > 0 under `customer_need_paying_money` for Store delivery, to determine whether a Store should receive any cash from the courier or the customer depending on the delivery type. Map directly the values received in the values of `shop_paid_money` or `customer_need_paying_money` to avoid any discrepancy in the store payment reconciliation with 99Food. Values for `pay_type`: 1-Online payment; 2-Cash; 3-POS (Payment method that requires the courier to take a POS machine to receive the payment from customer); 4: Wallet (when 99Food’s wallet/99Pay is selected); 5: PayPay without secret; 6: PayPay with secret|Yes|
|`pay_method`|int|The payment method selected by the user (online or offline). Values for pay_method: 1-Online payment, 2-Offline payment|Yes|
|`pay_channel`|int|Specific payment channel selected by the customer (e.g. credit card, wallet, food voucher). Values for pay_channel: 110-Coupon, 150-Credit Card/Debit Card, 153-Cash, 154-POS (Payment method that requires the courier to take a POS machine to receive the payment from customer), 182-PayPay without secret, 184-PayPay with secret, 190-99Pay, 120-99Food Wallet, 2008-Marketing, 901-Benefit, 310-Yape (digital wallet in Peru), 311-Plin (digital wallet in Peru), 167-Preauth (bank card pre-authorization),  219-99Food Cuenta (SOFIPO), 212/280-PIX (Brazil's instant payment system), 229-NuPay (Nubank payment in Brazil), 234-Apple Pay (pre-authorization), 235-Apple Pay (regular), 257-Vale Refeição Pluxee (formerly Sodexo), 258-Vale Refeição Ticket, 259-Vale Refeição VR, 260-Vale Refeição Alelo, 261-NEQUI, 262-POS Credit Card, 263-POS Debit Card, 264-POS Vale Refeição, 272-Google Pay, 273-Google Pay (Pre-auth), 283-BNPL (Buy Now, Pay Later)|Yes|
|`change_for`|int|Both platform delivery and merchant self-delivery require cash payment scenarios. When a user places a cash order, they need to prepare cash in advance. Sometimes the user does not have suitable change. The C-side page will allow the user to enter the cash denomination to facilitate the rider to prepare the change.|Yes|
|`delivery_type`|int|How the order will be delivered. This depends on the agreement of the store with 99Food. Values for `delivery_type`: 0-Customer Self Pickup; 1-Delivery done by 99Food; 2-Delivery done by the store|Yes|
|`expected_cook_eta`|int|It is recommended to inform the shop prepared before this time. After this time, the rider can report the meal timeout. Unit: second|Yes|
|`expected_arrived_eta`|int|The estimated time when the order will be delivered to the customer. Unit: seconds|Yes|
|`create_time`|int|When the order was placed. Unit: unix_timestamp|Yes|
|`pay_time`|int|When the order was paid. Unit: unix_timestamp|Yes|
|`complete_time`|int|When the order was completed. Unit: unix_timestamp|Yes|
|`cancel_time`|int|When the order was canceled. Unit: unix_timestamp|Yes|
|`shop_confirm_time`|int|When the order was confirmed by the shop. Unit: unix_timestamp|Yes|
|`price`|array|A structure with all the order’s prices. Check below for all the information sent. Note: Price is always an integer value (never decimals) because the price is set in the lowest denomination (e.g. cents for MXN currency, not Peso)|Yes|
|`shop`|struct|A structure with the shop information. Check below for all the information sent.|Yes|
|`receive_address`|struct|A structure with the customer information. Check below for all the information sent. **Note:** Under self-pickup mode (`fulfillment_mode` = 1), only a limited subset of fields is returned to protect customer privacy; see **Receive Address - Self-Pickup Mode** below for details.|Yes|
|`order_items`|struct|A structure with the item information. Check below for all the information sent|Yes|
|`promotions`|array|A structure with all promotion information of the whole order. Check below for all the information sent|Yes|
|`need_cutlery`|bool|Indicates whether the customer requires cutlery to be included with their order.|No|
|`c_cancel_preference`|int|Defines the customer's chosen action on how a merchant should handle out-of-stock items during order fulfillment: 0-No preference selected; 5-Contact customer; 6-Cancel entire order; 7-Refund out-of-stock items only.|No|
|`pickup_code`|string|**A legacy field.** A 4-digit handshake code for platform delivery orders, generated after a merchant accepts an order. **It will not be displayed to the rider.** |No|
|`handover_code`|string|A 4-digit verification code generated upon order creation, used by the store and the courier for meal handover confirmation under platform delivery mode.|No|
|`fulfillment_mode`|int|Fulfillment mode of the order. Enum: 0-Delivery, 1-Self Pickup.|Yes|
|`logistics_cost`|int|The delivery cost charged by the platform to the merchant under the 99Food platform delivery mode (`delivery_type` = 1). This represents the platform's delivery fee (B2P) that the merchant needs to pay for the order's delivery. |No|
|`takeaway_code`|string|A 4-digit code used by the store and the customer for meal handover confirmation under the self-pickup mode (`fulfillment_mode`=1), generated upon order creation. |No|

### Order Status

| Status Code | Description |
| --- | --- |
| 100 | Order created |
| 200 | Order accepted by the store |
| 400 | Order picked up by courier (In transit) |
| 500 | Courier arrived at customer's location |
| 600 | Order completed |
| 901 | Cancelation - Cancelled by the customer manually |
| 902 | Cancelation - System auto-cancelled due to customer payment timeout |
| 903 | Cancelation - System auto-cancelled due to customer pickup timeout |
| 921 | Cancelation - Cancelled by the store manually |
| 922 | Cancelation - System auto-cancelled due to store acceptance timeout |
| 923 | Cancelation - Cancelled by the store due to non-operational status (Shop offline) |
| 941 | Cancelation - Cancelled by courier manually |
| 942 | Cancelation - System auto-cancelled due to dispatch timeout (No courier assigned) |
| 943 | Cancelation - System auto-cancelled due to courier pickup timeout fallback |
| 944 | Cancelation - System auto-cancelled upon courier reporting store unable to serve meal |
| 945 | Cancelation - System auto-cancelled upon courier reporting customer unable to receive order |
| 946 | Cancelation - System auto-cancelled upon courier reporting store meal preparation delay |
| 961 | Cancelation - Cancelled by 99Food customer service |
| 971 | Cancelation - Cancelled by risk management system |
| 981 | Cancelation-- Cancelled by system |

### Response Body Parameters - Price

> **Note:**  Price is always an integer value up to 2 decimals. The price is set in the lowest denomination of the currency of the applicable country. Mexico and Peru allow decimals, therefore you can receive prices of 123.45 as 12345. Colombia and Costa Rica, decimals are not allowed, you'll never receive prices like 123.45, but you will receive prices like 123.00 as 12300.

99Food price structure has 3 different models depending on:

 1. The Integrator collaboration start date with 99Food.
 2. The delivery method selected by the Store to collaborate with 99Food.

#### Price Model 1 -- Applicable to 99Food delivery for integrators who started collaboration with 99Food after 2021-03-09 (Active)

|Name|Type|Description|Required|
| --- | --- | --- | --- |
|`order_price`|int|The sum of all the item prices of the order. This price is without any promotion applied and does **NOT** contain any amount related to the delivery fee.|Yes|
|`items_discount`|int|The total promotion (excluding delivery) of the order perceived by the customer|Yes|
|`delivery_discount`|int|The total promotion of delivery perceived by the customer|Yes|
|`shop_paid_money`|int|The value the couriers will pay in the store when taking the order when the customer selects cash payment (`pay_type` 2). If the store allows cash payment, you will also need to have the function of **Confirm Cash Payment** allowing the store staff confirm that the cash has been duly received. The value of this field will only be provided after 99Food assigns the courier. 99Food recommends that by receiving `pay_type` 2, you need to also call the `Get Order Details` endpoint to ensure that there is no update in this field|No|
|`refund_price`|int|The total refund amount of the order|Yes|
|`in_sale_refund_to_c_fee`|int|The amount that the order was underbilled to the Store for the cancellation of some items after the in-sale refund occurred.|No|
|`meal_top_up_price`|int|The additional fee charged to the customer when the order total is below the store's minimum delivery threshold. This fee covers the difference to meet the minimum requirement and is fully settled to the store.|Yes|
|`store_charged_delivery_price`|int|The original delivery fee defined by the platform, before any promotions are applied.|No|
|`service_price`|int|An additional service amount charged to the customer |Yes|

#### Price Model 2 --  Applicable to store delivery for integrators who started collaboration with 99Food after 2021-03-09 (Active)

|Name|Type|Description|Required|
| --- | --- | --- | --- |
|`order_price`|int|The sum of all the item prices of the order. This price is without any promotion applied and does **NOT** contain any amount related to the delivery fee|Yes|
|`delivery_price`|int|The actual delivery cost charged after deducting all types of delivery promotions applied to the customer|Yes|
|`delivery_discount`|int|The total promotion of delivery perceived by the customer|Yes|
|`items_discount`|int|The total promotion (excluding delivery) of the order perceived by the customer|Yes|
|`store_charged_delivery_price`|int|The original delivery fee defined by the store, before any promotions are applied.|No|
|`real_price`|int|Total of the order to be received by the store (including delivery) without the promotions subsidized by 99Food|Yes|
|`real_pay_price`|int|Total of the order (including delivery) paid by the customer|Yes|
|`refund_price`|int|The total refund amount of the order|Yes|
|`others_fees`|struct|A structure with other fees as described below|Yes|
|`customer_need_paying_money`|int|The amount customer needs to pay|Yes|
|`in_sale_refund_to_c_fee`|int|This field represents the amount that the order was underbilled to the Store for the cancellation of some items after the in-sale refund occurred|No|

**Other Fees Structure under price model 2**

|Name|Type|Description|Required|
| --- | --- | --- | --- |
|`small_order_price`|int|The amount charged by the Store to the customer for placing an order with amount less than the acceptable one to be delivered|Yes|
|`total_tip_money`|int|The amount of tips that the customer is paying to the couriers of the Store|Yes|
|`service_price`|int|An additional service amount charged to the customer |Yes|
|`coupon_discount`|int|The total amount of coupons used by the customer to place the order|Yes|
|`meal_top_up_price`|int|The additional fee charged to the customer when the order total is below the store's minimum delivery threshold. This fee covers the difference to meet the minimum requirement and is fully settled to the store.|Yes|


#### Price Model 3 -- Applicable to integrators who started collaboration with 99Food before March 9, 2021 (Legacy Version) 

|Name|Type|Description|Required|
| --- | --- | --- | --- |
|`order_price`|int|The sum of all the item prices of the order. This price is without any promotion applied|Yes|
|`delivery_price`|int|The actual delivery cost charged after deducting all types of delivery promotions applied to the customer|Yes|
|`store_charged_delivery_price`|int|The original delivery fee defined by the store, before any promotions are applied.|No|
|`real_price`|int|Total of the order to be received by the store (including delivery) without the promotions subsidized by 99Food|Yes|
|`real_pay_price`|int|Total of the order (including delivery) paid by the customer|Yes|
|`shop_paid_money`|int|The value the couriers will pay in the store when taking the order when the customer selects cash payment (`pay_type` 2). If the store allows cash payment, you will also need to have the function of **Confirm Cash Payment** allowing the store staff confirm that the cash has been duly received. The value of this field will only be provided after 99Food assigns the courier. 99Food recommends that by receiving `pay_type` 2, you need to also call the `Get Order Details` endpoint to ensure that there is no update in this field|No|
|`refund_price`|int|The total refund amount of the order.|Yes|
|`currency`|string| Provides the type of currency applicable to the order like "COP", "MXN".|No|
|`in_sale_refund_to_c_fee`|int|The amount that the order was underbilled to the Store for the cancellation of some items after the in-sale refund occurred.|No|


### Response Body Parameters - Shop

|Name|Type|Description|Required|
| --- | --- | --- | --- |
|`shop_id`|long|The unique identification number of a store in 99Food's system|Yes|
|`app_shop_id`|string|The unique identification string of a store in the Store/Integrator's system. 99Food supports letters, numbers and special characters, but spaces are not permitted within the string|Yes|
|`shop_addr`|string|The address of the Store|Yes|
|`shop_name`|string|The name of the Store displayed to the customer|Yes|
|`shop_phone`|array|A json structure of the phone number of the store. Ex: [{"calling_code": 52,"phone": 15011498822,"type": "0"}]|Yes|

### Response Body Parameters - Receive Address

#### Receive Address - Without being Processed according to the Data Privacy Policy

|Name|Type|Description|Required|
| --- | --- | --- | --- |
|`uid`|int|The unique identification of a customer in 99Food system.|Yes|
|`name`|string|The name that the customer input in 99Food application. This is not mandatory to the customer, therefore it can come without any value"".|Yes|
|`first_name`|string|The first name that the customer entered in 99Food application.|Yes|
|`last_name`|string|The last name that the customer entered in 99Food application. It may come without any value "" as it is not mandatory for the customer.|Yes|
|`cpf`| int |Customer's CPF.|No|
|`calling_code`|string|The country code of the customer's phone number.|Yes|
|`phone`|string|Customer's phone number.|Yes|
|`country_code`|string|Shorthand code for the delivery address country.|Yes|
|`poi_address`|string|Delivery address mapped by POI. An object representing the physical location.|Yes|
|`house_number`|string|Delivery address house number.|Yes|
|`country`|string|Country name.|Yes|
|`state`|string|State or country subdivision.|Yes|
|`city`|string|City name.|Yes|
|`district`|string|District name.|Yes|
|`street_name`|string|Street name.|Yes|
|`street_number`|string|Street number.|Yes|
|`formatted_address`|string|Formatted address.|Yes|
|`postal_code`|string|Postal code.|Yes|
|`complement`|string|Address complement.|No|
|`reference`|string|Address reference.|No|
|`poi_lat`|number|Latitude for the delivery address in Google Maps.|Yes|
|`poi_lng`|number|Longitude for the delivery address in Google Maps.|Yes|
|`coordinate_type`|string|Type of the coordinates being used.|Yes|
|`poi_display_name`|string|The address displayed in 99Food application to the customer.|Yes|
|`handover_page_url`|string|The H5 page URL for store-delivery couriers to complete order handover verification with customers. For store-delivery orders, couriers can access this link to enter the handover code and confirm successful delivery.|No|
|`virtual_phone_number`|string|A virtual phone number used to contact the customer. It must be used together with the locator field to successfully connect the call.|Yes|
|`locator`|string|A unique identifier that serves two purposes: 1. It acts as the extension number when using the virtual_phone_number to call the customer; 2. It is used by store-delivery couriers on the handover H5 page, where they enter this code along with the handover code provided by the customer to complete order verification.|No|

#### Receive Address - Being Processed according to the Data Privacy Policy

|Name|Type|Description|Required|
| --- | --- | --- | --- |
|`uid`|int|Processed value: 0.|Yes|
|`name`|string|Processed value: privacy protection.|Yes|
|`first_name`|string|The first name that the customer entered in 99Food application.|Yes|
|`last_name`|string|Processed value: privacy protection.|Yes|
|`cpf`| int |Customer's CPF.|No|
|`calling_code`|string|The country code of the user’s phone number.|Yes|
|`phone`|string|Processed value: Ex: 000****1406.|Yes|
|`country_code`|string|Shorthand code for the delivery address country.|Yes|
|`poi_address`|string|Processed value: privacy protection.|Yes|
|`house_number`|string|Processed value: privacy protection|Yes|
|`country`|string|Country name.|Yes|
|`state`|string|State or country subdivision.|Yes|
|`city`|string|City name.|Yes|
|`district`|string|District name.|Yes|
|`street_name`|string|Street name.|Yes|
|`street_number`|string|Street number.|Yes|
|`formatted_address`|string|Formatted Address.|Yes|
|`postal_code`|string|Postal code.|Yes|
|`complement`|string|Address complement.|No|
|`reference`|string|Address reference.|No|
|`poi_lat`|int|Processed value: floor the numeric, such as 25.|Yes|
|`poi_lng`|int|Processed value: floor the numeric, such as -101.|Yes|
|`coordinate_type`|string|Type of the coordinates being used.|Yes|
|`poi_display_name`|string|Processed value: privacy protection.|Yes|
|`handover_page_url`|string|The H5 page URL for store-delivery couriers to complete order handover verification with customers. For store-delivery orders, couriers can access this link to enter the handover code and confirm successful delivery.|No|
|`virtual_phone_number`|string|A virtual phone number used to contact the customer. It must be used together with the locator field to successfully connect the call.|Yes|
|`locator`|string|A unique identifier that serves two purposes: 1. It acts as the extension number when using the virtual_phone_number to call the customer; 2. It is used by store-delivery couriers on the handover H5 page, where they enter this code along with the handover code provided by the customer to complete order verification.|No|

#### Receive Address - Self-Pickup Mode (`fulfillment_mode` = 1)

Under self-pickup mode, only the following fields are returned in `receive_address`. All other fields listed above are not returned.

|Name|Type|Description|Required|
| --- | --- | --- | --- |
|`uid`|int|The unique identification of a customer in 99Food system.|Yes|
|`name`|string|The name that the customer input in 99Food application.|Yes|
|`first_name`|string|The first name that the customer entered in 99Food application.|Yes|
|`last_name`|string|The last name that the customer entered in 99Food application.|Yes|
|`cpf`|int|Customer's CPF.|No|
|`calling_code`|string|The country code of the customer's phone number.|Yes|
|`virtual_phone_number`|string|A virtual phone number used to contact the customer. It must be used together with the `locator` field to successfully connect the call.|Yes|
|`locator`|string|A unique identifier that acts as the extension number when using the `virtual_phone_number` to call the customer.|No|

### Response Body Parameters - Order items

|Name|Type|Description|Required|
| --- | --- | --- | --- |
|`app_item_id`|string|The unique identification of an item in the Store / Integrator's system.|Yes|
|`name`|string|The item name that is displayed in the menu of the Store.|Yes|
|`mdu_id`|long|The unique ID of the item. It is generated based on the selected quantity and option specifications.|Yes|
|`sales_type`|string| Defines how the item is sold. Enum: `Weight`, `Unit`|Yes|
|`weight`|string| Returned when `sales_type: Weight`. The total weight of the item. |No|
|`weight_unit`|string| Returned when `sales_type: Weight`. Unit of measurement. Enum: `Gram` (only supported value).|No|
|`sku_price`|integer|The price for each item/subItem. Note: Price is always an integer value and is set in the lowest denomination (e.g. cents for MXN, not Peso).|Yes|
|`total_price`|integer|The total price of the item without any promotion and is calculated in accordance to this equation: [(sku_price of the main item + sku_price of the subitems) * amount of the main item]; Note: Price is always an integer value (never decimals) because the price is set in the lowest denomination (e.g. cents for MXN currency, not Peso).|Yes|
|`amount`|integer|Quantity of the item.|Yes|
|`submit_refund_amount`|integer|This field represents the number of items refunded: Amount − submit_refund_amount = Actual number of items currently in order.|No|
|`sub_item_list`|array|List of the selected subitems of the store's modifier groups. Note: The `amount` in the sub_item_list is the quantity of the sub_item for each main item, meaning that the real required quantity of subitems that needs to be served to the customer is [(`amount` under the main item) * (`amount` under the sub_item_list)].|Yes|
|`real_price`|integer|The actual amount paid by the customer for the item.|Yes|
|`promotion_detail`|array|A json structure that contains all details related to the item. Check below for more details.|Yes|
|`promo_list`|array|List of all promotion under the item.|No|
|`remark`|array|Indicates the customer's specific note or special request for this individual menu item.|No|

### Response Body Parameters - Promotion Detail  (Item level)

>  99Food allows the customers to apply different types of promotions to a **certain item** to maximize their experience in the sense of value for money, meaning that they can apply in parallel coupons and price discount to the same item in the same order.

Promotion detail provides the **summary** of all promotions that are applicable to a **certain item**. 

|Name|Type|Description|Required|
| --- | --- | --- | --- |
|`promo_type`|int|The type of the promotion that is applicable to the item. Please see more details in https://pre-developer-food.99app.com/pt-BR/openapi > Order API > Promotions. When the customer uses more than one type of promotion, 99Food will always display the value 2|Yes|
|`promo_discount`|int|The total promotion amount that is applicable to the item and perceived by the customer. If the same item is chosen more than once, to obtain the unit promotion amount perceived by the customer under the certain `promo_type`, this `promo_discount` must be divided into the `amount` of the main item|Yes|
|`shop_subside_price`|int|The total promotion amount that is applicable to the item and subsidized/invested by the Store. If the same item is chosen more than once, to obtain the unit promotion amount perceived by the customer under the certain `promo_type`, this `shop_subside_price` must be divided into the `amount` of the main item|Yes|

### Response Body Parameters - Promo List  (Item level)

>  99Food allows the customers to apply different types of promotions to a **certain item** to maximize their experience in the sense of value for money, meaning that they can apply in parallel coupons and price discount to the same item in the same order.
 
Promotion detail provides **each** of the promotions that are applicable to a **certain item**. 

|Name|Type|Description|Required|
| --- | --- | --- | --- |
|`promo_type`|int|The specific type of the promotion that is applicable to the item. Please see more details in https://developer.didi-food.com/en-US/openapi > Order API > Promotions|Yes|
|`promo_discount`|int|The specific promotion amount that is applicable to the item and perceived by the customer. If the same item is chosen more than once, to obtain the unit promotion amount perceived by the customer under the certain `promo_type`, this `promo_discount` must be divided into the `amount` of the main item|Yes|
|`shop_subside_price`|int|The specific promotion amount that is applicable to the item and subsidized/invested by the Store. If the same item is chosen more than once, to obtain the unit promotion amount perceived by the customer under the certain `promo_type`, this `shop_subside_price` must be divided into the `amount` of the main item|Yes|

### Response Body Parameters - Promotion (Order level)

Promotion provides the **summary** of all promotions that are applicable to a **specific order**. It lists out all kinds of promotions in terms of item level, order level and delivery level. 

|Name|Type|Description|Required|
| --- | --- | --- | --- |
|`promo_type`|int|The type of the promotion that is applicable to the order. Please see more details in https://developer.didi-food.com/en-US/openapi > Order API > Promotions. When the customer uses more than one type of promotion in an item, 99Food will always display the value 2 for that item promo|Yes|
|`promo_discount`|int|The promotion amount that is applicable to that specific listed promotion and perceived by the customer|Yes|
|`shop_subside_price`|int|The promotion amount that is applicable to that specific listed promotion and subsidized/invested by the Store|Yes|

### Response Body Parameters - Shopper Info

|Name|Type|Description|Required|
| --- | --- | --- | --- |
|`name`|string|The name of the shopper. The information is only sent in Grocery Shopper Mode stores.|No|
|`phone`|string|The phone of the shopper. The information is only sent in Grocery Shopper Mode stores.|No|

### Response Example

### Response Example - Order Delivered by the Store Couriers

```json
{
    "errno": 0,
    "errmsg": "ok",
    "requestId": "1f48959a53c09f2d",
    "time": 1614567373,
    "data": {
        "order_id": 5764625173055605000,
        "order_info": {
            "order_id": 5764625173055605000,
            "status": 100,
            "order_index": 1,
            "remark": "",
            "country": "BR",
            "city_id": 55000243,
            "timezone": "America/Sao_Paulo",
            "pay_type": 2,
            "pay_method": 2,
            "pay_channel": 153,
            "delivery_type": 2,
            "delivery_eta": 0,
            "expected_cook_eta": 0,
            "expected_arrived_eta": 1691378685,
            "create_time": 1691376586,
            "pay_time": 1691376586,
            "complete_time": 0,
            "cancel_time": 0,
            "shop_confirm_time": 0,
            "pickup_code": "3316",
            "need_cutlery": true,
            "fulfillment_mode": 0,
            "handover_code": "5000",
            "price": {
                "order_price": 5720000,
                "items_discount": 2540000,
                "real_price": 4680700,
                "real_pay_price": 3180700,
                "store_charged_delivery_price": 700,
                "delivery_price": 700,
                "delivery_discount": 0,
                "others_fees": {
                    "small_order_price": 0,
                    "total_tip_money": 100000,
                    "service_price": 0,
                    "coupon_discount": 1040000
                },
                "refund_price": 0,
                "customer_need_paying_money": 3280700
            },
            "shop": {
                "shop_id": 5764609568493014000,
                "app_shop_id": "6",
                "shop_addr": "Avenida T 2, 1922, Setor Bueno, Goiânia, Goiás. 74215-010",
                "shop_name": "test_API",
                "shop_phone": [
                    {
                        "calling_code": 55,
                        "phone": 18643080000,
                        "type": "0"
                    }
                ]
            },
            "receive_address": {
                "uid": 369436393561824,
                "name": "João Silva",
                "first_name": "João",
                "last_name": "Silva",
                "cpf": 12345678900,
                "calling_code": "+55",
                "phone": "00016007722",
                "city": "Goiânia",
                "country_code": "BR",
                "poi_address": "Avenida 85, 3377 - St. Marista, Goiânia - GO",
                "house_number": "",
                "country": "",
                "state": "GO",
                "district": "St. Marista",
                "street_name": "Avenida 85",
                "street_number": "3377",
                "formatted_address": "",
                "postal_code": "74160-010",
                "complement": "",
                "reference": "",
                "poi_lat": -16.71003459,
                "poi_lng": -49.26385946,
                "coordinate_type": "wgs84",
                "poi_display_name": "Avenida 85, 3377",
                "virtual_phone_number": "06234421637",
                "handover_page_url": "https://food-b-h5.99app.com/pt-BR/v2/confirmation-entrega",
                "locator": "56244631"
            },
            "order_items": [
                {
                    "item_id": 0,
                    "mdu_id": "32F94A33FB1B58CF4D9BD7242F7C116A",
                    "app_item_id": "39923",
                    "app_external_id": "{\"productId\":\"6028\",\"type\":\"PRODUCT\"}",
                    "name": "Combo 99Food",
                    "total_price": 5720000,
                    "sku_price": 4830000,
                    "amount": 1,
                    "remark": "",
                    "sub_item_list": [
                        {
                            "app_item_id": "35607",
                            "app_external_id": "{\"productId\":\"5192\",\"type\":\"COMPLEMENT\"}",
                            "name": "4 99Food Helados",
                            "total_price": 890000,
                            "sku_price": 890000,
                            "amount": 1,
                            "app_content_id": "10234",
                            "content_app_external_id": "",
                            "sub_item_list": []
                        }
                    ],
                    "promo_type": 2,
                    "real_price": 4680000,
                    "promotion_detail": {
                        "promo_type": 2,
                        "promo_discount": 1040000,
                        "shop_subside_price": 1040000
                    },
                    "promo_list": [
                        {
                            "promo_type": 2,
                            "promo_discount": 1040000,
                            "shop_subside_price": 1040000
                        }
                    ],
                    "weight": 500,
                    "sales_type": "weight",
                    "weight_unit": "gram"
                }
            ],
            "promotions": [
                {
                    "promo_type": 2,
                    "promo_discount": 1040000,
                    "shop_subside_price": 1040000
                },
                {
                    "promo_type": 11,
                    "promo_discount": 1500000,
                    "shop_subside_price": 0
                }
            ],
            "shopper_info": {
                "name": "Ronaldo Ham",
                "phone": "00016050691"
            }
        }
    }
}
```


### Response Example - Order Delivered by the 99Food

```json
{
  "errno": 0,
  "errmsg": "ok",
  "requestId": "1f48959a53c09f2d",
  "time": 1614567373,
  "data": {
        "order_id": 5764625323966664000,
        "order_info": {
            "order_id": 5764625323966664000,
            "status": 100,
            "order_index": 1,
            "remark": "",
            "country": "BR",
            "city_id": 55000243,
            "timezone": "America/Sao_Paulo",
            "pay_type": 2,
            "pay_method": 2,
            "pay_channel": 153,
            "delivery_type": 1,
            "delivery_eta": 0,
            "expected_cook_eta": 0,
            "expected_arrived_eta": 1691596047,
            "create_time": 1691593833,
            "pay_time": 1691593833,
            "complete_time": 0,
            "cancel_time": 0,
            "shop_confirm_time": 0,
            "pickup_code": "3692",
            "need_cutlery": true,
            "fulfillment_mode": 0,
            "handover_code": "4000",
            "logistics_cost": 400,
            "price": {
                "order_price": 4590000,
                "items_discount": 2756500,
                "delivery_discount": 0,
                "refund_price": 0,
                "shop_paid_money": 0
            },
            "shop": {
                "shop_id": 5764607597655886000,
                "app_shop_id": "4370",
                "shop_addr": "Avenida T 2, 1922, Setor Bueno, Goiânia, Goiás. 74215-010",
                "shop_name": "Test",
                "shop_phone": [
                    {
                        "calling_code": 55,
                        "phone": 3102750000,
                        "type": "0"
                    }
                ]
            },
            "receive_address": {
                "uid": 0,
                "name": "privacy protection",
                "first_name": "privacy protection",
                "last_name": "hernandez",
                "cpf": 12345678900,
                "calling_code": "+55",
                "phone": "317***5359",
                "city": "Goiânia",
                "country_code": "BR",
                "poi_address": "privacy protection",
                "house_number": "privacy protection",
                "country": "",
                "state": "",
                "district": "",
                "street_name": "",
                "street_number": "",
                "formatted_address": "",
                "postal_code": "",
                "complement": "",
                "reference": "",
                "poi_lat": -17,
                "poi_lng": -50,
                "coordinate_type": "wgs84",
                "poi_display_name": "privacy protection"
            },
            "order_items": [
                {
                    "item_id": 0,
                    "mdu_id": "899AD17D12D528E55693D46448216EEA",
                    "app_item_id": "37836",
                    "app_external_id": "{\"productId\":\"6327\",\"type\":\"PRODUCT\"}",
                    "name": "Combo SUPER",
                    "total_price": 4590000,
                    "sku_price": 4590000,
                    "amount": 1,
                    "remark": "",
                    "sub_item_list": [
                        {
                            "app_item_id": "34927",
                            "app_external_id": "{\"productId\":\"3074\",\"type\":\"MODIFIER\"}",
                            "name": "PAN",
                            "total_price": 0,
                            "sku_price": 0,
                            "amount": 1,
                            "app_content_id": "5828",
                            "content_app_external_id": "",
                            "sub_item_list": []
                        }
                    ],
                    "promo_type": 101,
                    "real_price": 2983500,
                    "promotion_detail": {
                        "promo_type": 2,
                        "promo_discount": 1606500,
                        "shop_subside_price": 0
                    },
                    "promo_list": [
                        {
                            "promo_type": 101,
                            "promo_discount": 688500,
                            "shop_subside_price": 0
                        },
                        {
                            "promo_type": 2,
                            "promo_discount": 918000,
                            "shop_subside_price": 0
                        }
                    ],
                    "weight": 700,
                    "sales_type": "weight",
                    "weight_unit": "gram"
                }
            ],
            "promotions": [
                {
                    "promo_type": 2,
                    "promo_discount": 688500,
                    "shop_subside_price": 0
                },
                {
                    "promo_type": 2,
                    "promo_discount": 918000,
                    "shop_subside_price": 0
                },
                {
                    "promo_type": 11,
                    "promo_discount": 1150000,
                    "shop_subside_price": 0
                }
            ],
            "shopper_info": {
                "name": "Ronaldo Ham",
                "phone": "00016050691"
            }
        }
    }
}
```

### Response Example - Self Pickup Order

```json
{
  "errno": 0,
  "errmsg": "ok",
  "requestId": "32a8905c6a81",
  "time": 1786867048,
  "data": {
    "order_id": 5764682466975616700,
    "order_info": {
      "order_id": 5764682466975616700,
      "status": 100,
      "order_index": 2,
      "remark": "",
      "country": "BR",
      "city_id": 55000243,
      "timezone": "America/Sao_Paulo",
      "pay_type": 1,
      "pay_method": 1,
      "pay_channel": 150,
      "delivery_type": 0,
      "delivery_eta": 0,
      "expected_cook_eta": 0,
      "expected_arrived_eta": 0,
      "create_time": 1786867045,
      "pay_time": 1786867048,
      "complete_time": 0,
      "cancel_time": 0,
      "shop_confirm_time": 0,
      "c_cancel_preference": 7,
      "need_cutlery": true,
      "price": {
        "order_price": 1000,
        "real_price": 1000,
        "real_pay_price": 1000,
        "delivery_price": 0,
        "shop_paid_money": 0,
        "refund_price": 0,
        "store_charged_delivery_price": 0
      },
      "shop": {
        "shop_id": 5764612333545196000,
        "app_shop_id": "576461233354519600",
        "shop_addr": "Avenida T 2, 1922, Setor Bueno, Goiânia, Goiás. 74215-010",
        "shop_name": "Test",
        "shop_phone": [
          {
            "calling_code": 55,
            "phone": 177262888258,
            "type": "1"
          }
        ]
      },
      "receive_address": {
        "uid": 369436449314000,
        "name": "Luccas Santos",
        "first_name": "Luccas",
        "last_name": "Santos",
        "cpf": 12345678900,
        "calling_code": "+55",
        "virtual_phone_number": "40202499",
        "locator": ""
      },
      "order_items": [
        {
          "mdu_id": "30D7761596A6ED19069C4AF0479A950D",
          "app_item_id": "",
          "app_external_id": "",
          "name": "defaultItemWhenShopCreated",
          "total_price": 1000,
          "sku_price": 500,
          "amount": 2,
          "remark": "",
          "sub_item_list": [],
          "promo_type": 0,
          "real_price": 1000,
          "promotion_detail": {
            "promo_type": 0,
            "promo_discount": 0,
            "shop_subside_price": 0
          },
          "sales_type": "unit"
        }
      ],
      "fulfillment_mode": 1,
      "takeaway_code": "3756"
    }
  }
}
```
