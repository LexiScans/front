import Constants from "expo-constants";

const appEnv = Constants.expoConfig?.extra?.APP_ENV || "development";

const ENV = {
  APP_ENV: appEnv,
  USER_SERVICE:
    appEnv === "development"
      ? "http://10.0.2.2:8080"
      : "https://485t7d4i73.execute-api.us-east-1.amazonaws.com/develop",

  PAYMENT_SERVICE:
    appEnv === "development"
      ? "http://10.0.2.2:8081"
      : "https://485t7d4i73.execute-api.us-east-1.amazonaws.com/develop",

  PDF_SERVICE:
    appEnv === "development"
      ? "http://10.0.2.2:8083"
      : "https://485t7d4i73.execute-api.us-east-1.amazonaws.com/develop",

  IS_DEV: appEnv === "development",
  IS_PREVIEW: appEnv === "preview",
  IS_PROD: appEnv === "production",
};

console.log("🚀 Entorno:", ENV.APP_ENV);
console.log("🔧 URLs:", {
  user: ENV.USER_SERVICE,
  payment: ENV.PAYMENT_SERVICE,
  subscription: ENV.PDF_SERVICE,
});

export default ENV;
