"use client";

import { CloseIcon, ImageCamera } from "@/assets/svg/icons";
import RatingBar from "@/components/blocks/Product/ProductReviews/RatingBar";
import ReviewStars from "@/components/blocks/Product/ProductReviews/ReviewStars";
import SectionHeading from "@/components/common/SectionHeading";
import { showToast } from "@/components/common/ToastComponent";
import { Button, Heading, Img, Input, Text } from "@/components/elements";
import Modal from "@/components/features/Modal";
import {
  getProductReviewsAPI,
  getUserReviewAPI,
  submitReviewAPI,
} from "@/lib/appSyncAPIs";
import { useModalDispatch } from "@/store/sagas/dispatch/modal.dispatch";
import { errorHandler } from "@/utils/errorHandler";
import {
  formatTimeAgo,
  processAnalytics,
  toDecimal,
  uploadImages,
} from "@/utils/helpers";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

const reviewDefault = {
  rating: 0,
  comment: "",
  name: "",
  email: "",
  images: [],
  reviewId: "",
};

const Reviews = ({
  title,
  fetchedProduct,
  reviews: initialReviews = {},
  analytics: initialAnalytics = [],
}) => {
  const { user } = useSelector((state) => state.user);
  const { handlePasswordLessModal } = useModalDispatch();

  const { processedAnalytics, rating } = useMemo(
    () => processAnalytics(initialAnalytics),
    [initialAnalytics],
  );

  const [reviewState, setReview] = useState(reviewDefault);
  const [reviews, setReviews] = useState(initialReviews.items || []);
  const [total, setTotal] = useState(initialReviews.total || 0);
  const [showReview, setShowReview] = useState(false);
  const [token, setToken] = useState(initialReviews.nextToken || null);
  const [loading, setLoading] = useState(false);
  const [reviewAnalytics, setReviewAnalytics] = useState(processedAnalytics);
  const [userReview, setUserReview] = useState(null);

  const productId = fetchedProduct?.id;

  const totalRating = useMemo(() => {
    if (total) {
      return userReview?.verified ? total + 1 : total;
    }
    return initialReviews.totalRatings || 0;
  }, [total, initialReviews.totalRatings, userReview]);

  const onPhotoChange = useCallback(async (e) => {
    const files = [...e.target.files];
    if (files.length) {
      try {
        const urls = await Promise.all(
          files.map((element) => uploadImages(element, "review")),
        );
        setReview((prev) => ({
          ...prev,
          images: [...prev.images, ...urls],
        }));
      } catch (error) {
        errorHandler(error);
      }
    }
  }, []);

  const removeImage = useCallback((index) => {
    setReview((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  }, []);

  const getProductReviews = useCallback(
    async (reset = false) => {
      try {
        setLoading(true);
        const result = await getProductReviewsAPI(
          productId,
          user?.id,
          reset ? null : token,
        );
        if (result) {
          const { items, total: totalCount, nextToken } = result;
          setReviews((prev) => (reset ? items : [...prev, ...items]));
          setToken(nextToken);
          setTotal(totalCount);
        }
      } catch (error) {
        errorHandler(error);
      } finally {
        setLoading(false);
      }
    },
    [productId, user?.id, token],
  );

  const submitReview = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const result = await submitReviewAPI(reviewState, user, productId);
        if (result) {
          setUserReview(result);
          setReview(reviewDefault);
          setShowReview((prev) => !prev);
          getProductReviews(true);
          showToast.success("Your review has been submitted.");
        }
      } catch (error) {
        setLoading(false);
      }
    },
    [reviewState, user, productId, getProductReviews],
  );

  useEffect(() => {
    if (user?.id) {
      getUserReviewAPI(productId, user.id)
        .then(setUserReview)
        .catch(errorHandler);
    }
  }, [user?.id, productId]);

  return (
    <div className="container-main mb-main flex flex-col items-center justify-center">
      <SectionHeading title={title} />

      <div className="mb-4 flex w-full flex-col items-center justify-center gap-6 md:flex-row">
        <div className="flex flex-col items-center justify-center gap-3">
          <ReviewStars rating={rating} />
          <div className="flex items-center gap-1">
            <Heading as="h4" size="base" className="text-sm" responsive>
              {toDecimal(rating, 1)} OutOf 5{" "}
              {!!totalRating && `| ${totalRating} Customer Rating`}
            </Heading>
          </div>
          <Button
            variant="primary"
            size="large"
            className="px-4 py-2"
            onClick={() => {
              user?.id
                ? setShowReview((prev) => !prev)
                : handlePasswordLessModal(true);
            }}
          >
            Write a Review
          </Button>
        </div>
        <div className="hidden h-24 w-[1px] bg-gray-800 md:block" />
        <div className="flex w-full max-w-[24rem] flex-col gap-3">
          {[5, 4, 3, 2, 1].map((starCount) => {
            const analyticsItem = reviewAnalytics.find(
              (item) => parseInt(item.key) === starCount,
            );
            return (
              <RatingBar
                key={starCount}
                starCount={starCount}
                percentage={analyticsItem ? analyticsItem.percentage : 0}
              />
            );
          })}
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-6 py-2">
        {!!userReview && (
          <div className="flex w-full flex-col flex-wrap justify-between gap-4 md:flex-row">
            <div className="h-[0.5px] w-full bg-black-900" />
            <div className="flex w-full flex-col md:max-w-[70%]">
              <div className="flex flex-col gap-2">
                <ReviewStars rating={userReview?.rating} />

                <Img
                  src="img_wow_logo.png"
                  width={86}
                  height={48}
                  alt="logo"
                  className="aspect-[86/48] w-[86px] object-contain"
                />
                <Text as="p" size="base" className="line-clamp-5">
                  {userReview?.comment}
                </Text>
              </div>
            </div>
            <div className="flex h-fit w-full items-start justify-between gap-2 md:w-auto md:min-w-[170px] md:flex-col">
              <div className="flex flex-col gap-1">
                <Text as="p" size="base">
                  Submitted {formatTimeAgo(userReview?.createdAt)}
                </Text>
                <Text as="p" size="base">
                  By {userReview?.reviewer.name}
                </Text>
              </div>
              {userReview?.verified && (
                <div className="flex items-center gap-1">
                  <Img
                    src="verified.svg"
                    width={22}
                    height={22}
                    alt="search"
                    className="aspect-square w-[24px] cursor-pointer object-contain"
                  />
                  <Text as="p" size="base">
                    VERIFIED BUYER
                  </Text>
                </div>
              )}
            </div>
          </div>
        )}

        {reviews?.map((item, index) => {
          const timeAgo = formatTimeAgo(item.createdAt);

          return (
            <div
              key={item.id}
              className="flex w-full flex-col flex-wrap justify-between gap-4 md:flex-row"
            >
              <div className="h-[0.5px] w-full bg-black-900" />
              <div className="flex w-full flex-col md:max-w-[70%]">
                <div className="flex flex-col gap-2">
                  <ReviewStars rating={item.rating} />

                  <Img
                    src="img_wow_logo.png"
                    width={86}
                    height={48}
                    alt="logo"
                    className="aspect-[86/48] w-[86px] object-contain"
                  />
                  <Text as="p" size="base" className="line-clamp-5">
                    {item.comment}
                  </Text>
                </div>
              </div>
              <div className="flex h-fit w-full items-start justify-between gap-2 md:w-auto md:min-w-[170px] md:flex-col">
                <div className="flex flex-col gap-1">
                  <Text as="p" size="base">
                    Submitted {timeAgo}
                  </Text>
                  <Text as="p" size="base">
                    By {item.reviewer.name}
                  </Text>
                </div>
                {item.verified && (
                  <div className="flex items-center gap-1">
                    <Img
                      src="verified.svg"
                      width={22}
                      height={22}
                      alt="search"
                      className="aspect-square w-[24px] cursor-pointer object-contain"
                    />
                    <Text as="p" size="base">
                      VERIFIED BUYER
                    </Text>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {total > 0 && <div className="h-[0.05rem] w-full bg-gray-300" />}

        {total > 0 && (
          <Text as="span" size="sm" className="w-full">
            Showing <span>{`1 - ${reviews?.length} of ${total}`}</span> reviews
          </Text>
        )}

        {!!token && reviews?.length < total && (
          <Button
            variant="primary"
            size="large"
            onClick={() => getProductReviews()}
            loader={loading}
          >
            Load More
          </Button>
        )}

        <Modal
          isOpen={showReview}
          title="Write a Review"
          modalContainerClassName="md:w-[500px] flex flex-col gap-5"
          onClose={() => setShowReview(false)}
        >
          <form onSubmit={submitReview} className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-5">
              <Input
                type="text"
                label="Name"
                value={reviewState.name}
                className="rounded p-2.5 outline outline-1 outline-gray-500"
                required
                onChange={(e) =>
                  setReview({
                    ...reviewState,
                    name: e.target.value,
                  })
                }
                onBlur={(e) =>
                  setReview({
                    ...reviewState,
                    name: e.target.value.trim(),
                  })
                }
              />
              <Input
                type="email"
                label="Email"
                value={reviewState.email}
                className="rounded p-2.5 outline outline-1 outline-gray-500"
                onChange={(e) =>
                  setReview({
                    ...reviewState,
                    email: e.target.value,
                  })
                }
                onBlur={(e) =>
                  setReview({
                    ...reviewState,
                    email: e.target.value.trim(),
                  })
                }
              />
            </div>
            <div className="flex gap-3">
              <Text as="span" size="base" className="text-sm" responsive>
                Your rating <span className="text-red-500">*</span>
              </Text>
              <ReviewStars
                rating={reviewState.rating}
                onChange={(num) => {
                  setReview({ ...reviewState, rating: num });
                }}
                editable
              />
            </div>
            <div className="flex flex-col gap-2">
              <Text as="span" size="base" responsive>
                Add photos (Optional)
              </Text>
              <div className="flex gap-2">
                <div className="relative flex size-24 cursor-pointer items-center justify-center rounded border p-3">
                  <input
                    className="absolute inset-0 cursor-pointer opacity-0 file:hidden"
                    onChange={onPhotoChange}
                    type="file"
                    accept="image/*"
                    id="review-photo"
                    name="filename"
                    multiple
                  />
                  <ImageCamera />
                </div>

                <div className="flex flex-1 gap-2 overflow-x-scroll">
                  {reviewState.images.map((img, index) => (
                    <div
                      key={index}
                      className="relative flex size-24 shrink-0 rounded border"
                    >
                      <Img
                        src={img}
                        className="aspect-square h-auto w-full p-1"
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
            <Input
              isTextarea
              rows={6}
              className="w-full rounded outline outline-1 outline-gray-500"
              inputClassName="py-2.5 px-3"
              labelClassName="top-5"
              name="comment"
              required
              value={reviewState.comment}
              onChange={(e) =>
                setReview({
                  ...reviewState,
                  comment: e.target.value,
                })
              }
              onBlur={(e) =>
                setReview({
                  ...reviewState,
                  comment: e.target.value.trim(),
                })
              }
              label="Comment"
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
      </div>
    </div>
  );
};
export default Reviews;
