import api, {getAuthHeaders, getRefreshHeaders} from "./api";
class AdminService {

  async loginAdmin(login: string, password: string) {
    return await api.post("/api/admin/login", {
      login,
      password,
    });
  }
  async getAdminData() {
    return await api.get("/api/admin/", getAuthHeaders());
  }
  async getAdminUsers() {
    return await api.get("/api/admin/users", getAuthHeaders());
  }
  async getAdminBannedUsers() {
    return await api.get("/api/admin/banned", getAuthHeaders());
  }
  async getAllPosts() {
    return await api.get("/api/admin/posts", getAuthHeaders());
  }
  async getAllDeletedPosts() {
    return await api.get("/api/admin/deleted-posts", getAuthHeaders());
  }
  async banUser(userId: number, reason: string) {
    return await api.post("/api/admin/ban", {userId, reason}, getAuthHeaders());
  }
  async unbanUser(userId: number) {
    return await api.post("/api/admin/unban", {userId}, getAuthHeaders());
  }
  async deletePost(postId: number) {
    return await api.delete("/api/admin/delete-post", {data: {postId}, ...getAuthHeaders()});
  }
  async recoverPost(postId: number) {
    return await api.put("/api/admin/recover-post", {postId}, getAuthHeaders());
  }
  async discardAllReports(postId: number) {
    return await api.post("/api/post/discard-reports", {postId}, getAuthHeaders());
  }
  async refreshToken() {
    return await api.get("/api/admin/refresh-token", getRefreshHeaders());
  }
}
const adminService = new AdminService();
export {adminService};