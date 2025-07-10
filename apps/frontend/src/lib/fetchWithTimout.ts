export async function fetchWithTimeout(url: string, timeout = 200): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
    });
    return res;
  } finally {
    clearTimeout(timer);
  }
}
