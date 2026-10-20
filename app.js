// 전술 코치(감독 페르소나) 데이터베이스
const PERSONAS = {
  pep: {
    name: "펩 과르디올라",
    league: "epl",
    style: "점유율 60% 이상 확보, 인버티드 풀백(IWB) 및 하프스페이스 공략, 3-2 빌드업 대형 유지. 상대 블록을 인내심 있게 흔드는 짧은 패스 축구 강조."
  },
  klopp: {
    name: "위르겐 클롭",
    league: "epl",
    style: "전방 게겐프레싱, 볼 탈취 직후 8초 이내 빠른 역습 전개, 극한의 활동량과 높은 템포. 윙어의 중앙 침투와 풀백의 적극적인 오버래핑 강조."
  },
  mourinho: {
    name: "조제 무리뉴",
    league: "seriea",
    style: "철저한 2줄 수비 블록, 라인을 낮추고 실리적인 다이렉트 롱카운터(역습). 리드 시 미드필더를 내려 잠그기 운영."
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

// HTML 요소 참조
const apiKeyInput = document.getElementById('apiKey');
const saveKeyBtn = document.getElementById('saveKeyBtn');
const gameVideo = document.getElementById('gameVideo');
const videoPlaceholder = document.getElementById('videoPlaceholder');
const startShareBtn = document.getElementById('startShareBtn');
const stopShareBtn = document.getElementById('stopShareBtn');
const analyzeBtn = document.getElementById('analyzeBtn');
const countryFilter = document.getElementById('countryFilter');
const managerSelect = document.getElementById('managerSelect');
const managerSelectGroup = document.getElementById('managerSelectGroup');
const customStyleGroup = document.getElementById('customStyleGroup');
const customPrompt = document.getElementById('customPrompt');
const adviceContent = document.getElementById('adviceContent');
const loadingSpinner = document.getElementById('loadingSpinner');
const cooldownTimer = document.getElementById('cooldownTimer');
const snapshotCanvas = document.getElementById('snapshotCanvas');

let screenStream = null;
let isCooldown = false;

// 1. API 키 로컬 저장소 연동 (편의성)
const savedKey = localStorage.getItem('fm27_gemini_api_key');
if (savedKey) {
  apiKeyInput.value = savedKey;
}

saveKeyBtn.addEventListener('click', () => {
  const key = apiKeyInput.value.trim();
  if (key) {
    localStorage.setItem('fm27_gemini_api_key', key);
    alert('Gemini API 키가 저장되었습니다!');
  } else {
    localStorage.removeItem('fm27_gemini_api_key');
    alert('API 키가 삭제되었습니다.');
  }
});

// 2. 국가/리그 필터 변경 시 감독 목록 업데이트
countryFilter.addEventListener('change', () => {
  const selectedLeague = countryFilter.value;

  if (selectedLeague === 'custom') {
    managerSelectGroup.style.display = 'none';
    customStyleGroup.style.display = 'block';
    return;
  }

  managerSelectGroup.style.display = 'block';
  customStyleGroup.style.display = 'none';
  managerSelect.innerHTML = '';

  for (const [key, p] of Object.entries(PERSONAS)) {
    if (selectedLeague === 'all' || p.league === selectedLeague) {
      const option = document.createElement('option');
      option.value = key;
      option.textContent = `${p.name} (${p.style.slice(0, 24)}...)`;
      managerSelect.appendChild(option);
    }
  }
});

// 3. 브라우저 화면 공유 (FM27 게임 창 가져오기)
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

    // 사용자가 브라우저 상단에서 공유를 직접 중단했을 때 처리
    screenStream.getVideoTracks()[0].addEventListener('ended', () => {
      stopScreenSharing();
    });

  } catch (err) {
    console.error("화면 공유 에러:", err);
    alert("화면 공유가 취소되었거나 권한이 없습니다.");
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
}

// 4. 화면 스냅샷 캡처 (선명도 최우선 메모리 처리)
function captureSnapshot() {
  const videoWidth = gameVideo.videoWidth;
  const videoHeight = gameVideo.videoHeight;

  if (!videoWidth || !videoHeight) return null;

  // 원본 해상도를 그대로 유지하여 작은 텍스트(선수 평점, 체력 등) 보존
  snapshotCanvas.width = videoWidth;
  snapshotCanvas.height = videoHeight;

  const ctx = snapshotCanvas.getContext('2d');
  ctx.drawImage(gameVideo, 0, 0, videoWidth, videoHeight);

  // JPEG 92% 품질로 Base64 추출 (메모리에서만 즉시 사용)
  const dataUrl = snapshotCanvas.toDataURL('image/jpeg', 0.92);
  return dataUrl.split(',')[1]; // pure base64
}

// 5. 쿨다운 타이머 (5초)
function startCooldown() {
  isCooldown = true;
  analyzeBtn.disabled = true;
  let remaining = 5;

  cooldownTimer.textContent = `대기 시간: ${remaining}초`;
  cooldownTimer.style.color = '#f59e0b';

  const timer = setInterval(() => {
    remaining -= 1;
    if (remaining <= 0) {
      clearInterval(timer);
      isCooldown = false;
      if (screenStream) analyzeBtn.disabled = false;
      cooldownTimer.textContent = '준비 완료';
      cooldownTimer.style.color = '#38bdf8';
    } else {
      cooldownTimer.textContent = `대기 시간: ${remaining}초`;
    }
  }, 1000);
}

// 6. 단축키 지원 (스페이스바 또는 Ctrl + Enter로 전술 요청)
window.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'Enter') {
    if (!analyzeBtn.disabled && !isCooldown) {
      analyzeBtn.click();
    }
  }
});

// 7. Gemini API 호출 및 조언 요청
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

  // 현재 선택된 감독/스타일 파악
  let personaName = "";
  let personaStyle = "";

  if (countryFilter.value === 'custom') {
    personaName = "커스텀 감독";
    personaStyle = customPrompt.value.trim() || "상황에 맞는 균형 잡힌 실전 전술";
  } else {
    const selectedKey = managerSelect.value;
    const p = PERSONAS[selectedKey];
    personaName = p.name;
    personaStyle = p.style;
  }

  // AI 프롬프트 구성 (FM27 게임 맞춤형 3줄 브리핑)
  const systemInstruction = `
당신은 세계적인 명장 '${personaName}'입니다. 
당신의 전술 철학은 다음과 같습니다: [${personaStyle}].

제공된 이미지는 'Football Manager 2027(FM27)' 게임 화면 스냅샷입니다.
화면의 경기 시간, 스코어, 선수 평점, 체력/상태, xG(기대득점), 포메이션 대형, 점유율 등을 정밀하게 분석하세요.

반드시 다음 규칙을 지켜 답변하세요:
1. '${personaName}' 감독 특유의 말투(자신감 넘치고 명확한 어조)로 조언하세요.
2. FM 게임에서 즉시 적용 가능한 실제 게임 내 전술 용어(예: 롤-포지션(IWB, DLP, IF 등), 템포 조절, 압박 강도, 라인 높이, 즉각 교체 추천)를 명확히 짚어주세요.
3. 정확히 세 가지 핵심 포인트(3줄)로 요약하여 출력하세요. 각 줄은 불렛포인트(•)로 시작해야 합니다.
  - 1줄: [현 경기 흐름 진단 및 문제점 지적]
  - 2줄: [즉시 변경해야 할 전술/지침 수정 (라인, 템포, 롤 등)]
  - 3줄: [선수 교체 또는 개인 지침 권고]
`;

  // UI 상태 업데이트
  startCooldown();
  loadingSpinner.style.display = 'flex';
  adviceContent.innerHTML = '';

  try {
    // Gemini 2.5 Flash / Gemini 1.5 Flash 모델 호출
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
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
      // 줄바꿈으로 나누어 리스트로 변환
      const lines = candidateText
        .split('\n')
        .map(l => l.trim())
        .filter(l => l.length > 0);

      let html = `<span class="persona-tag">감독 코칭: ${personaName}</span>`;
      html += '<ul class="briefing-list">';
      lines.forEach(line => {
        // 불렛포인트 기호 제거 후 깔끔하게 표시
        const cleanLine = line.replace(/^[•\-\*\d\.\s]+/, '');
        html += `<li>${cleanLine}</li>`;
      });
      html += '</ul>';

      adviceContent.innerHTML = html;
    } else {
      adviceContent.innerHTML = '<p class="placeholder-text">답변을 생성하지 못했습니다. 다시 시도해 주세요.</p>';
    }

  } catch (error) {
    console.error("Gemini API 호출 실패:", error);
    adviceContent.innerHTML = `
      <p style="color: #ef4444; font-weight: bold;">⚠️ 오류 발생</p>
      <p style="color: #cbd5e1; font-size: 0.85rem; margin-top: 6px;">
        ${error.message}<br>
        (API 키가 올바른지, 인터넷 연결 상태가 정상인지 확인해 주세요.)
      </p>
    `;
  } finally {
    loadingSpinner.style.display = 'none';
  }
});
