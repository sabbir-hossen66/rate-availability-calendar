# Rate Availability Calendar

This project implements an infinite scroll feature vertically using TanStack Query (`@tanstack/react-query`) and the `react-infinite-scroll-component`. The infinite scroll allows users to seamlessly load more items (posts) as they scroll down the page.

## Features

- **Infinite Scroll:** Items (posts) are loaded dynamically as the user scrolls down, reducing page load times and improving the user experience.
- **TanStack Query:** A powerful data-fetching library used to manage the fetching and caching of data efficiently.
- **React Infinite Scroll Component:** A simple and customizable component to implement the infinite scroll functionality.

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