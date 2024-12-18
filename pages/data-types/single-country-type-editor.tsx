import React, { useEffect } from "react";
import { useMeshLocation } from "@uniformdev/mesh-sdk-react";
import { VerticalRhythm, Input } from "@uniformdev/design-system";

export interface CountryTypeConfig {
  custom: {
    imagePath: string;
  };
}

const SingleCountryByNameTypeEditorPage: React.FC = () => {
  const { value, setValue } = useMeshLocation<"dataType", CountryTypeConfig>();

  useEffect(() => {
    if (!value?.path || !value?.variables) {
      setValue((current) => ({
        newValue: {
          ...current,
          path: "/name/${name}?fullText=true",
          variables: {
            name: {
              displayName: "Country Name",
              type: "string",
              helpText: "The name of the country to fetch",
              default: "Netherlands",
            },
          },
        },
      }));
    }
  }, []);

  const handleChange = (newValue: string) => {
    setValue((current) => ({
      newValue: {
        ...current,
        custom: {
          ...current.custom,
          imagePath: newValue,
        },
        path: "/name/${name}?fullText=true",
        variables: {
          name: {
            displayName: "Country Name",
            type: "string",
            helpText: "The name of the country to fetch",
            default: "Netherlands",
          },
        },
      },
    }));
  };

  return (
    <VerticalRhythm>
      <Input
        label="Image Path"
        name="imagePath"
        value={
          (value.custom?.imagePath as string) ||
          "flags.svg"
        }
        onChange={(e) => handleChange(e.target.value)}
        caption="JSON path to the country flag image (default: 'flags.svg')"
      />
    </VerticalRhythm>
  );
};

export default SingleCountryByNameTypeEditorPage;
