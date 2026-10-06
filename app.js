(() => {
  const data = window.LIFE_QUEST;
  if (!data) return;

  const screens = {
    start: document.getElementById("screen-start"),
    map: document.getElementById("screen-map"),
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

  const ROUTE_META = {
    bigco: { code: "01", speaker: "先輩社員", img: "assets/char-office.jpg", short: "大企業", x: 22, y: 28 },
    smallco: { code: "02", speaker: "現場の人", img: "assets/char-office.jpg", short: "小さな会社", x: 72, y: 26 },
    startup: { code: "03", speaker: "創業者", img: "assets/char-creator.jpg", short: "起業", x: 78, y: 58 },
    univ: { code: "04", speaker: "先輩学生", img: "assets/char-campus.jpg", short: "大学", x: 28, y: 62 },
    skill: { code: "05", speaker: "技術者", img: "assets/char-creator.jpg", short: "専門技術", x: 52, y: 22 },
    local: { code: "06", speaker: "地域の人", img: "assets/char-campus.jpg", short: "地方暮らし", x: 50, y: 72 }
  };

  const state = {
    lifeId: null,
    sceneId: "start",
    depth: 0,
    phase: "title",
    typing: false,
    typeTimer: null,
    fullText: "",
    currentChoices: [],
    cleared: new Set(),
    mapActive: false,
    nearbyId: null
  };

  const map = {
    x: 50,
    y: 48,
    vx: 0,
    vy: 0,
    speed: 0.085,
    stickX: 0,
    stickY: 0,
    maxKnob: 34,
    pointerId: null,
    raf: 0,
    places: []
  };

  function showScreen(name) {
    Object.entries(screens).forEach(([key, el]) => {
      if (!el) return;
      const active = key === name;
      el.hidden = !active;
      el.classList.toggle("is-active", active);
    });

    if (name === "map") {
      startMapLoop();
    } else {
      stopMapLoop();
      resetJoystick();
    }
  }

  function currentLife() {
    return data.lives.find((life) => life.id === state.lifeId);
  }

  function setTheme(lifeId) {
    stage.className = `vn-stage theme-${lifeId}`;
  }

  function updateDots() {
    dots.forEach((dot, i) => {
      dot.classList.toggle("is-on", i <= state.depth);
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

  function revealFullText() {
    if (!state.typing) return false;
    stopTyping();
    dialogueText.textContent = state.fullText;
    dialogueCursor.classList.remove("is-hidden");
    return true;
  }

  /* ========== MAP ========== */
  function buildPlaces() {
    if (!placeLayer) return;
    placeLayer.innerHTML = "";
    map.places = data.lives.map((life) => {
      const meta = ROUTE_META[life.id];
      if (!meta) return null;
      const el = document.createElement("button");
      el.type = "button";
      el.className = `map-place theme-${life.id}`;
      el.dataset.id = life.id;
      el.style.left = `${meta.x}%`;
      el.style.top = `${meta.y}%`;
      el.innerHTML = `
        <span class="place-flag" aria-hidden="true">CLEAR</span>
        <span class="place-portrait-wrap">
          <img class="place-portrait" src="${meta.img}" alt="" />
        </span>
        <span class="place-label">${meta.short}</span>
      `;
      el.addEventListener("click", () => {
        if (state.nearbyId === life.id) startLife(life.id);
      });
      placeLayer.appendChild(el);
      return { id: life.id, x: meta.x, y: meta.y, el, life };
    }).filter(Boolean);
    refreshClearedFlags();
  }

  function refreshClearedFlags() {
    map.places.forEach((place) => {
      place.el.classList.toggle("is-cleared", state.cleared.has(place.id));
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
    playerEl.classList.toggle("is-moving", Math.abs(map.stickX) + Math.abs(map.stickY) > 0.08);
    if (Math.abs(map.stickX) > 0.05) {
      playerEl.classList.toggle("face-left", map.stickX < 0);
    }
  }

  function updateNearby() {
    let nearest = null;
    let best = Infinity;
    map.places.forEach((place) => {
      const dx = place.x - map.x;
      const dy = place.y - map.y;
      const dist = Math.hypot(dx, dy);
      if (dist < best) {
        best = dist;
        nearest = place;
      }
    });

    const inRange = nearest && best < 11;
    const nextId = inRange ? nearest.id : null;

    if (nextId !== state.nearbyId) {
      state.nearbyId = nextId;
      refreshClearedFlags();
      if (nextId) {
        const meta = ROUTE_META[nearest.id];
        enterTitle.textContent = nearest.life.label;
        enterHint.textContent = nearest.life.hint;
        if (enterPortrait && meta) enterPortrait.src = meta.img;
        enterPrompt.hidden = false;
        mapGuide.textContent = "ここに入って、人生を試してみる？";
      } else {
        enterPrompt.hidden = true;
        mapGuide.textContent = "ぷにコンで歩いて、気になる人生へ近づこう";
      }
    }
  }

  function startMapLoop() {
    state.mapActive = true;
    if (map.raf) cancelAnimationFrame(map.raf);
    const tick = () => {
      if (!state.mapActive) return;
      if (Math.abs(map.stickX) + Math.abs(map.stickY) > 0.02) {
        map.x = clamp(map.x + map.stickX * map.speed * 16, 8, 92);
        map.y = clamp(map.y + map.stickY * map.speed * 16, 12, 86);
        renderPlayer();
        updateNearby();
      }
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
    map.stickX = dx / max;
    map.stickY = dy / max;
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

  /* ========== QUEST ========== */
  function startLife(lifeId) {
    state.lifeId = lifeId;
    state.sceneId = "start";
    state.depth = 0;
    enterPrompt.hidden = true;
    setTheme(lifeId);
    renderScene();
  }

  function renderScene() {
    const life = currentLife();
    const scene = life.scenes[state.sceneId];
    if (!scene) return;

    if (scene.ending) {
      renderResult(life, scene);
      return;
    }

    const meta = ROUTE_META[life.id] || {
      speaker: "案内役",
      img: "assets/char-guide.jpg"
    };
    pathLabel.textContent = life.label;
    sceneKicker.textContent = scene.kicker.replace("QUEST / ", "Q / ");
    nameplate.textContent = meta.speaker;
    actorTag.textContent = meta.speaker;
    if (actorImg && meta.img) {
      actorImg.src = meta.img;
      actorImg.alt = meta.speaker;
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

    typeText(scene.title);
    showScreen("play");
  }

  function showBody() {
    const life = currentLife();
    const scene = life.scenes[state.sceneId];
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

  function renderResult(life, scene) {
    state.cleared.add(life.id);
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

  // STARTなどが確実に動くよう、先にクリック委任を張る
  document.addEventListener("click", (event) => {
    const actionEl = event.target.closest("[data-action]");
    if (!actionEl) return;
    const action = actionEl.getAttribute("data-action");
    if (action === "to-map") {
      event.preventDefault();
      openMap();
    }
    if (action === "to-start") {
      event.preventDefault();
      stopMapLoop();
      resetJoystick();
      showScreen("start");
    }
  });

  if (dialogueBox) {
    dialogueBox.addEventListener("click", advanceDialogue);
  }
  if (enterBtn) {
    enterBtn.addEventListener("click", () => {
      if (state.nearbyId) startLife(state.nearbyId);
    });
  }

  // Desktop / keyboard support
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
      startLife(state.nearbyId);
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
    map.stickX = x / len;
    map.stickY = y / len;
    if (!x && !y) {
      resetJoystick();
    } else if (knob && joystick) {
      knob.style.transform = `translate(calc(-50% + ${map.stickX * map.maxKnob}px), calc(-50% + ${map.stickY * map.maxKnob}px))`;
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
