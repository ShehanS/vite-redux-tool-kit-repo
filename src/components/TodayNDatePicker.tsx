import React from "react";
import { Stack, IconButton } from "@mui/joy";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const TodayNDatePicker = ({
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
  onTodayButtonClick,
}) => {
  return (
    <Stack direction={"row"} spacing={2}>
      <IconButton onClick={onTodayButtonClick}>Today</IconButton>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker value={fromDate} onChange={onFromDateChange} />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker value={toDate} onChange={onToDateChange} />
      </LocalizationProvider>
    </Stack>
  );
};

export default TodayNDatePicker;
//Edited TodayNDatePicker