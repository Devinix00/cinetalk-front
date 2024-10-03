import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { tokenManager } from "../auth/tokenManager";
import { talkAPIs } from "./talkAPIs";
import { TALK_QUERY_KEYS } from "./talkQueryKeys";

export function useGetTalkQuery(movieId: number) {
  return useInfiniteQuery({
    queryKey: TALK_QUERY_KEYS.infiniteTalks(movieId),
    queryFn: ({ pageParam }) => talkAPIs.getTalks(movieId, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.isLast ? undefined : lastPage.totalPage + 1;
    },
  });
}

export function useGetReplies(parentReviewId: number) {
  return useInfiniteQuery({
    queryKey: TALK_QUERY_KEYS.infiniteMovieReplies(parentReviewId),
    queryFn: ({ pageParam }) => talkAPIs.getReplies(parentReviewId, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.isLast ? undefined : lastPage.totalPage + 1;
    },
  });
}

export function useGetMyTalk(movieId: number) {
  const accessToken = tokenManager.getToken();

  return useQuery({
    queryKey: [TALK_QUERY_KEYS.my(accessToken as string), movieId],
    queryFn: ({ queryKey }) => {
      const [, movieId] = queryKey;
      return talkAPIs.getMyTalk(movieId as number);
    },
    enabled: !!accessToken,
  });
}
