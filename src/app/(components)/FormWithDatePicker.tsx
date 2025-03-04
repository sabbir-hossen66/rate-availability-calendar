import React from "react";
import { Controller, useForm } from "react-hook-form";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { Grid } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const FormWithDatePicker = () => {
  // Ensure the default value is a tuple, not an array
  const dateRange: [dayjs.Dayjs | null, dayjs.Dayjs | null] = [dayjs(), dayjs().add(7, "day")];

  const { control } = useForm({
    defaultValues: {
      date_range: dateRange, // Use a properly defined tuple
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Controller
            name="date_range"
            control={control}
            rules={{
              required: "Please specify a date range.",
            }}
            render={({ field: { value, onChange }, fieldState: { invalid, error } }) => (
              <DateRangePicker
                value={value}
                onChange={onChange}
                autoFocus
                minDate={dayjs()}
                maxDate={dayjs().add(2, "year")}
                slots={{ field: SingleInputDateRangeField }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: invalid,
                    helperText: invalid ? error?.message : null,
                    sx: {
                      width: "100%",
                      "& .MuiInputBase-root": {
                        height: "100%",
                      },
                      "& .MuiInputBase-input": {
                        paddingY: "12px",
                      },
                    },
                  },
                  desktopPaper: {
                    sx: {
                      mt: 1,
                      "& .MuiDialogActions-root": {
                        padding: 2,
                      },
                    },
                  },
                }}
                sx={{
                  width: "100%",
                  "& .MuiInputBase-root": {
                    borderRadius: 1,
                  },
                }}
              />
            )}
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default FormWithDatePicker;
