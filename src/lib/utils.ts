export const formatDate = (date: string | undefined): string => {
  if (!date) return "";

  return new Date(date).toLocaleString();
};

export const cn = (...args: (string | undefined)[]): string => {
  return args.filter(Boolean).join(" ");
};
