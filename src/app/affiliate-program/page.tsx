"use client";
import { icon1 } from "@/assets";
import AffiliateBanner from "@/components/banners/AffiliateBanner";
import Banner1 from "@/components/banners/Banner1";
import Faqs from "@/components/Faqs";
import Wrapper from "@/components/Wrappers";
import { faqs, html } from "@/data/wrapperData";
import { BoldWordsByPosition } from "@/utils/boldWordsByPosition";
import Image from "next/image";
import React, { useState } from "react";

export default function AffiliateProgramPage() {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  return (
    <>
      <AffiliateBanner
        title="Join our Affiliate Program"
        subtitle="Review. Discuss. Learn"
      />
      <Wrapper
        bgColor="bg-blue-50"
        containerClassName="py-10"
        className="flex flex-col justify-center gap-5 text-center text-zinc-700"
      >
        <h2 className="text-xl">
          <BoldWordsByPosition
            text={
              "Earn up to 45% commission on 250+ courses and Specializations"
            }
            positions={[3, 6]}
          />
        </h2>
        <h2 className="font-semibold">
          How does Talent Kaksha&apos;s affiliate program work?
        </h2>
        <ul className=": grid grid-cols-1 gap-5 px-0 sm:grid-cols-2 xl:px-64">
          {[...Array(4)]?.map((item: any, index: number) => (
            <Card
              key={index}
              iconImage={icon1}
              text={
                "Join Talent Kaksha’s affiliate program on Impact’s network. Joining is fast, easy, and free."
              }
            />
          ))}
        </ul>
      </Wrapper>
      <Wrapper
        bgColor="bg-blue-50"
        containerClassName="py-10"
        className="space-y-5 text-zinc-700"
      >
        <h2 className="text-center font-semibold">
          What are the benefits of joining the affiliate program?
        </h2>
        {/* text editor */}
        {html && (
          <div className="mb-10">
            <div
              className={`${
                isExpanded ? "" : "mask-gradient max-h-40 overflow-y-hidden"
              }`}
              dangerouslySetInnerHTML={{ __html: html }}
            />
            <p
              className="cursor-pointer text-sm font-bold text-blue-900 hover:underline"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Show Less" : "Show More"}
            </p>
          </div>
        )}
        {/* FAQ's  */}
        <div className="my-8 space-y-3">
          <h2 className="mb-5 text-2xl font-bold text-blue-900">
            Frequently Asked Questions
          </h2>
          <Faqs
            data={[...Array(5)]?.map((item: any, index: number) => ({
              question: `Question ${index + 1}`,
              answer: `Answer ${index + 1}`,
              id: `${index + 1}`,
            }))}
          />
        </div>
      </Wrapper>
      <Banner1 />
    </>
  );
}

function Card({ iconImage, text }: any) {
  return (
    <li className="flex-center flex-col gap-5 rounded-lg bg-white p-5 shadow-lg">
      <Image src={iconImage} alt="icon" className="h-14 w-14 object-contain" />
      <p>{text}</p>
    </li>
  );
}
