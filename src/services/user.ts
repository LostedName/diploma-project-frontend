import { EditProfileType } from "../types/User";
import api, {getAuthHeaders, getRefreshHeaders} from "./api";
class UserService {

  async loginUser(email: string, password: string) {
    return await api.post("/api/user/login", {
      email,
      password,
    });
  }
  async registerUser(email: string, name: string, password: string) {
    return await api.post("/api/user/register", {
      email,
      name,
      password,
    });
  }
  async getUserData() {
    return await api.get("/api/user/", getAuthHeaders());
  }
  async getForeignUserData(id: number) {
    return await api.get(`/api/user/${id}`, getAuthHeaders());
  }
  async getUserSubscribers(followId: number) {
    return await api.get(`api/subs/subscribers/${followId}`, getAuthHeaders());
  }
  async getUserSubscripitions(authorId: number) {
    return await api.get(`api/subs/subscripitions/${authorId}`, getAuthHeaders());
  }
  async subscribeUser(followId: number) {
    return await api.post("/api/subs/", {followId}, getAuthHeaders());
  }
  async unsubscribeUser(followId: number) {
    return await api.delete("/api/subs/", {data: {followId}, ...getAuthHeaders()});
  }
  async editProfile(bodyObj: EditProfileType) {
    return await api.put("api/user/", bodyObj, getAuthHeaders());
  }
  async refreshToken() {
    return await api.get("/api/user/refresh-token", getRefreshHeaders());
  }
}
const userService = new UserService();
export {userService};