import { useRef, useState } from "react";
import { Upload, Image as ImageIcon, X } from "lucide-react";

function ImageUpload({ image, setImage }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const processFile = (file) => {
    if (!file || !file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setImage({
        file: file,
        preview: reader.result,
        base64: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];

    if (file) {
      processFile(file);
    }
  };

  const removeImage = () => {
    setImage(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="w-full">
      <h2 className="mb-3 text-lg font-semibold">
        Upload Image
      </h2>

      {!image ? (
        <div
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition ${
            isDragging
              ? "border-red-500 bg-red-500/10"
              : "border-white/20 bg-white/5 hover:border-red-500/50 hover:bg-white/10"
          }`}
        >
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10">
            <Upload className="text-red-400" size={28} />
          </div>

          <p className="text-base font-medium">
            Drag & drop your image here
          </p>

          <p className="mt-2 text-sm text-gray-400">
            or click to browse from your computer
          </p>

          <p className="mt-3 text-xs text-gray-500">
            PNG, JPG, JPEG, WEBP
          </p>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <img
            src={image.preview}
            alt="Uploaded preview"
            className="max-h-96 w-full object-contain"
          />

          <button
            type="button"
            onClick={removeImage}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-red-600"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-2 border-t border-white/10 px-4 py-3">
            <ImageIcon size={18} className="text-red-400" />

            <span className="truncate text-sm text-gray-300">
              {image.file.name}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;