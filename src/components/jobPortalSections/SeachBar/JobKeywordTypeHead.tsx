import React from "react";
import { useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
// import { useLazyQuery, gql } from "@apollo/client";
import styles from "./TypeHeadSearchBar.module.css";

export default function JobKeywordTypeHead({
  setInputs,
  defaultJobProfiles = [],
}: any) {
  const [query, setQuery] = useState("");
  // const [getSuggestions, { loading, data }] = useLazyQuery(homePageSearch);
  const handleSearch = (query: any) => {
    setQuery(query);
    // getSuggestions({ variables: { globalSearch: query } });
  };

  const options: any = [
    {
      id: 1,
      name: "Digital Marketing",
    },
    {
      id: 2,
      name: "React Developer",
    },
    {
      id: 3,
      name: "SEO",
    },
  ];

  // if (data) {
  //   // Extracting results from the response
  //   const { jobProfiles } = data;
  //   if (jobProfiles) {
  //     jobProfiles.data.forEach((item: any) => {
  //       options.push({
  //         id: item.id,
  //         name: item?.name,
  //       });
  //     });
  //   }
  // }

  const handleSelectionChange = (selectedOptions: any[]) => {
    setInputs((prevFilters: any) => ({
      ...prevFilters,
      jobProfile: [...selectedOptions?.map((item: any) => item?.name)],
    }));
    // console.log("Selected options:", selectedOptions); // Log the selected options
  };
  const defaultSelectedJobProfiles = options.filter((option: any) =>
    defaultJobProfiles
      .map((profile: string) => profile.replace("-", " "))
      .includes(option.name),
  );
  return (
    <AsyncTypeahead
      id="jobKeywordTypeHead"
      onSearch={handleSearch}
      options={options}
      labelKey="name"
      multiple
      minLength={0}
      isLoading={false}
      placeholder="e.g. Web development"
      inputProps={{
        className: styles.customInput,
      }}
      onChange={handleSelectionChange}
      defaultSelected={defaultSelectedJobProfiles}
      renderMenuItemChildren={(option: any, props: any) => (
        <div className={styles.customMenuItem}>
          <p className="cursor-pointer">{option?.name}</p>
        </div>
      )}
    />
  );
}
