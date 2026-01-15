import * as React from 'react';
import type { SVGProps } from 'react';
const SvgArrowUp = (props: SVGProps<SVGSVGElement>) => (
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
      d='M10 4.963 5 0 0 4.963z'
    />
  </svg>
);
export default SvgArrowUp;
