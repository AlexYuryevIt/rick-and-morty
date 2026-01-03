export type TErrorMessage = {
  message: string;
  refetch?: () => void;
  onGoBack?: () => void;
};
