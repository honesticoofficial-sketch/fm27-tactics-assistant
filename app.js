// ============================================================
// FM Matchday Tactical Playbook - Core Engine (v7)
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
      voice: "극단적 점유율과 공간 지배. 무의미한 측면 크로스 난사를 극도로 혐오하며, 숏패스 템포 조율과 하프스페이스 컷백을 집요하게 지시하는 말투.",
      tacticalBias: "무의미한 크로스 금지, 숏패스 빌드업, 하프스페이스 점유 및 컷백, 인버티드 풀백(IWB)의 중앙 가담 3-2 대형 구축"
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
    slot1Images: [], // 다중 이미지 배열 { id, dataUrl } (최대 4장)
    slot2Images: [], // 다중 이미지 배열 { id, dataUrl } (최대 4장)
    activeSlot: 1,
    analysisMode: 'basic', // 'basic' or 'advanced'
    advancedOptions: {
      location: 'home',
      goal: 'regular',
      stamina: 'all_in',
      opp_style: 'auto',
      injury: 'none',
      weather: 'good',
      cards: 'normal'
    },
    mediaStream: null,
    isAnalyzing: false,
    latestResultData: null,
    currentPitchPhase: 'attack', // 'attack' or 'defense'
    pitchOrientation: window.innerWidth > 768 ? 'horizontal' : 'vertical', // 'horizontal' or 'vertical'
    pitchPlayers: [],
    lastErrorLog: ''
  };

  // ------------------------------------------------------------
  // 3. DOM 요소 캐싱 & 아이콘 렌더링 헬퍼
  // ------------------------------------------------------------
  function refreshIcons() {
    if (typeof lucide !== 'undefined') {
      try { lucide.createIcons(); } catch (e) { console.warn("Lucide icon render error:", e); }
    }
  }

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

  // 다중 캡처 슬롯 요소
  const slot1 = document.getElementById('slot1');
  const slot2 = document.getElementById('slot2');
  const slot1Gallery = document.getElementById('slot1Gallery');
  const slot2Gallery = document.getElementById('slot2Gallery');
  const slot1CountBadge = document.getElementById('slot1CountBadge');
  const slot2CountBadge = document.getElementById('slot2CountBadge');
  const slot1EmptyMsg = document.getElementById('slot1EmptyMsg');
  const slot2EmptyMsg = document.getElementById('slot2EmptyMsg');
  const slot1ClearBtn = document.getElementById('slot1ClearBtn');
  const slot2ClearBtn = document.getElementById('slot2ClearBtn');
  const slot1SnapBtn = document.getElementById('slot1SnapBtn');
  const slot2SnapBtn = document.getElementById('slot2SnapBtn');
  const slot1PasteBtn = document.getElementById('slot1PasteBtn');
  const slot2PasteBtn = document.getElementById('slot2PasteBtn');
  const slot1FileInput = document.getElementById('slot1FileInput');
  const slot2FileInput = document.getElementById('slot2FileInput');

  // 분석 모드 요소
  const modeBasicBtn = document.getElementById('modeBasicBtn');
  const modeAdvancedBtn = document.getElementById('modeAdvancedBtn');
  const advancedSettingsPanel = document.getElementById('advancedSettingsPanel');

  const analyzeBtn = document.getElementById('analyzeBtn');
  const snapshotCanvas = document.getElementById('snapshotCanvas');

  // 브리핑 뷰 요소
  const backToSetupBtn = document.getElementById('backToSetupBtn');
  const bottomBackBtn = document.getElementById('bottomBackBtn');
  const briefingCoachTag = document.getElementById('briefingCoachTag');
  const briefingTiersTag = document.getElementById('briefingTiersTag');
  const captureSummaryBtn = document.getElementById('captureSummaryBtn');
  const captureGifBtn = document.getElementById('captureGifBtn');

  const briefingLoadingBox = document.getElementById('briefingLoadingBox');
  const loadingCoachTitle = document.getElementById('loadingCoachTitle');
  const briefingContentBox = document.getElementById('briefingContentBox');

  const speechAvatar = document.getElementById('speechAvatar');
  const speechAuthor = document.getElementById('speechAuthor');
  const speechQuote = document.getElementById('speechQuote');

  // 피치 보드 요소
  const pitchFormationTitle = document.getElementById('pitchFormationTitle');
  const pitchFormationReason = document.getElementById('pitchFormationReason');
  const orientLandscapeBtn = document.getElementById('orientLandscapeBtn');
  const orientPortraitBtn = document.getElementById('orientPortraitBtn');
  const phaseAttackBtn = document.getElementById('phaseAttackBtn');
  const phaseDefenseBtn = document.getElementById('phaseDefenseBtn');
  const cyberPitch = document.getElementById('cyberPitch');
  const pitchDirectionBanner = document.getElementById('pitchDirectionBanner');
  const pitchPlayersContainer = document.getElementById('pitchPlayersContainer');
  const currentPhaseLabel = document.getElementById('currentPhaseLabel');

  // 4대 요약 카드 요소
  const summaryMatchup = document.getElementById('summaryMatchup');
  const summaryPlanA = document.getElementById('summaryPlanA');
  const summaryScenarios = document.getElementById('summaryScenarios');
  const summaryOnePoint = document.getElementById('summaryOnePoint');

  // 모달 요소
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
  // 4. 화면 전환 함수
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
  // 5. 토스트 알림
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
  // 6. API 키 설정 (BYOK)
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

  const savedKey = localStorage.getItem('fm_gemini_api_key') || localStorage.getItem('fm27_gemini_api_key');
  if (savedKey) {
    apiKeyInput.value = savedKey;
    updateKeyStatus();
  }

  saveKeyBtn.addEventListener('click', () => {
    const key = apiKeyInput.value.trim();
    if (key) {
      localStorage.setItem('fm_gemini_api_key', key);
      localStorage.setItem('fm27_gemini_api_key', key);
      updateKeyStatus();
      showToast('🔑 Gemini API 키가 브라우저에 안전하게 저장되었습니다!');
    } else {
      localStorage.removeItem('fm_gemini_api_key');
      localStorage.removeItem('fm27_gemini_api_key');
      updateKeyStatus();
      showToast('API 키가 삭제되었습니다.');
    }
  });

  // ------------------------------------------------------------
  // 7. 감독 쇼케이스 렌더링
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
  // 8. 상대 대비 스쿼드 체급
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
  // 9. 대형 화면공유 모니터
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
      showToast('🖥️ (FM) 풋볼매니저 화면이 성공적으로 연결되었습니다!');

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
  // 10. 다중 캡처 슬롯 조작 & 미니 갤러리 렌더링
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
    const totalImages = STATE.slot1Images.length + STATE.slot2Images.length;
    analyzeBtn.disabled = (totalImages === 0) || STATE.isAnalyzing;
    if (totalImages > 0) {
      analyzeBtn.title = `매치데이 전술 플레이북 생성 (총 ${totalImages}장 분석) - Ctrl+Enter`;
    } else {
      analyzeBtn.title = "슬롯에 최소 1장의 전술 이미지를 등록해 주세요";
    }
  }

  function renderSlotGallery(slotNum) {
    const list = slotNum === 1 ? STATE.slot1Images : STATE.slot2Images;
    const galleryEl = slotNum === 1 ? slot1Gallery : slot2Gallery;
    const countBadge = slotNum === 1 ? slot1CountBadge : slot2CountBadge;
    const emptyMsg = slotNum === 1 ? slot1EmptyMsg : slot2EmptyMsg;
    const clearBtn = slotNum === 1 ? slot1ClearBtn : slot2ClearBtn;

    countBadge.textContent = `${list.length} / 4장`;
    clearBtn.style.display = list.length > 0 ? 'inline-block' : 'none';

    galleryEl.innerHTML = '';
    if (list.length === 0) {
      galleryEl.appendChild(emptyMsg);
      emptyMsg.style.display = 'flex';
    } else {
      list.forEach((item, idx) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'gallery-thumb-item';
        itemEl.innerHTML = `
          <img src="${item.dataUrl}" alt="슬롯 이미지 ${idx + 1}" class="gallery-thumb-img">
          <button type="button" class="gallery-thumb-del" title="삭제">✕</button>
        `;
        itemEl.querySelector('.gallery-thumb-del').addEventListener('click', (e) => {
          e.stopPropagation();
          removeSlotImage(slotNum, item.id);
        });
        galleryEl.appendChild(itemEl);
      });
    }

    updateAnalyzeButtonState();
    refreshIcons();
  }

  function addImageToSlot(slotNum, dataUrl) {
    const list = slotNum === 1 ? STATE.slot1Images : STATE.slot2Images;
    if (list.length >= 4) {
      showToast(`⚠️ 슬롯 ${slotNum}은 최대 4장까지만 등록할 수 있습니다!`);
      return;
    }

    const imgObj = new Image();
    imgObj.onload = () => {
      if (imgObj.naturalWidth < 600) {
        showToast('⚠️ 이미지 가로 해상도가 600px 미만입니다. 글자가 작을 경우 분석이 제한될 수 있습니다.', 4000);
      }
      const id = Date.now() + Math.random().toString(36).substring(2, 7);
      list.push({ id, dataUrl });
      renderSlotGallery(slotNum);
      showToast(`📸 슬롯 ${slotNum}에 이미지가 추가되었습니다! (${list.length}/4장)`);
    };
    imgObj.src = dataUrl;
  }

  function removeSlotImage(slotNum, id) {
    if (slotNum === 1) {
      STATE.slot1Images = STATE.slot1Images.filter(item => item.id !== id);
    } else {
      STATE.slot2Images = STATE.slot2Images.filter(item => item.id !== id);
    }
    renderSlotGallery(slotNum);
  }

  function clearSlot(slotNum) {
    if (slotNum === 1) {
      STATE.slot1Images = [];
      slot1FileInput.value = '';
    } else {
      STATE.slot2Images = [];
      slot2FileInput.value = '';
    }
    renderSlotGallery(slotNum);
    showToast(`슬롯 ${slotNum}의 모든 이미지가 삭제되었습니다.`);
  }

  slot1ClearBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    clearSlot(1);
  });

  slot2ClearBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    clearSlot(2);
  });

  function snapFromLiveVideo(slotNum) {
    if (!STATE.mediaStream || liveVideo.videoWidth === 0) {
      showToast('먼저 [화면 공유 시작] 버튼을 눌러 (FM) 풋볼매니저 창을 연결해 주세요!');
      return;
    }
    snapshotCanvas.width = liveVideo.videoWidth;
    snapshotCanvas.height = liveVideo.videoHeight;
    const ctx = snapshotCanvas.getContext('2d');
    ctx.drawImage(liveVideo, 0, 0, snapshotCanvas.width, snapshotCanvas.height);
    const dataUrl = snapshotCanvas.toDataURL('image/jpeg', 0.9);
    addImageToSlot(slotNum, dataUrl);
  }

  slot1SnapBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    snapFromLiveVideo(1);
  });

  slot2SnapBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    snapFromLiveVideo(2);
  });

  async function pasteFromClipboardBtn(slotNum) {
    try {
      if (navigator.clipboard && navigator.clipboard.read) {
        const items = await navigator.clipboard.read();
        for (const item of items) {
          const imageType = item.types.find(t => t.startsWith('image/'));
          if (imageType) {
            const blob = await item.getType(imageType);
            const reader = new FileReader();
            reader.onload = (e) => addImageToSlot(slotNum, e.target.result);
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

  function handleFileSelect(e, slotNum) {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (evt) => addImageToSlot(slotNum, evt.target.result);
        reader.readAsDataURL(file);
      }
    });
  }

  slot1FileInput.addEventListener('change', (e) => handleFileSelect(e, 1));
  slot2FileInput.addEventListener('change', (e) => handleFileSelect(e, 2));

  // ------------------------------------------------------------
  // 10-1. 분석 모드 (기본 모드 vs 고급 설정 모드 7대 변수)
  // ------------------------------------------------------------
  modeBasicBtn.addEventListener('click', () => {
    STATE.analysisMode = 'basic';
    modeBasicBtn.classList.add('active');
    modeAdvancedBtn.classList.remove('active');
    advancedSettingsPanel.style.display = 'none';
    showToast('⚡ 기본 모드 (빠른 생성)가 선택되었습니다.');
  });

  modeAdvancedBtn.addEventListener('click', () => {
    STATE.analysisMode = 'advanced';
    modeAdvancedBtn.classList.add('active');
    modeBasicBtn.classList.remove('active');
    advancedSettingsPanel.style.display = 'block';
    refreshIcons();
    showToast('⚙️ 고급 설정 모드가 활성화되었습니다. 특별한 상황을 1~2개 선택해 주세요.');
  });

  // 고급 설정 칩 선택 이벤트
  document.querySelectorAll('.adv-group').forEach(group => {
    const category = group.dataset.adv;
    const chips = group.querySelectorAll('.adv-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const val = chip.dataset.val;
        STATE.advancedOptions[category] = val;
        const mainText = chip.querySelector('.chip-main')?.textContent || val;
        showToast(`[${group.querySelector('.adv-label')?.textContent.trim()}] ➔ ${mainText}`);
      });
    });
  });

  // ------------------------------------------------------------
  // 11. 전역 단축키 & Ctrl+V 연속 붙여넣기
  // ------------------------------------------------------------
  document.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
      return;
    }

    if (e.key === '1') {
      setActiveSlot(1);
      showToast('슬롯 1 [내 전술 정보] 선택됨');
    } else if (e.key === '2') {
      setActiveSlot(2);
      showToast('슬롯 2 [상대 스카우팅/라인업] 선택됨');
    } else if (e.key === 'Escape') {
      detailModalOverlay.style.display = 'none';
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
          addImageToSlot(STATE.activeSlot, event.target.result);
        };
        reader.readAsDataURL(blob);
        e.preventDefault();
        break;
      }
    }
  });

  // ------------------------------------------------------------
  // 12. 사령탑 100% 몰입 & 원본 존중 & 피치 좌표 프롬프트
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

    let advancedContext = "";
    if (STATE.analysisMode === 'advanced') {
      const adv = STATE.advancedOptions;
      const locMap = { home: "홈 경기 (적극적 주도권 / 홈 팬 응원)", away: "원정 경기 (실점 억제 및 안정적 밸런스 중시)" };
      const goalMap = {
        regular: "리그 정규 경기 (승점 3점 추구)",
        draw_ok: "무승부 이상 실리 축구 (패배 방지 및 승점 1점 확보 우선)",
        tournament: "단판 토너먼트/결승전 (연장/승부차기 대비 및 실수 금지)",
        high_score: "다득점 대승 필수 (골득실 우위 필요, 파상공세 지향)"
      };
      const stamMap = {
        all_in: "주전 총력전 (체력 소모 감수, 90분 풀가동)",
        manage: "후반 체력 안배 필수 (60분 이후 템포 조절 및 교체카드 대비)",
        rotation: "로테이션 가동 중 (주전 휴식, 저강도 안정 운영)"
      };
      const oppStyleMap = {
        auto: "상대 전술 자동 진단",
        low_block: "상대 텐백/극단적 밀집 수비 (밀집 블록 해체 전술 필요)",
        high_press: "상대 하이라인 게겐프레싱 (압박 회피 및 뒷공간 침투 패스 필요)",
        fast_counter: "상대 빠른 측면 롱카운터 (수비 전환 시 파울 차단 및 라인 제어)"
      };
      const injMap = {
        none: "전력 누수 없음 (베스트 라인업 가동)",
        no_striker: "주전 스트라이커 부재 (가짜 9번 제로톱 또는 2선 침투 공격 설계)",
        no_mid: "주전 미드필더 부재 (중원 패스 줄기 단순화 및 측면 우회)",
        slow_cb: "센터백 부상 또는 주력 느림 (수비라인 전진 자제, 뒷공간 커버 필수)"
      };
      const weatherMap = {
        good: "기본/양호한 잔디 (정상적인 패스 및 빌드업)",
        rain: "수중전/폭우 (잔디 미끄러움, 패스 감속, 롱볼 및 세컨볼 집중 권장)",
        narrow: "좁은 경기장 (중원 밀집, 세트피스 및 피지컬 경합 중요)",
        wide: "넓은 경기장 (측면 공간 광활, 윙어/풀백 기동력 극대화)"
      };
      const cardMap = {
        normal: "보통 (정상적인 수비 태클)",
        careful: "주전 경고 누적 주의 (태클 강도 완화, 불필요한 퇴장 방지)",
        foul_break: "거친 파울로 상대 역습 흐름 끊기 (전술적 파울 적극 활용)"
      };

      advancedContext = `
[★ 유저가 설정한 실전 7대 경기 변수 (반드시 전술 수치와 지침에 최우선 반영) ★]:
- 홈/원정 환경: ${locMap[adv.location] || adv.location}
- 경기 목표: ${goalMap[adv.goal] || adv.goal}
- 선수단 체력/일정: ${stamMap[adv.stamina] || adv.stamina}
- 상대 전술 성향: ${oppStyleMap[adv.opp_style] || adv.opp_style}
- 핵심 포지션 공백: ${injMap[adv.injury] || adv.injury}
- 구장 및 잔디/날씨: ${weatherMap[adv.weather] || adv.weather}
- 카드 및 태클 관리: ${cardMap[adv.cards] || adv.cards}
`;
    }

    return `당신은 세계 최고의 축구 전술 사령탑인 [${coachName}] 감독 본인입니다.
당신은 FM(Football Manager) 게임의 전술판 및 상대 스카우팅 스크린샷을 분석하여 경기 시작 전 완벽한 승리 공식을 제공하는 '매치데이 전술 연구소'의 최고 사령관입니다.

[사령탑 100% 몰입 원칙 (절대적 필수 지침)]:
- 당신은 ${coachName} 감독 본인으로 완벽히 빙의(Role-play)하십시오.
- 말투와 성향: "${coachVoiceGuide}"
- 전술적 성향: "${coachBias}"
- 만약 당신이 펩 과르디올라라면, 무의미한 측면 크로스 난사를 극도로 경계하고, 템포를 조율하여 숏패스로 하프스페이스를 침투하고 컷백을 노리는 플레이를 강력히 지시하십시오.
- 무리뉴라면 실리적 2줄 수비와 롱카운터를, 클롭이라면 8초 내 게겐프레싱을 주문하십시오.

[★ 원본 포메이션 존중 및 합리적 수정 규칙 (극도로 중요!) ★]:
1. 기본적으로 유저가 스크린샷에 올려둔 '원본 포메이션(예: 4-3-2-1 비대칭 AM(R) 등)'의 기본 뼈대를 100% 존중하십시오. 진영 전체를 뜬금없이 갈아엎지 마십시오.
2. 만약 상대 상성상 판을 살짝 손보는 게 확실히 유리하거나, 당신의 전술 철학상 꼭 수정해야 한다면, 진영 전체를 바꾸지 말고 **"왜 이 자리를 건드려야 하는지 명확한 이유"**를 설명하고, **"누구를 어떤 롤로 바꾸거나 위치를 어떻게 미세 조정해야 하는지"** 제시하십시오. (예: "기본 4-3-2-1 비대칭을 유지하되, 공격 시 3-2-4-1 빌드업 전환").

[★ 전술 피치 보드 애니메이션 좌표 생성 (반드시 11명 전원 생성) ★]:
피치 보드에서 애니메이션으로 움직일 11명의 선수를 스크린샷 속 실제 선수 이름(파악 가능 시)이나 주전 선수명으로 구성하십시오.
각 선수는 축구장 좌표(x: 0~100 가로, y: 0~100 세로, y=0은 상대 골대, y=100은 아군 골대)를 가집니다:
- attack_pos: 공격 시 전개 위치 (x, y)
- defense_pos: 수비 시 블록 위치 (x, y)
- attack_action: 공격 시 움직임 (예: "하프스페이스 침투 ↗", "중앙 가담 ➔", "미끼 침투 ⬇")
- defense_action: 수비 시 움직임 (예: "상대 센터백 압박", "4-4-2 블록 형성", "페널티박스 커버")

[★ 오마주 절대 규칙 ★]:
- 역사 속 명경기의 시그니처 비책을 녹여내되, **절대로 '이것은 XX년의 오마주입니다' 같은 단어를 입 밖으로 내지 마십시오.** 단지 당신의 당연하고 자연스러운 실전 비기인 것처럼 넌지시 조작값으로 추천하십시오.

[상황별 체급 비교 데이터]:
- 상대 대비 공격진: [${STATE.squadTiers.attack}]
- 상대 대비 미드필더: [${STATE.squadTiers.midfield}]
- 상대 대비 수비진: [${STATE.squadTiers.defense}]
${advancedContext}

[안전장치 - 판독 불가 규칙]:
- 만약 업로드된 이미지가 축구 게임(FM) 화면이 전혀 아니거나 글자 판독이 불가능하다면 정확히 "UNREADABLE_SCREEN"만 출력하십시오.

[출력 형식 - 순수 JSON]:
반드시 마크다운 백틱(\`\`\`json) 없는 순수 유효한 JSON 형식으로만 응답해야 합니다.
구조:
{
  "coach_speech": "경기 전 반드시 명심해야 할 핵심 게임 전략 키포인트 3가지 (각 항목을 '1. ...\\n2. ...\\n3. ...' 번호 형식으로 실전 지침 작성)",
  "pitch_board": {
    "formation_title": "포메이션 타이틀 (예: 4-3-2-1 비대칭 유지 (공격 시 3-2-4-1 빌드업 전환))",
    "formation_reason": "왜 이 포메이션을 유지하거나 변형하는지 납득할 만한 명확한 전술적 이유 (1~2문장)",
    "players": [
      {
        "name": "선수명 (예: 벤테케)",
        "role": "세부 롤 (예: PF-지원)",
        "zone": "attack | midfield | defense | gk",
        "attack_pos": { "x": 50, "y": 25 },
        "defense_pos": { "x": 50, "y": 42 },
        "attack_action": "미끼 침투 및 연계",
        "defense_action": "1차 빌드업 방해"
      }
      // ... 총 11명 (공격수, 미드필더, 수비수, 골키퍼)
    ]
  },
  "sliders": {
    "tempo": { "val": 70, "text": "약간 빠르게 (경기 템포 통제)" },
    "directness": { "val": 40, "text": "짧은 패스 위주 (점유율 기반)" },
    "def_line": { "val": 75, "text": "높은 수비 라인" },
    "press": { "val": 80, "text": "더 자주 강하게 (전방 1차 압박)" }
  },
  "summary_badges": {
    "matchup": "상대 약점 및 상성 진단 한눈 요약 (2줄)",
    "plana": "원본 유지 여부 및 롤 미세조정 한눈 요약 (2줄)",
    "scenarios": "리드 시 굳히기 & 열세 시 역전 한눈 요약 (2줄)",
    "onepoint": "상대 에이스 전담 마킹 및 세트피스 요약 (2줄)"
  },
  "modal_details": {
    "matchup": "HTML 포맷: 상대 공격 루트, 수비 취약 공간, 우리 스쿼드와의 맞대결 유불리 상세",
    "plana": "HTML 포맷: 인게임 마우스 클릭 체크리스트 (선수 롤 Before ➜ After 변경점, 팀 지침 슬라이더 템포/패스/라인 조작값, 개인 지침)",
    "scenarios": "HTML 포맷: 2점 리드 시 잠그기 지침 vs 1점차 접전 vs 열세/실점 시 역전 총공세 조작값",
    "onepoint": "HTML 포맷: 상대 에이스 전담 마크 설정법, 세트피스 지침, 넌지시 녹여낸 실전 비기"
  }
}
[★ sliders 슬라이더 값 엄격 지침]:
sliders 내부의 tempo, directness, def_line, press의 val(0~100 숫자)과 text(FM 인게임 라벨)는 반드시 아래 modal_details.plana에 기술할 체크리스트 전술 지침 및 당신의 전술 철학과 100% 모순 없이 완벽히 일치해야 합니다.`;
  }

  // ------------------------------------------------------------
  // 13. 분석 실행 (Gemini 호출 - 다중 이미지 지원)
  // ------------------------------------------------------------
  analyzeBtn.addEventListener('click', async () => {
    const apiKey = apiKeyInput.value.trim();
    if (!apiKey) {
      showToast('상단의 [Gemini API 키] 입력창에 무료 API 키를 먼저 넣어주세요!');
      apiKeyInput.focus();
      return;
    }

    const totalImages = STATE.slot1Images.length + STATE.slot2Images.length;
    if (totalImages === 0) {
      showToast('최소 1장의 전술 화면(슬롯 1 또는 슬롯 2)을 등록해 주세요!');
      return;
    }

    STATE.isAnalyzing = true;
    updateAnalyzeButtonState();

    switchView('briefing');
    briefingLoadingBox.style.display = 'flex';
    briefingContentBox.style.display = 'none';

    const coachName = STATE.selectedCoachKey === 'custom' 
      ? (customCoachNameInput.value.trim() || '사령탑')
      : COACH_DATABASE[STATE.selectedCoachKey].name;

    loadingCoachTitle.textContent = `${coachName} 감독이 전술판(${totalImages}장)과 상대 데이터를 정밀 분석하고 있습니다...`;
    briefingCoachTag.textContent = `사령탑: ${coachName}`;
    briefingTiersTag.textContent = `체급: 공격 ${STATE.squadTiers.attack} / 미드 ${STATE.squadTiers.midfield} / 수비 ${STATE.squadTiers.defense}`;

    try {
      const systemInstruction = buildSystemPrompt();

      const parts = [
        { text: systemInstruction }
      ];

      // 슬롯 1 다중 이미지 멀티모달 첨부
      if (STATE.slot1Images.length > 0) {
        STATE.slot1Images.forEach((item, idx) => {
          const base64Data = item.dataUrl.split(',')[1];
          parts.push({ text: `[슬롯 1: 내 전술판/세부지침/선수단 스크린샷 #${idx + 1}]` });
          parts.push({
            inlineData: { mimeType: "image/jpeg", data: base64Data }
          });
        });
      }

      // 슬롯 2 다중 이미지 멀티모달 첨부
      if (STATE.slot2Images.length > 0) {
        STATE.slot2Images.forEach((item, idx) => {
          const base64Data = item.dataUrl.split(',')[1];
          parts.push({ text: `[슬롯 2: 상대 분석/라인업/스카우팅 스크린샷 #${idx + 1}]` });
          parts.push({
            inlineData: { mimeType: "image/jpeg", data: base64Data }
          });
        });
      }

      const candidateModels = ['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-2.0-flash'];
      let response = null;
      let lastErrText = '';

      for (const modelName of candidateModels) {
        try {
          const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts }] })
          });

          if (res.ok) {
            response = res;
            break;
          } else {
            lastErrText = await res.text();
          }
        } catch (e) {
          lastErrText = e.message;
        }
      }

      if (!response) {
        throw new Error(`API 요청 실패: ${lastErrText}`);
      }

      const resJson = await response.json();
      const rawText = resJson?.candidates?.[0]?.content?.parts?.[0]?.text || '';

      if (rawText.trim().includes('UNREADABLE_SCREEN')) {
        briefingLoadingBox.style.display = 'none';
        switchView('setup');
        unreadableModalOverlay.style.display = 'flex';
        return;
      }

      let cleanedJsonStr = rawText.trim();
      if (cleanedJsonStr.startsWith('```json')) {
        cleanedJsonStr = cleanedJsonStr.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleanedJsonStr.startsWith('```')) {
        cleanedJsonStr = cleanedJsonStr.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }

      const parsedData = JSON.parse(cleanedJsonStr);
      STATE.latestResultData = parsedData;

      renderPlaybookBriefing(parsedData);
      showToast('🎉 인터랙티브 동적 전술 플레이북이 완성되었습니다!');

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
  // 14. 인터랙티브 전술 피치 렌더링 & 애니메이션 글라이딩
  // ------------------------------------------------------------
  function renderPlaybookBriefing(data) {
    briefingContentBox.style.display = 'block';

    const coachName = STATE.selectedCoachKey === 'custom' 
      ? (customCoachNameInput.value.trim() || '사령탑')
      : COACH_DATABASE[STATE.selectedCoachKey].name;

    // 사령탑 경기 전 핵심 게임 키포인트
    speechAuthor.textContent = `${coachName} 감독의 경기 전 핵심 게임 키포인트:`;
    const rawSpeech = data.coach_speech || '1. 상대 윙백의 뒷공간을 집중 공략하십시오.\n2. 중원 수적 우위를 활용해 점유율을 지배하십시오.\n3. 상대 에이스 역습 시 조기 차단하십시오.';
    
    // 번호 매김 형식(1. 2. 3.) 파싱하여 가독성 높은 리스트로 렌더링
    const lines = rawSpeech.split(/\n|(?=\b[1-9][\.\)])/).map(l => l.replace(/^[0-9]+[\.\)]\s*/, '').trim()).filter(Boolean);
    if (lines.length > 1) {
      speechQuote.innerHTML = `
        <div class="keypoint-list">
          ${lines.map((item, idx) => `
            <div class="keypoint-item">
              <span class="keypoint-num">${idx + 1}</span>
              <span class="keypoint-text">${item}</span>
            </div>
          `).join('')}
        </div>
      `;
    } else {
      speechQuote.textContent = `"${rawSpeech}"`;
    }

    // 피치 보드 타이틀 및 사유
    const pitchData = data.pitch_board || {};
    pitchFormationTitle.textContent = pitchData.formation_title || "포메이션: 4-3-2-1 비대칭 유지 (공격 시 3-2-4-1 변형)";
    pitchFormationReason.textContent = pitchData.formation_reason || "상대 전술의 취약 공간을 공략하기 위해 기본 뼈대를 유지하면서 롤을 미세 조정한 대형입니다.";

    // 11명 선수 노드 파싱 및 폴백 보장
    STATE.pitchPlayers = normalizePitchPlayers(pitchData.players);
    STATE.currentPitchPhase = 'attack';
    
    // 피치 방향 동기화 및 렌더링
    setPitchOrientation(STATE.pitchOrientation);

    // 4대 요약 배지 업데이트
    if (data.summary_badges) {
      summaryMatchup.textContent = data.summary_badges.matchup || "상대 취약점 진단 요약";
      summaryPlanA.textContent = data.summary_badges.plana || "플랜 A 인게임 조작 요약";
      summaryScenarios.textContent = data.summary_badges.scenarios || "시나리오별 대처 요약";
      summaryOnePoint.textContent = data.summary_badges.onepoint || "에이스 봉쇄 요약";
    }

    refreshIcons();
  }

  // 11명 선수 좌표 표준화 (누락 방지 안전망)
  function normalizePitchPlayers(rawPlayers) {
    const defaultPlayers = [
      { name: "GK", role: "SK-지원", zone: "gk", attack_pos: { x: 50, y: 88 }, defense_pos: { x: 50, y: 92 }, attack_action: "스위핑 & 후방 빌드업", defense_action: "골문 사수" },
      { name: "DL", role: "IWB-지원", zone: "defense", attack_pos: { x: 34, y: 58 }, defense_pos: { x: 18, y: 78 }, attack_action: "중원 3-2 가담 ➔", defense_action: "좌측 풀백 복귀" },
      { name: "DCL", role: "CD-수비", zone: "defense", attack_pos: { x: 42, y: 72 }, defense_pos: { x: 38, y: 80 }, attack_action: "후방 빌드업 지지", defense_action: "중앙 박스 마크" },
      { name: "DCR", role: "BPD-수비", zone: "defense", attack_pos: { x: 58, y: 72 }, defense_pos: { x: 62, y: 80 }, attack_action: "전진 롱패스 공급", defense_action: "상대 침투 차단" },
      { name: "DR", role: "WB-공격", zone: "defense", attack_pos: { x: 86, y: 40 }, defense_pos: { x: 82, y: 78 }, attack_action: "우측 오버래핑 ⬆", defense_action: "우측 측면 수비" },
      { name: "MCL", role: "DLP-지원", zone: "midfield", attack_pos: { x: 46, y: 52 }, defense_pos: { x: 44, y: 65 }, attack_action: "템포 조율 & 배급", defense_action: "1차 수비 보호" },
      { name: "MCR", role: "BWM-수비", zone: "midfield", attack_pos: { x: 60, y: 48 }, defense_pos: { x: 56, y: 65 }, attack_action: "세컨볼 압박 회수", defense_action: "중원 질식 마크" },
      { name: "ML", role: "W-지원", zone: "midfield", attack_pos: { x: 14, y: 34 }, defense_pos: { x: 16, y: 60 }, attack_action: "좌측 넓게 배치", defense_action: "측면 수비 가담" },
      { name: "AMC", role: "AP-지원", zone: "midfield", attack_pos: { x: 38, y: 32 }, defense_pos: { x: 40, y: 52 }, attack_action: "하프스페이스 침투", defense_action: "상대 수미 견제" },
      { name: "AMR", role: "IF-공격", zone: "attack", attack_pos: { x: 74, y: 26 }, defense_pos: { x: 78, y: 55 }, attack_action: "박스 대각 침투 ↗", defense_action: "상대 풀백 압박" },
      { name: "ST", role: "PF-지원", zone: "attack", attack_pos: { x: 50, y: 22 }, defense_pos: { x: 50, y: 45 }, attack_action: "연계 & 미끼 침투", defense_action: "센터백 1차 차단" }
    ];

    if (!Array.isArray(rawPlayers) || rawPlayers.length < 8) {
      return defaultPlayers;
    }

    return rawPlayers.slice(0, 11).map((p, idx) => {
      const def = defaultPlayers[idx] || defaultPlayers[0];
      return {
        name: p.name || def.name,
        role: p.role || def.role,
        zone: p.zone || def.zone,
        attack_pos: p.attack_pos || def.attack_pos,
        defense_pos: p.defense_pos || def.defense_pos,
        attack_action: p.attack_action || def.attack_action,
        defense_action: p.defense_action || def.defense_action
      };
    });
  }

  // 가로/세로 좌표 변환기 (가로 모드 시 90도 회전 수학 매핑)
  function calcPitchCoords(pos) {
    if (STATE.pitchOrientation === 'horizontal') {
      // 가로 모드: 상대팀 골대 좌측(x=0), 아군 골대 우측(x=100)
      // 세로 모드의 y(상->하)가 가로의 x(좌->우)로 매핑
      // 세로 모드의 x(좌->우 윙)가 가로의 y(상->하 윙)로 매핑
      const screenX = Math.max(5, Math.min(95, pos.y));
      const screenY = Math.max(8, Math.min(92, pos.x));
      return { x: screenX, y: screenY };
    } else {
      // 세로 모드
      const screenX = Math.max(6, Math.min(94, pos.x));
      const screenY = Math.max(6, Math.min(94, pos.y));
      return { x: screenX, y: screenY };
    }
  }

  // 피치 방향 전환 (가로형 ↔ 세로형)
  function setPitchOrientation(orient) {
    STATE.pitchOrientation = orient;
    if (orient === 'horizontal') {
      cyberPitch.classList.remove('pitch-vertical');
      cyberPitch.classList.add('pitch-horizontal');
      orientLandscapeBtn.classList.add('active');
      orientPortraitBtn.classList.remove('active');
      pitchDirectionBanner.innerHTML = `
        <span class="dir-opp">⬅️ 상대팀 진영 (공격 목표)</span>
        <span class="dir-mid">⚔️ 중앙 하프라인</span>
        <span class="dir-own">아군 수비 진영 (우리 골대) ➡️</span>
      `;
    } else {
      cyberPitch.classList.remove('pitch-horizontal');
      cyberPitch.classList.add('pitch-vertical');
      orientPortraitBtn.classList.add('active');
      orientLandscapeBtn.classList.remove('active');
      pitchDirectionBanner.innerHTML = `
        <span class="dir-opp">⬆️ 상대팀 진영 (공격 목표)</span>
        <span class="dir-mid">⚔️ 중앙 하프라인</span>
        <span class="dir-own">아군 수비 진영 (우리 골대) ⬇️</span>
      `;
    }

    if (STATE.pitchPlayers && STATE.pitchPlayers.length > 0) {
      updatePitchPhaseUI(STATE.currentPitchPhase);
    }
  }

  orientLandscapeBtn.addEventListener('click', () => setPitchOrientation('horizontal'));
  orientPortraitBtn.addEventListener('click', () => setPitchOrientation('vertical'));

  // 피치 보드에 11명 노드 렌더링 및 위치 전환
  function updatePitchPhaseUI(phase) {
    STATE.currentPitchPhase = phase;

    if (phase === 'attack') {
      phaseAttackBtn.classList.add('active');
      phaseDefenseBtn.classList.remove('active');
      currentPhaseLabel.textContent = "현재: ⚔️ 공격 시 공격 전개 대형 (In Possession)";
      currentPhaseLabel.style.color = "#f43f5e";
    } else {
      phaseDefenseBtn.classList.add('active');
      phaseAttackBtn.classList.remove('active');
      currentPhaseLabel.textContent = "현재: 🛡️ 수비 시 콤팩트 블록 대형 (Out of Possession)";
      currentPhaseLabel.style.color = "var(--pitch-neon)";
    }

    // 노드가 이미 있으면 위치만 스르륵 글라이딩 애니메이션!
    const existingNodes = pitchPlayersContainer.querySelectorAll('.player-node');
    if (existingNodes.length === STATE.pitchPlayers.length && existingNodes.length === 11) {
      STATE.pitchPlayers.forEach((player, idx) => {
        const nodeEl = existingNodes[idx];
        const rawPos = phase === 'attack' ? player.attack_pos : player.defense_pos;
        const mappedPos = calcPitchCoords(rawPos);
        const actText = phase === 'attack' ? player.attack_action : player.defense_action;

        nodeEl.style.left = `${mappedPos.x}%`;
        nodeEl.style.top = `${mappedPos.y}%`;

        const actPill = nodeEl.querySelector('.player-action-pill');
        if (actPill) {
          actPill.textContent = actText;
          actPill.className = `player-action-pill ${phase === 'attack' ? 'act-attack' : 'act-defense'}`;
        }
      });
      return;
    }

    // 노드 처음 생성
    pitchPlayersContainer.innerHTML = '';
    STATE.pitchPlayers.forEach((player) => {
      const rawPos = phase === 'attack' ? player.attack_pos : player.defense_pos;
      const mappedPos = calcPitchCoords(rawPos);
      const actText = phase === 'attack' ? player.attack_action : player.defense_action;

      const node = document.createElement('div');
      node.className = `player-node zone-${player.zone}`;
      node.style.left = `${mappedPos.x}%`;
      node.style.top = `${mappedPos.y}%`;

      node.innerHTML = `
        <div class="player-dot">${player.role.split('-')[0] || '●'}</div>
        <div class="player-name-badge">${player.name}</div>
        <div class="player-action-pill ${phase === 'attack' ? 'act-attack' : 'act-defense'}">${actText}</div>
      `;

      node.addEventListener('click', () => {
        showToast(`[${player.name}] 롤: ${player.role} | ${phase === 'attack' ? '공격 움직임' : '수비 지침'}: ${actText}`);
      });

      pitchPlayersContainer.appendChild(node);
    });
  }

  phaseAttackBtn.addEventListener('click', () => updatePitchPhaseUI('attack'));
  phaseDefenseBtn.addEventListener('click', () => updatePitchPhaseUI('defense'));

  // ------------------------------------------------------------
  // 15. 클릭 고정형 상세 모달 팝업 열기 (인터랙티브 전술 바인더)
  // ------------------------------------------------------------
  const summaryCards = document.querySelectorAll('.tactical-summary-card');
  summaryCards.forEach(card => {
    card.addEventListener('click', () => {
      if (!STATE.latestResultData) {
        showToast('먼저 [전술 플레이북 생성]을 실행해 주세요!');
        return;
      }
      const modalType = card.dataset.modal;
      openDetailModal(modalType);
    });
  });

  function openDetailModal(type) {
    const data = STATE.latestResultData;
    if (!data) return;

    const details = data.modal_details || {};

    if (type === 'matchup') {
      modalIcon.textContent = '⚔️';
      modalTitle.textContent = '상성 진단 & 공략 지점 (상대 취약점 정밀 분석)';
      
      const content = details.matchup || data.summary_badges?.matchup || '상대 공격 및 수비 분석 데이터가 생성되지 않았습니다.';
      modalBody.innerHTML = `
        <div class="modal-check-section">
          <div class="modal-check-title">🎯 상대 전술 핵심 패턴 & 취약 공간 공략</div>
          <div class="tactical-highlight-box">
            <p style="font-size: 0.88rem; line-height: 1.6; color: #f1f5f9;">
              ${content.replace(/\n/g, '<br>')}
            </p>
          </div>
        </div>

        <div class="modal-check-section">
          <div class="modal-check-title">⚖️ 라인별 전력 체급 종합 판정</div>
          <div class="fm-slider-group">
            <div class="fm-slider-item">
              <div class="fm-slider-label">
                <span>공격진 매치업: 상대 수비 대비</span>
                <span class="fm-slider-val">${STATE.squadTiers.attack}</span>
              </div>
              <div class="fm-slider-bar"><div class="fm-slider-fill" style="width: ${STATE.squadTiers.attack === '우세' ? '85%' : STATE.squadTiers.attack === '호각' ? '50%' : '25%'}"></div></div>
            </div>
            <div class="fm-slider-item">
              <div class="fm-slider-label">
                <span>미드필더 매치업: 중원 점유율</span>
                <span class="fm-slider-val">${STATE.squadTiers.midfield}</span>
              </div>
              <div class="fm-slider-bar"><div class="fm-slider-fill" style="width: ${STATE.squadTiers.midfield === '우세' ? '85%' : STATE.squadTiers.midfield === '호각' ? '50%' : '25%'}"></div></div>
            </div>
            <div class="fm-slider-item">
              <div class="fm-slider-label">
                <span>수비진 매치업: 상대 침투 차단</span>
                <span class="fm-slider-val">${STATE.squadTiers.defense}</span>
              </div>
              <div class="fm-slider-bar"><div class="fm-slider-fill" style="width: ${STATE.squadTiers.defense === '우세' ? '85%' : STATE.squadTiers.defense === '호각' ? '50%' : '25%'}"></div></div>
            </div>
          </div>
        </div>
      `;
    } else if (type === 'plana') {
      modalIcon.textContent = '📋';
      modalTitle.textContent = '플랜 A 인게임 세부 조작 가이드 (인터랙티브 바인더)';
      
      const content = details.plana || data.summary_badges?.plana || '';
      const sliders = data.sliders || {};

      const tempoVal = Math.max(5, Math.min(100, Number(sliders.tempo?.val) || 70));
      const tempoText = sliders.tempo?.text || '약간 빠르게 (경기 템포 통제)';

      const directnessVal = Math.max(5, Math.min(100, Number(sliders.directness?.val) || 40));
      const directnessText = sliders.directness?.text || '짧은 패스 위주 (점유율 기반)';

      const defLineVal = Math.max(5, Math.min(100, Number(sliders.def_line?.val) || 75));
      const defLineText = sliders.def_line?.text || '높은 수비 라인';

      const pressVal = Math.max(5, Math.min(100, Number(sliders.press?.val) || 80));
      const pressText = sliders.press?.text || '더 자주 강하게 (전방 1차 압박)';

      modalBody.innerHTML = `
        <div class="modal-check-section">
          <div class="modal-check-title">🎚️ (FM) 팀 전술 슬라이더 조작값 (AI 분석 100% 동기화)</div>
          <div class="fm-slider-group">
            <div class="fm-slider-item">
              <div class="fm-slider-label">
                <span>템포 (Tempo)</span>
                <span class="fm-slider-val">${tempoText}</span>
              </div>
              <div class="fm-slider-bar"><div class="fm-slider-fill" style="width: ${tempoVal}%"></div></div>
            </div>
            <div class="fm-slider-item">
              <div class="fm-slider-label">
                <span>패스 길이 (Directness)</span>
                <span class="fm-slider-val">${directnessText}</span>
              </div>
              <div class="fm-slider-bar"><div class="fm-slider-fill" style="width: ${directnessVal}%"></div></div>
            </div>
            <div class="fm-slider-item">
              <div class="fm-slider-label">
                <span>수비 라인 (Defensive Line)</span>
                <span class="fm-slider-val">${defLineText}</span>
              </div>
              <div class="fm-slider-bar"><div class="fm-slider-fill" style="width: ${defLineVal}%"></div></div>
            </div>
            <div class="fm-slider-item">
              <div class="fm-slider-label">
                <span>압박 기준선 (Trigger Press)</span>
                <span class="fm-slider-val">${pressText}</span>
              </div>
              <div class="fm-slider-bar"><div class="fm-slider-fill" style="width: ${pressVal}%"></div></div>
            </div>
          </div>
        </div>

        <div class="modal-check-section">
          <div class="modal-check-title">✅ 인게임 조작 체크리스트 (클릭하여 설정 완료 표시)</div>
          <div class="interactive-checklist">
            <div class="tactical-checkbox-item">
              <div class="check-box-icon"></div>
              <div class="check-content">
                <div class="check-title">포메이션 뼈대 유지 및 롤 미세조정</div>
                <div class="check-desc">${pitchFormationTitle.textContent}</div>
              </div>
              <span class="check-badge-tag">필수</span>
            </div>

            <div class="tactical-checkbox-item">
              <div class="check-box-icon"></div>
              <div class="check-content">
                <div class="check-title">핵심 공략 지침 및 세부 롤 확인</div>
                <div class="check-desc">${content.replace(/\n/g, '<br>')}</div>
              </div>
              <span class="check-badge-tag">조작</span>
            </div>

            <div class="tactical-checkbox-item">
              <div class="check-box-icon"></div>
              <div class="check-content">
                <div class="check-title">선수 개인 지침 & 공간 침투/압박 설정</div>
                <div class="check-desc">추천된 핵심 선수별 세부 지침 및 상대 취약 구역 집중 공략</div>
              </div>
              <span class="check-badge-tag">지침</span>
            </div>
          </div>
        </div>
      `;

      // 체크박스 클릭 토글 이벤트 바인딩
      modalBody.querySelectorAll('.tactical-checkbox-item').forEach(item => {
        item.addEventListener('click', () => {
          item.classList.toggle('checked');
          const icon = item.querySelector('.check-box-icon');
          icon.textContent = item.classList.contains('checked') ? '✓' : '';
        });
      });

    } else if (type === 'scenarios') {
      modalIcon.textContent = '🔄';
      modalTitle.textContent = '시나리오별 대처 (점수대 및 경기 시간별 플랜 B/C)';
      
      const content = details.scenarios || data.summary_badges?.scenarios || '';
      modalBody.innerHTML = `
        <div class="modal-check-section">
          <div class="modal-check-title">⏱️ 실전 경기 국면별 즉시 대처 카드</div>
          <div class="scenario-trio-grid">
            <div class="scenario-card-box lead">
              <div class="scenario-card-title">🟢 2점 차 이상 리드 시 (잠그기 & 승점 굳히기)</div>
              <div class="scenario-card-body">
                템포를 낮추고 패스 길이를 짧게 유지하며 볼 점유율로 상대를 고사시킵니다. 공격 가담 풀백을 '지원'으로 내리고 수비 라인을 한 칸 내려 뒷공간 역습을 원천 봉쇄하십시오.
              </div>
            </div>

            <div class="scenario-card-box tight">
              <div class="scenario-card-title">🟡 1점 차 접전 / 동점 시 (65~75분 승부처)</div>
              <div class="scenario-card-body">
                체력이 65% 이하로 떨어진 윙어와 중원 자원을 프레시한 서브 자원으로 1:1 교체하십시오. 중앙 수적 우위를 유지하며 상대 체력 방전 구간을 겨냥한 템포 업을 지시합니다.
              </div>
            </div>

            <div class="scenario-card-box chase">
              <div class="scenario-card-title">🔴 1점 차 열세 / 실점 시 (역전 총공세 모드)</div>
              <div class="scenario-card-body">
                수비 라인을 극한으로 끌어올리고 전방 압박 강도를 최대로 설정하십시오. 타깃터 혹은 침투형 공격수를 박스 안으로 투입하고 '위험을 감수하라' 개인 지침을 부여합니다.
              </div>
            </div>
          </div>
        </div>

        <div class="modal-check-section" style="margin-top: 14px;">
          <div class="modal-check-title">💡 사령탑의 실전 시나리오 비책</div>
          <div class="tactical-highlight-box">
            <p style="font-size: 0.85rem; line-height: 1.5; color: #e2e8f0;">
              ${content.replace(/\n/g, '<br>')}
            </p>
          </div>
        </div>
      `;
    } else if (type === 'onepoint') {
      modalIcon.textContent = '💡';
      modalTitle.textContent = '에이스 봉쇄 & 원포인트 비기 (맨마크 및 세트피스)';
      
      const content = details.onepoint || data.summary_badges?.onepoint || '';
      modalBody.innerHTML = `
        <div class="modal-check-section">
          <div class="modal-check-title">🎯 상대 에이스 & 키맨 질식 봉쇄 지침</div>
          <div class="tactical-highlight-box ace">
            <h5 style="color: #fda4af; font-size: 0.88rem; font-weight: 800; margin-bottom: 6px;">상대 핵심 플레이메이커 / 침투 공격수 전담 견제</h5>
            <p style="font-size: 0.82rem; line-height: 1.5; color: #fecdd3;">
              상대 키맨에게 <strong>[전담 마크], [특정 발 유도: 약발], [더 강하게 압박]</strong> 3중 지침을 인게임 상대 선수 지침에서 활성화하여 빌드업 줄기를 사전 차단하십시오.
            </p>
          </div>
        </div>

        <div class="modal-check-section">
          <div class="modal-check-title">📐 세트피스(코너킥/프리킥) 득점 패턴</div>
          <div class="tactical-highlight-box setpiece">
            <h5 style="color: #fde047; font-size: 0.88rem; font-weight: 800; margin-bottom: 6px;">공격 세트피스: 니어포스트 플릭온 & 컷백 비기</h5>
            <p style="font-size: 0.82rem; line-height: 1.5; color: #fef08a;">
              가장 헤더 능력이 뛰어난 선수를 니어포스트에 배치하고, 반대편 타깃터의 백포스트 쇄도를 유도하십시오. 세컨볼 지점에 슈팅력 좋은 미드필더를 '박스 밖 대기'로 고정합니다.
            </p>
          </div>
        </div>

        <div class="modal-check-section">
          <div class="modal-check-title">💬 사령탑 시그니처 원포인트</div>
          <div class="tactical-highlight-box">
            <p style="font-size: 0.85rem; line-height: 1.5; color: #e2e8f0;">
              ${content.replace(/\n/g, '<br>')}
            </p>
          </div>
        </div>
      `;
    }

    detailModalOverlay.style.display = 'flex';
    refreshIcons();
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
  // 16. 전술창 고화질 이미지 캡처 (다운로드 & 클립보드)
  // ------------------------------------------------------------
  captureSummaryBtn.addEventListener('click', async () => {
    if (!STATE.latestResultData) {
      showToast('먼저 [전술 플레이북 생성]을 실행해 주세요!');
      return;
    }

    const targetEl = document.getElementById('briefingContentBox');
    if (!targetEl) return;

    showToast('📸 고화질 전술 리포트 카드를 생성하고 있습니다...');
    captureSummaryBtn.disabled = true;
    const origBtnHtml = captureSummaryBtn.innerHTML;
    captureSummaryBtn.innerHTML = '<i data-lucide="loader-2" class="spin"></i> <span>이미지 생성 중...</span>';
    refreshIcons();

    try {
      if (typeof html2canvas === 'undefined') {
        throw new Error('html2canvas 라이브러리를 불러오지 못했습니다.');
      }

      const canvas = await html2canvas(targetEl, {
        backgroundColor: '#050e0a',
        scale: 2,
        useCORS: true,
        logging: false
      });

      const coachName = STATE.selectedCoachKey === 'custom' 
        ? (customCoachNameInput.value.trim() || '사령탑')
        : COACH_DATABASE[STATE.selectedCoachKey].name;

      const dateStr = new Date().toISOString().slice(0, 10);
      const fileName = `FM_Tactical_Playbook_${coachName}_${dateStr}.png`;

      // 1. 이미지 다운로드 트리거
      const link = document.createElement('a');
      link.download = fileName;
      link.href = canvas.toDataURL('image/png');
      link.click();

      // 2. 클립보드 복사 시도
      if (navigator.clipboard && window.ClipboardItem) {
        canvas.toBlob(blob => {
          if (blob) {
            navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob })
            ]).catch(() => {});
          }
        });
      }

      showToast('📸 고화질 전술 카드가 이미지로 저장되었습니다! (클립보드 복사 완료)');
    } catch (err) {
      console.error('Capture error:', err);
      showToast('이미지 캡처 중 오류가 발생했습니다: ' + err.message);
    } finally {
      captureSummaryBtn.disabled = false;
      captureSummaryBtn.innerHTML = origBtnHtml;
      refreshIcons();
    }
  });

  // ------------------------------------------------------------
  // 17. 전술 애니메이션 움짤(GIF) 고화질 생성 & 자동 다운로드
  // ------------------------------------------------------------
  captureGifBtn.addEventListener('click', async () => {
    if (!STATE.latestResultData) {
      showToast('먼저 [전술 플레이북 생성]을 실행해 주세요!');
      return;
    }

    const targetEl = document.getElementById('briefingContentBox');
    if (!targetEl) return;

    if (typeof html2canvas === 'undefined' || typeof gifshot === 'undefined') {
      showToast('⚠️ 캡처 또는 GIF 라이브러리를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.');
      return;
    }

    captureGifBtn.disabled = true;
    const origBtnHtml = captureGifBtn.innerHTML;
    captureGifBtn.innerHTML = '<i data-lucide="loader-2" class="spin"></i> <span>GIF 생성 중...</span>';
    refreshIcons();

    const origPhase = STATE.currentPitchPhase;

    try {
      showToast('🛡️ [1/3] 수비 대형 프레임을 캡처하고 있습니다...');
      updatePitchPhaseUI('defense');
      await new Promise(r => setTimeout(r, 350));

      const canvasDef = await html2canvas(targetEl, {
        backgroundColor: '#050e0a',
        scale: 1.2,
        useCORS: true,
        logging: false
      });
      const imgDef = canvasDef.toDataURL('image/jpeg', 0.85);

      showToast('⚔️ [2/3] 공격 대형 프레임을 캡처하고 있습니다...');
      updatePitchPhaseUI('attack');
      await new Promise(r => setTimeout(r, 350));

      const canvasAtk = await html2canvas(targetEl, {
        backgroundColor: '#050e0a',
        scale: 1.2,
        useCORS: true,
        logging: false
      });
      const imgAtk = canvasAtk.toDataURL('image/jpeg', 0.85);

      // 원래 보던 단계로 복원
      updatePitchPhaseUI(origPhase);

      showToast('🎞️ [3/3] 수비↔공격 루프 애니메이션 GIF를 인코딩 중입니다...');

      // 수비 대형 2프레임(약 1.6초) ➔ 공격 대형 2프레임(약 1.6초) 무한 루프
      const frames = [imgDef, imgDef, imgAtk, imgAtk];
      const targetWidth = Math.min(720, canvasDef.width);
      const targetHeight = Math.round(targetWidth * (canvasDef.height / canvasDef.width));

      gifshot.createGIF({
        images: frames,
        interval: 0.8,
        gifWidth: targetWidth,
        gifHeight: targetHeight,
        numFrames: 4,
        sampleInterval: 10,
        numWorkers: 2
      }, function (obj) {
        if (!obj.error) {
          const animatedGifUrl = obj.image;
          const coachName = STATE.selectedCoachKey === 'custom' 
            ? (customCoachNameInput.value.trim() || '사령탑')
            : COACH_DATABASE[STATE.selectedCoachKey].name;
          const dateStr = new Date().toISOString().slice(0, 10);
          const fileName = `FM_Tactical_Animation_${coachName}_${dateStr}.gif`;

          const link = document.createElement('a');
          link.download = fileName;
          link.href = animatedGifUrl;
          link.click();

          showToast('🎉 전술 공수 애니메이션 GIF가 성공적으로 저장되었습니다!');
        } else {
          console.error("GIF error:", obj.errorMsg);
          showToast('GIF 생성 중 오류가 발생했습니다: ' + obj.errorMsg);
        }
        captureGifBtn.disabled = false;
        captureGifBtn.innerHTML = origBtnHtml;
        refreshIcons();
      });

    } catch (err) {
      console.error('GIF Capture error:', err);
      showToast('GIF 캡처 중 오류가 발생했습니다: ' + err.message);
      updatePitchPhaseUI(origPhase);
      captureGifBtn.disabled = false;
      captureGifBtn.innerHTML = origBtnHtml;
      refreshIcons();
    }
  });

  errorReportBtn.addEventListener('click', () => {
    const reportData = {
      timestamp: new Date().toISOString(),
      coach: STATE.selectedCoachKey,
      customCoach: STATE.customCoachName,
      tiers: STATE.squadTiers,
      slot1Count: STATE.slot1Images.length,
      slot2Count: STATE.slot2Images.length,
      mode: STATE.analysisMode,
      advancedOptions: STATE.analysisMode === 'advanced' ? STATE.advancedOptions : null,
      lastError: STATE.lastErrorLog || "최근 기록된 에러 없음"
    };

    const textToCopy = `[FM 플레이북 오류 제보 로그]\n${JSON.stringify(reportData, null, 2)}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      showToast('📋 시스템 디버그 로그가 클립보드에 복사되었습니다! 개발자에게 전달해 주세요.');
    }).catch(() => {
      showToast('로그 복사에 실패했습니다.');
    });
  });

  // 초기 아이콘 렌더링
  refreshIcons();

});
