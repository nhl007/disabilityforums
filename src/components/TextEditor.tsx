"use client";

import { useEffect, useRef, useState } from "react";
import { rgbToHex } from "@/utils/utils";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  BoldIcon,
  CodeIcon,
  ItalicIcon,
  List,
  ListOrderedIcon,
  RedoIcon,
  UnderlineIcon,
  UndoIcon,
} from "lucide-react";

type Props = {
  html?: string;
  setHtml: React.Dispatch<React.SetStateAction<string>>;
};

interface elementWithSize extends HTMLElement {
  size: string;
}
interface elementWithColor extends HTMLElement {
  color: string;
}

type tagButtons = {
  b: boolean;
  i: boolean;
  u: boolean;
  ol: boolean;
  ul: boolean;
};

function TextEditor({ html, setHtml }: Props) {
  const textArea = useRef<HTMLDivElement>(null!);

  const [tagButtons, setTagButtons] = useState<tagButtons>({
    b: false,
    i: false,
    u: false,
    ol: false,
    ul: false,
  });

  const [fontSize, setFontSize] = useState({
    s: true,
    m: false,
    l: false,
  });

  const [textAlign, setTextAlign] = useState({
    l: true,
    c: false,
    r: false,
  });

  const [color, setColor] = useState("#141361");

  const applyFormatting = (command: string, value?: string) => {
    document.execCommand(command, false, value);
  };

  const setStyles = (command: string, value?: string) => {
    applyFormatting(command, value);
    textArea.current.focus();
  };

  const setTheContent = () => {
    const html = textArea.current.innerHTML!;
    setHtml(html);
    checkFormatting();
  };

  useEffect(() => {
    textArea.current.innerHTML = html ?? "<p>Write here </p>";
  }, [textArea.current]);

  const closest = (
    element: Node | null,
    selector: string
  ): { hasParent: boolean; element: HTMLElement | null } => {
    if (!element) return { hasParent: false, element: null };

    if (element instanceof Element && element.matches(selector)) {
      return { hasParent: true, element: element as HTMLElement };
    }

    return closest(element.parentNode, selector);
  };

  const checkFormatting = () => {
    const range = window.getSelection()?.getRangeAt(0);

    if (range) {
      const startContainer = range.startContainer;
      // console.log(range.startContainer.parentNode);

      ["b", "i", "u", "ol", "ul", "font", "div", "pre", "img", "span"].forEach(
        (tag) => {
          setTagButtons((prev) => ({ ...prev, [tag]: hasParent }));

          const { hasParent, element } = closest(startContainer, tag);
          // console.log(hasParent, tag);

          if (tag === "font" && element) {
            const color = (element as elementWithColor).color;
            if (color) {
              setColor(() => color);
            } else {
              setColor(() => "##141361");
            }
            const size = (element as elementWithSize).size;
            size === "5"
              ? setFontSize(() => ({
                  m: true,
                  s: false,
                  l: false,
                }))
              : size === "7"
              ? setFontSize(() => ({
                  l: true,
                  m: false,
                  s: false,
                }))
              : setFontSize(() => ({
                  s: true,
                  m: false,
                  l: false,
                }));
          }

          if (!hasParent && tag === "font") {
            setColor(() => "#141361");

            setFontSize((prev) => ({
              ...prev,
              s: true,
              m: false,
              l: false,
            }));
          }

          if (tag === "div" && element) {
            const align = element.style.textAlign;

            align === "right"
              ? setTextAlign(() => ({
                  l: false,
                  c: false,
                  r: true,
                }))
              : align === "center"
              ? setTextAlign(() => ({
                  l: false,
                  c: true,
                  r: false,
                }))
              : setTextAlign(() => ({
                  l: true,
                  c: false,
                  r: false,
                }));
          }

          if (!hasParent && tag === "div") {
            setTextAlign(() => ({
              l: true,
              c: false,
              r: false,
            }));
          }
        }
      );
    } else {
      console.log("No range selected.");
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex gap-2 justify-center items-center flex-wrap">
        <button
          title="Bold"
          className={`${tagButtons.b && " text-teal-300 hover:border-black"}`}
          onClick={() => {
            setTagButtons((prev) => ({ ...prev, b: !prev.b }));
            setStyles("bold");
          }}
        >
          <BoldIcon size={20} />
        </button>
        <button
          title="Underline"
          className={`${tagButtons.u && " text-teal-300 hover:border-black"}`}
          onClick={() => {
            setTagButtons((prev) => ({ ...prev, u: !prev.u }));
            setStyles("underline");
          }}
        >
          <UnderlineIcon size={20} />
        </button>
        <button
          title="Italic"
          className={`${tagButtons.i && " text-teal-300 hover:border-black"}`}
          onClick={() => {
            setTagButtons((prev) => ({ ...prev, i: !prev.i }));
            setStyles("italic");
          }}
        >
          <ItalicIcon size={20} />
        </button>
        <button
          title="Font-Small"
          className={`${fontSize.s && " text-teal-300 hover:border-black"}`}
          onClick={() => {
            setFontSize(() => ({ l: false, m: false, s: true }));
            setStyles("fontSize", "3");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-a-arrow-down"
          >
            <path d="M3.5 13h6" />
            <path d="m2 16 4.5-9 4.5 9" />
            <path d="M18 7v9" />
            <path d="m14 12 4 4 4-4" />
          </svg>
        </button>
        <button
          title="Font-Medium"
          className={`${fontSize.m && " text-teal-300 hover:border-black"}`}
          onClick={() => {
            setFontSize(() => ({ l: false, m: true, s: false }));
            setStyles("fontSize", "5");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-a-arrow-up"
          >
            <path d="M3.5 13h6" />
            <path d="m2 16 4.5-9 4.5 9" />
            <path d="M18 16V7" />
            <path d="m14 11 4-4 4 4" />
          </svg>
        </button>

        <button
          title="Align-Left"
          className={`${textAlign.l && " text-teal-300 hover:border-black"}`}
          onClick={() => {
            setTextAlign(() => ({ r: false, c: false, l: true }));
            setStyles("justifyLeft");
          }}
        >
          <AlignLeft />
        </button>
        <button
          title="Align-Center"
          className={`${textAlign.c && " text-teal-300 hover:border-black"}`}
          onClick={() => {
            setTextAlign(() => ({ r: false, c: true, l: false }));
            setStyles("justifyCenter");
          }}
        >
          <AlignCenter />
        </button>
        <button
          title="Align-Right"
          className={`${textAlign.r && " text-teal-300 hover:border-black"}`}
          onClick={() => {
            setTextAlign(() => ({ r: true, c: false, l: false }));
            setStyles("justifyRight");
          }}
        >
          <AlignRight />
        </button>
        <button onClick={() => setStyles("undo")}>
          <UndoIcon />
        </button>
        <button onClick={() => setStyles("redo")}>
          <RedoIcon />
        </button>

        <button
          title="Ordered-List"
          className={`${tagButtons.ol && " text-teal-300 hover:border-black"}`}
          onClick={() => {
            setTagButtons((prev) => ({ ...prev, ol: !prev.ol, ul: false }));
            setStyles("insertOrderedList");
          }}
        >
          <ListOrderedIcon />
        </button>
        <button
          title="Unordered-List"
          className={`${tagButtons.ul && " text-teal-300 hover:border-black"}`}
          onClick={() => {
            setTagButtons((prev) => ({ ...prev, ol: false, ul: !prev.ul }));
            setStyles("insertUnorderedList");
          }}
        >
          <List />
        </button>

        <input
          title="Text Color"
          value={color}
          className=" cursor-pointer"
          onChange={(e) => {
            setColor(e.target.value);
            setStyles("foreColor", `${e.target.value}`);
          }}
          type="color"
          name="color"
        />
      </div>
      <div
        className=" text_editor min-w-full min-h-[300px] border-[1.5px] p-[10px] rounded-md sm:rounded-[10px]"
        contentEditable="true"
        ref={textArea}
        // onClick={checkFormatting}
        onInput={setTheContent}
      />
    </div>
  );
}

export default TextEditor;
