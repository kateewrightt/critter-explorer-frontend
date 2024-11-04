export async function fetchConfig() {
  const response = await fetch("/config.json");
  const config = await response.json();

  // Choose the backend API based on NODE_ENV
  const env = process.env.NODE_ENV || "development";
  return env === "production" ? config.backendAPI.production : config.backendAPI.development;
}
