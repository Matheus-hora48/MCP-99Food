<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 2019 · Food > 99Food Protocol (Recommended) > Logistics API > Get Delivery Area -->

## Get Delivery Area

The **Get Delivery Area** endpoint brings all the delivery area information set to a store.

### Basic Information

| **Name** | **Description** |
| --- | --- |
| `URL` | [https://openapi.99food.com/v1/shop/deliveryArea/list](https://openapi.99food.com/v1/shop/deliveryArea/list) |
| `Method` | GET |
| `Permission` | Available |

### Request Path Parameters

| **Name** | **Type** | **Description** | **Required** | **Example** |
| --- | --- | --- | --- | --- |
| `auth_token` | string | The `auth_token` for the shop. | Yes | ZGQ5ZjVlZGUyYmFhNDM2ZmE0ZDA5OTE5ZjI1YzBhNjU= |


### Response Errors (errno) Descriptions

| **Code** | **Description** |
| --- | --- |
| 10001 | System error. |
| 10002 | Parameter error. |
| 10100 | Get `auth_token` failed. |
| 10102 | `auth_token` has expired. Please refresh it. |


### Response Example

```json
{
    "errno":0,
    "errmsg":"ok",
    "requestId":"1e1caf6773876fb2",
    "time":1628499064,
    "data":{
        "shopName":"allinone_mx_guacheng",
        "address":"",
        "lat":33.6632258,
        "lng":135.5216506,
        "areaGroup":[
            {
                "area_id_list":[
                    3458764548302113000
                ],
                "create_ts":1628164699,
                "area_index":0,
                "avg_delivery_eta":400,
                "enable_time_list":[
                    {
                        "start":"11:50",
                        "end":"12:00"
                    }
                ],
                "display_enable_times":"11:50-12:00",
                "points":[
                    {
                        "lat":33.670702244105,
                        "lng":135.5216506
                    },
                    {
                        "lat":33.670447501144,
                        "lng":135.52397561119
                    },
                    {
                        "lat":33.669700628224,
                        "lng":135.5261421767
                    }
                ],
                "price":1000,
                "radius":0,
                "area_type":1
            },
            {
                "area_id_list":[
                    3458764551917603000,
                    3458764698466584600
                ],
                "create_ts":1628478958,
                "area_index":0,
                "avg_delivery_eta":300,
                "enable_time_list":[
                    {
                        "start":"00:50",
                        "end":"05:00"
                    },
                    {
                        "start":"06:50",
                        "end":"10:00"
                    }
                ],
                "display_enable_times":"00:50-05:00  06:50-10:00",
                "points":[
                    {
                        "lat":33.70060152121,
                        "lng":135.5216506
                    },
                    {
                        "lat":33.699328241821,
                        "lng":135.53327565593
                    },
                    {
                        "lat":33.695595066774,
                        "lng":135.54410848351
                    },
                    {
                        "lat":33.68965610864,
                        "lng":135.55341084344
                    },
                    {
                        "lat":33.681915691752,
                        "lng":135.56054879527
                    },
                    {
                        "lat":33.672900906959,
                        "lng":135.56503589937
                    },
                    {
                        "lat":33.6632258,
                        "lng":135.56656636702
                    },
                    {
                        "lat":33.653549604848,
                        "lng":135.56503589937
                    },
                    {
                        "lat":33.64453184706,
                        "lng":135.56054879527
                    },
                    {
                        "lat":33.636787368984,
                        "lng":135.55341084344
                    },
                    {
                        "lat":33.630844349662,
                        "lng":135.54410848351
                    },
                    {
                        "lat":33.62710820162,
                        "lng":135.53327565593
                    },
                    {
                        "lat":33.625833834039,
                        "lng":135.5216506
                    },
                    {
                        "lat":33.62710820162,
                        "lng":135.51002554407
                    },
                    {
                        "lat":33.630844349662,
                        "lng":135.49919271649
                    },
                    {
                        "lat":33.636787368984,
                        "lng":135.48989035656
                    },
                    {
                        "lat":33.64453184706,
                        "lng":135.48275240473
                    },
                    {
                        "lat":33.653549604848,
                        "lng":135.47826530063
                    },
                    {
                        "lat":33.6632258,
                        "lng":135.47673483298
                    },
                    {
                        "lat":33.672900906959,
                        "lng":135.47826530063
                    },
                    {
                        "lat":33.681915691752,
                        "lng":135.48275240473
                    },
                    {
                        "lat":33.68965610864,
                        "lng":135.48989035656
                    },
                    {
                        "lat":33.695595066774,
                        "lng":135.49919271649
                    },
                    {
                        "lat":33.699328241821,
                        "lng":135.51002554407
                    },
                    {
                        "lat":33.70060152121,
                        "lng":135.5216506
                    }
                ],
                "price":500,
                "radius":5,
                "area_type":0
            },
            {
                "area_id_list":[
                    3458764704095340500,
                    3458764754171136000
                ],
                "create_ts":1628498382,
                "area_index":0,
                "avg_delivery_eta":300,
                "enable_time_list":[
                    {
                        "start":"00:50",
                        "end":"05:00"
                    },
                    {
                        "start":"06:50",
                        "end":"10:00"
                    }
                ],
                "display_enable_times":"00:50-05:00  06:50-10:00",
                "points":[
                    {
                        "lat":33.670702244105,
                        "lng":135.5216506
                    },
                    {
                        "lat":33.670447501144,
                        "lng":135.52397561119
                    },
                    {
                        "lat":33.669700628224,
                        "lng":135.5261421767
                    }
                ],
                "price":500,
                "radius":0,
                "area_type":1
            }
        ]
    }
}
```