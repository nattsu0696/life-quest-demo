(() => {
  const NS = "life-quest-demo";
  const BASE = "https://abacus.jasoncameron.dev";

  async function request(path) {
    const res = await fetch(`${BASE}${path}`, { method: "GET", mode: "cors" });
    if (!res.ok) throw new Error(`counter ${res.status}`);
    return res.json();
  }

  async function hit(key) {
    const data = await request(`/hit/${encodeURIComponent(NS)}/${encodeURIComponent(key)}`);
    return Number(data.value) || 0;
  }

  async function get(key) {
    const data = await request(`/get/${encodeURIComponent(NS)}/${encodeURIComponent(key)}`);
    return Number(data.value) || 0;
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
        if (el && (!el.textContent || el.textContent === "—" || el.textContent === "-")) {
          el.textContent = "—";
        }
        return null;
      }
    },
    async show(key, el) {
      try {
        const value = await get(key);
        setText(el, value);
        return value;
      } catch (_) {
        if (el) el.textContent = "—";
        return null;
      }
    }
  };
})();
