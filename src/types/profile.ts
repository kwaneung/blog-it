interface IUserProfile {
  name?: string;
  bio?: string;
  avatar_url?: string;
}

interface IUserEmail {
  email: string;
}

interface IUserUrl {
  value: string;
}

type UserProfileWithUrls = Partial<IUserProfile> & { urls?: IUserUrl[] };

export type { IUserEmail, IUserProfile, IUserUrl, UserProfileWithUrls };
