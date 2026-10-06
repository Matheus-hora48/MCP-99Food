<!-- fonte: https://developer-food.99app.com/pt-BR/openapi · id 2213 · Food > Open Delivery Protocol > Introduction > Open Delivery Introduction -->

## Open Delivery Introduction

### Understanding Open Delivery in Our Integration

Our **99Food Protocol** is the recommended integration option for partners seeking a comprehensive, robust, and flexible ecosystem. It delivers a broader feature set, supports advanced use cases, and remains the primary focus of our product roadmap.

As an alternative, we support the **Open Delivery** protocol for partners mandated to comply with the official Brazilian OpenDelivery standard or whose systems are architected strictly around a polling-based flow.

In this model, instead of receiving real-time event updates via webhooks, the integrator periodically polls our API to fetch new information (e.g., new orders or status updates). This pathway is suitable for partners who prefer not to maintain the inbound infrastructure required for webhooks, or who have already standardized their systems on the Open Delivery protocol.

> **Which protocol should I choose?**
>
> Unless you have a strict technical requirement for Open Delivery, **we strongly recommend using the 99Food Protocol**. It provides a richer set of capabilities, real-time synchronization, and continuous feature updates.
>
> Choose **Open Delivery** only if:
> - Your system operates exclusively on a polling mechanism and you do not plan to support webhooks.
> - Your system is required to comply with the official Brazilian Open Delivery standard.

### Feature Comparison: 99Food vs. Open Delivery

The table below shows which features are available in each integration protocol.

| Feature | 99Food | Open Delivery |
|---|:---:|:---:|
| Store endpoints | ✅ | ❌ |
| Logistics API | ✅ | ✅ |
| Financial API | ✅ | ❌ |
| Store binding by endpoint | ✅ | ❌ |
| Frequent updates | ✅ | ❌ |
| Multi-level menu modifiers | ✅ | ❌ |
| Single menu item updates | ✅ | ❌ |
| Simpler technical architecture | ❌ | ✅ |
| Menu endpoint | ✅ | ✅ |
| Polling | ❌ | ✅ |


### Open Delivery Protocol Reference

If you choose to integrate via Open Delivery, please refer to the dedicated Open Delivery Protocol section in our documentation for a step-by-step implementation workflow.

To learn more about the native Open Delivery standard and its official specifications, you can visit their official website:

[Open Delivery official website](https://www.opendelivery.com.br/)


**Disclaimer**

> **Please Note**: The functional variances outlined on this page reflect the current implementation scope of our platform, rather than the inherent limitations of the Open Delivery protocol itself. Certain features are omitted in our Open Delivery compatibility layer to align with our long-term architectural focus. Our primary engineering resources remain dedicated to scaling and optimizing our native 99Food Protocol to deliver the best possible developer experience.
