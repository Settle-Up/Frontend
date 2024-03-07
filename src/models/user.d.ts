type CurrentUser = {
  userId: string;
  userName?: string;
  userEmail?: string;
  accessToken?: string;
  issuedTime?: string;
  expiresIn?: number;
} | null;

type GeneralUser = {
  userId: string;
  userName?: string;
  userEmail: string;
};

