"use client";

// Import necessary modules and components
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Grid2 as Grid,
  Typography,
  Card,
  Box,
  Container,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { DateRange } from "@mui/x-date-pickers-pro";
// import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
// import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { useForm } from "react-hook-form";
import React, {
  RefObject,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  VariableSizeList,
  ListChildComponentProps,
  areEqual,
  FixedSizeGrid,
  GridChildComponentProps,
  VariableSizeGrid,
  GridOnScrollProps,
} from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import { countDaysByMonth } from "@/utils";
import RoomRateAvailabilityCalendar from "./(components)/RoomCalendar";
import Navbar from "@/components/Navbar";
import useRoomRateAvailabilityCalendar from "./(hooks)/useRoomRateAvailabilityCalendar";
import FormWithDatePicker from "./(components)/FormWithDatePicker";
import { useVirtualizer } from "@tanstack/react-virtual";


// Define the form type for the date range picker
export type CalendarForm = {
  date_range: DateRange<dayjs.Dayjs>;
};

// Style the VariableSizeList to hide the scrollbar
const StyledVariableSizeList = styled(VariableSizeList)({
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  scrollBehavior: "smooth", // Smooth scrolling
  overflowX: "auto", // Ensure horizontal scroll
  // "&::-webkit-scrollbar": {
  //   display: "none",
  // },
});


export default function Page() {
  const theme = useTheme(); // Get the theme for styling
  const propertyId = 1; // Example property ID

  // Refs for various elements to handle scrolling
  const rootContainerRef = useRef<HTMLDivElement>(null);
  const calenderMonthsRef = useRef<VariableSizeList | null>(null);
  const calenderDatesRef = useRef<FixedSizeGrid | null>(null);
  const mainGridContainerRef = useRef<HTMLDivElement | null>(null);
  const InventoryRefs = useRef<Array<RefObject<VariableSizeGrid>>>([]);


  // Handle horizontal scroll for dates
  const handleDatesScroll = useCallback(({ scrollLeft }: GridOnScrollProps) => {
    InventoryRefs.current.forEach((ref) => {
      if (ref.current) {
        ref.current.scrollTo({ scrollLeft });
      }
    });
    if (calenderMonthsRef.current) {
      calenderMonthsRef.current.scrollTo(scrollLeft);
    }
  }, []);


  // Handle horizontal scroll for the entire calendar
  const handleCalenderScroll = useCallback(
    ({ scrollLeft }: GridOnScrollProps) => {
      InventoryRefs.current.forEach((ref) => {
        if (ref.current) {
          ref.current.scrollTo({ scrollLeft });
        }
      });
      if (calenderMonthsRef.current) {
        calenderMonthsRef.current.scrollTo(scrollLeft);
      }
      if (calenderDatesRef.current) {
        calenderDatesRef.current.scrollTo({ scrollLeft });
      }
    },
    []
  );



  // Add event listener for wheel scroll to handle horizontal scrolling
  useEffect(() => {
    const { current: rootContainer } = rootContainerRef;
    if (rootContainer) {
      const handler = (e: WheelEvent) => {
        if (
          mainGridContainerRef.current &&
          InventoryRefs.current &&
          calenderMonthsRef.current &&
          calenderDatesRef.current
        ) {
          // Check if deltaX is non-zero (indicating horizontal scroll)
          if (e.deltaX !== 0) {
            e.preventDefault();
            let { scrollLeft } = mainGridContainerRef.current;
            scrollLeft += e.deltaX;

            InventoryRefs.current.forEach((ref) => {
              if (ref.current) {
                ref.current.scrollTo({ scrollLeft });
              }
            });

            calenderMonthsRef.current.scrollTo(scrollLeft);
            calenderDatesRef.current.scrollTo({ scrollLeft });
          }
        }
      };
      rootContainer.addEventListener("wheel", handler);
      return () => rootContainer.removeEventListener("wheel", handler);
    }
  });





  // State for calendar dates and months
  const [calenderDates, setCalenderDates] = useState<Array<dayjs.Dayjs>>([]);
  const [calenderMonths, setCalenderMonths] = useState<Array<[string, number]>>(
    []
  );




  // Form control for date range picker
  const {  watch } = useForm<CalendarForm>({
    defaultValues: {
      date_range: [dayjs(), dayjs().add(4, "month")],
    },
  });
  const watchedDateRange = watch("date_range");

  // Update calendar dates and months when the date range changes
  useEffect(() => {
    const { months, dates } = countDaysByMonth(
      watchedDateRange[0]!,
      watchedDateRange[1]
        ? watchedDateRange[1]
        : watchedDateRange[0]!.add(2, "month")
    );

    setCalenderMonths(months);
    setCalenderDates(dates);
  }, [watchedDateRange]);

  // Fetch room rate availability calendar data
const { data, fetchNextPage, hasNextPage,isFetchingNextPage } = useRoomRateAvailabilityCalendar({
  property_id: propertyId,
  start_date: watchedDateRange[0]!.format("YYYY-MM-DD"),
  end_date: (watchedDateRange[1]
    ? watchedDateRange[1]
    : watchedDateRange[0]!.add(2, "month")
  ).format("YYYY-MM-DD"),
});
  //console.log("see the data", data?.pages[0]?.assessment?.room_categories);


  const parentRef = useRef<HTMLDivElement | null>(null);
  //const parentMonthRef = useRef<HTMLDivElement>(null);


//virtualize
// const monthVirtualizer = useVirtualizer({
//   horizontal: true,
//   count: calenderMonths.length,
//   getScrollElement: () => parentRef.current,
//   estimateSize: (index) => calenderMonths[index][1] * 74, // Adjusting size dynamically
//   overscan: calenderMonths.length, // To smooth out rendering
// });
//    console.log('new virtualize', monthVirtualizer.getVirtualItems());

const rowVirtualizer = useVirtualizer({
  count: calenderDates.length||0,
 getScrollElement: () => parentRef.current || document.body,
  estimateSize: () => 74, // Fixed column width
  overscan:calenderDates.length
});
  //console.log('new virtualize', rowVirtualizer.getVirtualItems());
   console.log('parentref',parentRef.current);
  // console.log('calender', calenderDates);
  
  
  useEffect(() => {
  setTimeout(() => {
    parentRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  }, 50);
}, []);

  // console.log('new virtualize', dateVirtualizer.getVirtualItems());



  // Component to render each month row in the calendar
  // const MonthRow: React.FC<ListChildComponentProps> = memo(function MonthRowFC({
  //   index,
  //   style,
  // }) {
  //   const month = calenderMonths[index][0];

  //   return (
  //     <Box style={style}>
  //       <Box
  //         sx={{
  //           px: 1,
  //           fontSize: "12px",
  //           fontWeight: "bold",
  //           borderLeft: "1px solid",
  //           borderBottom: "1px solid",
  //           borderColor: theme.palette.divider,
  //         }}
  //       >
  //         <Box
  //           component="span"
  //           sx={{
  //             position: "sticky",
  //             left: 2,
  //             zIndex: 1,
  //           }}
  //         >
  //           {month}
  //         </Box>
  //       </Box>
  //     </Box>
  //   );
  // },
  // areEqual);

  // add new
  const MonthRow: React.FC<{ index: number; style: React.CSSProperties }> = memo(
  function MonthRowFC({ index, style, }) {
   // const month = calenderMonths[index][0];
    const month =calenderMonths[index]?.[0] ;

    return (
      <Box style={style}>
        <Box
          sx={{
            px: 1,
            fontSize: "12px",
            fontWeight: "bold",
            borderLeft: "1px solid",
            borderBottom: "1px solid",
            borderColor: "#ddd",
          }}
        >
          <Box
            component="span"
            sx={{
              position: "sticky",
              left: 2,
              zIndex: 1,
            }}
          >
            {month}
          </Box>
        </Box>
      </Box>
    );
  }
);


  // Component to render each date row in the calendar
  // const DateRow: React.FC<GridChildComponentProps> = memo(function DateRowFC({
  //   columnIndex,
  //   style,
  // }) {
  //   return (
  //     <Box style={style}>
  //       <Box
  //         sx={{
  //           //pr: 1,
  //           fontSize: "14px",
  //           textAlign: "center",
  //           fontWeight: "bold",
  //           borderLeft: "2px solid",
  //           borderBottom: "1px solid",
  //           padding:'6px',
  //           borderColor: theme.palette.divider,
  //         }}
  //       >
  //         {/* <Box>{calenderDates[columnIndex]?.format("ddd")}</Box> */}
  //         <Box>{calenderDates[columnIndex]?.format("DD")}</Box>
  //       </Box>
  //     </Box>
  //   );
  // },
  //   areEqual);
  
  // new add
  const DateRow: React.FC<{ columnIndex: number; style: React.CSSProperties }> = memo(
  function DateRowFC({ columnIndex, style }) {
    return (
      <Box style={style}>
        <Box
          sx={{
            fontSize: "14px",
            textAlign: "center",
            fontWeight: "bold",
            borderLeft: "2px solid",
            borderBottom: "1px solid",
            padding: "6px",
            borderColor: "#ddd",
          }}
        >
          {/* তারিখ ফরম্যাটিং */}
          {/* {calenderDates[columnIndex] ? calenderDates[columnIndex].format("DD") : "--"} */}
           <Box>{calenderDates[columnIndex]?.format("DD")}</Box>
        </Box>
      </Box>
    );
  }
);

  

  return (
    <Container sx={{ backgroundColor: "#EEF2F6"  }}>

    <Navbar />
      <Box>
        <Card elevation={1} sx={{ padding: 4, mt: 4 }}>
          <Grid container columnSpacing={2}>
            <Grid size={12}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  mb: 0,
                }}
              >
                Rate Calendar
              </Typography>
            </Grid>

       <FormWithDatePicker/>
            
          </Grid>
        </Card>
        
        <Card elevation={1} sx={{ my: 6, padding: 3}} ref={rootContainerRef}>
        

          <Grid container sx={{ height: 48, mb: 4}}>  
            <Grid
              sx={{
                //borderBottom: "2px solid",
                border:"2px solid",
                //borderColor: theme.palette.divider,
                borderColor: "green",
                mt: 2,
                padding:3
         
              }}
              size={{
                xs: 4,
                sm: 4,
                md: 3,
                lg: 2,
                xl: 2,
              }}
            ></Grid>

            <Grid
              size={{
                xs: 8,
                sm: 8,
                md: 9,
                lg: 10,
                xl: 10,
              }}
            >
               <AutoSizer disableHeight>
                {({ width }) => (
                  <StyledVariableSizeList
                    height={30}
                    width={width}
                     itemCount={calenderMonths.length}
                    //itemCount={Math.ceil(calenderMonths.length / 2)}
                    itemSize={(index: number) => {
                      const no_of_days = calenderMonths[index][1];
                      return no_of_days * 74;
                    }}
                    layout="horizontal"
                    ref={calenderMonthsRef}
                  >
                    {MonthRow}
                  </StyledVariableSizeList>
                )}
              </AutoSizer> 



                {/* <AutoSizer>
                  {({ height, width }) => (
                    
                  <FixedSizeGrid
                      height={height}
                      width={width}
                      columnCount={calenderDates.length}
                      //columnCount={Math.ceil(calenderDates.length / 2)}
                      columnWidth={74}
                      rowCount={1}
                      rowHeight={37}
                      ref={calenderDatesRef}
                      outerRef={mainGridContainerRef}
                      onScroll={handleDatesScroll}

                    >
                      {DateRow}
                    </FixedSizeGrid>

                  )}
                </AutoSizer>  */}
   <div
    ref={parentRef}
    style={{
      width: "100%",
      overflowX: "auto",
      whiteSpace: "nowrap",
      position: "relative",
      height: "40px", 
        scrollBehavior: "smooth",
    }}
  >
    <div
      style={{
        width: `${rowVirtualizer.getTotalSize()}px`,
        display: "flex",
        position: "relative",
      }}
    >
      {rowVirtualizer.getVirtualItems().map((virtualItem) => (
        <DateRow
          key={virtualItem.index}
          columnIndex={virtualItem.index}
          style={{
            position: "absolute",
            left: `${virtualItem.start}px`,
            width: "74px",
            height: "37px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #ddd",
          }}
        />
      ))}
    </div>
  </div> 


            </Grid>
          </Grid> 



  {
            
  <InfiniteScroll
  dataLength={data ? data?.pages?.length : 0}           
  next={() => fetchNextPage()}
  hasMore={hasNextPage}
  loader={
     isFetchingNextPage  ? (
      <Box display="flex" justifyContent="center" alignItems="center" height="100px" sx={{ color: "green" }}>
        Loading More data... Please wait..
      </Box>
    ) : !hasNextPage ? (
             <Box display="flex" justifyContent="center" alignItems="center" height="100px" sx={{ color: "red" }}>
        No More data...
      </Box>
    ):null
  }       
scrollThreshold={0.6} // Trigger data load earlier (60% scroll)
>
              <div>
                 {data?.pages?.flatMap((page) =>
  page?.assessment?.map((room_category, index, array) => (
    <RoomRateAvailabilityCalendar
      key={room_category.id}
      room_category={room_category}
      InventoryRefs={InventoryRefs}
      handleCalenderScroll={handleCalenderScroll}
      index={index}
      isLastElement={index === array.length - 1}
    />
  ))
   
)}
</div>
 </InfiniteScroll>

   }
        </Card>
        
      </Box>

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          textAlign: "center",
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Grit System. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
}