import * as Select from '@radix-ui/react-select';
import { cva } from 'class-variance-authority';

import tokenDefault from '@/assets/token-default.svg';
import {
  FieldWrapper,
  FieldWrapperPassThroughProps,
} from '@/components/ui/form/field-wrapper';
import { cn } from '@/utils/cn';

import { Currency } from '../types/currency';

const TOKEN_BASE_URL =
  'https://raw.githubusercontent.com/Switcheo/token-icons/refs/heads/main/tokens';

type SelectFieldProps = FieldWrapperPassThroughProps & {
  options: Currency[];
  className?: string;
  defaultValue?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (currency: Currency) => void;
};

const selectVariants = cva(
  'mt-1 block h-9 w-full rounded-md border border-input bg-transparent py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm',
);

export const SelectCurrency = (props: SelectFieldProps) => {
  const { label, options, error, value, className, onChange } = props;

  return (
    <FieldWrapper label={label} error={error}>
      <Select.Root
        value={value}
        onValueChange={(value) => {
          const selectedCurrency = options.find(
            (option) => option.currency === value,
          );
          if (selectedCurrency && onChange) {
            onChange(selectedCurrency);
          }
        }}
      >
        <Select.Trigger className={cn(selectVariants(), className)}>
          <Select.Value className="truncate" placeholder="Select" />
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            position="popper"
            className="z-50 h-[400px] w-[--radix-select-trigger-width] rounded border bg-white shadow"
          >
            <Select.Viewport className="p-1">
              {options.map((option) => (
                <Select.Item
                  key={option.currency}
                  value={option.currency}
                  className="relative flex cursor-pointer select-none items-center px-3 py-2 hover:bg-gray-100"
                >
                  <Select.ItemText asChild>
                    <div className="flex items-center">
                      <img
                        alt={`${option.currency} logo`}
                        src={`${TOKEN_BASE_URL}/${option.currency}.svg`}
                        className="mr-2 size-5"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = tokenDefault;
                        }}
                      />
                      <span>{option.currency}</span>
                    </div>
                  </Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </FieldWrapper>
  );
};
