export const joinClassNames = (...classNames: string[]): string => {
  return classNames.filter(Boolean).join(" ");
};
