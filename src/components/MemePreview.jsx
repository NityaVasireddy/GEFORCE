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

          <div className="relative">

            <img
              src={imageUrl}
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

          <div className="relative">

            <img
              src={imageUrl}
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

          <div className="relative">

            <img
              src={imageUrl}
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

          </div>
        </div>

      </div>
    </div>
  );
}

export default MemePreview;