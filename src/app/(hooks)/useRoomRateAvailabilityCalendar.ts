// Import necessary modules and types
import Fetch from "@/utils/Fetch";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Dayjs } from "dayjs";

// ToDo: Add infinite query support

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

// Define the parameters and response interfaces for the hook
interface IParams {
  property_id: number;
  start_date: string;
  end_date: string;
}

interface IResponse {
  room_categories: Array<IRoomCategoryCalender>;
  nextCursor?: number; // available if you pass a cursor as query param
}

// Custom hook to fetch room rate availability calendar data
export default function useRoomRateAvailabilityCalendar(params: IParams) {
  const getCalender = async ({ pageParam = "0" }) => {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/property/${params.property_id}/rate-calendar/assessment`
    );

    url.search = new URLSearchParams({
      start_date: params.start_date,
      end_date: params.end_date,
      cursor: pageParam, // Cursor-based pagination
      _limit: "10",
    }).toString();

    const res = await Fetch<IResponse>({
      method: "GET",
      url: url.toString(),
    });

    console.log("API Response:", res.data);

    return {
      assessment: res.data.room_categories, //data
      nextCursor: res.data.nextCursor ?? null, //api theke pawa data
    };
  };

 return useInfiniteQuery({
  queryKey: ["roomRateCalendar", params.property_id], // Unique query key
  queryFn: getCalender,
  initialPageParam: 0, // Start from page 0
  getNextPageParam: lastPage => lastPage.nextCursor ?? null, // Use cursor pagination properly
  staleTime: 1000 * 60 * 5, // Cache data for 5 minutes (reduce network calls)
  cacheTime: 1000 * 60 * 10, // Keep unused cache for 10 minutes
  refetchOnWindowFocus: false, // Prevent refetch when user switches tabs
  keepPreviousData: true, // Show previous data while fetching new data
});

}

