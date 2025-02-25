"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { LuDownload } from "react-icons/lu";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { pdf } from "@/assets";
import PdfViewer from "./PDFViewer";
import useIsMobile from "./customHooks/useIsMobile";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useClickOutside } from "@/customHook/useClickOutside";

interface MediaModalProps {
  isOpen: boolean;
  mediaSrc: string;
  mediaType: "image" | "video" | "pdf";
  onClose: () => void;
}

const MediaModal: React.FC<MediaModalProps> = ({
  isOpen,
  mediaSrc,
  mediaType,
  onClose,
}) => {
  // const downloadPDF = () => {
  //   const link = document.createElement("a");
  //   link.href = mediaSrc;
  //   link.download = mediaSrc.split("/").pop() || "document.pdf";
  //   link.click();
  // };

  const isMobile = useIsMobile();
  const router = useRouter();
  const clickOutsiderRef = useClickOutside(onClose);

  useEffect(() => {
    if (isOpen && isMobile && mediaType === "pdf") {
      router.push(mediaSrc);
    }
  }, [isOpen, isMobile, mediaType, mediaSrc, router]);
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 !m-0 flex items-center justify-center bg-black bg-opacity-70"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-max rounded-lg max-md:h-full"
        onClick={(e) => e.stopPropagation()}
        ref={clickOutsiderRef}
      >
        <button
          className="absolute right-5 top-5 z-10 text-2xl text-orange-500 md:-right-7 md:-top-6"
          onClick={onClose}
        >
          <AiOutlineCloseCircle />
        </button>
        {mediaType === "image" && (
          <div className="flex h-full items-center">
            <Image
              src={mediaSrc}
              alt="media"
              width={800}
              height={800}
              className="h-auto max-h-[80vh] w-full rounded-lg object-contain"
            />
          </div>
        )}
        {mediaType === "video" && (
          <div className="flex h-full items-center">
            <video
              src={mediaSrc}
              controls
              autoPlay
              loop
              className="max-h-[80vh] w-full rounded-lg"
            />
          </div>
        )}
        {mediaType === "pdf" && (
          <div className="h-full w-full overflow-auto rounded-lg bg-white p-4 md:max-h-[80vh]">
            {!isMobile && <PdfViewer pdfUrl={mediaSrc} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaModal;
