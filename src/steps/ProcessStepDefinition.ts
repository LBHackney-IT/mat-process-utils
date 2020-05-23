import React from "react";
import {
  ComponentDatabaseMap,
  ComponentDatabaseMapOptions,
  DatabaseContext,
  NamedSchema,
  Schema,
  StepDefinition,
  StoreNames,
} from "remultiform";

interface BaseStepDefinition<
  DBNamedSchema extends NamedSchema<string, number, Schema>,
  StoreName extends StoreNames<DBNamedSchema["schema"]>
> {
  context?: DatabaseContext<DBNamedSchema>;
  step: StepDefinition<DBNamedSchema, StoreName>;
  errors?: {
    required?: { [key: string]: string };
  };
  review?: {
    rows: {
      label: string;
      values: {
        [s: string]:
          | {
              renderValue(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                value: any
              ): React.ReactNode | Promise<React.ReactNode>;
              databaseMap?: ComponentDatabaseMap<DBNamedSchema, StoreName>;
            }
          | undefined;
      };
      images?: string;
    }[];
  };
}

interface TitledStepDefinition<
  DBNamedSchema extends NamedSchema<string, number, Schema>,
  StoreName extends StoreNames<DBNamedSchema["schema"]>
> extends BaseStepDefinition<DBNamedSchema, StoreName> {
  title: string;
  heading?: string;
}

interface HeadedStepDefinition<
  DBNamedSchema extends NamedSchema<string, number, Schema>,
  StoreName extends StoreNames<DBNamedSchema["schema"]>
> extends BaseStepDefinition<DBNamedSchema, StoreName> {
  title?: string;
  heading: string;
}

export type ProcessStepDefinition<
  DBNamedSchema extends NamedSchema<string, number, Schema>,
  StoreName extends StoreNames<DBNamedSchema["schema"]> = StoreNames<
    DBNamedSchema["schema"]
  >
> =
  | TitledStepDefinition<DBNamedSchema, StoreName>
  | HeadedStepDefinition<DBNamedSchema, StoreName>;

export interface ComponentProcessStepDefinition<
  DBNamedSchema extends NamedSchema<string, number, Schema>,
  StoreName extends StoreNames<DBNamedSchema["schema"]>,
  StepComponentProps extends {}
> {
  title: NonNullable<ProcessStepDefinition<DBNamedSchema, StoreName>["title"]>;
  heading?: ProcessStepDefinition<DBNamedSchema, StoreName>["heading"];
  step: {
    Component: React.FunctionComponent<StepComponentProps>;
  };
  review: NonNullable<BaseStepDefinition<DBNamedSchema, StoreName>["review"]>;
}

export interface MakeStaticProcessStepDefinitionOptions<Slug extends string> {
  basePath: string;
  stepSlugs: Slug[];
  repeatingStepSlugs: Slug[];
  slug: Slug;
  nextSlug: Slug;
}

export interface MakeDynamicProcessStepDefinitionOptions<
  DBNamedSchema extends NamedSchema<string, number, Schema>,
  StoreName extends StoreNames<DBNamedSchema["schema"]>,
  ComponentKey extends string,
  Slug extends string
> extends MakeStaticProcessStepDefinitionOptions<Slug> {
  context?: DatabaseContext<DBNamedSchema>;
  componentDatabaseMaps: {
    [key in ComponentKey]: {
      storeName: ComponentDatabaseMapOptions<
        DBNamedSchema,
        StoreName
      >["storeName"];
      property?: ComponentDatabaseMapOptions<
        DBNamedSchema,
        StoreName
      >["property"];
    };
  };
}

export interface MakeComponentProcessStepDefinitionOptions<
  DBNamedSchema extends NamedSchema<string, number, Schema>,
  StoreName extends StoreNames<DBNamedSchema["schema"]>,
  ComponentKey extends string
> {
  basePath: MakeDynamicProcessStepDefinitionOptions<
    DBNamedSchema,
    StoreName,
    ComponentKey,
    never
  >["basePath"];
  componentDatabaseMaps: MakeDynamicProcessStepDefinitionOptions<
    DBNamedSchema,
    StoreName,
    ComponentKey,
    never
  >["componentDatabaseMaps"];
}
