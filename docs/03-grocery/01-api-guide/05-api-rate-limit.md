<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 2091 · Grocery > API Guide > API Rate Limit -->

## API Rate Limit

Rate limit refers to the maximum number of requests that a single application can make within the time period. When the application request exceeds the limit, the API request will fail and return error code.

## API Limit Table
Please refer to the specific rate limits applicable to each module below

### Store API 
| **API Name** | **Endpoint** | **Limit** |
| --- | --- | --- |
| `Get Authorization Webpage` | v1/auth/authorizationpage/getUrl | 15req/30s |
| `Bind Store` | v3/auth/authorization/shopBind | 1req/1s |
| `Unbind Store` | v1/shop/shop/unbind | 1req/1min |
| `Set Store Order Confirmation Method` | v1/shop/shop/setconfirmmethod | 1req/1min |
| `Get Store Details` | v1/shop/shop/detail | 1req/1min |
| `Update Store Info` | v1/shop/shop/update | 1req/1min |
| `Set Store Status` | v1/shop/shop/setStatus | 1req/1min |
| `List Bind Stores` | v1/shop/shop/list | 1req/20s |
| `List Authorized Stores` | v3/auth/authorization/getAuthorizedShops | 1req/1s |

### Menu API
 | **API Name** | **Endpoint** | **Limit** |
| --- | --- | --- |
| `Upload Grocery Menu Details` | v3/item/item/uploadGrocery | 1req/4h |
| `Batch Add/Update Grocery Items` | v3/item/item/updateItems | 1req/20min |
| `Delete Multiple Items` | v3/item/item/delItem | 1req/20min |
| `Batch Delete Multiple Categories` | v3/item/item/delCate | 1req/20min |
| `Get Full Menu Detail` | v3/item/item/menu | 2req/2min |
| `Get Grocery Menu Upload Task Info` | v3/item/item/getGroceryMenuTaskInfo | 1req/5s |
| `Stock API` | v1/item/item/setstockSync | 1req/60s |
| `Upload Grocery Promo Activity` | v1/promo/promo/uploadGrocery | 1req/8h |

### Order API
 | **API Name** | **Endpoint** | **Limit** |
| --- | --- | --- |
| `Order Polling` | v1/order/events/list | 15req/30s |
| `Acknowledgment` | v1/order/events/ack | 15req/30s |
| `Get Order Details` | v1/order/order/detail | 10req/10s |
| `Confirm Order` | v1/order/order/confirm | 5req/1s |
| `Order Ready` | v1/order/order/ready | 5req/1s |
| `Order Delivered` | v1/order/order/delivered | 5req/1s |
| `Cancel Order` | v1/order/order/cancel | 5req/1s |
| `Handle Cancellation Requests` | v1/order/apply/cancel | 5req/1s |
| `Handle Refund Requests` | v1/order/apply/refund | 5req/1s |
| `Order Verification` | v1/order/order/verify | 3req/1s |
| `Confirm Cash Payment` | v1/order/order/payConfirm | 5req/1s |
| `Order Partial Cancel` | v3/order/operate/partialCancel | 5req/1s |
| `Adjust Order Items` | v3/order/operate/adjustItem | 5req/1s |

### Financial API
 | **API Name** | **Endpoint** | **Limit** |
| --- | --- | --- |
| `Get Financial API Authtoken` | v3/auth/authtoken/signIn | 100req/1min |
| `Get Bill Data` | v3/finance/finance/getShopBillDetail |100req/1min |
| `Get Settlements Data` | v3/finance/finance/getShopBillWeek | 100req/1min |

