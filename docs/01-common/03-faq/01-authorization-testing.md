<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 1895 · Common > FAQ > Authorization Testing -->

## Authorization Testing

### Terminology and Meanings

**1. What is the callback address?**
The callback address is a URL to which the system redirects after user authorization. Once the application receives the code through this redirect, the callback address parameter is triggered.

**2. What is app_shop_id?**
The `app_shop_id` is the ID of the store in the POS system, which is used for mapping with `shopID`. 

### Authtoken

**1. What is the validity period of the token and the refresh limit?**
The validity period of the token is random. For the exact expiration time, please refer to the **token_expiration_time** field in the response of the Get Authtoken API. The token refresh limit is once every two minutes.

**2. If there are multiple stores under the application, do you use the same token or a separate token for each store?**
Each authorized store is assigned its own token, and every store needs to obtain its individual token.

**3. What happens if GET Token is used every single time?**
The **GET authtoken** is a read-only interface and will not generate a new token. There will be no side effects using **GET authtoken** when the token has not expired. After the token expires, accessing the  **GET authtoken** interface will result in the error 10102, indicating that the token has expired.


### Testing

**1. How to place an order for testing, do we need a customer's test account? Which terminals can be used for testing?**
Currently, orders must be placed using a customer's test account through the C-App. Read more about this process in **Testing and Debugging > Testing the Integration**.

**2. How to refund after placing a test order?**
For test orders, use the cash payment method to avoid actual payment transactions. Orders can be cancelled without processing refunds.

**3. How to apply for a test shop?**
You can create your own test store. For that, you need to complete the qualification process (read in **Tools Introduction > Qualifications Management**) and then create your test app (more in **Tools Introduction > Application Management**).

**4. How do I find test stores of my own brand?**
To find test stores of your brand, enter the accurate store address in the C-App. You can check the address in **Testing and Debugging > Testing the Integration**

**5. How to test delivery?**
Currently, delivery testing is not supported, and the test environment uses self-delivery by default. Delivery can be tested during the pilot phase.

**6. What should I register in app_shop_id field?**
The app_shop_id is the internal identifier used by the integrator's system to reference a store.