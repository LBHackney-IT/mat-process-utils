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
import { Checkboxes } from "../../components/Checkboxes";
import { makeResidentCheckboxes } from "../../components/makeResidentCheckboxes";
import { makeSubmit } from "../../components/makeSubmit";
import {
  PostVisitActionInput,
  PostVisitActionInputProps,
} from "../../components/PostVisitActionInput";
import { RadioButtons } from "../../components/RadioButtons";
import { ReviewNotes } from "../../components/ReviewNotes";
import { getKeyFromSlug } from "../../helpers/getKeyFromSlug";
import { getRadioLabelFromValue } from "../../helpers/getRadioLabelFromValue";
import { Notes } from "../../schema/Notes";
import { Residents } from "../../schema/Residents";
import { yesNoRadios } from "../helpers/yesNoRadios";
import {
  MakeDynamicProcessStepDefinitionOptions,
  ProcessStepDefinition,
} from "../ProcessStepDefinition";
import { StepTitle } from "../StepTitle";

export enum HealthKey {
  Concerns = "concerns",
  Who = "who",
  MoreInfo = "more-info",
  Notes = "notes",
}

const questions = {
  [HealthKey.Concerns]:
    "Does anyone in the household have any health concerns?",
  [HealthKey.Who]: "Who has health concerns?",
  [HealthKey.MoreInfo]:
    "Are they interested in more information about or being linked to our support services?",
};

const healthConcernsCheckboxes = [
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

export const makeHealth = <
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
    componentDatabaseMaps,
  }: MakeDynamicProcessStepDefinitionOptions<
    DBNamedSchema,
    StoreName,
    HealthKey,
    Slug
  >,
  getAllResidents: () => Promise<Residents | void> | Residents | void,
  ResidentCheckboxes: ReturnType<typeof makeResidentCheckboxes>
): ProcessStepDefinition<DBNamedSchema, StoreName> => ({
  title: StepTitle.Health,
  heading: "Health concerns",
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
          key: HealthKey.Concerns,
          Component: RadioButtons,
          props: {
            name: "health-concerns",
            legend: (
              <FieldsetLegend>{questions[HealthKey.Concerns]}</FieldsetLegend>
            ) as React.ReactNode,
            radios: yesNoRadios,
          },
          defaultValue: "",
          emptyValue: "",
          databaseMap: new ComponentDatabaseMap<DBNamedSchema, StoreName>({
            storeName: componentDatabaseMaps[HealthKey.Concerns].storeName,
            key: getKeyFromSlug(basePath),
            property: componentDatabaseMaps[HealthKey.Concerns].property,
          }),
        })
      ),
      ComponentWrapper.wrapDynamic(
        new DynamicComponent({
          key: HealthKey.Who,
          Component: ResidentCheckboxes,
          props: {
            name: "health-concerns-who",
            legend: (
              <FieldsetLegend>{questions[HealthKey.Who]}</FieldsetLegend>
            ) as React.ReactNode,
          },
          renderWhen(stepValues: {
            [HealthKey.Concerns]?: ComponentValue<DBNamedSchema, StoreName>;
          }): boolean {
            return stepValues[HealthKey.Concerns] === "yes";
          },
          defaultValue: [],
          emptyValue: [] as string[],
          databaseMap: new ComponentDatabaseMap<DBNamedSchema, StoreName>({
            storeName: componentDatabaseMaps[HealthKey.Who].storeName,
            key: getKeyFromSlug(basePath),
            property: componentDatabaseMaps[HealthKey.Who].property,
          }),
        })
      ),
      ComponentWrapper.wrapDynamic(
        new DynamicComponent({
          key: HealthKey.MoreInfo,
          Component: Checkboxes,
          props: {
            name: "health-concerns-more-info",
            legend: (
              <FieldsetLegend>{questions[HealthKey.MoreInfo]}</FieldsetLegend>
            ) as React.ReactNode,
            checkboxes: healthConcernsCheckboxes,
          },
          renderWhen(stepValues: {
            [HealthKey.Concerns]?: ComponentValue<DBNamedSchema, StoreName>;
          }): boolean {
            return stepValues[HealthKey.Concerns] === "yes";
          },
          defaultValue: [],
          emptyValue: [] as string[],
          databaseMap: new ComponentDatabaseMap<DBNamedSchema, StoreName>({
            storeName: componentDatabaseMaps[HealthKey.MoreInfo].storeName,
            key: getKeyFromSlug(basePath),
            property: componentDatabaseMaps[HealthKey.MoreInfo].property,
          }),
        })
      ),
      ComponentWrapper.wrapDynamic(
        new DynamicComponent({
          key: HealthKey.Notes,
          Component: PostVisitActionInput,
          props: {
            name: "health-notes",
            label: {
              value: "Add note about any health concerns if necessary.",
            },
            rows: 4,
          } as PostVisitActionInputProps,
          renderWhen(stepValues: {
            [HealthKey.Concerns]?: ComponentValue<DBNamedSchema, StoreName>;
          }): boolean {
            return stepValues[HealthKey.Concerns] === "yes";
          },
          defaultValue: [] as Notes,
          emptyValue: [] as Notes,
          databaseMap: new ComponentDatabaseMap<DBNamedSchema, StoreName>({
            storeName: componentDatabaseMaps[HealthKey.Notes].storeName,
            key: getKeyFromSlug(basePath),
            property: componentDatabaseMaps[HealthKey.Notes].property,
          }),
        })
      ),
    ],
  },
  review: {
    rows: [
      {
        label: questions[HealthKey.Concerns],
        values: {
          [HealthKey.Concerns]: {
            renderValue(concerns: string): React.ReactNode {
              return getRadioLabelFromValue(yesNoRadios, concerns);
            },
          },
        },
      },
      {
        label: questions[HealthKey.Who],
        values: {
          [HealthKey.Who]: {
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
        label: questions[HealthKey.MoreInfo],
        values: {
          [HealthKey.MoreInfo]: {
            renderValue(moreInfo: string[]): React.ReactNode {
              return moreInfo
                .map((info: string) => {
                  return getRadioLabelFromValue(healthConcernsCheckboxes, info);
                })
                .join(", ");
            },
          },
          [HealthKey.Notes]: {
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
