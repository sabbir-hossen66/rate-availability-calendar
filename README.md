# Rate Availability Calendar

This project implements an infinite scroll feature vertically using TanStack Query (`@tanstack/react-query`) and the `react-infinite-scroll-component`. The infinite scroll allows users to seamlessly load more items as they scroll down the page. and Optimize the Horizontal scroll behavior to ensure it is smooth and responsive.

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

```const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery

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