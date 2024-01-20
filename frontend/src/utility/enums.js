export const settingKeys = {
  privateProfile: { key: "privateProfile", turnedOn: 1, turnedOff: 0 },
  activityStatus: { key: "activityStatus", turnedOn: 1, turnedOff: 0 },
  darkmmode: { key: "darkmode", turnedOn: 1, turnedOff: 0 },
  likesNotification: { key: "likesNotification", turnedOn: 1, turnedOff: 0 },
  commentsNotification: {
    key: "commentsNotification",
    turnedOn: 1,
    turnedOff: 0,
  },
  newFollowerNotification: {
    key: "newFollowerNotification",
    turnedOn: 1,
    turnedOff: 0,
  },
  friendReqNotification: {
    key: "friendReqNotification",
    turnedOn: 1,
    turnedOff: 0,
  },
  tagNotification: { key: "tagNotification", turnedOn: 1, turnedOff: 0 },
  directMessageNotification: {
    key: "directMessageNotification",
    values: { everyone: 2, friends: 1, none: 0 },
  },
  commentVisibility: {
    key: "commentVisibility",
    values: { everyone: 2, friends: 1, none: 0 },
  },
  postVisibility: {
    key: "postVisibility",
    values: { everyone: 2, friends: 1, none: 0 },
  },
  tagVisibility: {
    key: "tagVisibility",
    values: { everyone: 2, friends: 1, none: 0 },
  },
  discoverabilityVisibility: {
    key: "discoverabilityVisibility",
    values: { everyone: 2, friends: 1, none: 0 },
  },
  directMessageVisibility: {
    key: "directMessageVisibility",
    values: { everyone: 2, friends: 1, none: 0 },
  },
};

export const apiCalls = (parameter) => {
  return {
    feed: {
      add: {},
      get: {
        all: `/feed/`,
        followed: `/feed/followed`,
        liked: `/feed/liked`,
        saved: `/feed/saved`,
        profile: `/feed/profile/${parameter}`,
      },
      update: {},
      delete: {},
    },
    user: {
      add: {
        follow: `/users/follow/${parameter}`,
        relationship: `/users/relationships/add`,
        friendReq: `/users/friendRequests/add`,
        gymProfile: `/users/gymProfile/add`,
      },
      get: {
        all: `/users/`,
        withId: `/users/findById/${parameter}`,
        withUsername: `/users/findByUsername/${parameter}`,
        withEmail: `/users/findByEmail/${parameter}`,
        followers: `/users/followers/${parameter}`,
        followed: `/users/followed/${parameter}`,
        friendReq: `/users/friendRequests/${parameter}`,
        gymProfile: `/users/gymProfile/findByUserId/${parameter}`,
      },
      update: {
        user: `/users/update`,
        privateProfile: `/users/updatePrivateProfile`,
        password: `/users/updatePassword`,
        profilePic: `/users/updateProfilePic`,
        gymProfile: `/users/gymProfile/update`,
      },
      delete: {
        unfollow: `/users/unfollow/${parameter}`,
        relationship: `/users/relationships/delete`,
        friendReq: `/users/friendRequests/delete`,
      },
    },
    post: {
      add: { upload: `/posts/add` },
      get: {
        withId: `/posts/find/${parameter}`,
        all: `/posts/all/${parameter}`,
      },
      update: {},
      delete: {},
    },
    story: {
      add: { upload: `/stories/add` },
      get: {
        withId: `/stories/find/${parameter}`,
        all: `/stories/all/${parameter}`,
        followed: `/stories/followed/${parameter}`,
      },
      update: {},
      delete: {},
    },
    setting: {
      get: { all: `/settings/getall`, withKey: `/settings/get/${parameter}` },
      add: { setting: `/settings/add` },
      update: { setting: `/settings/update` },
      delete: {},
    },
    message: {
      add: {
        sendText: `/messages/send`,
        sendAttachment: `/messages/sendAttachment`,
      },
      get: {
        all: `/messages/`,
        list: `/messages/list`,
        fromUser: `/messages/${parameter}`,
      },
      update: {},
      delete: {},
    },
    like: {
      add: {
        post: `/likes/post/add`,
        comment: `/likes/comment/add`,
        story: `/likes/story/add`,
      },
      get: {
        fromPost: `/likes/get/post/${parameter}`,
        fromComment: `/likes/get/comment/${parameter}`,
        fromStory: `/likes/get/story/${parameter}`,
        numFromPost: `/likes/getnum/post/${parameter}`,
        numFromComment: `/likes/getnum/comment/${parameter}`,
        numFromStory: `/likes/getnum/story/${parameter}`,
      },
      update: {},
      delete: {
        post: `/likes/post/delete/${parameter}`,
        comment: `/likes/comment/delete/${parameter}`,
        story: `/likes/story/delete/${parameter}`,
      },
    },
    comment: {
      add: {
        post: `/comments/post/add`,
        comment: `/comments/comment/add`,
        story: `/comments/story/add`,
      },
      get: {
        fromPost: `/comments/get/post/${parameter}`,
        fromComment: `/comments/get/comment/${parameter}`,
        fromStory: `/comments/get/story/${parameter}`,
        numFromPost: `/comments/getnum/post/${parameter}`,
        numFromComment: `/comments/getnum/comment/${parameter}`,
        numFromStory: `/comments/getnum/story/${parameter}`,
      },
      update: {},
      delete: {
        post: `/comments/post/delete/${parameter}`,
        comment: `/comments/comment/delete/${parameter}`,
        story: `/comments/story/delete/${parameter}`,
      },
    },
    auth: {
      add: {
        register: `/auth/register`,
        login: `/auth/login`,
        logout: `/auth/logout`,
      },
      get: {},
      update: {},
      delete: {},
    },
  };
};
