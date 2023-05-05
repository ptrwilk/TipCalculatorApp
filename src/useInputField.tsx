import { useState } from "react";

export const useInputField = (initialValue?: number) => {
  const [data, setData] = useState<number | undefined>(initialValue);

  const handleValueChange = (value?: any) => {
    setData(value);
  };

  const handleClear = () => {
    setData(undefined);
  };

  return {
    value: data,
    numeric: data ? Number(data) : undefined,
    clear: handleClear,
    onValueChange: handleValueChange,
  };
};
