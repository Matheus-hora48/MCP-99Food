<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 1937 · Food > 99Food Protocol (Recommended) > Store API > Bind Store -->

## Bind Store

The **Bind Store** endpoints give you the ability to bind a store to your app when needed, without having to request it from 99Food’s team. The **Bind Store** endpoint provides the ability to bind 50 stores at the same time.
- Access to this endpoint is controlled. If you are unable to use it, please contact us.

> **IMPORTANT:**
> - **Production Environment Only:** This endpoint is **only available in the production environment**. It cannot be tested or used in the test environment.
> - **For POS developers**, we recommend using the self-service method detailed in **Authorization API > Get Authorization Web Page**.
> - **For bulk operations**, please use the tools provided under **Introduction > Tools Introduction > Store Management**.
> - **After stores are bound**, the default order acceptance method will be B-App & API. To change this configuration, refer to **Store API > Set Store Order Confirmation Method**.



### Basic Information

| **Name** | **Description** |
| --- | --- |
| `URL` | [https://openapi.99food.com/v3/auth/authorization/shopBind](https://openapi.99food.com/v3/auth/authorization/shopBind) |
| `Method` | POST |
| `Permission` | Available |

### Request Body Parameters

| **Name**     | **Type**      | **Description**                                                                                       | **Required** | **Example**                      |
|--------------|---------------|-------------------------------------------------------------------------------------------------------|--------------|----------------------------------|
| `app_id`     | int           | The ID of an app in **our** system.                                                                   | Yes          | 3458764610605350993              |
| `timestamp`  | int           | Timestamp of the request.                                                                             | Yes          | 1600334446                       |
| `sign`       | string        | Signature generated as explained above. Please refer to **`Store API` > `List Bind Stores`** endpoint. | Yes          | 23a3170ae0104c7d1cc3061b29f1138f |
| `shop_infos` | array | Stores that you want to bind. **Note:** Supported maximum of `shop_infos` is 50.                       | Yes          |                                  |

### Request Body Parameters - shop_infos

| **Name**      | **Type**      | **Description**                                                                                                                                                                                                                       | **Required** | **Example**         |
|---------------|---------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------|---------------------|
| `shop_id`     | int           | The **unique** store identifier in **our** system. **Constraints:** 1. **Must not be duplicate or blank**; 2. The store must be **unbound** when calling this endpoint. To check whether a store is bound, use **`Store API` > `List Authorized Stores`** endpoint. | Yes          | 1152921645439779073 |
| `app_shop_id` | string           | The **unique** store identifier in **your** system. **Note:** Each `app_shop_id` must form a one-to-one mapping with the `shop_id` in our system, and **must not be duplicate or blank**.| Yes          | 001                 |

### Response Body Parameters

| **Name**       | **Type**     | **Description**                      | **Example**         |
|----------------|--------------|--------------------------------------|---------------------|
| `failure_list` | array | A list of stores that failed to bind, along with the failure reason.   | |
| `success_list` | array | A list of stores that were successfully bound, including their authorization credentials. |   |

### Response Body Parameters - failure_list

| **Name**      | **Type** | **Description**                      | **Example**                        |
|---------------|----------|--------------------------------------|------------------------------------|
| `shop_id`     | int      | The **unique** store identifier in **our** system.  | 1152921645439779073                |
| `app_shop_id` | string      | The **unique** store identifier in **your** system. | 001                                |
| `reason`      | string   | The reason why the binding failed.   | app_shop_id couldn't be duplicate. |

### Response Body Parameters - success_list

| **Name**                 | **Type** | **Description**                               | **Example**                                  |
|--------------------------|----------|-----------------------------------------------|----------------------------------------------|
| `shop_id`                | int      | The **unique** store identifier in **our** system.            | 1152921645439779073                          |
| `app_shop_id`            | string      | The **unique** store identifier in **your** system. | 001                                          |
| `auth_token`             | string   | The auth_token for the store.                  | ZGQ5ZjVlZGUyYmFhNDM2ZmE0ZDA5OTE5ZjI1YzBhNjU= |
| `token_expiration_time`  | int      | Timestamp of the expire time of `auth_token`. | 1648685070                                   |

### Response Errors (errno) Descriptions

| **Code** | **Description** |
| --- | --- |
| 10001 | System error. |
| 10002 | Parameter error. |
| 10006 | Permission denied. |


### Response Example

```json
{
  "failure_list":[
    {
      "app_shop_id":"1234",
      "reason":"app_shop_id couldn't be duplicate",
      "shop_id":1152921673202184100
    },
    {
      "app_shop_id":"1234",
      "reason":"app_shop_id couldn't be duplicate",
      "shop_id":1152921673202184101
    }
  ],
  "success_list":[
    {
      "app_shop_id":"123",
      "auth_token":"NGQyYWVlYmNkZTQ1NGI2Y2YxOTI5OGVkZWJhMGM0ODI=",
      "shop_id":3458764614711902464,
      "token_expiration_time":1648685070
    }
  ]
}
```
