import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { apiBaseUrl } from '../config';
import { useParams } from 'react-router-dom';
import CardDetails from './CardDetails';

const Favorites = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false);
const { postId } = useParams()
const { userId } = useParams()

  useEffect(() => {
    const isPostLiked = localStorage.getItem(`like_${postId}`);
    setIsLiked(!!isPostLiked);

    fetchLikesCount();
  }, [postId]);

  const fetchLikesCount = async () => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.get(`${apiBaseUrl}/posts/${userId}/favorites`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const totalNumber = response.data.likesCount;
      setLikesCount(totalNumber);
    } catch (error) {
      console.error("Error fetching likes count:", error);
    }
  };
  const onLike = (liked) => {
    setLikesCount(liked ? likesCount + 1 : likesCount - 1);
  };

  const handleLike = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("authToken");
      await axios.post(
        `${apiBaseUrl}/posts/${userId}/favorites/${postId}`,
        null,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsLiked(true);

      localStorage.setItem(`like_${postId}`, "true");
      setLikesCount(likesCount + 1);

      onLike && onLike();
      setIsLoading(false);
    } catch (error) {
      console.error("Error liking post:", error);
      setIsLoading(false);
    }
  };

  const handleUnlike = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("authToken");

      await axios.delete(`${apiBaseUrl}/posts/${postId}/favorites`, {
        data: { postId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsLiked(false);
      localStorage.removeItem(`like_${postId}`);
      setLikesCount(likesCount - 1);
      onLike && onLike(false);
      setIsLoading(false);
    } catch (error) {
      console.error("Error unliking post:", error);
      setIsLoading(false);
    }
  };

  return (
    <div>
       <CardDetails onLike={handleLike} handleUnlike={handleUnlike} />
      {/* <button
        onClick={isLiked ? handleUnlike : handleLike}
        disabled={isLoading}
        className={`btn btn-outline-primary like-button ${
          isLiked ? "selected" : ""
        }`}
        style={isLiked ? { color: "white", background: "blue" } : {}}
      >
        <i className="bi bi-hand-thumbs-up"></i> {isLiked ? "Unlike" : "Like"}
      </button> */}
    </div>
  );
};

 
export default Favorites;
