import defaultUserIcon from "../assets/defaultuser.svg";
import defaultImage from "../assets/defaultimage.png";

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

export const parseDateTime = (timestamp) => {
  const now = new Date();
  const date = new Date(timestamp);

  const diffInMilliseconds = now - date;
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays < 1) {
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return date.toLocaleTimeString("en-US", options);
  } else if (diffInDays < 7) {
    // Within the past week, show the weekday
    const options = { weekday: "short", hour: "numeric", minute: "numeric" };
    return date.toLocaleDateString("en-US", options);
  } else if (diffInDays < 365) {
    // Within the past 12 months, show the year and month
    const options = { day: "numeric", month: "short" };
    return date.toLocaleDateString("en-US", options);
  } else {
    // More than 12 months ago, show the year and month
    const options = { year: "numeric", month: "short" };
    return date.toLocaleDateString("en-US", options);
  }
};

export const getImage = (link, type) => {
  if (link && link.trim().length !== 0) {
    return link;
  }

  if (type == "profilePic") {
    return defaultUserIcon;
  } else {
    return defaultImage;
  }
};
