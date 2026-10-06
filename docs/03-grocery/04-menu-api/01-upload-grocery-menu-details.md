<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 2127 · Grocery > Menu API > Upload Grocery Menu Details -->

## Upload Grocery Menu Details

The Upload Grocery Menu Details endpoint updates, merges or overwrites an existing catalogue/menu with an async task in the background.
> **IMPORTANT:**
> * This system allows for two levels of nested categories. If a category already contains subcategories (level 2), the top-level category (level 1) cannot have items directly within it. In other words, on the same level within a category, you can either have subcategories or items, but not both.
> * For merchants integrated with the platform's item library, uploading categories is optional (can be left empty) as categorization is managed on the 99 Platform side.
> * For merchants not integrated with the item library, they need to transmit the corresponding category listed in the whitelist.
> * For the specific categories included in the whitelist, please contact the 99 integration team.
>
> **ATTENTION:**
> * We will transport **ONLY** app_item_id, app_external_id to an order.


### Basic Information

| **Name** | **Description** |
| --- | --- |
| `URL` | [https://openapi.99food.com/v3/item/item/uploadGrocery](https://openapi.99food.com/v3/item/item/uploadGrocery) |
| `Method` | POST |
| `Permission` | Available |


### Request Body Parameters - Level 1
This is the first level of the menu configuration for a grocery.

| **Name** | **Type** | **Required** | **Description**                                                                                                                                                                                   | **Example** |
| --- | --- | --- |---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| --- |
| `auth_token`  | string  | Yes  | The auth_token for the shop                                                                                                                                                                       | ZGQ5ZjVlZGUyYmFhNDM2ZmE0ZDA5OTE5ZjI1YzBhNjU=  |
| `menus`  | list[struct]  | Yes  | A list of catalogue/menu. Currently, only one catalogue/menu is supported. Multiple catalogue/menu will be mapped to 1                                                                            | [{menu1}]  |
| `categories`  | list[struct]  | Yes  | A list of the Grocery’s catalogue/menu categories Maximum of categories is 50. Maximum of subcategory per category is 30.                                                                         | [{"app_category_id":"cate1","category_name":"cate1","app_item_ids":[],"sub_category_ids":["cate2"]},{"app_category_id":"cate2","category_name":"cate2","app_item_ids":["item_1"],"sub_category_ids":[]}]  |
| `items`  | list[struct]  | Yes  | List of the grocery’s items. Each item must belong to one category. Maximum of items under category is 8000. Maximum of all items under store is 30000.                                           | [{item1}, {item2}]  |
| `merge_policy`  | int  | No  | The following menu update methods are currently supported: 1—Overwrite existing menu [Recommended], 0—Merge menus. If no value is provided, merge_policy defaults to 1 (overwrite existing menu). | 1  |

### Request Body Parameters - Menus
The identifiers of different catalogue/menus.

| **Name** | **Type** | **Required** | **Description** | **Example** |
| --- | --- | --- | --- | --- |
| `app_menu_id`  | string  | Yes  | ID for the catalogue/menu, provided by the Store or POS.currently only one catalogue/menu supported.  | menuID01  |
| `menu_name`  | string  | Yes  | catalogue/menu name to be displayed. Map directly. Max length: 100 characters  | Main catalogue/menu  |

### Request Body Parameters - Categories
You can create categories for types of dishes, drinks and deserts, for example.

| **Name** | **Type** | **Required** | **Description** | **Example** |
| --- | --- | --- | --- | --- |
| `app_category_id`  | string  | Yes  | ID for the category, provided by the Grocery. Map directly.  | Hamburguesas01  |
| `category_name`  | string  | Yes  | The category name to be displayed. Map directly. Max length: 28 characters. exceeding the limit may result in an incomplete display.  | Hamburguesas  |
| `app_item_ids`  | list[string]  | No  | All of the IDs for the items provided by the Grocery. The sequence of the items is shown in the same sequence. Each app_item_id should be unique.  | ["cola01", "wine02"]  |
| `sub_category_ids`  | list[string]  | No  | The list of categories that are subsidiary to this category .  | ["cate2","cate3"]  |
> **ATTENTION:**Subcategories and items which are directly bound to the parent-category cannot exist at the same time. In other words, items cannot be directly bound to a category when the category has its subcategory.

### Request Body Parameters - Items
Individual objects that can be ordered and configured to be visible in specific days, times and special dates.
> **Promotion Setting with the Catalogue/Menu Upload:**
> Promotions is a very important tool that can help to boost sales and obtain more attention from the users in the APP. With the purpose to provide a more efficient manner to set promotions, DiDiFood is providing a promo setting feature available from Sept. 8th, 2023 for the store to set up promotions directly from the catalogue/menu by providing a non-mandatory key activity_price
> Important:
> * The structure for activity_price is non-mandatory. However, if you choose not to configure any promotion, please refrain from sending this key or provide it with a value of 'Null' to prevent any misunderstandings. DiDiFood does not recognize '0' as a valid value for this key.
> * In cases where activity_price exceeds the price, DiDiFood will interpret that no promotion is applied to the item.
> * The difference between the price and activity_price must be equal to or greater than 1%.
> * Promotions are NOT permitted for items tagged as with Tabacco.
> * Prior to configuring a promotion through this API method, any existing promotions set in B-App or through DiDiFood's internal system must be canceled.
> * In the event that an item with a previous promotion configured in B-App or through DiDiFood's internal system undergoes a change in price, the price will be updated, but the previously configured promotion will continue to be effective for users based on the new price set.
> * To delete or modify a promotion (which was previously set through API), simply adjust the values of price and activity_price, and then submit the updated catalogue/menu through this API. It is NOT possible to delete or modify a promotion of an item which promotion that was set in B-App or through DiDiFood's internal system.
> * All promotions established through this method are fully assumed by the store/brand. Therefore, it is crucial to have the necessary permissions granted in the operational interface. Under no circumstances may the store/brand make claims against DiDiFood for the promotions set using this method.

| **Name** | **Type** | **Required** | **Description** | **Example** |
| --- | --- | --- | --- | --- |
| `app_item_id`  | string  | Yes  | All of the IDs for the items provided by the Store. Each app_item_id should be unique for each item  | Hamburguesas01  |
| `upc`  | string  | Yes  | The barcode or UPC of the item. This field is extremely important as DiDiFood uses it to map the corresponding items in our item database. Max 14 digits  | Hamburguesas01  |
| `app_external_id`  | string/json  | No  | Free-form text field reserved for the Grocery's use, e.g. for Grocery integrations Info  | {"key":"value"}  |
| `item_name`  | string  | Yes  | Item name to be displayed. Max length: 50 characters.  | Hamburguesas  |
| `short_desc`  | string  | No  | An optional description for the Item. Max length: 400 characters.  | null  |
| `sold_info_intl`  | list[struct]  | No  | Sales period per day. The continuous time span during which the item is available. Check below for more details.  |   |
| `head_img`  | string  | No  | The URL for the item’s image. Requirements: Hosted on a secure connection (SSL); File size with less than 10MB; Min. width and height: 150px; Max. width and height: 3000px. Formats supported: JPEG, PNG  | https://imgurl.host/static/rlabtest/  |
| `price`  | int  | Yes  | The price to charge for ordering the item. Note: Price is always an integer value (never decimals) because the price is set in the lowest denomination (e.g. cents for MX currency, not Peso).  | 100  |
| `activity_price`  | int  | No  | Is the discounted price that will be charged to the user. Note: Price is always an integer value (never decimals) because the price is set in the lowest denomination (e.g. cents for MX currency, not Peso). For more details please see above in promotion setting notes  | 80  |
| `item_tags`  | list[int]  | No  | The tags of the item. 1 TOBACCO 2 WINE 4 SEX PRODUCT 6 PRESCRIPTIONDRUG (e.g. "1", "2","4")  | [1]  |
| `stock`  | int  | No  | item stock | 10  |
| `status`  | int  | Yes  | Status of the item to be shown in C-App. 1: Available; 2: Unavailable  | 1  |

#### Sold_info_intl Example
* From 08:00 to 20:00 on Mondays, Tuesdays and Wednesdays.
* The whole day on Saturdays and Sundays.
* From 10:00 to 12:00 and from 14:00 to 16:00 on 2020-12-20.
* The whole day on 2020-12-25.


```json
[
    {
        "time":[
            {
                "begin":"08:00",
                "end":"20:00"
            }
        ],
        "day":[
            1,
            2,
            3
        ],
        "specialDay":[

        ]
    },
    {
        "time":[

        ],
        "day":[
            6,
            7
        ],
        "specialDay":[

        ]
    },
    {
        "time":[
            {
                "begin":"10:00",
                "end":"12:00"
            },
            {
                "begin":"16:00",
                "end":"18:00"
            }
        ],
        "day":[

        ],
        "specialDay":[
            "2020-12-20"
        ]
    },
    {
        "time":[

        ],
        "day":[

        ],
        "specialDay":[
            "2020-12-25"
        ]
    }
]
```

### Complete Request Example
```json
{
  "auth_token": "Y2MyMzNhOThhNzYyMGQ3M2M1NTM0ZDlhY2RmYzM3NGE=",
  "menus": [
    {
      "menu_name": "Grocery_sample_1",
      "app_menu_id": "Grocery DiDiFood Sample",
      "app_category_ids": [
        "Cate_Grocery_1",
        "Cate_Grocery_2"]
    }
  ],
  "categories": [
    {
      "app_category_id": "Cate_Grocery_1",
      "category_name": "Bebidas",
      "app_item_ids": [
        "sample_item_1",
        "sample_item_2",
        "sample_item_3"
      ]
    },
    {
      "app_category_id": "Cate_Grocery_2",
      "category_name": "Comida Refrigerada",
      "app_item_ids": [
        "sample_item_4",
        "sample_item_5",
        "sample_item_6"
      ]
    }
  ],
  "items": [
    {
      "item_name": "Coca Cola 355ml",
      "upc": "12345",
      "short_desc": "Sweet black coca drink in can of 355ml",
      "price": 1000,
      "activity_price": 800,
      "status": 1,
      "head_img": "http://10.14.128.20:8002/static/soda_public/img_20d753636d0a36364e6b43507389b58c.jpg",
      "app_item_id": "sample_item_1",
      "sold_info_intl": [
                {
                    "time":[
                        {
                            "begin":"09:00",
                            "end":"19:00"
                        }
                    ],
                    "day":[
                        1,
                        2,
                        3
                    ]
                },
                {
                    "time":[
                        {
                            "begin":"10:00",
                            "end":"18:00"
                        }
                    ],
                    "day":[
                        4,
                        5,
                        6,
                        7
                    ]
                }],
      "item_tags": [],
      "stock": 10
    },
    {
      "item_name": "Sprite 355ml",
      "upc": "23456",
      "short_desc": "Sweet white lemon flavored drink in can of 355ml",
      "price": 2000,
      "activity_price": 1900,
      "status": 2,
      "app_item_id": "sample_item_2",
      "head_img": "http://10.14.128.20:8002/static/soda_public/img_20d753636d0a36364e6b43507389b58c.jpg",
      "sold_info_intl": [],
      "item_tags": []
    },
    {
      "item_name": "Corona 355ml",
      "upc": "34567",
      "short_desc": "Corona branded beer in can 355ml",
      "price": 4000,
      "status": 1,
      "app_item_id": "sample_item_3",
      "head_img": "http://10.14.128.20:8002/static/soda_public/img_20d753636d0a36364e6b43507389b58c.jpg",
      "sold_info_intl": [],
      "item_tags": [1]
    },
    {
      "item_name": "Rib Eye",
      "upc": "45678",
      "short_desc": "1 Pc Fresh Rib Eye",
      "price": 10000,
      "status": 1,
      "head_img": "http://10.14.128.20:8002/static/soda_public/img_20d753636d0a36364e6b43507389b58c.jpg",
      "app_item_id": "sample_item_4",
      "sold_info_intl": [],
      "item_tags": []
    },
    {
      "item_name": "T-bone",
      "upc": "56789",
      "short_desc": "2 Pc Fresh T-bone",
      "price": 35000,
      "status": 1,
      "head_img": "http://10.14.128.20:8002/static/soda_public/img_20d753636d0a36364e6b43507389b58c.jpg",
      "app_item_id": "sample_item_5",
      "sold_info_intl": [],
      "item_tags": []
    },
    {
      "item_name": "Cowboy",
      "upc": "78901",
      "short_desc": "3 Pc Fresh Cowboy",
      "price": 60000,
      "status": 1,
      "head_img": "http://10.14.128.20:8002/static/soda_public/img_20d753636d0a36364e6b43507389b58c.jpg",
      "app_item_id": "sample_item_6",
      "sold_info_intl": [],
      "item_tags": []
    }
  ],
  "merge_policy": 1
}
```

### Response Body Parameters
This endpoint will immediately return a taskId, with which you can call the **Get Grocery Menu Upload Task Info** to check the status that will also be updated with the **uploadGroceryMenuTaskStatus**.
The task detail contains the success or failed information about the creation of each item/category.

| **Status (of the task)** | **Description** | **Additional Info** |
| --- | --- | --- |
| `0`  | waiting  |  |
| `1`  | success  |  |
| `2`  | failed  |  |
| `3`  | waitRetry  | DiDiFood internal system is processing the tasks, therefore the retry will be performed by DiDiFood. No action is required by external parties.  |
| `4`  | running  |  |
| `5`  | partial success  | When the catalogue/menu presents errors that will not affect the process flow of an order execution, however it is suggested to check the details with the purpose to improve the parts with error  |


### Response Example if passed the first filter
```json
{
    "errno":0,
    "errmsg":"ok",
    "requestId":"20fbd1a6207a3535",
    "time":1609845642,
    "data":{
        "taskID":3458764739727720400,
        "createTime":1609845642,
        "status":0,
        "message":"waiting"
    }
}
```

### Response Example if didn't passed the first filter
```json
{
    "errno": 10001,
    "errmsg": "item name is empty, related app_item_id is KFC713_P10487",
    "requestId": "0a0f162f64dd8d858fb1d60d21d53902",
    "time": 1692241285,
    "data": {}
}
```