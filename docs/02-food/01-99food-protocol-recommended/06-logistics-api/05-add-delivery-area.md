<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 2013 · Food > 99Food Protocol (Recommended) > Logistics API > Add Delivery Area -->

## Add Delivery Area

The **Add Delivery Area** endpoint adds a delivery area around the store address that can be set as a polygon or circle. It returns the IDs of the areas created that can be used to later update or delete them.

### Basic Information

| **Name** | **Description** |
| --- | --- |
| `URL` | [https://openapi.99food.com/v1/shop/deliveryArea/add](https://openapi.99food.com/v1/shop/deliveryArea/add) |
| `Method` | POST |
| `Permission` | Available |

### Request Body Parameters

| **Name** | **Type** | **Description** | **Required** | **Example** |
| --- | --- | --- | --- | --- |
| `auth_token` | string | The `auth_token` for the shop. | Yes | ZGQ5ZjVlZGUyYmFhNDM2ZmE0ZDA5OTE5ZjI1YzBhNjU= |
| `area_type` | int | The shape of the area drawn for the delivery area. 0: Circle; 1: Polygon with points. | Yes | 0   |
| `radius` | int | The radius of a circle delivery area in kilometers. | No. Required when `area_type` is circle | 5   |
| `points` | json | List of latitude and longitude for each point of a polygon delivery area. | No. Required when `area_type` is polygon. | [{"lat": 33.670702244105, "lng": 135.5216506}] |
| `avg_delivery_eta` | int | The average delivery ETA in seconds. | Yes | 600 |
| `enable_time_list` | json | The continuous time span for the current configuration. **Time format:** HH:mm. **Accepted values:** from 00:00 to 23:59. | Yes | [{"start": "10:00", "end": "12:00"}] |
| `price` | int | The delivery price to be charged. **Note:** Price is always an integer value (never decimals) because the price is set in the lowest denomination (e.g. cents for MX currency, not Peso). | Yes | 500 |

### Response Body Parameter

| **Name** | **Type** | **Description** | **Example** |
| --- | --- | --- | --- |
| `area_id_list` | array | The IDs of the created delivery area. | [3458764698466584428, 3458764551917602680] |


### Response Errors (errno) Descriptions

| **Code** | **Description** |
| --- | --- |
| 10001 | System error. |
| 10002 | Parameter error. |
| 10100 | Get `auth_token` failed. |
| 10102 | `auth_token` has expired. Please refresh it. |


### Request Example - Area_type: Circle

```json
{
    "auth_token":"ZGQ5ZjVlZGUyYmFhNDM2ZmE0ZDA5OTE5ZjI1YzBhNjU=",
    "area_type":0,
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
    "price":500,
    "radius":5
}
```

### Request Example - Area_type: Polygon

```json
{
    "auth_token":"ZGQ5ZjVlZGUyYmFhNDM2ZmE0ZDA5OTE5ZjI1YzBhNjU=",
    "area_type":1,
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
    "price":500,
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
    ]
}
```


### Response Example

```json
{
    "errno":0,
    "errmsg":"ok",
    "requestId":"1e11bfda4f8e51d1",
    "time":1628498382,
    "data":{
        "area_id_list":[
            3458764754171136000,
            3458764704095340500
        ]
    }
}
```