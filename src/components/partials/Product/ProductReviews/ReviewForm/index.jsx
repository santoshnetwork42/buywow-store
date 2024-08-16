import { Button, Input, Text } from "@/components/elements";
import Modal from "@/components/features/Modal";
import React, { useCallback } from "react";
import ReviewStars from "../ReviewStars";
import ImageUploader from "./ImageUploader";

const ReviewForm = React.memo(
  ({ isOpen, onClose, reviewState, setReview, onSubmit, loading }) => {
    const handleInputChange = useCallback(
      (e) => {
        const { name, value } = e.target;
        setReview((prev) => ({ ...prev, [name]: value }));
      },
      [setReview],
    );

    const handleInputBlur = useCallback(
      (e) => {
        const { name, value } = e.target;
        setReview((prev) => ({ ...prev, [name]: value.trim() }));
      },
      [setReview],
    );

    return (
      <Modal
        isOpen={isOpen}
        title="Write a Review"
        modalContainerClassName="md:w-[500px] flex flex-col gap-5"
        onClose={onClose}
      >
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-5">
            <Input
              type="text"
              label="Name"
              name="name"
              value={reviewState.name}
              className="rounded p-2.5 outline outline-1 outline-gray-500"
              required
              onChange={handleInputChange}
              onBlur={handleInputBlur}
            />
            <Input
              type="email"
              label="Email"
              name="email"
              value={reviewState.email}
              className="rounded p-2.5 outline outline-1 outline-gray-500"
              onChange={handleInputChange}
              onBlur={handleInputBlur}
            />
          </div>
          <div className="flex gap-3">
            <Text as="span" size="base" className="text-sm" responsive>
              Your rating <span className="text-red-500">*</span>
            </Text>
            <ReviewStars
              rating={reviewState.rating}
              onChange={(num) =>
                setReview((prev) => ({ ...prev, rating: num }))
              }
              editable
            />
          </div>
          <ImageUploader
            images={reviewState.images}
            onPhotoChange={(newImages) =>
              setReview((prev) => ({ ...prev, images: newImages }))
            }
          />
          <Input
            isTextarea
            rows={6}
            className="w-full rounded outline outline-1 outline-gray-500"
            inputClassName="py-2.5 px-3"
            labelClassName="top-5"
            name="comment"
            label="Comment"
            value={reviewState.comment}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            required
          />
          <Button
            type="submit"
            variant="primary"
            size="medium"
            className="my-2 w-fit"
            loader={loading}
          >
            Submit
          </Button>
        </form>
      </Modal>
    );
  },
);

ReviewForm.displayName = "ReviewForm";

export default ReviewForm;
