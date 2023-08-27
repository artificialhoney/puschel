# puschel

IoT system to control BLE love toys and much more.

Read more: [https://artificialhoney.github.io/puschel/](https://artificialhoney.github.io/puschel/)

## Installation

```bash
npm i -g @puschel/cli pm2
puschel create puschel
cd puschel && pm2 start
```

Visit [http://localhost](http://localhost) and login with **admin**:puschel.

## Deployment

Please see [playbook.yml](https://github.com/artificialhoney/puschel/blob/main/ansible/playbook.yml) for more instructions, especially for **Raspberry Pi**.

## Development

```bash
npx nx run-many -t build
npx nx run-many -t serve -p hub ui
```

Visit [http://localhost:4200](http://localhost:4200) and login with **admin**:puschel.

The GraphQL playground will be available under [http://localhost:4200/graphql](http://localhost:4200/graphql).

## Toys

Following toys are currently supported:

- [Lovense Lush](https://www.lovense.com/bluetooth-remote-control-vibrator)
- [Fantasy Cup Theodore](https://www.amazon.de/gp/product/B0BQWP7KYC)
- [Svakom Pulse Union](https://www.svakom.com/products/pulse-union)
- [Pretty Love](https://prettylove.com/goods.php?id=2913)

## GraphQL API

See [https://artificialhoney.github.io/puschel/api](https://artificialhoney.github.io/puschel/api).
