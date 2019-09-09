declare let cssExport: string
declare let mdExport: string
declare let pngExport: string
declare let jpgExport: string
declare let jepgExport: string
declare let gifExport: string

declare module '*.css' {
  export = cssExport
}

declare module '*.md' {
  export = mdExport
}

declare module '*.png' {
  export = pngExport
}

declare module '*.jpg' {
  export = jpgExport
}

declare module '*.jpeg' {
  export = jepgExport
}

declare module '*.gif' {
  export = gifExport
}

declare let svgExport: string

declare module '*.svg' {
  export default svgExport
}

declare module '*.msvg' {
  export = svgExport
}