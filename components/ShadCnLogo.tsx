import * as React from "react";
import type { SVGProps } from "react";
const ShadCnLogo = (props: SVGProps<SVGSVGElement>) => (
  <div className="flex items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width="80"
      height="40"
      {...props}
    >
      <path fill="none" d="M0 0h256v256H0z" />
      <path fill="none" stroke="#fff" d="M208 128l-80 80M192 40L40 192" />
    </svg>
    <span className="font-bold">Shadcnui</span>
  </div>
);
export default ShadCnLogo;
