const awsmobile = {
  aws_project_region: "ap-south-1",
  aws_mobile_analytics_app_id: "68f611fe536b4251b61ebda99da40e55",
  aws_mobile_analytics_app_region: "ap-south-1",
  Analytics: {
    AWSPinpoint: {
      appId: "68f611fe536b4251b61ebda99da40e55",
      region: "ap-south-1",
    },
  },
  aws_appsync_graphqlEndpoint:
    "https://i3t5repbizh37gtuq3im2tr2aa.appsync-api.ap-south-1.amazonaws.com/graphql",
  aws_appsync_region: "ap-south-1",
  aws_appsync_authenticationType: "API_KEY",
  aws_appsync_apiKey: "da2-vpj5of2bkja2jfrq75scl5a3sm",
  aws_cloud_logic_custom: [
    {
      name: "wow-uat-rest-api",
      endpoint: "https://5idhmv6fzb.execute-api.ap-south-1.amazonaws.com/uat",
      region: "ap-south-1",
    },
  ],
  aws_cognito_identity_pool_id:
    "ap-south-1:806cebad-c8c3-4455-ba87-11f569eb6520",
  aws_cognito_region: "ap-south-1",
  aws_user_pools_id: "ap-south-1_38nNwRAiO",
  aws_user_pools_web_client_id: "7fapa76bd6kbmlimkd6stnsm4t",
  oauth: {},
  aws_cognito_username_attributes: ["PHONE_NUMBER"],
  aws_cognito_social_providers: [],
  aws_cognito_signup_attributes: ["MIDDLE_NAME", "GIVEN_NAME", "NAME"],
  aws_cognito_mfa_configuration: "ON",
  aws_cognito_mfa_types: ["SMS"],
  aws_cognito_password_protection_settings: {
    passwordPolicyMinLength: 8,
    passwordPolicyCharacters: [],
  },
  aws_cognito_verification_mechanisms: ["PHONE_NUMBER"],
  aws_user_files_s3_bucket: "wow-uat-media-bucket",
  aws_user_files_s3_bucket_region: "ap-south-1",
};

export default awsmobile;
