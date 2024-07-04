import { josa } from "es-hangul";
import { ChangeEvent, FormEvent, useState } from "react";

import Button from "@/components/buttons/Button";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
import Modal from "@/components/modal/modal";
import { ABUSE } from "@/constants/abuseList";
import { login } from "@/constants/login";
import useDevice from "@/hooks/useDevice";
import useHandleClickAuthButton from "@/hooks/useHandleClickAuthButtons";
import { tokenManager } from "@/services/auth/tokenManager";
import { useAddKeyword } from "@/services/keyword/keywordMutations";
import filterAbuse from "@/utils/filterAbuse";

import SpeechBubble from "../../../../../components/speechBubble/SpeechBubble";

interface KeywordFormProps {
  movieId: number;
  title: string;
}

export default function KeywordForm({ movieId, title }: KeywordFormProps) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const { device } = useDevice();
  const { mutate: addKeyword, isPending } = useAddKeyword();
  const [isOpen, setIsOpen] = useState(false);
  const { handleClickAuthButton } = useHandleClickAuthButton();

  const sliceTitleMap: { [key: string]: number } = {
    mobile: 10,
    tablet: Infinity,
    laptop: 5,
    desktop: 11,
  };

  const sliceNumber = sliceTitleMap[device];

  const formattedTitle =
    title.length > sliceNumber
      ? title.split("").splice(0, sliceNumber).join("") + "..."
      : title;

  const quotedTitle = `'${title}'`;
  const quotedFormattedTitle = `'${formattedTitle}'`;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 5) {
      e.target.value = e.target.value.slice(0, 5);
    } else {
      setValue(e.target.value);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const accessToken = tokenManager.getToken();

    if (!accessToken) {
      if (confirm(login.NEED_LOGIN_TEXT)) {
        return setIsOpen(true);
      } else {
        return alert("취소합니다.");
      }
    }

    if (filterAbuse(value)) return;
    addKeyword({ movieId, value });
  };

  const josaTitle = josa(quotedFormattedTitle, "은/는");

  return (
    <form onSubmit={handleSubmit} className="relative w-full Laptop:static">
      <div className="absolute left-1/2 top-[-13px] w-[305px] translate-x-[-50%] translate-y-[-100%] Laptop:hidden">
        <SpeechBubble dir="bottom">
          떠오르는 단어를 작성하거나, 키워드를 눌러보세요!
        </SpeechBubble>
      </div>
      <div className="relative w-full overflow-hidden rounded-xl ">
        <input
          type="text"
          placeholder={`${device === "tablet" ? quotedTitle : josaTitle} 한 단어로?`}
          maxLength={5}
          value={value}
          onFocus={() => setFocused(true)}
          onChange={(e) => handleChange(e)}
          className="h-[45px] w-full bg-[rgba(0,0,0,0.20)] py-2 pl-4 pr-3 text-Gray_Orange outline-none Text-s-Medium placeholder:text-Gray Tablet:Text-m-Medium"
        />

        <section className="absolute right-3 top-1/2 flex translate-y-[-50%] items-center gap-2">
          {focused && (
            <p className="text-Gray Text-s-Regular">{value?.length}/5</p>
          )}
          <Button
            size="sm"
            variant="orange"
            type="submit"
            disabled={!value || isPending}
            className="flex h-[29px] w-[60.3px] items-center justify-center"
          >
            {isPending ? <LoadingSpinner color="white" size="xs" /> : "올리기"}
          </Button>
        </section>
      </div>

      {isOpen && (
        <Modal
          isAlertModal={false}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <Modal.Login
            onKakaoLogin={() => handleClickAuthButton("kakao")}
            onNaverLogin={() => handleClickAuthButton("naver")}
          />
        </Modal>
      )}
    </form>
  );
}
