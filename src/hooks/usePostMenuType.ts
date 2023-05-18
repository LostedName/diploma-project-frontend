import { useCallback } from "react";
import { MenuType } from "../types/Post";
import { useTypedSelector } from "./useTypedSelector"

export const usePostMenuType = () => {
    const isAuth = useTypedSelector((state) => state.userStore.isAuth);
    const loggedUserId = useTypedSelector((state) => state.userStore.user?.id);
    return useCallback((userId: number) => !isAuth ? MenuType.none : (loggedUserId === userId) ? MenuType.own : MenuType.stranger, [isAuth, loggedUserId]); 
}