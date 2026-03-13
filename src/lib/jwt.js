function base64UrlDecode(input) {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "===".slice((base64.length + 3) % 4);
  // atob exists in browser only; decode on client
  const json = atob(padded);
  try {
    return decodeURIComponent(
      json
        .split("")
        .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join("")
    );
  } catch {
    return json;
  }
}

/**
 * Decodes JWT payload for UI-only decisions (do NOT trust it for security).
 * @param {string} token
 * @returns {any | null}
 */
export function decodeJwtPayload(token) {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length < 2) return null;
  try {
    const payload = base64UrlDecode(parts[1]);
    return JSON.parse(payload);
  } catch {
    return null;
  }
}

/**
 * @param {any} payload
 * @returns {string[]}
 */
export function extractRoles(payload) {
  if (!payload || typeof payload !== "object") return [];

  const candidates = [
    payload.roles,
    payload.authorities,
    payload.scopes,
    payload.scope,
    payload.role,
  ];

  const roles = new Set();

  for (const c of candidates) {
    if (!c) continue;
    if (Array.isArray(c)) {
      c.forEach((v) => typeof v === "string" && roles.add(v));
    } else if (typeof c === "string") {
      c.split(/[ ,]+/).forEach((v) => v && roles.add(v));
    }
  }

  return Array.from(roles);
}

