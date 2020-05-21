import React from "react";
import { create } from "react-test-renderer";
import { TestNamedSchema } from "../../__fixtures__/TestNamedSchema";
import {
  DisabilityKey,
  DisabilityQuestions,
  makeDisability,
} from "./makeDisability";

it("returns correctly", () => {
  expect(
    makeDisability<
      TestNamedSchema,
      "store",
      "slug-a" | "slug-b" | "slug-repeat-a" | "slug-repeat-b"
    >(
      {
        basePath: "/base/path",
        stepSlugs: ["slug-a", "slug-b"],
        repeatingStepSlugs: ["slug-repeat-a", "slug-repeat-b"],
        slug: "slug-a",
        nextSlug: "slug-b",
        componentDatabaseMaps: {
          [DisabilityKey.Present]: {
            storeName: "store",
            property: "value",
          },
          [DisabilityKey.Who]: {
            storeName: "store",
            property: "value",
          },
          [DisabilityKey.Notes]: {
            storeName: "store",
            property: "value",
          },
          [DisabilityKey.PIPOrDLA]: {
            storeName: "store",
            property: "value",
          },
          [DisabilityKey.WhoPIP]: {
            storeName: "store",
            property: "value",
          },
          [DisabilityKey.WhoDLA]: {
            storeName: "store",
            property: "value",
          },
        },
      },
      () => ({ tenants: [], householdMembers: [] }),
      () => []
    )
  ).toMatchInlineSnapshot(`
    Object {
      "heading": "Disability",
      "review": Object {
        "rows": Array [
          Object {
            "label": "Does anyone in the household have a disability?",
            "values": Object {
              "notes": Object {
                "databaseMap": ComponentDatabaseMap {
                  "key": [Function],
                  "property": Array [
                    "value",
                  ],
                  "storeName": "store",
                },
                "renderValue": [Function],
              },
              "present": Object {
                "databaseMap": ComponentDatabaseMap {
                  "key": [Function],
                  "property": Array [
                    "value",
                  ],
                  "storeName": "store",
                },
                "renderValue": [Function],
              },
              "who": Object {
                "databaseMap": ComponentDatabaseMap {
                  "key": [Function],
                  "property": Array [
                    "value",
                  ],
                  "storeName": "store",
                },
                "renderValue": [Function],
              },
            },
          },
          Object {
            "label": "What disabilities do those residents have?",
            "values": Object {
              "what": Object {
                "renderValue": [Function],
              },
            },
          },
          Object {
            "label": "Does anyone in the household get Personal Independence Payment (PIP) or Disability Living Allowance (DLA)?",
            "values": Object {
              "pip-or-dla": Object {
                "databaseMap": ComponentDatabaseMap {
                  "key": [Function],
                  "property": Array [
                    "value",
                  ],
                  "storeName": "store",
                },
                "renderValue": [Function],
              },
            },
          },
          Object {
            "label": "Who gets PIP?",
            "values": Object {
              "who-pip": Object {
                "databaseMap": ComponentDatabaseMap {
                  "key": [Function],
                  "property": Array [
                    "value",
                  ],
                  "storeName": "store",
                },
                "renderValue": [Function],
              },
            },
          },
          Object {
            "label": "Who gets DLA?",
            "values": Object {
              "who-dla": Object {
                "databaseMap": ComponentDatabaseMap {
                  "key": [Function],
                  "property": Array [
                    "value",
                  ],
                  "storeName": "store",
                },
                "renderValue": [Function],
              },
            },
          },
        ],
      },
      "step": Object {
        "componentWrappers": Array [],
        "nextSlug": "slug-b",
        "slug": "slug-a",
      },
      "title": "Disability",
    }
  `);
});

describe("DisabilityQuestions", () => {
  it("renders correctly", () => {
    const component = create(
      <DisabilityQuestions
        loading={false}
        residents={[
          {
            id: "resident-a",
            fullName: "Resident A",
            dateOfBirth: "2000-01-01",
          },
        ]}
        disability={{
          present: "yes",
          who: ["resident-a"],
          notes: [{ value: "a note" }],
          pipOrDLA: "yes",
          whoPIP: ["resident-a"],
          whoDLA: ["resident-a"],
        }}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onDisabilityChange={(): void => {}}
        residentDisability={{
          "resident-a": { what: ["hearing", "vision"] },
        }}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onResidentDisabilityChange={(): void => {}}
        ResidentCheckboxes={({ name, value }): JSX.Element => (
          <span>
            ResidentCheckboxes: {name} - {value}
          </span>
        )}
      />
    );

    expect(component).toMatchInlineSnapshot(`
      Array [
        <div
          className="govuk-form-group lbh-form-group"
        >
          <fieldset
            className="govuk-fieldset lbh-fieldset"
          >
            <legend
              className="govuk-fieldset__legend lbh-fieldset__legend"
            >
              Does anyone in the household have a disability?
            </legend>
            <div
              className="govuk-radios lbh-radios"
            >
              <div
                className="govuk-radios__item"
              >
                <input
                  checked={true}
                  className="govuk-radios__input"
                  disabled={false}
                  id="present-yes"
                  name="present"
                  onChange={[Function]}
                  required={false}
                  type="radio"
                  value="yes"
                />
                <label
                  className="govuk-label lbh-label govuk-radios__label"
                  htmlFor="present-yes"
                  id="present-yes-label"
                >
                  Yes
                </label>
              </div>
              <div
                className="govuk-radios__item"
              >
                <input
                  checked={false}
                  className="govuk-radios__input"
                  disabled={false}
                  id="present-no"
                  name="present"
                  onChange={[Function]}
                  required={false}
                  type="radio"
                  value="no"
                />
                <label
                  className="govuk-label lbh-label govuk-radios__label"
                  htmlFor="present-no"
                  id="present-no-label"
                >
                  No
                </label>
              </div>
            </div>
          </fieldset>
        </div>,
        <span>
          ResidentCheckboxes: 
          who
           - 
          resident-a
        </span>,
        <div
          className="govuk-form-group lbh-form-group"
        >
          <fieldset
            className="govuk-fieldset lbh-fieldset"
          >
            <legend
              className="govuk-fieldset__legend lbh-fieldset__legend"
            >
              How is 
              Resident A
               disabled?
            </legend>
            <div
              className="govuk-checkboxes lbh-checkboxes"
            >
              <div
                className="govuk-checkboxes__item"
              >
                <input
                  checked={true}
                  className="govuk-checkboxes__input"
                  disabled={false}
                  id="what-resident-a-hearing"
                  name="what-resident-a"
                  onChange={[Function]}
                  required={false}
                  type="checkbox"
                  value="hearing"
                />
                <label
                  className="govuk-label lbh-label govuk-checkboxes__label"
                  htmlFor="what-resident-a-hearing"
                  id="what-resident-a-hearing-label"
                >
                  Hearing
                </label>
              </div>
              <div
                className="govuk-checkboxes__item"
              >
                <input
                  checked={true}
                  className="govuk-checkboxes__input"
                  disabled={false}
                  id="what-resident-a-vision"
                  name="what-resident-a"
                  onChange={[Function]}
                  required={false}
                  type="checkbox"
                  value="vision"
                />
                <label
                  className="govuk-label lbh-label govuk-checkboxes__label"
                  htmlFor="what-resident-a-vision"
                  id="what-resident-a-vision-label"
                >
                  Vision
                </label>
              </div>
              <div
                className="govuk-checkboxes__item"
              >
                <input
                  checked={false}
                  className="govuk-checkboxes__input"
                  disabled={false}
                  id="what-resident-a-mobility"
                  name="what-resident-a"
                  onChange={[Function]}
                  required={false}
                  type="checkbox"
                  value="mobility"
                />
                <label
                  className="govuk-label lbh-label govuk-checkboxes__label"
                  htmlFor="what-resident-a-mobility"
                  id="what-resident-a-mobility-label"
                >
                  Mobility
                </label>
              </div>
              <div
                className="govuk-checkboxes__item"
              >
                <input
                  checked={false}
                  className="govuk-checkboxes__input"
                  disabled={false}
                  id="what-resident-a-speech"
                  name="what-resident-a"
                  onChange={[Function]}
                  required={false}
                  type="checkbox"
                  value="speech"
                />
                <label
                  className="govuk-label lbh-label govuk-checkboxes__label"
                  htmlFor="what-resident-a-speech"
                  id="what-resident-a-speech-label"
                >
                  Speech
                </label>
              </div>
              <div
                className="govuk-checkboxes__item"
              >
                <input
                  checked={false}
                  className="govuk-checkboxes__input"
                  disabled={false}
                  id="what-resident-a-mental-illness"
                  name="what-resident-a"
                  onChange={[Function]}
                  required={false}
                  type="checkbox"
                  value="mental illness"
                />
                <label
                  className="govuk-label lbh-label govuk-checkboxes__label"
                  htmlFor="what-resident-a-mental-illness"
                  id="what-resident-a-mental-illness-label"
                >
                  Mental illness
                </label>
              </div>
              <div
                className="govuk-checkboxes__item"
              >
                <input
                  checked={false}
                  className="govuk-checkboxes__input"
                  disabled={false}
                  id="what-resident-a-learning-difficulties"
                  name="what-resident-a"
                  onChange={[Function]}
                  required={false}
                  type="checkbox"
                  value="learning difficulties"
                />
                <label
                  className="govuk-label lbh-label govuk-checkboxes__label"
                  htmlFor="what-resident-a-learning-difficulties"
                  id="what-resident-a-learning-difficulties-label"
                >
                  Learning difficuties
                </label>
              </div>
              <div
                className="govuk-checkboxes__item"
              >
                <input
                  checked={false}
                  className="govuk-checkboxes__input"
                  disabled={false}
                  id="what-resident-a-physical-coordination"
                  name="what-resident-a"
                  onChange={[Function]}
                  required={false}
                  type="checkbox"
                  value="physical coordination"
                />
                <label
                  className="govuk-label lbh-label govuk-checkboxes__label"
                  htmlFor="what-resident-a-physical-coordination"
                  id="what-resident-a-physical-coordination-label"
                >
                  Physical co-ordination
                </label>
              </div>
              <div
                className="govuk-checkboxes__item"
              >
                <input
                  checked={false}
                  className="govuk-checkboxes__input"
                  disabled={false}
                  id="what-resident-a-reduced-physical-capability"
                  name="what-resident-a"
                  onChange={[Function]}
                  required={false}
                  type="checkbox"
                  value="reduced physical capability"
                />
                <label
                  className="govuk-label lbh-label govuk-checkboxes__label"
                  htmlFor="what-resident-a-reduced-physical-capability"
                  id="what-resident-a-reduced-physical-capability-label"
                >
                  Reduced physical capability
                </label>
              </div>
              <div
                className="govuk-checkboxes__item"
              >
                <input
                  checked={false}
                  className="govuk-checkboxes__input"
                  disabled={false}
                  id="what-resident-a-physical-disability"
                  name="what-resident-a"
                  onChange={[Function]}
                  required={false}
                  type="checkbox"
                  value="physical disability"
                />
                <label
                  className="govuk-label lbh-label govuk-checkboxes__label"
                  htmlFor="what-resident-a-physical-disability"
                  id="what-resident-a-physical-disability-label"
                >
                  Physical disability
                </label>
              </div>
              <div
                className="govuk-checkboxes__item"
              >
                <input
                  checked={false}
                  className="govuk-checkboxes__input"
                  disabled={false}
                  id="what-resident-a-illness"
                  name="what-resident-a"
                  onChange={[Function]}
                  required={false}
                  type="checkbox"
                  value="illness"
                />
                <label
                  className="govuk-label lbh-label govuk-checkboxes__label"
                  htmlFor="what-resident-a-illness"
                  id="what-resident-a-illness-label"
                >
                  Long term illness
                </label>
              </div>
              <div
                className="govuk-checkboxes__item"
              >
                <input
                  checked={false}
                  className="govuk-checkboxes__input"
                  disabled={false}
                  id="what-resident-a-other"
                  name="what-resident-a"
                  onChange={[Function]}
                  required={false}
                  type="checkbox"
                  value="other"
                />
                <label
                  className="govuk-label lbh-label govuk-checkboxes__label"
                  htmlFor="what-resident-a-other"
                  id="what-resident-a-other-label"
                >
                  Other disability
                </label>
              </div>
              <div
                className="govuk-checkboxes__item"
              >
                <input
                  checked={false}
                  className="govuk-checkboxes__input"
                  disabled={false}
                  id="what-resident-a-prefer-not-to-say"
                  name="what-resident-a"
                  onChange={[Function]}
                  required={false}
                  type="checkbox"
                  value="prefer not to say"
                />
                <label
                  className="govuk-label lbh-label govuk-checkboxes__label"
                  htmlFor="what-resident-a-prefer-not-to-say"
                  id="what-resident-a-prefer-not-to-say-label"
                >
                  Prefer not to say
                </label>
              </div>
            </div>
          </fieldset>
        </div>,
        <div
          className="govuk-form-group lbh-form-group"
        >
          <fieldset
            className="govuk-fieldset lbh-fieldset"
          >
            <legend
              className="govuk-fieldset__legend lbh-fieldset__legend"
            >
              Does anyone in the household get Personal Independence Payment (PIP) or Disability Living Allowance (DLA)?
            </legend>
            <div
              className="govuk-radios lbh-radios"
            >
              <div
                className="govuk-radios__item"
              >
                <input
                  checked={true}
                  className="govuk-radios__input"
                  disabled={false}
                  id="pip-or-dla-yes"
                  name="pip-or-dla"
                  onChange={[Function]}
                  required={false}
                  type="radio"
                  value="yes"
                />
                <label
                  className="govuk-label lbh-label govuk-radios__label"
                  htmlFor="pip-or-dla-yes"
                  id="pip-or-dla-yes-label"
                >
                  Yes
                </label>
              </div>
              <div
                className="govuk-radios__item"
              >
                <input
                  checked={false}
                  className="govuk-radios__input"
                  disabled={false}
                  id="pip-or-dla-no"
                  name="pip-or-dla"
                  onChange={[Function]}
                  required={false}
                  type="radio"
                  value="no"
                />
                <label
                  className="govuk-label lbh-label govuk-radios__label"
                  htmlFor="pip-or-dla-no"
                  id="pip-or-dla-no-label"
                >
                  No
                </label>
              </div>
            </div>
          </fieldset>
        </div>,
        <span>
          ResidentCheckboxes: 
          who-pip
           - 
          resident-a
        </span>,
        <span>
          ResidentCheckboxes: 
          who-dla
           - 
          resident-a
        </span>,
        <div
          className="govuk-form-group lbh-form-group"
        >
          <label
            className="govuk-label lbh-label"
            htmlFor="notes-input"
            id="notes-label"
          >
            Add note about any disability concerns if necessary.
          </label>
          <textarea
            className="govuk-textarea lbh-textarea"
            disabled={false}
            id="notes-input"
            name="notes"
            onChange={[Function]}
            required={false}
            rows={4}
            value="a note"
          />
        </div>,
        <div
          className="govuk-form-group lbh-form-group"
        >
          <div
            className="govuk-checkboxes lbh-checkboxes"
          >
            <div
              className="govuk-checkboxes__item"
            >
              <input
                className="govuk-checkboxes__input"
                disabled={false}
                id="notes-post-visit-action-input"
                name="notes"
                onChange={[Function]}
                required={false}
                type="checkbox"
                value="true"
              />
              <label
                className="govuk-label lbh-label govuk-checkboxes__label"
                htmlFor="notes-post-visit-action-input"
                id="notes-post-visit-action-label"
              >
                Create a post-visit action
              </label>
            </div>
          </div>
        </div>,
      ]
    `);
  });
});
