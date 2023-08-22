# xx

IoT system to control BLE love toys and much more.

## Development

### Application

Run `nx serve hub` to serve the backend and `nx serve ui` for the frontend. All API requests will be proxied.

### Verdaccio

Run `docker-compose up -d` to create a Verdaccio instance.

## Deployment

### Verdaccio

Run `./publish.sh` to build all packages and push them to the Verdaccio registry.

### Raspberry Pi

Run `ansible-playbook playbook.yml` from within the `ansible` directory to deploy the app from your local Verdaccio instance.

## Todo

- [ ] Tests
- [ ] Docs
