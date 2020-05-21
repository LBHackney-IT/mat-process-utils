import { Paragraph } from "lbh-frontend-react";
import React from "react";
import { UseAsyncReturn } from "react-async-hook";
import { DynamicComponentControlledProps } from "remultiform/component-wrapper";
import { Residents } from "../schema/Residents";
import { Checkboxes } from "./Checkboxes";

export type ResidentCheckboxesProps = DynamicComponentControlledProps<
  string[]
> & {
  name: string;
  legend?: React.ReactNode;
};

export interface ResidentCheckboxesOptions {
  useResidents: () => UseAsyncReturn<Residents>;
}

export const makeResidentCheckboxes = (
  options: ResidentCheckboxesOptions
): React.FunctionComponent<ResidentCheckboxesProps> => {
  const { useResidents } = options;

  const ResidentCheckboxes: React.FunctionComponent<ResidentCheckboxesProps> = (
    props
  ) => {
    const residents = useResidents();

    return residents.loading ? (
      <Paragraph>Loading...</Paragraph>
    ) : (
      <Checkboxes
        {...props}
        checkboxes={[
          ...(residents.result?.tenants || []),
          ...(residents.result?.householdMembers || []),
        ].map((resident) => ({
          label: resident.fullName,
          value: resident.id,
        }))}
      />
    );
  };

  return ResidentCheckboxes;
};
