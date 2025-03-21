import { encode } from 'blurhash';
import sharp from 'sharp';
export { renderers } from '../../renderers.mjs';

const encodeImageToBlurhash = async (imageUrl) => {
  try {
    console.log("Processing image:", imageUrl);
    const res = await fetch(imageUrl);
    const buffer = await res.arrayBuffer();
    const sharpImage = sharp(Buffer.from(buffer));
    const { data, info } = await sharpImage.resize(100, 100, { fit: "inside" }).raw().ensureAlpha().toBuffer({ resolveWithObject: true });
    const pixels = new Uint8ClampedArray(data);
    return encode(pixels, info.width, info.height, 4, 4);
  } catch (error) {
    console.error("Error procesando la imagen", error);
    throw error;
  }
};

const GET = async ({ url }) => {
  const imageUrl = url.searchParams.get("url");
  if (!imageUrl) {
    return new Response("No URL provided", { status: 400 });
  }
  try {
    const blurhash = await encodeImageToBlurhash(imageUrl);
    return new Response(blurhash);
  } catch (error) {
    return new Response("Error generating blurhash", { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
