<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 1925 · Food > 99Food Protocol (Recommended) > API Guide > Authentication & Signature Mechanism -->

## Authentication & Signature Mechanism

### Security & Authentication

To ensure the integrity and security of the data exchanged, the 99Food Open Platform uses a signature mechanism based on MD5 hashing. This section covers two distinct security processes:

1. **Signing API Requests**: How to generate a signature to authenticate your calls to 99Food.
2. **Verifying Webhooks**: How to validate that notifications (like order updates) actually came from 99Food.


#### Signature Verification Example
```
//{POST BODY Raw} Get from HTTP request
 //{APP SECRET} Get from the email when you receive your credentials or in Application Management. Read more in the Tools Introduction section.
 //signStr is spliced by {POST BODY Raw} and {APP SECRET}
 //php
 signStr = {POST BODY Raw} . {APP SECRET}
 //js/golang/python/java
 signStr = {POST BODY Raw} + {APP SECRET}
 checkSign = MD5(signStr);
 if (checkSign == {didi-header-sign}){
     return true;
 } else {
     return false;
 }
```
###### didi-header-sign: 202cb962ac59075b964b07152d234b70

### Signature Algorithm

**Filter and Sort**: Obtain all the request parameters, but does not include byte type parameters such as file, byte stream. Delete signature parameters with empty value and then sort the key of the ASCII code in accordance to the first character from A to Z. If the first character is the same, then it shall be sorted from the second character from A to Z and so on.

**Splice**: After sorting the parameters and their corresponding values, create the format "parameter=parameter value" and connect the parameters with the character "&". After splicing the parameters, add "{$app_secret}" in the string end. This created format or sting shall be herein referred to as "signature string".

#### PhP Example to Generate a Sign

```
$params = [
    'app_id' => 12345,
    'page_size' => 30,
    "page_no" => 1,
    'timestamp' => time(),
];
$app_secret = '1234567890abcdef1234567890abcdef';
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
// toSign: app_id=12345&page_no=1&page_size=30&timestamp=162381479587b69bab1a1548c1516189a5fb75e705
print_r("sign: " . $sign . "\n");
// sign: d471c1f850ab312a703ac9611bdee25a
```
> Due to PHP's type casting behavior, sending an array will cause the parameter to be interpreted as the literal string "Array" in the signature calculation (shop_infos = Array). 

#### JavaScript Example to Generate a Sign 

```
const crypto = require('crypto');

const params = {
    'app_id': '12345', // String to avoid integer precision loss
    'page_size': 30,
    'page_no': 1,
    'timestamp': 1623814795
};

const app_secret = '1234567890abcdef1234567890abcdef';

// 1. Sort keys alphabetically (PHP ksort equivalent)
const sortedKeys = Object.keys(params).sort();

// 2. Format as "key=value"
const signArr = [];
sortedKeys.forEach(key => {
    signArr.push(`${key}=${params[key]}`);
});

// 3. Join with '&' and append secret
const toSign = signArr.join('&') + app_secret;

// 4. Generate MD5
const sign = crypto.createHash('md5').update(toSign).digest('hex');

// Output
console.log(params.timestamp);
console.log("toSign: " + toSign);
console.log("sign: " + sign);
```

#### Python Example to Generate a Sign 

```
import time
import hashlib

params = {
    'app_id': '12345',
    'page_no':1,
    'page_size':10,
    "timestamp": int(time.time()), # Use int(time.time()) for a UNIX timestamp
}

app_secret = '1234567890abcdef1234567890abcdef'

# Sort the parameters by key
sorted_params = sorted(params.items())

sign_arr = []
for k, v in sorted_params:
    if isinstance(v, dict) or isinstance(v,list):
        sign_arr.append(f"{k}=Array")
    else:
        sign_arr.append(f"{k}={v}")

to_sign = '&'.join(sign_arr) + app_secret
sign = hashlib.md5(to_sign.encode('utf-8')).hexdigest()

print(f"Parameters: {params}")
print(f"String to sign: {to_sign}")
print(f"Generated sign: {sign}")
```

#### Java Example to Generate a Sign 

```
import java.util.*;
import java.security.MessageDigest;

public class SignatureExample {
    public static void main(String[] args) {
        try {
            // 1. Setup params
            // TreeMap automatically sorts keys alphabetically (like PHP ksort)
            Map<String, String> params = new TreeMap<>();
            params.put("app_id", "12345"); // String to preserve precision
            params.put("page_size", "30");
            params.put("page_no", "1");
            params.put("timestamp", "1623814795");

            String appSecret = "1234567890abcdef1234567890abcdef";

            // 2. Build string (key=value)
            List<String> signList = new ArrayList<>();
            for (Map.Entry<String, String> entry : params.entrySet()) {
                signList.add(entry.getKey() + "=" + entry.getValue());
            }

            // 3. Concatenate with '&' and append secret
            String toSign = String.join("&", signList) + appSecret;

            // 4. Generate MD5 Hash
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] hashBytes = md.digest(toSign.getBytes("UTF-8"));

            // Convert bytes to hex string
            StringBuilder sb = new StringBuilder();
            for (byte b : hashBytes) {
                sb.append(String.format("%02x", b));
            }
            String sign = sb.toString();

            // Output
            System.out.println(params.get("timestamp"));
            System.out.println("toSign: " + toSign);
            System.out.println("sign: " + sign);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```