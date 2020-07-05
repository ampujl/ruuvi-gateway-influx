import should from "should";
import { processTag } from "../src/index";
import * as types from "../src/types";
import v5 from "../sampleMeasurement-v5.json"

describe("test tag level setting", function () {
    let v5Tag: types.RuuviTag;

    beforeAll(() => {
        v5Tag = v5.tag;
    });

    it("creates Point and dataFormat is 3", function () {
        const result = processTag(v5Tag);

        should(result.toString()).containEql("dataFormat=5");
        should(result.toString()).containEql("mac=EE:23:D9:2C:3E:AE");
        should(result.toString()).containEql("name=Mobile");
    });
});