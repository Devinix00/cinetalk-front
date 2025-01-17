"use client";

import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";

import arrangeCenterHighKeyword from "@/app/detail/utils/arrangeCenterHighKeyword";
import Modal from "@/components/modal/modal";
import useHandleClickAuthButton from "@/hooks/useHandleClickAuthButtons";
import useNeedLogin from "@/hooks/useNeedLogin";
import { useLikeKeyword } from "@/services/keyword/keywordMutations";
import { useGetMyKeyword } from "@/services/keyword/keywordQueries";

import { Report } from "../../../../../../public/icons";
import SpeechBubble from "../../../../../components/speechBubble/SpeechBubble";
import ReportCompleteModal from "../talk/ReportCompleteModal";
import ReportModal from "../talk/reportModal/ReportModal";
import KeywordForm from "./keywordForm";
import MyKeyword from "./myKeyword/MyKeyword";
import NewKeyword from "./NewKeyword";
import Nokeyword from "./Nokeyword";

interface KeywordProps {
  keywordsData: Keyword[];
  noKeyword: boolean;
  movieId: number;
  title: string;
  latestKeywords: Keyword[];
}

export default function Keyword({
  keywordsData,
  noKeyword,
  movieId,
  title,
  latestKeywords,
}: KeywordProps) {
  const top10s = keywordsData.slice(0, 10);
  const [shuffledTop26s, setShuffledTop26s] = useState(keywordsData);
  const { data: myKeyword } = useGetMyKeyword(movieId);
  const [isClickedEdit, setIsClickedEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [openReportComplete, setOpenReportComplete] = useState(false);
  const { handleNeedLogin, isOpen, setIsOpen } = useNeedLogin();
  const { handleClickAuthButton } = useHandleClickAuthButton();
  const initialValue = myKeyword?.data.keyword;
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue, isClickedEdit]);

  const top1 = top10s[0];
  const top2 = top10s[1];
  const top3 = top10s[2];
  const top4 = top10s[3];
  const top5 = top10s[4];
  const top6 = top10s[5];
  const top7 = top10s[6];
  const top8 = top10s[7];
  const top9 = top10s[8];
  const top10 = top10s[9];

  const getRandomTextSize = () =>
    Math.random() < 0.5 ? "text-[14px]" : "text-[16px]";

  useEffect(() => {
    setShuffledTop26s(arrangeCenterHighKeyword([...keywordsData]));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keywordsData]);

  const { mutate: likeKeyword, data } = useLikeKeyword({ movieId: movieId });

  return (
    <div className="flex flex-col">
      <section className="flex flex-col items-center Laptop:relative Laptop:rounded-xl Laptop:bg-D1_Gray Laptop:p-10 Desktop:p-[60px]">
        {noKeyword ? (
          <Nokeyword />
        ) : (
          <div className="mb-7 flex flex-wrap justify-center py-6 Tablet:mb-8 Tablet:max-w-[554px] Laptop:max-w-fit Laptop:py-0 Desktop:mb-5">
            {shuffledTop26s?.map((keyword, i) => (
              <p
                onClick={() => {
                  if (handleNeedLogin()) return;
                  if (
                    myKeyword?.data.message === "해당 키워드를 찾을 수 없습니다"
                  ) {
                    setValue(keyword.keyword);
                  } else {
                    likeKeyword(Number(keyword.keywordId));
                  }
                  if (
                    data?.data.message === "해당 키워드를 이미 클릭하셨습니다."
                  )
                    return alert("이미 좋아요를 한 키워드입니다.");
                }}
                className={clsx(
                  `mr-2 flex h-12 cursor-pointer items-center leading-[140%] last:mr-0 ${keyword !== top1 && keyword !== top2 && keyword !== top3 && keyword !== top4 && keyword !== top5 && keyword !== top6 && keyword !== top7 && keyword !== top8 && keyword !== top8 && keyword !== top9 && keyword !== top10 && getRandomTextSize()} text-Gray_Orange`,
                  keyword === top1 &&
                    "h-12 leading-[140%] text-Primary Text-xxxl-Bold",
                  keyword === top2 &&
                    "h-12 text-[32px] font-extrabold leading-[140%] text-Tint_2",
                  keyword === top3 &&
                    "h-12 text-[30px] font-extrabold leading-[140%] text-Tint_2",
                  keyword === top4 &&
                    "h-12 text-[28px] font-extrabold leading-[140%] text-Tint_3",
                  keyword === top5 &&
                    "h-12 text-[26px] font-extrabold leading-[140%] text-Tint_3",
                  keyword === top6 &&
                    "h-12 text-[24px] font-extrabold leading-[140%] text-Tint_3",
                  keyword === top7 &&
                    "h-12 text-[22px] font-extrabold leading-[140%] text-Tint_4",
                  keyword === top8 &&
                    "h-12 text-[20px] font-extrabold leading-[140%] text-Tint_4",
                  keyword === top9 &&
                    "h-12 text-[20px] font-extrabold leading-[140%] text-Tint_4",
                  keyword === top10 &&
                    "h-12 text-[20px] font-extrabold leading-[140%] text-Tint_4",
                )}
                key={i}
              >
                {keyword?.keyword}
              </p>
            ))}
          </div>
        )}
        <div className="hidden w-[305px] Laptop:absolute Laptop:left-1/2 Laptop:top-0 Laptop:block Laptop:translate-x-[-50%] Laptop:translate-y-[-50%]">
          <SpeechBubble id="Keyword" dir="bottom">
            떠오르는 단어를 작성하거나, 키워드를 눌러보세요!
          </SpeechBubble>
        </div>

        {!myKeyword?.res.ok && !isClickedEdit ? (
          <KeywordForm
            value={value}
            setValue={setValue}
            movieId={movieId}
            title={title}
            initialValue={initialValue}
          />
        ) : (
          !isClickedEdit && (
            <MyKeyword
              myKeyword={myKeyword?.data}
              isClickedEdit={isClickedEdit}
              setIsClickedEdit={setIsClickedEdit}
            />
          )
        )}

        {isClickedEdit && (
          <KeywordForm
            movieId={movieId}
            title={title}
            value={value}
            setValue={setValue}
            myKeywordId={myKeyword?.data.keywordId}
            isClickedEdit={isClickedEdit}
            setIsClickedEdit={setIsClickedEdit}
            initialValue={initialValue}
          />
        )}
        {!noKeyword && <NewKeyword latestKeywords={latestKeywords} />}
      </section>

      <div
        onClick={() => setOpen(true)}
        className="mx-auto mt-4 cursor-pointer Laptop:mx-0 Laptop:ml-auto Laptop:mt-1"
      >
        <div className="flex items-center">
          <Image
            unoptimized
            width={100}
            height={100}
            src={Report}
            alt="신고하기"
            className="h-4 w-4"
          />
          <p className="text-[14px] text-Gray underline">신고하기</p>
        </div>
      </div>

      {open && (
        <ReportModal
          movieId={movieId}
          type="keyword"
          setOpen={setOpen}
          setOpenReportComplete={setOpenReportComplete}
        />
      )}
      {openReportComplete && (
        <ReportCompleteModal setOpenReportComplete={setOpenReportComplete} />
      )}
      {isOpen && (
        <Modal isAlertModal={false} onClose={() => setIsOpen(false)}>
          <Modal.Login
            onKakaoLogin={() => handleClickAuthButton("kakao")}
            onNaverLogin={() => handleClickAuthButton("naver")}
          />
        </Modal>
      )}
    </div>
  );
}
