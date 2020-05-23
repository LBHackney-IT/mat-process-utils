import { TestNamedSchema } from "../../../__fixtures__/TestNamedSchema";
import {
  makeSupportNeedsStep,
  SupportNeedsStepKey,
} from "./makeSupportNeedsStep";

it("returns correctly", () => {
  expect(
    makeSupportNeedsStep<
      TestNamedSchema,
      "store",
      "slug-a" | "slug-b" | "slug-repeat-a" | "slug-repeat-b"
    >({
      basePath: "/base/path",
      stepSlugs: ["slug-a", "slug-b"],
      repeatingStepSlugs: ["slug-repeat-a", "slug-repeat-b"],
      slug: "slug-a",
      nextSlug: "slug-b",
      componentDatabaseMaps: {
        [SupportNeedsStepKey.ResidentSustainment]: {
          storeName: "store",
          property: "value",
        },
        [SupportNeedsStepKey.Befriending]: {
          storeName: "store",
          property: "value",
        },
        [SupportNeedsStepKey.AdultSafeguarding]: {
          storeName: "store",
          property: "value",
        },
        [SupportNeedsStepKey.ChildSafeguarding]: {
          storeName: "store",
          property: "value",
        },
        [SupportNeedsStepKey.DomesticViolence]: {
          storeName: "store",
          property: "value",
        },
        [SupportNeedsStepKey.MentalHealth18To65]: {
          storeName: "store",
          property: "value",
        },
        [SupportNeedsStepKey.MentalHealthOver65]: {
          storeName: "store",
          property: "value",
        },
      },
    })
  ).toMatchInlineSnapshot(`
    Object {
      "context": undefined,
      "heading": "Support needs",
      "review": Object {
        "rows": Array [
          Object {
            "label": "Resident sustainment",
            "values": Object {
              "resident-sustainment": Object {
                "renderValue": [Function],
              },
            },
          },
          Object {
            "label": "Befriending",
            "values": Object {
              "befriending": Object {
                "renderValue": [Function],
              },
            },
          },
          Object {
            "label": "Adult safeguarding",
            "values": Object {
              "adult-safeguarding": Object {
                "renderValue": [Function],
              },
            },
          },
          Object {
            "label": "Children's and young people's safeguarding",
            "values": Object {
              "child-safeguarding": Object {
                "renderValue": [Function],
              },
            },
          },
          Object {
            "label": "Domestic violence & sexual abuse",
            "values": Object {
              "domestic-violence": Object {
                "renderValue": [Function],
              },
            },
          },
          Object {
            "label": "Mental health - aged 18-65",
            "values": Object {
              "mental-health-18-65": Object {
                "renderValue": [Function],
              },
            },
          },
          Object {
            "label": "Mental health - over 65",
            "values": Object {
              "mental-health-over-65": Object {
                "renderValue": [Function],
              },
            },
          },
        ],
      },
      "step": Object {
        "componentWrappers": Array [
          ComponentWrapper {
            "databaseMap": undefined,
            "defaultValue": undefined,
            "emptyValue": undefined,
            "key": "heading",
            "render": [Function],
            "renderWhen": [Function],
            "required": false,
          },
          ComponentWrapper {
            "databaseMap": undefined,
            "defaultValue": undefined,
            "emptyValue": undefined,
            "key": "instruction",
            "render": [Function],
            "renderWhen": [Function],
            "required": false,
          },
          ComponentWrapper {
            "databaseMap": ComponentDatabaseMap {
              "key": [Function],
              "property": Array [
                "value",
              ],
              "storeName": "store",
            },
            "defaultValue": Array [],
            "emptyValue": Array [],
            "key": "resident-sustainment",
            "render": [Function],
            "renderWhen": [Function],
            "required": false,
          },
          ComponentWrapper {
            "databaseMap": ComponentDatabaseMap {
              "key": [Function],
              "property": Array [
                "value",
              ],
              "storeName": "store",
            },
            "defaultValue": Array [],
            "emptyValue": Array [],
            "key": "befriending",
            "render": [Function],
            "renderWhen": [Function],
            "required": false,
          },
          ComponentWrapper {
            "databaseMap": ComponentDatabaseMap {
              "key": [Function],
              "property": Array [
                "value",
              ],
              "storeName": "store",
            },
            "defaultValue": Array [],
            "emptyValue": Array [],
            "key": "adult-safeguarding",
            "render": [Function],
            "renderWhen": [Function],
            "required": false,
          },
          ComponentWrapper {
            "databaseMap": ComponentDatabaseMap {
              "key": [Function],
              "property": Array [
                "value",
              ],
              "storeName": "store",
            },
            "defaultValue": Array [],
            "emptyValue": Array [],
            "key": "child-safeguarding",
            "render": [Function],
            "renderWhen": [Function],
            "required": false,
          },
          ComponentWrapper {
            "databaseMap": ComponentDatabaseMap {
              "key": [Function],
              "property": Array [
                "value",
              ],
              "storeName": "store",
            },
            "defaultValue": Array [],
            "emptyValue": Array [],
            "key": "domestic-violence",
            "render": [Function],
            "renderWhen": [Function],
            "required": false,
          },
          ComponentWrapper {
            "databaseMap": ComponentDatabaseMap {
              "key": [Function],
              "property": Array [
                "value",
              ],
              "storeName": "store",
            },
            "defaultValue": Array [],
            "emptyValue": Array [],
            "key": "mental-health-18-65",
            "render": [Function],
            "renderWhen": [Function],
            "required": false,
          },
          ComponentWrapper {
            "databaseMap": ComponentDatabaseMap {
              "key": [Function],
              "property": Array [
                "value",
              ],
              "storeName": "store",
            },
            "defaultValue": Array [],
            "emptyValue": Array [],
            "key": "mental-health-over-65",
            "render": [Function],
            "renderWhen": [Function],
            "required": false,
          },
        ],
        "nextSlug": "slug-b",
        "slug": "slug-a",
        "submit": [Function],
      },
      "title": "Support needs",
    }
  `);
});
