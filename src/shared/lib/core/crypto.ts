import * as crypto from 'crypto';

const customCrypto = {
    randomUUID: () => {
        const hexChars = '0123456789abcdef';
        let uuid = '';

        // Generate an UUID on format xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
        for (let i = 0; i < 36; i++) {
            if (i === 8 || i === 13 || i === 18 || i === 23) {
                uuid += '-';
            } else if (i === 14) {
                uuid += '4'; // V4 for random uuid
            } else if (i === 19) {
                uuid += hexChars.charAt(Math.floor(Math.random() * 4) + 8); // [8, 9, a, b]
            } else {
                uuid += hexChars.charAt(Math.floor(Math.random() * 16));
            }
        }

        return uuid;
    }
};

if (typeof process !== 'undefined' && crypto && crypto?.randomUUID) {
    customCrypto.randomUUID = crypto.randomUUID;
} else if (typeof window !== 'undefined' && window?.crypto && window?.crypto?.randomUUID) {
    customCrypto.randomUUID = window.crypto.randomUUID.bind(window.crypto);
}

export const UUID = customCrypto.randomUUID;
export default UUID;
