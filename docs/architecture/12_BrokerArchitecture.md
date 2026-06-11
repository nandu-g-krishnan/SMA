# 12 Broker Architecture

## Adapter Rule

Kite must be an adapter only. No domain service may call the Kite SDK directly.

## Interface

```csharp
public interface IBrokerGateway
{
    Task<BrokerSession> AuthenticateAsync(BrokerCredentials credentials, CancellationToken cancellationToken);
    Task<IReadOnlyList<BrokerInstrument>> GetInstrumentsAsync(CancellationToken cancellationToken);
    Task<BrokerOrderResult> PlaceOrderAsync(BrokerOrderRequest request, CancellationToken cancellationToken);
    Task<BrokerOrderStatus> GetOrderStatusAsync(string brokerOrderId, CancellationToken cancellationToken);
    Task<IReadOnlyList<BrokerPosition>> GetPositionsAsync(CancellationToken cancellationToken);
    Task<IReadOnlyList<BrokerHolding>> GetHoldingsAsync(CancellationToken cancellationToken);
}
```

## Implementations

- `KiteBrokerGateway`
- Future: `FyersBrokerGateway`
- Future: `UpstoxBrokerGateway`
- Future: `InteractiveBrokersGateway`
- Future: `BinanceGateway`

## Boundary

Application services create broker-neutral order intents. The execution infrastructure maps those intents to broker-specific requests.
