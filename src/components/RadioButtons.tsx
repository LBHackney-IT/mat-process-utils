import { RadioButton, Radios } from "lbh-frontend-react";
import React from "react";
import { DynamicComponentControlledProps } from "remultiform/component-wrapper";

export type RadioButtonsProps = DynamicComponentControlledProps<string> & {
  name: string;
  legend?: React.ReactNode;
  radios: { value: string; label: string }[];
};

export const RadioButtons: React.FunctionComponent<RadioButtonsProps> = (
  props
) => {
  const {
    name,
    legend,
    radios,
    value: currentValue,
    onValueChange,
    required,
    disabled,
  } = props;

  const radioButtons = radios.map<RadioButton>((radio) => {
    const { value, label } = radio;

    const id = `${name}-${value.replace(/\s+/g, "-")}`;

    return {
      id,
      value,
      label: { id: id + "-label", children: label },
      checked: value === currentValue,
      disabled,
    };
  });

  return (
    <Radios
      name={name}
      fieldset={legend ? { legend } : undefined}
      items={radioButtons}
      onChange={onValueChange}
      required={required}
    />
  );
};
