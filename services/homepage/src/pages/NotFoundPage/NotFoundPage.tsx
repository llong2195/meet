import React from "react";

import { Typography } from "@mui/material";

import { NotFoundNav } from "./NotFoundPage.nav";

export function NotFoundPage(): React.ReactElement {
  return (
    <NotFoundNav>
      <Typography>The page you were looking for was not found</Typography>
    </NotFoundNav>
  );
}
