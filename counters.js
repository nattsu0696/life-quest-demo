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

  // bump と show の競合で数字が戻らないようにする
  const localMax = Object.create(null);
  const pendingShow = Object.create(null);

  function readCache() {
    try {
      return JSON.parse(localStorage.getItem(CACHE_KEY) || "{}") || {};
    } catch (_) {
      return {};
    }
  }

  function writeCache(key, value) {
    try {
      const n = Number(value) || 0;
      const cache = readCache();
      cache[key] = n;
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
      localMax[key] = Math.max(Number(localMax[key]) || 0, n);
    } catch (_) {}
  }

  function cachedOrSeed(key) {
    const cache = readCache();
    const cached = Number(cache[key]);
    const seed = Number(SEED[key]) || 0;
    const local = Number(localMax[key]) || 0;
    const vals = [local, seed];
    if (Number.isFinite(cached) && cached >= 0) vals.push(cached);
    return Math.max(...vals);
  }

  async function requestOnce(base, path) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 7000);
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
      try {
        return await requestOnce(base, path);
      } catch (err) {
        lastErr = err;
      }
    }
    throw lastErr || new Error("counter unavailable");
  }

  async function hit(key) {
    const data = await request(`/hit/${encodeURIComponent(NS)}/${encodeURIComponent(key)}`);
    const value = Number(data.value) || 0;
    writeCache(key, Math.max(value, cachedOrSeed(key)));
    return Math.max(value, cachedOrSeed(key));
  }

  async function get(key) {
    const data = await request(`/get/${encodeURIComponent(NS)}/${encodeURIComponent(key)}`);
    const value = Number(data.value) || 0;
    writeCache(key, Math.max(value, cachedOrSeed(key)));
    return Math.max(value, cachedOrSeed(key));
  }

  function format(n) {
    return Number(n || 0).toLocaleString("ja-JP");
  }

  function setText(el, value) {
    if (!el) return;
    el.textContent = format(value);
  }

  function applyValue(key, el, value) {
    const n = Math.max(Number(value) || 0, cachedOrSeed(key));
    writeCache(key, n);
    setText(el, n);
    return n;
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
      // 先に画面を+1して、遅いAPIや後続の show に戻されないようにする
      const optimistic = cachedOrSeed(key) + 1;
      applyValue(key, el, optimistic);
      pendingShow[key] = (pendingShow[key] || 0) + 1;
      const token = pendingShow[key];
      try {
        const value = await hit(key);
        if (pendingShow[key] !== token && value < cachedOrSeed(key)) {
          setText(el, cachedOrSeed(key));
          return cachedOrSeed(key);
        }
        return applyValue(key, el, value);
      } catch (_) {
        return applyValue(key, el, optimistic);
      }
    },
    async show(key, el) {
      const baseline = cachedOrSeed(key);
      setText(el, baseline);
      const token = pendingShow[key] || 0;
      try {
        const value = await get(key);
        // bump が先に進んでいたら、古い get 結果で上書きしない
        if ((pendingShow[key] || 0) !== token) {
          setText(el, cachedOrSeed(key));
          return cachedOrSeed(key);
        }
        return applyValue(key, el, value);
      } catch (_) {
        setText(el, cachedOrSeed(key));
        return cachedOrSeed(key);
      }
    }
  };
})();
