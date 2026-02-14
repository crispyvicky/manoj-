import * as THREE from "three";

export const createNoiseTexture = (size = 512, scale = 1.0) => {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    if (ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, size, size);

        const imageData = ctx.getImageData(0, 0, size, size);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const value = Math.random() * 255 * scale;
            data[i] = value; // r
            data[i + 1] = value; // g
            data[i + 2] = value; // b
        }

        ctx.putImageData(imageData, 0, 0);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
};
