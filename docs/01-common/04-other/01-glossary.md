<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 1905 · Common > Other > Glossary -->

## Glossary

| **Term** | **Description** |
| --- | --- |
| AppID/DeveloperID | ID of an application in 99Food's system. |
| Application | The service developed with APIs in 99Food's system. |
| AppName/DeveloperName | The name of the application in 99Food's system. Please check how to format the name in the **Application Management** topic, on the **Tools Introduction** section. |
| `app_shop_id` | ID of a store in the partner's system. |
| Authorize | The merchant authorizes its own store to the developer's application, but further binding operations are required. |
| `authtoken` | A credential created with the `app_id`, `secret` and `app_shop_id`. Used in many shop/store APIs. Each store has a unique token, which has a validity period and needs to be refreshed regularly. |
| B-App/99Food Store App | 99Food merchant's store application compatible with Windows, Android, and [web version](https://didi-food.com/en-US/store/pc/item/manage)|
| Bind | Complete the mapping relationship between the store IDs of both parties by mapping `shop_id` to `app_shop_id`. At this time, the store is deemed to be officially online. |
| C-App/99Food App | 99Food's app for customers available for iOS and Android. Can be downloaded in Google Play or Apple Store for mobile phones and tablets. |
| Company/Developer | The person, company or organization that is responsible for integrating our system. |
| Entity | A person, company or organization that has the administrator permission of a certain store in our system. |
| KA  | Key Account |
| KP  | Key Contact Person |
| OpenAPI | The interfaces to integrate our platform. |
| Partner | The party that is integrating to 99Food's Open Platform. |
| POS | Point of Sales |
| `secret` | Key for the Application to get the store's authtoken. |
| `shop_id` | ID of a store in 99Food's system. |
| Store/Shop | We call a store or shop the establishment that offers dishes/products on 99Food’s platform. |
| Unbind | Break off the relationship between ShopID and AppShopID. |

