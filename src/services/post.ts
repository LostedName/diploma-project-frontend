import api, {getAuthHeaders} from "./api";
class PostService {
  async getAllPostsNotLogged() {
    return await api.get("/api/post/");
  }
  async getAllPostsLogged() {
    return await api.get("/api/post/logged", getAuthHeaders());
  }
  async getAllPostsFollowed() {
    return await api.get("/api/post/followed", getAuthHeaders());
  }
  async createPost(text: string) {
    return await api.post("/api/post/", { text }, getAuthHeaders());
  }
  async getAllUserPosts(id: number, offset: number = 0) {
    return await api.get(`/api/post/${id}/${offset}`, getAuthHeaders());
  }
  async getAllUserLikedPosts(id: number, offset: number = 0) {
    return await api.get(`/api/post/liked/${id}/${offset}`, getAuthHeaders());
  }
  async deletePost(postId: number) {
    return await api.delete("/api/post/", {data: {postId}, ...getAuthHeaders()} );
  }
  async likePost(postId: number) {
    return await api.post("/api/post/like", {postId, method: "like"}, getAuthHeaders());
  }
  async unlikePost(postId: number) {
    return await api.post("/api/post/like", {postId, method: "unlike"}, getAuthHeaders());
  }
  async editPost(postId: number, text: string) {
    return await api.put("/api/post/", {postId, text}, getAuthHeaders());
  }
  async reportPost(postId: number, text: string) {
    return await api.post("/api/post/report", {postId, text}, getAuthHeaders());
  }
}
const postService = new PostService();
export {postService};