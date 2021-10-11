export type MappedValue = {
  en: string;
  ar: string;
  isWaitingFix?: boolean;
};

export type OutputType = {
  [key: string]: MappedValue;
};
