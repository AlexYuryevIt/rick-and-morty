import type { SVGProps } from 'react';
const SvgClose = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={10}
    height={10}
    fill='none'
    {...props}
  >
    <path
      fill='#000'
      fillRule='evenodd'
      d='M8.778.293a1 1 0 0 1 0 1.414L5.95 4.536l2.828 2.828a1 1 0 0 1-1.414 1.414L4.536 5.95 1.707 8.778A1 1 0 0 1 .293 7.364L3.12 4.536.293 1.707A1 1 0 0 1 1.707.293L4.536 3.12 7.364.293a1 1 0 0 1 1.414 0'
      clipRule='evenodd'
    />
  </svg>
);
export default SvgClose;
