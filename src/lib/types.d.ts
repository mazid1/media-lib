export type ErrorBody = { error: boolean; message: string };

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
};

type GetFavoritesOutput = {
  MOVIE?: Favorite[];
  ANIME?: Favorite[];
};

type CreateFavoriteInput = {
  mediaType: MediaType;
  mediaId: string;
};

type DeleteFavoriteInput = {
  id: number;
};
