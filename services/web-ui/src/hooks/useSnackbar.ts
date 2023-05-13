import { Grow } from "@mui/material";
import { VariantType, enqueueSnackbar } from "notistack";

import { useIsMobile } from "./useIsMobile";

export function useSnackbar() {
  const isMobile = useIsMobile();

  function showSnackbar(message: string, variant: VariantType): void {
    enqueueSnackbar(message, {
      anchorOrigin: {
        horizontal: "center",
        vertical: isMobile ? "top" : "bottom",
      },
      TransitionComponent: Grow,
      variant,
    });
  }

  return {
    error: (message: string) => showSnackbar(message, "error"),
    info: (message: string) => showSnackbar(message, "info"),
    success: (message: string) => showSnackbar(message, "success"),
    warn: (message: string) => showSnackbar(message, "warning"),
  };
}
