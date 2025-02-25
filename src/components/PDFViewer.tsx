import { pdf } from "@/assets";
import React, { useState, useEffect } from "react";

interface PdfViewerProps {
  pdfUrl: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfUrl }) => {
  useEffect(() => {
    const handleResize = () => {
      const viewer = document.getElementById("pdf-viewer");
      if (viewer) {
        viewer.style.height = `${window.innerHeight}px`;
        viewer.style.width = `${window.innerWidth}px`;
      }
    };

    handleResize(); // Initial call
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="h-full w-full">
      <div
        id="pdf-viewer"
        className="h-full w-full overflow-hidden border-none md:!w-[70vw]"
      >
        <iframe
          src={pdfUrl}
          title="PDF Viewer"
          className="h-full w-full border-none"
        />
      </div>
    </div>
  );
};

export default PdfViewer;
