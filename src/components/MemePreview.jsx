<<<<<<< HEAD
import { Image as ImageIcon } from "lucide-react";

function MemePreview({ image, caption }) {
  // ImageUpload object nundi preview/base64 image ni extract chestham
  const imageUrl =
    image?.preview ||
    image?.base64 ||
    (typeof image === "string" ? image : "");

  // Image lekapothe placeholder
  if (!imageUrl) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/[0.03]">
        <div className="text-center">
          <ImageIcon
            size={45}
            className="mx-auto mb-4 text-gray-600"
          />

          <h3 className="text-lg font-semibold text-gray-400">
            Meme Preview
          </h3>

          <p className="mt-2 text-sm text-gray-600">
            Upload an image to see your meme preview.
          </p>
        </div>
=======
import { useEffect, useState } from "react";
import { Image as ImageIcon } from "lucide-react";

function MemePreview({ image, caption }) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (!image) {
      setImageUrl("");
      return;
    }

    // If image is already a URL
    if (typeof image === "string") {
      setImageUrl(image);
      return;
    }

    // If image is a File
    if (image instanceof File) {
      const url = URL.createObjectURL(image);
      setImageUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }

    // If image is an object
    if (typeof image === "object") {
      if (image.preview) {
        setImageUrl(image.preview);
        return;
      }

      if (image.url) {
        setImageUrl(image.url);
        return;
      }

      if (image.file instanceof File) {
        const url = URL.createObjectURL(image.file);
        setImageUrl(url);

        return () => {
          URL.revokeObjectURL(url);
        };
      }
    }

    setImageUrl("");
  }, [image]);

  const previewCaption =
    caption || "POV: You thought today was going to be productive 💀";

  // No image uploaded
  if (!imageUrl) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-white">
            Meme Preview
          </h2>

          <p className="text-sm text-gray-500">
            Your generated meme previews
          </p>
        </div>

        <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-dashed border-white/10 bg-black">
          <div className="text-center">
            <ImageIcon
              size={45}
              className="mx-auto mb-4 text-gray-600"
            />

            <h3 className="text-lg font-semibold text-gray-400">
              No Image Yet
            </h3>

            <p className="mt-2 text-sm text-gray-600">
              Upload an image to preview your memes.
            </p>
          </div>
        </div>
>>>>>>> backend
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
<<<<<<< HEAD

=======
>>>>>>> backend
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-white">
          Meme Preview
        </h2>

        <p className="text-sm text-gray-500">
<<<<<<< HEAD
          Choose your favorite caption style
        </p>
      </div>

      {/* Three Meme Styles */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

        {/* =================================
            STYLE 1 - BLACK BACKGROUND
        ================================= */}

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">

          <div className="bg-white/5 px-4 py-3">
            <p className="text-sm font-medium text-gray-300">
              Black Background
            </p>
          </div>

=======
          Choose your preferred caption style
        </p>
      </div>

      {/* 3 Preview Images */}
      <div className="grid gap-4 md:grid-cols-3">

        {/* ================= STYLE 1 ================= */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
>>>>>>> backend
          <div className="relative">

            <img
              src={imageUrl}
<<<<<<< HEAD
              alt="Meme black style"
              className="block max-h-[400px] w-full object-contain"
            />

            {caption && (
              <div className="absolute bottom-3 left-1/2 w-[88%] -translate-x-1/2 rounded-lg bg-black/85 px-3 py-2">
                <p
                  className="text-center text-xs font-medium leading-relaxed text-white sm:text-sm"
                  style={{
                    fontFamily:
                      "Arial, Helvetica, sans-serif",
                  }}
                >
                  {caption}
                </p>
              </div>
            )}

          </div>
        </div>

        {/* =================================
            STYLE 2 - DIRECT CAPTION
        ================================= */}

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">

          <div className="bg-white/5 px-4 py-3">
            <p className="text-sm font-medium text-gray-300">
              Direct Caption
            </p>
          </div>

=======
              alt="Meme preview black background"
              className="h-72 w-full object-contain"
            />

            {/* Black caption background */}
            <div className="absolute bottom-0 left-0 right-0 bg-black px-4 py-3 text-center">
              <p className="text-sm font-bold leading-relaxed text-white">
                {previewCaption}
              </p>
            </div>

          </div>

          <div className="border-t border-white/10 px-3 py-3">
            <p className="text-center text-xs font-medium text-gray-400">
              Style 1 • Black Background
            </p>
          </div>
        </div>


        {/* ================= STYLE 2 ================= */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
>>>>>>> backend
          <div className="relative">

            <img
              src={imageUrl}
<<<<<<< HEAD
              alt="Meme direct style"
              className="block max-h-[400px] w-full object-contain"
            />

            {caption && (
              <div className="absolute bottom-3 left-1/2 w-[88%] -translate-x-1/2">

                <p
                  className="text-center text-xs font-semibold leading-relaxed text-white sm:text-sm"
                  style={{
                    fontFamily:
                      "Arial, Helvetica, sans-serif",

                    textShadow:
                      "2px 2px 4px black, -1px -1px 2px black",
                  }}
                >
                  {caption}
                </p>

              </div>
            )}

          </div>
        </div>

        {/* =================================
            STYLE 3 - WHITE BACKGROUND
        ================================= */}

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">

          <div className="bg-white/5 px-4 py-3">
            <p className="text-sm font-medium text-gray-300">
              White Background
            </p>
          </div>

=======
              alt="Meme preview no background"
              className="h-72 w-full object-contain"
            />

            {/* No caption background */}
            <div className="absolute bottom-0 left-0 right-0 px-4 py-4 text-center">
              <p
                className="text-sm font-extrabold leading-relaxed text-white"
                style={{
                  textShadow:
                    "2px 2px 4px #000, -2px -2px 4px #000, 2px -2px 4px #000, -2px 2px 4px #000",
                }}
              >
                {previewCaption}
              </p>
            </div>

          </div>

          <div className="border-t border-white/10 px-3 py-3">
            <p className="text-center text-xs font-medium text-gray-400">
              Style 2 • No Background
            </p>
          </div>
        </div>


        {/* ================= STYLE 3 ================= */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
>>>>>>> backend
          <div className="relative">

            <img
              src={imageUrl}
<<<<<<< HEAD
              alt="Meme white style"
              className="block max-h-[400px] w-full object-contain"
            />

            {caption && (
              <div className="absolute bottom-3 left-1/2 w-[88%] -translate-x-1/2 rounded-lg bg-white/90 px-3 py-2">

                <p
                  className="text-center text-xs font-medium leading-relaxed text-black sm:text-sm"
                  style={{
                    fontFamily:
                      "Arial, Helvetica, sans-serif",
                  }}
                >
                  {caption}
                </p>

              </div>
            )}

=======
              alt="Meme preview transparent background"
              className="h-72 w-full object-contain"
            />

            {/* Semi-transparent caption background */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-4 py-3 text-center">
              <p className="text-sm font-bold leading-relaxed text-white">
                {previewCaption}
              </p>
            </div>

          </div>

          <div className="border-t border-white/10 px-3 py-3">
            <p className="text-center text-xs font-medium text-gray-400">
              Style 3 • Transparent Background
            </p>
>>>>>>> backend
          </div>
        </div>

      </div>
    </div>
  );
}

export default MemePreview;