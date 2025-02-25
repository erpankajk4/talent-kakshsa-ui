import Image from "next/image";
import { useState } from "react";
import { FaRegPlayCircle } from "react-icons/fa";
import { LuCopy } from "react-icons/lu";
import { TbCopyCheckFilled } from "react-icons/tb";
import MediaModal from "../MediaModal";

export function UserComments({
  description,
  images,
  cameraImages,
  videos,
  lastUpdated,
  userAvatar,
  userName,
  userDesignation,
  codeSnippet,
  codeSnippetFileName,
}: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMediaSrc, setSelectedMediaSrc] = useState("");
  const [selectedMediaType, setSelectedMediaType] = useState<"image" | "video">(
    "image",
  );
  const [isCodeCopied, setIsCodeCopied] = useState<boolean>(false);

  const handleCopyCode = () => {
    if (codeSnippet) {
      // Extract plain text from the highlighted code HTML
      const div = document.createElement("div");
      div.innerHTML = codeSnippet;
      const plainText = div.textContent || div.innerText || "";
      navigator.clipboard.writeText(plainText);
      setIsCodeCopied(true);

      // Reset the copied state after a short delay
      setTimeout(() => setIsCodeCopied(false), 10000);
    }
  };
  const openModal = (src: string, type: "image" | "video") => {
    setSelectedMediaSrc(src);
    setSelectedMediaType(type);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-3 rounded-lg bg-white p-3">
      <div className="flex w-full items-center gap-3">
        {!userAvatar ? (
          <div className="flex-center min-h-10 min-w-10 rounded-full bg-blue-900 capitalize text-white">
            P
          </div>
        ) : (
          <Image
            src={userAvatar}
            alt="userAvatar"
            width={100}
            height={100}
            className="h-12 min-h-12 w-12 rounded-full object-cover"
          />
        )}
        {/* User Details */}
        <div>
          <h6 className="font-bold">{userName}</h6>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm text-zinc-500">{userDesignation}</p>
            <p>|</p>
            <p className="text-sm text-zinc-500">{lastUpdated}</p>
          </div>
        </div>
      </div>
      {/* Description */}
      <p className="text-sm text-zinc-500">{description}</p>
      {/* Images & Videos */}
      <div className="flex flex-wrap gap-3">
        {images?.map((item: any, i: any) => (
          <Image
            key={i}
            src={item}
            alt="image"
            width={500}
            height={500}
            className="max-h-32 max-w-40 cursor-pointer rounded-lg object-cover"
            onClick={() => openModal(item, "image")}
          />
        ))}
        {cameraImages?.map((item: any, i: any) => (
          <Image
            key={i}
            src={item}
            alt="image"
            width={500}
            height={500}
            className="max-h-32 max-w-40 cursor-pointer rounded-lg object-cover"
            onClick={() => openModal(item, "image")}
          />
        ))}
        {videos?.map((item: any, i: any) => (
          <div key={i} className="relative">
            <div className="flex-center absolute inset-0">
              <FaRegPlayCircle className="text-2xl text-orange-500" />
            </div>
            <video
              width="500"
              className="h-32 max-h-32 w-40 max-w-40 cursor-pointer rounded-lg object-cover"
              onClick={() => openModal(item, "video")}
              muted
            >
              <source src={item} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
      {/* Code Snippet  */}
      {codeSnippet && (
        <div className="relative mt-5 w-full rounded-lg bg-orange-500 p-2 [&>pre]:rounded-none">
          {/* Button to copy code */}
          <button
            className="absolute right-5 top-5 cursor-pointer text-xl text-zinc-500"
            onClick={handleCopyCode}
          >
            {isCodeCopied ? <TbCopyCheckFilled /> : <LuCopy />}
          </button>
          <div className="overflow-hidden rounded-lg">
            <div className="flex items-center justify-between bg-gradient-to-r from-neutral-900 to-neutral-800 py-2 pl-2 pr-4 text-sm">
              <span className="-mb-[calc(0.5rem+2px)] rounded-t-lg border-2 border-white/5 border-b-neutral-700 bg-neutral-800 px-4 py-2 text-zinc-400">
                {codeSnippetFileName || "Code"}
              </span>
            </div>
            <div
              className="max-h-96 overflow-y-auto border-t-2 border-neutral-700 text-sm [&>pre]:overflow-x-auto [&>pre]:!bg-neutral-900 [&>pre]:py-3 [&>pre]:pl-4 [&>pre]:pr-5 [&>pre]:leading-snug [&_code]:block [&_code]:w-fit [&_code]:min-w-full"
              dangerouslySetInnerHTML={{ __html: codeSnippet }}
            ></div>
          </div>
        </div>
      )}
      {/* Media Modal */}
      <MediaModal
        isOpen={isModalOpen}
        mediaSrc={selectedMediaSrc}
        mediaType={selectedMediaType}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
