import axios from "axios";
let frontChatLoaded = false;
const frontChatLoadCallbacks: (() => void)[] = [];


function loadFrontChatScript() {
    if (frontChatLoaded) {
        return;
    }

    const frontChatScript = document.createElement('script');
    frontChatScript.setAttribute('src', 'https://chat-assets.frontapp.com/v1/chat.bundle.js');
    document.head.appendChild(frontChatScript);
    frontChatScript.onload = () => {
        frontChatLoaded = true;
        frontChatLoadCallbacks.forEach((callback) => callback());
        frontChatLoadCallbacks.length = 0;
    };
}

export function onFrontChatLoad(callback: () => void) {
    if (frontChatLoaded) {
        callback();
    } else {
        frontChatLoadCallbacks.push(callback);
    }
}

export function initializeFrontChat(chatId: string) {
    onFrontChatLoad(() => {
        (window as any).FrontChat('init', {
            chatId,
            useDefaultLauncher: true,
            size: 'small',
        });
    })

}


export function IdentifyChat() {
    onFrontChatLoad(() => {
        axios.post('http://127.0.0.1:3001/hash', {
            userEmail: 'default@expample.com'
        }).then(res => {
            (window as any).FrontChat('identity', {
                email: 'default@example.com',
                name: 'default@example.',
                userHsh: res.data.userHash,
                customFields: {
                    'Shipments delivered': 242,
                    Title: 'Parcel Captain',
                    'Is admin': true
                }
            });
        })

    })

}

export function shutdownFrontChat() {
    onFrontChatLoad(() => {
        (window as any).FrontChat('shutdown', { clearSession: true });
    });
}

loadFrontChatScript();
