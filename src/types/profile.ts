interface IUserProfile {
  user_key: string;
  user_name: string;
  bio: string;
  url: string[];
}

interface IUserEmail {
  email: string;
  is_default: boolean;
}

export type { IUserProfile, IUserEmail };
