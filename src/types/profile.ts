interface IUserProfile {
  user_key: string;
  user_name: string;
  bio: string;
  urls: string[];
}

interface IUserEmail {
  email: string;
  is_default: boolean;
}

type UserProfileWithEmails = IUserProfile & { emails: IUserEmail[] };

export type { IUserEmail, UserProfileWithEmails };
