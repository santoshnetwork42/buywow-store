const awsmobile = {
  aws_project_region: "ap-south-1",
  aws_mobile_analytics_app_id: "20b82cde089e46be995f5b12c6b3b860",
  aws_mobile_analytics_app_region: "ap-south-1",
  Analytics: {
    AWSPinpoint: {
      appId: "20b82cde089e46be995f5b12c6b3b860",
      region: "ap-south-1",
    },
  },
  aws_appsync_graphqlEndpoint:
    "https://5f7dthbrereapirwrz7k3v4mqi.appsync-api.ap-south-1.amazonaws.com/graphql",
  aws_appsync_region: "ap-south-1",
  aws_appsync_authenticationType: "API_KEY",
  aws_appsync_apiKey: "da2-y5rl4tehwzdj5mwsqtcibtvvkq",
  aws_cloud_logic_custom: [
    {
      name: "wow-dev-rest-api",
      endpoint: "https://bv6yza2d2d.execute-api.ap-south-1.amazonaws.com/dev",
      region: "ap-south-1",
    },
  ],
  aws_cognito_identity_pool_id:
    "ap-south-1:b150ea16-a6e4-4130-a06e-62ecf93dc7bb",
  aws_cognito_region: "ap-south-1",
  aws_user_pools_id: "ap-south-1_cB2553HFZ",
  aws_user_pools_web_client_id: "4cep587ehgljbe9tm0lak0o9a1",
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
  aws_user_files_s3_bucket: "wow-dev-media-bucket",
  aws_user_files_s3_bucket_region: "ap-south-1",
};

export default awsmobile;