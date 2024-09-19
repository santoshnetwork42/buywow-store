import { CloseIcon, ImageCamera } from "@/assets/svg/icons";
import { Img, Text } from "@/components/elements";
import { uploadImages } from "@/utils/helpers";
import React, { useCallback, useState } from "react";

const MAX_IMAGES = 10;

const ImageUploader = React.memo(({ images, onPhotoChange }) => {
  const [error, setError] = useState("");

  const handleFileChange = useCallback(
    async (e) => {
      const files = [...e.target.files];
      if (files.length) {
        if (images.length + files.length > MAX_IMAGES) {
          setError(`You can only upload a maximum of ${MAX_IMAGES} images.`);
          return;
        }
        setError("");
        try {
          const urls = await Promise.all(
            files.map((element) => uploadImages(element, "review")),
          );
          onPhotoChange([...images, ...urls]);
        } catch (error) {
          setError("Error uploading images. Please try again.");
        }
      }
    },
    [images, onPhotoChange],
  );

  const removeImage = useCallback(
    (index) => {
      onPhotoChange(images.filter((_, i) => i !== index));
      setError(""); // Clear any existing error when an image is removed
    },
    [images, onPhotoChange],
  );

  return (
    <div className="flex flex-col gap-2">
      <Text as="span" size="base" className="text-sm" responsive>
        Add photos (Optional)
      </Text>
      <div className="flex gap-2">
        <div className="relative flex size-20 cursor-pointer items-center justify-center rounded border p-3 md:size-24">
          <input
            className="absolute inset-0 cursor-pointer opacity-0 file:hidden"
            onChange={handleFileChange}
            type="file"
            accept="image/*"
            id="review-photo"
            name="filename"
            multiple
          />
          <ImageCamera />
        </div>
        <div className="flex flex-1 gap-2 overflow-x-scroll">
          {images.map((img, index) => (
            <div
              key={index}
              className="relative flex size-20 shrink-0 rounded border md:size-24"
            >
              <Img
                src={img}
                className="aspect-square h-auto w-full object-contain p-1"
                width={100}
                height={100}
                addPrefix
                alt="Review image"
                loading="lazy"
              />
              <span
                className="absolute right-0 top-0.5 cursor-pointer rounded-full bg-white-a700"
                onClick={() => removeImage(index)}
              >
                <CloseIcon size={22} />
              </span>
            </div>
          ))}
        </div>
      </div>
      {error && (
        <Text as="p" size="sm" className="mt-2 text-red-500" responsive>
          {error}
        </Text>
      )}
    </div>
  );
});

ImageUploader.displayName = "ImageUploader";

export default ImageUploader;
