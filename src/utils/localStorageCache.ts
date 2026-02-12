

export const readCacheFromStorage = <T>(cacheStorageKey: string): Record<string, T> => {
  try {
    const raw = localStorage.getItem(cacheStorageKey)
    if (!raw) {
      return {}
    }

    return JSON.parse(raw) as Record<string, T>
  } catch {
    return {}
  }
}

export const writeCacheToStorage = <T>(cacheStorageKey: string, cache: Record<string, T>) => {
  try {
    localStorage.setItem(cacheStorageKey, JSON.stringify(cache))
  } catch {
    // Ignore storage errors (e.g., private mode).
  }
}
