"use client";
import Image from "next/image";
import { useState } from "react";

import { ChatFillSm, StarFillMd, ThumbsUpFillSm } from "@/../public/icons";

import GetRating from "./Rating/GetRating";
interface PostNumber {
  num?: number;
  onMouseEnter?: () => void;
  Hover?: () => void;
  StarPostType?: string;
  PostType?: string;
  StarRating?: number;
  content?: string;
  regDate?: string;
  likeCount?: number;
  reviewCount?: number;
  background?: string;
  MobilePost?: string;
}

export default function PostCard({
  num,
  onMouseEnter,
  PostType,
  StarPostType,
  StarRating,
  content,
  regDate,
  likeCount,
  reviewCount,
  background,
  MobilePost,
}: PostNumber) {
  const [onMouseHover, SetMouseHover] = useState(false);
  const HandleMouseOver = () => {
    SetMouseHover(true);
  };
  const HandleMouseOut = () => {
    SetMouseHover(false);
  };
  return (
    <div
      className="h-[358px] w-[238px] cursor-pointer rounded-xl Tablet:h-[344px] Tablet:w-[260px] Laptop:h-[260px] Laptop:w-[174px]  Desktop:h-[360px] Desktop:w-[240px]"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, rgba(0, 0, 0, 0) 100%), url('${background ? `https://image.tmdb.org/t/p/original/${background}` : "/images/ssikongi/PNG/NoImage.png"}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onMouseEnter={onMouseEnter}
      onMouseOver={HandleMouseOver}
      onMouseOut={HandleMouseOut}
    >
      {num ? (
        <div className="flex h-[30px] w-[30px] items-center justify-center rounded-br-[12px] rounded-tl-[12px] bg-Primary Text-s-Bold Tablet:Text-l-Bold">
          {num}
        </div>
      ) : (
        ""
      )}
      {StarPostType && onMouseHover ? (
        <div
          className="flex h-[358px] w-[238px] flex-col items-center rounded-xl px-5 py-7 Text-m-Regular  Tablet:h-[390px] Tablet:w-[260px] Laptop:h-[260px] Laptop:w-[174px] Desktop:h-[360px] Desktop:w-[240px]"
          style={{
            backdropFilter: "blur(5px)",
            background: "rgba(0, 0, 0, 0.50)",
          }}
        >
          <div className="flex flex-col items-center gap-2 Desktop:gap-4">
            <GetRating StarRating={StarRating} ratingsize="Md" space={true} />
            <div className=" flex flex-col gap-1">
              <span className="Desktop:line-clamp-9 line-clamp-5 w-full text-Silver Text-m-Regular Laptop:h-[121px] Desktop:w-[216px]">
                {content}
              </span>
              <div className="flex justify-end text-Gray Text-xs-Regular">
                {regDate}
              </div>
            </div>
            <div className="w-full border-[1px] text-Gray" />
            <div className="flex   gap-2 Text-s-Medium">
              <div className="flex gap-1">
                <Image src={ThumbsUpFillSm} alt="별" />
                <span className="text-Gray_Orange ">{likeCount}</span>
              </div>
              <div className="flex gap-1">
                <Image src={ChatFillSm} alt="별" />
                <span className="text-Gray_Orange ">{reviewCount}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {PostType && onMouseHover ? (
        <div
          className=" flex h-[358px] w-[238px] items-center rounded-xl px-5 py-7  Text-m-Regular Tablet:h-[390px]  Tablet:w-[260px] Laptop:h-[260px] Laptop:w-[174px] Desktop:h-[360px] Desktop:w-[240px]"
          style={{
            backdropFilter: "blur(5px)",
            background: "rgba(0, 0, 0, 0.50)",
          }}
        >
          <span className="Desktop:line-clamp-9 line-clamp-6"> {content}</span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
