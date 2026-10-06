<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 1889 · Common > Integration Guide > Before Coding -->

## Before Start Coding

Before you start coding, pay attention to the topics below:

### Integration Requirements

To integrate to 99Food’s Platform we have some requirements:

* Partners need to sign the NDA and complete the qualification.
* New stores need to have passed **99Food's audit process** and have the **commercial and cooperation agreement** in signed status.

### Opening tickets

If you have difficulties or issues, contact our integration team. You can use different channels for that: 
- Our [Help Center](https://developer-food.99app.com/en-US/helpcenter).
- Our [contact e-mail](mailto:99FoodTechSupport@didiglobal.com).
- Or ask for help in our group chat.

### Versioning

Our APIs are versioned at the endpoint-level, incrementing the version number on the URL. We encourage a version bump to make the most of new features released and avoid problems with the integration.

### Whitelist

As we add new features as the time passes, we use whitelist to control the influence. It may cause inconsistencies if the test `app_id` is in the whitelist and the production `app_id` is not. Contact our team if you notice your apps behaving in different ways.