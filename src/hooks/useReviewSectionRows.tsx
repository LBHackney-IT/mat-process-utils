import { useRouter } from "next/router";
import { nullAsUndefined } from "null-as-undefined";
import React from "react";
import { useAsync, UseAsyncReturn } from "react-async-hook";
import {
  ComponentDatabaseMap,
  ComponentValue,
  Database,
  DatabaseContext,
  NamedSchema,
  Schema,
  StepDefinition,
  StoreKey,
  StoreMap,
  StoreNames,
  StoreValue,
} from "remultiform";
import { ReviewSectionEntry } from "../components/ReviewSection";
import { ReviewSectionRow } from "../components/ReviewSectionRow";
import { ProcessStepDefinition } from "../steps/ProcessStepDefinition";
import { useDatabase } from "./useDatabase";

interface Value<
  DBNamedSchema extends NamedSchema<string, number, Schema>,
  StoreName extends StoreNames<DBNamedSchema["schema"]>
> {
  databaseMap: ComponentDatabaseMap<DBNamedSchema, StoreName> | undefined;
  renderValue(
    value: ComponentValue<DBNamedSchema, StoreName> | undefined
  ): React.ReactNode | Promise<React.ReactNode>;
}

interface Row<
  DBNamedSchema extends NamedSchema<string, number, Schema>,
  StoreName extends StoreNames<DBNamedSchema["schema"]>,
  Slug extends string
> {
  label: string;
  values: Value<DBNamedSchema, StoreName>[];
  images: ComponentDatabaseMap<DBNamedSchema, StoreName>[];
  changeSlug: Slug;
}

const findKey = <
  DBNamedSchema extends NamedSchema<string, number, Schema>,
  StoreName extends StoreNames<DBNamedSchema["schema"]>
>(
  databaseMap: ComponentDatabaseMap<DBNamedSchema, StoreName>
): StoreKey<DBNamedSchema["schema"], StoreName> | undefined => {
  const { key } = databaseMap;

  return typeof key === "function" ? key() : key;
};

const findValue = <
  DBNamedSchema extends NamedSchema<string, number, Schema>,
  StoreName extends StoreNames<DBNamedSchema["schema"]>
>(
  storeValue: StoreValue<DBNamedSchema["schema"], StoreName> | undefined,
  databaseMap: ComponentDatabaseMap<DBNamedSchema, StoreName>
): ComponentValue<DBNamedSchema, StoreName> | undefined => {
  if (storeValue === undefined) {
    return;
  }

  const propertyMap = databaseMap.property as
    | [string]
    | [string, string]
    | undefined;

  if (!propertyMap) {
    return storeValue;
  }

  const child = ((storeValue as unknown) as {
    [s: string]: ComponentValue<DBNamedSchema, StoreName>;
  })[propertyMap[0]];

  if (child === undefined) {
    return;
  }

  if (propertyMap.length === 1) {
    return (child as unknown) as ComponentValue<DBNamedSchema, StoreName>;
  }

  const grandChild = ((storeValue as unknown) as {
    [s: string]: {
      [s: string]: ComponentValue<DBNamedSchema, StoreName>;
    };
  })[propertyMap[0]][propertyMap[1]];

  if (grandChild === undefined) {
    return;
  }

  return (grandChild as unknown) as ComponentValue<DBNamedSchema, StoreName>;
};

const getValues = <
  DBNamedSchema extends NamedSchema<string, number, Schema>,
  StoreName extends StoreNames<DBNamedSchema["schema"]>
>(
  step: StepDefinition<DBNamedSchema, StoreName>,
  values: Required<
    ProcessStepDefinition<DBNamedSchema, StoreName>
  >["review"]["rows"][number]["values"]
): Value<DBNamedSchema, StoreName>[] => {
  if (step.componentWrappers.length === 0) {
    const valueValues = Object.values(values).filter(Boolean) as NonNullable<
      typeof values[keyof typeof values]
    >[];

    return valueValues.filter(({ renderValue }) =>
      Boolean(renderValue)
    ) as Value<DBNamedSchema, StoreName>[];
  }

  return step.componentWrappers
    .map(({ key, databaseMap }) => ({ databaseMap, value: values[key] }))
    .filter(({ value }) => Boolean(value))
    .map(({ databaseMap, value }) => {
      return {
        databaseMap: nullAsUndefined(databaseMap),
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/unbound-method
        renderValue: value!.renderValue,
      };
    });
};

const getImages = <
  DBNamedSchema extends NamedSchema<string, number, Schema>,
  StoreName extends StoreNames<DBNamedSchema["schema"]>
>(
  step: StepDefinition<DBNamedSchema, StoreName>,
  images: Required<
    ProcessStepDefinition<DBNamedSchema, StoreName>
  >["review"]["rows"][number]["images"]
): ComponentDatabaseMap<DBNamedSchema, StoreName>[] => {
  return [
    step.componentWrappers.find(({ key, databaseMap }) =>
      Boolean(databaseMap && images === key)
    )?.databaseMap,
  ].filter(Boolean) as ComponentDatabaseMap<DBNamedSchema, StoreName>[];
};

const getRows = <
  DBNamedSchema extends NamedSchema<string, number, Schema>,
  StoreName extends StoreNames<DBNamedSchema["schema"]>,
  Slug extends string
>(
  step: ProcessStepDefinition<DBNamedSchema, StoreName>
): Row<DBNamedSchema, StoreName, Slug>[] => {
  return step.review
    ? step.review.rows.reduce<Row<DBNamedSchema, StoreName, Slug>[]>(
        (r, row) => [
          ...r,
          {
            label: row.label,
            values: getValues(step.step, row.values),
            images: getImages(step.step, row.images),
            changeSlug: step.step.slug as Slug,
          },
        ],
        []
      )
    : [];
};

const useRows = <
  DBNamedSchema extends NamedSchema<string, number, Schema>,
  StoreName extends StoreNames<DBNamedSchema["schema"]>,
  Slug extends string
>(
  steps: ProcessStepDefinition<DBNamedSchema, StoreName>[]
): Row<DBNamedSchema, StoreName, Slug>[] => {
  return steps.reduce<Row<DBNamedSchema, StoreName, Slug>[]>(
    (rows, step) => [...rows, ...getRows<DBNamedSchema, StoreName, Slug>(step)],
    []
  );
};

const useStoreInfo = <
  DBNamedSchema extends NamedSchema<string, number, Schema>,
  StoreName extends StoreNames<DBNamedSchema["schema"]>,
  Slug extends string
>(
  rows: Row<DBNamedSchema, StoreName, Slug>[]
): { [_ in StoreName]?: StoreKey<DBNamedSchema["schema"], StoreName>[] } => {
  const databaseMaps = rows.reduce<
    ComponentDatabaseMap<DBNamedSchema, StoreName>[]
  >(
    (maps, { values, images }) => [
      ...maps,
      ...(values
        .map(({ databaseMap }) => databaseMap)
        .filter(Boolean) as ComponentDatabaseMap<DBNamedSchema, StoreName>[]),
      ...images,
    ],
    []
  );

  const storeInfo: {
    [_ in StoreName]?: StoreKey<DBNamedSchema["schema"], StoreName>[];
  } = {};

  for (const databaseMap of databaseMaps) {
    const { storeName } = databaseMap;

    const key = findKey(databaseMap);

    if (key === undefined || storeInfo[storeName]?.includes(key)) {
      continue;
    }

    storeInfo[storeName] = [
      ...((storeInfo[storeName] || []) as StoreKey<
        DBNamedSchema["schema"],
        StoreName
      >[]),
      key,
    ];
  }

  return storeInfo;
};

const useStoreValues = <
  DBNamedSchema extends NamedSchema<string, number, Schema>,
  StoreName extends StoreNames<DBNamedSchema["schema"]>,
  Slug extends string
>(
  context: DatabaseContext<DBNamedSchema> | undefined,
  rows: Row<DBNamedSchema, StoreName, Slug>[]
): UseAsyncReturn<
  | {
      [Name in StoreName]?: {
        [_ in StoreKey<DBNamedSchema["schema"], StoreName>]?:
          | StoreValue<DBNamedSchema["schema"], Name>
          | undefined;
      };
    }
  | undefined,
  [boolean, Database<DBNamedSchema> | undefined, string]
> => {
  const database = useDatabase(context);
  const storeInfo = useStoreInfo(rows);

  return useAsync(async () => {
    if (database.loading) {
      return;
    }

    const db = database.result;

    if (!db) {
      throw new Error("No database to check for process state");
    }

    let allValues: {
      [Name in StoreName]?: {
        [_ in StoreKey<DBNamedSchema["schema"], StoreName>]?:
          | StoreValue<DBNamedSchema["schema"], Name>
          | undefined;
      };
    } = {};

    await db.transaction(
      Object.keys(storeInfo) as StoreName[],
      async (stores: StoreMap<DBNamedSchema["schema"], StoreName[]>) => {
        const values = await Promise.all(
          (Object.keys(stores) as StoreName[]).map<
            Promise<
              [
                StoreName,
                {
                  [_ in StoreKey<
                    DBNamedSchema["schema"],
                    StoreName
                  >]?: StoreValue<DBNamedSchema["schema"], StoreName>;
                }
              ]
            >
          >(async (storeName) => {
            const storeKeys = storeInfo[storeName];

            const valueSet = (
              await Promise.all(
                ((storeKeys || []) as StoreKey<
                  DBNamedSchema["schema"],
                  StoreName
                >[]).map(
                  async (key) =>
                    ({
                      [key]: await stores[storeName].get(key),
                    } as {
                      [_ in StoreKey<
                        DBNamedSchema["schema"],
                        StoreName
                      >]?: StoreValue<DBNamedSchema["schema"], StoreName>;
                    })
                )
              )
            ).reduce<
              {
                [_ in StoreKey<
                  DBNamedSchema["schema"],
                  StoreName
                >]?: StoreValue<DBNamedSchema["schema"], StoreName>;
              }
            >((v, value) => ({ ...v, ...value }), {});

            return [storeName, valueSet];
          })
        );

        allValues = {
          ...allValues,
          ...values.reduce<
            {
              [Name in StoreName]?: {
                [_ in StoreKey<
                  DBNamedSchema["schema"],
                  StoreName
                >]?: StoreValue<DBNamedSchema["schema"], Name>;
              };
            }
          >(
            (storeValues, [storeName, values]) => ({
              ...storeValues,
              [storeName]: values,
            }),
            {}
          ),
        };
      }
    );

    return allValues;
  }, [database.loading, database.result, JSON.stringify(storeInfo)]);
};

export const useReviewSectionRows = <
  DBNamedSchema extends NamedSchema<string, number, Schema>,
  StoreName extends StoreNames<DBNamedSchema["schema"]>,
  Slug extends string
>(
  context: DatabaseContext<DBNamedSchema> | undefined,
  steps: ProcessStepDefinition<DBNamedSchema, StoreName>[],
  basePath: string,
  stepSlugs: Slug[],
  repeatingStepSlugs: Slug[],
  readOnly: boolean
): UseAsyncReturn<ReviewSectionEntry[]> => {
  const rows = useRows<DBNamedSchema, StoreName, Slug>(steps);
  const storeValues = useStoreValues<DBNamedSchema, StoreName, Slug>(
    context,
    rows
  );
  const router = useRouter();

  return useAsync(
    async () =>
      await Promise.all(
        rows.map(async (row) => {
          if (storeValues.loading || storeValues.result === undefined) {
            return {
              key: row.label,
              value: (
                <ReviewSectionRow
                  values={["Loading..."]}
                  basePath={basePath}
                  stepSlugs={stepSlugs}
                  repeatingStepSlugs={repeatingStepSlugs}
                />
              ),
            } as ReviewSectionEntry;
          }

          const rowValues = (
            await Promise.all(
              row.values.map(async (v) => {
                if (storeValues.loading || storeValues.result === undefined) {
                  return;
                }

                const { databaseMap, renderValue } = v;

                let value: ComponentValue<DBNamedSchema, StoreName> | undefined;

                if (databaseMap) {
                  const { storeName } = databaseMap;

                  const key = findKey(databaseMap);
                  const values = storeValues.result[storeName];

                  if (key === undefined || values === undefined) {
                    return;
                  }

                  value = findValue(values[key], databaseMap);

                  if (value === undefined) {
                    return;
                  }
                }

                return await renderValue(value);
              })
            )
          ).filter(Boolean) as React.ReactNode[];

          const rowImages = (row.images
            .map((databaseMap) => {
              if (storeValues.loading || storeValues.result === undefined) {
                return;
              }

              const { storeName } = databaseMap;

              const key = findKey(databaseMap);
              const values = storeValues.result[storeName];

              if (key === undefined || values === undefined) {
                return;
              }

              return findValue(values[key], databaseMap);
            })
            .filter(Boolean) as string[][]).reduce<string[]>(
            (i, images) => [...i, ...images],
            []
          );

          if (rowValues.length === 0 && rowImages.length === 0) {
            rowValues.push(<em>No answer</em>);
          }

          const changeSlug = readOnly ? undefined : row.changeSlug;

          return {
            key: row.label,
            value: (
              <ReviewSectionRow
                values={rowValues}
                images={rowImages}
                changeSlug={changeSlug}
                basePath={basePath}
                stepSlugs={stepSlugs}
                repeatingStepSlugs={repeatingStepSlugs}
              />
            ),
          } as ReviewSectionEntry;
        })
      ),
    [
      Boolean(router),
      JSON.stringify(rows),
      storeValues.loading,
      JSON.stringify(storeValues.result),
    ]
  );
};
