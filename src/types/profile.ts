interface IUserProfile {
  user_key: string;
  user_name: string;
  bio: string;
}

interface IUserEmail {
  email: string;
  is_default: boolean;
}

interface IUserUrl {
  url: string;
}

type UserProfileWithEmails = IUserProfile & { emails: IUserEmail[] } & { urls: IUserUrl[] };

export type { IUserEmail, IUserUrl, UserProfileWithEmails };
