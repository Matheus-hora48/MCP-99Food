<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 1923 · Food > 99Food Protocol (Recommended) > API Guide > API Rate Limit -->

## API Rate Limit

Rate limit refers to the maximum number of requests that a single application can make within the time period. When the application request exceeds the limit, the API request will fail and return error code.

## API Limit Table
Please refer to the specific rate limits applicable to each module below

### Authorization API 
| **API Name** | **Endpoint** | **Limit** |
| --- | --- | --- |
| `Get Authtoken` | v1/auth/authtoken/get | 1req/30s |
| `Refresh Authtoken` | v1/auth/authtoken/refresh | 1req/30s |
| `Get Authorization Web Page` | v1/auth/authorizationpage/getUrl |100req/1min |

### Store API 
| **API Name** | **Endpoint** | **Limit** |
| --- | --- | --- |
| `Bind Store` | v3/auth/authorization/shopBind | 1req/1s |
| `Unbind Store` | v1/shop/shop/unbind | 1req/1min |
| `Set Store Order Confirmation Method` | v1/shop/shop/setconfirmmethod | 1req/1min |
| `Get Store Details` | v1/shop/shop/detail | 1req/1min |
| `Update Store Information` | v1/shop/shop/update | 1req/1min |
| `Get Store Categories` | v1/shop/shop/validCategories | 100req/1min |
| `Set Store Status` | v1/shop/shop/setStatus | 1req/1min |
| `Set Store Cancellation/Refund` | v1/shop/apply/set | 1req/1min |
| `Add Delivery Area` | v1/shop/deliveryArea/add | 10req/1min |
| `Update Delivery Area` | v1/shop/deliveryArea/update | 10req/1min |
| `Delete Delivery Area` | v1/shop/deliveryArea/delete | 3req/1min|
| `Get the Delivery Area` | v1/shop/deliveryArea/list | 3req/1min |
| `List Bind Stores` | v1/shop/shop/list | 1req/20s |
| `List Authorized Stores` | v3/auth/authorization/getAuthorizedShops | 1req/1s |


### Menu API
 | **API Name** | **Endpoint** | **Limit** |
| --- | --- | --- |
| `Get Store Menu Details` | v3/item/item/list | 1req/1min |
| `Upload Store Menu Details` | v3/item/item/upload | 1req/1min |
| `Get Menu Upload Task Info` | v1/item/item/getMenuTaskInfo | 100req/1min |
| `Update One Item` | v3/item/item/updateItem | 10req/5s |
| `Update Item Status` | v3/item/item/updateItemStatus | 10req/1s |
| `Update Modifier Group` | v3/item/item/updateModifierGroup | 10req/5s |
| `Upload Image` | v3/image/image/uploadImage | 5req/10s |
| `Get Image Url List` | v3/image/image/getImageUploadInfoPageList | 10req/10s |

### Order API
 | **API Name** | **Endpoint** | **Limit** |
| --- | --- | --- |
| `Get Order Details` | v1/order/order/detail | 10req/10s |
| `Confirm Order` | v1/order/order/confirm | 5req/1s |
| `Order Ready` | v1/order/order/ready | 5req/1s |
| `Order Delivered` | v1/order/order/delivered | 5req/1s |
| `Cancel Order` | v1/order/order/cancel | 5req/1s |
| `Handle Cancellation Requests` | v1/order/apply/cancel | 5req/1s |
| `Handle Refund Requests` | v1/order/apply/refund | 5req/1s |
| `Confirm Cash Payment` | v1/order/order/payConfirm | 5req/1s |

### Financial API
 | **API Name** | **Endpoint** | **Limit** |
| --- | --- | --- |
| `Get Financial API Authtoken` | v3/auth/authtoken/signIn | 100req/1min |
| `Get Bill Data` | v3/finance/finance/getShopBillDetail |100req/1min |
| `Get Settlements Data` | v3/finance/finance/getShopBillWeek | 100req/1min |

