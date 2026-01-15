import type { SVGProps } from 'react';
const SvgCheckmark = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={13}
    height={10}
    fill='none'
    {...props}
  >
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M12.312.293a1 1 0 0 1 0 1.414l-7.07 7.07a1 1 0 0 1-1.414 0L.293 5.242a1 1 0 0 1 1.414-1.414l2.828 2.828L10.898.293a1 1 0 0 1 1.414 0'
      clipRule='evenodd'
    />
  </svg>
);
export default SvgCheckmark;
