import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { addDays } from "date-fns";
import { FaAngleDown } from "react-icons/fa";
import { useClickOutside } from "@/customHook/useClickOutside";

export const DateRangeSelector = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedRange, setSelectedRange] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
    key: "selection",
  });

  // Toggle date picker visibility
  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  // Handle date range change
  const handleSelect = (ranges: any) => {
    setSelectedRange(ranges.selection);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-GB"); // Use en-GB for consistent dd/mm/yyyy format
  };

  // Use custom hook to detect clicks outside the date picker
  const datePickerRef = useClickOutside(() => setShowDatePicker(false));

  return (
    <div className="date-range-selector" ref={datePickerRef}>
      {/* Button to open date range picker */}
      <button
        className="flex cursor-pointer items-center gap-1 rounded-md bg-blue-900 px-2 py-2 text-white"
        onClick={toggleDatePicker}
      >
        <p className="cursor-pointer">
          {`${formatDate(selectedRange.startDate)} - ${formatDate(
            selectedRange.endDate,
          )}`}
        </p>
        <FaAngleDown />
      </button>
      {/* Render date range picker only when the button is clicked */}
      {showDatePicker && (
        <div className="absolute left-0 z-40 mt-2 overflow-x-auto shadow-xl max-md:max-w-[90vw]">
          <DateRangePicker
            ranges={[selectedRange]}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            months={2}
            direction="horizontal"
            className="shadow-lg"
          />
        </div>
      )}
    </div>
  );
};
