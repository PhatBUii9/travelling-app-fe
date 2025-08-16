export const timeAgo = (iso?: string) => {
  if (!iso) return "";
  const ms = Date.now() - new Date(iso).getTime();
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);
  const d = Math.floor(h / 24);
  if (d > 365) return `${Math.floor(d / 365)}y ago`;
  if (d > 30) return `${Math.floor(d / 30)}mo ago`;
  if (d > 7) return `${Math.floor(d / 7)}w ago`;
  if (d > 0) return `${d}d ago`;
  if (h > 0) return `${h}h ago`;
  if (m > 0) return `${m}m ago`;
  return `just now`;
};
