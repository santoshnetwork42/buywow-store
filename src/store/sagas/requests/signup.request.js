import { generateRandomString } from "@/utils/helpers";
import { signUp } from "aws-amplify/auth";
import { Amplify } from "aws-amplify";
import awsExport from "../../../../aws-exports";
import { AWS_CLIENT_ID } from "../../../../config";

Amplify.configure({
  ...awsExport,
  ssr: true,
  aws_user_pools_web_client_id: AWS_CLIENT_ID,
});

export const signupWithAws = async (phone) => {
  try {
    const res = await signUp({
      username: "+91" + phone,
      password: generateRandomString(64),
      options: {
        userAttributes: {
          phone_number: "+91" + phone,
        },
        autoSignIn: true,
      },
    });
    return res;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
