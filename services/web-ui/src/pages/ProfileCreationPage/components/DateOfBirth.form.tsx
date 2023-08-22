import React from "react";

import { Button, Typography } from "@mui/material";

import { Center } from "src/components/ui/Center";
import { DatePicker } from "src/components/ui/DatePicker";
import { VerticalCenter } from "src/components/ui/VerticalCenter";
import { useTranslation } from "src/core/i18n";

export interface DateOfBirthFormProps {
  onChange: (value: Date) => void;
  onNext: () => void;
  value: Date;
}

export function DateOfBirthForm({
  onChange,
  onNext,
  value,
}: DateOfBirthFormProps): React.ReactElement {
  const { t } = useTranslation("profile-creation");

  return (
    <VerticalCenter>
      <Center>
        <Typography color="primary" variant="h5" sx={{ paddingBottom: 2 }}>
          {t("date-of-birth.header")}
        </Typography>
      </Center>

      <Typography sx={{ paddingBottom: 2 }}>
        {t("date-of-birth.description")}
      </Typography>

      <DatePicker
        fullWidth
        onChange={(event) => onChange(event || new Date())}
        sx={{ paddingBottom: 2 }}
        value={value}
      />

      <Center>
        <Button disabled={!value} onClick={onNext} variant="contained">
          {t("date-of-birth.continue")}
        </Button>
      </Center>
    </VerticalCenter>
  );
}
