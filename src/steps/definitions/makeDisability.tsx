import { FieldsetLegend } from "lbh-frontend-react";
import React from "react";
import {
  ComponentDatabaseMap,
  NamedSchema,
  Schema,
  StoreNames,
} from "remultiform";
import { Checkboxes } from "../../components/Checkboxes";
import { makeResidentCheckboxes } from "../../components/makeResidentCheckboxes";
import { PostVisitActionInput } from "../../components/PostVisitActionInput";
import { RadioButtons } from "../../components/RadioButtons";
import { ReviewNotes } from "../../components/ReviewNotes";
import { getCheckboxLabelsFromValues } from "../../helpers/getCheckboxLabelsFromValues";
import { getKeyFromSlug } from "../../helpers/getKeyFromSlug";
import { getRadioLabelFromValue } from "../../helpers/getRadioLabelFromValue";
import { Notes } from "../../schema/Notes";
import { Resident, Residents } from "../../schema/Residents";
import { yesNoRadios } from "../helpers/yesNoRadios";
import {
  ComponentProcessStepDefinition,
  MakeComponentProcessStepDefinitionOptions,
} from "../ProcessStepDefinition";
import { StepTitle } from "../StepTitle";

export enum DisabilityKey {
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

export const disabilityQuestions = {
  [DisabilityKey.Present]: "Does anyone in the household have a disability?",
  [DisabilityKey.Who]: "Who has a disability?",
  [DisabilityKey.PIPOrDLA]:
    "Does anyone in the household get Personal Independence Payment (PIP) or Disability Living Allowance (DLA)?",
  [DisabilityKey.WhoPIP]: "Who gets PIP?",
  [DisabilityKey.WhoDLA]: "Who gets DLA?",
};

export const whatDisabilityCheckboxes = [
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
            {disabilityQuestions[DisabilityKey.Present]}
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
                {disabilityQuestions[DisabilityKey.Who]}
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
                  checkboxes={whatDisabilityCheckboxes}
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
                {disabilityQuestions[DisabilityKey.PIPOrDLA]}
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
                    {disabilityQuestions[DisabilityKey.WhoPIP]}
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
                    {disabilityQuestions[DisabilityKey.WhoDLA]}
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

export const makeDisability = <
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
    DisabilityKey
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
        label: disabilityQuestions[DisabilityKey.Present],
        values: {
          [DisabilityKey.Present]: {
            renderValue(present: string): React.ReactNode {
              return getRadioLabelFromValue(yesNoRadios, present);
            },
            databaseMap: new ComponentDatabaseMap<DBNamedSchema, StoreName>({
              storeName: componentDatabaseMaps[DisabilityKey.Present].storeName,
              key: getKeyFromSlug(basePath),
              property: componentDatabaseMaps[DisabilityKey.Present].property,
            }),
          },
          [DisabilityKey.Who]: {
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
              storeName: componentDatabaseMaps[DisabilityKey.Who].storeName,
              key: getKeyFromSlug(basePath),
              property: componentDatabaseMaps[DisabilityKey.Who].property,
            }),
          },
          [DisabilityKey.Notes]: {
            renderValue(notes: Notes): React.ReactNode {
              if (notes.length === 0) {
                return;
              }

              return <ReviewNotes notes={notes} />;
            },
            databaseMap: new ComponentDatabaseMap<DBNamedSchema, StoreName>({
              storeName: componentDatabaseMaps[DisabilityKey.Notes].storeName,
              key: getKeyFromSlug(basePath),
              property: componentDatabaseMaps[DisabilityKey.Notes].property,
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
                            whatDisabilityCheckboxes,
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
        label: disabilityQuestions[DisabilityKey.PIPOrDLA],
        values: {
          [DisabilityKey.PIPOrDLA]: {
            renderValue(pipOrDLA: string): React.ReactNode {
              return getRadioLabelFromValue(yesNoRadios, pipOrDLA);
            },
            databaseMap: new ComponentDatabaseMap<DBNamedSchema, StoreName>({
              storeName:
                componentDatabaseMaps[DisabilityKey.PIPOrDLA].storeName,
              key: getKeyFromSlug(basePath),
              property: componentDatabaseMaps[DisabilityKey.PIPOrDLA].property,
            }),
          },
        },
      },
      {
        label: disabilityQuestions[DisabilityKey.WhoPIP],
        values: {
          [DisabilityKey.WhoPIP]: {
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
              storeName: componentDatabaseMaps[DisabilityKey.WhoPIP].storeName,
              key: getKeyFromSlug(basePath),
              property: componentDatabaseMaps[DisabilityKey.WhoPIP].property,
            }),
          },
        },
      },
      {
        label: disabilityQuestions[DisabilityKey.WhoDLA],
        values: {
          [DisabilityKey.WhoDLA]: {
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
              storeName: componentDatabaseMaps[DisabilityKey.WhoDLA].storeName,
              key: getKeyFromSlug(basePath),
              property: componentDatabaseMaps[DisabilityKey.WhoDLA].property,
            }),
          },
        },
      },
    ],
  },
});
