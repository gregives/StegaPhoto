import JSZip from "jszip";

const encryptZip = async (zipUint, imageUint, password) => {
    const passwordUint = new TextEncoder().encode(password);
    const baseKey = await crypto.subtle.importKey(
        "raw",
        passwordUint,
        "PBKDF2",
        false,
        ["deriveBits", "deriveKey"]
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
        ["encrypt"]
    );
    const zipEncrypted = await crypto.subtle.encrypt(
        {
            name: "AES-CTR",
            counter: new Uint8Array(16),
            length: 128,
        },
        cryptoKey,
        zipUint.buffer
    );
    return new Uint8Array(zipEncrypted);
};

onmessage = async ({
    data: {
        image: [{ contents, type }],
        files,
        compression,
        password,
    },
}) => {
    const zip = new JSZip();
    files.forEach((file) => {
        const { name, contents, date } = file;
        zip.file(name, contents, {
            date,
        });
    });

    const imageUint = new Uint8Array(contents);

    const zipUint = await zip.generateAsync(
        {
            type: "uint8array",
            compression: compression === 0 ? "STORE" : "DEFLATE",
            compressionOptions: {
                level: compression,
            },
        },
        ({ percent }) => {
            postMessage({ progress: percent });
        }
    );

    const zipEncryptedUint = await encryptZip(zipUint, imageUint, password);
    const resultUint = new Uint8Array([...imageUint, ...zipEncryptedUint]);

    postMessage({
        result: new Blob([resultUint], { type }),
    });
    close();
};
