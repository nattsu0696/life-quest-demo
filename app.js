(() => {
  const data = window.LIFE_QUEST;
  if (!data) return;

  const screens = {
    start: document.getElementById("screen-start"),
    select: document.getElementById("screen-select"),
    play: document.getElementById("screen-play"),
    result: document.getElementById("screen-result")
  };

  const lifeGrid = document.getElementById("life-grid");
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

  const ROUTE_META = {
    bigco: { code: "01", speaker: "先輩社員", img: "assets/char-office.jpg" },
    smallco: { code: "02", speaker: "現場の人", img: "assets/char-office.jpg" },
    startup: { code: "03", speaker: "創業者", img: "assets/char-creator.jpg" },
    univ: { code: "04", speaker: "先輩学生", img: "assets/char-campus.jpg" },
    skill: { code: "05", speaker: "技術者", img: "assets/char-creator.jpg" },
    local: { code: "06", speaker: "地域の人", img: "assets/char-campus.jpg" }
  };

  const state = {
    lifeId: null,
    sceneId: "start",
    depth: 0,
    phase: "title", // title | body | choices
    typing: false,
    typeTimer: null,
    fullText: "",
    currentChoices: []
  };

  function showScreen(name) {
    Object.entries(screens).forEach(([key, el]) => {
      const active = key === name;
      el.hidden = !active;
      el.classList.toggle("is-active", active);
    });
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

  function typeText(text, onDone) {
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
        if (onDone) onDone();
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

  function renderSelect() {
    lifeGrid.innerHTML = "";
    data.lives.forEach((life) => {
      const meta = ROUTE_META[life.id] || { code: "00" };
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "route-card";
      btn.dataset.theme = life.id;
      btn.innerHTML = `
        <span class="route-icon">Q${meta.code}</span>
        <span class="route-copy">
          <span class="label">${life.label}</span>
          <span class="hint">${life.hint}</span>
        </span>
        <span class="route-go">GO</span>
      `;
      btn.addEventListener("click", () => startLife(life.id));
      lifeGrid.appendChild(btn);
    });
    showScreen("select");
  }

  function startLife(lifeId) {
    state.lifeId = lifeId;
    state.sceneId = "start";
    state.depth = 0;
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
      // restart enter animation
      void actor.offsetWidth;
      actor.style.animation = "";
    }

    typeText(scene.title, () => {
      // wait for tap to continue to body
    });

    showScreen("play");
  }

  function showBody() {
    const life = currentLife();
    const scene = life.scenes[state.sceneId];
    state.phase = "body";
    typeText(scene.body, () => {
      // wait for tap to show choices
    });
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
    if (state.phase === "body") {
      showChoices();
    }
  }

  function renderResult(life, scene) {
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

  dialogueBox.addEventListener("click", advanceDialogue);

  document.querySelectorAll("[data-action]").forEach((el) => {
    el.addEventListener("click", () => {
      const action = el.getAttribute("data-action");
      if (action === "to-select") renderSelect();
      if (action === "to-start") showScreen("start");
      if (action === "back-select") renderSelect();
    });
  });

  showScreen("start");
})();
