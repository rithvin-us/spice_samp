import { useEffect } from 'react';

interface Meta {
  title: string;
  description: string;
  image?: string;
}

const setTag = (selector: string, attr: string, value: string) => {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
};

/**
 * Per-route document metadata. A single-page build still owes crawlers and
 * shared links a correct title, description and preview image.
 */
export function useMeta({ title, description, image }: Meta): void {
  useEffect(() => {
    document.title = title;
    setTag('meta[name="description"]', 'content', description);
    setTag('meta[property="og:title"]', 'content', title);
    setTag('meta[property="og:description"]', 'content', description);
    if (image) setTag('meta[property="og:image"]', 'content', image);
  }, [title, description, image]);
}
