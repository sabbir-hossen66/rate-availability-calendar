"use client";

import QueryProvider from "@/components/QueryProvider";

import NotistackProvider from "./NotistackProvider";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";


export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NotistackProvider>
      <QueryProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {children}
        </LocalizationProvider>
      </QueryProvider>
    </NotistackProvider>
  );
}
