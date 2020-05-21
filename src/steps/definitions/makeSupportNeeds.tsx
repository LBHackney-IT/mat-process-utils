import { Heading, HeadingLevels, Link, Paragraph } from "lbh-frontend-react";
import React from "react";
import {
  ComponentDatabaseMap,
  ComponentWrapper,
  DynamicComponent,
  NamedSchema,
  Schema,
  StaticComponent,
  StoreNames,
} from "remultiform";
import { makeSubmit } from "../../components/makeSubmit";
import {
  PostVisitActionInputDetails,
  PostVisitActionInputDetailsProps,
} from "../../components/PostVisitActionInputDetails";
import { ReviewNotes } from "../../components/ReviewNotes";
import { getKeyFromSlug } from "../../helpers/getKeyFromSlug";
import { Notes } from "../../schema/Notes";
import {
  MakeDynamicProcessStepDefinitionOptions,
  ProcessStepDefinition,
} from "../ProcessStepDefinition";
import { StepTitle } from "../StepTitle";

export enum SupportNeedsKey {
  ResidentSustainment = "resident-sustainment",
  Befriending = "befriending",
  AdultSafeguarding = "adult-safeguarding",
  ChildSafeguarding = "child-safeguarding",
  DomesticViolence = "domestic-violence",
  MentalHealth18To65 = "mental-health-18-65",
  MentalHealthOver65 = "mental-health-over-65",
}

export const makeSupportNeeds = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  DBNamedSchema extends NamedSchema<string, number, Schema<any>>,
  StoreName extends StoreNames<DBNamedSchema["schema"]>,
  Slug extends string
>({
  basePath,
  stepSlugs,
  repeatingStepSlugs,
  slug,
  nextSlug,
  componentDatabaseMaps,
}: MakeDynamicProcessStepDefinitionOptions<
  DBNamedSchema,
  StoreName,
  SupportNeedsKey,
  Slug
>): ProcessStepDefinition<DBNamedSchema, StoreName> => ({
  title: StepTitle.SupportNeeds,
  heading: "Support needs",
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
      ComponentWrapper.wrapStatic<DBNamedSchema, StoreName>(
        new StaticComponent({
          key: "heading",
          Component: Heading,
          props: {
            level: HeadingLevels.H2,
            children: "Does anyone have support needs?",
          },
        })
      ),
      ComponentWrapper.wrapStatic<DBNamedSchema, StoreName>(
        new StaticComponent({
          key: "instruction",
          Component: Paragraph,
          props: {
            children:
              "Please consider whether the tenant(s) would benefit from being referred to any of the following services or agencies.",
          },
        })
      ),
      ComponentWrapper.wrapDynamic(
        new DynamicComponent({
          key: SupportNeedsKey.ResidentSustainment,
          Component: PostVisitActionInputDetails,
          props: {
            summary: (
              <>
                <h2>Resident sustainment</h2>
                <br />
                <span>
                  Is the household considered to be at risk of tenancy failure
                  or leasehold enforcement?
                </span>
              </>
            ),
            name: "resident-sustainment-notes",
            label: {
              id: "resident-sustainment-notes-label",
              value: "Add note for post visit referral.",
            },
            contentAfter: (
              <Paragraph>
                Or refer now:{" "}
                <Link
                  href="//docs.google.com/forms/d/e/1FAIpQLSexeODLHAxOss3LDDyi66Go_MucxA85VMr5ADGufZzQzJPmpQ/viewform"
                  target="_blank"
                >
                  fill in and send form to Resident Sustainment team
                </Link>{" "}
                (online only, opens in a new tab)
              </Paragraph>
            ),
          } as PostVisitActionInputDetailsProps,
          defaultValue: [] as Notes,
          emptyValue: [] as Notes,
          databaseMap: new ComponentDatabaseMap<DBNamedSchema, StoreName>({
            storeName:
              componentDatabaseMaps[SupportNeedsKey.ResidentSustainment]
                .storeName,
            key: getKeyFromSlug(basePath),
            property:
              componentDatabaseMaps[SupportNeedsKey.ResidentSustainment]
                .property,
          }),
        })
      ),
      ComponentWrapper.wrapDynamic(
        new DynamicComponent({
          key: SupportNeedsKey.Befriending,
          Component: PostVisitActionInputDetails,
          props: {
            summary: (
              <>
                <h2>Befriending and support services</h2>
                <br />
                <span>
                  Are there any concerns where the tenant would benefit from
                  help from another agency or service via the Outward team?
                </span>
              </>
            ),
            name: "befriending-notes",
            label: {
              id: "befriending-notes-label",
              value: "Add note for post visit referral.",
            },
          } as PostVisitActionInputDetailsProps,
          defaultValue: [] as Notes,
          emptyValue: [] as Notes,
          databaseMap: new ComponentDatabaseMap<DBNamedSchema, StoreName>({
            storeName:
              componentDatabaseMaps[SupportNeedsKey.Befriending].storeName,
            key: getKeyFromSlug(basePath),
            property:
              componentDatabaseMaps[SupportNeedsKey.Befriending].property,
          }),
        })
      ),
      ComponentWrapper.wrapDynamic(
        new DynamicComponent({
          key: SupportNeedsKey.AdultSafeguarding,
          Component: PostVisitActionInputDetails,
          props: {
            summary: (
              <>
                <h2>Adult safeguarding</h2>
                <br />
                <span>
                  Have you or a member of the household expressed concerns
                  relating to adult safeguarding or self neglect?
                </span>
              </>
            ),
            name: "adult-safeguarding-notes",
            label: {
              id: "adult-safeguarding-notes-label",
              value: "Add note for post visit referral.",
            },
            contentAfter: (
              <Paragraph>
                Website:{" "}
                <Link
                  href="//www.hackney.gov.uk/safeguarding-vulnerable-adults"
                  target="_blank"
                >
                  Information about safeguarding vulnerable adults
                </Link>{" "}
                (online only, opens in a new tab)
                <br />
                Email:{" "}
                <Link href="mailto:adultprotection@hackney.gov.uk">
                  adultprotection@hackney.gov.uk
                </Link>
                <br />
                Phone: 020 8356 5782
                <br />
                Out of hours: 020 8356 2300
                <br />
                For someone in the City of London area,{" "}
                <Link
                  href="//www.cityoflondon.gov.uk/services/adult-social-care/Pages/contact-us.aspx"
                  target="_blank"
                >
                  contact the City of London Adult Social Care Team
                </Link>{" "}
                (online only, opens in a new tab)
              </Paragraph>
            ),
          } as PostVisitActionInputDetailsProps,
          defaultValue: [] as Notes,
          emptyValue: [] as Notes,
          databaseMap: new ComponentDatabaseMap<DBNamedSchema, StoreName>({
            storeName:
              componentDatabaseMaps[SupportNeedsKey.AdultSafeguarding]
                .storeName,
            key: getKeyFromSlug(basePath),
            property:
              componentDatabaseMaps[SupportNeedsKey.AdultSafeguarding].property,
          }),
        })
      ),
      ComponentWrapper.wrapDynamic(
        new DynamicComponent({
          key: SupportNeedsKey.ChildSafeguarding,
          Component: PostVisitActionInputDetails,
          props: {
            summary: (
              <>
                <h2>Children&apos;s and Young People&apos;s safeguarding</h2>
                <br />
                <span>
                  Have you or a member of the household expressed concerns
                  relating to children and young people’s safeguarding?
                </span>
              </>
            ),
            name: "child-safeguarding-notes",
            label: {
              id: "child-safeguarding-notes-label",
              value: "Add note for post visit referral.",
            },
            contentAfter: (
              <>
                <Paragraph>Or refer now:</Paragraph>
                <Paragraph>
                  Hackney First Access Screening Team (FAST)
                  <br />
                  Email:{" "}
                  <Link href="mailto:fast@hackney.gov.uk">
                    fast@hackney.gov.uk
                  </Link>
                  <br />
                  Phone: 020 8356 5500
                </Paragraph>
                <Paragraph>
                  Children&apos;s and young people&apos;s safeguarding
                  <br />
                  Email:{" "}
                  <Link href="mailto:cscreferrals@hackney.gov.uk">
                    cscreferrals@hackney.gov.uk
                  </Link>
                  <br />
                  Phone: 020 8356 4844
                  <br />
                  Out of hours: 020 8356 2710
                </Paragraph>
              </>
            ),
          } as PostVisitActionInputDetailsProps,
          defaultValue: [] as Notes,
          emptyValue: [] as Notes,
          databaseMap: new ComponentDatabaseMap<DBNamedSchema, StoreName>({
            storeName:
              componentDatabaseMaps[SupportNeedsKey.ChildSafeguarding]
                .storeName,
            key: getKeyFromSlug(basePath),
            property:
              componentDatabaseMaps[SupportNeedsKey.ChildSafeguarding].property,
          }),
        })
      ),
      ComponentWrapper.wrapDynamic(
        new DynamicComponent({
          key: SupportNeedsKey.DomesticViolence,
          Component: PostVisitActionInputDetails,
          props: {
            summary: (
              <>
                <h2>Domestic or sexual violence</h2>
                <br />
                <span>
                  Have you or a member of the household expressed concerns
                  relating to domestic or sexual violence?
                </span>
              </>
            ),
            name: "domestic-violence-notes",
            label: {
              id: "domestic-violence-notes-label",
              value: "Add note for post visit referral.",
            },
            contentAfter: (
              <>
                <Paragraph>Or refer now:</Paragraph>
                <Paragraph>
                  Email:{" "}
                  <Link href="mailto:dias@hackney.gov.uk">
                    dias@hackney.gov.uk
                  </Link>
                  <br />
                  Phone: 020 8356 4458 / 4459 or 0800 056 0905
                </Paragraph>
              </>
            ),
          } as PostVisitActionInputDetailsProps,
          defaultValue: [] as Notes,
          emptyValue: [] as Notes,
          databaseMap: new ComponentDatabaseMap<DBNamedSchema, StoreName>({
            storeName:
              componentDatabaseMaps[SupportNeedsKey.DomesticViolence].storeName,
            key: getKeyFromSlug(basePath),
            property:
              componentDatabaseMaps[SupportNeedsKey.DomesticViolence].property,
          }),
        })
      ),
      ComponentWrapper.wrapDynamic(
        new DynamicComponent({
          key: SupportNeedsKey.MentalHealth18To65,
          Component: PostVisitActionInputDetails,
          props: {
            summary: (
              <>
                <h2>Mental health &mdash; aged 18&ndash;65</h2>
                <br />
                <span>
                  Have you or a member of the household aged between 18-65
                  expressed concerns relating to their mental health?
                </span>
              </>
            ),
            name: "mental-health-18-65-notes",
            label: {
              id: "mental-health-18-65-notes-label",
              value: "Add note for post visit referral.",
            },
            contentAfter: (
              <>
                <Paragraph>Or refer now:</Paragraph>
                <Paragraph>
                  Website:{" "}
                  <Link
                    href="//www.hackney.gov.uk/mental-health"
                    target="_blank"
                  >
                    Hackney mental health support
                  </Link>{" "}
                  (online only, opens in a new tab)
                </Paragraph>
              </>
            ),
          } as PostVisitActionInputDetailsProps,
          defaultValue: [] as Notes,
          emptyValue: [] as Notes,
          databaseMap: new ComponentDatabaseMap<DBNamedSchema, StoreName>({
            storeName:
              componentDatabaseMaps[SupportNeedsKey.MentalHealth18To65]
                .storeName,
            key: getKeyFromSlug(basePath),
            property:
              componentDatabaseMaps[SupportNeedsKey.MentalHealth18To65]
                .property,
          }),
        })
      ),
      ComponentWrapper.wrapDynamic(
        new DynamicComponent({
          key: SupportNeedsKey.MentalHealthOver65,
          Component: PostVisitActionInputDetails,
          props: {
            summary: (
              <>
                <h2>Mental health &mdash; aged over 65</h2>
                <br />
                <span>
                  Have you or a member of the household aged over 65 expressed
                  concerns relating to their mental health?
                </span>
              </>
            ),
            name: "mental-health-over-65-notes",
            label: {
              id: "mental-health-over-65-notes-label",
              value: "Add note for post visit referral.",
            },
            contentAfter: (
              <>
                <Paragraph>Or refer now:</Paragraph>
                <Paragraph>
                  Phone: 020 3222 8500 / 020 3222 8628
                  <br />
                  Website:{" "}
                  <Link
                    href="//www.elft.nhs.uk/service/69/CMHT-for-Older-People---City-and-Hackney"
                    target="_blank"
                  >
                    City and Hackney Community Mental Health Team for Older
                    People
                  </Link>{" "}
                  (online only, opens in a new tab)
                </Paragraph>
              </>
            ),
          } as PostVisitActionInputDetailsProps,
          defaultValue: [] as Notes,
          emptyValue: [] as Notes,
          databaseMap: new ComponentDatabaseMap<DBNamedSchema, StoreName>({
            storeName:
              componentDatabaseMaps[SupportNeedsKey.MentalHealthOver65]
                .storeName,
            key: getKeyFromSlug(basePath),
            property:
              componentDatabaseMaps[SupportNeedsKey.MentalHealthOver65]
                .property,
          }),
        })
      ),
    ],
  },
  review: {
    rows: [
      {
        label: "Resident sustainment",
        values: {
          [SupportNeedsKey.ResidentSustainment]: {
            renderValue(notes: Notes): React.ReactNode {
              if (notes.length === 0) {
                return;
              }

              return <ReviewNotes notes={notes} />;
            },
          },
        },
      },
      {
        label: "Befriending",
        values: {
          [SupportNeedsKey.Befriending]: {
            renderValue(notes: Notes): React.ReactNode {
              if (notes.length === 0) {
                return;
              }

              return <ReviewNotes notes={notes} />;
            },
          },
        },
      },
      {
        label: "Adult safeguarding",
        values: {
          [SupportNeedsKey.AdultSafeguarding]: {
            renderValue(notes: Notes): React.ReactNode {
              if (notes.length === 0) {
                return;
              }

              return <ReviewNotes notes={notes} />;
            },
          },
        },
      },
      {
        label: "Children's and young people's safeguarding",
        values: {
          [SupportNeedsKey.ChildSafeguarding]: {
            renderValue(notes: Notes): React.ReactNode {
              if (notes.length === 0) {
                return;
              }

              return <ReviewNotes notes={notes} />;
            },
          },
        },
      },
      {
        label: "Domestic violence & sexual abuse",
        values: {
          [SupportNeedsKey.DomesticViolence]: {
            renderValue(notes: Notes): React.ReactNode {
              if (notes.length === 0) {
                return;
              }

              return <ReviewNotes notes={notes} />;
            },
          },
        },
      },
      {
        label: "Mental health - aged 18-65",
        values: {
          [SupportNeedsKey.MentalHealth18To65]: {
            renderValue(notes: Notes): React.ReactNode {
              if (notes.length === 0) {
                return;
              }

              return <ReviewNotes notes={notes} />;
            },
          },
        },
      },
      {
        label: "Mental health - over 65",
        values: {
          [SupportNeedsKey.MentalHealthOver65]: {
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
