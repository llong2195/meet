import React, { useState } from "react";

import { Box, Typography } from "@mui/material";

import { journalApi } from "src/apis";
import { ErrorMessage } from "src/components/ui/ErrorMessage";
import { CacheKeysConstants, useQuery } from "src/core/query";
import { getDateDaysAgo } from "src/utils/time";

import { JournalPageComponent } from "./JournalPage.component";
import { JournalPageNav } from "./JournalPage.nav";

export function JournalPageContainer(): React.ReactElement {
  const [dateRange, setDateRange] = useState({
    to: new Date(),
    from: getDateDaysAgo(2),
  });

  const { error, data, isLoading } = useQuery(
    [CacheKeysConstants.Journal, dateRange.from, dateRange.to],
    () => journalApi.getJournal(dateRange)
  );

  if (error) {
    return (
      <JournalPageNav onDateChange={setDateRange} values={dateRange}>
        <ErrorMessage error={error} />
      </JournalPageNav>
    );
  }

  if (isLoading) {
    return (
      <JournalPageNav onDateChange={setDateRange} values={dateRange}>
        <Box sx={{ marginTop: 2 }}>
          <JournalPageComponent data={[]} loading />
        </Box>
      </JournalPageNav>
    );
  }

  if (!data) {
    return (
      <JournalPageNav onDateChange={setDateRange} values={dateRange}>
        <Typography>No entries found in journal</Typography>
      </JournalPageNav>
    );
  }

  return (
    <JournalPageNav onDateChange={setDateRange} values={dateRange}>
      <Box sx={{ marginTop: 2 }}>
        <JournalPageComponent data={data.entries} />
      </Box>
    </JournalPageNav>
  );
}
