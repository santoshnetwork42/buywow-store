import { Input } from "@/components/elements";
import React, { useMemo } from "react";

const AccountFormFields = React.memo(
  ({ user, errors, handleInputChange, handleInputBlur }) => {
    const renderInput = useMemo(
      () =>
        ({ key, label, maxLength }, type = "text", disabled = false) => (
          <Input
            key={key}
            type={type}
            name={key}
            label={label}
            value={user[key] || ""}
            maxLength={maxLength}
            className="w-full rounded px-2.5 py-2 text-sm outline outline-1 outline-gray-500 md:py-2.5 md:text-base"
            labelClassName="text-sm md:text-base"
            onChange={handleInputChange(key)}
            onBlur={handleInputBlur(key)}
            error={errors[key]}
            disabled={disabled}
            required
          />
        ),
      [user, errors, handleInputChange, handleInputBlur],
    );

    return (
      <>
        <div className="flex justify-between gap-3">
          {renderInput({
            key: "firstName",
            label: "First Name",
            maxLength: 20,
          })}
          {renderInput({
            key: "lastName",
            label: "Last Name",
            maxLength: 20,
          })}
        </div>
        <div className="flex flex-col gap-4">
          {renderInput(
            { key: "email", label: "Email", maxLength: 48 },
            "email",
          )}
          {renderInput(
            { key: "phone", label: "Phone", maxLength: 10 },
            "tel",
            true,
          )}
        </div>
      </>
    );
  },
);

AccountFormFields.displayName = "AccountFormFields";

export default AccountFormFields;
