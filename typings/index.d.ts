declare module '*.less' {
  const content: any;
  export default content;
}
declare module '*.css' {
  const content: string;
  export default content;
}

declare module 'next/head' {
  const m: any;
  export default m;
}

declare module 'next/router' {
  const m: any;
  export default m;
}

declare module 'next-routes' {
  const m: any;
  export default m;
}

declare namespace JSX {
  interface IntrinsicElements {
    style: React.HTMLProps<HTMLStyleElement> | { jsx: boolean };
  }
}
