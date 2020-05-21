import { Checkboxes as LBHCheckboxes, CheckboxItem } from "lbh-frontend-react";
import React from "react";
import { DynamicComponentControlledProps } from "remultiform/component-wrapper";

export type CheckboxesProps = DynamicComponentControlledProps<string[]> & {
  name: string;
  legend?: React.ReactNode;
  checkboxes: { value: string; label: string }[];
};

export const Checkboxes: React.FunctionComponent<CheckboxesProps> = (props) => {
  const {
    name,
    legend,
    checkboxes,
    value: currentValues,
    onValueChange,
    required,
    disabled,
  } = props;

  const checkboxItems = checkboxes.map<CheckboxItem>((checkbox) => {
    const { value, label } = checkbox;

    const id = `${name}-${value.replace(/\s+/g, "-")}`;

    return {
      id,
      value,
      label: { id: `${id}-label`, children: label },
      checked: currentValues.includes(value),
      disabled,
    };
  });

  return (
    <LBHCheckboxes
      name={name}
      fieldset={{ legend: legend }}
      items={checkboxItems}
      onChange={onValueChange}
      required={required}
    />
  );
};
