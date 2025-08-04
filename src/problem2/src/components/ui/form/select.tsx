import { cva } from 'class-variance-authority';
import * as React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { cn } from '@/utils/cn';

import { FieldWrapper, FieldWrapperPassThroughProps } from './field-wrapper';

export type Option = {
  label: React.ReactNode;
  value: string | number | string[];
};

type SelectFieldProps = FieldWrapperPassThroughProps & {
  options: Option[];
  className?: string;
  defaultValue?: string;
  registration: Partial<UseFormRegisterReturn>;
  disabled?: boolean;
};

const selectVariants = cva(
  'mt-1 block w-full rounded-md border border-input bg-transparent py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm',
);

export const Select = (props: SelectFieldProps) => {
  const {
    label,
    options,
    error,
    className,
    defaultValue,
    registration,
    disabled,
  } = props;
  return (
    <FieldWrapper label={label} error={error}>
      <select
        className={cn(selectVariants(), className)}
        defaultValue={defaultValue}
        {...registration}
        disabled={disabled}
      >
        <option value="">Please Select</option>
        {options.map(({ label, value }) => (
          <option key={label?.toString()} value={value}>
            {label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
};
