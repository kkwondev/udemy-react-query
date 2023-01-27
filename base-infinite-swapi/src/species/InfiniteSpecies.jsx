import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import { Species } from "./Species";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error,
    isFetching,
  } = useInfiniteQuery(
    "sw-species",
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    { getNextPageParam: (lastPage) => lastPage.next || undefined }
  );

  if (isLoading) return <div className="loading">Loading</div>;
  if (isError) return <div>{error.toString()}</div>;
  const items = data.pages.flatMap((page) => page.results);
  // TODO: get data for InfiniteScroll via React Query
  return (
    <InfiniteScroll hasMore={hasNextPage} loadMore={fetchNextPage}>
      {items.map((item) => (
        <Species
          key={item.name}
          name={item.name}
          language={item.language}
          averageLifespan={item.averageLifespan}
        />
      ))}
      {isFetching && <div className="loading">Loading</div>}
    </InfiniteScroll>
  );
}
