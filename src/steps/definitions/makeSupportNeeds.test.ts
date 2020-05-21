import { NamedSchema } from "remultiform/database";
import { Notes } from "../../schema/Notes";
import { makeSupportNeeds, SupportNeedsKey } from "./makeSupportNeeds";

type DBNamedSchema = NamedSchema<
  string,
  number,
  { store: { key: string; value: { notes: Notes } } }
>;

it("should return correctly", () => {
  expect(
    makeSupportNeeds<
      DBNamedSchema,
      "store",
      "slug-a" | "slug-b" | "slug-repeat-a" | "slug-repeat-b"
    >({
      basePath: "/base/path",
      stepSlugs: ["slug-a", "slug-b"],
      repeatingStepSlugs: ["slug-repeat-a", "slug-repeat-b"],
      slug: "slug-a",
      nextSlug: "slug-b",
      componentDatabaseMaps: {
        [SupportNeedsKey.ResidentSustainment]: {
          storeName: "store",
          property: "notes",
        },
        [SupportNeedsKey.Befriending]: {
          storeName: "store",
          property: "notes",
        },
        [SupportNeedsKey.AdultSafeguarding]: {
          storeName: "store",
          property: "notes",
        },
        [SupportNeedsKey.ChildSafeguarding]: {
          storeName: "store",
          property: "notes",
        },
        [SupportNeedsKey.DomesticViolence]: {
          storeName: "store",
          property: "notes",
        },
        [SupportNeedsKey.MentalHealth18To65]: {
          storeName: "store",
          property: "notes",
        },
        [SupportNeedsKey.MentalHealthOver65]: {
          storeName: "store",
          property: "notes",
        },
      },
    })
  ).toMatchInlineSnapshot(`
    Object {
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
                "notes",
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
                "notes",
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
                "notes",
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
                "notes",
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
                "notes",
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
                "notes",
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
                "notes",
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
