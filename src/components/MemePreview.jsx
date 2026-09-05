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

  // No image
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
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">

      {/* Header */}
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-white">
          Meme Preview
        </h2>

        <p className="text-sm text-gray-500">
          Choose your preferred caption style
        </p>
      </div>

      {/* Three Preview Styles */}
      <div className="grid gap-4 md:grid-cols-3">

        {/* ================= STYLE 1 ================= */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
          <div className="relative">

            <img
              src={imageUrl}
              alt="Meme preview white background"
              className="h-72 w-full object-contain"
            />

            {/* White Background */}
            <div className="absolute bottom-0 left-0 right-0 bg-white px-4 py-3 text-center">
              <p className="text-xs font-bold leading-relaxed text-black">
                {previewCaption}
              </p>
            </div>

          </div>

          <div className="border-t border-white/10 px-3 py-3">
            <p className="text-center text-xs font-medium text-gray-400">
              Style 1 • White Background
            </p>
          </div>
        </div>


        {/* ================= STYLE 2 ================= */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
          <div className="relative">

            <img
              src={imageUrl}
              alt="Meme preview no background"
              className="h-72 w-full object-contain"
            />

            {/* No Background */}
            <div className="absolute bottom-0 left-0 right-0 px-4 py-4 text-center">
              <p
                className="text-xs font-extrabold leading-relaxed text-white"
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
          <div className="relative">

            <img
              src={imageUrl}
              alt="Meme preview transparent black background"
              className="h-72 w-full object-contain"
            />

            {/* Semi-transparent Black Background */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-4 py-3 text-center">
              <p className="text-xs font-bold leading-relaxed text-white">
                {previewCaption}
              </p>
            </div>

          </div>

          <div className="border-t border-white/10 px-3 py-3">
            <p className="text-center text-xs font-medium text-gray-400">
              Style 3 • Transparent Black
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default MemePreview;