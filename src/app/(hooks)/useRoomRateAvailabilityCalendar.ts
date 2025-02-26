import Fetch from "@/utils/Fetch";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Dayjs } from "dayjs";

// Define interfaces for the data structures used in the calendar
export interface IRoomInventory {
  id: string;
  date: Dayjs;
  available: number;
  status: boolean;
  booked: number;
}

export interface IRoomRatePlans {
  id: number;
  name: string;
}

export interface IRateCalendar {
  id: string;
  date: Dayjs;
  rate: number;
  min_length_of_stay: number;
  reservation_deadline: number;
}

export interface IRatePlanCalendar extends IRoomRatePlans {
  calendar: Array<IRateCalendar>;
}

export interface IRoomCategory {
  id: string;
  name: string;
  occupancy: number;
}

export interface IRoomCategoryCalender extends IRoomCategory {
  inventory_calendar: Array<IRoomInventory>;
  rate_plans: Array<IRatePlanCalendar>;
}

// Define parameters and response interfaces
export interface IParams {
  property_id: number;
  start_date: string;
  end_date: string;
}

export interface IResponse {
  room_categories: Array<IRoomCategoryCalender>;
  nextCursor?: number; // Available if pagination is supported
  prevCursor?: number; // Added previous cursor for bidirectional pagination
}

// Custom hook using `useInfiniteQuery`
export default function useRoomRateAvailabilityCalendar(params: IParams) {
return useInfiniteQuery<IResponse>({
    queryKey: ["property_room_calendar", params], // Unique query key
    queryFn: async ({ pageParam = 0 }) => {
      const url = new URL(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/property/${params.property_id}/rate-calendar/assessment`
      );

      url.search = new URLSearchParams({
        start_date: params.start_date,
        end_date: params.end_date,
        cursor: String(pageParam), // Pass `pageParam` dynamically
      }).toString();

      return Fetch<IResponse>({
        method: "GET",
        url,
      });
    },
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? null, // Get next page
    getPreviousPageParam: (firstPage) => firstPage?.prevCursor ?? null, // Get previous page
  });
}
