import { useCallback, useState } from "react"

export const useValidationTimer = () => {
    const [status, setStatus] = useState<boolean>(true);
    const startTimer = useCallback(() => {
        console.log("Start timer");
        let timer: NodeJS.Timer;
        setStatus(false);
        timer = setTimeout(() => {
          setStatus(true);
          clearInterval(timer);
        }, 2500);
    }, []);
    return {status, startTimer};
}