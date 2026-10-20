// ============================================================
// FM27 Matchday Tactical Playbook - Core Engine (v5)
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
      tacticalBias: "점유율 60% 이상 확보, 인버티드 풀백(IWB) 및 센터백 전진 배치, 숏패스 빌드업"
    },
    klopp: {
      name: "위르겐 클롭",
      club: "전 리버풀 / 레드불",
      league: "epl",
      avatar: "https://upload.wikimedia.org/wikipedia/commons/f/fe/J%C3%BCrgen_Klopp.jpg",
      motto: "\"최고의 플레이메이커는 바로 게겐프레싱이다!\"",
      tags: ["#게겐프레싱", "#헤비메탈축구", "#8초역습", "#풀백폭격"],
      voice: "거칠고 에너지 넘치는 록앤롤. 상대가 숨도 못 쉬게 전방에서 즉각 압박해 8초 안에 끝내라는 열정적 말투.",
      tacticalBias: "고강도 게겐프레싱, 볼 탈취 직후 다이렉트 속공, 양 풀백의 과감한 오버래핑 크로스"
    },
    mourinho: {
      name: "조제 무리뉴",
      club: "페네르바체 / 전 첼시·인테르",
      league: "seriea",
      avatar: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Jos%C3%A9_Mourinho_2020_%28cropped%29.jpg",
      motto: "\"실수하지 않는 자가 이긴다. 이기는 것만이 유일한 진리다.\"",
      tags: ["#2줄수비", "#실리롱카운터", "#승점3점잠그기", "#멘탈리티"],
      voice: "냉소적이고 실리적인 승부사. 점유율은 상대에게 던져주고 2줄 수비 블록 후 원샷원킬 롱카운터를 강조하는 말투.",
      tacticalBias: "견고한 로우블록 2줄 수비, 다이렉트 롱카운터, 리드 시 윙어까지 수비 가담시키는 텐백 굳히기"
    },
    ancelotti: {
      name: "카를로 안첼로티",
      club: "레알 마드리드",
      league: "laliga",
      avatar: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Carlo_Ancelotti_2012_%28cropped%29.jpg",
      motto: "\"축구는 간단하다. 선수가 편안하게 최고의 재능을 발휘하게 하라.\"",
      tags: ["#선수개성극대화", "#창의적자율도", "#유연한밸런스", "#챔스역전드라마"],
      voice: "차분하고 인자한 덕장. 선수들의 장점을 가장 잘 살리는 포지션 배치와 경기 후반 위닝 멘탈리티를 주문하는 말투.",
      tacticalBias: "선수 자율성 극대화, 유연한 4-3-1-2 / 4-3-3 밸런스, 에이스의 번뜩이는 역습 한 방"
    },
    simeone: {
      name: "디에고 시메오네",
      club: "아틀레티코 마드리드",
      league: "laliga",
      avatar: "https://upload.wikimedia.org/wikipedia/commons/4/43/Diego_Simeone_2016.jpg",
      motto: "\"우리는 전장에 나가는 전사들이다. 1초도 쉬지 마라!\"",
      tags: ["#4-4-2두줄버스", "#육탄수비", "#세트피스결정타", "#전사정신"],
      voice: "피 끓는 전사들의 대장. 빈틈없는 4-4-2 두 줄 수비 블록과 육탄 방어, 세트피스 한 방을 벼리는 투지 넘치는 말투.",
      tacticalBias: "조밀한 4-4-2 플랫 두 줄 수비, 거친 압박과 태클, 세트피스 집중 공격"
    },
    flick: {
      name: "한지 플릭",
      club: "FC 바르셀로나 / 전 바이에른",
      league: "laliga",
      avatar: "https://upload.wikimedia.org/wikipedia/commons/0/07/Hansi_Flick_2020_%28cropped%29.jpg",
      motto: "\"라인을 극단으로 올려라. 상대 진영에서 경기를 끝내버린다.\"",
      tags: ["#무자비한하이라인", "#8-2압살프레싱", "#오프사이드트랩", "#질식공격"],
      voice: "단호하고 공격적인 완벽주의자. 하이라인과 끈질긴 오프사이드 트랩, 90분 내내 이어지는 질식 프레싱을 지시하는 말투.",
      tacticalBias: "극단적 하이라인 수비, 전방 질식 프레싱, 오프사이드 트랩, 맹렬한 파상 공세"
    },
    arteta: {
      name: "미켈 아르테타",
      club: "아스날 FC",
      league: "epl",
      avatar: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Mikel_Arteta_2021_%28cropped%29.png",
      motto: "\"우리는 매 순간 피치 위의 모든 1인치를 완벽히 통제해야 한다.\"",
      tags: ["#세트피스지배", "#1인치통제", "#수비전환안정", "#4-4-2하이브리드"],
      voice: "학구적이고 체계적인 전략가. 정밀한 세트피스 약속 패턴과 4-4-2 수비 블록으로 1인치의 공간도 허용하지 않는 말투.",
      tacticalBias: "완벽한 세트피스 설계, 안정적인 공수 전환, 단단한 4-4-2 하이브리드 미들 블록"
    },
    ange: {
      name: "엔제 포스테코글루",
      club: "토트넘 홋스퍼",
      league: "epl",
      avatar: "https://upload.wikimedia.org/wikipedia/commons/d/da/Ange_Postecoglou_%28cropped%29.jpg",
      motto: "\"우리는 결코 물러서지 않는다. 그것이 우리가 플레이하는 방식이다.\"",
      tags: ["#극단적하이라인", "#낭만공격축구", "#뒤없는전진", "#압도적슈팅"],
      voice: "뚝심 있고 낭만적인 야전사령관. 몇 명이 퇴장당하든 라인을 중앙선까지 올리고 앞으로만 돌진하라는 화끈한 말투.",
      tacticalBias: "수비라인 극단 전진, 모험적인 전진 패스, 박스 안 다수 숫자 침투 공격"
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
  const setupView = document.getElementById('setupView');
  const briefingView = document.getElementById('briefingView');

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
  const streamStatusPill = document.getElementById('streamStatusPill');
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
  const snapshotCanvas = document.getElementById('snapshotCanvas');

  // 브리핑 뷰 요소
  const backToSetupBtn = document.getElementById('backToSetupBtn');
  const bottomBackBtn = document.getElementById('bottomBackBtn');
  const briefingCoachTag = document.getElementById('briefingCoachTag');
  const briefingTiersTag = document.getElementById('briefingTiersTag');
  const copySummaryBtn = document.getElementById('copySummaryBtn');

  const briefingLoadingBox = document.getElementById('briefingLoadingBox');
  const loadingCoachTitle = document.getElementById('loadingCoachTitle');
  const briefingContentBox = document.getElementById('briefingContentBox');

  const speechAvatar = document.getElementById('speechAvatar');
  const speechAuthor = document.getElementById('speechAuthor');
  const speechQuote = document.getElementById('speechQuote');

  const formationVal = document.getElementById('formationVal');
  const rolesBreakdownList = document.getElementById('rolesBreakdownList');
  const dynamicsBreakdownList = document.getElementById('dynamicsBreakdownList');
  const scenariosBreakdownList = document.getElementById('scenariosBreakdownList');

  const unreadableModalOverlay = document.getElementById('unreadableModalOverlay');
  const unreadableCloseBtn = document.getElementById('unreadableCloseBtn');
  const unreadableConfirmBtn = document.getElementById('unreadableConfirmBtn');

  const errorReportBtn = document.getElementById('errorReportBtn');
  const toastContainer = document.getElementById('toastContainer');

  // ------------------------------------------------------------
  // 4. 화면 전환 함수 (화면 1: 준비실 ↔ 화면 2: 브리핑실)
  // ------------------------------------------------------------
  function switchView(viewName) {
    if (viewName === 'briefing') {
      setupView.style.display = 'none';
      briefingView.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      briefingView.style.display = 'none';
      setupView.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  backToSetupBtn.addEventListener('click', () => switchView('setup'));
  bottomBackBtn.addEventListener('click', () => switchView('setup'));

  // ------------------------------------------------------------
  // 5. 토스트 알림 함수
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
  // 6. API 키 설정 (BYOK 및 LocalStorage)
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
  // 7. 감독 쇼케이스 렌더링 & 페르소나 변경
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
    const firstVisible = Array.from(options).find(opt => opt.style.display !== 'none');
    if (firstVisible) {
      managerSelect.value = firstVisible.value;
      updateCoachProfile(firstVisible.value);
    }
  });

  updateCoachProfile('pep');

  // ------------------------------------------------------------
  // 8. 상대 대비 스쿼드 체급 비교 (3구역 피치 매트릭스)
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
  // 9. 대형 실시간 화면 공유 모니터
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
      streamStatusPill.textContent = '실시간 스트리밍 중';
      streamStatusPill.classList.add('live');
      showToast('🖥️ FM27 화면이 대형 모니터에 성공적으로 연결되었습니다!');

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
    streamStatusPill.textContent = '대기 중';
    streamStatusPill.classList.remove('live');
  }

  toggleStreamBtn.addEventListener('click', () => {
    if (STATE.mediaStream) {
      stopScreenShare();
    } else {
      startScreenShare();
    }
  });

  // ------------------------------------------------------------
  // 10. 2장 캡처 슬롯 조작 & 유연한 해상도 검사
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
  // 11. 전역 단축키 & 전역 Ctrl+V 리스너
  // ------------------------------------------------------------
  document.addEventListener('keydown', (e) => {
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
      unreadableModalOverlay.style.display = 'none';
    } else if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      if (!analyzeBtn.disabled) {
        analyzeBtn.click();
      }
    }
  });

  window.addEventListener('paste', (e) => {
    if (document.activeElement === apiKeyInput || document.activeElement === customCoachNameInput) {
      return;
    }

    const items = (e.clipboardData || e.originalEvent.clipboardData).items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const blob = items[i].getAsFile();
        const reader = new FileReader();
        reader.onload = (event) => {
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
  // 12. 사령탑 100% 몰입 & 실전 공략 시스템 프롬프트
  // ------------------------------------------------------------
  function buildSystemPrompt() {
    let coachName = "펩 과르디올라";
    let coachVoiceGuide = "";
    let coachBias = "";

    if (STATE.selectedCoachKey === 'custom') {
      coachName = customCoachNameInput.value.trim() || "세계적 명장";
      coachVoiceGuide = `당신은 ${coachName} 감독 본인입니다. 당신의 실제 인터뷰 말투, 독창적인 축구 철학, 승리관에 100% 완벽히 몰입(Role-play)하여 지휘하십시오.`;
      coachBias = `해당 감독의 실제 축구 철학에 기반하되, 경기에서 반드시 이길 수 있는 현실적인 전술 지침`;
    } else {
      const coach = COACH_DATABASE[STATE.selectedCoachKey];
      coachName = coach.name;
      coachVoiceGuide = coach.voice;
      coachBias = coach.tacticalBias;
    }

    return `당신은 세계 최고의 축구 전술 사령탑인 [${coachName}] 감독 본인입니다.
당신은 FM27(Football Manager) 게임의 전술판 및 상대 스카우팅 스크린샷을 분석하여 경기 시작 전 완벽한 승리 공식을 제공하는 '매치데이 전술 연구소'의 최고 사령관입니다.

[사령탑 100% 몰입 및 전술 철학 원칙 (절대적 필수 지침)]:
- 당신은 ${coachName} 감독 본인으로 완벽히 빙의(Role-play)해야 합니다.
- 말투와 어조: "${coachVoiceGuide}"
- 전술적 성향: "${coachBias}"
- 모든 조언과 추천은 당신의 축구 성향과 철학대로 흘러가야 합니다.
- 단, 이상론에 그치지 않고 현재 상대팀의 전술적 약점을 파고들어 **"반드시 이길 수 있는 방향"**으로 확실한 실전 해법을 제시하십시오.

[상황별 체급 비교 데이터]:
- 상대 대비 공격진: [${STATE.squadTiers.attack}]
- 상대 대비 미드필더: [${STATE.squadTiers.midfield}]
- 상대 대비 수비진: [${STATE.squadTiers.defense}]

[★ 오마주 관련 절대 규칙 ★]:
- 경기 상황이나 시나리오 중 당신의 역사 속 유명 명경기에서 썼던 시그니처 비책이 있다면 활용하십시오.
- **단, 절대로 "이것은 2010년 인테르 텐백 오마주입니다" 같은 단어나 언급을 입 밖으로 내지 마십시오.**
- 굳이 오마주라는 단어를 쓰지 말고, 단지 당신의 당연하고 자연스러운 실전 비기이자 작전 지침인 것처럼 답변에 넌지시 녹여내어 추천하십시오.

[안전장치 - 판독 불가 규칙]:
- 만약 업로드된 이미지가 축구 게임(FM27) 화면이 전혀 아니거나, 글자 및 전술판이 너무 심하게 깨져 판독이 불가능하다면 아무 말도 덧붙이지 말고 정확히 "UNREADABLE_SCREEN" 이 한 단어만 출력하십시오.

[출력 형식 - 순수 JSON]:
반드시 마크다운 백틱(\`\`\`json) 없는 순수한 유효한 JSON 형식으로만 응답해야 합니다.
JSON 구조는 다음과 같아야 합니다:
{
  "coach_speech": "경기 전 사령탑 본인의 라커룸 출사표 연설 (2~3문장)",
  "formation": "추천 진영 포메이션 (예: 4-4-2, 4-3-3 하이브리드, 4-2-3-1, 3-5-2 등)",
  "roles": {
    "attack": "공격수 롤 및 세부 지침 (예: 포처 + 딥라잉 포워드 조합, 박스 침투 지침 등 구체적 역할 명시)",
    "midfield": "미드필더 롤 추천 (예: 메짤라 + 딥라잉 플레이메이커 등 구체적 역할 명시)",
    "defense": "포백/수비진 추천 및 요구 능력치 (예: 주력 빠른 커버 센터백 필수, 지구력 위주 풀백, 인버티드 풀백 등 구체적 명시)"
  },
  "dynamics": {
    "advantage": "상대방 진영에 따라 어떤 부분이 유리한지 (공략할 상대 취약 공간)",
    "caution": "어딜 조심해야 하는지 (상대의 주요 위협 루트 및 아군 위험 구역)",
    "key_player": "누굴 반드시 틀어막아야 하는지 (상대 핵심 에이스 선수/포지션 및 구체적 마킹/압박 지침)"
  },
  "scenarios": {
    "lead_2": "2점 유리/리드 시 대처법 (예: 3백 전환, 템포 다운, 잠그기 등)",
    "even_1": "1점차 접전 시 대처법 (경기 템포 조율, 균형 유지)",
    "trailing": "열세 / 1점 뒤질 때 역전 대처법 (공격 라인 상승, 총공세 오버로드)"
  }
}`;
  }

  // ------------------------------------------------------------
  // 13. 분석 실행 (Gemini Vision API 호출 및 화면 전환)
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

    // 화면 2(브리핑실)로 부드럽게 전환 후 로딩 상태 표시
    switchView('briefing');
    briefingLoadingBox.style.display = 'flex';
    briefingContentBox.style.display = 'none';

    const coachName = STATE.selectedCoachKey === 'custom' 
      ? (customCoachNameInput.value.trim() || '사령탑')
      : COACH_DATABASE[STATE.selectedCoachKey].name;

    loadingCoachTitle.textContent = `${coachName} 감독이 전술판과 상대 데이터를 정밀 분석하고 있습니다...`;
    briefingCoachTag.textContent = `사령탑: ${coachName}`;
    briefingTiersTag.textContent = `체급: 공격 ${STATE.squadTiers.attack} / 미드 ${STATE.squadTiers.midfield} / 수비 ${STATE.squadTiers.defense}`;

    try {
      const systemInstruction = buildSystemPrompt();

      const parts = [
        { text: systemInstruction }
      ];

      if (STATE.slot1Image) {
        const base64Data1 = STATE.slot1Image.split(',')[1];
        parts.push({ text: "[슬롯 1: 내 전술판 (My Tactics 화면)]" });
        parts.push({
          inlineData: { mimeType: "image/jpeg", data: base64Data1 }
        });
      }

      if (STATE.slot2Image) {
        const base64Data2 = STATE.slot2Image.split(',')[1];
        parts.push({ text: "[슬롯 2: 상대 분석 스카우팅 / 라인업 (Opponent 화면)]" });
        parts.push({
          inlineData: { mimeType: "image/jpeg", data: base64Data2 }
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
        briefingLoadingBox.style.display = 'none';
        switchView('setup');
        unreadableModalOverlay.style.display = 'flex';
        return;
      }

      // JSON 파싱
      let cleanedJsonStr = rawText.trim();
      if (cleanedJsonStr.startsWith('```json')) {
        cleanedJsonStr = cleanedJsonStr.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleanedJsonStr.startsWith('```')) {
        cleanedJsonStr = cleanedJsonStr.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }

      const parsedData = JSON.parse(cleanedJsonStr);
      STATE.latestResultData = parsedData;

      // 브리핑실에 결과 렌더링
      renderPlaybookBriefing(parsedData);
      showToast('🎉 사령탑의 실전 전술 플레이북이 완성되었습니다!');

    } catch (err) {
      console.error("Analysis Error:", err);
      STATE.lastErrorLog = `${new Date().toISOString()} - ${err.message}`;
      showToast(`❌ 분석 중 오류가 발생했습니다: ${err.message}`, 5000);
      switchView('setup');
    } finally {
      STATE.isAnalyzing = false;
      updateAnalyzeButtonState();
      briefingLoadingBox.style.display = 'none';
    }
  });

  // ------------------------------------------------------------
  // 14. 브리핑실 렌더링 (유저 요청 구조 완벽 반영)
  // ------------------------------------------------------------
  function renderPlaybookBriefing(data) {
    briefingContentBox.style.display = 'block';

    const coachName = STATE.selectedCoachKey === 'custom' 
      ? (customCoachNameInput.value.trim() || '사령탑')
      : COACH_DATABASE[STATE.selectedCoachKey].name;

    // 사령탑 라커룸 스피치
    speechAuthor.textContent = `${coachName} 감독의 경기 전 라커룸 연설:`;
    speechQuote.textContent = `"${data.coach_speech || '오늘 경기는 반드시 우리 철학대로 승리한다.'}"`;

    // 추천 포메이션
    formationVal.textContent = data.formation || '4-4-2';

    // 1. 포지션별 롤 리스트 (공격수, 미드필더, 포백/수비진)
    rolesBreakdownList.innerHTML = `
      <div class="tactical-item-row">
        <div class="item-header">
          <span class="item-title">⚔️ 공격수 (공격진 롤 및 움직임)</span>
          <span class="item-tag tag-attack">ATTACK</span>
        </div>
        <div class="item-content">${data.roles?.attack || '역할 지침 없음'}</div>
      </div>

      <div class="tactical-item-row">
        <div class="item-header">
          <span class="item-title">⚙️ 미드필더 (중원 롤 및 조합)</span>
          <span class="item-tag tag-mid">MIDFIELD</span>
        </div>
        <div class="item-content">${data.roles?.midfield || '역할 지침 없음'}</div>
      </div>

      <div class="tactical-item-row">
        <div class="item-header">
          <span class="item-title">🛡️ 포백 / 수비진 (필수 요구 능력치 및 수비 롤)</span>
          <span class="item-tag tag-def">DEFENSE</span>
        </div>
        <div class="item-content">${data.roles?.defense || '역할 지침 없음'}</div>
      </div>
    `;

    // 2. 실전 상성 & 공략법 리스트 (유리한 점, 조심할 점, 틀어막을 키맨)
    dynamicsBreakdownList.innerHTML = `
      <div class="tactical-item-row">
        <div class="item-header">
          <span class="item-title">🟢 상대 진영 대비 유리한 점 (공략 포인트)</span>
          <span class="item-tag tag-adv">ADVANTAGE</span>
        </div>
        <div class="item-content">${data.dynamics?.advantage || '공략 지점 없음'}</div>
      </div>

      <div class="tactical-item-row">
        <div class="item-header">
          <span class="item-title">🟡 어딜 조심해야 하는지 (취약 구역 및 상대 역습)</span>
          <span class="item-tag tag-warn">CAUTION</span>
        </div>
        <div class="item-content">${data.dynamics?.caution || '주의 사항 없음'}</div>
      </div>

      <div class="tactical-item-row">
        <div class="item-header">
          <span class="item-title">🔴 누굴 반드시 틀어막아야 하는지 (상대 에이스 전담 마킹)</span>
          <span class="item-tag tag-danger">TARGET MARK</span>
        </div>
        <div class="item-content">${data.dynamics?.key_player || '타겟 선수 지침 없음'}</div>
      </div>
    `;

    // 3. 경기 흐름별 시나리오 대처 (2점 리드, 1점차 접전, 열세 역전)
    scenariosBreakdownList.innerHTML = `
      <div class="scenario-grid">
        <div class="scenario-card">
          <div class="scenario-header lead">
            <span>🛡️ 2점 차 리드 시</span>
          </div>
          <div class="scenario-body">${data.scenarios?.lead_2 || '3백 전환 및 템포 조율'}</div>
        </div>

        <div class="scenario-card">
          <div class="scenario-header even">
            <span>⚖️ 1점 차 접전 시</span>
          </div>
          <div class="scenario-body">${data.scenarios?.even_1 || '무리한 모험 지양, 안정적 경기 운용'}</div>
        </div>

        <div class="scenario-card">
          <div class="scenario-header chase">
            <span>⚡ 열세 / 실점 시 역전</span>
          </div>
          <div class="scenario-body">${data.scenarios?.trailing || '라인 전진 및 총공세 전환'}</div>
        </div>
      </div>
    `;
  }

  // ------------------------------------------------------------
  // 15. 전술 텍스트 클립보드 복사
  // ------------------------------------------------------------
  copySummaryBtn.addEventListener('click', () => {
    if (!STATE.latestResultData) return;
    const d = STATE.latestResultData;
    const coachName = STATE.selectedCoachKey === 'custom' 
      ? (customCoachNameInput.value.trim() || '사령탑')
      : COACH_DATABASE[STATE.selectedCoachKey].name;

    const summaryText = `[FM27 매치데이 전술 플레이북 - ${coachName} 감독]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💬 라커룸 연설: "${d.coach_speech}"
🎯 추천 포메이션: ${d.formation}

[1. 포지션별 최적 롤]
- 공격수: ${d.roles?.attack}
- 미드필더: ${d.roles?.midfield}
- 수비진(포백): ${d.roles?.defense}

[2. 실전 상성 및 공략법]
- 유리한 점: ${d.dynamics?.advantage}
- 조심할 점: ${d.dynamics?.caution}
- 틀어막을 키맨: ${d.dynamics?.key_player}

[3. 시나리오별 대처]
- 2점 리드 시: ${d.scenarios?.lead_2}
- 1점차 접전 시: ${d.scenarios?.even_1}
- 열세/실점 시: ${d.scenarios?.trailing}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

    navigator.clipboard.writeText(summaryText).then(() => {
      showToast('📋 전술 요약본이 클립보드에 깔끔하게 복사되었습니다!');
    }).catch(() => {
      showToast('복사에 실패했습니다.');
    });
  });

  // ------------------------------------------------------------
  // 16. 경고 모달 닫기 & 오류 제보
  // ------------------------------------------------------------
  unreadableCloseBtn.addEventListener('click', () => {
    unreadableModalOverlay.style.display = 'none';
  });
  unreadableConfirmBtn.addEventListener('click', () => {
    unreadableModalOverlay.style.display = 'none';
  });

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
