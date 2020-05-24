import { Checkboxes } from "lbh-frontend-react";
import React from "react";
import { DynamicComponentControlledProps } from "remultiform";

export type SingleCheckboxProps = DynamicComponentControlledProps<boolean> & {
  name: string;
  label: string;
};

export const SingleCheckbox: React.FunctionComponent<SingleCheckboxProps> = (
  props
) => {
  const { name, label, value, onValueChange, required, disabled } = props;

  return (
    <Checkboxes
      name={name}
      items={[
        {
          id: name,
          value: "true",
          label: { id: `${name}-label`, children: label },
          checked: value,
          disabled,
        },
      ]}
      onChange={(values): void => {
        onValueChange(values.includes("true"));
      }}
      required={required}
    />
  );
};
