(() => {
  const NS = "life-quest-demo";
  const BASES = [
    "https://abacus.jasoncameron.dev",
    "https://abacus.jsn.cam"
  ];
  const CACHE_KEY = "lq-counter-cache-v1";
  // Last known good totals (fallback when Abacus is down/flaky)
  const SEED = {
    "game-plays": 68,
    "mv-views": 118,
    "mv-downloads": 62
  };

  function readCache() {
    try {
      return JSON.parse(localStorage.getItem(CACHE_KEY) || "{}") || {};
    } catch (_) {
      return {};
    }
  }

  function writeCache(key, value) {
    try {
      const cache = readCache();
      cache[key] = Number(value) || 0;
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    } catch (_) {}
  }

  function cachedOrSeed(key) {
    const cache = readCache();
    const n = Number(cache[key]);
    if (Number.isFinite(n) && n > 0) return n;
    return Number(SEED[key]) || 0;
  }

  async function requestOnce(base, path) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 8000);
    try {
      const res = await fetch(`${base}${path}`, {
        method: "GET",
        mode: "cors",
        signal: ctrl.signal,
        cache: "no-store"
      });
      if (!res.ok) throw new Error(`counter ${res.status}`);
      return res.json();
    } finally {
      clearTimeout(timer);
    }
  }

  async function request(path) {
    let lastErr = null;
    for (const base of BASES) {
      for (let i = 0; i < 2; i += 1) {
        try {
          return await requestOnce(base, path);
        } catch (err) {
          lastErr = err;
        }
      }
    }
    throw lastErr || new Error("counter unavailable");
  }

  async function hit(key) {
    const data = await request(`/hit/${encodeURIComponent(NS)}/${encodeURIComponent(key)}`);
    const value = Number(data.value) || 0;
    writeCache(key, value);
    return value;
  }

  async function get(key) {
    const data = await request(`/get/${encodeURIComponent(NS)}/${encodeURIComponent(key)}`);
    const value = Number(data.value) || 0;
    writeCache(key, value);
    return value;
  }

  function format(n) {
    return Number(n || 0).toLocaleString("ja-JP");
  }

  function setText(el, value) {
    if (!el) return;
    el.textContent = format(value);
  }

  window.LQ_COUNTERS = {
    keys: {
      plays: "game-plays",
      mvViews: "mv-views",
      mvDownloads: "mv-downloads"
    },
    hit,
    get,
    format,
    setText,
    async bump(key, el) {
      try {
        const value = await hit(key);
        setText(el, value);
        return value;
      } catch (_) {
        const fallback = cachedOrSeed(key) + 1;
        writeCache(key, fallback);
        setText(el, fallback);
        return fallback;
      }
    },
    async show(key, el) {
      setText(el, cachedOrSeed(key));
      try {
        const value = await get(key);
        setText(el, value);
        return value;
      } catch (_) {
        setText(el, cachedOrSeed(key));
        return cachedOrSeed(key);
      }
    }
  };
})();
