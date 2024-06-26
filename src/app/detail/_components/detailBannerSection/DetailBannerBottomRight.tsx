import Image from "next/image";
import React from "react";

import {
  EditPencilLineMd,
  EditPencilLineSm,
  HeartLineLg,
  HeartLineXl,
} from "../../../../../public/icons";
import { DetailPoster } from "../../../../../public/images";

export default function DetailBannerBottomRight() {
  return (
    <section className="absolute bottom-[-60px] flex translate-y-[100%] Tablet:bottom-[-41px] Laptop:static Laptop:translate-y-0">
      <section className="mt-auto flex items-center gap-10 Laptop:gap-5 Desktop:gap-8">
        <section>
          <p className="flex h-10 w-10 items-center justify-center text-Silver Text-l-Bold Laptop:h-12 Laptop:w-12 Laptop:text-xl Laptop:font-Medium Laptop:leading-[28px]">
            0.0
          </p>
          <p className="text-center text-L_Gray Text-xs-Regular Laptop:text-White Laptop:Text-s-Medium">
            내 평가
          </p>
        </section>
        <section className="cursor-pointer">
          <Image
            src={HeartLineLg}
            alt="찜하기"
            className="m-1 h-8 w-8 Laptop:hidden"
          />
          <Image
            src={HeartLineXl}
            alt="찜하기"
            className="hidden Laptop:block"
          />
          <p className="text-center text-L_Gray Text-xs-Regular Laptop:text-White Laptop:Text-s-Medium">
            찜하기
          </p>
        </section>
        <section className="cursor-pointer">
          <Image
            src={EditPencilLineSm}
            alt="톡 작성"
            className="m-1 h-8 w-8 Laptop:hidden"
          />
          <Image
            src={EditPencilLineMd}
            alt="톡 작성"
            className="hidden Laptop:block"
          />
          <p className="text-center text-L_Gray Text-xs-Regular Laptop:text-White Laptop:Text-s-Medium">
            톡 작성
          </p>
        </section>
      </section>
      <Image
        src={DetailPoster}
        alt="포스터"
        className="hidden rounded-[12px] Laptop:ml-6 Laptop:block Laptop:h-[258px] Laptop:w-[172px] Desktop:ml-9 Desktop:h-[360px] Desktop:w-60"
      />
    </section>
  );
}
