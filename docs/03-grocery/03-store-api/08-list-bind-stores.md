<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 2119 · Grocery > Store API > List Bind Stores -->

## List Bind Stores

The **List Bind Stores** endpoint returns a list of stores that are bound to your application. The response will contain a list of shops, each including fields such as `app_id`, `shop_id`, `app_shop_id`, `city_id`, and `token_expiration_time`. For this endpoint, you’ll need to provide a signature, so read below how to do this.

### Signature Algorithm

**Filter and Sort:**
Obtain all the request parameters, excluding byte type parameters such as files and byte streams. Delete signature parameters with empty value and then sort the key of the ASCII code in accordance to the first character from A to Z. If the first character is the same, then it shall be sorted from the second character from A to Z and so on.

**Splice:**
After sorting the parameters and their corresponding values, create the format "parameter=parameter value" and connect the parameters with the character "&". After splicing the parameters, add "{$app_secret}" in the string end. This created format or sting shall be herein referred to as "signature string".


#### PhP Example to Generate a Sign

```php
$params = [
    'app_id' => 3458764573578035295,
    'page_size' => 30,
    "page_no" => 1,
    'timestamp' => time(),
];
$app_secret = '87b69bab1a1548c1516189a5fb75e705';
ksort($params);

$signArr = [];
foreach ($params as $k => $v) {
    $signArr[] = $k . '=' . $v;
}
$toSign = implode('&', $signArr) . $app_secret;
$sign = md5($toSign);

print_r($params["timestamp"] . "\n"); 
// 1623814795
print_r("toSign: " . $toSign . "\n"); 
// toSign: app_id=3458764573578035295&page_no=1&page_size=30&timestamp=162381479587b69bab1a1548c1516189a5fb75e705
print_r("sign: " . $sign . "\n");
// sign: d471c1f850ab312a703ac9611bdee25a
```

```javascript
const CryptoJS = require('crypto-js'); // 如果在浏览器环境，可通过 <script> 标签引入

/**
 * Generates an API signature by sorting parameters, concatenating them with the secret, and computing MD5.
 *
 * @param {Object} params - The request parameters object.
 * @param {string} appSecret - The application secret key.
 * @returns {string} The 32-character lowercase MD5 signature string.
 */
function generateSign(params, appSecret) {
    if (!params || typeof params !== 'object') {
        return '';
    }

    // 1. Sort parameters by key in ascending ASCII order
    // Object.keys returns an array of keys, which we then sort
    const sortedKeys = Object.keys(params).sort();

    // 2. Build the string to sign: "key1=value1&key2=value2...{secret}"
    const signArr = [];
    for (const key of sortedKeys) {
        const value = params[key];
        
        // Skip null or undefined values to ensure consistency
        if (value === null || value === undefined) {
            continue;
        }

        // Append key=value pair
        signArr.push(`${key}=${value}`);
    }

    // Join with '&' and append the secret key at the end
    const toSign = signArr.join('&') + appSecret;

    // 3. Compute MD5 hash
    // CryptoJS.MD5 returns a WordArray, toString() converts it to hex string
    const sign = CryptoJS.MD5(toSign).toString();

    return sign;
}

// --- Test Case ---
// Simulating the PHP code's data
const params = {
    'app_id': 3458764573578035295, // Note: JS Number can safely handle this integer
    'page_size': 30,
    'page_no': 1,
    'timestamp': 1623814795 // Fixed timestamp for verification
};

const appSecret = '87b69bab1a1548c1516189a5fb75e705';

const sign = generateSign(params, appSecret);

console.log("toSign: " + "app_id=3458764573578035295&page_no=1&page_size=30&timestamp=1623814795" + appSecret);
console.log("sign: " + sign);
// Expected output: d471c1f850ab312a703ac9611bdee25a
```

### Basic Information

| **Name** | **Description** |
| --- | --- |
| `URL` | [https://openapi.99food.com/v1/shop/shop/list](https://openapi.99food.com/v1/shop/shop/list) |
| `Method` | POST |
| `Permission` | Available |

### Request Body Parameters

| **Field Name** | **Field Type** | **Description** | **Required** | **Sample** |
| --- | --- | --- | --- | --- |
| `app_id` | long | The ID of an app in **our** system. | Yes | 3458764610605350993 |
| `timestamp` | int | Timestamp of the request | Yes | 1600334446 |
| `sign` | string | Signature generated as explained above | Yes | "23a3170ae0104c7d1cc3061b29f1138f" |
| `page_no` | int | Page number | No  | 1   |
| `page_size` | int | Number of records to display per page. Max: 100 | No  | 30  |

### Response Body Parameters

| **Name**     | **Type**     | **Description**                                      | **Example** |
|--------------|--------------|------------------------------------------------------|-------------|
| `total_cnt`  | int          | The total number of shops bound to the app.       | 35          |
| `total_page` | int          | The number of pages.                                  | 4           |
| `page_no`    | int          | The page number which you want to get.               | 1           |
| `page_size`  | int          | Number of records to display per page. | 10          |
| `shops`      | array | List of shops currently bound to the application.                     |             |

### Response Body Parameters - shops

| **Name**      | **Type**     | **Description**                         | **Example**         |
|---------------|--------------|-----------------------------------------|---------------------|
| `shop_id`     | int          | ID of the store in **our** system.      | 1152921645439779073 |
| `shop_name`   | string          | The name of the store.                  | test_store          |
| `app_shop_id` | string          | ID of the store in **your** system.     | 1234                |
| `bound_flag`  | int          | The store has been bound (1) or not (0). | 0                   |
| `shop_phone`  | array | Phones of the store.                    |                     |

### Response Body Parameters - shop_phone

| **Name**                | **Type** | **Description**                | **Example** |
|-------------------------|----------|--------------------------------|-------------|
| `type`                  | int      | 0: Mobile phone (default); 1: Landline.|0|
| `phone`                 | string   | The phone number.              |             |
| `callingCode`           | string   | The calling code of the phone. |             |


### Response Errors (errno) Descriptions

| **Code** | **Description** |
| --- | --- |
| 10001 | System error. |
| 10002 | Parameter error. |
| 10100 | Get `auth_token` failed. |
| 10102 | `auth_token` has expired. Please refresh it. |


#### Request Example

```json
{
    "app_id": 5764607661272700000,
    "sign":"cb9feb16b0f0231bf56b8af623600070",
    "timestamp": 1758271700,
    "page_no": 1,
    "page_size": 10
}
```

#### Response Error Example

```json
{
    "errno": 10002,
    "errmsg": "Parameter error：the duration from the timestamp in request to now should be in 5 minutes.",
    "requestId": "s52051536a8287110c4506dd8f3f3502",
    "time": 1786939154,
    "data": {}
}
```

#### Response Example

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
