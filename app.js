// ============================================================
// FM27 AI Tactical Command Center - Master Script
// ============================================================

// 1. 세계 8대 명장 데이터베이스 (위키미디어 공식 이미지 & 태그 & 명언)
const PERSONAS = {
  pep: {
    name: "펩 과르디올라",
    club: "맨체스터 시티",
    league: "epl",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/3/37/Pep_Guardiola_2021.jpg",
    motto: "“공을 소유하면 상대는 절대 우리 골문에 도달할 수 없다.”",
    tags: ["#점유율축구", "#인버티드풀백", "#하프스페이스", "#3-2빌드업"],
    style: "점유율 60% 이상 확보, 인버티드 풀백(IWB) 및 하프스페이스 집중 공략, 정교한 3-2 빌드업 대형 유지."
  },
  klopp: {
    name: "위르겐 클롭",
    club: "전 리버풀 / 레드불",
    league: "epl",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/f/fe/J%C3%BCrgen_Klopp.jpg",
    motto: "“최고의 플레이메이커는 바로 게겐프레싱이다.”",
    tags: ["#게겐프레싱", "#헤비메탈축구", "#즉각역습", "#고강도압박"],
    style: "전방 게겐프레싱, 볼 탈취 직후 8초 이내 초고속 역습, 왕성한 활동량과 풀백의 공격적인 오버래핑."
  },
  mourinho: {
    name: "조제 무리뉴",
    club: "페네르바체 / 전 첼시",
    league: "seriea",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Jos%C3%A9_Mourinho_2020_%28cropped%29.jpg",
    motto: "“실수하지 않는 팀이 이긴다. 이기는 것만이 유일한 진리다.”",
    tags: ["#2줄수비", "#실리적롱카운터", "#승점3점잠그기", "#멘탈리티"],
    style: "철저한 2줄 수비 블록, 라인을 낮추고 실리적인 다이렉트 롱카운터(역습), 리드 시 걸어 잠그기 운영."
  },
  ancelotti: {
    name: "카를로 안첼로티",
    club: "레알 마드리드",
    league: "laliga",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Carlo_Ancelotti_2012_%28cropped%29.jpg",
    motto: "“축구는 간단하다. 선수가 편안하게 최고의 재능을 발휘하게 하라.”",
    tags: ["#선수개성극대화", "#창의적자유도", "#유연한밸런스", "#챔스명장"],
    style: "선수 개인의 번뜩이는 개성을 극대화하는 유연한 전술, 높은 자유도와 완벽한 공수 전환 밸런스."
  },
  arteta: {
    name: "미켈 아르테타",
    club: "아스날 FC",
    league: "epl",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Mikel_Arteta_2021_%28cropped%29.png",
    motto: "“우리는 매 순간 상대의 모든 움직임을 통제해야 한다.”",
    tags: ["#세트피스공략", "#정교한지공", "#수비전환안정", "#전술적규율"],
    style: "체계적인 세트피스 설계, 풀백의 안정적인 수비 커버와 빌드업 가담, 정교한 패턴 플레이."
  },
  ange: {
    name: "엔제 포스테코글루",
    club: "토트넘 홋스퍼",
    league: "epl",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/d/da/Ange_Postecoglou_%28cropped%29.jpg",
    motto: "“우리는 절대 물러서지 않는다. 그것이 우리가 플레이하는 방식이다.”",
    tags: ["#극단적하이라인", "#닥공축구", "#타협없는전진", "#압도적슈팅"],
    style: "극단적으로 높은 수비 하이라인, 위험을 감수하는 끊임없는 전진 패스와 박스 안 숫자 우위 닥공."
  },
  simeone: {
    name: "디에고 시메오네",
    club: "아틀레티코 마드리드",
    league: "laliga",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Diego_Simeone_-_01.jpg",
    motto: "“한 경기 한 경기, 우리는 목숨을 걸고 잔디 위에서 싸운다.”",
    tags: ["#질식442", "#육탄방어", "#세컨볼장악", "#투지의압박"],
    style: "질식 4-4-2 두 줄 수비, 거친 육탄 방어와 압박, 세컨볼 사수 및 세트피스 한 방을 노리는 실리 축구."
  },
  flick: {
    name: "한지 플릭",
    club: "FC 바르셀로나 / 전 바이에른",
    league: "laliga",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/0/04/2022_Hansi_Flick_%28cropped%29.jpg",
    motto: "“가장 빠른 직선 경로로 박스를 파괴하고 공을 빼앗아라.”",
    tags: ["#오프사이드트랩", "#초고강도압박", "#직선적박스타격", "#스피드축구"],
    style: "초고강도 전방 압박, 칼같은 오프사이드 트랩 라인 컨트롤, 간결하고 빠른 직선적 박스 타격."
  }
};

// 2. 탭별 맞춤 안내 가이드 및 결과 카드 헤더 정의
const TAB_CONFIGS = {
  "pre-match": {
    guideTitle: "경기 전 상대 분석 화면을 준비해 주세요",
    guideDesc: "상대팀 분석 보고서, 예상 포메이션, 상대 핵심 선수 지표 화면을 공유하거나 캡처해 주세요.",
    btnTitle: "⚡ 카운터 전술 수립 요청",
    headerTitle: "상대 맞춤 카운터 전술 브리핑",
    card1: { icon: "🔍", title: "상대 전술 성향 및 핵심 취약점 진단", empty: "상대팀의 주요 공격 루트와 수비 취약 공간을 정밀 진단합니다." },
    card2: { icon: "⚔️", title: "추천 맞춤 대응 포메이션 & 슬라이더", empty: "상대 포메이션을 박살 낼 카운터 포메이션과 템포, 라인 높이 지침을 제시합니다." },
    card3: { icon: "🎯", title: "특정 상대 선수 마킹 & 세부 개인 지침", empty: "상대 에이스 전담 마크, 압박 유도 방향, 세트피스 방어 공식을 전달합니다." }
  },
  "live-match": {
    guideTitle: "진행 중인 FM27 인게임 화면을 보여주세요",
    guideDesc: "실시간 경기 시간, 스코어, 선수 평점, 체력, xG, 포메이션 대형 화면을 캡처해 주세요.",
    btnTitle: "⚡ 실시간 전술 조언 요청",
    headerTitle: "실시간 경기 전술 브리핑",
    card1: { icon: "🚨", title: "실시간 경기 흐름 및 위기 요인 진단", empty: "상대에게 밀리는 지점과 지친 선수의 위험도를 진단합니다." },
    card2: { icon: "⚙️", title: "즉시 수정해야 할 인게임 전술 지침", empty: "수비 라인, 압박 강도, 템포 등 즉각 변경할 슬라이더를 안내합니다." },
    card3: { icon: "🔄", title: "선수 교체 권고 & 세부 롤(Role) 변경", empty: "교체 아웃 추천 선수 및 포지션 롤(IWB, DLP 등) 재배치를 제시합니다." }
  },
  "squad-builder": {
    guideTitle: "스쿼드(선수단 명단) 또는 능력치 화면을 준비해 주세요",
    guideDesc: "우리 팀 전체 선수단 목록 화면이나 특정 선수의 능력치 프로필 화면을 캡처해 주세요.",
    btnTitle: "⚡ 스쿼드 최적화 분석 요청",
    headerTitle: "선수단 구축 & 포지션 롤 브리핑",
    card1: { icon: "⭐", title: "스쿼드 뎁스 & 주전-후보 밸런스 평가", empty: "현재 선수단의 포지션별 전력 불균형과 장단점을 진단합니다." },
    card2: { icon: "🧩", title: "선수별 최적 포지션 롤(Role) 재배치", empty: "보유 선수의 능력치를 120% 뽑아낼 최적 롤(Role) 조합을 추천합니다." },
    card3: { icon: "🛒", title: "취약 포지션 보강 및 영입/방출 제안", empty: "방출해야 할 잉여 자원과 이적시장에서 급히 보강할 포지션을 조언합니다." }
  },
  "club-strategy": {
    guideTitle: "구단 비전, 재정 또는 유스 화면을 준비해 주세요",
    guideDesc: "보드진 비전, 주급/이적 예산 현황, 또는 18세/21세 유소년 팀 명단 화면을 캡처해 주세요.",
    btnTitle: "⚡ 구단 장기 운영 전략 요청",
    headerTitle: "구단 운영 & 장기 비전 브리핑",
    card1: { icon: "💰", title: "재정 건전성 & 주급 체계 최적화", empty: "과도한 고주급자 정리 및 지속 가능한 이적료 운용 전략을 제시합니다." },
    card2: { icon: "🌱", title: "유망주 육성 & 1군 콜업 로드맵", empty: "원석 유망주의 출전 시간 배분과 최적 임대/육성 경로를 제시합니다." },
    card3: { icon: "🏆", title: "클럽 정체성 및 5개년 비전 달성법", empty: "보드진 요구사항을 만족시키며 명문 구단으로 도약할 로드맵을 전달합니다." }
  }
};

// 3. DOM 요소 참조
const apiKeyInput = document.getElementById('apiKey');
const saveKeyBtn = document.getElementById('saveKeyBtn');
const keyStatusDot = document.getElementById('keyStatusDot');

const tabBtns = document.querySelectorAll('.tab-btn');
const countryFilter = document.getElementById('countryFilter');
const managerSelect = document.getElementById('managerSelect');
const managerSelectGroup = document.getElementById('managerSelectGroup');
const customStyleGroup = document.getElementById('customStyleGroup');
const customPrompt = document.getElementById('customPrompt');

const coachAvatar = document.getElementById('coachAvatar');
const avatarFallback = document.getElementById('avatarFallback');
const coachName = document.getElementById('coachName');
const coachClubBadge = document.getElementById('coachClubBadge');
const coachMotto = document.getElementById('coachMotto');
const coachTags = document.getElementById('coachTags');
const activeCoachBadge = document.getElementById('activeCoachBadge');

const guideTitle = document.getElementById('guideTitle');
const guideDesc = document.getElementById('guideDesc');
const analyzeBtnTitle = document.getElementById('analyzeBtnTitle');
const briefingCategoryTitle = document.getElementById('briefingCategoryTitle');

const card1Icon = document.getElementById('card1Icon');
const card1Title = document.getElementById('card1Title');
const card1Content = document.getElementById('card1Content');

const card2Icon = document.getElementById('card2Icon');
const card2Title = document.getElementById('card2Title');
const card2Content = document.getElementById('card2Content');

const card3Icon = document.getElementById('card3Icon');
const card3Title = document.getElementById('card3Title');
const card3Content = document.getElementById('card3Content');

const gameVideo = document.getElementById('gameVideo');
const imagePreview = document.getElementById('imagePreview');
const videoPlaceholder = document.getElementById('videoPlaceholder');
const startShareBtn = document.getElementById('startShareBtn');
const stopShareBtn = document.getElementById('stopShareBtn');
const fileUploadInput = document.getElementById('fileUploadInput');

const analyzeBtn = document.getElementById('analyzeBtn');
const cooldownBar = document.getElementById('cooldownBar');
const cooldownTimer = document.getElementById('cooldownTimer');
const loadingScanner = document.getElementById('loadingScanner');
const briefingCardsContainer = document.getElementById('briefingCardsContainer');
const snapshotCanvas = document.getElementById('snapshotCanvas');

let currentTab = "pre-match";
let screenStream = null;
let currentStaticImageBase64 = null;
let isCooldown = false;

// 4. API 키 영구 저장소 연동
function updateKeyStatus() {
  const key = apiKeyInput.value.trim();
  if (key) {
    keyStatusDot.classList.add('connected');
    keyStatusDot.title = "Gemini API 연결됨";
  } else {
    keyStatusDot.classList.remove('connected');
    keyStatusDot.title = "API 키 필요";
  }
}

const savedKey = localStorage.getItem('fm27_gemini_api_key');
if (savedKey) {
  apiKeyInput.value = savedKey;
  updateKeyStatus();
}

saveKeyBtn.addEventListener('click', () => {
  const key = apiKeyInput.value.trim();
  if (key) {
    localStorage.setItem('fm27_gemini_api_key', key);
    updateKeyStatus();
    alert('✅ Gemini API 키가 저장되었습니다!');
  } else {
    localStorage.removeItem('fm27_gemini_api_key');
    updateKeyStatus();
    alert('API 키가 삭제되었습니다.');
  }
});

// 5. 감독 프로필 UI 동적 업데이트 (위키미디어 이미지 + Fallback)
function renderCoachProfile(key) {
  if (countryFilter.value === 'custom') {
    coachName.textContent = "커스텀 감독";
    coachClubBadge.textContent = "자유 전술";
    coachMotto.textContent = "“내 축구는 내가 직접 정의한다.”";
    coachAvatar.style.display = 'none';
    avatarFallback.style.display = 'flex';
    avatarFallback.textContent = "⚙️";
    coachTags.innerHTML = '<span class="tag-pill">#커스텀지침</span><span class="tag-pill">#자유빌드업</span>';
    activeCoachBadge.textContent = "감독: 커스텀 전술";
    return;
  }

  const coach = PERSONAS[key] || PERSONAS.pep;
  coachName.textContent = coach.name;
  coachClubBadge.textContent = coach.club;
  coachMotto.textContent = coach.motto;
  activeCoachBadge.textContent = `감독: ${coach.name}`;

  // 태그 렌더링
  coachTags.innerHTML = coach.tags.map(t => `<span class="tag-pill">${t}</span>`).join('');

  // 아바타 이미지 & 오류 대비 Fallback 안전 처리
  coachAvatar.style.display = 'block';
  avatarFallback.style.display = 'none';

  coachAvatar.onerror = function() {
    this.style.display = 'none';
    avatarFallback.style.display = 'flex';
    avatarFallback.textContent = "⚽";
  };

  coachAvatar.src = coach.avatar;
}

renderCoachProfile("pep");

managerSelect.addEventListener('change', () => {
  renderCoachProfile(managerSelect.value);
});

countryFilter.addEventListener('change', () => {
  const selectedLeague = countryFilter.value;

  if (selectedLeague === 'custom') {
    managerSelectGroup.style.display = 'none';
    customStyleGroup.style.display = 'block';
  } else {
    managerSelectGroup.style.display = 'block';
    customStyleGroup.style.display = 'none';
    managerSelect.innerHTML = '';

    for (const [k, p] of Object.entries(PERSONAS)) {
      if (selectedLeague === 'all' || p.league === selectedLeague) {
        const opt = document.createElement('option');
        opt.value = k;
        opt.textContent = `${p.name} (${p.tags[0]}, ${p.tags[1]})`;
        managerSelect.appendChild(opt);
      }
    }
  }
  renderCoachProfile(managerSelect.value);
});

// 6. 상단 4대 탭 전환 엔진
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentTab = btn.getAttribute('data-tab');

    const config = TAB_CONFIGS[currentTab];
    guideTitle.textContent = config.guideTitle;
    guideDesc.textContent = config.guideDesc;
    analyzeBtnTitle.textContent = config.btnTitle;
    briefingCategoryTitle.textContent = config.headerTitle;

    card1Icon.textContent = config.card1.icon;
    card1Title.textContent = config.card1.title;
    card1Content.innerHTML = `<p class="empty-state">${config.card1.empty}</p>`;

    card2Icon.textContent = config.card2.icon;
    card2Title.textContent = config.card2.title;
    card2Content.innerHTML = `<p class="empty-state">${config.card2.empty}</p>`;

    card3Icon.textContent = config.card3.icon;
    card3Title.textContent = config.card3.title;
    card3Content.innerHTML = `<p class="empty-state">${config.card3.empty}</p>`;
  });
});

// 7. 화면 공유 및 이미지 업로드 제어
startShareBtn.addEventListener('click', async () => {
  try {
    screenStream = await navigator.mediaDevices.getDisplayMedia({
      video: { cursor: "never", displaySurface: "window" },
      audio: false
    });

    currentStaticImageBase64 = null;
    imagePreview.style.display = 'none';
    gameVideo.srcObject = screenStream;
    gameVideo.style.display = 'block';
    videoPlaceholder.style.display = 'none';

    startShareBtn.style.display = 'none';
    stopShareBtn.style.display = 'inline-flex';
    analyzeBtn.disabled = false;

    screenStream.getVideoTracks()[0].addEventListener('ended', stopScreenSharing);
  } catch (err) {
    console.error("화면 공유 에러:", err);
  }
});

stopShareBtn.addEventListener('click', stopScreenSharing);

function stopScreenSharing() {
  if (screenStream) {
    screenStream.getTracks().forEach(t => t.stop());
    screenStream = null;
  }
  gameVideo.srcObject = null;
  gameVideo.style.display = 'none';

  if (!currentStaticImageBase64) {
    videoPlaceholder.style.display = 'block';
    analyzeBtn.disabled = true;
  }

  startShareBtn.style.display = 'inline-flex';
  stopShareBtn.style.display = 'none';
}

// 파일 업로드(스크린샷) 지원
fileUploadInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(evt) {
    const dataUrl = evt.target.result;
    currentStaticImageBase64 = dataUrl.split(',')[1];

    if (screenStream) stopScreenSharing();

    imagePreview.src = dataUrl;
    imagePreview.style.display = 'block';
    gameVideo.style.display = 'none';
    videoPlaceholder.style.display = 'none';
    analyzeBtn.disabled = false;
  };
  reader.readAsDataURL(file);
});

// 클립보드 붙여넣기(Ctrl + V) 지원
window.addEventListener('paste', (e) => {
  const items = e.clipboardData?.items;
  if (!items) return;

  for (let item of items) {
    if (item.type.indexOf('image') !== -1) {
      const blob = item.getAsFile();
      const reader = new FileReader();
      reader.onload = function(evt) {
        currentStaticImageBase64 = evt.target.result.split(',')[1];
        if (screenStream) stopScreenSharing();

        imagePreview.src = evt.target.result;
        imagePreview.style.display = 'block';
        gameVideo.style.display = 'none';
        videoPlaceholder.style.display = 'none';
        analyzeBtn.disabled = false;
      };
      reader.readAsDataURL(blob);
      break;
    }
  }
});

// 8. 캡처 이미지 데이터 추출
function getActiveBase64Image() {
  if (currentStaticImageBase64) {
    return currentStaticImageBase64;
  }

  if (screenStream && gameVideo.videoWidth) {
    snapshotCanvas.width = gameVideo.videoWidth;
    snapshotCanvas.height = gameVideo.videoHeight;
    const ctx = snapshotCanvas.getContext('2d');
    ctx.drawImage(gameVideo, 0, 0, gameVideo.videoWidth, gameVideo.videoHeight);
    return snapshotCanvas.toDataURL('image/jpeg', 0.92).split(',')[1];
  }
  return null;
}

// 9. 쿨다운 타이머
function startCooldown() {
  isCooldown = true;
  analyzeBtn.disabled = true;
  let remaining = 5;

  cooldownTimer.textContent = `쿨다운: ${remaining}초`;
  cooldownTimer.style.color = '#f59e0b';
  cooldownBar.style.width = '100%';

  const timer = setInterval(() => {
    remaining -= 1;
    cooldownBar.style.width = `${(remaining / 5) * 100}%`;

    if (remaining <= 0) {
      clearInterval(timer);
      isCooldown = false;
      if (screenStream || currentStaticImageBase64) analyzeBtn.disabled = false;
      cooldownTimer.textContent = '준비 완료';
      cooldownTimer.style.color = '#10b981';
      cooldownBar.style.width = '0%';
    } else {
      cooldownTimer.textContent = `쿨다운: ${remaining}초`;
    }
  }, 1000);
}

// 단축키 (Ctrl + Enter)
window.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'Enter') {
    if (!analyzeBtn.disabled && !isCooldown) analyzeBtn.click();
  }
});

// 10. Gemini 비전 전술 분석 요청
analyzeBtn.addEventListener('click', async () => {
  const apiKey = apiKeyInput.value.trim();
  if (!apiKey) {
    alert("상단에 Gemini API 키를 먼저 입력해 주세요!");
    apiKeyInput.focus();
    return;
  }

  const base64Image = getActiveBase64Image();
  if (!base64Image) {
    alert("분석할 게임 화면이 없습니다. 화면 공유를 시작하거나 스크린샷 이미지를 올려주세요.");
    return;
  }

  let coach = PERSONAS[managerSelect.value] || PERSONAS.pep;
  let pName = coach.name;
  let pStyle = coach.style;

  if (countryFilter.value === 'custom') {
    pName = "커스텀 전술 감독";
    pStyle = customPrompt.value.trim() || "균형 잡힌 현대 축구 전술";
  }

  // 탭별 맞춤 프롬프트 생성
  let tabInstruction = "";
  if (currentTab === "pre-match") {
    tabInstruction = `
[분석 목표: 경기 전 상대 맞춤 카운터 전술 수립]
제공된 이미지는 Football Manager 2027(FM27) 상대팀 분석 보고서 또는 상대 스쿼드/포메이션 화면입니다.
반드시 아래 3개 섹션 형식으로 한국어로 명확히 답하세요:

[진단]
상대팀의 주력 포메이션, 공격 전개 방식, 치명적인 수비 약점 공간을 '${pName}' 감독 특유의 날카로운 말투로 1~2문장 분석하세요.

[전술]
상대를 무력화할 추천 카운터 포메이션(예: 4-4-2, 4-2-3-1, 3-5-2 등)과 즉시 적용할 FM27 전술 슬라이더(수비 라인 높이, 압박 강도, 패스 템포, 전개 폭 등)를 명확히 제시하세요.

[지침]
상대 핵심 에이스에 대한 전담 마킹 지침, 압박 유도 방향(안쪽/바깥쪽), 세트피스 대응법을 조언하세요.
`;
  } else if (currentTab === "live-match") {
    tabInstruction = `
[분석 목표: 실시간 인게임 경기 흐름 진단 및 전술/교체]
제공된 이미지는 FM27 실시간 경기 중 화면입니다.
반드시 아래 3개 섹션 형식으로 한국어로 답하세요:

[진단]
현재 경기 스코어, 시간대, xG, 상대에게 고전하는 원인을 '${pName}' 감독의 어조로 1~2문장 진단하세요.

[전술]
당장 변경해야 할 인게임 전술 지침(수비 라인, 템포, 압박 강도, 공격 방향 등)을 실제 게임 용어로 제시하세요.

[지침]
체력이 방전되었거나 평점이 낮은 교체 대상 선수와 특정 포지션에 부여할 세부 롤(Role, 예: IWB 지원, IF 공격 등)을 추천하세요.
`;
  } else if (currentTab === "squad-builder") {
    tabInstruction = `
[분석 목표: 선수단 스쿼드 진단 및 최적 포지션 롤 배분]
제공된 이미지는 FM27 스쿼드 목록 또는 선수 능력치 화면입니다.
반드시 아래 3개 섹션 형식으로 한국어로 답하세요:

[진단]
현재 스쿼드의 뎁스, 주전과 백업 간의 격차, 스쿼드 밸런스 취약점을 1~2문장으로 평가하세요.

[전술]
보유 선수들의 장점을 극대화할 최적의 팀 포메이션과 선수별 핵심 포지션 롤(Role) 조합을 제시하세요.

[지침]
성장을 위해 필수적으로 영입해야 할 취약 포지션과 방출 추천 선수를 조언하세요.
`;
  } else {
    tabInstruction = `
[분석 목표: 구단 운영 및 장기 클럽 비전]
제공된 이미지는 FM27 구단 비전, 재정, 또는 유망주 명단 화면입니다.
반드시 아래 3개 섹션 형식으로 한국어로 답하세요:

[진단]
구단의 재정 건전성, 주급 체계 현황 또는 유망주 풀의 장단점을 1~2문장으로 평가하세요.

[전술]
구단 지속 가능성을 위한 주급 상한선 관리 및 이적료 분배 전략을 제시하세요.

[지침]
핵심 유망주의 1군 콜업 시기 및 임대 로드맵, 클럽 철학 구축 지침을 조언하세요.
`;
  }

  const systemInstruction = `
당신은 세계적인 축구 명장 '${pName}'입니다.
당신의 철학: [${pStyle}]
${tabInstruction}
`;

  startCooldown();
  loadingScanner.style.display = 'flex';
  briefingCardsContainer.style.opacity = '0.25';

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: systemInstruction },
              { inline_data: { mime_type: "image/jpeg", data: base64Image } }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error?.message || `통신 오류 (${response.status})`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (text) {
      const diagMatch = text.match(/\[진단\]([\s\S]*?)(?=\[전술\]|\[지침\]|$)/i);
      const tactMatch = text.match(/\[전술\]([\s\S]*?)(?=\[지침\]|$)/i);
      const instMatch = text.match(/\[지침\]([\s\S]*?)$/i);

      let dText = diagMatch ? diagMatch[1].trim() : text;
      let tText = tactMatch ? tactMatch[1].trim() : "맞춤 전술 지침 유지";
      let iText = instMatch ? instMatch[1].trim() : "개인 세부 지침 유지";

      card1Content.innerHTML = `<p>${formatTacticalKeywords(dText)}</p>`;
      card2Content.innerHTML = `<p>${formatTacticalKeywords(tText)}</p>`;
      card3Content.innerHTML = `<p>${formatTacticalKeywords(iText)}</p>`;
    }
  } catch (error) {
    console.error("Gemini Error:", error);
    card1Content.innerHTML = `<p style="color: #f43f5e; font-weight: bold;">⚠️ 오류 발생: ${error.message}</p>`;
    card2Content.innerHTML = `<p style="color: #94a3b8;">API 키 상태와 화면 캡처 해상도를 확인해 주세요.</p>`;
    card3Content.innerHTML = `<p style="color: #94a3b8;">잠시 후 다시 요청해 주세요.</p>`;
  } finally {
    loadingScanner.style.display = 'none';
    briefingCardsContainer.style.opacity = '1';
  }
});

function formatTacticalKeywords(text) {
  return text
    .replace(/\n/g, '<br>')
    .replace(/(4-4-2|4-2-3-1|4-3-3|3-5-2|3-4-3|IWB|IF|DLP|B2B|AF|하이라인|게겐프레싱|오프사이드 트랩|하프스페이스|카운터)/g, 
      '<span class="briefing-highlight">$1</span>');
}
