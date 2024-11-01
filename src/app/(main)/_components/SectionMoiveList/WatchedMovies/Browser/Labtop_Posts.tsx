"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

import useDevice from "@/hooks/useDevice";
import { useToastActions } from "@/stores/useToast";

import PostCard from "../../../PostCard";
import PostRating from "../../../Rating/PostRating";
interface WatchMovieType {
  MovieWatchMovies: WatchMovie[];
}
export default function Labtop_Posts({ MovieWatchMovies }: WatchMovieType) {
  const { device } = useDevice();
  const { add } = useToastActions();
  const handleToast = (text: string) => {
    add(text);
  };

  return (
    <div className=" hidden  w-full gap-[24px] rounded-xl   Laptop:block">
      <Swiper slidesPerView="auto" spaceBetween={device == "laptop" ? 20 : 24}>
        {MovieWatchMovies.map((e, index) => {
          return (
            <div key={e.movieId}>
              <Link href={`detail/${e.movieId}`}>
                <SwiperSlide
                  className={`${device == "laptop" ? "h-[328px] w-[174px]" : "h-[440px] w-[240px]"}`}
                >
                  <div className="flex flex-col  gap-2 ">
                    <Link href={`/detail/${e.movieId}`}>
                      <PostCard
                        PostType="Post"
                        background={e.poster_path}
                        content={e.overview}
                      />
                    </Link>
                    <div className="flex flex-col gap-1">
                      <span className="line-clamp-1 text-left text-Gray_Orange">
                        {e.movienm}
                      </span>
                      <div className="flex items-center justify-center">
                        <PostRating
                          movienm={e.movienm}
                          movieId={e.movieId}
                          StarReview={true}
                          handleMovieList={handleToast}
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </Link>
            </div>
          );
        })}
      </Swiper>
    </div>
  );
}
