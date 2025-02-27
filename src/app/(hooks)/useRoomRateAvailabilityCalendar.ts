import Fetch from "@/utils/Fetch";
import { useInfiniteQuery } from "@tanstack/react-query";
// import {  useQuery } from "@tanstack/react-query";
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
  length?: number; // Added length for total number of records
}

// Custom hook using `useInfiniteQuery`
export default function useRoomRateAvailabilityCalendar(params: IParams) {

 /*   const url = new URL(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/property/${params.property_id}/rate-calendar/assessment`
    ); */

  // `getCalender` ফাংশনে URLSearchParams যোগ করা হলো
  const getCalender = async ({ pageParam = 0 }) => {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/property/${params.property_id}/rate-calendar/assessment`
    );

    // Query parameters যুক্ত করা হলো
    url.search = new URLSearchParams({
      start_date: params.start_date,
      end_date: params.end_date,
      _limit: "10",
      _start: pageParam.toString(), // Number কে String এ কনভার্ট করা হলো
    }).toString();

    // Fetch দিয়ে API কল করা হচ্ছে
    const res = await Fetch<IResponse>({
      method: "GET",
      url: url.toString(), // `url` কে string এ convert করে পাঠাতে হবে
    });
  console.log("API Response33:", res.data);
    return { assessment: res.data, prevOffset: pageParam };
  };

  // Use React Query's useQuery hook to fetch data
  return useInfiniteQuery({
    queryKey: ["users"],
    queryFn: getCalender,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      // যদি আর নতুন ডেটা না থাকে, তাহলে null ফেরত দেবে
      if (!lastPage.assessment.length) return null;
      return lastPage.prevOffset + 10; // পরবর্তী pageParam সেট করবে
    },
  });
};