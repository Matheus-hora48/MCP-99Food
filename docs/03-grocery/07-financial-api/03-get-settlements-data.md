<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 2207 · Grocery > Financial API > Get Settlements Data -->

## Get Settlements Data

This endpoint provides weekly settlement data for stores. Access requires special authorization, please contact the integration team or the BD sales team to request access.

### Basic Information

| **Name** | **Description** |
| --- | --- |
| `URL` | [https://openapi.99food.com/v3/finance/finance/getShopBillWeek](https://openapi.99food.com/v3/finance/finance/getShopBillWeek) |
| `Method` | POST |
| `Permission` | WhiteList |


### Request Header Parameter
| **Name** | **Type** | **Required** | **Description** | **Example** |
| --- | --- | --- | --- | --- |
| `Authorization` | string | Yes | The `accessToken` for the app. | Bearer xxx....xxx |

### Request Body Parameters

| **Name** | **Type** | **Required** | **Description** | **Example** |
| --- | --- | --- | --- | --- |
|  `acceptor_code`  |  string  |  Yes  |  app_shop_id  |  testshop1  |
|  `page_no`  |  int  |  Yes  |  Current page number.  |  1  |
|  `page_size`  |  int  |  Yes  |  Number of records to display per page. Max: 200. |  100  |
|  `start_date`  |  string  |  Yes  |  Start date of the query period (YYYYMMDD format).  |  20251101  |
|  `end_date`  |  string  |  Yes  |  End date of the query period (YYYYMMDD format).  |  20251107  |

### Response Body Parameters

| **Name** | **Type** | **Description** |
| --- | --- | --- |
|  `total_num`  |  int  |  Total number of records.  |
|  `total_page`  |  int  |  Total number of pages.  |
|  `page_size`  |  int  |  Number of records to display per page. Max: 200.  |
|  `page_no`  |  int  |  Current page number.  |
|  `data`  |  array  |  Sales data details.  |

### Data Model
| **Name** | **Type** | **Description** |
| --- | --- | --- |
|  `weekPaymentId`  |  string  |  Unique payment identifier for the store.   |
|  `withdrawDate`  |  string  |  Actual disbursement date in ISO-8601 format.  |
|  `withdrawAmount`  |  int  |  Amount of this payment.  |
|  `liability`  |  string  |  The entity responsible for payment  |
|  `shopId`  |  int  |  Store identifier.  |
|  `settleStartDate`  |  string  |  Settlement period start date (YYYYMMDD format).  |
|  `settleEndDate`  |  string  |  Settlement period end date (YYYYMMDD format). |
|  `currency`  |  string  |  Currency code.  |
|  `dayPaymentIDList`  |  array  |  List of unique daily settlement identifiers.  |


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

### Response Example

```json
{
    "errno": 0,
    "errmsg": "ok",
    "requestId": "s399158f68c273a94853058eb6352302",
    "time": 1757574058,
    "data": {
        "data": [
            {
                "weekPaymentId": "510_BFMW202508128a6a6ed55bb9",
                "withdrawDate": "2025-09-03",
                "withdrawAmount": 1100,
                "liability": "Nourishflow",
                "shopId": 5764608924570091908,
                "settleStartDate": "20250825",
                "settleEndDate": "20250831",
                "currency": "BRL",
                "dayPaymentIDList": [
                    "1945389697417496990",
                    "1945389697417496991",
                    "1945389697417496992",
                    "1945389697417496993",
                    "1945389697417496994",
                    "1945389697417496995",
                    "1945389697417496996"
                ]
            }
        ],
        "total_num": 1,
        "total_page": 1,
        "page_size": 100,
        "page_no": 1
    }
}
```