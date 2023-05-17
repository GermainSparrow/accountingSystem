import { useEffect, FC } from "react";
import { initializeFrontChat, shutdownFrontChat } from './function'
export const ChatRoom: FC = () => {
    useEffect(() => {
        initializeFrontChat('2d84140fbe1afc214f5a8c185b1c8686')
        return (() => { shutdownFrontChat() })
    }, [])
    return (
        <>

        </>
    )
}