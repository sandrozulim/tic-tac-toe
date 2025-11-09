export type ApiError = {
  errors: {
    path: string;
    code: string;
    message: string;
  }[];
};
