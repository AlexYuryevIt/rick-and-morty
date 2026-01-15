import * as React from 'react';
import type { SVGProps } from 'react';
const SvgEdit = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={13}
    height={13}
    fill='none'
    {...props}
  >
    <path
      fill='#000'
      fillRule='evenodd'
      d='M7.706.622c.83-.83 2.175-.83 3.005 0l1.538 1.539c.83.83.83 2.175 0 3.005l-7.498 7.498a.7.7 0 0 1-.501.207H.708A.71.71 0 0 1 0 12.164V8.622c0-.188.075-.368.207-.501zm2.003 1.002a.71.71 0 0 0-1.002 0l-.622.623 2.54 2.54.622-.623a.71.71 0 0 0 0-1.002zm-.086 4.164-2.54-2.54-5.666 5.667v2.54h2.54z'
      clipRule='evenodd'
    />
  </svg>
);
export default SvgEdit;
