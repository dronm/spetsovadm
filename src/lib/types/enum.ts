import { Locale } from "./locale";

export type Enum = Record<string, Partial<Record<Locale, string>>>;
