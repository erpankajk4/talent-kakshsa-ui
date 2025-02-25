import React from "react";
import { useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
// import { useLazyQuery, gql } from "@apollo/client";
import styles from "./TypeHeadSearchBar.module.css";
import Image from "next/image";
import Link from "next/link";
import { course1 } from "@/assets";

export default function HomeTypeHeadSearchBar() {
  const [query, setQuery] = useState("");
  // const [getSuggestions, { loading, data }] = useLazyQuery(homePageSearch);
  const handleSearch = (query: any) => {
    // setQuery(query);
    // getSuggestions({ variables: { globalSearch: query } });
  };

  const options: any = [
    {
      id: 1,
      name: "Digital Marketing",
      logo: course1,
      type: "courses",
    },
  ];

  // if (data) {
  //   // Extracting results from the response
  //   const { colleges, courses, exams, news } = data;
  //   if (courses) {
  //     courses.data.forEach((course: any) => {
  //       options.push({
  //         id: course.id,
  //         name: course?.attributes?.courseName,
  //         logo: course?.attributes?.bgImage?.data?.attributes?.url,
  //         type: "courses",
  //       });
  //     });
  //   }
  // }
  return (
    <AsyncTypeahead
      id="autosuggest"
      //   onInputChange={handleSearch}
      onSearch={handleSearch}
      options={options}
      labelKey="name"
      minLength={3}
      isLoading={false}
      placeholder="Search Courses, News, Blogs & More"
      inputProps={{ className: styles.customInput }}
      renderMenuItemChildren={(option: any, props: any) => (
        <Link href={option?.id ? `/${option?.type}/${option?.id}` : `#`}>
          <div className={styles.customMenuItem}>
            <div className="h-16 w-16 rounded-lg bg-white">
              <Image
                src={option?.logo}
                alt="icon"
                width={20}
                height={20}
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <p className="cursor-pointer">{option?.name}</p>
              <small className={styles.customTypeLabel}>{option?.type}</small>
            </div>
          </div>
        </Link>
      )}
    />
  );
}
