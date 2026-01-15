import * as React from 'react';
import type { SVGProps } from 'react';
const SvgArrowDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={10}
    height={5}
    fill='none'
    {...props}
  >
    <path
      fill='#000'
      fillOpacity={0.54}
      d='m0 0 5 4.963L10 0z'
    />
  </svg>
);
export default SvgArrowDown;
