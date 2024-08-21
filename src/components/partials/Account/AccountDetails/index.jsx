import { showToast } from "@/components/common/ToastComponent";
import { Button } from "@/components/elements";
import { updateUserAPI } from "@/lib/appSyncAPIs";
import { useUserDispatch } from "@/store/sagas/dispatch/user.dispatch";
import { validateEmail, validateString } from "@/utils/helpers";
import { getCurrentUser } from "aws-amplify/auth";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AccountFormFields from "./AccountFormFields";

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

const AccountDetails = React.memo(() => {
  const { setUser } = useUserDispatch();
  const { user: userState } = useSelector((state) => state.user);

  const [user, setUserState] = useState(INITIAL_USER_STATE);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser?.userId) {
          setUserState((prevUser) => ({
            ...prevUser,
            phone: currentUser.signInDetails?.loginId || "",
            id: currentUser.userId,
          }));
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (userState) {
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

      try {
        const currentUser = await getCurrentUser();
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
      }
    },
    [user, validateField, setUser, userState],
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-2">
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
        className="h-[36px] w-full sm:h-[36px] sm:w-36 md:h-[44px] md:w-44 lg:h-[44px] lg:w-48"
      >
        Save Changes
      </Button>
    </form>
  );
});

AccountDetails.displayName = "AccountDetails";

export default AccountDetails;
