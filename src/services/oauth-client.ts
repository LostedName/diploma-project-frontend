import { getToken, TokenType } from './jwt';
import {getAuthHeaders, resourceApi} from "./api";
import { NOTES_ON_PAGE } from '../types/types';

class OAuthClientService {
  async getFullOauthClientsList() {
    const accessToken = getToken(TokenType.Access);
    return await resourceApi.get("/api/user/oauth-client/list", getAuthHeaders(accessToken || ""));
  }

  async getFullOAuthClientsListWithPagination(currentPage: number) {
    const accessToken = getToken(TokenType.Access);
    return await resourceApi.get(`/api/user/oauth-client/list?pagination__page=${currentPage}&pagination__pageSize=${NOTES_ON_PAGE}&createdAtSort__order=DESC`, getAuthHeaders(accessToken || ""));
  }

  async getFullOAuthClientById(clientId: number) {
    const accessToken = getToken(TokenType.Access);
    return await resourceApi.get(`/api/user/oauth-client/${clientId}`, getAuthHeaders(accessToken || ""));
  }
  
  async createOAuthClient(name: string, description: string, homepageUrl: string, redirectUris: string[]) {
    const accessToken = getToken(TokenType.Access);
    return await resourceApi.post("/api/user/oauth-client", {
      name,
      description,
      homepageUrl,
      redirectUris,
    }, getAuthHeaders(accessToken || ""));
  }

  async editOAuthClient(id: number, name: string, description: string, iconUrl: string, homepageUrl: string, redirectUris: string[]) {
    const accessToken = getToken(TokenType.Access);
    return await resourceApi.patch(`/api/user/oauth-client/${id}`, {
      name,
      description,
      iconUrl,
      homepageUrl,
      redirectUris,
    }, getAuthHeaders(accessToken || ""));
  }

  async deleteOAuthClient(id: number) {
    const accessToken = getToken(TokenType.Access);
    return await resourceApi.delete(`/api/user/oauth-client/${id}`, {
      ...getAuthHeaders(accessToken || ""),
    });
  }

  async generateNewOAuthClientSecret(id: number) {
    const accessToken = getToken(TokenType.Access);
    return await resourceApi.get(`/api/user/oauth-client/generate-client/${id}`, {
      ...getAuthHeaders(accessToken || ""),
    });
  }
}
const oauthClientService = new OAuthClientService();
export {oauthClientService};