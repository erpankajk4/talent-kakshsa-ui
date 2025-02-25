import { useState, useEffect } from "react";

const useIsIOS = () => {
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [isIPhone, setIsIPhone] = useState<boolean>(false);

  useEffect(() => {
    const userAgent =
      typeof window !== "undefined" ? window.navigator.userAgent : "";

    const iOS =
      /iPad|iPhone|iPod/.test(userAgent) && !/Android/.test(userAgent);
    const iPhone = /iPhone/.test(userAgent) && !/Android/.test(userAgent);

    setIsIOS(iOS);
    setIsIPhone(iPhone);
  }, []);

  return { isIOS, isIPhone };
};

export default useIsIOS;
