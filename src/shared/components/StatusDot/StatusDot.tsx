type TStatusDotProps = {
  color: string;
};

export const StatusDot = ({ color }: TStatusDotProps) => (
  <span
    className={`
      inline-block h-2.5 w-2.5 rounded-full
      ${color === 'green' ? 'bg-green-500' : ''}
      ${color === 'red' ? 'bg-red-500' : ''}
      ${color === 'orange' ? 'bg-orange-400' : ''}
    `}
  />
);
