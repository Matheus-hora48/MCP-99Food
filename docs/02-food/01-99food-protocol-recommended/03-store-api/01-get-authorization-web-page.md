<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 1935 · Food > 99Food Protocol (Recommended) > Store API > Get Authorization Web Page -->

## Get Authorization Web Page

> **ATTENTION:**
> We use long (64-bit integer) as IDs for apps, orders and stores. So please pay attention when parsing those numbers. For example, in Node.js our orderId (5764607801871631353) will be parsed as 5764607801871631000 with lib "body-parser" or "JSON.parse()". Please use json-bigint to parse it: `var jsonBig = require('json-bigint'); jsonBig.parse(data)`.

The **Get Authorization Web Page** endpoint provides the developer the ability to get 99Food's bind store self-service web page. This is especially useful for POS partners to bind/unbind the stores without having to contact 99Food's team and send the store agreement contract.

This endpoint will return an URL you can send so store managers can authorize the binding or unbinding of a store to your app. After binding a store is important to check its status (**Store API > Set Store Status**) and it's order confirmation method (**Store API > Set Store Order Confirmation Method**). You can do these 2 configurations using our store management tool too (**Introduction > Tools Introduction > Store Management**).

> **NOTE:**
> The URL is valid for 7 days.You can send this URL to a store that is bound to another partner.  If they agree, the binding process is completed.

### Self-Service Binding and Unbinding Process

Follow these steps to use the self-service model to bind/unbind new stores to your app:

1. Call the **Get Authorization Web Page** endpoint and retrieve the URL as specified below.  

2. Send this URL to the store. Only users with super-admin permissions for that store in 99Food's system will be able to follow the steps below.  

3. After the store super-admin logs into the URL, they will see all the stores they have access to 99Food's system (as shown in the image below) and choose one to bind to application in your system by clicking in **Authorize**. It is important to guide the store manager that if they choose the wrong store, the mapping in 99Food and POS systems will not be done correctly.  

4. After binding, you can call any other API to configure the store, menus and orders and receive orders of the store.

**To unbind**, you can click unbind button (**Application Management > Store Management > Batch Store Management**)

> **NOTE:**
> You might want to check the **Store API > Bind/Unbind Store** endpoint documentation too. For binding stores in batches, check the steps in **Tools Introduction > Store Management**.

### Basic Information

| **Name** | **Description** |
| --- | --- |
| `URL` | [https://openapi.99food.com/v1/auth/authorizationpage/getUrl](https://openapi.99food.com/v1/auth/authorizationpage/getUrl) |
| `Method` | POST |
| `Permission` | Available |

### Request Body Parameters

| **Field Name** | **Field Type** | **Description** | **Mandatory** | **Example** |
| --- | --- | --- | --- | --- |
| `app_id` | long | The ID of an app in **our** system. | Yes | 3458764610605350993 |

### Response Body Parameters

| **Field Name** | **Field Type** | **Description** | **Example** |
| --- | --- | --- | --- |
| `url` | string | URL used to bind the store. | https://merchant.99app.com/pt-BR/manager/app-authorize?app_id=xxxxxxxxxxxx&enterprise_name=wangcy_Online_qualification%E2%80%94%E2%80%94Full+Business+Name12&uid=xxxxxxxxxxx&time=1756365370&sign=eb658ce65b271f2ba5aed239964e92e1&&cid=xxxxxxxx&contractorName=xxxxxxx |

### Rate Limit
| **API Name** | **Endpoint** | **Limit** |
| --- | --- | --- |
| `Get Authorization Web Page` | v1/auth/authorizationpage/getUrl |100req/1min |

### Response Errors (errno) Descriptions

| **Code** | **Description** |
| --- | --- |
| 10001 | System error. |
| 10002 | Parameter error. |
| 110006 | Get app error. |

### Response Example

```json
{
    "errno":0,
    "errmsg":"OK",
    "traceId":"22c1eb112fa67130",
    "data":{
        "url":"https://merchant.99app.com/pt-BR/manager/app-authorize?app_id=xxxxxxxxxxxx&enterprise_name=wangcy_Online_qualification%E2%80%94%E2%80%94Full+Business+Name12&uid=xxxxxxxxxxx&time=1756365370&sign=eb658ce65b271f2ba5aed239964e92e1&&cid=xxxxxxxx&contractorName=xxxxxxx"
    }
}
```