import should from "should";
import { processTag } from "../src/index";
import * as types from "../src/types";
import v3 from "../sampleMeasurement-v3.json"

describe("test tag level setting", function () {
    let v3Tag: types.RuuviTag;

    beforeAll(() => {
        v3Tag = v3.tag;
    });

    it("creates Point and dataFormat is 3", function () {
        const result = processTag(v3Tag);

        should(result.toString()).containEql("dataFormat=3");
        should(result.toString()).containEql("mac=D4:1F:EF:CF:53:76");
        should(result.toString()).containEql("name=HyperFresh");
    });
});