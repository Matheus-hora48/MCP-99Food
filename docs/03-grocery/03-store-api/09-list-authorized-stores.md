<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 2121 · Grocery > Store API > List Authorized Stores -->

## List Authorized Stores

The **List Authorized Stores** endpoint provides the ability to get the authorized stores under the app in pages.
>**Note**: This endpoint has access restrictions. If you cannot invoke it, please contact us to request authorization.

### Basic Information

| **Name** | **Description** |
| --- | --- |
| `URL` | [https://openapi.99food.com/v3/auth/authorization/getAuthorizedShops](https://openapi.99food.com/v3/auth/authorization/getAuthorizedShops) |
| `Method` | POST |
| `Permission` | Available |

### Request Body Parameters

| **Name**    | **Type** | **Description**                                                                                                 | **Required** | **Example**                      |
|-------------|----------|-----------------------------------------------------------------------------------------------------------------|--------------|----------------------------------|
| `app_id`    | int      | The ID of an app in **our** system.                                                                             | Yes          | 3458764610605350993              |
| `timestamp` | int      | Timestamp of the request.                                                                                       | Yes          | 1600334446                       |
| `sign`      | string   | Signature generated as explained above. Please refer to **`Store API` > `List Bind Stores`** endpoint.           | Yes          | 23a3170ae0104c7d1cc3061b29f1138f |
| `page_no`   | int      | The page number which you want to get. **Note:** Default value is 1.                                            | No           | 1                                |
| `page_size` | int      | Number of records to display per page. **Note:** While the system allows a maximum of 50, for optimal performance and to avoid timeouts, **we recommend setting a value between 5 and 15**. | No           | 10                               |

### Response Body Parameters

| **Name**     | **Type**     | **Description**                                      | **Example** |
|--------------|--------------|------------------------------------------------------|-------------|
| `total_cnt`  | int          | The total number of shops authorized to the app.       | 35          |
| `total_page` | int          | The number of pages.                                  | 4           |
| `page_no`    | int          | The page number which you want to get.               | 1           |
| `page_size`  | int          | Number of records to display per page. | 10          |
| `shops`      | array | List of authorized shops.                     |             |

### Response Body Parameters - shops

| **Name**      | **Type**     | **Description**                         | **Example**         |
|---------------|--------------|-----------------------------------------|---------------------|
| `shop_id`     | int          | ID of the store in **our** system.      | 1152921645439779073 |
| `shop_name`   | string          | The name of the store.                  | test_store          |
| `app_shop_id` | string          | ID of the store in **your** system. **Note**: This field is only returned if the store has been successfully bound to your application.     | 1234                |
| `bound_flag`  | int          | The store has been bound (1) or not (0). | 0                   |
| `shop_phone`  | array | Phones of the store.                    |                     |

### Response Body Parameters - shop_phone

| **Name**                | **Type** | **Description**                | **Example** |
|-------------------------|----------|--------------------------------|-------------|
| `type`                 | int   | 0: Mobile phone (default); 1: Landline|0|
| `phone`                 | string   | The phone number.              |             |
| `callingCode`           | string   | The calling code of the phone. |             |


### Response Errors (errno) Descriptions

| **Code** | **Description** |
| --- | --- |
| 10001 | System error. |
| 10002 | Parameter error. |
| 10006 | Permission denied. |
| 110006 | Failed to get app information. |

### Request Example

```json
{
    "app_id": 5764607688556600000,
    "timestamp": "1758187541",
    "page_no": 1,
    "page_size": 10,
    "sign": "acf215c903e7429005c0356dc23dade8"
}
```
### Response Error Example

```json
{
    "errno": 10002,
    "errmsg": "Parameter error：the duration from the timestamp in request to now should be in 5 minutes.",
    "requestId": "s52039516a8288c4117f6fd0391dce02",
    "time": 1786939589,
    "data": {}
}
```
### Response Example

```json
{
    "errno":0,
    "errmsg":"ok",
    "requestId":"2281991a24d4db23",
    "time":1649230331,
    "data":{
        "page_no":1,
        "page_size":20,
        "total_page":1,
        "total_cnt":2,
        "shops":[
            {
                "shop_id":1152921673202184100,
                "app_shop_id":"1234",
                "shop_name":"test_shop",
                "bound_flag":1,
                "shop_phone":[
                    {
                        "type":1,
                        "phone":"07012345678",
                        "callingCode":"+506"
                    }
                ]
            },
            {
                "shop_id":3458764614711902464,
                "app_shop_id":"123",
                "shop_name":"test_shop1",
                "bound_flag":0,
                "shop_phone":[
                    {
                        "type":0,
                        "phone":"07012345678",
                        "callingCode":"+52"
                    }
                ]
            }
        ]
    }
}
```
