export type TErrorMessage = {
  message: string;
  refetch?: () => void;
  onResetFilters?: () => void;
};
