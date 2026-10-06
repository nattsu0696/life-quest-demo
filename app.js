(() => {
  const data = window.LIFE_QUEST;
  if (!data || !data.categories) return;

  const screens = {
    start: document.getElementById("screen-start"),
    map: document.getElementById("screen-map"),
    branch: document.getElementById("screen-branch"),
    play: document.getElementById("screen-play"),
    result: document.getElementById("screen-result")
  };

  const stage = document.getElementById("stage");
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
    eventContinue: null
  };

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
      if (!screens.map) {
        window.alert("マップ画面が見つかりません。ページを再読み込みしてください。");
        return;
      }
      if (!map.places.length) buildPlaces();
      else refreshClearedFlags();
      state.nearbyId = null;
      if (enterPrompt) enterPrompt.hidden = true;
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
    if (action === "to-start") {
      stopMapLoop();
      resetJoystick();
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
