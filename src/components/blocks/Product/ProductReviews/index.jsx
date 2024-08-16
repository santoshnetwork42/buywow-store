"use client";

import RatingBar from "@/components/blocks/Product/ProductReviews/RatingBar";
import ReviewStars from "@/components/blocks/Product/ProductReviews/ReviewStars";
import SectionHeading from "@/components/common/SectionHeading";
import { showToast } from "@/components/common/ToastComponent";
import { Button, Heading, Img, Text } from "@/components/elements";
import {
  getProductReviewsAPI,
  getReviewsAnalyticsAPI,
  getUserReviewAPI,
  submitReviewAPI,
} from "@/lib/appSyncAPIs";
import { useModalDispatch } from "@/store/sagas/dispatch/modal.dispatch";
import { productData } from "@/utils/data/productData";
import { errorHandler } from "@/utils/errorHandler";
import { processAnalytics, toDecimal } from "@/utils/helpers";
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
  productId,
  productTotalRatings = 1279,
  rating = 14.79,
  reviews: initialReviews = {},
  analytics,
  ...props
}) => {
  const { user } = useSelector((state) => state.user);
  const { handlePasswordLessModal } = useModalDispatch();

  console.log(productId, props);

  const [reviewState, setReview] = useState(reviewDefault);
  const [reviews, setReviews] = useState([]);
  const [total, setTotal] = useState(0);
  const [showReview, setShowReview] = useState(false);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reviewAnalytics, setReviewAnalytics] = useState([]);
  const [reviewLoading, setReviewLoading] = useState(true);
  const [userReview, setUserReview] = useState(null);

  const totalRating = useMemo(() => {
    if (total) {
      return userReview?.verified ? total + 1 : total;
    }
    return productTotalRatings ?? 0;
  }, [total, productTotalRatings, userReview]);

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

  const getStarAnalytics = useCallback(async () => {
    try {
      setReviewLoading(true);
      const item = await getReviewsAnalyticsAPI(productId, user?.id);
      setReviewAnalytics(processAnalytics(item));
    } catch (error) {
      errorHandler(error);
    } finally {
      setReviewLoading(false);
    }
  }, [productId, user?.id]);

  const getProductReviews = useCallback(
    async (reset = true) => {
      try {
        setLoading(true);
        setReviewLoading(true);
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
        setReviewLoading(false);
      }
    },
    [productId, user?.id, token],
  );

  const submitReview = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const result = await submitReviewAPI(reviewState, user, productId);
        if (result) {
          setUserReview(result);
          setReview(reviewDefault);
          setShowReview((prev) => !prev);
          getStarAnalytics();
          getProductReviews();
          showToast.success("Your review has been submitted.", "success");
        }
      } catch (error) {
        errorHandler(error);
      }
    },
    [reviewState, user, productId, getStarAnalytics, getProductReviews],
  );

  useEffect(() => {
    if (user) {
      getUserReviewAPI(productId, user.id)
        .then(setUserReview)
        .catch(errorHandler);
    }
  }, [user, productId]);

  useEffect(() => {
    getProductReviews();
    getStarAnalytics();
  }, [getProductReviews, getStarAnalytics]);

  // return null;
  const product = productData[1];

  return (
    <div className="container-main mb-main flex flex-col items-center justify-center">
      <SectionHeading title={title} />

      <div className="flex w-full flex-col items-center justify-center gap-6 py-4 md:flex-row">
        <div className="flex flex-col items-center justify-center gap-3">
          <ReviewStars rating={rating} />
          <div className="flex items-center gap-1">
            <Heading as="h4" size="base" className="text-sm" responsive>
              {toDecimal(rating, 1)} OutOf 5
            </Heading>
            <Text as="span" size="base">
              |
            </Text>
            <Text as="p" size="sm">
              {product.reviewCount} Customer Rating
            </Text>
          </div>
          <div>
            <Button className="px-4 py-2">Write a Review</Button>
          </div>
        </div>
        <div className="hidden h-20 w-[1px] bg-gray-800 md:block"></div>
        <div className="flex w-full max-w-[24rem] flex-col gap-1.5 md:max-w-[22rem]">
          <RatingBar starCount={5} percentage={80} />
          <RatingBar starCount={4} percentage={70} />
          <RatingBar starCount={3} percentage={12} />
          <RatingBar starCount={2} percentage={0} />
          <RatingBar starCount={1} percentage={0} />
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-6 py-2">
        {reviewLoading && (
          <div className="loader size-10 rounded-full border-4 border-yellow-900" />
        )}

        {!!product?.reviews &&
          product.reviews.map((item, index) => {
            return (
              <div
                key={`review-${index}`}
                className="flex w-full flex-col flex-wrap justify-between gap-4 md:flex-row"
              >
                <div className="h-[0.05rem] w-full bg-gray-300" />
                <div className="flex w-full flex-col md:max-w-[70%]">
                  <div className="flex flex-col gap-2">
                    <ReviewStars rating={item.rating} />
                    <Text as="p" size="base" className="font-medium">
                      {item.title}
                    </Text>
                    <Img
                      src="img_wow_logo.png"
                      width={86}
                      height={48}
                      alt="logo"
                      className="aspect-[86/48] w-[86px] object-contain"
                    />
                    <Text as="p" size="base" className="line-clamp-5">
                      {item.description}
                    </Text>
                  </div>
                </div>
                <div className="flex h-fit w-full items-start justify-between gap-2 md:w-auto md:max-w-[20%] md:flex-col">
                  <div className="flex flex-col gap-1">
                    <Text as="p" size="base">
                      Submitted 02 Days ago
                    </Text>
                    <Text as="p" size="base">
                      By Guest
                    </Text>
                  </div>
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
                </div>
              </div>
            );
          })}
        <div className="h-[0.05rem] w-full bg-gray-300" />
        <Button variant="primary" size="large" className="">
          Load More
        </Button>
      </div>
    </div>
  );
};
export default Reviews;
