# ruuvi-gateway-influx
Ruuvi Station gateway implementation for storing data to InfluxDB with typescript

This is open source implementation for Ruuvi Station Gateway Google Cloud Function that pushes measurements to InfluxDB 1.8+ and 2.0+.

I have been tested function with setup:

    RuuviTag (sw v3 &v5)        (RyuuviTag sensor)
    > Ruuvi Station             (Ruuvi mobile app, android)
    > ruuvi-gateway-influx      (This)
    > InfluxDB 1.8              (Standalone installation in vm)

## Get started
Install node.js, typescript and Google Cloud SDK.

InfluxDB you can use stand alone installations or free to use Saas for small amount of data [from](https://cloud.influxdata.com/).

1. Setup [Google Cloud Functions](https://cloud.google.com/functions/docs).
2. Setup [Google Secret Manager](https://cloud.google.com/secret-manager/docs) for credentials.
3. Clone repository with `git git@github.com:ampujl/ruuvi-gateway-influx.git`.
4. Copy sample.env.yaml to .env.yaml .
5. Run service localy `npm run start:write`.
6. Run tests `npm run test`.
7. Deploy `npm run deploy:write`.
8. Find `httpsTrigger:` from deploy otput to configure Ruuvi Station gateway url.
