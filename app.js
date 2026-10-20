// ============================================================
// FM27 AI Tactical Command Center - Logic Engine
// ============================================================

// 8대 명장 전술 사전
const PERSONAS = {
  pep: {
    name: "펩 과르디올라",
    league: "epl",
    style: "점유율 60% 이상 확보, 인버티드 풀백(IWB) 및 하프스페이스 점유, 3-2 빌드업 대형 유지. 상대 수비 블록을 인내심 있게 흔드는 짧은 패스 지공."
  },
  klopp: {
    name: "위르겐 클롭",
    league: "epl",
    style: "전방 게겐프레싱, 볼 탈취 직후 8초 이내 빠른 역습 전개, 극한의 활동량과 높은 템포. 윙어의 중앙 침투와 풀백의 적극적인 오버래핑."
  },
  mourinho: {
    name: "조제 무리뉴",
    league: "seriea",
    style: "철저한 2줄 수비 블록, 라인을 낮추고 실리적인 다이렉트 롱카운터(역습). 리드 시 미드필더 숫자를 늘려 잠그기 운영."
  },
  ancelotti: {
    name: "카를로 안첼로티",
    league: "laliga",
    style: "선수 개인의 번뜩이는 창의성과 개성을 극대화하는 유연한 전술. 과도한 세부 지침보다는 자유도를 높이고 공수 전환 밸런스 유지."
  },
  arteta: {
    name: "미켈 아르테타",
    league: "epl",
    style: "체계적인 세트피스 설계, 풀백의 안정적 커버 플레이와 수비 전환, 정교한 지공 패턴 플레이."
  },
  ange: {
    name: "엔제 포스테코글루",
    league: "epl",
    style: "극단적으로 높은 하이라인, 수비 뒷공간 위험을 감수하는 타협 없는 전진, 끊임없는 박스 안 숫자 우위 확보와 닥공 축구."
  },
  simeone: {
    name: "디에고 시메오네",
    league: "laliga",
    style: "질식 4-4-2 두 줄 수비, 투지 넘치는 육탄 방어와 거친 압박, 세컨볼 장악 및 세트피스 한 방을 노리는 실리 축구."
  },
  flick: {
    name: "한지 플릭",
    league: "laliga",
    style: "초고강도 전방 압박, 칼같은 오프사이드 트랩, 간결하고 빠른 직선적 박스 타격. 템포를 최고조로 끌어올리는 속도전."
  }
};

// DOM 요소 참조
const apiKeyInput = document.getElementById('apiKey');
const saveKeyBtn = document.getElementById('saveKeyBtn');
const keyStatusDot = document.getElementById('keyStatusDot');

const streamStatusPill = document.getElementById('streamStatusPill');
const gameVideo = document.getElementById('gameVideo');
const videoPlaceholder = document.getElementById('videoPlaceholder');
const startShareBtn = document.getElementById('startShareBtn');
const stopShareBtn = document.getElementById('stopShareBtn');

const countryFilter = document.getElementById('countryFilter');
const managerSelect = document.getElementById('managerSelect');
const managerSelectGroup = document.getElementById('managerSelectGroup');
const customStyleGroup = document.getElementById('customStyleGroup');
const customPrompt = document.getElementById('customPrompt');

const analyzeBtn = document.getElementById('analyzeBtn');
const cooldownBar = document.getElementById('cooldownBar');
const cooldownTimer = document.getElementById('cooldownTimer');
const coachDisplayBadge = document.getElementById('coachDisplayBadge');

const loadingScanner = document.getElementById('loadingScanner');
const briefingCardsContainer = document.getElementById('briefingCardsContainer');
const diagnosisContent = document.getElementById('diagnosisContent');
const tacticsContent = document.getElementById('tacticsContent');
const subsContent = document.getElementById('subsContent');

const snapshotCanvas = document.getElementById('snapshotCanvas');

let screenStream = null;
let isCooldown = false;

// 1. API 키 저장 및 상태 표시
function updateKeyStatus() {
  const key = apiKeyInput.value.trim();
  if (key) {
    keyStatusDot.classList.add('connected');
    keyStatusDot.title = "Gemini API 키 연결됨";
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
    alert('✅ Gemini API 키가 브라우저에 안전하게 저장되었습니다!');
  } else {
    localStorage.removeItem('fm27_gemini_api_key');
    updateKeyStatus();
    alert('API 키가 삭제되었습니다.');
  }
});

// 2. 사령탑 배지 실시간 동기화
function updateCoachBadge() {
  if (countryFilter.value === 'custom') {
    coachDisplayBadge.textContent = "감독: 커스텀 전술";
  } else {
    const selectedKey = managerSelect.value;
    const coach = PERSONAS[selectedKey];
    coachDisplayBadge.textContent = `감독: ${coach ? coach.name : "미선택"}`;
  }
}
updateCoachBadge();

managerSelect.addEventListener('change', updateCoachBadge);

// 리그 필터 변경
countryFilter.addEventListener('change', () => {
  const selectedLeague = countryFilter.value;

  if (selectedLeague === 'custom') {
    managerSelectGroup.style.display = 'none';
    customStyleGroup.style.display = 'block';
  } else {
    managerSelectGroup.style.display = 'block';
    customStyleGroup.style.display = 'none';
    managerSelect.innerHTML = '';

    for (const [key, p] of Object.entries(PERSONAS)) {
      if (selectedLeague === 'all' || p.league === selectedLeague) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = `${p.name} • ${p.style.slice(0, 30)}...`;
        managerSelect.appendChild(option);
      }
    }
  }
  updateCoachBadge();
});

// 3. 브라우저 화면 공유 제어
startShareBtn.addEventListener('click', async () => {
  try {
    screenStream = await navigator.mediaDevices.getDisplayMedia({
      video: {
        cursor: "never",
        displaySurface: "window"
      },
      audio: false
    });

    gameVideo.srcObject = screenStream;
    gameVideo.style.display = 'block';
    videoPlaceholder.style.display = 'none';

    startShareBtn.style.display = 'none';
    stopShareBtn.style.display = 'inline-flex';
    analyzeBtn.disabled = false;

    streamStatusPill.textContent = "라이브 피드 연결됨";
    streamStatusPill.className = "status-pill status-live";

    screenStream.getVideoTracks()[0].addEventListener('ended', () => {
      stopScreenSharing();
    });

  } catch (err) {
    console.error("화면 공유 에러:", err);
    alert("화면 공유가 취소되었거나 브라우저 권한이 없습니다.");
  }
});

stopShareBtn.addEventListener('click', stopScreenSharing);

function stopScreenSharing() {
  if (screenStream) {
    screenStream.getTracks().forEach(track => track.stop());
    screenStream = null;
  }
  gameVideo.srcObject = null;
  gameVideo.style.display = 'none';
  videoPlaceholder.style.display = 'flex';

  startShareBtn.style.display = 'inline-flex';
  stopShareBtn.style.display = 'none';
  analyzeBtn.disabled = true;

  streamStatusPill.textContent = "연결 대기 중";
  streamStatusPill.className = "status-pill status-offline";
}

// 4. 고해상도 캡처
function captureSnapshot() {
  const videoWidth = gameVideo.videoWidth;
  const videoHeight = gameVideo.videoHeight;
  if (!videoWidth || !videoHeight) return null;

  snapshotCanvas.width = videoWidth;
  snapshotCanvas.height = videoHeight;

  const ctx = snapshotCanvas.getContext('2d');
  ctx.drawImage(gameVideo, 0, 0, videoWidth, videoHeight);

  const dataUrl = snapshotCanvas.toDataURL('image/jpeg', 0.92);
  return dataUrl.split(',')[1];
}

// 5. 쿨다운 타이머 (5초) 및 프로그레스 바
function startCooldown() {
  isCooldown = true;
  analyzeBtn.disabled = true;
  let remaining = 5;
  const total = 5;

  cooldownTimer.textContent = `쿨다운: ${remaining}초`;
  cooldownTimer.style.color = '#f59e0b';
  cooldownBar.style.width = '100%';

  const timer = setInterval(() => {
    remaining -= 1;
    const percent = (remaining / total) * 100;
    cooldownBar.style.width = `${percent}%`;

    if (remaining <= 0) {
      clearInterval(timer);
      isCooldown = false;
      if (screenStream) analyzeBtn.disabled = false;
      cooldownTimer.textContent = '준비 완료';
      cooldownTimer.style.color = '#10b981';
      cooldownBar.style.width = '0%';
    } else {
      cooldownTimer.textContent = `쿨다운: ${remaining}초`;
    }
  }, 1000);
}

// 6. 단축키 지원 (Ctrl + Enter)
window.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'Enter') {
    if (!analyzeBtn.disabled && !isCooldown) {
      analyzeBtn.click();
    }
  }
});

// 7. Gemini AI 분석 및 3개 구조화 카드 렌더링
analyzeBtn.addEventListener('click', async () => {
  const apiKey = apiKeyInput.value.trim();
  if (!apiKey) {
    alert("상단에 Gemini API 키를 먼저 입력해 주세요!");
    apiKeyInput.focus();
    return;
  }

  const base64Image = captureSnapshot();
  if (!base64Image) {
    alert("화면을 캡처할 수 없습니다. 화면 공유 상태를 확인해 주세요.");
    return;
  }

  let personaName = "";
  let personaStyle = "";

  if (countryFilter.value === 'custom') {
    personaName = "커스텀 전술 감독";
    personaStyle = customPrompt.value.trim() || "상황에 맞는 균형 잡힌 실전 전술";
  } else {
    const selectedKey = managerSelect.value;
    const p = PERSONAS[selectedKey];
    personaName = p.name;
    personaStyle = p.style;
  }

  // AI 프롬프트 (정확히 3단 카드로 분리되도록 헤더 구조화 요청)
  const systemInstruction = `
당신은 세계적인 축구 명장 '${personaName}'입니다. 
당신의 확고한 전술 철학: [${personaStyle}]

제공된 이미지는 Football Manager 2027(FM27) 게임 화면 스냅샷입니다.
경기 시간, 스코어, 선수 평점, 체력/상태, xG, 포메이션, 점유율 등을 정밀 분석하세요.

반드시 다음 3개 섹션 태그를 사용하여 한국어로 명확하고 전문적인 FM27 전술 조언을 제공하세요:

[진단]
현재 경기 흐름, 상대에게 밀리는 지점, 체력 저하 선수, 취약한 공간 등 문제점을 '${personaName}' 감독 특유의 어조로 1~2문장으로 짚어주세요.

[전술]
FM27 인게임에서 즉시 수정해야 할 구체적인 전술 지침(예: 압박 강도, 수비 라인 높이, 패스 템포, 전개 방식, 포메이션 변형 등)을 실제 게임 용어로 명확히 작성하세요.

[교체]
당장 교체 아웃시켜야 할 포지션/선수 및 특정 포지션에 부여할 세부 롤(Role, 예: IWB 지원, 인버티드 윙어 공격, 딥라잉 플레이메이커 방어 등)을 추천하세요.
`;

  startCooldown();
  loadingScanner.style.display = 'flex';
  briefingCardsContainer.style.opacity = '0.3';

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: systemInstruction },
              {
                inline_data: {
                  mime_type: "image/jpeg",
                  data: base64Image
                }
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error?.message || `서버 오류 (${response.status})`);
    }

    const result = await response.json();
    const candidateText = result.candidates?.[0]?.content?.parts?.[0]?.text;

    if (candidateText) {
      // [진단], [전술], [교체] 태그 파싱
      let diagText = "";
      let tactText = "";
      let subsText = "";

      const diagMatch = candidateText.match(/\[진단\]([\s\S]*?)(?=\[전술\]|\[교체\]|$)/i);
      const tactMatch = candidateText.match(/\[전술\]([\s\S]*?)(?=\[교체\]|$)/i);
      const subsMatch = candidateText.match(/\[교체\]([\s\S]*?)$/i);

      if (diagMatch || tactMatch || subsMatch) {
        diagText = diagMatch ? diagMatch[1].trim() : "분석 내용 없음";
        tactText = tactMatch ? tactMatch[1].trim() : "분석 내용 없음";
        subsText = subsMatch ? subsMatch[1].trim() : "분석 내용 없음";
      } else {
        // 태그 매칭이 안 된 경우 줄바꿈 기준 3등분
        const lines = candidateText.split('\n').filter(l => l.trim().length > 0);
        diagText = lines[0] || candidateText;
        tactText = lines[1] || "세부 전술 지침 유지";
        subsText = lines.slice(2).join(' ') || "현재 라인업 유지 권고";
      }

      diagnosisContent.innerHTML = `<p>${formatTacticalText(diagText)}</p>`;
      tacticsContent.innerHTML = `<p>${formatTacticalText(tactText)}</p>`;
      subsContent.innerHTML = `<p>${formatTacticalText(subsText)}</p>`;
    }

  } catch (error) {
    console.error("Gemini API 호출 에러:", error);
    diagnosisContent.innerHTML = `<p style="color: #f43f5e; font-weight: bold;">⚠️ 분석 오류: ${error.message}</p>`;
    tacticsContent.innerHTML = `<p style="color: #94a3b8;">API 키가 정확한지, 인터넷 연결이 정상인지 확인해 주세요.</p>`;
    subsContent.innerHTML = `<p style="color: #94a3b8;">잠시 후 다시 시도해 주세요.</p>`;
  } finally {
    loadingScanner.style.display = 'none';
    briefingCardsContainer.style.opacity = '1';
  }
});

// 전문 축구/FM 전술 키워드 하이라이트 포맷 함수
function formatTacticalText(text) {
  return text
    .replace(/\n/g, '<br>')
    .replace(/(IWB|IF|DLP|B2B|AF|압박 강도|수비 라인|패스 템포|게겐프레싱|하프스페이스|오프사이드 트랩)/g, 
      '<span class="briefing-highlight">$1</span>');
}
