import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Post } from "../types";
import Header from "../components/Header";
import PostEditor from "../components/PostEditor";
import PostCard from "../components/PostCard";
import AuthModal from "../components/AuthModal";

const Feed: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [postsLoaded, setPostsLoaded] = useState(false);

  // Sample posts data
  useEffect(() => {
    const samplePosts: Post[] = [
      {
        id: "1",
        emoji: "😊",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        author: {
          id: "user-1",
          name: "Theresa Webb",
          email: "theresa@example.com",
          avatar:
            "https://ui-avatars.com/api/?name=Theresa+Webb&background=random",
        },
        timestamp: "5 mins ago",
        likes: 12,
        comments: 3,
        shares: 1,
      },
      {
        id: "2",
        emoji: "✌️",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        author: {
          id: "user-2",
          name: "John Doe",
          email: "john@example.com",
          avatar: "https://ui-avatars.com/api/?name=John+Doe&background=random",
        },
        timestamp: "5 mins ago",
        likes: 8,
        comments: 2,
        shares: 0,
      },
      {
        id: "3",
        emoji: "😵",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        author: {
          id: "user-3",
          name: "Jane Doe",
          email: "jane@example.com",
          avatar: "https://ui-avatars.com/api/?name=Jane+Doe&background=random",
        },
        timestamp: "5 mins ago",
        likes: 15,
        comments: 5,
        shares: 2,
      },
    ];

    // Simulate loading delay for better animation effect
    setTimeout(() => {
      setPosts(samplePosts);
      setPostsLoaded(true);
    }, 300);
  }, []);

  const handlePostCreated = (newPost: Post) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  // Show auth modal when trying to interact without authentication
  const handleUnauthenticatedAction = () => {
    if (!isAuthenticated) {
      setAuthMode("signin");
      setShowAuthModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="animate-fade-in">
          <PostEditor
            onPostCreated={handlePostCreated}
            onUnauthenticatedAction={handleUnauthenticatedAction}
          />
        </div>

        <div className="space-y-4 mt-8">
          {postsLoaded &&
            posts.map((post, index) => (
              <div
                key={post.id}
                className="animate-slide-in-up"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: "both",
                }}
              >
                <PostCard
                  post={post}
                  onUnauthenticatedAction={handleUnauthenticatedAction}
                />
              </div>
            ))}

          {!postsLoaded && (
            <div className="flex justify-center items-center py-12">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                <div
                  className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </main>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </div>
  );
};

export default Feed;
