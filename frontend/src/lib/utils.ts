import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Convert Google Drive share URLs to direct-view URLs that work in <img src>
export function resolveImageUrl(originalUrl: string): string {
  if (!originalUrl) return originalUrl;
  try {
    const url = new URL(originalUrl);
    const host = url.hostname.toLowerCase();
    if (host.includes("drive.google.com")) {
      // patterns: /file/d/<id>/view or open?id=<id>
      const pathParts = url.pathname.split("/").filter(Boolean);
      const fileIndex = pathParts.indexOf("d");
      let id = "";
      if (pathParts.includes("file") && fileIndex !== -1 && pathParts[fileIndex + 1]) {
        id = pathParts[fileIndex + 1];
      } else if (url.searchParams.has("id")) {
        id = url.searchParams.get("id") || "";
      }
      if (id) {
        return `https://drive.google.com/uc?export=view&id=${id}`;
      }
    }
  } catch {
    // ignore parse errors and return original
  }
  // If it's a bare filename or relative path, serve from public root
  if (/^https?:\/\//i.test(originalUrl)) return originalUrl;
  if (originalUrl.startsWith("/")) return originalUrl;
  return `/${originalUrl}`;
}

// Extract Google Drive file id if present
export function extractGoogleDriveId(originalUrl: string): string | null {
  try {
    const url = new URL(originalUrl);
    if (!url.hostname.toLowerCase().includes("drive.google.com")) return null;
    const parts = url.pathname.split("/").filter(Boolean);
    const dIndex = parts.indexOf("d");
    if (parts.includes("file") && dIndex !== -1 && parts[dIndex + 1]) return parts[dIndex + 1];
    const idParam = url.searchParams.get("id");
    if (idParam) return idParam;
  } catch {}
  return null;
}

// Provide alternate Google Drive URL candidates to try when the first one fails
export function getGoogleDriveAlternateUrls(originalUrl: string): string[] {
  const id = extractGoogleDriveId(originalUrl);
  if (!id) return [];
  // Prefer thumbnail first (most reliable for hotlinking), then uc variants
  return [
    `https://drive.google.com/thumbnail?id=${id}&sz=w2000`,
    `https://drive.google.com/uc?export=view&id=${id}`,
    `https://drive.google.com/uc?id=${id}`,
  ];
}