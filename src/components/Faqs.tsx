"use client";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import TextWithLineBreak from "@/utils/TextWithLineBreak";
import Wrapper from "./Wrappers";

export default function Faqs({ data, className = "" }: any) {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (id: any) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {data?.map((faq: any, index: number) => (
        <div
          key={index}
          className="rounded-lg bg-white px-6 py-2 pt-4 shadow-md"
        >
          {faq?.question && (
            <button
              onClick={() => toggleFaq(index)}
              className="flex w-full items-center justify-between text-left"
            >
              <p className="space-x-5">
                <span className="font-bold text-orange-500">
                  {index > 9 ? index + 1 : `0${index + 1}`}
                </span>{" "}
                <span className="font-bold">{faq?.question}</span>
              </p>
              <IoIosArrowDown
                className={`transform text-xl transition-transform ${
                  openFaq === index || (index === 0 && openFaq === null)
                    ? "rotate-180"
                    : ""
                }`}
              />
            </button>
          )}
          {faq?.answer && (
            <div
              className={`mt-2 transition-all duration-300 ease-in-out ${
                openFaq === index || (index === 0 && openFaq === null)
                  ? "max-h-96"
                  : "max-h-0 overflow-hidden"
              }`}
            >
              <hr className="my-2" />
              <p className="my-3 text-justify text-zinc-500">
                <TextWithLineBreak text={faq?.answer} />
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function FaqsForDetailPage({ data, className = "" }: any) {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (id: any) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {data?.map((faq: any, index: number) => (
        <div
          key={index}
          className="mb-4 rounded-2xl bg-white px-6 py-2 pt-4 shadow-lg"
        >
          {faq?.question && (
            <button
              onClick={() => toggleFaq(index)}
              className="flex w-full items-center justify-between text-left"
            >
              <span className="text-lg font-medium">{faq?.question}</span>
              <IoIosArrowDown
                className={`transform text-xl transition-transform ${
                  openFaq === index || (index === 0 && openFaq === null)
                    ? "rotate-180"
                    : ""
                }`}
              />
            </button>
          )}
          {faq?.answer && (
            <div
              className={`mt-2 transition-all duration-300 ease-in-out ${
                openFaq === index || (index === 0 && openFaq === null)
                  ? "max-h-96"
                  : "max-h-0 overflow-hidden"
              }`}
            >
              <hr className="my-2" />
              <p className="my-3 text-justify text-zinc-500">
                <TextWithLineBreak text={faq?.answer} />
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
