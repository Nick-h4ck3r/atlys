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
    setPosts(samplePosts);
  }, []);

  const handlePostCreated = (newPost: Post) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const handleInteraction = () => {
    if (!isAuthenticated) {
      setAuthMode("signin");
      setShowAuthModal(true);
    }
  };

  // Show auth modal when trying to interact without authentication
  const handleUnauthenticatedAction = () => {
    if (!isAuthenticated) {
      setAuthMode("signin");
      setShowAuthModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-6">
        <PostEditor
          onPostCreated={handlePostCreated}
          onUnauthenticatedAction={handleUnauthenticatedAction}
        />

        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onUnauthenticatedAction={handleUnauthenticatedAction}
            />
          ))}
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
