import React, { FC, useCallback, useEffect, useMemo } from "react";
import {
  useMeshLocation,
  DataSourceLocationValue,
  Input,
  ValidationResult,
} from "@uniformdev/mesh-sdk-react";
import { VerticalRhythm } from "@uniformdev/design-system";

export type DataSourceConfig = {
  apiUrl: string;
};

const DEFAULT_API_URL = "https://restcountries.com/v3.1"; // Default API URL
const TRUE_VALIDATION_RESULT: ValidationResult = { isValid: true };

const DataConnectionEditor: FC = () => {
  const { value, setValue } = useMeshLocation<"dataSource">();

  const { apiUrl } = useMemo(() => {
    const config = value.custom as DataSourceConfig;
    return {
      apiUrl: config?.apiUrl?.length > 0 ? config.apiUrl : DEFAULT_API_URL,
    };
  }, [value.custom]);

  const handleUpdate = useCallback(
    (updates?: Partial<DataSourceConfig>) => {
      setValue((current) => {
        const currentConfig = current.custom as DataSourceConfig;
        const newConfig = { ...currentConfig, ...updates };

        const newValue: DataSourceLocationValue = {
          ...current,
          baseUrl: newConfig.apiUrl || DEFAULT_API_URL,
          custom: newConfig,
          customPublic: newConfig,
        };

        return { newValue, options: TRUE_VALIDATION_RESULT };
      });
    },
    [setValue]
  );

  useEffect(() => {
    if (!value.custom || !(value.custom as DataSourceConfig).apiUrl) {
      handleUpdate({ apiUrl: DEFAULT_API_URL });
    }
  }, [handleUpdate, value.custom]);

  return (
    <VerticalRhythm>
      <Input
        id="apiUrl"
        name="apiUrl"
        label="API URL"
        placeholder="https://restcountries.com/v3.1"
        value={apiUrl}
        onChange={(e) => handleUpdate({ apiUrl: e.currentTarget.value })}
        caption="The base URL of the RestCountries API (default: https://restcountries.com/v3.1)"
      />
    </VerticalRhythm>
  );
};

export default DataConnectionEditor;
