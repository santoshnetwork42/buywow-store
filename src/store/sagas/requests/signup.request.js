import { Auth } from "aws-amplify";

export const signupWithAws = async (provider) => {
  try {
    await Auth.federatedSignIn({ provider });
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
