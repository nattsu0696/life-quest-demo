(() => {
  const GATE_KEY = "life-quest-gate";
  const GATE_PASS = "わたぴー";
  const INSTALL_TIP_KEY = "life-quest-install-tip";
  const gateEl = document.getElementById("gate");
  const appEl = document.getElementById("app");
  const gateForm = document.getElementById("gate-form");
  const gateInput = document.getElementById("gate-input");
  const gateError = document.getElementById("gate-error");
  const rotateHint = document.getElementById("rotate-hint");
  const fsBtn = document.getElementById("fs-btn");
  const installTip = document.getElementById("install-tip");
  const installTipOk = document.getElementById("install-tip-ok");

  function isStandaloneMode() {
    return window.matchMedia("(display-mode: standalone)").matches
      || window.matchMedia("(display-mode: fullscreen)").matches
      || window.matchMedia("(display-mode: minimal-ui)").matches
      || window.navigator.standalone === true;
  }

  function isFullscreenMode() {
    return !!(document.fullscreenElement || document.webkitFullscreenElement);
  }

  function isTypingTarget(el) {
    if (!el || el === document.body) return false;
    const tag = (el.tagName || "").toLowerCase();
    return tag === "input" || tag === "textarea" || tag === "select" || el.isContentEditable;
  }

  function syncDisplayMode() {
    const standalone = isStandaloneMode();
    const fullscreen = isFullscreenMode();
    document.documentElement.classList.toggle("is-standalone", standalone);
    document.documentElement.classList.toggle("is-fullscreen", fullscreen);
    if (standalone && installTip) installTip.hidden = true;
    // ホーム画面起動なら帯は出ない。Safari内だけ全画面ボタンを出す
    if (fsBtn) {
      fsBtn.hidden = standalone || fullscreen || !document.documentElement.classList.contains("is-unlocked");
    }
  }

  function syncOrientation() {
    // キーボード表示中は縦判定しない（合言葉入力直後に画面が消える対策）
    if (isTypingTarget(document.activeElement)) {
      syncDisplayMode();
      return;
    }
    const landscape = window.innerWidth >= window.innerHeight;
    document.documentElement.classList.toggle("is-landscape", landscape);
    document.documentElement.classList.toggle("is-portrait", !landscape);
    const unlocked = document.documentElement.classList.contains("is-unlocked");
    if (rotateHint) {
      rotateHint.hidden = !(unlocked && !landscape);
    }
    syncDisplayMode();
  }

  function requestAppFullscreen() {
    if (isStandaloneMode() || isFullscreenMode()) {
      syncDisplayMode();
      return;
    }
    try {
      const root = document.documentElement;
      let result;
      if (root.requestFullscreen) {
        try {
          result = root.requestFullscreen({ navigationUI: "hide" });
        } catch (_) {
          result = root.requestFullscreen();
        }
      } else if (root.webkitRequestFullscreen) {
        root.webkitRequestFullscreen();
      } else if (root.webkitRequestFullScreen) {
        root.webkitRequestFullScreen();
      }
      if (result && typeof result.catch === "function") {
        result.catch(() => syncDisplayMode());
      }
    } catch (_) {
      // iPhone Safari はホーム画面追加が本命
    }
    window.setTimeout(syncDisplayMode, 120);
  }

  function maybeShowInstallTip() {
    if (isStandaloneMode()) return;
    try {
      if (sessionStorage.getItem(INSTALL_TIP_KEY) === "ok") return;
    } catch (_) {}
    if (installTip) installTip.hidden = false;
  }

  function hideInstallTip() {
    if (installTip) installTip.hidden = true;
    try { sessionStorage.setItem(INSTALL_TIP_KEY, "ok"); } catch (_) {}
  }

  function unlockApp() {
    try {
      if (gateInput) gateInput.blur();
      if (document.activeElement && typeof document.activeElement.blur === "function") {
        document.activeElement.blur();
      }
    } catch (_) {}
    if (gateEl) gateEl.hidden = true;
    if (appEl) appEl.hidden = false;
    document.documentElement.classList.add("is-unlocked");
    // いったん横扱いしてタイトルを必ず出す（キーボード閉じ待ちで固まらない）
    document.documentElement.classList.add("is-landscape");
    document.documentElement.classList.remove("is-portrait");
    if (rotateHint) rotateHint.hidden = true;
    syncDisplayMode();
    window.setTimeout(() => {
      syncOrientation();
      maybeShowInstallTip();
    }, 350);
  }

  function showGate() {
    if (gateEl) gateEl.hidden = false;
    if (appEl) appEl.hidden = true;
    document.documentElement.classList.remove("is-unlocked");
    if (rotateHint) rotateHint.hidden = true;
    if (gateInput) {
      gateInput.value = "";
      setTimeout(() => gateInput.focus(), 50);
    }
  }

  try {
    if (sessionStorage.getItem(GATE_KEY) === "ok") unlockApp();
    else showGate();
  } catch (_) {
    showGate();
  }

  window.addEventListener("resize", syncOrientation, { passive: true });
  window.addEventListener("orientationchange", () => {
    window.setTimeout(syncOrientation, 80);
  });
  document.addEventListener("fullscreenchange", syncDisplayMode);
  document.addEventListener("webkitfullscreenchange", syncDisplayMode);
  syncOrientation();

  if (fsBtn) {
    fsBtn.addEventListener("click", (event) => {
      event.preventDefault();
      requestAppFullscreen();
    });
  }
  if (installTipOk) {
    installTipOk.addEventListener("click", (event) => {
      event.preventDefault();
      hideInstallTip();
      requestAppFullscreen();
    });
  }

  if (gateForm) {
    gateForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const value = (gateInput?.value || "").trim();
      if (value === GATE_PASS) {
        try { sessionStorage.setItem(GATE_KEY, "ok"); } catch (_) {}
        if (gateError) gateError.hidden = true;
        unlockApp();
        // ホーム画面起動では全画面API不要（逆に不安定になる）
        if (!isStandaloneMode()) requestAppFullscreen();
        return;
      }
      if (gateError) gateError.hidden = false;
      if (gateInput) {
        gateInput.select();
        gateInput.focus();
      }
    });
  }

  const data = window.LIFE_QUEST;
  if (!data || !data.categories) return;

  const screens = {
    start: document.getElementById("screen-start"),
    saves: document.getElementById("screen-saves"),
    profile: document.getElementById("screen-profile"),
    hub: document.getElementById("screen-hub"),
    map: document.getElementById("screen-map"),
    branch: document.getElementById("screen-branch"),
    play: document.getElementById("screen-play"),
    result: document.getElementById("screen-result")
  };

  const SAVE_STORAGE_KEY = "life-quest-saves-v1";
  const SAVE_SLOT_COUNT = 3;
  const TRAIT_LABELS = {
    study: "勉強が好き",
    craft: "手を動かすのが好き",
    social: "人と話すのが好き",
    brave: "新しいことに飛び込む"
  };

  const STAT_LABELS = {
    intellect: "知力",
    skill: "技術",
    social: "社交",
    courage: "勇気",
    calm: "冷静",
    stamina: "体力"
  };

  const ROOM_TIERS = [
    {
      id: 0,
      bg: "assets/backgrounds/bg-room-01-teen.jpg",
      label: "自分の部屋",
      hint: "まだ始まったばかりの、等身大の部屋"
    },
    {
      id: 1,
      bg: "assets/backgrounds/bg-room-02-study.jpg",
      label: "学びの部屋",
      hint: "本とノートが増えて、少し整ってきた"
    },
    {
      id: 2,
      bg: "assets/backgrounds/bg-room-03-start.jpg",
      label: "ひとり暮らしのはじまり",
      hint: "初めての部屋。家具は必要最低限"
    },
    {
      id: 3,
      bg: "assets/backgrounds/bg-room-04-work.jpg",
      label: "仕事のある暮らし",
      hint: "安定した収入で、部屋に余裕が出てきた"
    },
    {
      id: 4,
      bg: "assets/backgrounds/bg-room-05-career.jpg",
      label: "キャリアの部屋",
      hint: "仕事の成果が、住む景色にも表れている"
    },
    {
      id: 5,
      bg: "assets/backgrounds/bg-room-06-success.jpg",
      label: "ゆとりのある家",
      hint: "選んできた人生が、広い部屋になっている"
    }
  ];

  const HUB_ACTIONS = {
    study: {
      key: "intellect",
      gain: 2,
      cost: 1,
      title: "勉強する",
      kicker: "STUDY",
      img: "assets/actions/action-study.jpg",
      msg: "机に向かった。知力が少し上がった。"
    },
    craft: {
      key: "skill",
      gain: 2,
      cost: 1,
      title: "手を動かす",
      kicker: "CRAFT",
      img: "assets/actions/action-craft.jpg",
      msg: "手を動かして作った。技術が少し上がった。"
    },
    talk: {
      key: "social",
      gain: 2,
      cost: 1,
      title: "人と話す",
      kicker: "TALK",
      img: "assets/actions/action-talk.jpg",
      msg: "人と話した。社交性が少し上がった。"
    },
    brave: {
      key: "courage",
      gain: 2,
      cost: 1,
      title: "挑戦する",
      kicker: "CHALLENGE",
      img: "assets/actions/action-brave.jpg",
      msg: "一歩踏み出した。勇気が少し上がった。"
    },
    rest: {
      key: "stamina",
      gain: 3,
      cost: 0,
      title: "休む",
      kicker: "REST",
      img: "assets/actions/action-rest.jpg",
      msg: "しっかり休んだ。体力が戻った。"
    }
  };

  const saveSlotList = document.getElementById("save-slot-list");
  const profileForm = document.getElementById("profile-form");
  const profileNameInput = document.getElementById("profile-name");
  const profileError = document.getElementById("profile-error");
  const profileSubmit = document.getElementById("profile-submit");
  const hubRoomBg = document.getElementById("hub-room-bg");
  const hubAvatar = document.getElementById("hub-avatar");
  const hubName = document.getElementById("hub-name");
  const hubAge = document.getElementById("hub-age");
  const hubRoomLabel = document.getElementById("hub-room-label");
  const hubRoomHint = document.getElementById("hub-room-hint");
  const hubStats = document.getElementById("hub-stats");
  const hubToast = document.getElementById("hub-toast");
  const hubActionOverlay = document.getElementById("hub-action-overlay");
  const hubActionImg = document.getElementById("hub-action-img");
  const hubActionKicker = document.getElementById("hub-action-kicker");
  const hubActionTitle = document.getElementById("hub-action-title");
  const hubActionText = document.getElementById("hub-action-text");
  const hubActionOk = document.getElementById("hub-action-ok");
  let pendingNewSlot = null;
  let hubToastTimer = null;
  let hubActionBusy = false;

  const stage = document.getElementById("stage");
  const stageBgPhoto = document.getElementById("stage-bg-photo");
  const pathLabel = document.getElementById("path-label");
  const sceneKicker = document.getElementById("scene-kicker");
  const nameplate = document.getElementById("nameplate");
  const dialogueText = document.getElementById("dialogue-text");
  const dialogueBox = document.getElementById("dialogue-box");
  const dialogueCursor = document.getElementById("dialogue-cursor");
  const choiceList = document.getElementById("choice-list");
  const actorTag = document.getElementById("actor-tag");
  const actor = document.getElementById("actor");
  const actorImg = document.getElementById("actor-img");
  const resultKicker = document.getElementById("result-kicker");
  const resultTitle = document.getElementById("result-title");
  const resultBody = document.getElementById("result-body");
  const realityActions = document.getElementById("reality-actions");
  const dots = [
    document.getElementById("dot-0"),
    document.getElementById("dot-1"),
    document.getElementById("dot-2")
  ];

  const placeLayer = document.getElementById("place-layer");
  const playerEl = document.getElementById("player");
  const mapGuide = document.getElementById("map-guide");
  const enterPrompt = document.getElementById("enter-prompt");
  const enterTitle = document.getElementById("enter-title");
  const enterHint = document.getElementById("enter-hint");
  const enterPortrait = document.getElementById("enter-portrait");
  const enterBtn = document.getElementById("enter-btn");
  const joystick = document.getElementById("joystick");
  const knob = document.getElementById("joystick-knob");

  const branchList = document.getElementById("branch-list");
  const branchTitle = document.getElementById("branch-title");
  const branchNote = document.getElementById("branch-note");
  const branchKicker = document.getElementById("branch-kicker");
  const branchPortrait = document.getElementById("branch-portrait");
  const branchChip = document.getElementById("branch-chip");
  const lifeEventOverlay = document.getElementById("life-event-overlay");
  const lifeEventLabel = document.getElementById("life-event-label");
  const lifeEventIcon = document.getElementById("life-event-icon");
  const lifeEventTitle = document.getElementById("life-event-title");
  const lifeEventText = document.getElementById("life-event-text");
  const lifeEventBtn = document.getElementById("life-event-btn");

  const state = {
    categoryId: null,
    optionId: null,
    sceneId: "start",
    depth: 0,
    phase: "title",
    typing: false,
    typeTimer: null,
    fullText: "",
    currentChoices: [],
    cleared: new Set(),
    seenEvents: new Set(),
    mapActive: false,
    nearbyId: null,
    eventContinue: null,
    activeSlot: null,
    save: null
  };

  function baseStats() {
    return {
      intellect: 10,
      skill: 10,
      social: 10,
      courage: 10,
      calm: 10,
      stamina: 12
    };
  }

  function statsForTrait(trait) {
    const stats = baseStats();
    if (trait === "study") stats.intellect += 5;
    if (trait === "craft") stats.skill += 5;
    if (trait === "social") stats.social += 5;
    if (trait === "brave") stats.courage += 5;
    return stats;
  }

  function readSaveSlots() {
    try {
      const raw = localStorage.getItem(SAVE_STORAGE_KEY);
      if (!raw) return Array(SAVE_SLOT_COUNT).fill(null);
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return Array(SAVE_SLOT_COUNT).fill(null);
      const slots = Array(SAVE_SLOT_COUNT).fill(null);
      for (let i = 0; i < SAVE_SLOT_COUNT; i += 1) {
        slots[i] = parsed[i] || null;
      }
      return slots;
    } catch (_) {
      return Array(SAVE_SLOT_COUNT).fill(null);
    }
  }

  function writeSaveSlots(slots) {
    try {
      localStorage.setItem(SAVE_STORAGE_KEY, JSON.stringify(slots));
      return true;
    } catch (_) {
      window.alert("この端末にセーブできませんでした。ブラウザの保存設定を確認してください。");
      return false;
    }
  }

  function formatSaveTime(iso) {
    if (!iso) return "";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  function avatarForGender(gender) {
    return gender === "boy" ? "assets/char-teen-boy.png" : "assets/char-teen-girl.png";
  }

  function ensureSaveShape(save) {
    if (!save.profile) save.profile = {};
    if (!save.profile.gender) save.profile.gender = "girl";
    if (!save.profile.age) save.profile.age = 15;
    if (!save.stats) save.stats = baseStats();
    Object.keys(baseStats()).forEach((key) => {
      if (typeof save.stats[key] !== "number") save.stats[key] = 10;
    });
    if (!save.week) save.week = 1;
    if (!Array.isArray(save.cleared)) save.cleared = [];
    if (!save.flags) save.flags = {};
    return save;
  }

  function statsTotal(stats) {
    return Object.values(stats || {}).reduce((sum, n) => sum + (Number(n) || 0), 0);
  }

  function roomTierFromSave(save) {
    const data = ensureSaveShape({ ...save, profile: { ...save.profile }, stats: { ...save.stats } });
    const age = data.profile.age || 15;
    const total = statsTotal(data.stats);
    let tier = 0;
    if (total >= 70) tier = 1;
    if (total >= 82) tier = 2;
    if (total >= 96) tier = 3;
    if (total >= 112) tier = 4;
    if (total >= 128) tier = 5;
    // 年齢で上限（大人になるほど上の部屋へ進める）
    if (age < 18) tier = Math.min(tier, 1);
    else if (age < 22) tier = Math.min(tier, 3);
    else if (age < 28) tier = Math.min(tier, 4);
    return ROOM_TIERS[tier] || ROOM_TIERS[0];
  }

  function createSaveData(slotIndex, profile) {
    return {
      version: 1,
      slot: slotIndex,
      updatedAt: new Date().toISOString(),
      profile: {
        name: profile.name,
        age: 15,
        gender: profile.gender || "girl",
        trait: profile.trait
      },
      stats: statsForTrait(profile.trait),
      week: 1,
      cleared: [],
      flags: {}
    };
  }

  function applySaveToRuntime(save, slotIndex) {
    state.activeSlot = slotIndex;
    state.save = ensureSaveShape(save);
    state.cleared = new Set(Array.isArray(state.save.cleared) ? state.save.cleared : []);
    state.seenEvents = new Set();
    state.categoryId = null;
    state.optionId = null;
    state.sceneId = "start";
    state.depth = 0;
    if (typeof map !== "undefined" && map) {
      map.x = 50;
      map.y = 48;
      map.vx = 0;
      map.vy = 0;
    }
    updatePlayerVisuals();
  }

  function persistActiveSave() {
    if (state.activeSlot === null || !state.save) return false;
    const slots = readSaveSlots();
    state.save = ensureSaveShape(state.save);
    state.save.updatedAt = new Date().toISOString();
    state.save.cleared = Array.from(state.cleared);
    slots[state.activeSlot] = state.save;
    return writeSaveSlots(slots);
  }

  function updatePlayerVisuals() {
    const nameEl = playerEl?.querySelector(".map-player-name");
    if (nameEl) nameEl.textContent = state.save?.profile?.name || "YOU";
    const img = playerEl?.querySelector(".map-player-img");
    const gender = state.save?.profile?.gender || "girl";
    const src = avatarForGender(gender);
    if (img) img.src = src;
    if (enterPortrait) enterPortrait.src = src;
  }

  function showHubToast(text) {
    if (!hubToast) return;
    hubToast.hidden = false;
    hubToast.textContent = text;
    if (hubToastTimer) window.clearTimeout(hubToastTimer);
    hubToastTimer = window.setTimeout(() => {
      hubToast.hidden = true;
    }, 2200);
  }

  function renderHub() {
    if (!state.save) return;
    const save = ensureSaveShape(state.save);
    const room = roomTierFromSave(save);
    if (hubRoomBg) hubRoomBg.style.backgroundImage = `url("${room.bg}")`;
    if (hubAvatar) hubAvatar.src = avatarForGender(save.profile.gender);
    if (hubName) hubName.textContent = save.profile.name || "—";
    if (hubAge) hubAge.textContent = `${save.profile.age || 15}歳 / 第${save.week || 1}週`;
    if (hubRoomLabel) hubRoomLabel.textContent = room.label;
    if (hubRoomHint) hubRoomHint.textContent = room.hint;
    if (hubStats) {
      hubStats.innerHTML = "";
      Object.keys(STAT_LABELS).forEach((key) => {
        const value = Math.max(0, Math.min(40, Number(save.stats[key]) || 0));
        const row = document.createElement("div");
        row.className = "hub-stat-row";
        row.innerHTML = `<span>${STAT_LABELS[key]}</span><div class="hub-stat-bar"><i style="width:${(value / 40) * 100}%"></i></div><span>${value}</span>`;
        hubStats.appendChild(row);
      });
    }
  }

  function openHub() {
    try {
      if (!state.save) {
        openSaveScreen();
        return;
      }
      if (!screens.hub) {
        window.alert("部屋画面が見つかりません。index.html を最新の ?v=29 でアップロードしてください。");
        return;
      }
      if (typeof hideLifeEvent === "function") hideLifeEvent();
      if (typeof applySceneBackground === "function") applySceneBackground(null);
      updatePlayerVisuals();
      renderHub();
      showScreen("hub");
      // 一部端末で1回目の切替が効かないことがあるため再適用
      window.requestAnimationFrame(() => {
        showScreen("hub");
        renderHub();
      });
    } catch (err) {
      console.error(err);
      window.alert("部屋画面を開けませんでした。ページを再読み込みして、もう一度お試しください。");
    }
  }

  function hideHubActionOverlay() {
    if (hubActionOverlay) hubActionOverlay.hidden = true;
    hubActionBusy = false;
    renderHub();
  }

  function showHubActionScene(def, extraNote) {
    if (!hubActionOverlay) {
      showHubToast(extraNote || def.msg);
      return;
    }
    hubActionBusy = true;
    if (hubActionImg) {
      hubActionImg.src = def.img;
      hubActionImg.alt = def.title;
    }
    if (hubActionKicker) hubActionKicker.textContent = def.kicker || "ACTION";
    if (hubActionTitle) hubActionTitle.textContent = def.title;
    if (hubActionText) hubActionText.textContent = extraNote || def.msg;
    hubActionOverlay.hidden = false;
  }

  function doHubAction(actionId) {
    if (!state.save || hubActionBusy) return;
    const def = HUB_ACTIONS[actionId];
    if (!def) return;
    const save = ensureSaveShape(state.save);
    const beforeRoom = roomTierFromSave(save).id;
    if (def.cost > 0) {
      save.stats.stamina = Math.max(1, (save.stats.stamina || 1) - def.cost);
    }
    save.stats[def.key] = Math.min(40, (save.stats[def.key] || 0) + def.gain);
    if (actionId !== "rest") {
      save.stats.calm = Math.min(40, (save.stats.calm || 0) + 1);
    }
    save.week = (save.week || 1) + 1;
    // だいたい8行動で1歳（デモ用の簡易進行）
    if (save.week > 0 && save.week % 8 === 0) {
      save.profile.age = Math.min(40, (save.profile.age || 15) + 1);
    }
    state.save = save;
    persistActiveSave();
    const afterRoom = roomTierFromSave(save).id;
    const note = afterRoom !== beforeRoom
      ? `${def.msg} 部屋の景色が変わった。`
      : def.msg;
    showHubActionScene(def, note);
    showHubToast(note);
  }

  function bindTap(el, handler) {
    if (!el) return;
    let touched = false;
    el.addEventListener(
      "touchend",
      (event) => {
        touched = true;
        event.preventDefault();
        handler(event);
        window.setTimeout(() => {
          touched = false;
        }, 400);
      },
      { passive: false }
    );
    el.addEventListener("click", (event) => {
      if (touched) {
        event.preventDefault();
        return;
      }
      handler(event);
    });
  }

  function openSaveScreen() {
    pendingNewSlot = null;
    const slots = readSaveSlots();
    const hasAny = slots.some((save) => save?.profile?.name);
    // まだ1件も無いときは、セーブ一覧を飛ばして15歳設定へ
    if (!hasAny) {
      openProfileScreen(0);
      return;
    }
    renderSaveSlots();
    showScreen("saves");
  }

  function openProfileScreen(slotIndex) {
    pendingNewSlot = slotIndex;
    if (profileForm) profileForm.dataset.slot = String(slotIndex);
    if (profileError) profileError.hidden = true;
    if (profileNameInput) {
      profileNameInput.value = "";
      // iPhoneでキーボードが遷移を邪魔しないよう、自動フォーカスはしない
    }
    const firstTrait = profileForm?.querySelector('input[name="trait"][value="study"]');
    if (firstTrait) firstTrait.checked = true;
    const girlGender = profileForm?.querySelector('input[name="gender"][value="girl"]');
    if (girlGender) girlGender.checked = true;
    showScreen("profile");
  }

  function startNewInSlot(slotIndex) {
    const slots = readSaveSlots();
    if (slots[slotIndex]) {
      const ok = window.confirm(`スロット${slotIndex + 1}のデータを消して、はじめからにしますか？`);
      if (!ok) return;
    }
    openProfileScreen(slotIndex);
  }

  function continueSlot(slotIndex) {
    const slots = readSaveSlots();
    const save = slots[slotIndex];
    if (!save || !save.profile?.name) {
      window.alert("このスロットにはデータがありません。");
      return;
    }
    applySaveToRuntime(save, slotIndex);
    openHub();
  }

  function deleteSlot(slotIndex) {
    const slots = readSaveSlots();
    if (!slots[slotIndex]) return;
    const name = slots[slotIndex].profile?.name || `スロット${slotIndex + 1}`;
    const ok = window.confirm(`「${name}」のセーブを消しますか？`);
    if (!ok) return;
    slots[slotIndex] = null;
    writeSaveSlots(slots);
    if (state.activeSlot === slotIndex) {
      state.activeSlot = null;
      state.save = null;
      state.cleared = new Set();
      updatePlayerVisuals();
    }
    renderSaveSlots();
  }

  function renderSaveSlots() {
    if (!saveSlotList) return;
    const slots = readSaveSlots();
    saveSlotList.innerHTML = "";
    slots.forEach((save, index) => {
      const card = document.createElement("article");
      card.className = `save-slot${save ? "" : " is-empty"}`;
      const main = document.createElement("div");
      main.className = "save-slot-main";
      const idx = document.createElement("p");
      idx.className = "save-slot-index";
      idx.textContent = `SLOT ${index + 1}`;
      const name = document.createElement("p");
      name.className = "save-slot-name";
      const meta = document.createElement("p");
      meta.className = "save-slot-meta";
      if (save?.profile?.name) {
        name.textContent = save.profile.name;
        const trait = TRAIT_LABELS[save.profile.trait] || "設定あり";
        const gender = save.profile.gender === "boy" ? "少年" : "少女";
        meta.textContent = `${save.profile.age || 15}歳 / ${gender} / ${trait} / 第${save.week || 1}週 ・ ${formatSaveTime(save.updatedAt)}`;
      } else {
        name.textContent = "データなし";
        meta.textContent = "はじめからで、15歳の自分を作成";
      }
      main.append(idx, name, meta);

      const actions = document.createElement("div");
      actions.className = "save-slot-actions";
      if (save?.profile?.name) {
        const cont = document.createElement("button");
        cont.type = "button";
        cont.className = "btn-start";
        cont.innerHTML = '<span class="btn-start-label">続きから</span>';
        bindTap(cont, () => continueSlot(index));
        const neu = document.createElement("button");
        neu.type = "button";
        neu.className = "hud-btn";
        neu.textContent = "15歳から作り直す";
        bindTap(neu, () => startNewInSlot(index));
        const del = document.createElement("button");
        del.type = "button";
        del.className = "hud-btn";
        del.textContent = "消す";
        bindTap(del, () => deleteSlot(index));
        actions.append(cont, neu, del);
      } else {
        const neu = document.createElement("button");
        neu.type = "button";
        neu.className = "btn-start";
        neu.innerHTML = '<span class="btn-start-label">15歳の自分を作る</span>';
        bindTap(neu, () => startNewInSlot(index));
        actions.append(neu);
      }

      card.append(main, actions);
      saveSlotList.appendChild(card);
    });
  }

  function finishProfile(event) {
    if (event && typeof event.preventDefault === "function") event.preventDefault();
    const slotFromForm = Number(profileForm?.dataset?.slot);
    const slotIndex = pendingNewSlot !== null && pendingNewSlot !== undefined
      ? pendingNewSlot
      : (Number.isFinite(slotFromForm) ? slotFromForm : 0);
    const name = (profileNameInput?.value || "").trim();
    if (!name) {
      if (profileError) profileError.hidden = false;
      return;
    }
    if (profileError) profileError.hidden = true;
    const traitInput = profileForm?.querySelector('input[name="trait"]:checked');
    const genderInput = profileForm?.querySelector('input[name="gender"]:checked');
    const trait = traitInput?.value || "study";
    const gender = genderInput?.value || "girl";
    try {
      const save = createSaveData(slotIndex, { name, trait, gender });
      const slots = readSaveSlots();
      slots[slotIndex] = save;
      if (!writeSaveSlots(slots)) return;
      applySaveToRuntime(save, slotIndex);
      pendingNewSlot = null;
      openHub();
    } catch (err) {
      console.error(err);
      window.alert("セーブに失敗しました。もう一度お試しください。");
    }
  }

  const map = {
    x: 50,
    y: 48,
    vx: 0,
    vy: 0,
    accel: 0.06,
    maxVel: 0.58,
    friction: 0.7,
    stickX: 0,
    stickY: 0,
    maxKnob: 38,
    deadzone: 0.16,
    pointerId: null,
    raf: 0,
    places: []
  };

  function curveStick(value) {
    const abs = Math.abs(value);
    if (abs < map.deadzone) return 0;
    const signed = value < 0 ? -1 : 1;
    const t = (abs - map.deadzone) / (1 - map.deadzone);
    return signed * t * t;
  }

  function findNearestPlace() {
    let nearest = null;
    let best = Infinity;
    map.places.forEach((place) => {
      const dist = Math.hypot(place.x - map.x, place.y - map.y);
      if (dist < best) {
        best = dist;
        nearest = place;
      }
    });
    return { nearest, best };
  }

  function getCategory(id) {
    return data.categories.find((c) => c.id === id);
  }

  function getOption(category, optionId) {
    return category.options.find((o) => o.id === optionId);
  }

  function currentCategory() {
    return getCategory(state.categoryId);
  }

  function currentOption() {
    const cat = currentCategory();
    if (!cat) return null;
    return getOption(cat, state.optionId);
  }

  function currentScenes() {
    const opt = currentOption();
    return opt ? opt.scenes : null;
  }

  function showScreen(name) {
    Object.entries(screens).forEach(([key, el]) => {
      if (!el) return;
      const active = key === name;
      el.classList.toggle("is-active", active);
      if (active) el.removeAttribute("hidden");
      else el.setAttribute("hidden", "");
      el.style.display = active ? "block" : "none";
    });

    if (name === "map") startMapLoop();
    else {
      stopMapLoop();
      resetJoystick();
    }
  }

  function setTheme(theme) {
    stage.className = `vn-stage theme-${theme || "bigco"}`;
  }

  function updateDots() {
    dots.forEach((dot, i) => {
      if (dot) dot.classList.toggle("is-on", i <= state.depth);
    });
  }

  function stopTyping() {
    if (state.typeTimer) {
      window.clearInterval(state.typeTimer);
      state.typeTimer = null;
    }
    state.typing = false;
  }

  function typeText(text) {
    stopTyping();
    state.fullText = text;
    state.typing = true;
    dialogueText.textContent = "";
    dialogueCursor.classList.add("is-hidden");
    choiceList.hidden = true;

    let i = 0;
    state.typeTimer = window.setInterval(() => {
      i += 1;
      dialogueText.textContent = text.slice(0, i);
      if (i >= text.length) {
        stopTyping();
        dialogueCursor.classList.remove("is-hidden");
      }
    }, 18);
  }

  function hideLifeEvent() {
    if (!lifeEventOverlay) return;
    lifeEventOverlay.hidden = true;
    lifeEventOverlay.classList.remove("is-visible");
  }

  function showLifeEvent(eventData, onContinue) {
    if (!lifeEventOverlay || !eventData) {
      onContinue();
      return;
    }

    lifeEventLabel.textContent = eventData.label || "LIFE EVENT";
    lifeEventIcon.textContent = eventData.icon || "!";
    lifeEventTitle.textContent = eventData.title || "イベント発生";
    lifeEventText.textContent = eventData.text || "";
    state.eventContinue = onContinue;
    lifeEventOverlay.hidden = false;
    lifeEventOverlay.classList.remove("is-visible");
    void lifeEventOverlay.offsetWidth;
    lifeEventOverlay.classList.add("is-visible");
  }

  function revealFullText() {
    if (!state.typing) return false;
    stopTyping();
    dialogueText.textContent = state.fullText;
    dialogueCursor.classList.remove("is-hidden");
    return true;
  }

  /* ========== MAP ========== */
  function categoryCleared(cat) {
    return cat.options.some((opt) => state.cleared.has(opt.id));
  }

  function buildPlaces() {
    if (!placeLayer) return;
    placeLayer.innerHTML = "";
    map.places = data.categories.map((cat) => {
      const el = document.createElement("button");
      el.type = "button";
      el.className = `map-place theme-${cat.theme}`;
      el.dataset.id = cat.id;
      el.style.left = `${cat.x}%`;
      el.style.top = `${cat.y}%`;
      el.innerHTML = `
        <span class="place-flag" aria-hidden="true">CLEAR</span>
        <span class="place-portrait-wrap">
          <img class="place-portrait" src="${cat.img}" alt="" />
        </span>
        <span class="place-label">${cat.short}</span>
      `;
      el.addEventListener("click", () => {
        if (state.nearbyId === cat.id) openBranch(cat.id);
      });
      placeLayer.appendChild(el);
      return { id: cat.id, x: cat.x, y: cat.y, el, cat };
    });
    refreshClearedFlags();
  }

  function refreshClearedFlags() {
    map.places.forEach((place) => {
      place.el.classList.toggle("is-cleared", categoryCleared(place.cat));
      place.el.classList.toggle("is-near", state.nearbyId === place.id);
    });
  }

  function openMap() {
    try {
      if (!state.save) {
        openSaveScreen();
        return;
      }
      if (!screens.map) {
        window.alert("マップ画面が見つかりません。ページを再読み込みしてください。");
        return;
      }
      if (!map.places.length) buildPlaces();
      else refreshClearedFlags();
      applySceneBackground(null);
      hideLifeEvent();
      state.nearbyId = null;
      if (enterPrompt) enterPrompt.hidden = true;
      updatePlayerVisuals();
      renderPlayer();
      updateNearby();
      showScreen("map");
    } catch (err) {
      console.error(err);
      window.alert("マップを開けませんでした。ページを再読み込みしてください。");
    }
  }

  function renderPlayer() {
    if (!playerEl) return;
    playerEl.style.left = `${map.x}%`;
    playerEl.style.top = `${map.y}%`;
    playerEl.classList.toggle("is-moving", Math.abs(map.stickX) + Math.abs(map.stickY) > 0.12);
    if (Math.abs(map.stickX) > 0.12) {
      playerEl.classList.toggle("face-left", map.stickX < 0);
    }
  }

  function updateNearby() {
    const { nearest, best } = findNearestPlace();
    const inRange = nearest && best < 15;
    const nextId = inRange ? nearest.id : null;

    if (nextId !== state.nearbyId) {
      state.nearbyId = nextId;
      refreshClearedFlags();
      if (nextId) {
        const cat = nearest.cat;
        enterTitle.textContent = cat.label;
        enterHint.textContent = cat.hint;
        if (enterPortrait) enterPortrait.src = cat.img;
        enterPrompt.hidden = false;
        mapGuide.textContent = "次は、もう一段くわしく選ぼう";
      } else {
        enterPrompt.hidden = true;
        mapGuide.textContent = "ぷにコンで歩いて、気になる人生へ近づこう";
      }
    }
  }

  function startMapLoop() {
    state.mapActive = true;
    map.vx = 0;
    map.vy = 0;
    if (map.raf) cancelAnimationFrame(map.raf);
    const tick = () => {
      if (!state.mapActive) return;

      const inputMag = Math.hypot(map.stickX, map.stickY);
      const nearSlow = state.nearbyId ? 0.75 : 1;
      const maxVel = map.maxVel * nearSlow;

      if (inputMag > 0.001) {
        map.vx += map.stickX * map.accel * nearSlow;
        map.vy += map.stickY * map.accel * nearSlow;
      } else {
        map.vx *= map.friction;
        map.vy *= map.friction;
        if (Math.hypot(map.vx, map.vy) < 0.02) {
          map.vx = 0;
          map.vy = 0;
        }
      }

      const vel = Math.hypot(map.vx, map.vy);
      if (vel > maxVel && vel > 0) {
        map.vx = (map.vx / vel) * maxVel;
        map.vy = (map.vy / vel) * maxVel;
      }

      if (map.vx || map.vy) {
        map.x = clamp(map.x + map.vx, 8, 92);
        map.y = clamp(map.y + map.vy, 12, 86);
      }

      const { nearest, best } = findNearestPlace();
      if (nearest && best < 14 && inputMag < 0.15) {
        map.x += (nearest.x - map.x) * 0.04;
        map.y += (nearest.y - map.y) * 0.04;
      }

      renderPlayer();
      updateNearby();
      map.raf = requestAnimationFrame(tick);
    };
    map.raf = requestAnimationFrame(tick);
  }

  function stopMapLoop() {
    state.mapActive = false;
    if (map.raf) {
      cancelAnimationFrame(map.raf);
      map.raf = 0;
    }
  }

  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }

  function resetJoystick() {
    map.stickX = 0;
    map.stickY = 0;
    map.vx = 0;
    map.vy = 0;
    map.pointerId = null;
    if (knob) knob.style.transform = "translate(-50%, -50%)";
    if (joystick) joystick.classList.remove("is-active");
  }

  function setStickFromEvent(event) {
    const rect = joystick.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    let dx = event.clientX - cx;
    let dy = event.clientY - cy;
    const dist = Math.hypot(dx, dy) || 1;
    const max = map.maxKnob;
    if (dist > max) {
      dx = (dx / dist) * max;
      dy = (dy / dist) * max;
    }
    map.stickX = curveStick(dx / max);
    map.stickY = curveStick(dy / max);
    knob.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
  }

  function bindJoystick() {
    if (!joystick || !knob) return;
    const onDown = (event) => {
      if (!state.mapActive) return;
      event.preventDefault();
      map.pointerId = event.pointerId;
      joystick.setPointerCapture(event.pointerId);
      joystick.classList.add("is-active");
      setStickFromEvent(event);
    };
    const onMove = (event) => {
      if (map.pointerId !== event.pointerId) return;
      event.preventDefault();
      setStickFromEvent(event);
    };
    const onUp = (event) => {
      if (map.pointerId !== event.pointerId) return;
      resetJoystick();
    };

    joystick.addEventListener("pointerdown", onDown);
    joystick.addEventListener("pointermove", onMove);
    joystick.addEventListener("pointerup", onUp);
    joystick.addEventListener("pointercancel", onUp);
  }

  /* ========== BRANCH ========== */
  function openBranch(categoryId) {
    const cat = getCategory(categoryId);
    if (!cat) return;
    state.categoryId = categoryId;
    enterPrompt.hidden = true;

    if (cat.options.length === 1) {
      startQuest(cat.options[0].id);
      return;
    }

    branchKicker.textContent = cat.label;
    branchTitle.textContent = cat.branchTitle;
    branchNote.textContent = cat.branchNote;
    branchChip.textContent = cat.short;
    if (branchPortrait) branchPortrait.src = cat.img;

    branchList.innerHTML = "";
    cat.options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "branch-card";
      if (state.cleared.has(opt.id)) btn.classList.add("is-cleared");
      btn.innerHTML = `
        <span class="branch-tag">${opt.tag || "OPTION"}</span>
        <span class="branch-label">${opt.label}</span>
        <span class="branch-blurb">${opt.blurb || ""}</span>
        <span class="branch-go">${state.cleared.has(opt.id) ? "CLEAR" : "GO"}</span>
      `;
      btn.addEventListener("click", () => startQuest(opt.id));
      branchList.appendChild(btn);
    });

    showScreen("branch");
  }

  /* ========== QUEST ========== */
  function applySceneBackground(bgPath) {
    if (!stage || !stageBgPhoto) return;
    if (bgPath) {
      stageBgPhoto.style.backgroundImage = `url("${bgPath}")`;
      stageBgPhoto.hidden = false;
      stage.classList.add("has-photo-bg");
    } else {
      stageBgPhoto.style.backgroundImage = "";
      stageBgPhoto.hidden = true;
      stage.classList.remove("has-photo-bg");
    }
  }

  function startQuest(optionId) {
    const cat = currentCategory();
    if (!cat) return;
    const opt = getOption(cat, optionId);
    if (!opt) return;

    state.optionId = optionId;
    state.sceneId = "start";
    state.depth = 0;
    state.seenEvents = new Set();
    hideLifeEvent();
    setTheme(cat.theme);
    renderScene();
  }

  function renderScene() {
    const cat = currentCategory();
    const opt = currentOption();
    const scenes = currentScenes();
    if (!cat || !opt || !scenes) return;

    const scene = scenes[state.sceneId];
    if (!scene) return;

    if (scene.ending) {
      renderResult(cat, opt, scene);
      return;
    }

    pathLabel.textContent = opt.label;
    sceneKicker.textContent = scene.kicker.replace("QUEST / ", "Q / ");
    const speaker = scene.speaker || cat.speaker;
    const sceneImage = scene.img || cat.img;
    nameplate.textContent = speaker;
    actorTag.textContent = speaker;
    if (actorImg) {
      actorImg.src = sceneImage;
      actorImg.alt = speaker;
    }
    applySceneBackground(scene.bg);
    updateDots();

    state.currentChoices = scene.choices || [];
    state.phase = "title";
    choiceList.hidden = true;
    choiceList.innerHTML = "";

    stage.classList.add("is-switching");
    window.setTimeout(() => stage.classList.remove("is-switching"), 280);

    if (actor) {
      actor.style.animation = "none";
      void actor.offsetWidth;
      actor.style.animation = "";
    }

    showScreen("play");

    const eventKey = `${state.optionId}:${state.sceneId}`;
    if (scene.event && !state.seenEvents.has(eventKey)) {
      state.seenEvents.add(eventKey);
      showLifeEvent(scene.event, () => typeText(scene.title));
    } else {
      hideLifeEvent();
      typeText(scene.title);
    }
  }

  function showBody() {
    const scenes = currentScenes();
    const scene = scenes[state.sceneId];
    state.phase = "body";
    typeText(scene.body);
  }

  function showChoices() {
    state.phase = "choices";
    dialogueCursor.classList.add("is-hidden");
    choiceList.innerHTML = "";
    state.currentChoices.forEach((choice, index) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "choice-btn";
      btn.innerHTML = `<span class="idx">0${index + 1}</span>${choice.label}`;
      btn.addEventListener("click", () => {
        state.sceneId = choice.next;
        state.depth += 1;
        renderScene();
      });
      choiceList.appendChild(btn);
    });
    choiceList.hidden = false;
  }

  function advanceDialogue() {
    if (revealFullText()) return;
    if (state.phase === "title") {
      showBody();
      return;
    }
    if (state.phase === "body") showChoices();
  }

  function renderResult(cat, opt, scene) {
    state.cleared.add(opt.id);
    persistActiveSave();
    resultKicker.textContent = scene.kicker;
    resultTitle.textContent = scene.title;
    resultBody.textContent = scene.body;

    realityActions.innerHTML = "";
    (scene.reality || []).forEach((item) => {
      const a = document.createElement("a");
      a.className = "reality-link";
      a.href = item.href;
      a.textContent = item.label;
      a.addEventListener("click", (event) => {
        event.preventDefault();
        const original = a.textContent;
        a.textContent = "本戦デモでは案内先を接続予定";
        window.setTimeout(() => {
          a.textContent = original;
        }, 1400);
      });
      realityActions.appendChild(a);
    });

    showScreen("result");
  }

  if (dialogueBox) dialogueBox.addEventListener("click", advanceDialogue);
  if (lifeEventBtn) {
    lifeEventBtn.addEventListener("click", () => {
      const next = state.eventContinue;
      state.eventContinue = null;
      hideLifeEvent();
      if (next) next();
    });
  }
  if (enterBtn) {
    enterBtn.addEventListener("click", () => {
      if (state.nearbyId) openBranch(state.nearbyId);
    });
  }

  function handleAction(action) {
    if (action === "to-map") openMap();
    if (action === "to-hub") openHub();
    if (action === "to-saves") {
      requestAppFullscreen();
      openSaveScreen();
    }
    if (action === "to-start") {
      stopMapLoop();
      resetJoystick();
      pendingNewSlot = null;
      showScreen("start");
    }
  }

  function bindActionButton(el) {
    if (!el) return;
    let touched = false;
    el.addEventListener(
      "touchend",
      (event) => {
        touched = true;
        event.preventDefault();
        handleAction(el.getAttribute("data-action"));
        window.setTimeout(() => {
          touched = false;
        }, 400);
      },
      { passive: false }
    );
    el.addEventListener("click", (event) => {
      if (touched) {
        event.preventDefault();
        return;
      }
      handleAction(el.getAttribute("data-action"));
    });
  }

  bindActionButton(document.getElementById("btn-start"));
  document.querySelectorAll("[data-action]").forEach((el) => {
    if (el.id === "btn-start") return;
    bindActionButton(el);
  });

  if (profileForm) {
    profileForm.addEventListener("submit", finishProfile);
  }
  if (profileSubmit) {
    bindTap(profileSubmit, () => finishProfile());
  }

  document.querySelectorAll("[data-hub-action]").forEach((el) => {
    bindTap(el, () => doHubAction(el.getAttribute("data-hub-action")));
  });
  if (hubActionOk) {
    bindTap(hubActionOk, () => hideHubActionOverlay());
  }
  if (hubActionOverlay) {
    bindTap(hubActionOverlay, (event) => {
      if (event.target === hubActionOverlay) hideHubActionOverlay();
    });
  }

  const keys = new Set();
  window.addEventListener("keydown", (event) => {
    if (!state.mapActive) return;
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d"].includes(event.key)) {
      keys.add(event.key);
      event.preventDefault();
      syncKeysToStick();
    }
    if ((event.key === "Enter" || event.key === " ") && state.nearbyId) {
      event.preventDefault();
      openBranch(state.nearbyId);
    }
  });
  window.addEventListener("keyup", (event) => {
    keys.delete(event.key);
    if (state.mapActive) syncKeysToStick();
  });

  function syncKeysToStick() {
    if (map.pointerId !== null) return;
    let x = 0;
    let y = 0;
    if (keys.has("ArrowLeft") || keys.has("a")) x -= 1;
    if (keys.has("ArrowRight") || keys.has("d")) x += 1;
    if (keys.has("ArrowUp") || keys.has("w")) y -= 1;
    if (keys.has("ArrowDown") || keys.has("s")) y += 1;
    const len = Math.hypot(x, y) || 1;
    const rawX = x / len;
    const rawY = y / len;
    map.stickX = curveStick(rawX);
    map.stickY = curveStick(rawY);
    if (!x && !y) resetJoystick();
    else if (knob && joystick) {
      knob.style.transform = `translate(calc(-50% + ${rawX * map.maxKnob}px), calc(-50% + ${rawY * map.maxKnob}px))`;
      joystick.classList.add("is-active");
    }
  }

  window.openLifeMap = openMap;

  try {
    bindJoystick();
    buildPlaces();
    showScreen("start");
  } catch (err) {
    console.error(err);
  }
})();
