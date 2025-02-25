import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFilePdf, FaMinus, FaPlus } from "react-icons/fa";
import { MdPlayCircleFilled } from "react-icons/md";
import MediaModal from "../MediaModal";

export const Accordion = ({
  title,
  titleTime,
  content,
  i,
  expanded,
  setExpanded,
}: any) => {
  const isOpen = i === expanded;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMediaSrc, setSelectedMediaSrc] = useState("");
  const [selectedMediaType, setSelectedMediaType] = useState<
    "image" | "video" | "pdf"
  >("image");
  const openModal = (src: string, type: "image" | "video" | "pdf") => {
    setSelectedMediaSrc(src);
    setSelectedMediaType(type);
    setIsModalOpen(true);
  };
  return (
    <>
      {/* title  */}
      <motion.div
        initial={false}
        animate={{ backgroundColor: isOpen ? "#e4e4e7" : "#ffffff" }}
        onClick={() => setExpanded(isOpen ? false : i)}
        className="flex cursor-pointer justify-between border border-zinc-300 p-3 max-md:flex-col"
      >
        <p className="flex items-center gap-2">
          {isOpen ? <FaMinus /> : <FaPlus />}
          <span>{title}</span>
        </p>
        <p className="text-right">{titleTime}</p>
      </motion.div>
      {/* content  */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <motion.ul
              variants={{ collapsed: { scale: 0.8 }, open: { scale: 1 } }}
              transition={{ duration: 0.8 }}
              className="origin-center px-3"
            >
              {content?.map((item: any, index: number) => (
                <li
                  key={index}
                  className="flex cursor-pointer justify-between gap-3 border-b border-zinc-300 bg-white p-3 max-md:flex-col md:items-center"
                >
                  <div className="flex items-center gap-3">
                    {/* ---------icons---------  */}
                    {item?.category === "video" && (
                      <MdPlayCircleFilled className="text-xl text-orange-500" />
                    )}
                    {item?.category === "pdf" && (
                      <FaFilePdf className="text-xl text-zinc-500" />
                    )}
                    {/* --------video & pdf----------  */}
                    {item?.category === "video" && (
                      <p
                        className="cursor-pointer"
                        onClick={() =>
                          item?.isDemo && openModal(item?.href, "video")
                        }
                      >
                        {item?.title}
                      </p>
                    )}
                    {item?.category === "pdf" && (
                      <p
                        className="cursor-pointer"
                        onClick={() =>
                          item?.isDemo && openModal(item?.href, "pdf")
                        }
                      >
                        {item?.title}
                      </p>
                    )}
                  </div>
                  <p className="space-x-2 text-right max-md:w-full">
                    {item?.isDemo && (
                      <span
                        className="cursor-pointer text-sm font-bold text-blue-900 hover:underline"
                        onClick={() => openModal(item?.href, item?.category)}
                      >
                        See Demo
                      </span>
                    )}
                    <span>{item?.duration}</span>
                  </p>
                </li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Modal  */}
      <MediaModal
        isOpen={isModalOpen}
        mediaSrc={selectedMediaSrc}
        mediaType={selectedMediaType}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
