import should from "should";
import { processTag } from "../src/index";
import * as types from "../src/types";
import v3 from "../sampleMeasurement-v3.json"
// import v5 from "../sampleMeasurement-v5.json"

describe("test tag level setting", function () {
    let v3Tag: types.RuuviTag;
    // let v5Tag: types.RuuviTag;

    beforeAll(() => {
        v3Tag = v3.tag;
    });

    it("creates Point and dataFormat is 3", function () {
        const result = processTag(v3Tag);

        should(result.toString()).containEql("dataFormat=3");
    });
});