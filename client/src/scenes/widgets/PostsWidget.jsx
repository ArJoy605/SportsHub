import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "@/states";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile}) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch("http://27.54.151.248:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    // Sort posts by timestamp in descending order
    const sortedPosts = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    dispatch(setPosts({ posts: sortedPosts }));
  };
  
  const getUserPosts = async () => {
    const response = await fetch(
      `http://27.54.151.248:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    // Sort user posts by timestamp in descending order
    const sortedUserPosts = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    console.log(sortedUserPosts);
    dispatch(setPosts({ posts: sortedUserPosts }));
  };
  

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          department,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            department={department}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;