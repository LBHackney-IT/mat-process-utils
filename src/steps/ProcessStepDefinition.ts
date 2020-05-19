import React from "react";
import {
  ComponentDatabaseMap,
  ComponentDatabaseMapOptions,
} from "remultiform/component-wrapper";
import { NamedSchema, Schema, StoreNames } from "remultiform/database";
import { DatabaseContext } from "remultiform/database-context";
import { StepDefinition } from "remultiform/step";

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
  DBSchema extends NamedSchema<string, number, Schema>,
  StoreName extends StoreNames<DBSchema["schema"]> = StoreNames<
    DBSchema["schema"]
  >
> =
  | TitledStepDefinition<DBSchema, StoreName>
  | HeadedStepDefinition<DBSchema, StoreName>;

export interface MakeStaticProcessStepDefinitionConfig<Slug extends string> {
  basePath: string;
  stepSlugs: Slug[];
  repeatingStepSlugs?: Slug[];
  slug: Slug;
  nextSlug: Slug;
}

export interface MakeDynamicProcessStepDefinitionConfig<
  DBNamedSchema extends NamedSchema<string, number, Schema>,
  StoreName extends StoreNames<DBNamedSchema["schema"]>,
  ComponentKey extends string,
  Slug extends string
> extends MakeStaticProcessStepDefinitionConfig<Slug> {
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
