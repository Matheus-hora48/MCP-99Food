<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 2205 · Grocery > Financial API > Get Bill Data -->

## Get Bill Data

This endpoint provides daily billing data for stores. Access requires special authorization, please contact the integration team or the BD sales team to request access.

> **Notes:** This API returns only store-confirmed orders.

### Basic Information

| **Name** | **Description** |
| --- | --- |
| `URL` | [https://openapi.99food.com/v3/finance/finance/getShopBillDetail](https://openapi.99food.com/v3/finance/finance/getShopBillDetail) |
| `Method` | POST |
| `Permission` | Special Authorization Needed |


### Request Header Parameter
| **Name** | **Type** | **Required** | **Description** | **Example** |
| --- | --- | --- | --- | --- |
| `Authorization` | string | Yes | The `accessToken` for the app. | Bearer xxx....xxx |

### Request Body Parameters

| **Name** | **Type** | **Required** | **Description** | **Example** |
| --- | --- | --- | --- | --- |
|  `acceptor_code`  |  string  |  Yes  |  app_shop_id  |  testshop1  |
|  `page_no`  |  int  |  Yes  |  Current page number.  |  1  |
|  `page_size`  |  int  |  Yes  |  Number of records to display per page. Max: 200.  |  100  |
|  `start_date`  |  string  |  Yes  |  Start date of the query period (YYYYMMDD format).  |  20251101  |
|  `end_date`  |  string  |  Yes  |  End date of the query period (YYYYMMDD format).   |  20251107  |

### Response Body Parameters

| **Name** | **Type** | **Description** |
| --- | --- | --- |
|  `total_num`  |  int  |  Total number of records.  |
|  `total_page`  |  int  |  Total number of pages. |
|  `page_size`  |  int  |  Number of records to display per page. Max: 200.  |
|  `page_no`  |  int  |  Current page number.  |
|  `data`  |  array  |  Sales data details.  |

#### Data Model
| **Name** | **Type** | **Description** |
| --- | --- | --- |
|  `shopId`  |  int  |  The ID of the store.  |
|  `shopName`  |  string  | The name of the store.  |
|  `contractorId`  |  int  |  The legal entity ID associated with the `shopId`.  |
|  `contractorName`  |  string  |  The name of the legal entity associated with the `shopId`.  |
|  `cityId`  |  int  |  The ID of the city where the store is located.  |
|  `cityName`  |  string  |  The name of the city where the store is located.  |
|  `orderId`  |  string  |  The ID of the order. |
|  `orderIndex`  |  string  |  The index number of the order.  |
|  `orderType`  |  int  |  1-Order revenue; 2-Order refund; 3-Partial refund during sale; 4-After sales refund; 5-Non accompanying order  |
|  `deliveryType`  |  int  |  0-No delivery required (e.g., non-accompanying orders); 1-Platform delivery; 2-Store delivery; 20-Third party delivery  |
|  `businessTs`  |  int  |  Business occurrence timestamp  |
|  `businessDateTime`  |  string  |  Business occurrence time.  |
|  `mealOriginalAmount`  |  int  |  The original price of the meal before discounts.  |
|  `shopActivityOutcome`  |  int  |  Store's expense for customer-facing item discounts. |
|  `shopActivitySubsidy`  |  int  |   Platform subsidy to store for item discounts.  |
|  `shopDeliveryAmount`  |  int  |  Delivery fee collected by store in self-delivery mode. |
|  `shopPreTips`  |  int  |  Tip amount paid by customer to the store.  |
|  `freeDeliveryOutcome`  |  int  |  Store's marketing cost for free delivery campaigns.  |
|  `freeDeliverySubsidy`  |  int  |  Platform subsidy to store for free delivery campaigns.  |
|  `commissionBaseAmount`  |  int  |  Commission base for order revenue or refund.  |
|  `commissionRate`  |  int  |  Commission rate.  |
|  `commissionAmount`  |  int  |  Commission fee charged by platform to store.  |
|  `commissionSubsidyAmount`  |  int  |  Platform subsidy to store for commission.  |
|  `b2pDeliveryAmount`  |  int  |  Logistics fee charged by platform to store.  |
|  `payCommissionAmount`  |  int  |  Payment processing fee charged by platform to store.  |
|  `minValueDifferenceAmount`  |  int  |  The amount received from the customer (via the platform) to cover the gap when the order value is under the minimum delivery requirement.  |
|  `orderAmount`  |  int  |  Final order amount. |
|  `paymentMethod`  |  int  |  0-default, 1-online payment, 2-offline payment, -1-refund  |
| `paymentChannel` | int | The payment channel used for the transaction. Possible values: `0`: Default, `110`: Coupon, `120`: 99Food Wallet, `150`: Credit Card, `153`: Cash, `154`: POS, `167`: Pre-auth, `175`: OXXO, `182`: PayPay Secret Free, `184`: PayPay Secret, `190`: 99Pay, `202`: Efecty, `212/280`: PIX, `215`: SPEI, `219`: DiDi Cuenta, `229`: NuPay, `234`: Apple Pay Pre-auth, `235`: Apple Pay, `257`: Pluxee, `258`: Ticket, `259`: VR, `260`: Alelo, `261`: Nequi, `262`: POS Credit Card, `263`: POS Debit Card, `264`: POS Meal Voucher, `266`: Edenred, `267`: Edenred Pre-auth, `270`: Sivale, `271`: Sivale Pre-auth, `272`: Google Pay, `273`: Google Pay Pre-auth, `310`: Yape, `311`: Plin, `901`: Benefit, `902`: B2C Boleto, `2008`: Marketing. |
| `paymentMethodDetail` | int | Detailed payment method: `101`: Credit Card, `102`: Debit Card, `109`: Other Card / Unknown card type, `200`: 99pay (when `paymentChannel` is `190`), `300`: PIX (when `paymentChannel` is `212/280`), `401`: Meal Voucher - Pluxee/Sodexo (when `paymentChannel` is `257`), `402`: Meal Voucher - Ticket (when `paymentChannel` is `258`), `403`: Meal Voucher - VR (when `paymentChannel` is `259`), `404`: Meal Voucher - Alelo (when `paymentChannel` is `260`), `600`: OFFLINE_CASH (when `paymentChannel` is `153`), `701`: POS-Credit Card (when `paymentChannel` is `262`), `702`: POS-Debit Card (when `paymentChannel` is `263`), `703`: POS-Meal Voucher (when `paymentChannel` is `264`), `999`: Unknown. |
|  `cardBrand`  |  string  |  Payment card brand：VISA/MASTERCARD/AMEX etc. (optional).  |
|  `cancelDateTime`  |  string  |  The date and time when the order was cancelled.  |
|  `cancelTs`  |  int  |  Order cancellation timestamp.  |
|  `cancelReason`  |  int  |  Order cancellation reason code: **0**-Normal; **1**-Customer cancelled manually; **2**-Auto-cancelled due to customer payment timeout; **3**-Auto-cancelled due to customer pickup timeout; **20**-Customer requested instant return; **101**-Store cancelled manually; **102**-Auto-cancelled due to store confirmation timeout; **103**-Store cancelled due to non-operational status (Shop offline); **201**-Rider/Delivery cancelled manually; **202**-Auto-cancelled due to no rider available (Dispatch timeout); **204**-Cancelled by rider due to store unable to serve meals; **205**-Cancelled by rider due to customer unable to take meals; **301**-Customer Service/Platform managed cancellation manually. |
|  `cashBalance`  |  int  |  Cash amount collected by store for cash orders.  |
|  `mealVoucherAmount`  |  int  |  Amount paid through meal voucher channels.  |
|  `settlementAmount`  |  int  |  Final amount to be settled to the store for this transaction.  |
|  `expectSettleDate`  |  string  |  Scheduled payment date to the store (ISO-8601 format).  |
|  `dayPaymentId`  |  string  |  Unique payment identifier for daily settlement.  |
|  `mealLossDeductAmount`  |  bigint  |  The amount deducted due to merchant liability for order cancellation.  |
|  `vatAmount`  |  bigint  |  Value-added tax on platform commissions.  |
|  `merchantAppealAmount`  |  bigint  |  Refunds issued due to merchant appeals.  |
| `monthlyServicePrice` | bigint | The monthly fee amount (actual amount charged to merchants). Applicable only for `grocery` stores when `orderType` is `5`. Example format: `-14900`. |
| `gmv` | bigint | The GMV generated during the monthly fee collection period. Applicable only for `grocery` stores when `orderType` is `5`. Example format: `81986`. |
| `monthlyServiceBasePrice` | bigint | The monthly fee base (monthly fee calculation threshold). Applicable only for `grocery` stores when `orderType` is `5`. Example format: `600000`. |
| `monthlyServiceCalculationCycle` | string | The monthly fee collection period. Applicable only for `grocery` stores when `orderType` is `5`. Format: `YYYY-MM-DD~YYYY-MM-DD` (e.g., `2026-03-01~2026-03-31`). |



### Response Errors (errno) Descriptions

| **Code** | **Description** |
| --- | --- |
| 10001 | System error. |
| 10002 | Parameter error. |
| 110002 | The format of the end time of the accounting period is incorrect. |
| 110003 | The format of the start time of the accounting period is incorrect |
| 110004 | The query time is out of range and only supports querying data within three months. |
| 110005 | The maximum query range is 31 days. |
| 110006 | The start time of the accounting period cannot be greater than the end time of the accounting period. |

### Complete Response Example

#### `orderType=1`

```json
{
    "errno": 0,
    "errmsg": "ok",
    "requestId": "s399158f68c273c64853058eb635bb02",
    "time": 1757574087,
    "data": {
        "data": [
            {
                "shopId": 5764608924570091908,
                "shopName": "test_BR_yichen_test_2_SfrQYFWGdOMbDWX7lfc",
                "contractorId": 5764609089800503677,
                "contractorName": "test_BR_yichen_test_2_SfrQYFWGdOMbDWX7lfc",
                "cityId": 55000002,
                "cityName": "Andradina",
                "orderId": "5764645286601360672",
                "orderIndex": "908001",
                "orderType": 1,
                "deliveryType": 1,
                "businessTs": 1755239136,
                "businessDateTime": "2025-08-15 03:25:36",
                "mealOriginalAmount": 300,
                "shopActivityOutcome": -174,
                "shopActivitySubsidy": 43,
                "shopDeliveryAmount": 0,
                "shopPreTips": 0,
                "freeDeliveryOutcome": -1000,
                "freeDeliverySubsidy": 800,
                "commissionBaseAmount": 169,
                "commissionRate": 0,
                "commissionAmount": 0,
                "commissionSubsidyAmount": 0,
                "b2pDeliveryAmount": 0,
                "payCommissionAmount": -6,
                "minValueDifferenceAmount": 0,
                "orderAmount": -37,
                "paymentMethod": 1,
                "paymentChannel": 212,
                "paymentMethodDetail": 300,
                "cardBrand": "",
                "cancelTs": 0,
                "cancelDateTime": "2025-09-11 04:01:27",
                "cancelReason": 0,
                "cashBalance": 0,
                "mealVoucherAmount": 0,
                "settlementAmount": -37,
                "expectSettleDate": "2025-08-20",
                "dayPaymentId": "",
                "mealLossDeductAmount": 0,
                "vatAmount": 0,
                "merchantAppealAmount": 0
            }
        ],
        "total_num": 4760,
        "total_page": 4760,
        "page_size": 1,
        "page_no": 1
    }
}
```

### Bill Data Examples

#### `orderType=2`

```json
{
  "shopId": 5764607577779080308,
  "shopName": "test_AutoTestShoppqnhHWcWvYrWamtdXAe_sim",
  "contractorId": 5764608435086427906,
  "contractorName": "test_KFC666x3wWlSzakSdyOGvqAnr_sim",
  "cityId": 52090100,
  "cityName": "Ciudad de México",
  "orderId": "5764651243012161830",
  "orderIndex": "308005",
  "orderType": 2,
  "deliveryType": 2,
  "businessTs": 1763954785,
  "businessDateTime": "2025-11-23 21:26:25",
  "mealOriginalAmount": -1000,
  "shopActivityOutcome": 0,
  "shopActivitySubsidy": 0,
  "shopDeliveryAmount": -700,
  "shopPreTips": 0,
  "freeDeliveryOutcome": 0,
  "freeDeliverySubsidy": 0,
  "commissionBaseAmount": -1700,
  "commissionRate": 3500,
  "commissionAmount": 595,
  "commissionSubsidyAmount": 0,
  "b2pDeliveryAmount": 0,
  "payCommissionAmount": 0,
  "minValueDifferenceAmount": 0,
  "orderAmount": -1105,
  "paymentMethod": 2,
  "paymentChannel": 153,
  "paymentMethodDetail": 600,
  "cardBrand": "",
  "cancelTs": 1763954785,
  "cancelDateTime": "2025-11-23 21:26:25",
  "cancelReason": 1,
  "cashBalance": 0,
  "mealVoucherAmount": 0,
  "settlementAmount": -1105,
  "expectSettleDate": "2025-11-26",
  "dayPaymentId": "5765228966149096804",
  "mealLossDeductAmount": 0,
  "vatAmount": 0,
  "merchantAppealAmount": 0
}
```

#### `orderType=3`

```json
{
  "shopId": 5764609451580197422,
  "shopName": "test_1758786802_BWfoswfkIJvEIPSgSZF",
  "contractorId": 5764609715779406365,
  "contractorName": "test_1758786802_BWfoswfkIJvEIPSgSZF",
  "cityId": 52190500,
  "cityName": "Monterrey",
  "orderId": "5764651496163574044",
  "orderIndex": "1",
  "orderType": 3,
  "deliveryType": 1,
  "businessTs": 1763955852,
  "businessDateTime": "2025-11-23 21:44:12",
  "mealOriginalAmount": -16500,
  "shopActivityOutcome": 0,
  "shopActivitySubsidy": 0,
  "shopDeliveryAmount": 0,
  "shopPreTips": 0,
  "freeDeliveryOutcome": 0,
  "freeDeliverySubsidy": 0,
  "commissionBaseAmount": 0,
  "commissionRate": 4000,
  "commissionAmount": 6600,
  "commissionSubsidyAmount": 0,
  "b2pDeliveryAmount": 0,
  "payCommissionAmount": 0,
  "minValueDifferenceAmount": 0,
  "orderAmount": -9900,
  "paymentMethod": 1,
  "paymentChannel": 150,
  "paymentMethodDetail": 102,
  "cardBrand": "visa",
  "cancelTs": 0,
  "cancelDateTime": "",
  "cancelReason": 0,
  "cashBalance": 0,
  "mealVoucherAmount": 0,
  "settlementAmount": -9900,
  "expectSettleDate": "2025-11-26",
  "dayPaymentId": "5765235072007145675",
  "mealLossDeductAmount": 0,
  "vatAmount": 0,
  "merchantAppealAmount": 0
}
```
#### `orderType=4`

```json
{
  "shopId": 5764607743827382211,
  "shopName": "test_GroceryOrderPartlyRefund_AvRVQhiAmMzl62UUWTq_sim",
  "contractorId": 5764608435086427906,
  "contractorName": "test_KFC666x3wWlSzakSdyOGvqAnr_sim",
  "cityId": 52090100,
  "cityName": "Ciudad de México",
  "orderId": "5764651393281491257",
  "orderIndex": "211006",
  "orderType": 4,
  "deliveryType": 2,
  "businessTs": 1763954492,
  "businessDateTime": "2025-11-23 21:21:32",
  "mealOriginalAmount": 0,
  "shopActivityOutcome": 0,
  "shopActivitySubsidy": 0,
  "shopDeliveryAmount": 0,
  "shopPreTips": 0,
  "freeDeliveryOutcome": 0,
  "freeDeliverySubsidy": 0,
  "commissionBaseAmount": 0,
  "commissionRate": 3500,
  "commissionAmount": 0,
  "commissionSubsidyAmount": 0,
  "b2pDeliveryAmount": 0,
  "payCommissionAmount": 0,
  "minValueDifferenceAmount": 0,
  "orderAmount": 0,
  "paymentMethod": 1,
  "paymentChannel": 150,
  "paymentMethodDetail": 102,
  "cardBrand": "",
  "cancelTs": 0,
  "cancelDateTime": "",
  "cancelReason": 0,
  "cashBalance": 0,
  "mealVoucherAmount": 0,
  "settlementAmount": -700,
  "expectSettleDate": "2025-11-26",
  "dayPaymentId": "5765230986453060192",
  "mealLossDeductAmount": 0,
  "vatAmount": 0,
  "merchantAppealAmount": 0
}
```

#### `orderType=5`

```json
{
  "shopId": 5764607606405204528,
  "shopName": "test_1671690419_qmHsMfSnkwFhncljite",
  "contractorId": 5764607600138914950,
  "contractorName": "test_1692781984_IXUIkMdDdKKPpKIsPyH",
  "cityId": 52210400,
  "cityName": "Puebla",
  "orderId": "5764609487470920339",
  "orderIndex": "",
  "orderType": 5,
  "deliveryType": 0,
  "businessTs": 1763976519,
  "businessDateTime": "2025-11-24 03:28:39",
  "mealOriginalAmount": 0,
  "shopActivityOutcome": 0,
  "shopActivitySubsidy": 0,
  "shopDeliveryAmount": 0,
  "shopPreTips": 0,
  "freeDeliveryOutcome": 0,
  "freeDeliverySubsidy": 0,
  "commissionBaseAmount": 0,
  "commissionRate": 0,
  "commissionAmount": 0,
  "commissionSubsidyAmount": 0,
  "b2pDeliveryAmount": 0,
  "payCommissionAmount": 0,
  "minValueDifferenceAmount": 0,
  "orderAmount": 0,
  "paymentMethod": 0,
  "paymentChannel": 0,
  "paymentMethodDetail": 0,
  "cardBrand": "",
  "cancelTs": 0,
  "cancelDateTime": "",
  "cancelReason": 0,
  "cashBalance": 0,
  "mealVoucherAmount": 0,
  "settlementAmount": 10000,
  "expectSettleDate": "2025-12-03",
  "dayPaymentId": "5765235934746119079",
  "mealLossDeductAmount": 0,
  "vatAmount": 0,
  "merchantAppealAmount": 0,
  "monthlyServicePrice": 0,
  "gmv": 0,
  "monthlyServiceBasePrice": 0,
  "monthlyServiceCalculationCycle": ""
}
```