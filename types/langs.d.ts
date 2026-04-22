declare module "langs" {
  export type LangEntry = {
    "1"?: string;
    "2"?: string;
    "2B"?: string;
    "2T"?: string;
    "3"?: string;
    name?: string;
    local?: string;
  };

  const langs: {
    where(field: string, value: string): LangEntry | undefined;
  };

  export default langs;
}
