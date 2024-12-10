/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
declare module "*.svg" {
    import React = require("react");
    const src: React.FC<React.SVGProps<SVGSVGElement>>;
    export default src;
}
