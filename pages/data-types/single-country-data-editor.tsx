import React from "react";
import { useMeshLocation, LoadingOverlay } from "@uniformdev/mesh-sdk-react";

import { CountrySelector } from "../../components/CountrySelector";
import { useAsync } from "react-use";
import { ErrorCallout } from "../../components/ErrorCallout";
import { CountryTypeConfig } from "./single-country-type-editor";

const DataEditorInner: React.FC = () => {
  const { value, metadata, setValue } = useMeshLocation<"dataResource">();

  const custom = metadata.dataType as unknown as CountryTypeConfig;
  const imagePath = custom?.custom?.imagePath || "flags.svg";

  const name = value?.name;

  const {
    value: countryList = [],
    loading: loadingCountries,
    error: countryError,
  } = useAsync(async () => {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags"
    );
    const data = await response.json();

    // Map country data to include all necessary fields
    return data
      .map((country: any, index: number) => ({
        id: index + 1,
        name: country.name.common,
        image: getValueFromPath(country, imagePath),
        officialName: country.name.official,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  if (loadingCountries) {
    return <LoadingOverlay isActive />;
  }

  if (countryError) {
    return <ErrorCallout error={countryError.message} />;
  }

  return (
    <CountrySelector
      countryList={countryList || []}
      imagePath={imagePath}
      selectedName={name}
      onSelect={(selectedCountry) => {
        console.log("Selected Country:", selectedCountry);
        setValue((current) => ({
          ...current,
          newValue: {
            name: selectedCountry.name,
          },
        }));
      }}
    />
  );
};

const getValueFromPath = (obj: any, path: string): string | undefined => {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};

export default DataEditorInner;
