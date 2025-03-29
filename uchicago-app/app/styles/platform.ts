import { Platform } from "../hooks/usePlatform";

export const getPlatformStyles = (platform: Platform) => ({
  // Navigation styles
  header: {
    height:
      platform === "ios" ? "44px" : platform === "android" ? "56px" : "64px",
    paddingTop: platform === "ios" ? "20px" : "0",
  },

  // Content container styles
  container: {
    padding: platform !== "web" ? "16px" : "24px",
    marginBottom: platform !== "web" ? "0" : "24px",
  },

  // Button styles
  button: {
    height: platform !== "web" ? "44px" : "40px",
    borderRadius:
      platform === "ios" ? "8px" : platform === "android" ? "4px" : "6px",
  },

  // Input styles
  input: {
    height: platform !== "web" ? "44px" : "40px",
    borderRadius:
      platform === "ios" ? "8px" : platform === "android" ? "4px" : "6px",
    padding: platform !== "web" ? "12px 16px" : "8px 12px",
  },

  // Map styles
  map: {
    height: platform !== "web" ? "calc(100vh - 88px)" : "calc(100vh - 64px)",
  },

  // Modal styles
  modal: {
    borderRadius:
      platform === "ios" ? "12px" : platform === "android" ? "4px" : "8px",
    padding: platform !== "web" ? "20px" : "24px",
  },

  // List item styles
  listItem: {
    height: platform !== "web" ? "60px" : "48px",
    padding: platform !== "web" ? "16px" : "12px",
  },

  // Font sizes
  fontSize: {
    small: platform !== "web" ? "14px" : "12px",
    medium: platform !== "web" ? "16px" : "14px",
    large: platform !== "web" ? "18px" : "16px",
  },

  // Touch targets
  touchTarget: {
    minHeight: platform !== "web" ? "44px" : "32px",
    minWidth: platform !== "web" ? "44px" : "32px",
  },
});
