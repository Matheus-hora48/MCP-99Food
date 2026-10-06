<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 2077 · Food > Changelog > Changelog -->

## Changelog

### August 28, 2026

#### Limit Receive Address Fields for Self-Pickup Orders

| **Item** | **Description** |
| --- | --- |
| **Protocol** | 99Food Protocol |
| **Affected Components** | **orderNew** webhook, **Get Order Details** (GET /v1/order/order/detail) |
| **Update Summary** | For self-pickup orders (`fulfillment_mode` = 1), the `receive_address` object only returns a limited set of fields (`uid`, `name`, `first_name`, `last_name`, `cpf`, `calling_code`, `virtual_phone_number`, `locator`) to protect customer privacy. All other address-related fields are not returned in this mode. |

#### New Endpoint: Confirm Order Pickup

| **Item** | **Description** |
| --- | --- |
| **Protocol** | 99Food Protocol |
| **Affected Components** | **Confirm Order Pickup** (POST /v1/order/order/finish) |
| **Update Summary** | Added a new endpoint to allow stores to confirm that the customer has picked up a self-pickup order. It applies only to self-pickup orders (`fulfillment_mode` = 1) and can only be called after the store has confirmed the order or set it as Ready. Upon successful confirmation, the order status will be updated to 600 (Order Completed). |

#### New Endpoint: Picked Up

| **Item** | **Description** |
| --- | --- |
| **Protocol** | Open Delivery Protocol |
| **Affected Components** | **Picked Up** (POST /v4/opendelivery/v1/orders/{orderId}/pickedUp) |
| **Update Summary** | Added a new optional endpoint to inform that the order has been picked up. This action only applies to orders under `TAKEOUT` mode, and once called, the order status will be updated to Completed. |

### July 28, 2026

#### New Value Added to Store Status Controller

| **Item** | **Description** |
| --- | --- |
| **Protocol** | 99Food Protocol |
| **Affected Components** | **Set Store Status** (POST /v1/shop/shop/setStatus) |
| **Update Summary** | Added a new option `4` (Revoke Business Close) to the `store_status` parameter. When set to `4`, it cancels the Business Close state. If the store is currently in Business Close: 1-If within business hours, the store goes online immediately; 2-If outside business hours and `auto_switch` is set to 2, the store will automatically go online during the next business hours; 3-If outside business hours and `auto_switch` is set to 1, manual activation by the merchant is still required. |

### July 23, 2026

#### New Fields Added in Order Details

| **Item** | **Description** |
| --- | --- |
| **Protocol** | 99Food Protocol |
| **Affected Components** | **orderNew** webhook, **Get Order Details** (GET /v1/order/order/detail) |
| **Update Summary** | Added two new optional response fields: `logistics_cost` (platform delivery fee charged to the merchant under 99Food delivery mode) and `takeaway_code` (4-digit handover confirmation code for self-pickup orders). |

#### New Endpoint: Verify Delivery Code

| **Item** | **Description** |
| --- | --- |
| **Protocol** | 99Food Protocol |
| **Affected Components** | **Verify Delivery Code** (POST /v1/order/selfdelivery/verifyDeliveryCode) |
| **Update Summary** | Added a new endpoint to allow partners to validate the customer's pick-up code for self-delivery orders. Upon successful verification, the order status will automatically update to 600 (Order Completed). |

### June 26, 2026

#### Deprecate Legacy Field in Order Details

| **Item** | **Description** |
| --- | --- |
| **Protocol** | 99Food Protocol |
| **Affected Components** | **orderNew** webhook, **Get Order Details** (GET /v1/order/order/detail) |
| **Update Summary** | Marked `pay_type` as a legacy field in the response. For a more complete and detailed breakdown of the payment method, it is highly recommended to migrate to and use `pay_channel` instead. |

### June 2, 2026

#### Add New Fields to Bill Data

| **Item** | **Description** |
| --- | --- |
| **Protocol** | 99Food Protocol |
| **Affected Components** | **Get Bill Data** (POST /v3/finance/finance/getShopBillDetail) |
| **Update Summary** | Added 4 new fields to the data model for grocery stores when orderType is 5 (Non-accompanying order): 1. `monthlyServicePrice`: The actual monthly fee amount charged to merchants (e.g., -14900). 2. `gmv`: The total GMV generated during the monthly fee collection period. 3.`monthlyServiceBasePrice`: The monthly fee calculation threshold. 4. `monthlyServiceCalculationCycle`: The monthly fee collection period formatted as YYYY-MM-DD~YYYY-MM-DD. |

### April 29, 2026

#### IMPORTANT: Domain change from `didi-food.com` to `99food.com`

| **Item** | **Description** |
| --- | --- |
| **Protocol** | 99Food Protocol |
| **Affected Components** | All Endpoints |
| **Update Summary** | Base URL domain migration from openapi.didi-food.com to openapi.99food.com. All existing endpoints have been migrated to the new domain. The old domain (`openapi.didi-food.com`) will remain functional until **May 29, 2026** (last Friday of May 2026). Partners are strongly advised to update their integrations to use the new domain before the cutoff date. All other paths and parameters remain unchanged. **Example**: Old - `https://openapi.didi-food.com/v1/auth/authtoken/get`, New - `https://openapi.99food.com/v1/auth/authtoken/get` |

### March 25, 2026

#### Enhance Store Status Management

| **Item** | **Description** |
| --- | --- |
| **Protocol** | 99Food Protocol |
| **Affected Components** | **Set Store Status** (POST /v1/shop/shop/setStatus) |
| **Update Summary** | Enhanced store status management. Added `store_status` field to set store status to `online`, `business close`, or `business pause`. Added `pause_time` and `pause_reason_code` fields to specify pause details. Added `busy_mode` object (containing `busy_state`, `busy_duration_minutes`, `busy_cook_delay_minutes`) to configure busy periods, during which food preparation time will be extended. The `biz_status` field is now legacy. |

#### Add Busy Mode Info to Store Details

| **Item** | **Description** |
| --- | --- |
| **Protocol** | 99Food Protocol |
| **Affected Components** | **Get Store Details** (GET /v1/shop/shop/detail) |
| **Update Summary** | Added `busy_mode_info` field in the response to query the store's current busy mode settings. |

#### Add New Fields to Order Details

| **Item** | **Description** |
| --- | --- |
| **Protocol** | 99Food Protocol |
| **Affected Components** | **orderNew** webhook, **Get Order Details** (GET /v1/order/order/detail) |
| **Update Summary** | Added the following fields in the response: `fulfillment_mode` to indicate whether the order is for self-pickup or delivery; `sales_type`, `weight`, `weight_unit`, and `mdu_id` fields, where `sales_type` defines how the item is sold (Enum: `Weight`, `Unit`). |


### January 26, 2026

#### Add New Cancellation Reasons for Merchants

| **Item** | **Description** |
| --- | --- |
| **Protocol** | 99Food Protocol |
| **Affected Components** | **Cancel Order** (POST /v1/order/order/cancel) |
| **Update Summary** | Added new cancellation reasons: `Menu needs to be updated`, `Order is outside the delivery area` (Self-delivery ONLY), `Order address is in an unsafe area` (Self-delivery ONLY), `Questions about fees or promotions`, and `Suspected fraud or prank`. |

#### Add Service Fee for Platform Delivery

| **Item** | **Description** |
| --- | --- |
| **Protocol** | 99Food Protocol |
| **Affected Components** | **orderNew** webhook, **Get Order Details** (GET /v1/order/order/detail) |
| **Update Summary** | The `service_price` field has been added to Price Model 1 for orders using platform delivery. |

### January 14, 2026

#### Add New Payment Channel (Google Pay)

| **Item** | **Description** |
| --- | --- |
| **Protocol** | 99Food Protocol |
| **Affected Components** | **orderNew** webhook, **Get Order Details** (GET /v1/order/order/detail) |
| **Update Summary** | The `payment_channel` field now supports Google Pay as a payment method. |

### December 15, 2025

#### Add New Payment Channel (Apple Pay)

| **Item** | **Description** |
| --- | --- |
| **Protocol** | 99Food Protocol |
| **Affected Components** | **orderNew** webhook, **Get Order Details** (GET /v1/order/order/detail) |
| **Update Summary** | The `payment_channel` field now supports Apple Pay as a payment method. |

### December 12, 2025

#### Add New Fields to Bill Details

| **Item** | **Description** |
| --- | --- |
| **Protocol** | 99Food Protocol |
| **Affected Components** | **Get Bill Data** (POST /v3/finance/finance/getShopBillDetail) |
| **Update Summary** | The `mealLossDeductAmount`, `vatAmount`, and `merchantAppealAmount` fields are now included in the bill detail response. |

### December 8, 2025

#### Enable `priority` Field in Menu APIs

| **Item** | **Description** |
| --- | --- |
| **Protocol** | 99Food Protocol |
| **Affected Components** | **Upload Store Menu Details** (POST /v3/item/item/upload), **Update One Item** (POST /v3/item/item/updateItem) |
| **Update Summary** | The previously inactive `priority` field has now been enabled and will be used to determine the display order of categories/items in the menu. Categories/items will be sorted in ascending order based on their `priority` values. |

### November 26, 2025

#### Add New Fields at Order Level

| **Item** | **Description** |
| --- | --- |
| **Protocol** | 99Food Protocol |
| **Affected Components** | **orderNew** webhook, **Get Order Details** (GET /v1/order/order/detail) |
| **Update Summary** | The `handover_page_url`, `locator`, and `virtual_phone_number` fields are now included when the delivery method is set to store delivery. The `handover_code` field is included when the delivery method is set to platform delivery. |