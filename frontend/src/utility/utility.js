export const WhatTimeAgo = (timestamp) => {
  const seconds = Math.floor((Date.now() - Date.parse(timestamp)) / 1000);

  const intervals = [
    { shortlabel: "y", label: "year", seconds: 31536000 },
    { shortlabel: "mo", label: "month", seconds: 2592000 },
    { shortlabel: "d", label: "day", seconds: 86400 },
    { shortlabel: "hr", label: "hour", seconds: 3600 },
    { shortlabel: "m", label: "minute", seconds: 60 },
    { shortlabel: "s", label: "second", seconds: 1 },
  ];

  for (let i = 0; i < intervals.length; i++) {
    const interval = intervals[i];
    const count = Math.floor(seconds / interval.seconds);

    if (count >= 1) {
      return count === 1
        ? {
            long: `${count} ${interval.label} ago`,
            short: `${count}${interval.shortlabel}`,
          }
        : {
            long: `${count} ${interval.label}s ago`,
            short: `${count}${interval.shortlabel}`,
          };
    }
  }
  return { long: "Just now", short: "now" };
};
