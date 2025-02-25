import { formatRupee } from "@/utils/customText";
import TextWithLineBreak, {
  TextWithoutLineBreak,
} from "@/utils/TextWithLineBreak";
import useIsMobile from "../customHooks/useIsMobile";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Link from "next/link";
import { Button } from "../Button";

export function PackageContentCard({
  packageName,
  price,
  isPopular,
  text,
  lists,
}: any) {
  const isMobile = useIsMobile(750);
  return (
    <div
      className={`relative col-span-1 w-full rounded-xl p-5 pt-6 shadow duration-300 hover:scale-105 md:pb-20 ${
        isPopular ? "bg-orange-500 text-white" : "bg-white text-black"
      }`}
    >
      <p className="mb-2">{packageName}</p>
      <h3 className="text-4xl font-bold">
        ₹ {formatRupee(price)} <span className="text-xl">/month</span>
      </h3>
      <p className="my-2">
        {isMobile ? (
          <TextWithoutLineBreak text={text} />
        ) : (
          <TextWithLineBreak text={text} />
        )}
      </p>
      {lists?.map((list: any, i: number) => (
        <p key={i} className="flex items-center font-bold">
          {list?.isInclude ? (
            <FaCheck className="mr-3" />
          ) : (
            <ImCross className="mr-3" />
          )}{" "}
          {list?.text}
        </p>
      ))}
      <Link
        href="#"
        className="bottom-2 my-2 mt-2 block w-full md:absolute md:!w-[87%] lg:!w-[91%]"
      >
        <Button variant="blue" className="!w-full">
          Get Started
        </Button>
      </Link>
    </div>
  );
}
