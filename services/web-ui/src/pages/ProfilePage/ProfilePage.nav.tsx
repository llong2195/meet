import { ReactElement } from "react";

import { Box } from "@mui/material";

import { NavLayout } from "src/components/layout";
import { Nav } from "src/components/nav";
import { useTranslation } from "src/core/i18n";

interface ProfilePageNavProps {
  children: ReactElement;
}

export function ProfilePageNav({
  children,
}: ProfilePageNavProps): ReactElement {
  const { t } = useTranslation("profile");

  return (
    <Nav>
      <NavLayout linkText={t("links.blog")} to="/">
        <Box sx={{ pt: 1 }}>{children}</Box>
      </NavLayout>
    </Nav>
  );
}
