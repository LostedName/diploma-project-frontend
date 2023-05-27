import { getToken, TokenType } from './jwt';
import api, {getAuthHeaders, resourceApi} from "./api";
import { NOTES_ON_PAGE } from '../types/types';

class NoteService {
  async getFullNotesList() {
    const accessToken = getToken(TokenType.Access);
    return await resourceApi.get("/api/user/note/list", getAuthHeaders(accessToken || ""));
  }

  async getFullNotesListWithPagination(currentPage: number) {
    const accessToken = getToken(TokenType.Access);
    return await resourceApi.get(`/api/user/note/list?pagination__page=${currentPage}&pagination__pageSize=${NOTES_ON_PAGE}&createdAtSort__order=DESC`, getAuthHeaders(accessToken || ""));
  }
  
  async createNote(title: string, content: string) {
    const accessToken = getToken(TokenType.Access);
    return await resourceApi.post("/api/user/note", {
      title,
      content,
    }, getAuthHeaders(accessToken || ""));
  }

  async editNote(id: number, title: string, content: string) {
    const accessToken = getToken(TokenType.Access);
    return await resourceApi.patch(`/api/user/note/${id}`, {
      title,
      content,
    }, getAuthHeaders(accessToken || ""));
  }

  async deleteNote(id: number) {
    const accessToken = getToken(TokenType.Access);
    return await resourceApi.delete(`/api/user/note/${id}`, {
      ...getAuthHeaders(accessToken || ""),
    });
  }
}
const noteService = new NoteService();
export {noteService};