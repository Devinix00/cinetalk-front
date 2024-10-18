import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";

import {
  StarFillLg,
  StarFillXl,
  StarHalfLg,
  StarHalfXl,
  StarLg,
  StarXl,
} from "@/../public/icons";
import { talkAPIs } from "@/services/talk/talkAPIs";

interface StarProps {
  index: number;
  ratingValue: number;
  setRatingValue: Dispatch<SetStateAction<number>>;
  clickedValue: boolean;
  setClickedValue: Dispatch<SetStateAction<boolean>>;
  ratingSize: string;
  readyToRating?: boolean;
  StarReview?: boolean;
  movienm?: string;
  movieId?: number;
  genreList?: number[];
}

export default function RatingStar({
  ratingValue,
  index,
  setRatingValue,
  clickedValue,
  setClickedValue,
  ratingSize,
  readyToRating,
  StarReview,
  movienm,
  movieId,
  genreList,
}: StarProps) {
  let src;
  let alt;

  if (ratingValue >= index + 1) {
    if (ratingSize == "Lg") {
      src = StarFillLg;
      alt = "작은 별";
    } else {
      src = StarFillXl;
      alt = "큰 별";
    }
  } else if (ratingValue > index && ratingValue === index + 0.5) {
    if (ratingSize == "Lg") {
      src = StarHalfLg;
      alt = "작은 별";
    } else {
      src = StarHalfXl;
      alt = "큰 반 별";
    }
  } else {
    if (ratingSize == "Lg") {
      src = StarLg;
      alt = "작은 빈 별";
    } else {
      src = StarXl;
      alt = "큰 빈 별";
    }
  }
  const AddStarReview = async (star: number) => {
    if (StarReview) {
      await talkAPIs.addTalks({
        movieName: movienm!,
        movieId: movieId!,
        star: star,
        content: "",
        spoiler: false,
        genreList: genreList || [],
      });
    }
  };

  return (
    <div
      className="relative"
      onMouseLeave={() => {
        if (!clickedValue) setRatingValue(0);
      }}
      onClick={() => {
        setRatingValue(ratingValue);
        setClickedValue(!clickedValue);
        AddStarReview(ratingValue);
      }}
    >
      <div
        className="absolute left-0 top-0 h-full w-1/2"
        onMouseEnter={() => {
          if (!clickedValue) setRatingValue(index + 0.5);
        }}
      />
      <div
        className="absolute right-0 top-0 h-full w-1/2"
        onMouseEnter={() => {
          if (!clickedValue) setRatingValue(index + 1);
        }}
      />
      <Image
        src={src}
        alt={alt as string}
        className="max-h-11 max-w-11 pl-1 last:pl-0"
      />
    </div>
  );
}
