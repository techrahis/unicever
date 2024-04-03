"use client";
import React, { useEffect, useState } from "react";

const IsMobile = () => {
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  const handleMobileScreen = () => {
    setIsMobileScreen(window.innerWidth < 768);
  };

  useEffect(() => {
    handleMobileScreen();

    window.addEventListener("resize", handleMobileScreen);

    return () => window.removeEventListener("resize", handleMobileScreen);
  }, []);
  return isMobileScreen;
};

export default IsMobile;
