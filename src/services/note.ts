import { getToken, TokenType } from './jwt';
import api, {getAuthHeaders, resourceApi} from "./api";

class NoteService {
  async getNotesList() {
    const accessToken = getToken(TokenType.Access);
    return await resourceApi.get("/api/user/note/list", getAuthHeaders(accessToken || ""));
  }
  
  async createNote(title: string, content: string) {
    const accessToken = getToken(TokenType.Access);
    return await api.post("/api/user/note", {
      title,
      content,
    }, getAuthHeaders(accessToken || ""));
  }

  async editNote(id: number, title: string, content: string) {
    const accessToken = getToken(TokenType.Access);
    return await api.patch(`/api/user/note${id}`, {
      title,
      content,
    }, getAuthHeaders(accessToken || ""));
  }
}
const noteService = new NoteService();
export {noteService};