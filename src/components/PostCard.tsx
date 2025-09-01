import React, { useState } from "react";
import { motion } from "framer-motion";
import { Post } from "../types";

interface PostCardProps {
  post: Post;
  onUnauthenticatedAction?: () => void;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  onUnauthenticatedAction,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleInteraction = (action: string) => {
    if (onUnauthenticatedAction) {
      onUnauthenticatedAction();
    } else {
      alert(`function not implemented: ${action}`);
    }
  };

  const handleLike = () => {
    if (onUnauthenticatedAction) {
      onUnauthenticatedAction();
      return;
    }
    
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const buttonVariants = {
    hover: { scale: 1.1, y: -2 },
    tap: { scale: 0.95 }
  };

  const likeButtonVariants = {
    initial: { scale: 1 },
    liked: { 
      scale: [1, 1.3, 1],
      color: "#ef4444"
    }
  };

  return (
    <div className="flex justify-center mb-4">
      <motion.div
        className="w-[568px] rounded-[21px] opacity-100 bg-[#00000008] hover:bg-[#00000012] transition-colors duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="m-[7px] bg-white border border-gray-200 rounded-[18px] p-4 w-[554px] shadow-sm hover:shadow-md transition-shadow duration-300">
          {/* Post Header */}
          <motion.div 
            className="flex flex-col space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center space-x-3">
              <motion.div 
                className="flex-shrink-0 w-[40px] h-[40px] rounded-[7px] overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <div>
                <h3 className="font-semibold text-[#000000] text-[13px]">
                  {post.author.name}
                </h3>
                <p className="text-xs text-[#0000005E] font-medium">
                  {post.timestamp}
                </p>
              </div>
            </div>

            {/* Post Content */}
            <div className="flex items-start space-x-3">
              <motion.div 
                className="flex-shrink-0 w-[40px] h-[40px] rounded-full overflow-hidden border border-gray-200 flex items-center justify-center bg-[#F2F2F2]"
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-2xl">{post.emoji}</span>
              </motion.div>
              <motion.p 
                className="text-gray-800 font-inter font-medium text-sm leading-[21px] tracking-[0%] text-[#000000D4]"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {post.content}
              </motion.p>
            </div>
          </motion.div>
        </div>

        {/* Action buttons */}
        <motion.div 
          className="flex items-center space-x-5 mb-2 ml-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            onClick={handleLike}
            className="p-1 text-gray-500 hover:text-red-500 transition-colors duration-200 flex items-center space-x-1"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            animate={isLiked ? "liked" : "initial"}
            transition={{ duration: 0.2 }}
          >
            <motion.svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill={isLiked ? "#ef4444" : "none"}
              xmlns="http://www.w3.org/2000/svg"
              animate={{ scale: isLiked ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 0.3 }}
            >
              <path
                d="M9 15.75C9.75 15.75 16.5 12.0002 16.5 6.75032C16.5 4.12542 14.25 2.28304 12 2.25049C10.875 2.23421 9.75 2.62549 9 3.75044C8.25 2.62549 7.10554 2.25049 6 2.25049C3.75 2.25049 1.5 4.12542 1.5 6.75032C1.5 12.0002 8.25 15.75 9 15.75Z"
                stroke={isLiked ? "#ef4444" : "#2F384C"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
            <motion.span 
              className="text-xs font-medium"
              animate={{ color: isLiked ? "#ef4444" : "#6b7280" }}
            >
              {likeCount}
            </motion.span>
          </motion.button>

          <motion.button
            onClick={() => handleInteraction("comment")}
            className="p-1 text-gray-500 hover:text-blue-500 transition-colors duration-200 flex items-center space-x-1"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.25 6H11.25M5.25 9H8.25M14.0374 15.7724V15.7724C14.2027 15.8716 14.2853 15.9212 14.3452 15.9503C15.2899 16.4086 16.4011 15.7795 16.4941 14.7336C16.5 14.6673 16.5 14.5709 16.5 14.3781V9C16.5 6.67029 16.5 5.50544 16.1194 4.58658C15.6119 3.36144 14.6386 2.38807 13.4134 1.8806C12.4946 1.5 11.3297 1.5 9 1.5H8.25C6.62228 1.5 5.80842 1.5 5.1428 1.68772C3.46847 2.15993 2.15993 3.46847 1.68772 5.1428C1.5 5.80842 1.5 6.62228 1.5 8.25V8.25C1.5 9.87772 1.5 10.6916 1.68772 11.3572C2.15993 13.0315 3.46847 14.3401 5.1428 14.8123C5.80842 15 6.62228 15 8.25 15H11.2487C11.3641 15 11.4218 15 11.4786 15.0013C12.3076 15.0201 13.119 15.2448 13.8396 15.6552C13.8889 15.6833 13.9384 15.713 14.0374 15.7724Z"
                stroke="#2F384C"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-xs font-medium">{post.comments}</span>
          </motion.button>

          <motion.button
            onClick={() => handleInteraction("share")}
            className="p-1 text-gray-500 hover:text-green-500 transition-colors duration-200 flex items-center space-x-1"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1_373)">
                <path
                  d="M8.25 9.75L8.53457 10.4899C9.5894 13.2326 10.1168 14.6039 10.825 14.9489C11.4376 15.2472 12.1598 15.2132 12.7416 14.8586C13.4143 14.4486 13.8104 13.0338 14.6028 10.2041L15.716 6.22824C16.2177 4.43672 16.4685 3.54096 16.2357 2.92628C16.0327 2.39035 15.6096 1.96724 15.0737 1.76427C14.459 1.53147 13.5633 1.78228 11.7718 2.28391L7.79584 3.39716C4.96617 4.18947 3.55133 4.58563 3.14136 5.25828C2.78678 5.84005 2.75275 6.56231 3.05106 7.17484C3.39597 7.88306 4.76729 8.41049 7.50993 9.46536L8.25 9.75ZM8.25 9.75L10.125 7.875"
                  stroke="#2F384C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_373">
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <span className="text-xs font-medium">{post.shares}</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PostCard;
