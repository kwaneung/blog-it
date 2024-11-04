interface IUserProfile {
  name: string;
  bio: string;
}

interface IUserEmail {
  email: string;
}

interface IUserUrl {
  value: string;
}

type UserProfileWithUrls = IUserProfile & { urls: IUserUrl[] };

export type { IUserEmail, IUserUrl, UserProfileWithUrls };
