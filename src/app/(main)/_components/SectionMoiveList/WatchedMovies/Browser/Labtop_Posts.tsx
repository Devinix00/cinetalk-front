import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

import useDevice from "@/hooks/useDevice";

import PostCard from "../../../PostCard";
import PostRating from "../../../Rating/PostRating";
interface WatchMovieType {
  MovieWatchMovies: WatchMovie | null;
}
export default function Labtop_Posts({ MovieWatchMovies }: WatchMovieType) {
  const { device } = useDevice();
  return (
    <div className=" hidden  w-full gap-[24px] rounded-xl  px-[12px] py-[24px] Laptop:flex">
      <Swiper slidesPerView="auto" spaceBetween={device == "laptop" ? 20 : 40}>
        {Array.isArray(MovieWatchMovies) && MovieWatchMovies.length > 0
          ? MovieWatchMovies.map((e, index) => {
              return (
                <Link key={index} href={`detail/${e.movieId}`}>
                  <SwiperSlide
                    className={`${device == "laptop" ? "h-[328px] w-[174px]" : "h-[440px] w-[220px]"}`}
                  >
                    <div className="flex flex-col  gap-2 ">
                      <PostCard
                        PostType="Post"
                        background={e.poster_path}
                        content={e.overview}
                      />
                      <div className="flex flex-col gap-1">
                        <span className="line-clamp-1 text-left text-Gray_Orange">
                          {e.movienm}
                        </span>
                        <div className="flex justify-center">
                          <PostRating />
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                </Link>
              );
            })
          : ""}
      </Swiper>
    </div>
  );
}
