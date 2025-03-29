import { useEffect, useState } from "react";
import { Capacitor } from "@capacitor/core";

export type Platform = "ios" | "android" | "web";

export function usePlatform() {
  const [platform, setPlatform] = useState<Platform>("web");

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      if (Capacitor.getPlatform() === "ios") {
        setPlatform("ios");
      } else if (Capacitor.getPlatform() === "android") {
        setPlatform("android");
      }
    }
  }, []);

  const isMobile = platform === "ios" || platform === "android";
  const isIOS = platform === "ios";
  const isAndroid = platform === "android";
  const isWeb = platform === "web";

  return {
    platform,
    isMobile,
    isIOS,
    isAndroid,
    isWeb,
  };
}
