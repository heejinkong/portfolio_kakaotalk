const profileImages = {
    heejin: "https://avatars.githubusercontent.com/u/113762366?v=4"
  };

  Object.values(profileImages).forEach((src) => {
    const img = new Image();
    img.src = src;
  });

  document.querySelectorAll("[data-profile-image]").forEach((img) => {
    img.src = profileImages[img.dataset.profileImage];
  });

  const profile = {
    name: "공희진",
    avatar: profileImages.heejin,
    portfolio: "https://heejinkong.github.io/",
    github: "https://github.com/heejinkong",
    email: "gmlwls3379@naver.com"
  };

  const answers = {
    자기소개: "안녕하세요, 공희진입니다.\n시스템 안정성을 추구하는 백엔드 개발자입니다. 유지보수성과 확장성을 고려한 서비스를 개발하며 지속적인 성장을 추구합니다.",
    기술스택: "기술 스택은 Java, Spring Boot, Spring Security, JPA, QueryDSL, MySQL, Redis, Docker를 다뤄봤습니다.\n",
    프로젝트: `대표 프로젝트는 아래 링크에서 볼 수 있습니다.
<div class="project-links">
  <a class="project-link" href="https://github.com/heejinkong/postman-platform" target="_blank" rel="noreferrer">
    <strong>REST API Platform</strong><span>내부 REST API 테스트 도구 · React · TypeScript · DDD</span>
  </a>
  <a class="project-link" href="https://github.com/Teamirum/server" target="_blank" rel="noreferrer">
    <strong>모두의 결제</strong><span>전자지갑 플랫폼 · Spring Boot · Vue.js</span>
  </a>
  <a class="project-link" href="https://github.com/heejinkong/server" target="_blank" rel="noreferrer">
    <strong>Dr.Food</strong><span>질병 기반 맞춤형 배달 플랫폼 · Spring Boot · OCR</span>
  </a>
  <a class="project-link" href="https://github.com/sperta-BEmin/BEmin-Server" target="_blank" rel="noreferrer">
    <strong>BE민</strong><span>음식 주문 통합 플랫폼 · Redis · RabbitMQ · QueryDSL</span>
  </a>
</div>`,
    관심사: "새로운 기술을 적용하는 것보다 왜 필요한지 고민하고 적절하게 활용하는 것을 중요하게 생각합니다.\n특히 백엔드 시스템의 안정성, 성능 최적화, 유지보수성과 확장성을 고려한 설계에 관심이 많습니다.",
    연락처: "연락은 이메일과 GitHub로 가능합니다.\nEmail: gmlwls3379@naver.com\nGitHub: github.com/heejinkong",
    포트폴리오: `포트폴리오는 여기에서 볼 수 있습니다.\n<a href="${profile.portfolio}" target="_blank" rel="noreferrer">PORTFLIX 열기</a>\n<a href="${profile.github}" target="_blank" rel="noreferrer">GitHub 열기</a>`
  };

  const chatBody = document.getElementById("chatBody");
  const inputField = document.getElementById("inputField");
  const sendBtn = document.getElementById("sendBtn");

  function getTime() {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  }

  function appendMessage(text, mine = false, html = false) {
    const row = document.createElement("div");
    row.className = `msg-row${mine ? " mine" : ""}`;

    if (!mine) {
      const avatar = document.createElement("div");
      avatar.className = "avatar";
      avatar.innerHTML = `<img alt="${profile.name}" src="${profile.avatar}">`;
      row.appendChild(avatar);
    }

    const wrap = document.createElement("div");
    wrap.className = "bubble-wrap";

    if (!mine) {
      const sender = document.createElement("div");
      sender.className = "sender-name";
      sender.textContent = profile.name;
      wrap.appendChild(sender);
    }

    const line = document.createElement("div");
    line.style.display = "flex";
    line.style.alignItems = "flex-end";
    line.style.gap = "5px";
    if (mine) {
      line.style.flexDirection = "row-reverse";
    }

    const bubble = document.createElement("div");
    bubble.className = `bubble${mine ? " mine" : ""}`;
    if (html) {
      bubble.innerHTML = text;
    } else {
      bubble.textContent = text;
    }

    const meta = document.createElement("div");
    meta.className = "bubble-meta";
    if (mine) {
      const read = document.createElement("div");
      read.className = "read-badge";
      read.textContent = "읽음";
      meta.appendChild(read);
    }
    const time = document.createElement("div");
    time.className = "msg-time";
    time.textContent = getTime();
    meta.appendChild(time);

    line.appendChild(bubble);
    line.appendChild(meta);
    wrap.appendChild(line);
    row.appendChild(wrap);
    chatBody.appendChild(row);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function resolveAnswer(question) {
    const normalized = question.replace(/\s/g, "");
    if (normalized.includes("기술") || normalized.includes("스택")) return ["기술스택", false];
    if (normalized.includes("프로젝트") || normalized.includes("작업") || normalized.includes("깃허브") || normalized.includes("github")) return ["프로젝트", true];
    if (normalized.includes("관심") || normalized.includes("UI") || normalized.includes("성능")) return ["관심사", false];
    if (normalized.includes("연락") || normalized.includes("이메일") || normalized.includes("깃허브") || normalized.includes("github")) return ["연락처", false];
    if (normalized.includes("포트폴리오") || normalized.includes("링크") || normalized.includes("사이트")) return ["포트폴리오", true];
    return ["자기소개", false];
  }

  function ask(question) {
    appendMessage(question, true);
    inputField.value = "";
    sendBtn.classList.remove("active");

    const [key, html] = resolveAnswer(question);
    setTimeout(() => {
      appendMessage(answers[key], false, html);
    }, 450);
  }

  document.querySelectorAll(".quick-replies button").forEach((button) => {
    button.addEventListener("click", () => ask(button.dataset.question));
  });

  inputField.addEventListener("input", () => {
    sendBtn.classList.toggle("active", inputField.value.trim().length > 0);
  });

  sendBtn.addEventListener("click", () => {
    const text = inputField.value.trim();
    if (text) ask(text);
  });

  inputField.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const text = inputField.value.trim();
      if (text) ask(text);
    }
  });

  setTimeout(() => {
    appendMessage("안녕하세요! 궁금한 걸 물어보면 제 포트폴리오 정보를 기준으로 답해드릴게요.", false);
  }, 450);
