<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 2115 · Grocery > Store API > Set Store Status -->

## Set Store Status

The Set Store Status endpoint allows developers to manage a store's operational state. Use this to switch the store between online, closed, or paused states.

### Key Operational Logic

- **Conditional Dependency**: `store_status` is mandatory whenever `auto_switch` is included in the request.
- **Field Priority**: If both `biz_status` and `store_status` are provided in a single request, `store_status` takes precedence over `biz_status`.
- **Manual Override**: If a store is closed manually via the B-App, it must be reopened manually via the app. API updates may not take effect until this manual lock is cleared.
- **Auto Online Behavior**:
  - **Business Close** (`store_status: 2`): The store will remain closed the following day. Manual opening required.
  - **Business Pause** (`store_status: 3`): Scheduled hours are preserved; it auto-resumes the next business day.

### Basic Information
| **Name** | **Description** |
|------|-------------|
| **URL** | `https://openapi.99food.com/v1/shop/shop/setStatus` |
| **Method** | POST |
| **Permission** | Available |

### Request

#### Request Body Parameters

| **Name** | **Type** | **Description** | **Required** | **Example** |
|------|------|-------------|----------|---------|
| `auth_token` | string | The auth_token for the shop. | Yes | `ZGQ5ZjVlZGUyYmFhNDM2ZmE0ZDA5OTE5ZjI1YzBhNjU=` |
| `auto_switch` | int | 1-Manual Online, 2-Auto Online. **Requires `store_status` to be sent together.** | No | 1 |
| `store_status` | int | Store status controller. 1-Online, 2-Business Close (The store will remain closed the following day. Manual opening required.), 3-Business Pause (Pause a store, the store will go online automatically if `auto_switch: 2`). | Yes | 3 |
| `biz_status` | int | **[Legacy]** 1-Online, 2-Business Close. This field is for backward compatibility. | No | 1 |
| `pause_time` | int | Pause duration. 1-10 mins, 2-20 mins, 3-30 mins, 4-Until the end of the day. **Note**: If `pause_time: 4`, the store will remain paused for the rest of today and only auto-resume when the next scheduled business window begins tomorrow. | No (Yes if `store_status: 3`) | 1 |
| `pause_reason_code` | int | Pause Reason. 1001-Equipment failure or utility outage, 1002-Temporary staff absence, 1003-Insufficient ingredients to prepare orders, 1004-Concern over order fulfillment near closing time, 1005-Unable to fulfill orders due to excessive dine-in orders, 1006-Other reason | No (Yes if `store_status: 3`) | 1002 |
| `busy_mode` | object | The busy mode configuration for the store. When `busy_state` is set to 1, the estimated preparation time will be extended by `busy_cook_delay_minutes`. (See the table below for details.) | No |  {"busy_state": 1, "busy_duration_minutes": 120, "busy_cook_delay_minutes": 15} |

> **ATTENTION - Status Transition Rules**:
> - **Supported**: If a store is currently paused (`store_status: 3`), switching to closed (`store_status: 2`) via this API is allowed.
> - **Not Supported**: If a store is currently closed (`store_status: 2`), switching to paused (`store_status: 3`) is **NOT** allowed; the store must be set online first.

#### Request Body Parameters - busy_mode

| **Name** | **Type** | **Description** | **Required** | **Example** |
|------|------|-------------|----------|---------|
| `busy_state` | int | Enum: `0` - normal, `1` - busy | Yes | 1 |
| `busy_duration_minutes` | int | The duration (in minutes) of the busy status. Automatically reverts to normal after this period. Range: 1–180. | No (Yes if `busy_state: 1`) | 120 |
| `busy_cook_delay_minutes` | int | The additional preparation time (in minutes) added to the base preparation time while the store is busy. Range: 1–30. | No (Yes if `busy_state: 1`) | 15 |

### Response

#### Response Body Parameters

| **Name** | **Type** | **Description** | **Example** |
|------|------|-------------|---------|
| `biz_status` | bool | (Legacy) Store business status. true: Online; false: Offline. | true |
| `auto_switch` | bool | Auto-online configuration. true: Enabled; false: Disabled. | true |
| `store_status` | int | The store's status. 1-Online, 2-Business Close, 3-Business Pause | 3 |
| `sub_biz_status` | int | The real-time detailed business status. (See **Response Body for sub_biz_status** below for details.) | 2 |
| `pause_time` | int | Returned when `store_status: 3`. Pause duration. Enum: 1-10 mins, 2-20 mins, 3-30 mins, 4-Until the end of the day. | 1 |
| `pause_reason_code` | int | Returned when `store_status: 3`. The reason code for the pause. | 1001 |
| `busy_mode` | object | Busy mode configuration. Returned when the store is in busy status. (See **Response Body for busy_mode** below for details.) | {"busy_state": 1, "busy_duration_minutes": 120, "busy_cook_delay_minutes": 15} |

**ATTENTION**: A successful API response (`errno: 0`) indicates that the pause request has been accepted, not that the store is immediately paused. The actual status update occurs asynchronously. To confirm the final store status, please monitor the `shopStatus` webhook or verify it manually in the C-App (99 Food App).

#### Response Body for sub_biz_status

| **sub_biz_status** | **Description** |
|----------------|-------------|
| `0` | Default. |
| `1` | Store Opened. |
| `2` | Business Pause. It will auto-resume after the pause duration expires, or the next business day if `pause_time: 4`. |
| `3` | Business Close. It won't open until the store is open manually. |
| `4` | Store Disconnected. 99Food's merchant app is offline because of network connection or other reasons. |
| `5` | Store closed for the day. The store is not within business hours. |
| `6` | Store blocked. The store is closed for some bad reason and cannot be opened using the app or API. Contact your 99Food's Rep to understand the case. |
| `7` | Store closed by system control. The store is closed if there's no rider online. |

#### Response Body for busy_mode

> Returned when `busy_state: 1`.

| **Name** | **Type** | **Description** | **Example** |
|------|------|-------------|---------|
| `busy_state` | int | Busy status. Enum: `0` - normal, `1` - busy. | 1 |
| `busy_duration_minutes` | int | Busy duration in minutes. Automatically reverts to normal after this period. Range: 1–180. | 120 |
| `busy_cook_delay_minutes` | int | Additional preparation time in minutes added to the base time. Range: 1–30. | 15 |

#### Response Body errno

| **errno** | **Description** |
|-------|-------------|
| `10001` | System error. |
| `10002` | Parameter error. |
| `10100` | Get auth_token failed. |
| `10102` | auth_token has expired. Please refresh it. |
| `10005` | Calling frequency exceeds the setting. |
| `11010` | Unable to go online. If you can't solve this problem after several attempts, contact your 99Food's Rep. |
| `11037` | Service not yet available in this area. |
| `11040` | Unable to search for perimeter. |
| `11044` | Unable to update store's operating status. |
| `11053` | Get shop detail fail. |
| `56101` | Incorrect store status. |
| `58001` | Illegal business hours. |
| `90041` | Get shop is empty. |
| `990002` | Parameter error. |

### Examples

#### Business Pause

**Request:**
```json
{
    "auth_token": "MzRlZjE0YzE0YWE4NGQ1Mjk4MjkxZjU4N2IyNTE5OGE=",
    "store_status": 3,
    "pause_reason_code": 1001,
    "pause_time": 1
}
```

**Response:**
```json
{
    "errno": 0,
    "errmsg": "ok",
    "requestId": "s421515369aa87930d6006e07d483a02",
    "time": 1772783508,
    "data": {
        "sub_biz_status": 2,
        "store_status": 3,
        "pause_reason_code": 1001,
        "pause_time": 1
    }
}
```

#### Business Close

**Request:**
```json
{
    "auth_token": "MzRlZjE0YzE0YWE4NGQ1Mjk4MjkxZjU4N2IyNTE5OGE=",
    "store_status":2
}
```

**Response:**
```json
{
    "errno": 0,
    "errmsg": "ok",
    "requestId": "s421515369aa87460d6006e07d469e02",
    "time": 1772783431,
    "data": {
        "biz_status": false,
        "auto_switch": false,
        "sub_biz_status": 3,
        "store_status": 2
    }
}
```

#### Set Store Online

**Request:**
```json
{
    "auth_token": "MzRlZjE0YzE0YWE4NGQ1Mjk4MjkxZjU4N2IyNTE5OGE=",
    "store_status": 1
}
```

**Response:**
```json
{
    "errno": 0,
    "errmsg": "ok",
    "requestId": "s421515369aa87700d6006e07d479002",
    "time": 1772783473,
    "data": {
        "biz_status": true,
        "auto_switch": true,
        "sub_biz_status": 1,
        "store_status": 1
    }
}
```

#### Set Store as Busy

**Request:**
```json
{
    "auth_token": "MzRlZjE0YzE0YWE4NGQ1Mjk4MjkxZjU4N2IyNTE5OGE=",
    "busy_mode": {
        "busy_state": 1,
        "busy_duration_minutes": 180,
        "busy_cook_delay_minutes": 30
    }
}
```

**Response:**
```json
{
    "errno": 0,
    "errmsg": "ok",
    "requestId": "22bd82304fe79e62",
    "time": 1572440303,
    "data": {
        "busy_mode": {
            "busy_state": 1,
            "busy_duration_minutes": 180,
            "busy_cook_delay_minutes": 30
        }
    }
}
```
