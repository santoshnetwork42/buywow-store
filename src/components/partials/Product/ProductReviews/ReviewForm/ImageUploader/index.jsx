import { CloseIcon, ImageCamera } from "@/assets/svg/icons";
import { Img, Text } from "@/components/elements";
import { uploadImages } from "@/utils/helpers";
import React, { useCallback } from "react";

const ImageUploader = React.memo(({ images, onPhotoChange }) => {
  const handleFileChange = useCallback(
    async (e) => {
      const files = [...e.target.files];
      if (files.length) {
        try {
          const urls = await Promise.all(
            files.map((element) => uploadImages(element, "review")),
          );
          onPhotoChange([...images, ...urls]);
        } catch (error) {
          console.error("Error uploading images:", error);
        }
      }
    },
    [images, onPhotoChange],
  );

  const removeImage = useCallback(
    (index) => {
      onPhotoChange(images.filter((_, i) => i !== index));
    },
    [images, onPhotoChange],
  );

  return (
    <div className="flex flex-col gap-2">
      <Text as="span" size="base" responsive>
        Add photos (Optional)
      </Text>
      <div className="flex gap-2">
        <div className="relative flex size-24 cursor-pointer items-center justify-center rounded border p-3">
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
              className="relative flex size-24 shrink-0 rounded border"
            >
              <Img
                src={img}
                className="aspect-square h-auto w-full object-contain p-1"
                width={100}
                height={100}
                isStatic
                addPrefix
                alt="Review image"
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
    </div>
  );
});

ImageUploader.displayName = "ImageUploader";

export default ImageUploader;
