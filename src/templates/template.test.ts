import { TypeDefinitionTemplate as t } from "./template";
import { DemoClient } from "../kintone/clients/demo-client";
import { FieldTypeConverter } from "../converters/fileldtype-converter";
import { objectValues } from "../utils/objectvalues";
import * as fs from "fs";
describe("renderAsFile", () => {
    const TEMP_TEST_TYPEDEF = "tmp.testfield.d.ts";
    test("generate typedefinition file", async () => {
        const client = new DemoClient();
        const fieldTypeGroups = await client
            .fetchFormProperties({
                appId: "",
                preview: false,
                guestSpaceId: null,
            })
            .then(properties =>
                FieldTypeConverter.convertFieldTypesToFieldTypeGroups(
                    objectValues(properties)
                )
            );
        const input = {
            typeName: "TestFields",
            namespace: "kintone.types",
            fieldTypeGroups,
        };
        t.renderAsFile(TEMP_TEST_TYPEDEF, input);

        const expected = fs.readFileSync(
            "./resources/testfield.d.ts"
        );
        const actual = fs.readFileSync(TEMP_TEST_TYPEDEF);
        expect(actual.toString()).toEqual(
            expected.toString()
        );
    });

    afterEach(() => {
        fs.unlink(TEMP_TEST_TYPEDEF, err => {
            if (err) {
                throw err;
            }
        });
    });
});