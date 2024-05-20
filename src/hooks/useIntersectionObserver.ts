import { useCallback, useEffect, useRef } from "react";

type UseScrollBasedDataLoaderProps = {
  containerId: string;
  isError: boolean;
  isLoading: boolean;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
};

const useIntersectionObserver = ({
  containerId,
  isError,
  isLoading,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: UseScrollBasedDataLoaderProps) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const targetElementRef = useRef<HTMLDivElement | null>(null);


  // console.log("isError", isError)
  // console.log("targetElementRef", targetElementRef)
  // console.log("isLoading", isLoading)
  // console.log("hasNextPage", hasNextPage)
  // console.log("isFetchingNextPage", isFetchingNextPage)
  const observeElement = useCallback(() => {
    if (
      !isError &&
      targetElementRef.current &&
      !isLoading &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            console.log("FETCH NEXT PAGE FIRED!!!!!!!!!!!!!!!!!!!!!!!!!");
            fetchNextPage();
          }
        },
        {
          root: null,
          rootMargin: "300px",
          threshold: 0,
        }
      );
      console.log("INTERSECTION OBERSERVER ATTACHED");
      observer.current.observe(targetElementRef.current);
    }
  }, [isLoading, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    observeElement();
    return () => observer.current?.disconnect();
  }, [observeElement]);

  return targetElementRef;
};

export default useIntersectionObserver;
