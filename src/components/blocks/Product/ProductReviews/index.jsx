"use client";

import { showToast } from "@/components/common/ToastComponent";
import ReviewForm from "@/components/partials/Product/ProductReviews/ReviewForm";
import ReviewList from "@/components/partials/Product/ProductReviews/ReviewList";
import ReviewSummary from "@/components/partials/Product/ProductReviews/ReviewSummary";
import {
  getProductReviewsAPI,
  getUserReviewAPI,
  submitReviewAPI,
} from "@/lib/appSyncAPIs";
import { useModalDispatch } from "@/store/sagas/dispatch/modal.dispatch";
import { errorHandler } from "@/utils/errorHandler";
import { processAnalytics } from "@/utils/helpers";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

const reviewDefault = {
  rating: 5,
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

  const getProductReviews = useCallback(
    async (reset = false) => {
      if (!productId) return;
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
      if (!productId || !user) return;
      setLoading(true);
      try {
        const result = await submitReviewAPI(reviewState, user, productId);
        if (result) {
          setUserReview(result);
          setReview(reviewDefault);
          setShowReview(false);
          getProductReviews(true);
          showToast.success("Your review has been submitted.");
        }
      } catch (error) {
        errorHandler(error);
      } finally {
        setLoading(false);
      }
    },
    [reviewState, user, productId, getProductReviews],
  );

  useEffect(() => {
    if (user?.id && productId) {
      getUserReviewAPI(productId, user.id)
        .then(setUserReview)
        .catch(errorHandler);
    }
  }, [user?.id, productId]);

  const handleReviewClick = useCallback(() => {
    if (user?.id) {
      setShowReview(true);
    } else {
      handlePasswordLessModal(true);
    }
  }, [user?.id, handlePasswordLessModal]);

  return (
    <div className="container-main mb-main flex flex-col items-center justify-center">
      <ReviewSummary
        title={title}
        rating={rating}
        totalRating={totalRating}
        reviewAnalytics={reviewAnalytics}
        onReviewClick={handleReviewClick}
      />

      <ReviewList
        userReview={userReview}
        reviews={reviews}
        total={total}
        token={token}
        loading={loading}
        getProductReviews={getProductReviews}
      />

      <ReviewForm
        isOpen={showReview}
        onClose={() => setShowReview(false)}
        reviewState={reviewState}
        setReview={setReview}
        onSubmit={submitReview}
        loading={loading}
      />
    </div>
  );
};
export default Reviews;
