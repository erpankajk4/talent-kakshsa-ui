import React from "react";
import Wrapper from "../Wrappers";
import { Button } from "../Button";

export default function Banner1() {
  return (
    <Wrapper
      bgColor="bg-blue-50"
      containerClassName="pb-10"
      className="max-md:flex-center flex w-full justify-between gap-5 rounded-xl bg-sky-100 p-5 max-md:flex-col"
    >
      <div className="max-md:text-center">
        <h2 className="text-xl font-bold">Learn Online</h2>
        <p>
          Learn online though video course, along with students across the
          globe, and earn a valid certificate and degree.
        </p>
      </div>
      <Button variant="orange" className="text-nowrap">
        Learn on Talent Kaksha
      </Button>
    </Wrapper>
  );
}
