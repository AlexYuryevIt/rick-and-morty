import type { SVGProps } from 'react';
const SvgMoon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    fill='none'
    {...props}
  >
    <path
      fill='#CACACA'
      d='M14.73 18.129c-5.335 0-9.66-4.325-9.66-9.66C5.07 4.79 7.15 1.63 10.176 0 4.44.726 0 5.614 0 11.547 0 17.981 5.216 23.2 11.651 23.2c5.934 0 10.82-4.441 11.548-10.177-1.632 3.027-4.792 5.106-8.47 5.106'
    />
    <path
      fill='#CACACA'
      d='m15.92 14.314 2.043-1.075 2.044 1.075-.39-2.275 1.652-1.612-2.284-.332-1.022-2.07-1.022 2.07-2.283.332 1.652 1.612z'
    />
  </svg>
);
export default SvgMoon;
