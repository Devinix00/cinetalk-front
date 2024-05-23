import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import React, { ReactElement, useEffect, useRef } from "react";

import {
  ModalButton,
  ModalCancelButton,
  ModalCheckbox,
} from "@/components/modal/_components/ModalButtons";
import { ModalLogin } from "@/components/modal/_components/ModalLogin";
import { ModalReport } from "@/components/modal/_components/ModalReport";
import { ModalDescription } from "@/components/modal/_components/ModalTitle";
import ModalContext from "@/components/modal/ModalContext";
import Portal from "@/components/modal/portal";
import useModal from "@/components/modal/useModal";
import useOutsideClick from "@/hooks/useOutsideClick";

export interface WithChildren {
  children: React.ReactNode;
}
interface ModalMainProps extends WithChildren {
  isMobile?: boolean;
  isAlertModal: boolean;
  onClose: () => void;
  isOpen: boolean;
}

export function ModalImg() {
  return <div className="h-[150px] w-[280px] bg-[#a4a4a4]" />;
}

export function ModalMain({
  children,
  onClose,
  isAlertModal,
  isMobile = false,
  isOpen,
}: ModalMainProps) {
  const {
    isChecked,
    toggleChceked,
    detailedReason,
    selectedIndex,
    onDetailedReasonChange,
    onSelectedIndexChange,
    isDropdownOpen,
    setIsDropdownOpen,
  } = useModal(isOpen);
  const hasComponents = useRef({
    login: false,
    report: false,
    description: false,
  });
  const { buttons, checkbox, content } = React.Children.toArray(
    children,
  ).reduce<{
    buttons: ReactElement[];
    checkbox: ReactElement[];
    content: ReactElement[];
  }>(
    (acc, cur) => {
      if (React.isValidElement(cur)) {
        if (cur.type === ModalButton || cur.type === ModalCancelButton) {
          acc.buttons.push(cur);
        } else if (cur.type === ModalCheckbox) {
          acc.checkbox.push(cur);
        } else if (cur.type === ModalReport) {
          hasComponents.current.report = true;
          acc.content.push(cur);
        } else if (cur.type === ModalLogin) {
          hasComponents.current.login = true;
          acc.content.push(cur);
        } else if (cur.type === ModalDescription) {
          hasComponents.current.description = true;
          acc.content.push(cur);
        } else {
          acc.content.push(cur);
        }
      }
      return acc;
    },
    { buttons: [], checkbox: [], content: [] },
  );
  const ref = useOutsideClick(() => {
    if (isOpen) onClose();
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        default:
          break;
      }
    };
    if (!isDropdownOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [onClose, isDropdownOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalContext.Provider
          value={{
            isAlertModal,
            onClose,
            isChecked,
            toggleChceked,
            hasCheckbox: !!checkbox.length,
            hasReport: hasComponents.current.report,
            hasDescription: hasComponents.current.description,
            detailedReason,
            selectedIndex,
            onDetailedReasonChange,
            onSelectedIndexChange,
            isDropdownOpen,
            setIsDropdownOpen,
            isMobile,
          }}
        >
          <Portal selector="portal">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              exit={{ opacity: 0 }}
            >
              <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black/40 backdrop-blur-[4px]">
                <div
                  ref={ref}
                  className={clsx(
                    hasComponents.current.login && "px-10 py-16",
                    isAlertModal
                      ? [
                          isMobile
                            ? "gap-4 px-6 pb-5 pt-6"
                            : "gap-9 px-12 pb-10 pt-11",
                        ]
                      : [!hasComponents.current.login && "gap-7 px-12 py-10"],
                    `z-10 flex flex-col items-center rounded-xl bg-D1_Gray`,
                  )}
                >
                  {content}
                  {checkbox.length > 0 && buttons.length > 0 && (
                    <div className="flex w-[372px] flex-col items-center justify-center gap-5">
                      <div className="flex items-center gap-2">{checkbox}</div>
                      <div className="flex w-full gap-3">{buttons}</div>
                    </div>
                  )}

                  {!checkbox.length && buttons.length > 0 && (
                    <div
                      className={clsx(
                        isMobile ? "w-[224px] gap-2" : "w-[372px] gap-3",
                        `flex`,
                      )}
                    >
                      {buttons}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </Portal>
        </ModalContext.Provider>
      )}
    </AnimatePresence>
  );
}
