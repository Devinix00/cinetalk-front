import dayjs from "dayjs";
import Image from "next/image";
import React, { useState } from "react";

import useRating from "@/app/detail/_hooks/useRating";
import useClickedEditMyTalk from "@/app/detail/_stores/useClickedEditMyTalk";
import Button from "@/components/buttons/Button";
import RatingStar from "@/components/rating/RatingStar";
import SmallBadge from "@/components/smallBadge/SmallBadge";
import WithLineBreak from "@/components/withLineBreak/WithLineBreak";
import { useEditTalk, useRemoveTalk } from "@/services/talk/talkMutations";
import { cn } from "@/utils/cn";

import {
  SquareCheckFillMd,
  SquareCheckFillSm,
  SquareCheckMd,
  SquareCheckSm,
  ThumbsDownLineMd,
  ThumbsDownLineSm,
  ThumbsUpLineMd,
  ThumbsUpLineSm,
} from "../../../../../../../public/icons";
import DeleteTalkModal from "../DeleteTalkModal";
import FixedRating from "../rating/FixedRating";

interface MyTalkProps {
  myTalk: MyTalk | undefined;
  movieId: number;
  movieDetailData: MovieDetailData;
}

function MyTalk({ myTalk, movieId, movieDetailData }: MyTalkProps) {
  const { clickedEditMyTalk, setClickedEditMyTalk } = useClickedEditMyTalk();

  const [content, setContent] = useState<string | undefined>(myTalk?.content);
  const {
    ratingValue,
    setRatingValue,
    clickedValue,
    setClickedValue,
    handleDriveTalk,
  } = useRating({ initialValue: myTalk?.star });
  const [isSpoiler, setIsSpoiler] = useState<boolean | undefined>(
    myTalk?.spoiler,
  );
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { mutate: removeTalk, isPending } = useRemoveTalk({
    setOpenDeleteModal: setOpenDeleteModal,
    setClickedEdit: setClickedEditMyTalk,
    movieId: movieId,
    type: "talk",
  });
  const { mutate: editTalk } = useEditTalk({
    movieId: movieId,
    setClickedEdit: setClickedEditMyTalk,
  });

  const genreList = movieDetailData.genreDTOList.map((el) => el.id);

  const submitEditTalk = () => {
    editTalk({
      talkId: myTalk?.reviewId,
      content: content,
      movieName: movieDetailData.title,
      genreList: genreList,
      spoiler: isSpoiler,
      star: ratingValue,
    });
  };

  const submitRemoveTalk = () => {
    removeTalk({ talkId: myTalk?.reviewId });
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="mx-auto mb-5 flex flex-col items-center gap-3 Laptop:hidden">
          <p className="text-Primary Text-m-Bold">{myTalk?.star}점</p>
          <div className="flex">
            {clickedEditMyTalk ? (
              [...Array(5)].map((_, i) => (
                <RatingStar
                  key={i}
                  index={i}
                  ratingValue={ratingValue}
                  setRatingValue={setRatingValue}
                  clickedValue={clickedValue}
                  setClickedValue={setClickedValue}
                  ratingSize=""
                />
              ))
            ) : (
              <FixedRating star={myTalk?.star || 0} />
            )}
          </div>
        </div>

        <div className="relative flex w-full flex-col justify-center rounded-xl bg-Black px-5 py-4 Laptop:mb-6 Laptop:gap-3 Laptop:bg-D1_Gray Laptop:px-7 Laptop:py-8">
          <div className="mx-auto hidden flex-col items-center gap-3 Laptop:flex">
            <p className="text-Primary Text-l-Bold">
              {clickedEditMyTalk ? ratingValue : myTalk?.star}점
            </p>
            <div className="flex">
              {clickedEditMyTalk ? (
                [...Array(5)].map((_, i) => (
                  <RatingStar
                    key={i}
                    index={i}
                    ratingValue={ratingValue}
                    setRatingValue={setRatingValue}
                    clickedValue={clickedValue}
                    setClickedValue={setClickedValue}
                    ratingSize=""
                  />
                ))
              ) : (
                <FixedRating star={myTalk?.star || 0} />
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 Laptop:mt-5 Laptop:gap-3 Laptop:rounded-xl Laptop:bg-[rgba(0,0,0,0.2)] Laptop:px-6 Laptop:py-5 Laptop:pb-3">
            <div className="flex justify-between">
              <div className="flex items-center gap-1">
                <p className="mr-1 text-Silver Text-s-Bold">
                  {myTalk?.nickName}
                </p>

                {Array.isArray(myTalk?.badgeList) &&
                  myTalk.badgeList.length > 0 && (
                    <section className="flex h-full gap-1">
                      {myTalk?.badgeList?.map((el, i) => (
                        <SmallBadge
                          key={i}
                          content={el}
                          withoutContent
                          size="sm"
                        />
                      ))}
                    </section>
                  )}
              </div>

              <p className="hidden text-Gray Text-s-Medium Tablet:block">
                {dayjs(myTalk?.createTime).format("YY.MM.DD")} 작성
              </p>
            </div>

            {clickedEditMyTalk ? (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="h-[105px] w-full resize-none bg-transparent leading-[21px] outline-none Text-s-Regular input-scrollbar placeholder:text-D3_Gray placeholder:Text-s-Regular Tablet:h-[120px] Tablet:leading-[24px] Tablet:Text-m-Medium Tablet:placeholder:Text-m-Medium"
              />
            ) : (
              <div className="max-h-[105px] overflow-auto text-Gray_Orange Text-s-Regular input-scrollbar Tablet:max-h-[120px] Tablet:Text-m-Medium">
                <p>{WithLineBreak(myTalk?.content)}</p>
              </div>
            )}

            {!clickedEditMyTalk && (
              <section className="hidden items-center justify-end Tablet:mt-2 Tablet:flex">
                <Button
                  variant="textIconL"
                  className="cursor-default hover:bg-transparent active:bg-transparent"
                >
                  <Image
                    src={ThumbsUpLineSm}
                    alt="좋아요"
                    className="Laptop:hidden"
                  />
                  <Image
                    src={ThumbsUpLineMd}
                    alt="좋아요"
                    className="hidden Laptop:block"
                  />
                  <p className="select-none text-Gray_Orange Text-xs-Regular Tablet:Text-s-Medium">
                    {myTalk?.likeCount}
                  </p>
                </Button>
                <Button
                  variant="textIconL"
                  className="cursor-default hover:bg-transparent active:bg-transparent"
                >
                  <Image
                    src={ThumbsDownLineSm}
                    alt="싫어요"
                    className="Laptop:hidden"
                  />
                  <Image
                    src={ThumbsDownLineMd}
                    alt="싫어요"
                    className="hidden Laptop:block"
                  />
                  <p className="select-none text-Gray_Orange Text-xs-Regular Tablet:Text-s-Medium">
                    {myTalk?.dislikeCount}
                  </p>
                </Button>

                <Button
                  variant="textIconR"
                  className="cursor-default hover:bg-transparent active:bg-transparent"
                >
                  <p
                    className={cn(
                      "select-none text-Gray_Orange Text-xs-Regular Tablet:Text-s-Medium",
                    )}
                  >
                    답글
                  </p>
                  <p
                    className={cn(
                      "text-Gray_Orange Text-xs-Regular Tablet:Text-s-Medium",
                    )}
                  >
                    {myTalk?.commentCount}
                  </p>
                </Button>
              </section>
            )}
          </div>

          {clickedEditMyTalk ? (
            <div className="ml-auto hidden items-center gap-3 Laptop:flex">
              <div
                onClick={() => setIsSpoiler(!isSpoiler)}
                className="flex cursor-pointer items-center gap-1"
              >
                <Image
                  src={isSpoiler ? SquareCheckFillMd : SquareCheckMd}
                  alt="check"
                />

                <p className="select-none Text-m-Regular">스포일러</p>
              </div>

              <Button
                onClick={() => setOpenDeleteModal(true)}
                size={"md"}
                className="text-Error"
              >
                삭제
              </Button>
              <Button onClick={submitEditTalk} variant={"orange"} size={"md"}>
                등록
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => setClickedEditMyTalk(!clickedEditMyTalk)}
              size={"md"}
              className="ml-auto hidden pb-0 pr-0 Laptop:block"
            >
              수정
            </Button>
          )}
        </div>

        {clickedEditMyTalk ? (
          <div className="ml-auto flex items-center gap-3 Laptop:hidden">
            <div
              onClick={() => setIsSpoiler(!isSpoiler)}
              className="flex cursor-pointer items-center gap-1"
            >
              <Image
                src={isSpoiler ? SquareCheckFillSm : SquareCheckSm}
                alt="check"
              />

              <p className="select-none Text-s-Regular">스포일러</p>
            </div>

            <Button
              onClick={() => setOpenDeleteModal(true)}
              size={"sm"}
              className="text-Error"
            >
              삭제
            </Button>
            <Button onClick={submitEditTalk} variant={"orange"} size={"sm"}>
              등록
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => setClickedEditMyTalk(!clickedEditMyTalk)}
            size={"sm"}
            className="ml-auto Laptop:hidden"
          >
            수정
          </Button>
        )}
      </div>
      {openDeleteModal && (
        <DeleteTalkModal
          onClick={submitRemoveTalk}
          setOpenDeleteModal={setOpenDeleteModal}
          isPending={isPending}
        />
      )}
    </>
  );
}

export default MyTalk;
