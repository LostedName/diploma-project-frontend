import { isNil } from 'lodash';
import { getToken, TokenType } from './jwt';
import api, {getAuthHeaders, resourceApi} from "./api";

class UserService {
  async userAutentication(email: string, password: string) {
    return await api.post("/api/user/auth/authentication", {
      email,
      password,
    });
  }

  async userRegistration(email: string, firstName: string, lastName: string, password: string) {
    return await api.post("/api/user/auth/registration", {
      email,
      first_name: firstName,
      last_name: lastName,
      password,
    });
  }

  async userResendRegistrationVerifyLink(email: string) {
    return await api.post("/api/user/auth/resend/confirmation", {
      email,
    });
  }
  
  async userRegistrationConfirm(token: string) {
    return await api.get("/api/user/auth/confirm-registration", getAuthHeaders(token));
  }
  
  async userResendTwoFactorAuthCode() {
    const twoFactorToken = getToken(TokenType.TwoFactorAuth);
    return await api.get("/api/user/auth/resend/auth", getAuthHeaders(twoFactorToken || ""));
  }
  
  async userConfirmTwoFactorAuthCode(code: string) {
    const twoFactorToken = getToken(TokenType.TwoFactorAuth);
    return await api.post("api/user/auth/2f-auth", {
      authCode: code,
    }, getAuthHeaders(twoFactorToken || ""));
  }

  async getUserData() {
    const accessToken = getToken(TokenType.Access);
    return await resourceApi.get("/api/user", getAuthHeaders(accessToken || ""));
  }
  
  // async editProfile(bodyObj: EditProfileType) {
  //   return await api.put("api/user/", bodyObj, getAuthHeaders());
  // }
}
const userService = new UserService();
export {userService};