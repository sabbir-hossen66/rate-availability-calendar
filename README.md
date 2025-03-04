# Rate Availability Calendar

## Live Demo & Repository  

🔗 **Live Site:** [Your Live Site Link Here](https://rate-availability-calendar-pa3x1vda1.vercel.app/)  
📂 **GitHub Repository:** [Your GitHub Repo Link Here](#)  

This project implements an infinite scroll feature vertically using TanStack Query (`@tanstack/react-query`) and the `react-infinite-scroll-component`. The infinite scroll allows users to seamlessly load more items as they scroll down the page. and Optimize the Horizontal scroll behavior to ensure it is smooth and responsive.

## Update features for varically scroll 
Instead of useQuery, I have used useInfiniteQuery and installed the InfiniteScroll component, and placed the data being displayed in the UI inside the InfiniteScroll component.

## Features

- **Infinite Scroll:** Items are loaded dynamically as the user scrolls down, reducing page load times and improving the user experience.
- **TanStack Query:** A powerful data-fetching library used to manage the fetching and caching of data efficiently.
- **React Infinite Scroll Component:** A simple and customizable component to implement the infinite scroll functionality.

#### Additional Note
 To implement infinite scroll in a React project using React Query, you don't need a separate installation for "infinite scroll" specifically. The infinite scroll functionality comes from the useInfiniteQuery hook in the React Query library. However, if you want to implement infinite scroll behavior by handling scroll events (like when the user reaches the bottom of the page), you might need an additional library like react-infinite-scroll-component.

## Installation

To get started with this project, follow these steps to install the required dependencies:

### Install Dependencies

```bash
npm install @tanstack/react-query
npm install react-infinite-scroll-component
```

For this example 

```
const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage) => lastPage.nextPage, // next page
  });

  return (
      <InfiniteScroll
      dataLength={items.length}
      next={loadMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    >
    {....your code}
    </infineScroll>
  )
  ```
"For the data to be displayed quickly in the UI, you can add the following methods under the queryFn..."

```
staleTime: 1000 * 60 * 30, // Keep cached data for 30 minutes
gcTime: 1000 * 60 * 60, // Keep cached data for 60 minutes
refetchOnWindowFocus: false, // Disable refetching when the window is focused
refetchOnMount: false, // Disable refetching when the component is mounted
retry: 1, // Retry the query once in case of failure

```

## Update features for Horizontal scroll 
In the page.tsx file, I set columnCount to 10 and columnWidth to 150 inside the AutoSizer. In the RoomCalendar.tsx file, I updated the **StyledVariableSizeGrid** to allow smooth horizontal scrolling. Additionally, I enabled the scrollbar and when the mouse left button is triggered and moved left or right, the data will show smoothly without any lag.

I have added the following properties under the StyledVariableSizeGrid variable to enable smooth horizontal scrolling:

```
overflowX: "auto", // Enables horizontal scrolling
scrollBehavior: "smooth", // Enables smooth scrolling
scrollbarWidth: "none", // Hides the scrollbar
msOverflowStyle: "none", // Hides the scrollbar for IE/Edge
"&::-webkit-scrollbar": {
  display: "none", // Hides the scrollbar in WebKit browsers
},

```

## Update DateChangePicker 
I have created a file named FormWithDatePicker for the date picker functionality. It is optimized for smooth performance, and I have imported it into the page.tsx file.

### For OptimizedIntegrations and facing challenge : 

I tried to implement debounce,throttle from lodash. but it'd didn't work for horizontally At that time, I fixed it in a different way, as described above.