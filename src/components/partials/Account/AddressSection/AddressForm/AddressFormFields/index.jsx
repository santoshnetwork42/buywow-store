import { Input } from "@/components/elements";
import { fetchCityAndStateAPI } from "@/lib/appSyncAPIs";
import States from "@/utils/data/states.json";
import {
  sanitizeText,
  validateEmail,
  validatePhoneNumber,
  validatePinCode,
  validateString,
} from "@/utils/helpers";
import React, { useCallback, useEffect, useMemo } from "react";

const AddressFormFields = ({
  address,
  setAddress,
  addressErrors,
  setAddressErrors,
}) => {
  const stateOptions = useMemo(
    () =>
      States.map((state) => ({
        value: state.value,
        label: state.name,
      })),
    [],
  );

  const fetchCityAndStateData = useCallback(
    async (pinCode) => {
      try {
        const result = await fetchCityAndStateAPI(pinCode);

        const state =
          stateOptions.find((state) => state.label === result?.state)?.value ||
          "";

        setAddress((prevAddress) => ({
          ...prevAddress,
          city: result?.city || prevAddress?.city,
          state: state || prevAddress?.state,
        }));
      } catch (error) {
        console.error("Error fetching city and state:", error);
      }
    },
    [setAddress],
  );

  useEffect(() => {
    if (address?.pinCode?.length === 6) {
      fetchCityAndStateData(address?.pinCode);
    }
  }, [address.pinCode, fetchCityAndStateData]);

  const handleInputChange = useCallback(
    (field) => (e) => {
      let value = e.target.value;
      try {
        if (field === "pinCode" || field === "phone") {
          value = value.replace(/[^0-9]+/g, "").trim();
        } else {
          value = sanitizeText(value);
        }
        setAddress((prevAddress) => ({ ...prevAddress, [field]: value }));
      } catch (e) {
        console.error(e);
      }
    },
    [setAddress],
  );

  const handleInputBlur = useCallback(
    (field, validationFunction) => (e) => {
      const value = e.target.value.trim();
      const res = validationFunction(value);
      setAddressErrors((prevErrors) => ({
        ...prevErrors,
        [field]: res?.error ? res?.message : null,
      }));
    },
    [setAddressErrors],
  );

  return (
    <>
      <Input
        type="text"
        label="PinCode"
        name="pinCode"
        value={address.pinCode}
        maxLength={6}
        className="rounded px-2.5 py-2 text-base outline outline-1 outline-gray-500 md:py-2.5"
        labelClassName="text-sm md:text-base"
        onChange={handleInputChange("pinCode")}
        onBlur={handleInputBlur("pinCode", validatePinCode)}
        error={addressErrors.pinCode}
        required
      />
      <div className="grid grid-cols-2 gap-3">
        <Input
          type="text"
          label="City"
          name="city"
          value={address.city}
          maxLength={20}
          className="rounded px-2.5 py-2 text-base outline outline-1 outline-gray-500 md:py-2.5"
          labelClassName="text-sm md:text-base"
          onChange={handleInputChange("city")}
          onBlur={handleInputBlur("city", validateString)}
          error={addressErrors.city}
          required
        />
        <select
          id="state"
          name="state"
          value={address.state}
          onChange={handleInputChange("state")}
          onBlur={handleInputBlur("state", validateString)}
          className={`cursor-pointer rounded px-2.5 py-2 text-base outline outline-1 outline-gray-300 focus:outline-1 focus:outline-offset-0 focus:outline-gray-300 md:py-2.5 ${
            addressErrors.state ? "outline-red-500 focus:outline-red-500" : ""
          }`}
          required
        >
          <option value="">Select a state</option>
          {stateOptions.map((state) => (
            <option key={state.value} value={state.value}>
              {state.label}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Input
          type="tel"
          label="Phone"
          name="phone"
          value={address.phone}
          prefix="+91"
          maxLength={10}
          className="rounded px-2.5 py-2 text-base outline outline-1 outline-gray-500 md:py-2.5"
          inputClassName="w-auto"
          labelClassName="text-sm md:text-base"
          onChange={handleInputChange("phone")}
          onBlur={handleInputBlur("phone", validatePhoneNumber)}
          error={addressErrors.phone}
          required
        />
        <Input
          type="text"
          label="Full Name"
          name="name"
          value={address.name}
          maxLength={30}
          className="rounded px-2.5 py-2 text-base outline outline-1 outline-gray-500 md:py-2.5"
          labelClassName="text-sm md:text-base"
          onChange={handleInputChange("name")}
          onBlur={handleInputBlur("name", validateString)}
          error={addressErrors.name}
          required
        />
      </div>
      <Input
        type="email"
        label="Email"
        name="email"
        value={address.email}
        maxLength={48}
        className="rounded px-2.5 py-2 text-base outline outline-1 outline-gray-500 md:py-2.5"
        labelClassName="text-sm md:text-base"
        onChange={handleInputChange("email")}
        onBlur={handleInputBlur("email", validateEmail)}
        error={addressErrors.email}
        required
      />
      <Input
        isTextarea
        label="Street Address"
        name="address"
        value={address.address}
        rows={4}
        className="rounded text-base outline outline-1 outline-gray-500"
        inputClassName="py-2 md:py-2.5 px-3 resize-none"
        labelClassName="top-5 text-sm md:text-base"
        onChange={handleInputChange("address")}
        onBlur={handleInputBlur("address", validateString)}
        error={addressErrors.address}
        required
      />
    </>
  );
};

export default React.memo(AddressFormFields);
