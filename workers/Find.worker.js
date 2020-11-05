const decryptZip = async (zipUint, imageUint, password) => {
    const passwordUint = new TextEncoder().encode(password);
    const baseKey = await crypto.subtle.importKey(
        "raw",
        passwordUint,
        {
            name: "PBKDF2",
        },
        false,
        ["deriveKey"]
    );
    const cryptoKey = await crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: imageUint.slice(0, 16),
            iterations: 10000,
            hash: "SHA-256",
        },
        baseKey,
        {
            name: "AES-CTR",
            length: 128,
        },
        false,
        ["decrypt"]
    );
    const zipDecrypted = await crypto.subtle.decrypt(
        {
            name: "AES-CTR",
            counter: new Uint8Array(16),
            length: 128,
        },
        cryptoKey,
        zipUint.buffer
    );
    return new Uint8Array(zipDecrypted);
};

onmessage = async ({
    data: {
        image: [{ contents, type }],
        password,
    },
}) => {
    const imageUint = new Uint8Array(contents);

    const marker = {
        "image/png": [174, 66, 96, 130],
        "image/jpeg": [255, 217],
        "image/gif": [59],
    }[type];

    const indexOfZip =
        imageUint.findIndex(
            (_, index) =>
                imageUint.slice(index, index + marker.length).toString() ===
                marker.toString()
        ) + marker.length;

    const zipEncryptedUint = imageUint.slice(indexOfZip);
    const zipUint = await decryptZip(zipEncryptedUint, imageUint, password);

    postMessage({
        result: new Blob([zipUint], { type: "application/zip" }),
    });
    close();
};
