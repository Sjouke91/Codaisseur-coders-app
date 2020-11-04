export const selectFeedPost = (state) => {
  const postAndPage = {
    post: state.postPage.post,
    comments: state.postPage.comments,
  };
  return state.postPage.loading ? null : postAndPage;
};
