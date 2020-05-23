import { FieldsetLegend } from "lbh-frontend-react";
import React from "react";
import {
  ComponentDatabaseMap,
  NamedSchema,
  Schema,
  StoreNames,
} from "remultiform";
import { Checkboxes } from "../../../components/Checkboxes";
import { makeResidentCheckboxes } from "../../../components/makeResidentCheckboxes";
import { PostVisitActionInput } from "../../../components/PostVisitActionInput";
import { RadioButtons } from "../../../components/RadioButtons";
import { ReviewNotes } from "../../../components/ReviewNotes";
import { getCheckboxLabelsFromValues } from "../../../helpers/getCheckboxLabelsFromValues";
import { getKeyFromSlug } from "../../../helpers/getKeyFromSlug";
import { getRadioLabelFromValue } from "../../../helpers/getRadioLabelFromValue";
import { Notes } from "../../../schema/Notes";
import { Resident, Residents } from "../../../schema/Residents";
import { yesNoRadios } from "../../helpers/yesNoRadios";
import {
  ComponentProcessStepDefinition,
  MakeComponentProcessStepDefinitionOptions,
} from "../../ProcessStepDefinition";
import { StepTitle } from "../../StepTitle";

export enum DisabilityStepKey {
  Present = "present",
  Who = "who",
  Notes = "notes",
  PIPOrDLA = "pip-or-dla",
  WhoPIP = "who-pip",
  WhoDLA = "who-dla",
}

interface Disability {
  present?: string;
  who?: string[];
  notes?: Notes;
  pipOrDLA?: string;
  whoPIP?: string[];
  whoDLA?: string[];
}

interface ResidentDisability {
  [id: string]:
    | {
        what?: string[];
      }
    | undefined;
}

type ResidentDisabilities = {
  id: string;
  disabilities: string[] | undefined;
}[];

const disabilityQuestions = {
  [DisabilityStepKey.Present]:
    "Does anyone in the household have a disability?",
  [DisabilityStepKey.Who]: "Who has a disability?",
  [DisabilityStepKey.PIPOrDLA]:
    "Does anyone in the household get Personal Independence Payment (PIP) or Disability Living Allowance (DLA)?",
  [DisabilityStepKey.WhoPIP]: "Who gets PIP?",
  [DisabilityStepKey.WhoDLA]: "Who gets DLA?",
};

const whatCheckboxes = [
  {
    label: "Hearing",
    value: "hearing",
  },
  {
    label: "Vision",
    value: "vision",
  },
  {
    label: "Mobility",
    value: "mobility",
  },
  {
    label: "Speech",
    value: "speech",
  },
  {
    label: "Mental illness",
    value: "mental illness",
  },
  {
    label: "Learning difficuties",
    value: "learning difficulties",
  },
  {
    label: "Physical co-ordination",
    value: "physical coordination",
  },
  {
    label: "Reduced physical capability",
    value: "reduced physical capability",
  },
  {
    label: "Physical disability",
    value: "physical disability",
  },
  {
    label: "Long term illness",
    value: "illness",
  },
  {
    label: "Other disability",
    value: "other",
  },
  {
    label: "Prefer not to say",
    value: "prefer not to say",
  },
];

export interface DisabilityStepProps {
  loading?: boolean;
  residents: Resident[];
  disability: Disability;
  onDisabilityChange(disability: Disability): void;
  residentDisability: ResidentDisability;
  onResidentDisabilityChange(residentDisability: ResidentDisability): void;
  ResidentCheckboxes: ReturnType<typeof makeResidentCheckboxes>;
}

const DisabilityStep: React.FunctionComponent<DisabilityStepProps> = (
  props
) => {
  const {
    loading,
    residents,
    disability,
    onDisabilityChange,
    residentDisability,
    onResidentDisabilityChange,
    ResidentCheckboxes,
  } = props;

  const disabledResidents = residents.filter((resident) =>
    disability.who?.includes(resident.id)
  );

  const disabled = loading || false;

  return (
    <>
      <RadioButtons
        name="present"
        legend={
          <FieldsetLegend>
            {disabilityQuestions[DisabilityStepKey.Present]}
          </FieldsetLegend>
        }
        radios={yesNoRadios}
        disabled={disabled}
        required={false}
        value={disability.present || ""}
        onValueChange={(present): void => {
          onDisabilityChange({ present });
        }}
      />

      {disability.present === "yes" && (
        <>
          <ResidentCheckboxes
            name="who"
            legend={
              <FieldsetLegend>
                {disabilityQuestions[DisabilityStepKey.Who]}
              </FieldsetLegend>
            }
            disabled={disabled}
            required={false}
            value={disability.who || []}
            onValueChange={(who): void => {
              onDisabilityChange({ who });
            }}
          />

          {loading
            ? "Loading..."
            : disabledResidents.map(({ id, fullName }) => (
                <Checkboxes
                  key={id}
                  name={`what-${id}`}
                  legend={
                    <FieldsetLegend>How is {fullName} disabled?</FieldsetLegend>
                  }
                  checkboxes={whatCheckboxes}
                  disabled={disabled}
                  required={false}
                  value={(residentDisability || {})[id]?.what || []}
                  onValueChange={(what): void => {
                    onResidentDisabilityChange({ [id]: { what } });
                  }}
                />
              ))}

          <RadioButtons
            name="pip-or-dla"
            legend={
              <FieldsetLegend>
                {disabilityQuestions[DisabilityStepKey.PIPOrDLA]}
              </FieldsetLegend>
            }
            radios={yesNoRadios}
            disabled={disabled}
            required={false}
            value={disability.pipOrDLA || ""}
            onValueChange={(pipOrDLA): void => {
              onDisabilityChange({ pipOrDLA });
            }}
          />

          {disability.pipOrDLA === "yes" && (
            <>
              <ResidentCheckboxes
                name="who-pip"
                legend={
                  <FieldsetLegend>
                    {disabilityQuestions[DisabilityStepKey.WhoPIP]}
                  </FieldsetLegend>
                }
                disabled={disabled}
                required={false}
                value={disability.whoPIP || []}
                onValueChange={(whoPIP): void => {
                  onDisabilityChange({ whoPIP });
                }}
              />

              <ResidentCheckboxes
                name="who-dla"
                legend={
                  <FieldsetLegend>
                    {disabilityQuestions[DisabilityStepKey.WhoDLA]}
                  </FieldsetLegend>
                }
                disabled={disabled}
                required={false}
                value={disability.whoDLA || []}
                onValueChange={(whoDLA): void => {
                  onDisabilityChange({ whoDLA });
                }}
              />
            </>
          )}

          <PostVisitActionInput
            name="notes"
            label={{
              value: "Add note about any disability concerns if necessary.",
            }}
            rows={4}
            disabled={disabled}
            required={false}
            value={disability.notes || []}
            onValueChange={(notes): void => {
              onDisabilityChange({ notes });
            }}
          />
        </>
      )}
    </>
  );
};

export const makeDisabilityStep = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  DBNamedSchema extends NamedSchema<string, number, Schema<any>>,
  StoreName extends StoreNames<DBNamedSchema["schema"]>
>(
  {
    basePath,
    componentDatabaseMaps,
  }: MakeComponentProcessStepDefinitionOptions<
    DBNamedSchema,
    StoreName,
    DisabilityStepKey
  >,
  getAllResidents: () => Promise<Residents | void> | Residents | void,
  getResidentDisabilities: () =>
    | Promise<ResidentDisabilities | void>
    | ResidentDisabilities
    | void
): ComponentProcessStepDefinition<
  DBNamedSchema,
  StoreName,
  DisabilityStepProps
> => ({
  title: StepTitle.Disability,
  heading: "Disability",
  step: {
    Component: DisabilityStep,
  },
  review: {
    rows: [
      {
        label: disabilityQuestions[DisabilityStepKey.Present],
        values: {
          [DisabilityStepKey.Present]: {
            renderValue(present: string): React.ReactNode {
              return getRadioLabelFromValue(yesNoRadios, present);
            },
            databaseMap: new ComponentDatabaseMap<DBNamedSchema, StoreName>({
              storeName:
                componentDatabaseMaps[DisabilityStepKey.Present].storeName,
              key: getKeyFromSlug(basePath),
              property:
                componentDatabaseMaps[DisabilityStepKey.Present].property,
            }),
          },
          [DisabilityStepKey.Who]: {
            async renderValue(who: string[]): Promise<React.ReactNode> {
              const residents = await getAllResidents();

              if (!residents) {
                return;
              }

              const { tenants, householdMembers } = residents;

              return [...(tenants || []), ...(householdMembers || [])]
                .filter(({ id }) => who.includes(id))
                .map(({ fullName }) => fullName)
                .join(", ");
            },
            databaseMap: new ComponentDatabaseMap<DBNamedSchema, StoreName>({
              storeName: componentDatabaseMaps[DisabilityStepKey.Who].storeName,
              key: getKeyFromSlug(basePath),
              property: componentDatabaseMaps[DisabilityStepKey.Who].property,
            }),
          },
          [DisabilityStepKey.Notes]: {
            renderValue(notes: Notes): React.ReactNode {
              if (notes.length === 0) {
                return;
              }

              return <ReviewNotes notes={notes} />;
            },
            databaseMap: new ComponentDatabaseMap<DBNamedSchema, StoreName>({
              storeName:
                componentDatabaseMaps[DisabilityStepKey.Notes].storeName,
              key: getKeyFromSlug(basePath),
              property: componentDatabaseMaps[DisabilityStepKey.Notes].property,
            }),
          },
        },
      },
      {
        label: "What disabilities do those residents have?",
        values: {
          what: {
            async renderValue(): Promise<React.ReactNode> {
              const residents = await getAllResidents();

              if (!residents) {
                return;
              }

              const residentDisabilities = await getResidentDisabilities();

              if (
                !residentDisabilities ||
                residentDisabilities.length === 0 ||
                residentDisabilities.every(
                  ({ disabilities }) => disabilities === undefined
                )
              ) {
                return;
              }

              const { tenants, householdMembers } = residents;
              const allResidents = [
                ...(tenants || []),
                ...(householdMembers || []),
              ];

              return (
                <>
                  {residentDisabilities
                    .filter(({ disabilities }) => Boolean(disabilities))
                    .map(({ id, disabilities }) => {
                      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                      const { fullName } = allResidents.find(
                        (resident) => resident.id === id
                      )!;

                      return (
                        <div key={id}>
                          <strong>{fullName}</strong>:{" "}
                          {getCheckboxLabelsFromValues(
                            whatCheckboxes,
                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                            disabilities!
                          )}
                        </div>
                      );
                    })}
                </>
              );
            },
          },
        },
      },
      {
        label: disabilityQuestions[DisabilityStepKey.PIPOrDLA],
        values: {
          [DisabilityStepKey.PIPOrDLA]: {
            renderValue(pipOrDLA: string): React.ReactNode {
              return getRadioLabelFromValue(yesNoRadios, pipOrDLA);
            },
            databaseMap: new ComponentDatabaseMap<DBNamedSchema, StoreName>({
              storeName:
                componentDatabaseMaps[DisabilityStepKey.PIPOrDLA].storeName,
              key: getKeyFromSlug(basePath),
              property:
                componentDatabaseMaps[DisabilityStepKey.PIPOrDLA].property,
            }),
          },
        },
      },
      {
        label: disabilityQuestions[DisabilityStepKey.WhoPIP],
        values: {
          [DisabilityStepKey.WhoPIP]: {
            async renderValue(whoPIP: string[]): Promise<React.ReactNode> {
              const residents = await getAllResidents();

              if (!residents) {
                return;
              }

              const { tenants, householdMembers } = residents;

              return [...(tenants || []), ...(householdMembers || [])]
                .filter(({ id }) => whoPIP.includes(id))
                .map(({ fullName }) => fullName)
                .join(", ");
            },
            databaseMap: new ComponentDatabaseMap<DBNamedSchema, StoreName>({
              storeName:
                componentDatabaseMaps[DisabilityStepKey.WhoPIP].storeName,
              key: getKeyFromSlug(basePath),
              property:
                componentDatabaseMaps[DisabilityStepKey.WhoPIP].property,
            }),
          },
        },
      },
      {
        label: disabilityQuestions[DisabilityStepKey.WhoDLA],
        values: {
          [DisabilityStepKey.WhoDLA]: {
            async renderValue(whoDLA: string[]): Promise<React.ReactNode> {
              const residents = await getAllResidents();

              if (!residents) {
                return;
              }

              const { tenants, householdMembers } = residents;

              return [...(tenants || []), ...(householdMembers || [])]
                .filter(({ id }) => whoDLA.includes(id))
                .map(({ fullName }) => fullName)
                .join(", ");
            },
            databaseMap: new ComponentDatabaseMap<DBNamedSchema, StoreName>({
              storeName:
                componentDatabaseMaps[DisabilityStepKey.WhoDLA].storeName,
              key: getKeyFromSlug(basePath),
              property:
                componentDatabaseMaps[DisabilityStepKey.WhoDLA].property,
            }),
          },
        },
      },
    ],
  },
});
