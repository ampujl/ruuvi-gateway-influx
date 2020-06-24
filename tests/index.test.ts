import { processTag } from "../src/index";
import * as types from "../src/types";

describe('test tag level setting', function () {
    let tag: types.RuuviTag;
    beforeAll(() => {
        tag =
        {
            "accelX": 0,
            "accelY": 0,
            "accelZ": 1,
            "dataFormat": 3,
            "defaultBackground": 6,
            "favorite": true,
            "humidity": 42,
            "id": "10:0B:14:29:1B:01",
            "measurementSequenceNumber": 0,
            "movementCounter": 0,
            "name": "Example",
            "pressure": 1000,
            "rawDataBlob": [
                null
            ],
            "rssi": -91,
            "temperature": 42,
            "txPower": 0,
            "updateAt": "2020-05-02T18:58:25+0300",
            "voltage": 3.14
        }
    });

    it('creates Point', function () {
        let result = processTag(tag);
        console.log(result.toString());
    });
});