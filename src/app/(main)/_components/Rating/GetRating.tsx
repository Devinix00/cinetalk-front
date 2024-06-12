"use client";
import Image from "next/image";

import { StarFillMd, StarHalfMd, StarMd } from "@/../public/icons";
interface RatingProps {
  StarRating?: number;
}
export default function GetRating({ StarRating = 0 }: RatingProps) {
  let star = StarRating;
  return (
    <div className="flex ">
      {Array(5)
        .fill(0)
        .map((_, index) => {
          if (star >= 1) {
            star--;
            return <Image key={index} src={StarFillMd} alt="별" />;
          } else if (star == 0.5) {
            star -= 0.5;
            return <Image key={index} src={StarHalfMd} alt="별" />;
          } else {
            return <Image key={index} src={StarMd} alt="별" />;
          }
        })}
    </div>
  );
}
