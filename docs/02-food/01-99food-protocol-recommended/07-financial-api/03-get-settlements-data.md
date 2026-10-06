<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 2029 · Food > 99Food Protocol (Recommended) > Financial API > Get Settlements Data -->

## Get Settlements Data

This endpoint provides weekly settlement data for stores. 

### Basic Information

| **Name** | **Description** |
| --- | --- |
| `URL` | [https://openapi.99food.com/v3/finance/finance/getShopBillWeek](https://openapi.99food.com/v3/finance/finance/getShopBillWeek) |
| `Method` | POST |


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
|  `payeeCnpj`  |  string  |  Store's recipient CNPJ.  |
|  `payerCNpj`  |  string  |  The 99Food's paying CNPJ.  |
|  `cnpjWithdrawAmount`  |  int  |  The payout amount aggregated at the recipient CNPJ level. If multiple stores are settled under the same recipient CNPJ, this field represents the total settlement amount across all those stores.  |
|  `cercAmount`  |  int  |  The amount withheld by the 99 platform and paid to a third-party institution in accordance with compliance requirements after the receivables are sold through CERC.  |


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
    "requestId": "0a9368106a79c0f79557f31a03245f02",
    "time": 1786364151,
    "data": {
        "data": [
            {
                "weekPaymentId": "2059838726762135813",
                "withdrawDate": "2026-06-03",
                "withdrawAmount": 8,
                "liability": "Nourishflow",
                "shopId": 5764613094924618141,
                "settleStartDate": "20260525",
                "settleEndDate": "20260531",
                "currency": "BRL",
                "dayPaymentIDList": [
                    "5765526851939992736"
                ],
                "dayPaymentAmountList": [
                    8
                ],
                "payeeCnpj": "61425848000000",
                "payerCnpj": "60.112.920/0001-23",
                "cnpjWithdrawAmount": 8,
                "cercAmount": 0
            }
        ],
        "total_num": 1,
        "total_page": 1,
        "page_size": 20,
        "page_no": 1
    }
}
```