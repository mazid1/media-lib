export type ErrorBody = { error: boolean; message: string };

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
};
