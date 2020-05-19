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
