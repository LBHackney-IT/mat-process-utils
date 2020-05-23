import { FieldsetLegend } from "lbh-frontend-react";
import React from "react";
import {
  ComponentDatabaseMap,
  ComponentValue,
  ComponentWrapper,
  DynamicComponent,
  NamedSchema,
  Schema,
  StoreNames,
} from "remultiform";
import { Checkboxes } from "../../../components/Checkboxes";
import { makeResidentCheckboxes } from "../../../components/makeResidentCheckboxes";
import { makeSubmit } from "../../../components/makeSubmit";
import {
  PostVisitActionInput,
  PostVisitActionInputProps,
} from "../../../components/PostVisitActionInput";
import { RadioButtons } from "../../../components/RadioButtons";
import { ReviewNotes } from "../../../components/ReviewNotes";
import { getKeyFromSlug } from "../../../helpers/getKeyFromSlug";
import { getRadioLabelFromValue } from "../../../helpers/getRadioLabelFromValue";
import { Notes } from "../../../schema/Notes";
import { Residents } from "../../../schema/Residents";
import { yesNoRadios } from "../../helpers/yesNoRadios";
import {
  MakeDynamicProcessStepDefinitionOptions,
  ProcessStepDefinition,
} from "../../ProcessStepDefinition";
import { StepTitle } from "../../StepTitle";

export enum HealthStepKey {
  Concerns = "concerns",
  Who = "who",
  MoreInfo = "more-info",
  Notes = "notes",
}

const questions = {
  [HealthStepKey.Concerns]:
    "Does anyone in the household have any health concerns?",
  [HealthStepKey.Who]: "Who has health concerns?",
  [HealthStepKey.MoreInfo]:
    "Are they interested in more information about or being linked to our support services?",
};

const concernsCheckboxes = [
  {
    label: "Childhood obesity",
    value: "childhood obesity",
  },
  {
    label: "Dementia",
    value: "dementia",
  },
  {
    label: "Mental health",
    value: "mental health",
  },
  {
    label: "Smoking",
    value: "smoking",
  },
];

export const makeHealthStep = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  DBNamedSchema extends NamedSchema<string, number, Schema<any>>,
  StoreName extends StoreNames<DBNamedSchema["schema"]>,
  Slug extends string
>(
  {
    basePath,
    stepSlugs,
    repeatingStepSlugs,
    slug,
    nextSlug,
    context,
    componentDatabaseMaps,
  }: MakeDynamicProcessStepDefinitionOptions<
    DBNamedSchema,
    StoreName,
    HealthStepKey,
    Slug
  >,
  getAllResidents: () => Promise<Residents | void> | Residents | void,
  ResidentCheckboxes: ReturnType<typeof makeResidentCheckboxes>
): ProcessStepDefinition<DBNamedSchema, StoreName> => ({
  title: StepTitle.Health,
  heading: "Health concerns",
  context,
  step: {
    slug,
    nextSlug,
    submit: (nextSlug?: string): ReturnType<typeof makeSubmit> =>
      makeSubmit(
        {
          slug: nextSlug,
          value: "Save and continue",
        },
        basePath,
        stepSlugs,
        repeatingStepSlugs
      ),
    componentWrappers: [
      ComponentWrapper.wrapDynamic(
        new DynamicComponent({
          key: HealthStepKey.Concerns,
          Component: RadioButtons,
          props: {
            name: "health-concerns",
            legend: (
              <FieldsetLegend>
                {questions[HealthStepKey.Concerns]}
              </FieldsetLegend>
            ) as React.ReactNode,
            radios: yesNoRadios,
          },
          defaultValue: "",
          emptyValue: "",
          databaseMap: new ComponentDatabaseMap<DBNamedSchema, StoreName>({
            storeName: componentDatabaseMaps[HealthStepKey.Concerns].storeName,
            key: getKeyFromSlug(basePath),
            property: componentDatabaseMaps[HealthStepKey.Concerns].property,
          }),
        })
      ),
      ComponentWrapper.wrapDynamic(
        new DynamicComponent({
          key: HealthStepKey.Who,
          Component: ResidentCheckboxes,
          props: {
            name: "health-concerns-who",
            legend: (
              <FieldsetLegend>{questions[HealthStepKey.Who]}</FieldsetLegend>
            ) as React.ReactNode,
          },
          renderWhen(stepValues: {
            [HealthStepKey.Concerns]?: ComponentValue<DBNamedSchema, StoreName>;
          }): boolean {
            return stepValues[HealthStepKey.Concerns] === "yes";
          },
          defaultValue: [],
          emptyValue: [] as string[],
          databaseMap: new ComponentDatabaseMap<DBNamedSchema, StoreName>({
            storeName: componentDatabaseMaps[HealthStepKey.Who].storeName,
            key: getKeyFromSlug(basePath),
            property: componentDatabaseMaps[HealthStepKey.Who].property,
          }),
        })
      ),
      ComponentWrapper.wrapDynamic(
        new DynamicComponent({
          key: HealthStepKey.MoreInfo,
          Component: Checkboxes,
          props: {
            name: "health-concerns-more-info",
            legend: (
              <FieldsetLegend>
                {questions[HealthStepKey.MoreInfo]}
              </FieldsetLegend>
            ) as React.ReactNode,
            checkboxes: concernsCheckboxes,
          },
          renderWhen(stepValues: {
            [HealthStepKey.Concerns]?: ComponentValue<DBNamedSchema, StoreName>;
          }): boolean {
            return stepValues[HealthStepKey.Concerns] === "yes";
          },
          defaultValue: [],
          emptyValue: [] as string[],
          databaseMap: new ComponentDatabaseMap<DBNamedSchema, StoreName>({
            storeName: componentDatabaseMaps[HealthStepKey.MoreInfo].storeName,
            key: getKeyFromSlug(basePath),
            property: componentDatabaseMaps[HealthStepKey.MoreInfo].property,
          }),
        })
      ),
      ComponentWrapper.wrapDynamic(
        new DynamicComponent({
          key: HealthStepKey.Notes,
          Component: PostVisitActionInput,
          props: {
            name: "health-notes",
            label: {
              value: "Add note about any health concerns if necessary.",
            },
            rows: 4,
          } as PostVisitActionInputProps,
          renderWhen(stepValues: {
            [HealthStepKey.Concerns]?: ComponentValue<DBNamedSchema, StoreName>;
          }): boolean {
            return stepValues[HealthStepKey.Concerns] === "yes";
          },
          defaultValue: [] as Notes,
          emptyValue: [] as Notes,
          databaseMap: new ComponentDatabaseMap<DBNamedSchema, StoreName>({
            storeName: componentDatabaseMaps[HealthStepKey.Notes].storeName,
            key: getKeyFromSlug(basePath),
            property: componentDatabaseMaps[HealthStepKey.Notes].property,
          }),
        })
      ),
    ],
  },
  review: {
    rows: [
      {
        label: questions[HealthStepKey.Concerns],
        values: {
          [HealthStepKey.Concerns]: {
            renderValue(concerns: string): React.ReactNode {
              return getRadioLabelFromValue(yesNoRadios, concerns);
            },
          },
        },
      },
      {
        label: questions[HealthStepKey.Who],
        values: {
          [HealthStepKey.Who]: {
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
          },
        },
      },
      {
        label: questions[HealthStepKey.MoreInfo],
        values: {
          [HealthStepKey.MoreInfo]: {
            renderValue(moreInfo: string[]): React.ReactNode {
              return moreInfo
                .map((info: string) => {
                  return getRadioLabelFromValue(concernsCheckboxes, info);
                })
                .join(", ");
            },
          },
          [HealthStepKey.Notes]: {
            renderValue(notes: Notes): React.ReactNode {
              if (notes.length === 0) {
                return;
              }

              return <ReviewNotes notes={notes} />;
            },
          },
        },
      },
    ],
  },
});
