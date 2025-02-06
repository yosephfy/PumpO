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

type ParsedSegment = {
  type: "text" | "hashtag" | "mention" | "url" | "custom" | "separator";
  value: string;
};

type ParseConfig = {
  customPatterns?: { type: string; regex: RegExp }[];
  allowInvalidTokens?: boolean;
};

type MapConfig<T> = {
  defaultMapFunction: (segment: ParsedSegment) => T;
  customMapFunctions?: { [key: string]: (segment: ParsedSegment) => T };
};

export function parseSpecialString(
  input: string,
  config?: ParseConfig
): {
  segments: ParsedSegment[];
  mapSegments: <T>(mapConfig: MapConfig<T>) => T[];
} {
  const defaultPatterns = [
    { type: "hashtag", regex: /#[a-zA-Z0-9_]+/ },
    { type: "mention", regex: /@[a-zA-Z0-9_]+/ },
    {
      type: "url",
      regex:
        /^(http[s]?:\/\/(www\.)?|ftp:\/\/(www\.)?|www\.){1}([0-9A-Za-z-\.@:%_+~#=]+)+((\.[a-zA-Z]{2,3})+)(\/(.)*)?(\?(.)*)?/,
    },
  ];

  const patterns = config?.customPatterns
    ? [...defaultPatterns, ...config.customPatterns]
    : defaultPatterns;
  const allowInvalidTokens = config?.allowInvalidTokens ?? false;

  function processWord(word: string): ParsedSegment[] {
    const segments: ParsedSegment[] = [];
    let remainingWord = word;

    while (remainingWord.length > 0) {
      let firstMatch: { match: RegExpExecArray; type: string } | null = null;

      for (const { type, regex } of patterns) {
        const match = regex.exec(remainingWord);
        if (
          match &&
          (firstMatch === null || match.index < firstMatch.match.index)
        ) {
          firstMatch = { match, type };
        }
      }

      if (!firstMatch) {
        // No matches found, treat the remaining part as text
        segments.push({ type: "text", value: remainingWord });
        break;
      }

      const { match, type } = firstMatch;
      const beforeMatch = remainingWord.slice(0, match.index);
      const matchedValue = match[0];
      const afterMatch = remainingWord.slice(match.index + matchedValue.length);

      if (beforeMatch.length > 0) {
        segments.push({ type: "text", value: beforeMatch });
      }

      segments.push({ type, value: matchedValue } as ParsedSegment);
      remainingWord = afterMatch;
    }

    return segments;
  }

  const segments: ParsedSegment[] = [];
  const wordsWithSeparators = input.split(/(\s+)/); // Split and retain spaces, newlines, and tabs

  wordsWithSeparators.forEach((word) => {
    if (/^\s+$/.test(word)) {
      segments.push({
        type: "separator",
        value: word,
      });
    } else {
      segments.push(...processWord(word));
    }
  });

  const mapSegments = <T>(mapConfig: MapConfig<T>): T[] => {
    return segments.map((segment) => {
      const customMapper = mapConfig.customMapFunctions?.[segment.type];
      return customMapper
        ? customMapper(segment)
        : mapConfig.defaultMapFunction(segment);
    });
  };

  return { segments, mapSegments };
}
