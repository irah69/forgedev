/**
 * Normalizes common Spring Data "Page" JSON responses and plain arrays.
 *
 * @template T
 * @param {any} raw
 * @returns {{ items: T[], page: number, size: number, totalItems: number, totalPages: number }}
 */
export function normalizePage(raw) {
  if (!raw) {
    return { items: [], page: 0, size: 0, totalItems: 0, totalPages: 0 };
  }

  // Spring Data Page
  if (Array.isArray(raw.content)) {
    const items = raw.content;
    const page = typeof raw.number === "number" ? raw.number : 0;
    const size = typeof raw.size === "number" ? raw.size : items.length;
    const totalItems = typeof raw.totalElements === "number" ? raw.totalElements : items.length;
    const totalPages = typeof raw.totalPages === "number" ? raw.totalPages : 1;
    return { items, page, size, totalItems, totalPages };
  }

  // Generic wrapper: { data: [...] } or { items: [...] }
  if (Array.isArray(raw.data)) {
    return { items: raw.data, page: 0, size: raw.data.length, totalItems: raw.data.length, totalPages: 1 };
  }
  if (Array.isArray(raw.items)) {
    return { items: raw.items, page: 0, size: raw.items.length, totalItems: raw.items.length, totalPages: 1 };
  }

  // Plain array
  if (Array.isArray(raw)) {
    return { items: raw, page: 0, size: raw.length, totalItems: raw.length, totalPages: 1 };
  }

  return { items: [], page: 0, size: 0, totalItems: 0, totalPages: 0 };
}

