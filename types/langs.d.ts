declare module "langs" {
  const langs: {
    where(type: string, value: string): { name?: string } | undefined;
  };

  export default langs;
}
