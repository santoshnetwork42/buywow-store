import awsExport from "@/aws-exports";
import { AWS_CLIENT_ID } from "@/config";
import { generateRandomString } from "@/utils/helpers";
import { Amplify } from "aws-amplify";
import {
  autoSignIn,
  confirmSignIn,
  confirmSignUp,
  resendSignUpCode,
  signIn,
  signOut,
  signUp,
} from "aws-amplify/auth";

Amplify.configure({
  ...awsExport,
  ssr: true,
  aws_user_pools_web_client_id: AWS_CLIENT_ID,
});

export const signUpWithAwsRequest = async ({ phone }) => {
  try {
    const res = await signUp({
      username: phone,
      password: generateRandomString(64),
      options: {
        userAttributes: {
          phone_number: phone,
        },
        autoSignIn: true,
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const signInWithAwsRequest = async ({ phone }) => {
  try {
    const user = await signIn({
      username: phone,
      options: {
        authFlowType: "CUSTOM_WITHOUT_SRP",
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};

export const resendSignUpCodeRequest = async ({ phone }) => {
  try {
    const data = await resendSignUpCode({
      username: phone,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const autoSignInRequest = async () => {
  try {
    const res = await autoSignIn();
    return res;
  } catch (error) {
    throw error;
  }
};

export const confirmSignInRequest = async ({ confirmationCode }) => {
  try {
    const res = await confirmSignIn({
      challengeResponse: confirmationCode,
    });

    return res;
  } catch (error) {
    console.error("error :>> ", error);
    return null;
  }
};

export const confirmSignUpRequest = async ({ username, confirmationCode }) => {
  try {
    const res = await confirmSignUp({
      username,
      confirmationCode,
    });

    return res;
  } catch (error) {
    return null;
  }
};

export const signOutRequest = async () => {
  try {
    const res = await signOut();
    return res;
  } catch (error) {
    throw error;
  }
};
