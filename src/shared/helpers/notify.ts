import { toast } from 'react-toastify';

import type { TToast } from '@types';

const TOAST_OPTIONS = {
  position: 'bottom-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  theme: 'colored'
} as const;

export const notify = (message: string, type: TToast) => {
  toast[type](message, TOAST_OPTIONS);
};
