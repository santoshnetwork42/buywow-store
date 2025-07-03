const awsmobile = {
  aws_project_region: "ap-south-1",
  aws_mobile_analytics_app_id: "ca8ef46d368243e3b4c129f929181d5d",
  aws_mobile_analytics_app_region: "ap-south-1",
  Analytics: {
    AWSPinpoint: {
      appId: "ca8ef46d368243e3b4c129f929181d5d",
      region: "ap-south-1",
    },
  },
  aws_appsync_graphqlEndpoint:
    "https://k4ah3qum7rbtjns24dtw3kp4ee.appsync-api.ap-south-1.amazonaws.com/graphql",
  aws_appsync_region: "ap-south-1",
  aws_appsync_authenticationType: "API_KEY",
  aws_appsync_apiKey: "da2-oirunkudqbh2bayylafkepfsju",
  aws_cloud_logic_custom: [
    {
      name: "wow-prod-rest-api",
      endpoint: "https://pz6ifs3lr9.execute-api.ap-south-1.amazonaws.com/prod",
      region: "ap-south-1",
    },
  ],
  aws_cognito_identity_pool_id:
    "ap-south-1:33117795-fada-45fd-8e18-777051a746f6",
  aws_cognito_region: "ap-south-1",
  aws_user_pools_id: "ap-south-1_XMkWXELxe",
  aws_user_pools_web_client_id: "42l9t4l4au9jsauhoqio5lleeq",
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
  aws_user_files_s3_bucket: "wow-prod-media-bucket",
  aws_user_files_s3_bucket_region: "ap-south-1",
};

export default awsmobile;
