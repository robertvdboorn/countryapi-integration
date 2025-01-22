import React, { useState, useEffect } from "react";
import { VerticalRhythm, Input } from "@uniformdev/design-system";
import { debounce } from "lodash";

interface Country {
  id: number;
  name: string;
  image?: string;
  officialName: string;
}

interface CountrySelectorProps {
  countryList: Country[]; // List of countries to display
  imagePath: string; // JSON path to the flag image
  selectedName: string; // Name of the selected country
  onSelect: (country: Country) => void; // Callback for when a country is selected
}

export const CountrySelector: React.FC<CountrySelectorProps> = ({
  countryList = [],
  selectedName,
  onSelect,
}) => {
  const [filteredCountryList, setFilteredCountryList] = useState<Country[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setFilteredCountryList(countryList);
  }, [countryList]);

  const handleSearch = debounce(
    (query: string) => {
      setSearchQuery(query);

      if (searchQuery.trim() !== "") {
        setFilteredCountryList(
          countryList
            .filter((country) =>
              country.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .sort((a, b) => {
              // Prioritize names starting with the query
              const startsWithA = a.name
                .toLowerCase()
                .startsWith(searchQuery.toLowerCase());
              const startsWithB = b.name
                .toLowerCase()
                .startsWith(searchQuery.toLowerCase());
              if (startsWithA && !startsWithB) return -1; // a comes first
              if (!startsWithA && startsWithB) return 1; // b comes first
              return a.name.localeCompare(b.name); // Otherwise, sort alphabetically
            })
        );
      } else {
        setFilteredCountryList(countryList);
      }
    },
    [searchQuery, countryList]
  );

  const handleSelection = (country: Country) => {
    onSelect(country);
  };

  return (
    <VerticalRhythm>
      <Input
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Filter by name..."
        label="Search Country"
      />
      <div
        style={{
          maxHeight: "400px",
          overflowY: "auto",
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "8px",
          marginTop: "16px",
        }}
      >
        {filteredCountryList.length > 0 ? (
          filteredCountryList.map((country) => (
            <div
              key={country.name}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px",
                borderRadius: "4px",
                cursor: "pointer",
                marginBottom: "8px",
                backgroundColor:
                  selectedName === country.name ? "#F0F8FF" : "#FFFFFF",
                border:
                  selectedName === country.name
                    ? "1px solid #007BFF"
                    : "1px solid transparent",
                transition: "background-color 0.2s ease, border 0.2s ease",
              }}
              onClick={() => handleSelection(country)}
            >
              {country.image && (
                <img
                  src={country.image}
                  alt={country.name}
                  width={75}
                  height={75}
                  loading="lazy"
                  style={{ marginRight: "10px", borderRadius: "4px" }}
                />
              )}
              <div style={{ flex: 1 }}>
                <span style={{ fontWeight: "bold" }}>
                  {highlightQuery(country.name, searchQuery)}
                </span>
                <div
                  style={{
                    fontSize: "0.85em",
                    color: "#666",
                    marginTop: "4px",
                  }}
                >
                  <div>
                    <strong>Official Name:</strong> {country.officialName}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: "center", color: "#666" }}>
            No countries found
          </div>
        )}
      </div>
    </VerticalRhythm>
  );
};

const highlightQuery = (name: string, query: string): React.ReactNode => {
  if (!query) return name;
  const parts = name.split(new RegExp(`(${query})`, "gi"));
  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <span key={index} style={{ color: "#007BFF", fontWeight: "bold" }}>
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
};

export default CountrySelector;
