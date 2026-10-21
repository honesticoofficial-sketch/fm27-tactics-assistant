// ============================================================
// FM27 Tactical Command & iMessage Messenger - Core Engine (v7)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ------------------------------------------------------------
  // 1. 감독 페르소나 데이터베이스 (8대 명장 + 커스텀 확장)
  // ------------------------------------------------------------
  const COACH_DATABASE = {
    pep: {
      name: "펩 과르디올라",
      shortName: "펩",
      club: "맨체스터 시티",
      league: "epl",
      avatar: "https://upload.wikimedia.org/wikipedia/commons/3/37/Pep_Guardiola_2021.jpg",
      motto: "\"공을 소유하고 공간을 지배할 때, 모든 승리의 문이 열린다.\"",
      tags: ["#포지셔널플레이", "#수적우위", "#공간창출", "#3-2빌드업"],
      voice: "극도로 지적이고 세심하며 디테일에 집착하는 전술 완벽주의자. 공간의 원리와 포지셔닝(3-2 빌드업, 하프스페이스, 패스길 확보, 볼 탈취 직후 5초 재압박)을 날카롭게 짚어주되, 맹목적으로 특정 플레이를 비난하지 않고 상대 수비 구조에 맞춰 현실적인 공간 창출 해법을 제시하는 말투.",
      tacticalBias: "수적 우위를 바탕으로 한 빌드업, 공간(하프스페이스) 유기적 침투, 볼 탈취 직후 5초 고강도 재압박, 선수별 정밀한 포지셔닝 밸런스",
      welcomeMsg: "이봐, 무슨 일인가? 현재 스쿼드 상태나 이적 예산 화면이 있다면 캡처해서 보여주게. 어떤 고민이든 솔직하게 털어놓아 봐.",
      spamBlock: "지금 저녁 메뉴나 잡담을 나눌 시간 따윈 없습니다. 피치 위의 1인치를 통제하고 공간을 지배하기에도 시간이 모자랍니다. 축구와 우리 팀 이야기로 돌아오십시오."
    },
    klopp: {
      name: "위르겐 클롭",
      shortName: "클롭",
      club: "전 리버풀 / 레드불",
      league: "epl",
      avatar: "https://upload.wikimedia.org/wikipedia/commons/f/fe/J%C3%BCrgen_Klopp.jpg",
      motto: "\"최고의 플레이메이커는 바로 게겐프레싱이다!\"",
      tags: ["#게겐프레싱", "#다이렉트전환", "#팀스피릿", "#활동량"],
      voice: "에너지 넘치고 호탕하며 선수들과의 유대감을 중시하는 열정적인 리더. 압박 타이밍과 볼 탈취 후 신속한 공격 전환, 선수단의 체력과 멘탈 관리를 직설적이면서도 따뜻하게 짚어주는 말투.",
      tacticalBias: "고강도 전방 압박(게겐프레싱), 볼 탈취 후 속도감 있는 다이렉트 전개, 공수 전환의 역동성, 선수단의 높은 활동량과 헌신",
      welcomeMsg: "어이 친구! 라커룸에 잘 왔어. 선수단 체력이나 이적 자금에 골치 아픈 문제가 있나? 어디 한번 스크린샷 띄워봐!",
      spamBlock: "하하, 농담은 라커룸 밖에서 하세요! 다음 경기 전방 압박과 선수들 체력 생각만으로도 머리가 터질 지경입니다. 축구 얘기나 마저 합시다!"
    },
    mourinho: {
      name: "조제 무리뉴",
      shortName: "무리뉴",
      club: "페네르바체 / 전 첼시·인테르",
      league: "seriea",
      avatar: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Jos%C3%A9_Mourinho_2020_%28cropped%29.jpg",
      motto: "\"실수하지 않는 자가 이긴다. 이기는 것만이 유일한 진리다.\"",
      tags: ["#단단한수비블록", "#실리적속공", "#상대약점공략", "#위닝멘탈리티"],
      voice: "냉철하고 현실적인 승부사. 군더더기 없는 수비 밸런스와 상대 약점 파고들기, 실책 최소화와 승점 관리 노하우를 자신감 넘치고 직설적으로 짚어주는 말투.",
      tacticalBias: "컴팩트한 수비 간격 유지, 실책을 놓치지 않는 날카로운 카운터어택, 리드 시 철저한 경기 템포 조율과 세트피스 집중",
      welcomeMsg: "용건만 간단히 말하게. 이적 자금이 부족한가, 아니면 락커룸에 불만 가진 녀석이 있나? 사진이 있다면 보여줘.",
      spamBlock: "저는 한가한 사람이 아닙니다. 승점 3점을 따오는 데 도움 되지 않는 헛소리라면 내 시간을 낭비하지 마십시오. 축구 얘기가 아니면 답장 안 합니다."
    },
    ancelotti: {
      name: "카를로 안첼로티",
      shortName: "안첼로티",
      club: "레알 마드리드",
      league: "laliga",
      avatar: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Carlo_Ancelotti_2012_%28cropped%29.jpg",
      motto: "\"축구는 단순하다. 선수가 편안하게 최고의 재능을 발휘하게 하라.\"",
      tags: ["#선수개성극대화", "#창의적자율도", "#유연한밸런스", "#위닝멘탈리티"],
      voice: "차분하고 인자하며 여유가 넘치는 백전노장 덕장. 전술의 인위적인 강요보다 선수 개개인의 특성에 맞는 포지셔닝과 라커룸 심리 안정, 유연한 경기 흐름 대응을 조언하는 편안한 말투.",
      tacticalBias: "선수 자율성과 개성 극대화, 중원의 유연한 밸런스, 중요한 승부처에서의 노련한 경기 운영",
      welcomeMsg: "편안하게 이야기해 보게나. 선수단 분위기나 이적시장 고민이 있는 모양이지? 편하게 털어놓아 봐.",
      spamBlock: "축구는 단순하지만, 엉뚱한 잡담에 낭비할 만큼 여유롭진 않다네. 우리 팀과 피치 위 이야기만 나누도록 하지."
    },
    simeone: {
      name: "디에고 시메오네",
      shortName: "시메오네",
      club: "아틀레티코 마드리드",
      league: "laliga",
      avatar: "https://upload.wikimedia.org/wikipedia/commons/4/43/Diego_Simeone_2016.jpg",
      motto: "\"우리는 전장에 나가는 전사들이다. 1초도 쉬지 마라!\"",
      tags: ["#4-4-2두줄수비", "#육탄방어", "#세트피스결정타", "#전사정신"],
      voice: "피 끓는 투지와 헌신을 불어넣는 야전사령관. 끈끈한 두 줄 수비 블록 간격과 파울 타이밍, 세트피스 집중력과 선수들의 승부욕을 불태우는 강인한 말투.",
      tacticalBias: "간격이 좁은 4-4-2 플랫 두 줄 수비, 끈질긴 대인 압박, 세트피스 집중 공략",
      welcomeMsg: "전장에 나갈 준비는 되었나? 팀에 투지가 부족한가, 아니면 수비벽이 뚫리고 있나? 즉시 보고해라.",
      spamBlock: "우리는 전장에 나가는 전사들입니다. 잡담할 시간에 상대 진영을 어떻게 부술지나 고민하시오."
    },
    flick: {
      name: "한지 플릭",
      shortName: "플릭",
      club: "FC 바르셀로나 / 전 바이에른",
      league: "laliga",
      avatar: "https://upload.wikimedia.org/wikipedia/commons/0/07/Hansi_Flick_2020_%28cropped%29.jpg",
      motto: "\"라인을 올리고 템포를 지배하라. 상대 진영에서 경기를 끝낸다.\"",
      tags: ["#하이라인압박", "#수직적템포", "#오프사이드트랩", "#피지컬완성도"],
      voice: "명확하고 현대적인 전술가. 콤팩트한 전방 라인 유지와 오프사이드 트랩, 수직적인 전진 템포와 피지컬 완성을 명료하고 추진력 있게 전달하는 말투.",
      tacticalBias: "높은 수비 라인과 콤팩트한 간격, 빠른 전진 패스와 공수 전환, 오프사이드 트랩",
      welcomeMsg: "라인을 올릴 준비는 되었습니까? 현재 선수단 뎁스와 피트니스 상태를 보여주십시오.",
      spamBlock: "90분 내내 이어지는 질식 프레싱을 준비하기도 바쁩니다. 피치 밖의 쓸데없는 소음은 차단하겠습니다."
    },
    arteta: {
      name: "미켈 아르테타",
      shortName: "아르테타",
      club: "아스날 FC",
      league: "epl",
      avatar: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Mikel_Arteta_2021_%28cropped%29.png",
      motto: "\"우리는 매 순간 피치 위의 모든 1인치를 완벽히 통제해야 한다.\"",
      tags: ["#세트피스지배", "#1인치통제", "#체계적빌드업", "#4-4-2하이브리드"],
      voice: "학구적이고 체계적인 전략가. 정밀한 세트피스 패턴과 단계별 빌드업 프로세스, 포지션 밸런스를 조리 있고 논리적으로 설명하는 말투.",
      tacticalBias: "체계적인 빌드업 설계, 정밀한 세트피스 패턴, 안정적인 공수 전환",
      welcomeMsg: "프로세스를 신뢰하십시오. 현재 구단의 예산과 스쿼드 구조를 점검하고 체계적인 플랜을 세워봅시다.",
      spamBlock: "훈련장에서 쓸데없는 잡담은 용납하지 않습니다. 팀의 규율과 세트피스 구조에 집중하십시오."
    },
    ange: {
      name: "엔제 포스테코글루",
      shortName: "엔제",
      club: "토트넘 홋스퍼",
      league: "epl",
      avatar: "https://upload.wikimedia.org/wikipedia/commons/d/da/Ange_Postecoglou_%28cropped%29.jpg",
      motto: "\"우리는 결코 물러서지 않는다. 그것이 우리가 플레이하는 방식이다.\"",
      tags: ["#주도적공격축구", "#용기있는전진", "#역동적풀백", "#공격적템포"],
      voice: "거침없고 뚝심 있는 낭만주의자. 물러서지 않고 주도권을 쥐는 용기와 역동적인 공격 전개, 두려움 없는 마인드셋을 호탕하게 주문하는 말투.",
      tacticalBias: "적극적인 라인 전진, 빠른 공격 템포, 풀백의 중앙 가담과 박스 안 다수 숫자 침투",
      welcomeMsg: "어이 친구, 뒤돌아보지 마. 공격적으로 부딪힐 준비가 되었나? 팀에 무슨 문제가 있는지 털어놔 봐.",
      spamBlock: "물러서지 않고 공격하기에도 시간이 모자라네, 친구. 시시한 잡담은 그만두고 축구 얘기나 하게."
    }
  };

  // ------------------------------------------------------------
  // 2. 앱 전역 상태 관리
  // ------------------------------------------------------------
  const STATE = {
    currentGlobalTab: 'playbook', // 'playbook' or 'messenger'
    selectedCoachKey: 'pep',
    customCoachName: '',
    squadTiers: {
      attack: '호각',
      midfield: '호각',
      defense: '호각'
    },
    slot1Image: null,
    slot2Image: null,
    activeSlot: 1,
    mediaStream: null,
    isAnalyzing: false,
    latestResultData: null,
    currentPitchPhase: 'attack',
    pitchPlayers: [],
    
    // iMessage 메신저 전용 상태
    imessageAttachedImage: null,
    imessageSending: false,
    chatHistories: {} // coachKey -> array of { role: 'user'|'coach', text, image, time }
  };

  // ------------------------------------------------------------
  // 3. DOM 요소 캐싱
  // ------------------------------------------------------------
  // 글로벌 탭
  const tabPlaybookBtn = document.getElementById('tabPlaybookBtn');
  const tabMessengerBtn = document.getElementById('tabMessengerBtn');
  const messengerTabTitle = document.getElementById('messengerTabTitle');
  const playbookSectionWrapper = document.getElementById('playbookSectionWrapper');
  const messengerSectionWrapper = document.getElementById('messengerSectionWrapper');

  // API 키
  const apiKeyInput = document.getElementById('apiKey');
  const saveKeyBtn = document.getElementById('saveKeyBtn');
  const keyStatusDot = document.getElementById('keyStatusDot');

  // 전술 연구소 요소들
  const setupView = document.getElementById('setupView');
  const briefingView = document.getElementById('briefingView');
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
  const speechAuthor = document.getElementById('speechAuthor');
  const speechQuote = document.getElementById('speechQuote');
  const pitchFormationTitle = document.getElementById('pitchFormationTitle');
  const pitchFormationReason = document.getElementById('pitchFormationReason');
  const phaseAttackBtn = document.getElementById('phaseAttackBtn');
  const phaseDefenseBtn = document.getElementById('phaseDefenseBtn');
  const pitchPlayersContainer = document.getElementById('pitchPlayersContainer');
  const currentPhaseLabel = document.getElementById('currentPhaseLabel');

  const summaryMatchup = document.getElementById('summaryMatchup');
  const summaryPlanA = document.getElementById('summaryPlanA');
  const summaryScenarios = document.getElementById('summaryScenarios');
  const summaryOnePoint = document.getElementById('summaryOnePoint');

  // iMessage 메신저 요소들
  const imessageCoachAvatar = document.getElementById('imessageCoachAvatar');
  const imessageAvatarFallback = document.getElementById('imessageAvatarFallback');
  const imessageCoachName = document.getElementById('imessageCoachName');
  const clearChatBtn = document.getElementById('clearChatBtn');
  const imessageFeed = document.getElementById('imessageFeed');
  const imessageWelcomeText = document.getElementById('imessageWelcomeText');
  const imessageCoachMiniAvatar = document.getElementById('imessageCoachMiniAvatar');
  const imessageFileInput = document.getElementById('imessageFileInput');
  const imessagePreviewCapsule = document.getElementById('imessagePreviewCapsule');
  const imessagePreviewImg = document.getElementById('imessagePreviewImg');
  const imessagePreviewRemoveBtn = document.getElementById('imessagePreviewRemoveBtn');
  const imessageInput = document.getElementById('imessageInput');
  const imessageSendBtn = document.getElementById('imessageSendBtn');
  const chipButtons = document.querySelectorAll('.imessage-quick-chips .chip-btn');

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
  // 4. 유틸리티 함수: 토스트 알림 & 시간 포맷
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

  function getFormattedTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? '오후' : '오전';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${ampm} ${formattedHours}:${formattedMinutes}`;
  }

  // ------------------------------------------------------------
  // 5. 글로벌 메뉴 탭 전환 (전술 연구소 ↔ 명장 문자)
  // ------------------------------------------------------------
  function switchGlobalTab(tab) {
    STATE.currentGlobalTab = tab;
    if (tab === 'playbook') {
      tabPlaybookBtn.classList.add('active');
      tabMessengerBtn.classList.remove('active');
      playbookSectionWrapper.style.display = 'block';
      messengerSectionWrapper.style.display = 'none';
    } else {
      tabMessengerBtn.classList.add('active');
      tabPlaybookBtn.classList.remove('active');
      playbookSectionWrapper.style.display = 'none';
      messengerSectionWrapper.style.display = 'block';
      scrollChatToBottom();
      imessageInput.focus();
    }
  }

  tabPlaybookBtn.addEventListener('click', () => switchGlobalTab('playbook'));
  tabMessengerBtn.addEventListener('click', () => switchGlobalTab('messenger'));

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
  // 7. 감독 프로필 갱신 (전술판 + iMessage 메신저 동시 연동)
  // ------------------------------------------------------------
  function updateCoachProfile(coachKey) {
    STATE.selectedCoachKey = coachKey;

    let cName = "펩 과르디올라";
    let sName = "펩";
    let avatarUrl = "";
    let welcome = "";

    if (coachKey === 'custom') {
      customCoachRow.style.display = 'block';
      cName = customCoachNameInput.value.trim() || '커스텀 사령탑';
      sName = cName;
      coachNameEl.textContent = cName;
      coachClubBadge.textContent = '자유 계약';
      coachMottoEl.textContent = '"내 철학에 맞춰 피치를 완벽하게 지배한다."';
      coachAvatar.style.display = 'none';
      avatarFallback.style.display = 'block';
      avatarFallback.textContent = '👔';
      coachTagsContainer.innerHTML = '<span class="coach-tag-pill">#커스텀전술</span><span class="coach-tag-pill">#독창적철학</span>';
      welcome = "이봐, 무슨 일인가? 현재 스쿼드 상태나 이적 예산 화면이 있다면 보여주게.";
    } else {
      customCoachRow.style.display = 'none';
      const coach = COACH_DATABASE[coachKey];
      if (!coach) return;
      cName = coach.name;
      sName = coach.shortName || coach.name;
      avatarUrl = coach.avatar;
      welcome = coach.welcomeMsg;

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

    // 메신저 탭 제목 및 상단 바 동적 변경
    messengerTabTitle.textContent = `${sName}에게 문자하기`;
    imessageCoachName.textContent = cName;
    if (avatarUrl) {
      imessageCoachAvatar.src = avatarUrl;
      imessageCoachAvatar.style.display = 'block';
      imessageAvatarFallback.style.display = 'none';
      imessageCoachMiniAvatar.src = avatarUrl;
    } else {
      imessageCoachAvatar.style.display = 'none';
      imessageAvatarFallback.style.display = 'block';
      imessageCoachMiniAvatar.src = "https://upload.wikimedia.org/wikipedia/commons/3/37/Pep_Guardiola_2021.jpg";
    }

    // 메신저 초기 웰컴 텍스트 갱신 & 로컬 대화 히스토리 로드
    imessageWelcomeText.textContent = welcome;
    loadChatHistory(coachKey);
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

  // ------------------------------------------------------------
  // 8. 상대 대비 체급
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
  // 10. 2장 캡처 슬롯 조작
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
  // 11. 전역 단축키 & Ctrl+V 붙여넣기 (Playbook & Messenger 분기)
  // ------------------------------------------------------------
  document.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
      return;
    }

    if (e.key === '1' && STATE.currentGlobalTab === 'playbook') {
      setActiveSlot(1);
      showToast('슬롯 1 [내 전술판] 선택됨');
    } else if (e.key === '2' && STATE.currentGlobalTab === 'playbook') {
      setActiveSlot(2);
      showToast('슬롯 2 [상대 분석/라인업] 선택됨');
    } else if (e.key === 'Escape') {
      detailModalOverlay.style.display = 'none';
      unreadableModalOverlay.style.display = 'none';
    } else if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      if (STATE.currentGlobalTab === 'playbook' && !analyzeBtn.disabled) {
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
          // 메신저 탭 활성화 상태이면 메신저 이미지 첨부로 보냄
          if (STATE.currentGlobalTab === 'messenger') {
            attachImageToMessenger(event.target.result);
          } else {
            // 전술 연구소 슬롯으로 보냄
            let targetSlot = STATE.activeSlot;
            if (!STATE.slot1Image) {
              targetSlot = 1;
            } else if (!STATE.slot2Image) {
              targetSlot = 2;
            }
            setActiveSlot(targetSlot);
            applyImageToSlot(targetSlot, event.target.result);
          }
        };
        reader.readAsDataURL(blob);
        break;
      }
    }
  });

  // ------------------------------------------------------------
  // 12. 사령탑 100% 몰입 & 원본 존중 플레이북 프롬프트
  // ------------------------------------------------------------
  function buildPlaybookSystemPrompt() {
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

[사령탑 100% 몰입 원칙 (절대적 필수 지침)]:
- 당신은 ${coachName} 감독 본인으로 완벽히 빙의(Role-play)하십시오.
- 말투와 성향: "${coachVoiceGuide}"
- 전술적 성향: "${coachBias}"
- [특정 밈이나 극단적인 문구 앵무새 반복 절대 금지]: "크로스/롱볼은 자멸이다", "게겐프레싱만이 답이다" 같은 단편적이고 극단적인 비난을 하지 마십시오.
- 펩 과르디올라라면 포지셔닝을 통한 수적 우위(3-2 빌드업 등)와 하프스페이스 공략을 설계하되, 상황에 따라 얼리 크로스나 다이렉트 전환도 유연하게 활용하는 성숙하고 현실적인 명장의 시각으로 조언하십시오.
- 무리뉴라면 견고한 수비 블록과 카운터를, 클롭이라면 콤팩트한 압박 타이밍과 속도감 있는 전환을 유연하게 주문하십시오.

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

[안전장치 - 판독 불가 규칙]:
- 만약 업로드된 이미지가 축구 게임(FM) 화면이 전혀 아니거나 글자 판독이 불가능하다면 정확히 "UNREADABLE_SCREEN"만 출력하십시오.

[출력 형식 - 순수 JSON]:
반드시 마크다운 백틱(\`\`\`json) 없는 순수 유효한 JSON 형식으로만 응답해야 합니다.
구조:
{
  "coach_speech": "경기 전 사령탑의 라커룸 연설 (2~3문장)",
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
    ]
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
}`;
  }

  // ------------------------------------------------------------
  // 13. 전술 플레이북 생성 실행
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

    setupView.style.display = 'none';
    briefingView.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    briefingLoadingBox.style.display = 'flex';
    briefingContentBox.style.display = 'none';

    const coachName = STATE.selectedCoachKey === 'custom' 
      ? (customCoachNameInput.value.trim() || '사령탑')
      : COACH_DATABASE[STATE.selectedCoachKey].name;

    loadingCoachTitle.textContent = `${coachName} 감독이 전술판과 상대 데이터를 정밀 분석하고 있습니다...`;
    briefingCoachTag.textContent = `사령탑: ${coachName}`;
    briefingTiersTag.textContent = `체급: 공격 ${STATE.squadTiers.attack} / 미드 ${STATE.squadTiers.midfield} / 수비 ${STATE.squadTiers.defense}`;

    try {
      const systemInstruction = buildPlaybookSystemPrompt();
      const parts = [{ text: systemInstruction }];

      if (STATE.slot1Image) {
        const base64Data1 = STATE.slot1Image.split(',')[1];
        parts.push({ text: "[슬롯 1: 내 전술판 (My Tactics 화면)]" });
        parts.push({ inlineData: { mimeType: "image/jpeg", data: base64Data1 } });
      }

      if (STATE.slot2Image) {
        const base64Data2 = STATE.slot2Image.split(',')[1];
        parts.push({ text: "[슬롯 2: 상대 분석 스카우팅 / 라인업 (Opponent 화면)]" });
        parts.push({ inlineData: { mimeType: "image/jpeg", data: base64Data2 } });
      }

      const candidateModels = ['gemini-3.8-flash', 'gemini-2.5-flash', 'gemini-1.5-flash'];
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
        briefingView.style.display = 'none';
        setupView.style.display = 'block';
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
      showToast(`❌ 분석 중 오류가 발생했습니다: ${err.message}`, 5000);
      briefingView.style.display = 'none';
      setupView.style.display = 'block';
    } finally {
      STATE.isAnalyzing = false;
      updateAnalyzeButtonState();
      briefingLoadingBox.style.display = 'none';
    }
  });

  // ------------------------------------------------------------
  // 14. 피치 보드 렌더링 & 글라이딩 애니메이션
  // ------------------------------------------------------------
  function renderPlaybookBriefing(data) {
    briefingContentBox.style.display = 'block';

    const coachName = STATE.selectedCoachKey === 'custom' 
      ? (customCoachNameInput.value.trim() || '사령탑')
      : COACH_DATABASE[STATE.selectedCoachKey].name;

    speechAuthor.textContent = `${coachName} 감독의 경기 전 라커룸 연설:`;
    speechQuote.textContent = `"${data.coach_speech || '오늘 경기는 반드시 우리 철학대로 승리한다.'}"`;

    const pitchData = data.pitch_board || {};
    pitchFormationTitle.textContent = pitchData.formation_title || "포메이션: 4-3-2-1 비대칭 유지 (공격 시 3-2-4-1 변형)";
    pitchFormationReason.textContent = pitchData.formation_reason || "상대 전술의 취약 공간을 공략하기 위해 기본 뼈대를 유지하면서 롤을 미세 조정한 대형입니다.";

    STATE.pitchPlayers = normalizePitchPlayers(pitchData.players);
    STATE.currentPitchPhase = 'attack';
    updatePitchPhaseUI('attack');

    if (data.summary_badges) {
      summaryMatchup.textContent = data.summary_badges.matchup || "상대 취약점 진단 요약";
      summaryPlanA.textContent = data.summary_badges.plana || "플랜 A 인게임 조작 요약";
      summaryScenarios.textContent = data.summary_badges.scenarios || "시나리오별 대처 요약";
      summaryOnePoint.textContent = data.summary_badges.onepoint || "에이스 봉쇄 요약";
    }
  }

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

    const existingNodes = pitchPlayersContainer.querySelectorAll('.player-node');
    if (existingNodes.length === STATE.pitchPlayers.length && existingNodes.length === 11) {
      STATE.pitchPlayers.forEach((player, idx) => {
        const nodeEl = existingNodes[idx];
        const pos = phase === 'attack' ? player.attack_pos : player.defense_pos;
        const actText = phase === 'attack' ? player.attack_action : player.defense_action;

        nodeEl.style.left = `${pos.x}%`;
        nodeEl.style.top = `${pos.y}%`;

        const actPill = nodeEl.querySelector('.player-action-pill');
        if (actPill) {
          actPill.textContent = actText;
          actPill.className = `player-action-pill ${phase === 'attack' ? 'act-attack' : 'act-defense'}`;
        }
      });
      return;
    }

    pitchPlayersContainer.innerHTML = '';
    STATE.pitchPlayers.forEach((player) => {
      const pos = phase === 'attack' ? player.attack_pos : player.defense_pos;
      const actText = phase === 'attack' ? player.attack_action : player.defense_action;

      const node = document.createElement('div');
      node.className = `player-node zone-${player.zone}`;
      node.style.left = `${pos.x}%`;
      node.style.top = `${pos.y}%`;

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

  backToSetupBtn.addEventListener('click', () => {
    briefingView.style.display = 'none';
    setupView.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  bottomBackBtn.addEventListener('click', () => {
    briefingView.style.display = 'none';
    setupView.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ------------------------------------------------------------
  // 15. 모달 팝업 열기
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
      modalBody.innerHTML = details.matchup || data.summary_badges?.matchup || '상세 내용이 없습니다.';
    } else if (type === 'plana') {
      modalIcon.textContent = '📋';
      modalTitle.textContent = '플랜 A 인게임 세부 조작 가이드 (체크리스트)';
      modalBody.innerHTML = details.plana || data.summary_badges?.plana || '상세 내용이 없습니다.';
    } else if (type === 'scenarios') {
      modalIcon.textContent = '🔄';
      modalTitle.textContent = '시나리오별 대처 (2점 리드 잠그기 / 1점 접전 / 열세 역전)';
      modalBody.innerHTML = details.scenarios || data.summary_badges?.scenarios || '상세 내용이 없습니다.';
    } else if (type === 'onepoint') {
      modalIcon.textContent = '💡';
      modalTitle.textContent = '에이스 봉쇄 & 원포인트 조언 (맨마크 및 세트피스 비기)';
      modalBody.innerHTML = details.onepoint || data.summary_badges?.onepoint || '상세 내용이 없습니다.';
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
  // 16. [New!] 1:1 명장 iMessage 메신저 코어 엔진
  // ------------------------------------------------------------
  function loadChatHistory(coachKey) {
    const storageKey = `fm_imessage_chat_${coachKey}`;
    const saved = localStorage.getItem(storageKey);
    STATE.chatHistories[coachKey] = saved ? JSON.parse(saved) : [];
    renderChatFeed(coachKey);
  }

  function saveChatHistory(coachKey) {
    const storageKey = `fm_imessage_chat_${coachKey}`;
    localStorage.setItem(storageKey, JSON.stringify(STATE.chatHistories[coachKey] || []));
  }

  function scrollChatToBottom() {
    setTimeout(() => {
      imessageFeed.scrollTop = imessageFeed.scrollHeight;
    }, 50);
  }

  function renderChatFeed(coachKey) {
    const coach = COACH_DATABASE[coachKey] || COACH_DATABASE['pep'];
    const avatarUrl = coach.avatar;
    const history = STATE.chatHistories[coachKey] || [];

    // 기존 동적 버블 삭제 (헤더 스탬프와 웰컴 버블 유지)
    const existingBubbles = imessageFeed.querySelectorAll('.imessage-row:not(:first-of-type)');
    existingBubbles.forEach(b => b.remove());

    history.forEach(msg => {
      appendMessageBubbleToDOM(msg.role, msg.text, msg.image, msg.time, avatarUrl, false);
    });

    scrollChatToBottom();
  }

  function appendMessageBubbleToDOM(role, text, image, time, avatarUrl, doScroll = true) {
    const row = document.createElement('div');
    row.className = `imessage-row ${role === 'user' ? 'user-row' : 'coach-row'}`;

    let imgHtml = '';
    if (image) {
      imgHtml = `<img src="${image}" alt="첨부 이미지" class="msg-attached-img">`;
    }

    if (role === 'user') {
      row.innerHTML = `
        <div class="imessage-bubble user-bubble">
          ${imgHtml}
          <p>${escapeHtml(text)}</p>
          <span class="bubble-time">${time} · 읽음</span>
        </div>
      `;
    } else {
      row.innerHTML = `
        <div class="imessage-avatar-mini">
          <img src="${avatarUrl || 'https://upload.wikimedia.org/wikipedia/commons/3/37/Pep_Guardiola_2021.jpg'}" alt="감독">
        </div>
        <div class="imessage-bubble coach-bubble">
          ${imgHtml}
          <p>${formatCoachResponseText(text)}</p>
          <span class="bubble-time">${time}</span>
        </div>
      `;
    }

    imessageFeed.appendChild(row);
    if (doScroll) scrollChatToBottom();
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;").replace(/\n/g, '<br>');
  }

  function formatCoachResponseText(str) {
    if (!str) return '';
    // 줄바꿈 보존 및 강조 서식 지원
    return str.replace(/\n/g, '<br>');
  }

  function showTypingIndicator() {
    const row = document.createElement('div');
    row.id = 'imessageTypingIndicator';
    row.className = 'imessage-row coach-row';
    const coach = COACH_DATABASE[STATE.selectedCoachKey] || COACH_DATABASE['pep'];
    row.innerHTML = `
      <div class="imessage-avatar-mini">
        <img src="${coach.avatar}" alt="감독">
      </div>
      <div class="typing-bubble">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>
    `;
    imessageFeed.appendChild(row);
    scrollChatToBottom();
  }

  function hideTypingIndicator() {
    const indicator = document.getElementById('imessageTypingIndicator');
    if (indicator) indicator.remove();
  }

  // 이미지 첨부 핸들러
  function attachImageToMessenger(dataUrl) {
    STATE.imessageAttachedImage = dataUrl;
    imessagePreviewImg.src = dataUrl;
    imessagePreviewCapsule.style.display = 'block';
    showToast('📎 스크린샷이 첨부되었습니다!');
  }

  imessagePreviewRemoveBtn.addEventListener('click', () => {
    STATE.imessageAttachedImage = null;
    imessagePreviewImg.src = '';
    imessagePreviewCapsule.style.display = 'none';
  });

  imessageFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (evt) => attachImageToMessenger(evt.target.result);
      reader.readAsDataURL(file);
    }
  });

  // 메시지 전송 로직
  async function sendMessengerMessage(forcedText = null) {
    const text = (forcedText || imessageInput.value).trim();
    const image = STATE.imessageAttachedImage;

    if (!text && !image) return;

    const apiKey = apiKeyInput.value.trim();
    if (!apiKey) {
      showToast('상단의 [Gemini API 키] 입력창에 무료 API 키를 먼저 넣어주세요!');
      apiKeyInput.focus();
      return;
    }

    if (STATE.imessageSending) return;
    STATE.imessageSending = true;

    const coachKey = STATE.selectedCoachKey;
    const coach = COACH_DATABASE[coachKey] || COACH_DATABASE['pep'];
    const timeStr = getFormattedTime();

    // 1. 유저 말풍선 화면 추가 & 히스토리 기록
    appendMessageBubbleToDOM('user', text || '(스크린샷 첨부)', image, timeStr, null, true);
    if (!STATE.chatHistories[coachKey]) STATE.chatHistories[coachKey] = [];
    STATE.chatHistories[coachKey].push({
      role: 'user',
      text: text || '(스크린샷 첨부)',
      image: image || null,
      time: timeStr
    });
    saveChatHistory(coachKey);

    // 입력창 및 첨부 초기화
    imessageInput.value = '';
    STATE.imessageAttachedImage = null;
    imessagePreviewCapsule.style.display = 'none';
    showTypingIndicator();

    try {
      // 2. 메신저 전용 특수 시스템 프롬프트 구축
      const messengerSystemPrompt = `당신은 세계 최고 명장 [${coach.name}] 감독 본인입니다.
당신은 지금 당신의 애제자이자 후배인 FM 축구 감독과 개인 비밀 메신저(애플 iMessage)로 1:1 대화를 나누고 있습니다.

[절대적 화법 원칙 (AI 티 100% 박멸)]:
- 절대로 '안녕하세요 AI입니다', '어시스턴트입니다' 같은 영혼 없는 안내 멘트를 하지 마십시오.
- 실제 스마트폰으로 카리스마 넘치게 개인 문자 메시지를 보내듯 자연스럽고 인간적이며 굵직한 말투로 답변하십시오.
- 당신의 고유 말투: "${coach.voice}"
- 당신의 실제 축구 철학: "${coach.tacticalBias}"

[★ 밈 / 특정 단어 앵무새 반복 절대 금지 (최우선 주의!) ★]:
- "크로스/롱볼 난사는 자멸이다", "게겐프레싱만이 답이다", "텐백만이 진리다" 같은 1차원적인 밈이나 극단적인 문구를 매 답변마다 앵무새처럼 되풀이하지 마십시오.
- 당신은 축구계 역사상 최고의 명장입니다. 특정 플레이(크로스, 롱패스 등)를 덮어놓고 무조건 비난하지 마십시오. 축구의 모든 전술은 상대 수비의 형태와 우리 선수단의 체질에 맞춰 유연하게 쓰이는 법입니다.
- 유저가 묻는 질문의 본질(이적 자금 배분, 주급 체계 정리, 방출 대상 선정, 포지션 뎁스 보강, 유망주 육성, 경기 전술 고민 등)에 집중하여, 현실적이고 다각적인 실전 솔루션을 제공하십시오.
- 당신의 철학은 '극단적인 억지 고집'이 아니라 '문제를 꿰뚫어 보고 해결책을 찾아주는 노련한 혜안'으로 세련되고 자연스럽게 묻어나와야 합니다.

[★ 비축구/잡담 칼차단 팩트폭격 원칙 (매우 중요!) ★]:
- 유저가 저녁 메뉴, 주식, 일상 잡담, 코딩, 숙제 등 축구(FM 게임, 구단 운영, 전술, 이적시장)와 무관한 엉뚱한 질문을 하면, 절대로 친절하게 대답하거나 사과하지 마십시오.
- 당신의 성격대로 차갑고 날카롭게 일침을 가하며 칼차단하십시오:
  "${coach.spamBlock}"

[★ 역질문 티키타카 원칙 ★]:
- 유저가 보낸 스크린샷이나 질문에 정보(예산 규모, 선수 나이, 주급, 주전/후보 여부 등)가 부족하다면, 혼자 소설을 쓰지 말고 실제 명장처럼 "그 선수의 주급이 얼마인가?", "현재 2군에 백업 유망주는 없는가?" 하고 날카로운 역질문을 1~2개 던져 유저에게 정보를 이끌어내십시오.

[응답 스타일]:
- 문자 메시지답게 너무 장황하지 않게, 2~4문장 내외로 핵심을 찔러주십시오.`;

      const parts = [{ text: messengerSystemPrompt }];

      // 최근 대화 맥락 6개까지 포함
      const recentHistory = STATE.chatHistories[coachKey].slice(-6);
      recentHistory.forEach(h => {
        if (h.role === 'user') {
          parts.push({ text: `[유저의 메시지]: ${h.text}` });
          if (h.image) {
            const base64Data = h.image.split(',')[1];
            parts.push({ inlineData: { mimeType: "image/jpeg", data: base64Data } });
          }
        } else {
          parts.push({ text: `[${coach.name}의 이전 답장]: ${h.text}` });
        }
      });

      const candidateModels = ['gemini-3.8-flash', 'gemini-2.5-flash', 'gemini-1.5-flash'];
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

      hideTypingIndicator();

      if (!response) {
        throw new Error(`답장을 받아오지 못했습니다 (${lastErrText})`);
      }

      const resJson = await response.json();
      const replyText = resJson?.candidates?.[0]?.content?.parts?.[0]?.text || '...무슨 말인지 다시 한번 명확하게 정리해서 보내게.';

      const coachTimeStr = getFormattedTime();
      appendMessageBubbleToDOM('coach', replyText, null, coachTimeStr, coach.avatar, true);

      STATE.chatHistories[coachKey].push({
        role: 'coach',
        text: replyText,
        image: null,
        time: coachTimeStr
      });
      saveChatHistory(coachKey);

    } catch (err) {
      hideTypingIndicator();
      console.error("Messenger error:", err);
      showToast(`문자 전송 실패: ${err.message}`, 4000);
    } finally {
      STATE.imessageSending = false;
    }
  }

  imessageSendBtn.addEventListener('click', () => sendMessengerMessage());

  imessageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessengerMessage();
    }
  });

  // 추천 칩 클릭 시 즉시 질문 전송
  chipButtons.forEach(chip => {
    chip.addEventListener('click', () => {
      const q = chip.dataset.query;
      if (q) {
        sendMessengerMessage(q);
      }
    });
  });

  // 대화 비우기 버튼
  clearChatBtn.addEventListener('click', () => {
    const coachKey = STATE.selectedCoachKey;
    const coach = COACH_DATABASE[coachKey] || COACH_DATABASE['pep'];
    if (confirm(`${coach.name} 감독과의 대화 내용을 모두 초기화할까요?`)) {
      STATE.chatHistories[coachKey] = [];
      saveChatHistory(coachKey);
      renderChatFeed(coachKey);
      showToast('대화 내용이 초기화되었습니다.');
    }
  });

  // ------------------------------------------------------------
  // 17. 전술 텍스트 복사 & 오류 제보
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
🎯 포메이션: ${d.pitch_board?.formation_title || '원본 유지'}
💡 사유: ${d.pitch_board?.formation_reason || ''}

[1. 상성 진단]
${d.summary_badges?.matchup || ''}

[2. 플랜 A 인게임 조작법]
${d.summary_badges?.plana || ''}

[3. 시나리오별 대처]
${d.summary_badges?.scenarios || ''}

[4. 에이스 봉쇄 & 원포인트]
${d.summary_badges?.onepoint || ''}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

    navigator.clipboard.writeText(summaryText).then(() => {
      showToast('📋 전술 요약본이 클립보드에 깔끔하게 복사되었습니다!');
    }).catch(() => {
      showToast('복사에 실패했습니다.');
    });
  });

  errorReportBtn.addEventListener('click', () => {
    const reportData = {
      timestamp: new Date().toISOString(),
      coach: STATE.selectedCoachKey,
      customCoach: STATE.customCoachName,
      tiers: STATE.squadTiers,
      hasSlot1: !!STATE.slot1Image,
      hasSlot2: !!STATE.slot2Image,
      lastError: "최근 기록된 에러 없음"
    };

    const textToCopy = `[FM27 플레이북 오류 제보 로그]\n${JSON.stringify(reportData, null, 2)}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      showToast('📋 시스템 디버그 로그가 클립보드에 복사되었습니다! 개발자에게 전달해 주세요.');
    }).catch(() => {
      showToast('로그 복사에 실패했습니다.');
    });
  });

  // 초기 펩 프로필 및 메신저 연동 세팅
  updateCoachProfile('pep');

});
