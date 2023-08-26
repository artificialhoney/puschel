# puschel

IoT system to control BLE love toys and much more.

Read more: https://artificialhoney.github.io/puschel/

## Installation

```bash
npm i -g @puschel/cli pm2
puschel create puschel
cd puschel && pm2 start
```

Visit http://localhost and login with **admin**:puschel.

## Deployment

Please see [playbook.yml](https://github.com/artificialhoney/puschel/blob/main/ansible/playbook.yml) for more instructions, especially for **Raspberry Pi**.

## Development

```bash
npx nx run-many -t build
npx nx run-many -t serve -p hub ui
```

Visit http://localhost:4200 and login with **admin**:puschel.
