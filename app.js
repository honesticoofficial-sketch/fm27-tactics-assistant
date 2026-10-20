// ============================================================
// FM27 Matchday Tactical Playbook - Core Engine
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ------------------------------------------------------------
  // 1. 감독 페르소나 데이터베이스 (8대 명장 + 커스텀 확장)
  // ------------------------------------------------------------
  const COACH_DATABASE = {
    pep: {
      name: "펩 과르디올라",
      club: "맨체스터 시티",
      league: "epl",
      avatar: "https://upload.wikimedia.org/wikipedia/commons/3/37/Pep_Guardiola_2021.jpg",
      motto: "\"공을 소유하면 상대는 절대 우리 골문에 도달할 수 없다.\"",
      tags: ["#점유율축구", "#인버티드풀백", "#하프스페이스", "#3-2빌드업"],
      voice: "극단적 점유율과 공간 지배. 3-2 빌드업과 하프스페이스 과부하를 집요하게 요구하는 사령관 말투.",
      homage: "2011 바르샤 메시 펄스 나인(제로톱) 및 2023 맨시티 스톤스 인버티드 센터백 기용"
    },
    klopp: {
      name: "위르겐 클롭",
      club: "전 리버풀 / 레드불",
      league: "epl",
      avatar: "https://upload.wikimedia.org/wikipedia/commons/f/fe/J%C3%BCrgen_Klopp.jpg",
      motto: "\"최고의 플레이메이커는 바로 게겐프레싱이다!\"",
      tags: ["#게겐프레싱", "#헤비메탈축구", "#8초역습", "#풀백폭격"],
      voice: "거칠고 에너지 넘치는 록앤롤. 상대가 숨도 못 쉬게 전방에서 즉각 압박해 8초 안에 끝내라는 열정적 말투.",
      homage: "2019 안필드의 기적 (고강도 게겐프레싱 + 양 풀백 크로스 화력 폭격)"
    },
    mourinho: {
      name: "조제 무리뉴",
      club: "페네르바체 / 전 첼시·인테르",
      league: "seriea",
      avatar: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Jos%C3%A9_Mourinho_2020_%28cropped%29.jpg",
      motto: "\"실수하지 않는 자가 이긴다. 이기는 것만이 유일한 진리다.\"",
      tags: ["#2줄수비", "#실리롱카운터", "#승점3점잠그기", "#멘탈리티"],
      voice: "냉소적이고 실리적인 승부사. 점유율은 상대에게 던져주고 2줄 수비 블록 후 원샷원킬 롱카운터를 강조하는 말투.",
      homage: "2010 인테르 캄프 누 텐백 (사무엘 에투 윙백 수비 가담) 및 2004-05 첼시 짠물 1실점 수비"
    },
    ancelotti: {
      name: "카를로 안첼로티",
      club: "레알 마드리드",
      league: "laliga",
      avatar: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Carlo_Ancelotti_2012_%28cropped%29.jpg",
      motto: "\"축구는 간단하다. 선수가 편안하게 최고의 재능을 발휘하게 하라.\"",
      tags: ["#선수개성극대화", "#창의적자율도", "#유연한밸런스", "#챔스역전드라마"],
      voice: "차분하고 인자한 덕장. 선수들의 장점을 가장 잘 살리는 포지션 배치와 경기 후반 위닝 멘탈리티를 주문하는 말투.",
      homage: "2022·2024 레알 마드리드 챔스 역전극 (4-3-1-2 다이아몬드 및 속공 조커 투입)"
    },
    simeone: {
      name: "디에고 시메오네",
      club: "아틀레티코 마드리드",
      league: "laliga",
      avatar: "https://upload.wikimedia.org/wikipedia/commons/4/43/Diego_Simeone_2016.jpg",
      motto: "\"우리는 전장에 나가는 전사들이다. 1초도 쉬지 마라!\"",
      tags: ["#4-4-2두줄버스", "#육탄수비", "#세트피스결정타", "#전사정신"],
      voice: "피 끓는 전사들의 대장. 빈틈없는 4-4-2 두 줄 수비 블록과 육탄 방어, 세트피스 한 방을 벼리는 투지 넘치는 말투.",
      homage: "2014 아틀레티코 마드리드 라리가 우승 (질식 4-4-2 콤팩트 수비와 세트피스 결승골)"
    },
    flick: {
      name: "한지 플릭",
      club: "FC 바르셀로나 / 전 바이에른",
      league: "laliga",
      avatar: "https://upload.wikimedia.org/wikipedia/commons/0/07/Hansi_Flick_2020_%28cropped%29.jpg",
      motto: "\"라인을 극단으로 올려라. 상대 진영에서 경기를 끝내버린다.\"",
      tags: ["#무자비한하이라인", "#8-2압살프레싱", "#오프사이드트랩", "#질식공격"],
      voice: "단호하고 공격적인 완벽주의자. 하이라인과 끈질긴 오프사이드 트랩, 90분 내내 이어지는 질식 프레싱을 지시하는 말투.",
      homage: "2020 바이에른 뮌헨 8-2 대승의 무자비한 하이라인 전방 압박과 2024 바르샤 오프사이드 트랩"
    },
    arteta: {
      name: "미켈 아르테타",
      club: "아스날 FC",
      league: "epl",
      avatar: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Mikel_Arteta_2021_%28cropped%29.png",
      motto: "\"우리는 매 순간 피치 위의 모든 1인치를 완벽히 통제해야 한다.\"",
      tags: ["#세트피스지배", "#1인치통제", "#수비전환안정", "#4-4-2하이브리드"],
      voice: "학구적이고 체계적인 전략가. 정밀한 세트피스 약속 패턴과 4-4-2 수비 블록으로 1인치의 공간도 허용하지 않는 말투.",
      homage: "2024 아스날 세트피스 득점 지배 및 맨시티전 단단한 4-4-2 로우/미들 하이브리드 블록"
    },
    ange: {
      name: "엔제 포스테코글루",
      club: "토트넘 홋스퍼",
      league: "epl",
      avatar: "https://upload.wikimedia.org/wikipedia/commons/d/da/Ange_Postecoglou_%28cropped%29.jpg",
      motto: "\"우리는 결코 물러서지 않는다. 그것이 우리가 플레이하는 방식이다.\"",
      tags: ["#극단적하이라인", "#낭만공격축구", "#뒤없는전진", "#압도적슈팅"],
      voice: "뚝심 있고 낭만적인 야전사령관. 몇 명이 퇴장당하든 라인을 중앙선까지 올리고 앞으로만 돌진하라는 화끈한 말투.",
      homage: "2023 토트넘 첼시전 9명으로도 유지한 극단적 하이라인 투혼"
    }
  };

  // ------------------------------------------------------------
  // 2. 앱 전역 상태 관리
  // ------------------------------------------------------------
  const STATE = {
    selectedCoachKey: 'pep',
    customCoachName: '',
    squadTiers: {
      attack: '호각',
      midfield: '호각',
      defense: '호각'
    },
    slot1Image: null, // DataURL
    slot2Image: null, // DataURL
    activeSlot: 1,    // 1 or 2
    mediaStream: null,
    isAnalyzing: false,
    latestResultData: null,
    lastErrorLog: ''
  };

  // ------------------------------------------------------------
  // 3. DOM 요소 캐싱
  // ------------------------------------------------------------
  const apiKeyInput = document.getElementById('apiKey');
  const saveKeyBtn = document.getElementById('saveKeyBtn');
  const keyStatusDot = document.getElementById('keyStatusDot');

  const countryFilter = document.getElementById('countryFilter');
  const managerSelect = document.getElementById('managerSelect');
  const customCoachRow = document.getElementById('customCoachRow');
  const customCoachNameInput = document.getElementById('customCoachName');

  const coachAvatar = document.getElementById('coachAvatar');
  const avatarFallback = document.getElementById('avatarFallback');
  const coachNameEl = document.getElementById('coachName');
  const coachClubBadge = document.getElementById('coachClubBadge');
  const coachMottoEl = document.getElementById('coachMotto');
  const coachTagsContainer = document.getElementById('coachTags');

  const tierRows = document.querySelectorAll('.tier-row');

  const toggleStreamBtn = document.getElementById('toggleStreamBtn');
  const liveVideo = document.getElementById('liveVideo');
  const monitorPlaceholder = document.getElementById('monitorPlaceholder');

  const slot1 = document.getElementById('slot1');
  const slot2 = document.getElementById('slot2');
  const slot1Img = document.getElementById('slot1Img');
  const slot2Img = document.getElementById('slot2Img');
  const slot1Preview = document.getElementById('slot1Preview');
  const slot2Preview = document.getElementById('slot2Preview');
  const slot1ClearBtn = document.getElementById('slot1ClearBtn');
  const slot2ClearBtn = document.getElementById('slot2ClearBtn');
  const slot1SnapBtn = document.getElementById('slot1SnapBtn');
  const slot2SnapBtn = document.getElementById('slot2SnapBtn');
  const slot1PasteBtn = document.getElementById('slot1PasteBtn');
  const slot2PasteBtn = document.getElementById('slot2PasteBtn');
  const slot1FileInput = document.getElementById('slot1FileInput');
  const slot2FileInput = document.getElementById('slot2FileInput');

  const analyzeBtn = document.getElementById('analyzeBtn');
  const cooldownBar = document.getElementById('cooldownBar');
  const snapshotCanvas = document.getElementById('snapshotCanvas');

  const activeCoachBadge = document.getElementById('activeCoachBadge');
  const analysisStatusBadge = document.getElementById('analysisStatusBadge');
  const coachVoiceBox = document.getElementById('coachVoiceBox');
  const voiceSpeaker = document.getElementById('voiceSpeaker');
  const voiceQuote = document.getElementById('voiceQuote');
  const loadingScanner = document.getElementById('loadingScanner');
  const summaryCardsContainer = document.getElementById('summaryCardsContainer');

  const previewMatchup = document.getElementById('previewMatchup');
  const previewPlanA = document.getElementById('previewPlanA');
  const previewScenarios = document.getElementById('previewScenarios');
  const previewOnePoint = document.getElementById('previewOnePoint');

  const detailModalOverlay = document.getElementById('detailModalOverlay');
  const modalIcon = document.getElementById('modalIcon');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalConfirmBtn = document.getElementById('modalConfirmBtn');

  const unreadableModalOverlay = document.getElementById('unreadableModalOverlay');
  const unreadableCloseBtn = document.getElementById('unreadableCloseBtn');
  const unreadableConfirmBtn = document.getElementById('unreadableConfirmBtn');

  const errorReportBtn = document.getElementById('errorReportBtn');
  const toastContainer = document.getElementById('toastContainer');

  // ------------------------------------------------------------
  // 4. 유틸리티 함수: 토스트 알림
  // ------------------------------------------------------------
  function showToast(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  // ------------------------------------------------------------
  // 5. API 키 설정 (BYOK 및 LocalStorage)
  // ------------------------------------------------------------
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
      showToast('🔑 Gemini API 키가 브라우저에 안전하게 저장되었습니다!');
    } else {
      localStorage.removeItem('fm27_gemini_api_key');
      updateKeyStatus();
      showToast('API 키가 삭제되었습니다.');
    }
  });

  // ------------------------------------------------------------
  // 6. 감독 쇼케이스 렌더링 & 페르소나 변경
  // ------------------------------------------------------------
  function updateCoachProfile(coachKey) {
    STATE.selectedCoachKey = coachKey;

    if (coachKey === 'custom') {
      customCoachRow.style.display = 'block';
      const cName = customCoachNameInput.value.trim() || '커스텀 사령탑';
      coachNameEl.textContent = cName;
      coachClubBadge.textContent = '자유 계약';
      coachMottoEl.textContent = '"내 철학에 맞춰 피치를 완벽하게 지배한다."';
      coachAvatar.style.display = 'none';
      avatarFallback.style.display = 'block';
      avatarFallback.textContent = '👔';
      coachTagsContainer.innerHTML = '<span class="coach-tag-pill">#커스텀전술</span><span class="coach-tag-pill">#독창적철학</span>';
      activeCoachBadge.textContent = `사령탑: ${cName}`;
      return;
    }

    customCoachRow.style.display = 'none';
    const coach = COACH_DATABASE[coachKey];
    if (!coach) return;

    coachNameEl.textContent = coach.name;
    coachClubBadge.textContent = coach.club;
    coachMottoEl.textContent = coach.motto;

    coachAvatar.style.display = 'block';
    avatarFallback.style.display = 'none';
    coachAvatar.src = coach.avatar;
    coachAvatar.onerror = () => {
      coachAvatar.style.display = 'none';
      avatarFallback.style.display = 'block';
      avatarFallback.textContent = '⚽';
    };

    coachTagsContainer.innerHTML = coach.tags
      .map(tag => `<span class="coach-tag-pill">${tag}</span>`)
      .join('');

    activeCoachBadge.textContent = `사령탑: ${coach.name}`;
  }

  managerSelect.addEventListener('change', (e) => {
    updateCoachProfile(e.target.value);
  });

  customCoachNameInput.addEventListener('input', () => {
    if (STATE.selectedCoachKey === 'custom') {
      updateCoachProfile('custom');
    }
  });

  countryFilter.addEventListener('change', (e) => {
    const val = e.target.value;
    const options = managerSelect.querySelectorAll('option');
    options.forEach(opt => {
      const cKey = opt.value;
      if (cKey === 'custom') {
        opt.style.display = 'block';
        return;
      }
      const coach = COACH_DATABASE[cKey];
      if (val === 'all' || (coach && coach.league === val)) {
        opt.style.display = 'block';
      } else {
        opt.style.display = 'none';
      }
    });
    // 첫 보이는 옵션으로 선택
    const firstVisible = Array.from(options).find(opt => opt.style.display !== 'none');
    if (firstVisible) {
      managerSelect.value = firstVisible.value;
      updateCoachProfile(firstVisible.value);
    }
  });

  // 초기 로딩 시 기본 펩 과르디올라 프로필 설정
  updateCoachProfile('pep');

  // ------------------------------------------------------------
  // 7. 상대 대비 스쿼드 체급 비교 (3구역 피치 매트릭스)
  // ------------------------------------------------------------
  tierRows.forEach(row => {
    const zone = row.dataset.zone;
    const btns = row.querySelectorAll('.tier-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        STATE.squadTiers[zone] = btn.dataset.val;
      });
    });
  });

  // ------------------------------------------------------------
  // 8. 실시간 화면 공유 (완벽 중앙 정렬 모니터)
  // ------------------------------------------------------------
  async function startScreenShare() {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { cursor: "always" },
        audio: false
      });
      STATE.mediaStream = stream;
      liveVideo.srcObject = stream;
      liveVideo.style.display = 'block';
      monitorPlaceholder.style.display = 'none';
      toggleStreamBtn.textContent = '⏹️ 공유 중지';
      toggleStreamBtn.classList.add('btn-primary');
      toggleStreamBtn.classList.remove('btn-outline');
      showToast('🖥️ FM27 화면이 성공적으로 연결되었습니다!');

      stream.getVideoTracks()[0].onended = () => {
        stopScreenShare();
      };
    } catch (err) {
      console.warn("Screen share cancelled/failed:", err);
      showToast('화면 공유가 취소되었습니다.');
    }
  }

  function stopScreenShare() {
    if (STATE.mediaStream) {
      STATE.mediaStream.getTracks().forEach(t => t.stop());
      STATE.mediaStream = null;
    }
    liveVideo.srcObject = null;
    liveVideo.style.display = 'none';
    monitorPlaceholder.style.display = 'flex';
    toggleStreamBtn.textContent = '🖥️ 화면 공유 시작';
    toggleStreamBtn.classList.remove('btn-primary');
    toggleStreamBtn.classList.add('btn-outline');
  }

  toggleStreamBtn.addEventListener('click', () => {
    if (STATE.mediaStream) {
      stopScreenShare();
    } else {
      startScreenShare();
    }
  });

  // ------------------------------------------------------------
  // 9. 2장 캡처 슬롯 조작 & 유연한 해상도 검사
  // ------------------------------------------------------------
  function setActiveSlot(slotNum) {
    STATE.activeSlot = slotNum;
    if (slotNum === 1) {
      slot1.classList.add('active');
      slot2.classList.remove('active');
    } else {
      slot2.classList.add('active');
      slot1.classList.remove('active');
    }
  }

  slot1.addEventListener('click', () => setActiveSlot(1));
  slot2.addEventListener('click', () => setActiveSlot(2));

  function updateAnalyzeButtonState() {
    const hasAnyImage = !!(STATE.slot1Image || STATE.slot2Image);
    analyzeBtn.disabled = !hasAnyImage || STATE.isAnalyzing;
    if (hasAnyImage) {
      analyzeBtn.title = "매치데이 전술 플레이북 생성 (Ctrl+Enter)";
    } else {
      analyzeBtn.title = "슬롯에 최소 1장의 전술 이미지를 등록해 주세요";
    }
  }

  function applyImageToSlot(slotNum, dataUrl) {
    const imgObj = new Image();
    imgObj.onload = () => {
      // 유연한 해상도 검문: 가로 600px 미만 시 친절한 안내 토스트
      if (imgObj.naturalWidth < 600) {
        showToast('⚠️ 이미지 가로 해상도가 600px 미만입니다. 글자가 작을 경우 분석이 제한될 수 있습니다.', 4000);
      }

      if (slotNum === 1) {
        STATE.slot1Image = dataUrl;
        slot1Img.src = dataUrl;
        slot1Img.style.display = 'block';
        slot1Preview.querySelector('.empty-slot-msg').style.display = 'none';
        slot1ClearBtn.style.display = 'block';
        showToast('📋 슬롯 1에 [내 전술판]이 등록되었습니다!');
      } else {
        STATE.slot2Image = dataUrl;
        slot2Img.src = dataUrl;
        slot2Img.style.display = 'block';
        slot2Preview.querySelector('.empty-slot-msg').style.display = 'none';
        slot2ClearBtn.style.display = 'block';
        showToast('🎯 슬롯 2에 [상대 분석/라인업]이 등록되었습니다!');
      }
      updateAnalyzeButtonState();
    };
    imgObj.src = dataUrl;
  }

  function clearSlot(slotNum) {
    if (slotNum === 1) {
      STATE.slot1Image = null;
      slot1Img.src = '';
      slot1Img.style.display = 'none';
      slot1Preview.querySelector('.empty-slot-msg').style.display = 'flex';
      slot1ClearBtn.style.display = 'none';
      slot1FileInput.value = '';
    } else {
      STATE.slot2Image = null;
      slot2Img.src = '';
      slot2Img.style.display = 'none';
      slot2Preview.querySelector('.empty-slot-msg').style.display = 'flex';
      slot2ClearBtn.style.display = 'none';
      slot2FileInput.value = '';
    }
    updateAnalyzeButtonState();
  }

  slot1ClearBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    clearSlot(1);
  });

  slot2ClearBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    clearSlot(2);
  });

  // 영상 프레임 즉시 스냅 캡처
  function snapFromLiveVideo(slotNum) {
    if (!STATE.mediaStream || liveVideo.videoWidth === 0) {
      showToast('먼저 [화면 공유 시작] 버튼을 눌러 FM27 창을 연결해 주세요!');
      return;
    }
    snapshotCanvas.width = liveVideo.videoWidth;
    snapshotCanvas.height = liveVideo.videoHeight;
    const ctx = snapshotCanvas.getContext('2d');
    ctx.drawImage(liveVideo, 0, 0, snapshotCanvas.width, snapshotCanvas.height);
    const dataUrl = snapshotCanvas.toDataURL('image/jpeg', 0.9);
    applyImageToSlot(slotNum, dataUrl);
  }

  slot1SnapBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    snapFromLiveVideo(1);
  });

  slot2SnapBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    snapFromLiveVideo(2);
  });

  // 클립보드 붙여넣기 버튼
  async function pasteFromClipboardBtn(slotNum) {
    try {
      if (navigator.clipboard && navigator.clipboard.read) {
        const items = await navigator.clipboard.read();
        for (const item of items) {
          const imageType = item.types.find(t => t.startsWith('image/'));
          if (imageType) {
            const blob = await item.getType(imageType);
            const reader = new FileReader();
            reader.onload = (e) => applyImageToSlot(slotNum, e.target.result);
            reader.readAsDataURL(blob);
            return;
          }
        }
      }
      showToast('클립보드에 이미지가 없습니다. Win+Shift+S로 캡처 후 눌러주세요!');
    } catch (err) {
      console.warn("Clipboard read error:", err);
      showToast('브라우저 권한 필요: 웹 화면을 클릭하고 [Ctrl + V]를 눌러주세요!');
    }
  }

  slot1PasteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    pasteFromClipboardBtn(1);
  });

  slot2PasteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    pasteFromClipboardBtn(2);
  });

  // 파일 업로드 핸들러
  function handleFileSelect(e, slotNum) {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (evt) => applyImageToSlot(slotNum, evt.target.result);
      reader.readAsDataURL(file);
    }
  }

  slot1FileInput.addEventListener('change', (e) => handleFileSelect(e, 1));
  slot2FileInput.addEventListener('change', (e) => handleFileSelect(e, 2));

  // ------------------------------------------------------------
  // 10. 전역 키보드 단축키 & 전역 Ctrl+V 리스너
  // ------------------------------------------------------------
  document.addEventListener('keydown', (e) => {
    // 텍스트 입력 중일 때는 단축키 무시
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
      return;
    }

    if (e.key === '1') {
      setActiveSlot(1);
      showToast('슬롯 1 [내 전술판] 선택됨');
    } else if (e.key === '2') {
      setActiveSlot(2);
      showToast('슬롯 2 [상대 분석/라인업] 선택됨');
    } else if (e.key === 'Escape') {
      closeAllModals();
    } else if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      if (!analyzeBtn.disabled) {
        analyzeBtn.click();
      }
    }
  });

  window.addEventListener('paste', (e) => {
    // API 키 입력창 등에 텍스트 붙여넣기 중이면 가로채지 않음
    if (document.activeElement === apiKeyInput || document.activeElement === customCoachNameInput) {
      return;
    }

    const items = (e.clipboardData || e.originalEvent.clipboardData).items;
    let foundImage = false;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        foundImage = true;
        const blob = items[i].getAsFile();
        const reader = new FileReader();
        reader.onload = (event) => {
          // 비어있는 슬롯에 먼저 채우고, 둘 다 채워져 있으면 현재 활성 슬롯에 교체
          let targetSlot = STATE.activeSlot;
          if (!STATE.slot1Image) {
            targetSlot = 1;
          } else if (!STATE.slot2Image) {
            targetSlot = 2;
          }
          setActiveSlot(targetSlot);
          applyImageToSlot(targetSlot, event.target.result);
        };
        reader.readAsDataURL(blob);
        break;
      }
    }
  });

  // 드래그 앤 드롭 지원
  [slot1, slot2].forEach((slotEl, idx) => {
    const slotNum = idx + 1;
    slotEl.addEventListener('dragover', (e) => {
      e.preventDefault();
      slotEl.style.borderColor = 'var(--pitch-neon)';
    });
    slotEl.addEventListener('dragleave', () => {
      slotEl.style.borderColor = '';
    });
    slotEl.addEventListener('drop', (e) => {
      e.preventDefault();
      slotEl.style.borderColor = '';
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0];
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (evt) => applyImageToSlot(slotNum, evt.target.result);
          reader.readAsDataURL(file);
        }
      }
    });
  });

  // ------------------------------------------------------------
  // 11. Gemini API 시스템 프롬프트 (사령탑 200% 몰입 & 동적 오마주)
  // ------------------------------------------------------------
  function buildSystemPrompt() {
    let coachName = "펩 과르디올라";
    let coachVoiceGuide = "";
    let coachHomageRef = "";

    if (STATE.selectedCoachKey === 'custom') {
      coachName = customCoachNameInput.value.trim() || "세계적 명장";
      coachVoiceGuide = `당신은 ${coachName} 감독 본인입니다. 당신의 실제 인터뷰 말투, 독창적인 축구 철학, 시그니처 전술관을 200% 완벽히 빙의(Role-play)하여 지휘하십시오.`;
      coachHomageRef = `해당 감독이 실제 역사 속에서 강팀이나 난적을 상대로 보여준 전술적 승부수를 현재 상황에 맞춰 처방하십시오.`;
    } else {
      const coach = COACH_DATABASE[STATE.selectedCoachKey];
      coachName = coach.name;
      coachVoiceGuide = coach.voice;
      coachHomageRef = coach.homage;
    }

    return `당신은 세계 최고의 축구 전술 사령탑인 [${coachName}] 감독 본인입니다.
당신은 FM27(Football Manager) 게임의 전술 및 상대 분석 스크린샷을 분석하여 경기 시작 전 완벽한 승리 공식을 제공하는 '매치데이 전술 연구소'의 수석 사령관입니다.

[사령탑 페르소나 및 화법 지침 (극도로 중요!)]:
- 당신은 ${coachName} 감독의 말투, 철학, 축구관에 완전히 몰입(Role-play)해야 합니다.
- 화법 가이드: "${coachVoiceGuide}"
- FM 유저가 읽었을 때 "진짜 ${coachName} 감독이 라커룸에서 나에게 브리핑하는 것 같다!"는 전율을 느껴야 합니다.

[상황별 체급 비교 데이터]:
- 상대 대비 공격진: [${STATE.squadTiers.attack}]
- 상대 대비 미드필더: [${STATE.squadTiers.midfield}]
- 상대 대비 수비진: [${STATE.squadTiers.defense}]

[엄격한 필터링 원칙 및 오마주 가이드라인]:
- 역사적 오마주 참고: "${coachHomageRef}"
- 억지로 오마주 이름을 팔거나 상황에 안 맞는데 끼워 맞추지 마십시오.
- 오직 현재 스크린샷의 상대 포메이션, 취약 공간, 그리고 위의 체급 비교 결과가 당신의 시그니처 전술이 실제로 빛을 발할 수 있는 '정확한 상황'일 때만 은근하고 깊이 있게 인게임 FM 전술 버튼(역할 롤, 수비 라인, 패스 템포, 전술 지침) 조작값으로 녹여내어 추천하십시오.

[안전장치 - 판독 불가 규칙 (매우 중요!)]:
- 만약 업로드된 이미지가 축구 게임(FM27) 화면이 전혀 아니거나, 글자 및 전술판이 너무 심하게 깨져 판독이 불가능하다면 아무 말도 덧붙이지 말고 정확히 "UNREADABLE_SCREEN" 이 한 단어만 출력하십시오.

[출력 형식 - 순수 JSON]:
반드시 마크다운 백틱(\`\`\`json) 없는 순수한 유효한 JSON 형식으로만 응답해야 합니다.
JSON 구조는 다음과 같아야 합니다:
{
  "coach_voice_intro": "사령탑 본인의 생생한 라커룸 한마디 (2~3문장)",
  "summary_badges": {
    "matchup": "상대 약점 및 상성 진단 한눈 요약 (2~3줄)",
    "plana": "플랜 A 선발 포메이션 및 핵심 지침 요약 (2~3줄)",
    "scenarios": "리드 시 굳히기(플랜 B) & 열세 시 역전(플랜 C) 요약 (2~3줄)",
    "onepoint": "상대 에이스 전담 마크 및 세트피스/오마주 요약 (2~3줄)"
  },
  "matchup_detail": "HTML 포맷의 상세 상성 진단 (상대 핵심 공격 루트, 수비 취약 공간, 우리 스쿼드와의 맞대결 유불리)",
  "plan_a_detail": "HTML 포맷의 플랜 A 스타팅 오더 (추천 포메이션, 핵심 선수 3인의 세부 롤, 그리고 템포/패스직접도/수비라인/압박선 슬라이더 수치)",
  "scenario_detail": "HTML 포맷의 시나리오별 대처 (60분경 1:0 리드 시 잠그는 플랜 B 세부 수치 vs 0:1 열세 시 총공세로 뒤집는 플랜 C 세부 수치)",
  "onepoint_detail": "HTML 포맷의 원포인트 조언 (특정 상대 선수 맨마킹, 세트피스 수비/공격 지침, 그리고 이번 경기에 딱 맞는 역사적 오마주 비기)"
}`;
  }

  // ------------------------------------------------------------
  // 12. 분석 실행 (Gemini Vision API 호출)
  // ------------------------------------------------------------
  analyzeBtn.addEventListener('click', async () => {
    const apiKey = apiKeyInput.value.trim();
    if (!apiKey) {
      showToast('상단의 [Gemini API 키] 입력창에 무료 API 키를 먼저 넣어주세요!');
      apiKeyInput.focus();
      return;
    }

    if (!STATE.slot1Image && !STATE.slot2Image) {
      showToast('최소 1장의 전술 화면(슬롯 1 권장)을 등록해 주세요!');
      return;
    }

    STATE.isAnalyzing = true;
    updateAnalyzeButtonState();
    loadingScanner.style.display = 'flex';
    summaryCardsContainer.style.opacity = '0.3';
    coachVoiceBox.style.display = 'none';
    analysisStatusBadge.textContent = '분석 중...';
    analysisStatusBadge.style.color = 'var(--pitch-neon)';

    try {
      const systemInstruction = buildSystemPrompt();

      // 전송할 이미지 파트 구성
      const parts = [
        { text: systemInstruction }
      ];

      if (STATE.slot1Image) {
        const base64Data1 = STATE.slot1Image.split(',')[1];
        parts.push({
          text: "[슬롯 1: 내 전술판 (My Tactics 화면)]"
        });
        parts.push({
          inlineData: {
            mimeType: "image/jpeg",
            data: base64Data1
          }
        });
      }

      if (STATE.slot2Image) {
        const base64Data2 = STATE.slot2Image.split(',')[1];
        parts.push({
          text: "[슬롯 2: 상대 분석 스카우팅 / 라인업 (Opponent 화면)]"
        });
        parts.push({
          inlineData: {
            mimeType: "image/jpeg",
            data: base64Data2
          }
        });
      }

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts }]
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`API 요청 실패 (${response.status}): ${errText}`);
      }

      const resJson = await response.json();
      const rawText = resJson?.candidates?.[0]?.content?.parts?.[0]?.text || '';

      // 판독 불가 여부 검사
      if (rawText.trim().includes('UNREADABLE_SCREEN')) {
        unreadableModalOverlay.style.display = 'flex';
        analysisStatusBadge.textContent = '판독 실패';
        analysisStatusBadge.style.color = 'var(--accent-rose)';
        return;
      }

      // JSON 파싱 (마크다운 백틱 청소)
      let cleanedJsonStr = rawText.trim();
      if (cleanedJsonStr.startsWith('```json')) {
        cleanedJsonStr = cleanedJsonStr.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleanedJsonStr.startsWith('```')) {
        cleanedJsonStr = cleanedJsonStr.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }

      const parsedData = JSON.parse(cleanedJsonStr);
      STATE.latestResultData = parsedData;

      // 화면에 브리핑 결과 렌더링
      renderPlaybookResults(parsedData);
      showToast('🎉 매치데이 전술 플레이북이 완성되었습니다!');

    } catch (err) {
      console.error("Analysis Error:", err);
      STATE.lastErrorLog = `${new Date().toISOString()} - ${err.message}`;
      showToast(`❌ 분석 중 오류가 발생했습니다: ${err.message}`, 5000);
      analysisStatusBadge.textContent = '오류 발생';
      analysisStatusBadge.style.color = 'var(--accent-rose)';
    } finally {
      STATE.isAnalyzing = false;
      updateAnalyzeButtonState();
      loadingScanner.style.display = 'none';
      summaryCardsContainer.style.opacity = '1';
    }
  });

  // ------------------------------------------------------------
  // 13. 브리핑 결과 렌더링
  // ------------------------------------------------------------
  function renderPlaybookResults(data) {
    const coachName = STATE.selectedCoachKey === 'custom' 
      ? (customCoachNameInput.value.trim() || '사령탑')
      : COACH_DATABASE[STATE.selectedCoachKey].name;

    // 사령탑 인트로 음성 박스
    if (data.coach_voice_intro) {
      voiceSpeaker.textContent = `${coachName} 감독의 라커룸 브리핑:`;
      voiceQuote.textContent = `"${data.coach_voice_intro}"`;
      coachVoiceBox.style.display = 'flex';
    }

    // 4대 요약 카드 프리뷰 업데이트
    if (data.summary_badges) {
      previewMatchup.innerHTML = `<p>${data.summary_badges.matchup}</p>`;
      previewPlanA.innerHTML = `<p>${data.summary_badges.plana}</p>`;
      previewScenarios.innerHTML = `<p>${data.summary_badges.scenarios}</p>`;
      previewOnePoint.innerHTML = `<p>${data.summary_badges.onepoint}</p>`;
    }

    analysisStatusBadge.textContent = '작전 수립 완료';
    analysisStatusBadge.style.color = 'var(--pitch-neon)';
  }

  // ------------------------------------------------------------
  // 14. 고정형 상세 모달 팝업 열기/닫기
  // ------------------------------------------------------------
  const summaryCards = document.querySelectorAll('.playbook-badge-card');
  summaryCards.forEach(card => {
    card.addEventListener('click', () => {
      if (!STATE.latestResultData) {
        showToast('먼저 [전술 플레이북 생성]을 실행해 주세요!');
        return;
      }

      const cardType = card.dataset.card;
      openDetailModal(cardType);
    });
  });

  function openDetailModal(cardType) {
    const data = STATE.latestResultData;
    if (!data) return;

    if (cardType === 'matchup') {
      modalIcon.textContent = '⚔️';
      modalTitle.textContent = '상성 진단 (상대 약점 및 매치업 정밀 분석)';
      modalBody.innerHTML = data.matchup_detail || data.summary_badges?.matchup || '상세 내용이 없습니다.';
    } else if (cardType === 'plana') {
      modalIcon.textContent = '📋';
      modalTitle.textContent = '플랜 A (스타팅 오더 & 인게임 지침 슬라이더)';
      modalBody.innerHTML = data.plan_a_detail || data.summary_badges?.plana || '상세 내용이 없습니다.';
    } else if (cardType === 'scenarios') {
      modalIcon.textContent = '🔄';
      modalTitle.textContent = '시나리오별 대처 (플랜 B 리드 잠그기 vs 플랜 C 역전 총공세)';
      modalBody.innerHTML = data.scenario_detail || data.summary_badges?.scenarios || '상세 내용이 없습니다.';
    } else if (cardType === 'onepoint') {
      modalIcon.textContent = '💡';
      modalTitle.textContent = '원포인트 조언 (상대 에이스 맨마크 & 역사적 오마주 비기)';
      modalBody.innerHTML = data.onepoint_detail || data.summary_badges?.onepoint || '상세 내용이 없습니다.';
    }

    detailModalOverlay.style.display = 'flex';
  }

  function closeAllModals() {
    detailModalOverlay.style.display = 'none';
    unreadableModalOverlay.style.display = 'none';
  }

  modalCloseBtn.addEventListener('click', closeAllModals);
  modalConfirmBtn.addEventListener('click', closeAllModals);
  unreadableCloseBtn.addEventListener('click', closeAllModals);
  unreadableConfirmBtn.addEventListener('click', closeAllModals);

  detailModalOverlay.addEventListener('click', (e) => {
    if (e.target === detailModalOverlay) closeAllModals();
  });

  unreadableModalOverlay.addEventListener('click', (e) => {
    if (e.target === unreadableModalOverlay) closeAllModals();
  });

  // ------------------------------------------------------------
  // 15. 오류 제보 / 로그 클립보드 복사
  // ------------------------------------------------------------
  errorReportBtn.addEventListener('click', () => {
    const reportData = {
      timestamp: new Date().toISOString(),
      coach: STATE.selectedCoachKey,
      customCoach: STATE.customCoachName,
      tiers: STATE.squadTiers,
      hasSlot1: !!STATE.slot1Image,
      hasSlot2: !!STATE.slot2Image,
      lastError: STATE.lastErrorLog || "최근 기록된 에러 없음"
    };

    const textToCopy = `[FM27 플레이북 오류 제보 로그]\n${JSON.stringify(reportData, null, 2)}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      showToast('📋 시스템 디버그 로그가 클립보드에 복사되었습니다! 개발자에게 전달해 주세요.');
    }).catch(() => {
      showToast('로그 복사에 실패했습니다.');
    });
  });

});
