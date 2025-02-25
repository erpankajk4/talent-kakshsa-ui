import React from "react";
import { useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
// import { useLazyQuery, gql } from "@apollo/client";
import styles from "./TypeHeadSearchBar.module.css";
import Image from "next/image";
import Link from "next/link";
import { course1 } from "@/assets";

export default function LocationTypeHead({
  setInputs,
  defaultCities = [],
}: any) {
  const [query, setQuery] = useState("");
  // const [getSuggestions, { loading, data }] = useLazyQuery(homePageSearch);
  const handleSearch = (query: any) => {
    // setQuery(query);
    // getSuggestions({ variables: { globalSearch: query } });
  };

  const options: any = [
    {
      id: 1,
      name: "Delhi",
    },
    {
      id: 2,
      name: "Delhi NCR",
    },
    {
      id: 3,
      name: "Banglore",
    },
  ];

  // if (data) {
  //   // Extracting results from the response
  //   const { location } = data;
  //   if (location) {
  //     location.data.forEach((item: any) => {
  //        options.push({
  //         id: item.id,
  //         name: item?.name,
  //       });
  //     });
  //   }
  // }
  const handleSelectionChange = (selectedOptions: any[]) => {
    setInputs((prevFilters: any) => ({
      ...prevFilters,
      location: [...selectedOptions?.map((item: any) => item?.name)],
    }));
    // console.log("Selected options:", selectedOptions); // Log the selected options
  };

  const defaultSelectedCities = options.filter((option: any) =>
    defaultCities
      .map((city: string) => city.replace("-", " "))
      .includes(option.name),
  );
  return (
    <AsyncTypeahead
      id="autosuggest"
      onSearch={handleSearch}
      options={options}
      labelKey="name"
      multiple
      minLength={0}
      isLoading={false}
      placeholder="e.g. Delhi"
      onChange={handleSelectionChange}
      defaultSelected={defaultSelectedCities}
      inputProps={{ className: styles.customInput }}
      renderMenuItemChildren={(option: any, props: any) => (
        <div className={styles.customMenuItem}>
          <p className="cursor-pointer">{option?.name}</p>
        </div>
      )}
    />
  );
}
