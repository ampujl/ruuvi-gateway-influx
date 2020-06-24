import * as express from "express";
import * as types from "./types";
import { google } from "@google-cloud/secret-manager/build/protos/protos";
import { InfluxDB, ClientOptions, Point, WritePrecision } from "@influxdata/influxdb-client";
import { SecretManagerServiceClient } from "@google-cloud/secret-manager";
import * as _ from "lodash";

exports.write = async (req: express.Request, res: express.Response): Promise<void> => {

    // check body type
    if (!checkContentType(req, res)){
        return;
    }

    let measurement: types.Measurement = req.body;

    const dbToken = (await getCredentials()).payload?.data?.toString();

    const clientOptions: ClientOptions = {
        url: process.env.INFLUX_URL as string,
        token: dbToken
    };

    const writeApi = new InfluxDB(clientOptions).getWriteApi(process.env.INFLUX_ORG as string, process.env.INFLUX_BUCKET as string, WritePrecision.ns);

    const tags = measurement.tags ? measurement.tags as types.RuuviTag[] : [measurement.tag] as types.RuuviTag[];
    const points = tags.map(t => processTag(t));

    // Write points
    writeApi.writePoints(points);

    // Flush and close
    await writeApi.close();

    res.send("Done!");
}

function checkContentType(req: express.Request, res: express.Response): Boolean {
    switch (req.get('content-type')) {
        // '{"name":"John"}'
        case 'application/json':
            return true;
        // 'John', stored in a Buffer
        case 'application/octet-stream':
            res.status(400).send("Bad request!");
            return false;
        // 'John'
        case 'text/plain':
            res.status(400).send("Bad request!");
            return false;
        // 'name=John' in the body of a POST request (not the URL)
        case 'application/x-www-form-urlencoded':
            res.status(400).send("Bad request!");
            return false;
        default:
            res.status(400).send("Bad request!");
            return false;
    }
}

async function getCredentials(): Promise<google.cloud.secretmanager.v1.IAccessSecretVersionResponse> {
    const client = new SecretManagerServiceClient();
    const [accessResponse] = await client.accessSecretVersion({
        name: process.env.INFLUX_TOKEN,
    });
    return accessResponse;
}

export function processTag(tag: types.RuuviTag): Point {

    // Adding dBbTags
    const id: string = tag.id
    const name: string = tag.name;

    let dataFormat: string = "1";
    if (tag.voltage) {
        dataFormat = "3";
    }
    if (tag.txPower) {
        dataFormat = "5";
    }

    // Creating point with dbTags
    let point = new Point("ruuvi_measurements")
        .tag('mac', id)
        .tag("name", name)
        .tag("dataFormat", dataFormat);

    // Filter used keys
    _.difference(_.keys(tag), ["id", "name"]).map(function (key: string) {

        const value: any = tag[key];
        switch (typeof (value)) {
            case 'number':
                point = point.floatField(key, value);
                break;
            case 'string':
                point = point.stringField(key, value);
                break;
            case 'boolean':
                point = point.booleanField(key, value);
                break;
            default:
                break;
        }
    });

    return point;
}

