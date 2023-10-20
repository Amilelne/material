declare module '@joy/work-front/dist/ssr/index.js' {
  export const getPageSSRData: (name: string) => Promise<{ Page: unknown; css: string }>;
}