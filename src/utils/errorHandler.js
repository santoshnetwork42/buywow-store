/**
 * Handles and logs errors in a standardized way.
 * @param {Error|string|Object} error - The error to be handled.
 * @param {string} [context='General'] - The context in which the error occurred.
 */

export const errorHandler = (
  error,
  context = "General",
  throwError = false,
) => {
  try {
    let errorMessage;
    let errorDetails;

    if (error instanceof Error) {
      errorMessage = error.message;
      errorDetails = {
        name: error.name,
        stack: error.stack,
      };
    } else if (typeof error === "string") {
      errorMessage = error;
    } else if (typeof error === "object" && error !== null) {
      errorMessage = error.message || "An unknown error occurred";
      errorDetails = { ...error };
    } else {
      errorMessage = "An unknown error occurred";
    }

    // Log the error
    console.error(`${context}: ${errorMessage} `);
    console.error("Error details:", errorDetails?.stack || errorDetails);
  } catch (error) {
    console.error("Error occurred while handling error:", error);
    if (throwError) throw error;
  }
};
