export const timeAgo = (
  sqlTimestamp: string | undefined
): { long: string; short: string } => {
  const now = new Date();
  const past = new Date(sqlTimestamp || 0);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) {
    // Less than 1 minute
    const long = `${diffInSeconds} second${diffInSeconds === 1 ? "" : "s"} ago`;
    const short = `${diffInSeconds}s`;
    return { long, short };
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    // Less than 1 hour
    const long = `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;
    const short = `${diffInMinutes}m`;
    return { long, short };
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    // Less than 1 day
    const long = `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
    const short = `${diffInHours}h`;
    return { long, short };
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    // Less than 1 month
    const long = `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
    const short = `${diffInDays}d`;
    return { long, short };
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    // Less than 1 year
    const long = `${diffInMonths} month${diffInMonths === 1 ? "" : "s"} ago`;
    const short = `${diffInMonths}mo`;
    return { long, short };
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  const long = `${diffInYears} year${diffInYears === 1 ? "" : "s"} ago`;
  const short = `${diffInYears}y`;
  return { long, short };
};

export function parseStringArray(input: string): string[] {
  // Ensure the input is a valid string
  if (typeof input !== "string") {
    throw new Error("Input must be a string. But found " + typeof input);
  }

  // Trim any leading or trailing whitespace
  const trimmedInput = input.trim();

  // Validate the format: must start with [ and end with ]
  if (!trimmedInput.startsWith("[") || !trimmedInput.endsWith("]")) {
    throw new Error(
      "Invalid format: input must be enclosed in square brackets."
    );
  }

  // Remove the enclosing square brackets
  const content = trimmedInput.slice(1, -1);

  // Split the content by commas, accounting for possible extra spaces
  const items = content.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/).map((item) => {
    return item.trim().replace(/^\"|\"$/g, ""); // Remove surrounding quotes
  });

  return items;
}
