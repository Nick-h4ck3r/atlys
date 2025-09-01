import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { Post } from "../types";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

interface PostEditorProps {
  onPostCreated: (post: Post) => void;
  onUnauthenticatedAction?: () => void;
}

const PostEditor: React.FC<PostEditorProps> = ({
  onPostCreated,
  onUnauthenticatedAction,
}) => {
  const [content, setContent] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState("Paragraph");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeButtons, setActiveButtons] = useState<Set<string>>(new Set());
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("😊");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const formatOptions = ["Paragraph", "Heading 1", "Heading 2"];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePublish = async () => {
    if (!isAuthenticated && onUnauthenticatedAction) {
      onUnauthenticatedAction();
      return;
    }

    if (!content.trim()) {
      return;
    }

    setIsPublishing(true);

    // Create new post
    const newPost: Post = {
      id: `post-${Date.now()}`,
      content: content.trim(),
      emoji: selectedEmoji,
      author: user!,
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      shares: 0,
    };

    // Get existing posts from localStorage
    const existingPosts = JSON.parse(localStorage.getItem("posts") || "[]");

    // Add new post to the beginning of the array
    const updatedPosts = [newPost, ...existingPosts];

    // Save back to localStorage
    localStorage.setItem("posts", JSON.stringify(updatedPosts));

    // Notify parent component
    onPostCreated(newPost);

    // Clear input and reset state
    setContent("");
    setIsPublishing(false);
  };

  const handleToolbarClick = (action: string) => {
    // Don't show alert for format selection as it's implemented
    if (!action.startsWith("format:")) {
      // Toggle button state for formatting buttons
      if (
        [
          "bold",
          "italic",
          "underline",
          "unordered list",
          "ordered list",
          "quotes",
          "code",
        ].includes(action)
      ) {
        setActiveButtons((prev) => {
          const newSet = new Set(prev);
          if (newSet.has(action)) {
            newSet.delete(action);
          } else {
            newSet.add(action);
          }
          return newSet;
        });
        return; // Don't show alert for implemented formatting buttons
      }
      alert(`function not implemented: ${action}`);
    }
  };

  return (
    <div className="flex justify-center mb-6">
      <motion.div
        className="relative w-[568px] h-[224px] rounded-[21px] opacity-100"
        style={{
          backgroundColor: "#00000008",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Inner rectangle */}
        <div
          className="absolute bg-white border rounded-[18px] opacity-100"
          style={{
            width: "554px",
            height: "210px",
            top: "7px",
            left: "7px",
            border: "1px solid #00000021",
            boxShadow: "0px 4px 4px 0px #0000000D",
          }}
        >
          {/* Toolbar */}
          <div
            className="flex items-center space-x-2 bg-[#00000008]"
            style={{
              width: "414px",
              height: "40px",
              top: "8px",
              left: "8px",
              borderRadius: "10px",
              opacity: 1,
              position: "relative",
              paddingLeft: "4px",
              paddingRight: "8px",
              paddingTop: "8px",
              paddingBottom: "8px",
            }}
          >
            <div className="relative" ref={dropdownRef}>
              <button
                className="rounded-[7px] bg-white font-inter font-medium flex items-center justify-between"
                style={{
                  width: "94px",
                  height: "32px",
                  opacity: 1,
                  fontSize: "12px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  boxShadow: "0px 1px 7px 0px #00000017",
                  paddingLeft: "8px",
                  paddingRight: "8px",
                }}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="font-inter font-medium text-xs leading-[100%] tracking-[0%]">
                  {selectedFormat}
                </span>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                >
                  <path
                    d="M2.5 3.75L5 6.25L7.5 3.75"
                    stroke="#2F384C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {isDropdownOpen && (
                <motion.div
                  className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-[7px] shadow-lg z-50"
                  style={{
                    width: "94px",
                    boxShadow: "0px 1px 7px 0px #00000017",
                  }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {formatOptions.map((option) => (
                    <button
                      key={option}
                      className={`w-full px-2 py-1 text-left font-inter font-medium text-xs leading-[100%] tracking-[0%] hover:bg-gray-50 first:rounded-t-[7px] last:rounded-b-[7px] ${
                        selectedFormat === option
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-800"
                      }`}
                      onClick={() => {
                        setSelectedFormat(option);
                        setIsDropdownOpen(false);
                        handleToolbarClick(`format: ${option}`);
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            <div className="w-4"></div>

            <button
              onClick={() => handleToolbarClick("bold")}
              className={`rounded-[7px] font-inter font-medium px-2 flex items-center justify-center transition-colors duration-200 ${
                activeButtons.has("bold") ? "bg-white" : "bg-transparent"
              }`}
              style={{
                width: "32px",
                height: "32px",
                opacity: activeButtons.has("bold") ? 1 : 0.75,
                fontSize: "12px",
                lineHeight: "100%",
                letterSpacing: "0%",
                boxShadow: activeButtons.has("bold")
                  ? "0px 1px 7px 0px #00000017"
                  : "none",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.33331 7L9.04165 7C10.4914 7 11.6666 8.17525 11.6666 9.625V9.625C11.6666 11.0747 10.4914 12.25 9.04165 12.25L3.37035 12.25C2.79761 12.25 2.33331 11.7857 2.33331 11.213L2.33331 7ZM2.33331 7L7.29165 7C8.7414 7 9.91665 5.82475 9.91665 4.375V4.375C9.91665 2.92525 8.74139 1.75 7.29165 1.75L3.17591 1.75C2.71055 1.75 2.33331 2.12724 2.33331 2.59259L2.33331 7Z"
                  stroke="black"
                  strokeOpacity={activeButtons.has("bold") ? "0.9" : "0.54"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              onClick={() => handleToolbarClick("italic")}
              className={`rounded-[7px] font-inter font-medium px-2 flex items-center justify-center transition-colors duration-200 ${
                activeButtons.has("italic") ? "bg-white" : "bg-transparent"
              }`}
              style={{
                width: "32px",
                height: "32px",
                opacity: activeButtons.has("italic") ? 1 : 0.75,
                fontSize: "12px",
                lineHeight: "100%",
                letterSpacing: "0%",
                boxShadow: activeButtons.has("italic")
                  ? "0px 1px 7px 0px #00000017"
                  : "none",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.24984 1.75005L11.0832 1.75005M2.9165 12.25L8.74984 12.25M8.16651 1.75005L5.83317 12.25"
                  stroke="black"
                  strokeOpacity={activeButtons.has("italic") ? "0.9" : "0.54"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              onClick={() => handleToolbarClick("underline")}
              className={`rounded-[7px] font-inter font-medium px-2 flex items-center justify-center transition-colors duration-200 ${
                activeButtons.has("underline") ? "bg-white" : "bg-transparent"
              }`}
              style={{
                width: "32px",
                height: "32px",
                opacity: activeButtons.has("underline") ? 1 : 0.75,
                fontSize: "12px",
                lineHeight: "100%",
                letterSpacing: "0%",
                boxShadow: activeButtons.has("underline")
                  ? "0px 1px 7px 0px #00000017"
                  : "none",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.49988 12.25L10.4999 12.25M10.4999 1.75002L10.4999 6.41668C10.4999 8.34968 8.93288 9.91668 6.99988 9.91668C5.06688 9.91668 3.49988 8.34968 3.49988 6.41668L3.49988 1.75002"
                  stroke="black"
                  strokeOpacity={
                    activeButtons.has("underline") ? "0.9" : "0.54"
                  }
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Separator after underline */}
            <svg
              width="1"
              height="32"
              viewBox="0 0 1 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="0.5"
                x2="0.5"
                y2="32"
                stroke="black"
                strokeOpacity="0.1"
              />
            </svg>

            <button
              onClick={() => handleToolbarClick("unordered list")}
              className={`rounded-[7px] font-inter font-medium px-2 flex items-center justify-center transition-colors duration-200 ${
                activeButtons.has("unordered list")
                  ? "bg-white"
                  : "bg-transparent"
              }`}
              style={{
                width: "32px",
                height: "32px",
                opacity: activeButtons.has("unordered list") ? 1 : 0.75,
                fontSize: "12px",
                lineHeight: "100%",
                letterSpacing: "0%",
                boxShadow: activeButtons.has("unordered list")
                  ? "0px 1px 7px 0px #00000017"
                  : "none",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.2501 11.6668L12.8334 11.6668M5.2501 7.00011L12.8334 7.00011M5.2501 2.33344L12.8334 2.33344M2.04177 2.33345C2.04177 2.49453 1.91118 2.62511 1.7501 2.62511C1.58902 2.62511 1.45844 2.49453 1.45844 2.33345M2.04177 2.33345C2.04177 2.17236 1.91118 2.04178 1.7501 2.04178C1.58902 2.04178 1.45844 2.17236 1.45844 2.33345M2.04177 2.33345L1.45844 2.33345M2.04177 7.00011C2.04177 7.16119 1.91118 7.29178 1.7501 7.29178C1.58902 7.29178 1.45844 7.16119 1.45844 7.00011M2.04177 7.00011C2.04177 6.83903 1.91118 6.70844 1.7501 6.70844C1.58902 6.70844 1.45844 6.83903 1.45844 7.00011M2.04177 7.00011L1.45844 7.00011M2.04177 11.6668C2.04177 11.8279 1.91118 11.9584 1.7501 11.9584C1.58902 11.9584 1.45844 11.8279 1.45844 11.6668M2.04177 11.6668C2.04177 11.5057 1.91118 11.3751 1.7501 11.3751C1.58902 11.3751 1.45844 11.5057 1.45844 11.6668M2.04177 11.6668L1.45844 11.6668"
                  stroke="black"
                  strokeOpacity={
                    activeButtons.has("unordered list") ? "0.9" : "0.54"
                  }
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              onClick={() => handleToolbarClick("ordered list")}
              className={`rounded-[7px] font-inter font-medium px-2 flex items-center justify-center transition-colors duration-200 ${
                activeButtons.has("ordered list")
                  ? "bg-white"
                  : "bg-transparent"
              }`}
              style={{
                width: "32px",
                height: "32px",
                opacity: activeButtons.has("ordered list") ? 1 : 0.75,
                fontSize: "12px",
                lineHeight: "100%",
                letterSpacing: "0%",
                boxShadow: activeButtons.has("ordered list")
                  ? "0px 1px 7px 0px #00000017"
                  : "none",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.25008 11.6667L12.8334 11.6667M5.25008 7.00008L12.8334 7.00008M5.25008 2.33341L12.8334 2.33341M2.04175 4.66674L2.04175 1.75008L1.16675 2.33337M2.04175 4.66674L1.16675 4.66674M2.04175 4.66674L2.91675 4.66671M1.16689 8.75008L2.91689 8.75008L2.91675 10.2084L1.16675 10.2084L1.16675 11.6667L2.91689 11.6667"
                  stroke="black"
                  strokeOpacity={
                    activeButtons.has("ordered list") ? "0.9" : "0.54"
                  }
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Separator after ordered list */}
            <svg
              width="1"
              height="32"
              viewBox="0 0 1 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="0.5"
                x2="0.5"
                y2="32"
                stroke="black"
                strokeOpacity="0.1"
              />
            </svg>

            <button
              onClick={() => handleToolbarClick("quotes")}
              className={`rounded-[7px] font-inter font-medium px-2 flex items-center justify-center transition-colors duration-200 ${
                activeButtons.has("quotes") ? "bg-white" : "bg-transparent"
              }`}
              style={{
                width: "32px",
                height: "32px",
                opacity: activeButtons.has("quotes") ? 1 : 0.75,
                fontSize: "12px",
                lineHeight: "100%",
                letterSpacing: "0%",
                boxShadow: activeButtons.has("quotes")
                  ? "0px 1px 7px 0px #00000017"
                  : "none",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.83335 4.66666V7.72916C5.83335 9.10623 5.185 10.4029 4.08335 11.2292V11.2292L3.50002 11.6667M12.8334 4.66666V7.72916C12.8334 9.10623 12.185 10.4029 11.0834 11.2292V11.2292L10.5 11.6667M10.5 7V7C10.8096 7 10.9644 7 11.0944 6.98288C11.9919 6.86473 12.6981 6.15851 12.8162 5.26105C12.8334 5.13108 12.8334 4.97628 12.8334 4.66666V4.66666C12.8334 4.35705 12.8334 4.20224 12.8162 4.07228C12.6981 3.17481 11.9919 2.46859 11.0944 2.35044C10.9644 2.33333 10.8096 2.33333 10.5 2.33333V2.33333C10.1904 2.33333 10.0356 2.33333 9.90563 2.35044C9.00817 2.46859 8.30195 3.17481 8.1838 4.07228C8.16669 4.20224 8.16669 4.35705 8.16669 4.66666V4.66666C8.16669 4.97628 8.16669 5.13108 8.1838 5.26105C8.30195 6.15851 9.00817 6.86473 9.90563 6.98288C10.0356 7 10.1904 7 10.5 7ZM3.50002 7V7C3.80963 7 3.96444 7 4.09441 6.98288C4.99187 6.86473 5.69809 6.15851 5.81624 5.26105C5.83335 5.13108 5.83335 4.97628 5.83335 4.66666V4.66666C5.83335 4.35705 5.83335 4.20224 5.81624 4.07228C5.69809 3.17481 4.99187 2.46859 4.09441 2.35044C3.96444 2.33333 3.80963 2.33333 3.50002 2.33333V2.33333C3.19041 2.33333 3.0356 2.33333 2.90563 2.35044C2.00817 2.46859 1.30195 3.17481 1.1838 4.07228C1.16669 4.20224 1.16669 4.35705 1.16669 4.66666V4.66666C1.16669 4.97628 1.16669 5.13108 1.1838 5.26105C1.30195 6.15851 2.00817 6.86473 2.90563 6.98288C3.0356 7 3.19041 7 3.50002 7Z"
                  stroke="black"
                  strokeOpacity={activeButtons.has("quotes") ? "0.9" : "0.54"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              onClick={() => handleToolbarClick("code")}
              className={`rounded-[7px] font-inter font-medium px-2 flex items-center justify-center transition-colors duration-200 ${
                activeButtons.has("code") ? "bg-white" : "bg-transparent"
              }`}
              style={{
                width: "32px",
                height: "32px",
                opacity: activeButtons.has("code") ? 1 : 0.75,
                fontSize: "12px",
                lineHeight: "100%",
                letterSpacing: "0%",
                boxShadow: activeButtons.has("code")
                  ? "0px 1px 7px 0px #00000017"
                  : "none",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.50002 4.66667L1.16669 7L3.50002 9.33333M10.5 4.66667L12.8334 7L10.5 9.33333M8.16669 1.75L5.83335 12.25"
                  stroke="black"
                  strokeOpacity={activeButtons.has("code") ? "0.9" : "0.54"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Input Area */}
          <div className="mt-4">
            <div className="relative">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="How are you feeling today?"
                className="w-full p-3 pt-0 pl-10 mt-3 border-b bg-white border-gray-300 resize-none focus:outline-none focus:border-gray-300 placeholder-gray-400 h-[100px] font-inter font-medium text-sm leading-[100%] tracking-[0%]"
                style={
                  {
                    "--tw-placeholder-color": "#00000066",
                    "--tw-placeholder-opacity": "1",
                  } as React.CSSProperties
                }
                rows={2}
              />
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="absolute left-2 hover:bg-gray-100 rounded-full p-1 transition-colors duration-200"
              >
                <span className="text-xl">{selectedEmoji}</span>
              </button>
              {showEmojiPicker && (
                <div
                  ref={emojiPickerRef}
                  className="absolute top-12 left-0 z-50 shadow-lg rounded-lg bg-white"
                >
                  <EmojiPicker
                    onEmojiClick={(emojiData: EmojiClickData) => {
                      setSelectedEmoji(emojiData.emoji);
                      setShowEmojiPicker(false);
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between -mt-1.5">
            <div className="flex items-center space-x-1 ml-2">
              <div
                className="rounded-[10px] flex items-center justify-center"
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: "#0000000F",
                }}
              >
                <button
                  onClick={() => handleToolbarClick("add attachment")}
                  className="p-1 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.75 9H9M14.25 9H9M9 9V3.75M9 9V14.25"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              <button
                onClick={() => handleToolbarClick("add image")}
                className="p-1 text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 14.25C11.5714 14.25 15 12 15 8.25M9 14.25C6.42857 14.25 3 12 3 8.25M9 14.25V16.5M9 12C6.92893 12 5.25 10.3211 5.25 8.25V5.25C5.25 3.17893 6.92893 1.5 9 1.5C11.0711 1.5 12.75 3.17893 12.75 5.25V8.25C12.75 10.3211 11.0711 12 9 12Z"
                    stroke="black"
                    strokeOpacity="0.63"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                onClick={() => handleToolbarClick("add video")}
                className="p-1 text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.5 6.375C10.5 6.58211 10.3321 6.75 10.125 6.75C9.9179 6.75 9.75 6.58211 9.75 6.375M10.5 6.375C10.5 6.16789 10.3321 6 10.125 6C9.9179 6 9.75 6.16789 9.75 6.375M10.5 6.375L9.75 6.375M14.25 11.2501V11.2501C14.7614 11.6336 15.0171 11.8254 15.2122 11.9003C16.0352 12.2164 16.952 11.758 17.1929 10.91C17.25 10.709 17.25 10.3893 17.25 9.75006L17.25 8.25004C17.25 7.61077 17.25 7.29113 17.1929 7.09017C16.952 6.24209 16.0351 5.78367 15.2121 6.0998C15.0171 6.17471 14.7614 6.3665 14.25 6.75007V6.75007L14.25 11.2501ZM7.5 15.75V15.75C9.12773 15.75 9.94159 15.75 10.6072 15.5623C12.2815 15.0901 13.5901 13.7815 14.0623 12.1072C14.25 11.4416 14.25 10.6277 14.25 9V9C14.25 7.37228 14.25 6.55842 14.0623 5.8928C13.5901 4.21847 12.2815 2.90993 10.6072 2.43772C9.94159 2.25 9.12773 2.25 7.5 2.25V2.25C5.87228 2.25 5.05842 2.25 4.3928 2.43772C2.71847 2.90993 1.40993 4.21847 0.937724 5.8928C0.75 6.55842 0.75 7.37228 0.75 9V9C0.75 10.6277 0.75 11.4416 0.937724 12.1072C1.40993 13.7815 2.71847 15.0901 4.3928 15.5623C5.05842 15.75 5.87228 15.75 7.5 15.75Z"
                    stroke="black"
                    strokeOpacity="0.63"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <button
              onClick={handlePublish}
              disabled={isPublishing}
              className="p-2 pr-4 rounded-lg transition-all duration-200 flex items-center justify-center hover:opacity-80 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-colors duration-200"
                style={{
                  fill: content.trim() ? "#5057EA" : "#A0A0A0",
                }}
              >
                <g clipPath="url(#clip0_1_292)">
                  <path d="M6.55196 11.25C6.22572 11.25 6.0626 11.25 5.91568 11.2036C5.78564 11.1626 5.66538 11.0954 5.56227 11.0061C5.44577 10.9053 5.36028 10.7664 5.1893 10.4886L4.33542 9.10099C2.1403 5.53393 1.04274 3.7504 1.26983 2.75441C1.46586 1.89469 2.10028 1.20182 2.93944 0.930999C3.91161 0.617244 5.78471 1.55379 9.5309 3.42689L19.5217 8.42228C21.8247 9.5738 22.9762 10.1496 23.3458 10.9287C23.6673 11.6067 23.6673 12.3933 23.3458 13.0713C22.9762 13.8504 21.8247 14.4262 19.5217 15.5777L9.5309 20.5731C5.78471 22.4462 3.91161 23.3827 2.93944 23.069C2.10028 22.7982 1.46586 22.1053 1.26983 21.2456C1.04274 20.2496 2.1403 18.466 4.33542 14.899L5.18929 13.5114C5.36027 13.2336 5.44576 13.0947 5.56226 12.9939C5.66537 12.9046 5.78563 12.8374 5.91566 12.7964C6.06259 12.75 6.22571 12.75 6.55194 12.75L11.25 12.75C11.6642 12.75 12 12.4142 12 12C12 11.5858 11.6642 11.25 11.25 11.25L6.55196 11.25Z" />
                </g>
                <defs>
                  <clipPath id="clip0_1_292">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        </div>

        {/* Delete Button - Positioned within editor but outside toolbar */}
        <button
          onClick={() => handleToolbarClick("delete")}
          className="absolute flex items-center justify-center transition-colors duration-200"
          style={{
            width: "40px",
            height: "40px",
            top: "16px",
            right: "16px",
            borderRadius: "10px",
            opacity: 1,
            backgroundColor: "#FF000026",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.66665 3.33333L3.05928 10.0081C3.1084 10.8432 3.13296 11.2607 3.21785 11.6104C3.591 13.1474 4.83483 14.3202 6.39113 14.6025C6.74514 14.6667 7.16342 14.6667 7.99998 14.6667V14.6667C8.83654 14.6667 9.25482 14.6667 9.60883 14.6025C11.1651 14.3202 12.409 13.1474 12.7821 11.6104C12.867 11.2607 12.8916 10.8432 12.9407 10.008L13.3333 3.33333M2.66665 3.33333H1.33331M2.66665 3.33333H13.3333M13.3333 3.33333H14.6666M10.6666 3.33333L10.547 2.97438C10.3503 2.38427 10.2519 2.08921 10.0695 1.87106C9.90842 1.67843 9.70154 1.52932 9.46785 1.43741C9.20321 1.33333 8.89219 1.33333 8.27016 1.33333H7.7298C7.10777 1.33333 6.79675 1.33333 6.53211 1.43741C6.29842 1.52932 6.09154 1.67843 5.93045 1.87106C5.74802 2.08921 5.64967 2.38427 5.45296 2.97438L5.33331 3.33333M6.66665 6.66666V11.3333M9.33331 6.66666V9.33333"
              stroke="#D83B3B"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </motion.div>
    </div>
  );
};

export default PostEditor;
