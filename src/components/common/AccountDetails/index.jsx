import { showToast } from "@/components/common/ToastComponent";
import { Button, Input } from "@/components/elements";
import { updateUserAPI } from "@/lib/appSyncAPIs";
import { useUserDispatch } from "@/store/sagas/dispatch/user.dispatch";
import { validateEmail, validateString } from "@/utils/helpers";
import { getCurrentUser } from "aws-amplify/auth";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const INITIAL_USER_STATE = {
  email: "",
  phone: "",
  firstName: "",
  lastName: "",
  id: "",
};

const INITIAL_ERROR_STATE = {
  email: "",
  phone: "",
  firstName: "",
  lastName: "",
};

const VALIDATION_FIELDS = [
  { key: "firstName", validate: validateString },
  { key: "lastName", validate: validateString },
  { key: "email", validate: validateEmail },
];

const AccountDetails = () => {
  const { setUser } = useUserDispatch();
  const { user: userState } = useSelector((state) => state.user);

  const [user, setUserState] = useState(INITIAL_USER_STATE);
  const [errors, setErrors] = useState(INITIAL_ERROR_STATE);

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
    setUserState((prevUser) => ({
      ...prevUser,
      firstName: userState?.firstName || "",
      lastName: userState?.lastName || "",
      email: userState?.email || "",
    }));
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
    const result = validationFunction(value.trim());
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

  const checkFormValidity = useCallback(() => {
    let isValid = true;
    VALIDATION_FIELDS.forEach(({ key }) => {
      if (!validateField(key, user[key])) {
        isValid = false;
      }
    });
    return isValid;
  }, [user, validateField]);

  const handleFormSubmit = useCallback(async () => {
    if (!checkFormValidity()) return;

    try {
      const currentUser = await getCurrentUser();
      if (currentUser?.userId && user.id) {
        const updatedUser = await updateUserAPI(user);
        const { data } = updatedUser || {};
        const { updateUser } = data || {};
        setUser({
          ...userState,
          email: updateUser?.email || "",
          firstName: updateUser?.firstName || "",
          lastName: updateUser?.lastName || "",
        });
        showToast.success("Account details updated successfully");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      showToast.error("Error updating user");
    }
  }, [user, checkFormValidity]);

  const renderInput = (field, label, type = "text", disabled = false) => (
    <Input
      type={type}
      value={user[field]}
      onChange={handleInputChange(field)}
      onBlur={handleInputBlur(field)}
      required
      className="w-full gap-1 border p-2"
      error={errors[field]}
      label={label}
      maxLength={30}
      disabled={disabled}
    />
  );

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex justify-between gap-2">
        {renderInput("firstName", "First Name")}
        {renderInput("lastName", "Last Name")}
      </div>
      <div className="flex flex-col gap-4">
        {renderInput("email", "Email", "email")}
        {renderInput("phone", "Phone", "tel", true)}
      </div>
      <Button
        variant="primary"
        className="p-3 text-lg"
        onClick={handleFormSubmit}
      >
        Save
      </Button>
    </div>
  );
};

export default AccountDetails;
