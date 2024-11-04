interface IUserProfile {
  name: string;
  email: string;
  bio: string;
}

interface IUserEmail {
  email: string;
}

interface IUserUrl {
  url: string;
}

type UserProfileWithEmails = IUserProfile & { emails: IUserEmail[] } & { urls: IUserUrl[] };

export type { IUserEmail, IUserUrl, UserProfileWithEmails };
