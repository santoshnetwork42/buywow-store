import { showToast } from "@/components/common/ToastComponent";
import { Button } from "@/components/elements";
import { updateUserAPI } from "@/lib/appSyncAPIs";
import { useUserDispatch } from "@/store/sagas/dispatch/user.dispatch";
import { validateEmail, validateString } from "@/utils/helpers";
import { getCurrentUser } from "aws-amplify/auth";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AccountFormFields from "@/components/partials/Account/AccountDetails/AccountFormFields";

const INITIAL_USER_STATE = {
  email: "",
  phone: "",
  firstName: "",
  lastName: "",
  id: "",
};

const VALIDATION_FIELDS = [
  { key: "firstName", validate: validateString },
  { key: "lastName", validate: validateString },
  { key: "email", validate: validateEmail },
];

const AccountDetailsSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-10 w-3/4 rounded bg-gray-200"></div>
    <div className="h-10 w-3/4 rounded bg-gray-200"></div>
    <div className="h-10 w-3/4 rounded bg-gray-200"></div>
    <div className="h-10 w-3/4 rounded bg-gray-200"></div>
    <div className="h-10 w-1/2 rounded bg-gray-200"></div>
  </div>
);

const AccountDetails = React.memo(() => {
  const { setUser } = useUserDispatch();
  const userState = useSelector((state) => state.user?.user);

  const [user, setUserState] = useState(INITIAL_USER_STATE);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser().catch(() => null);
        if (currentUser?.userId) {
          setUserState((prevUser) => ({
            ...prevUser,
            phone: currentUser.signInDetails?.loginId || "",
            id: currentUser.userId,
          }));
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (userState?.id) {
      setUserState((prevUser) => ({
        ...prevUser,
        firstName: userState.firstName || "",
        lastName: userState.lastName || "",
        email: userState.email || "",
      }));
    }
  }, [userState]);

  const handleInputChange = useCallback(
    (field) => (e) => {
      const value =
        field === "phone"
          ? e.target.value.replace(/[^0-9]+/g, "").trim()
          : e.target.value;
      setUserState((prevUser) => ({ ...prevUser, [field]: value }));
    },
    [],
  );

  const validateField = useCallback((field, value) => {
    const validationFunction =
      VALIDATION_FIELDS.find((f) => f.key === field)?.validate ||
      validateString;
    const result = validationFunction(value?.trim() || "");
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: result?.error ? result.message : "",
    }));
    return !result?.error;
  }, []);

  const handleInputBlur = useCallback(
    (field) => (e) => {
      validateField(field, e.target.value);
    },
    [validateField],
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const isValid = VALIDATION_FIELDS.every(({ key }) =>
        validateField(key, user[key]),
      );
      if (!isValid) return;

      setIsSubmitting(true);
      try {
        const currentUser = await getCurrentUser().catch(() => null);
        if (currentUser?.userId && user.id) {
          const response = await updateUserAPI(user);
          const updateUser = response?.data?.updateUser;
          if (updateUser) {
            setUser({
              ...userState,
              email: updateUser.email || "",
              firstName: updateUser.firstName || "",
              lastName: updateUser.lastName || "",
            });
            showToast.success("Account details updated successfully");
          }
        }
      } catch (error) {
        console.error("Error updating user:", error);
        showToast.error("Error updating user");
      } finally {
        setIsSubmitting(false);
      }
    },
    [user, validateField, setUser, userState],
  );

  if (isLoading) {
    return <AccountDetailsSkeleton />;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 py-1">
      <AccountFormFields
        user={user}
        errors={errors}
        handleInputChange={handleInputChange}
        handleInputBlur={handleInputBlur}
      />
      <Button
        type="submit"
        variant="primary"
        size="medium"
        className="h-[36px] w-full sm:h-[36px] sm:w-1/2 md:h-[44px] lg:h-[44px]"
        loader={isSubmitting}
      >
        {isSubmitting ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
});

AccountDetails.displayName = "AccountDetails";

export default AccountDetails;
