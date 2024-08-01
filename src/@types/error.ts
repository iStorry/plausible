export type PlausibleError = {
  /**
   * The error message describing the issue. This is the same as the `error` property.
   * It is included for convenience and might not always be present.
   * If the error message is not provided, the nature of the error is unknown.
   *
   * @example "Invalid API key"
   */
  error: string;
};
