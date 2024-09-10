import type { CvData } from '../types/cv';
import type { Content } from '../types/content';

export type Locale = 'es' | 'en';

export const localesConfig: Record<Locale, { cv: () => Promise<{ default: CvData }>; content: () => Promise<{ default: Content }>; }> = {
  es: {
    cv: () => import('@cv-es'),
    content: () => import('@content-es'),
  },
  en: {
    cv: () => import('@cv-en'),
    content: () => import('@content-en'),
  },
};
