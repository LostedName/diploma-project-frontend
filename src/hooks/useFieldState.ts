import React, { useRef, useState } from "react"

export const useFieldState: (initialState?: string) => [state: string, setState: React.Dispatch<React.SetStateAction<string>>, isValid: React.MutableRefObject<boolean>] = (initialState: string = "") => {
    const [state, setState] = useState<string>(initialState);
    const isValid = useRef<boolean>(true);
    return [state, setState, isValid];
}