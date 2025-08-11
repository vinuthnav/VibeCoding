// Minimalist CyberGuard Enhancements
// - Settings (sound, animations)
// - Name onboarding and greeting
// - Toast notifications
// - Progress persistence (points, unlocked levels)
// - Subtle interaction improvements

// Existing game state
let gameState = {
  currentLevel: 1,
  currentQuestion: 0,
  totalPoints: 0,
  levelPoints: 0,
  correctAnswers: 0,
  totalQuestions: 0,
  selectedAnswer: null,
  hintUsed: false,
  levelQuestions: []
};

// Settings and progress
let settings = {
  sound: true,
  animations: true
};

let progress = {
  highestLevelUnlocked: 1,
  totalPoints: 0,
  name: 'Agent'
};

// Quiz Questions Database - from previous version (kept)
const quizDatabase = {
  level1: [
    { threat: "Phishing Attack", question: "You receive an email from your 'bank' asking you to click a link to update your password. The email looks legitimate but the sender's address is 'security@bank-update.net'. What should you do?", options: ["Click the link immediately to secure your account","Forward the email to friends to warn them","Delete the email and contact your bank directly through official channels","Reply to the email asking if it's legitimate"], correct: 2, hint: "Always verify through official channels. Legitimate banks never ask for sensitive information via email.", explanation: "This is a classic phishing attempt. Banks never request sensitive information through email links." },
    { threat: "Weak Password", question: "Which of these passwords is the most secure for your online accounts?", options: ["password123","MyDog'sName2024!","Tr7$mK9#vL2&qN8*","123456789"], correct: 2, hint: "The strongest passwords are long, random, and include a mix of characters, numbers, and symbols.", explanation: "Complex passwords with random characters, numbers, and symbols are much harder to crack." },
    { threat: "Social Engineering", question: "A caller claims to be from IT support and asks for your login credentials to 'fix a security issue'. What should you do?", options: ["Provide the credentials to help resolve the issue quickly","Ask for their employee ID and verify through your company's official IT department","Hang up immediately without verification","Give them a fake password to test if they're legitimate"], correct: 1, hint: "Always verify the identity of anyone requesting sensitive information through official channels.", explanation: "Social engineers often impersonate authority figures. Always verify through official channels." },
    { threat: "USB Security", question: "You find a USB drive in the parking lot labeled 'Salary Information 2024'. What should you do?", options: ["Plug it into your work computer to see what's on it","Take it to IT security without plugging it in anywhere","Plug it into your personal laptop at home","Share it with colleagues to find the owner"], correct: 1, hint: "Unknown USB devices can contain malware that activates when plugged in.", explanation: "Unknown USB devices are a common attack vector for malware injection." },
    { threat: "Wi-Fi Security", question: "You're at a coffee shop and see free Wi-Fi networks: 'CoffeeShop_Guest', 'Free_WiFi_Here', and 'Coffee-Guest-Secure'. Which is safest to use?", options: ["Free_WiFi_Here - it's clearly marked as free","Ask the coffee shop staff which network is theirs","Coffee-Guest-Secure - it has 'secure' in the name","Connect to all of them to see which works best"], correct: 1, hint: "Always verify the legitimate network name with the establishment's staff.", explanation: "Criminals often set up fake Wi-Fi hotspots with convincing names to steal data." }
  ],
  level2: [
    { threat: "Ransomware", question: "Your computer screen shows a message demanding payment to decrypt your files, claiming all your data is encrypted. What's the best immediate response?", options: ["Pay the ransom immediately to get your files back","Disconnect from the internet and contact IT security immediately","Try to remove the malware yourself using antivirus software","Restart the computer to see if the problem goes away"], correct: 1, hint: "Immediate isolation prevents further spread, and professional help is essential for proper response.", explanation: "Ransomware can spread through networks. Immediate isolation and professional response are crucial." },
    { threat: "Business Email Compromise", question: "You receive an urgent email from your CEO asking you to wire $50,000 to a vendor for an 'urgent deal'. The email address looks correct but something feels off. What should you do?", options: ["Process the transfer immediately since it's from the CEO","Call the CEO directly on their known phone number to verify the request","Forward the email to your manager for approval","Reply to the email asking for more details"], correct: 1, hint: "CEO fraud is common. Always verify large financial requests through a separate communication channel.", explanation: "Business Email Compromise often targets financial transfers. Always verify through separate channels." },
    { threat: "Zero-Day Exploit", question: "Your security team alerts you about a zero-day vulnerability in software your company uses. No patch is available yet. What's the most appropriate immediate action?", options: ["Continue using the software normally since there's no patch","Implement compensating controls and limit exposure where possible","Immediately uninstall the software from all systems","Wait for the vendor to release more information"], correct: 1, hint: "When patches aren't available, focus on reducing exposure and implementing additional security layers.", explanation: "Zero-day vulnerabilities require immediate risk mitigation through compensating controls." },
    { threat: "SQL Injection", question: "You're reviewing a web application and notice user input is directly inserted into database queries without validation. What type of attack is this most vulnerable to?", options: ["Cross-site scripting (XSS)","SQL injection","Denial of service","Man-in-the-middle"], correct: 1, hint: "When user input goes directly into database queries, attackers can manipulate the database commands.", explanation: "SQL injection occurs when untrusted input is inserted directly into SQL queries." },
    { threat: "Advanced Persistent Threat", question: "Your network monitoring shows unusual outbound traffic to foreign IP addresses during off-hours, but no obvious malware is detected. What type of threat might this indicate?", options: ["False positive from monitoring software","Advanced Persistent Threat (APT) with sophisticated evasion","Employees working overtime","Automatic software updates"], correct: 1, hint: "APTs use sophisticated techniques to remain undetected while slowly exfiltrating data.", explanation: "APTs often exhibit subtle signs like unusual network traffic patterns and data exfiltration." },
    { threat: "Deepfake Technology", question: "You receive a video call from your company's CFO asking you to authorize an emergency wire transfer. The video quality is slightly poor but the voice sounds right. What should you do?", options: ["Authorize the transfer since you can see and hear the CFO","Ask specific questions only the real CFO would know and verify through separate means","Record the conversation for evidence","Request the authorization in writing via email"], correct: 1, hint: "Deepfake technology can create convincing fake videos. Use knowledge-based verification.", explanation: "Deepfake technology is increasingly sophisticated. Always verify through multiple channels." },
    { threat: "Supply Chain Attack", question: "A trusted software vendor announces that their latest update contained malicious code that went undetected for months. What type of attack is this?", options: ["Insider threat","Supply chain attack","Zero-day exploit","Social engineering"], correct: 1, hint: "When attackers compromise software suppliers to reach the suppliers' customers, it's a supply chain attack.", explanation: "Supply chain attacks target software/hardware suppliers to reach their customers indirectly." }
  ],
  level3: [
    { threat: "Nation-State Attack", question: "Your organization detects sophisticated malware with custom encryption, multiple zero-days, and techniques that match known nation-state groups. The attack has been persistent for months. What's your priority response?", options: ["Immediately wipe all affected systems","Coordinate with national cybersecurity agencies and conduct thorough forensic analysis","Keep the attack secret to avoid reputation damage","Focus only on patching the vulnerabilities"], correct: 1, hint: "Nation-state attacks require coordination with authorities and comprehensive forensic investigation.", explanation: "Nation-state attacks are sophisticated and require coordination with cybersecurity agencies." },
    { threat: "AI-Powered Attacks", question: "Attackers are using AI to automatically adapt their phishing emails based on your employees' responses and social media profiles. How should you adapt your security awareness training?", options: ["Focus on traditional phishing indicators only","Implement dynamic, AI-powered training that adapts to current threat patterns","Stop all external email communication","Rely solely on technical email filtering solutions"], correct: 1, hint: "AI threats require AI-enhanced defenses and adaptive training programs.", explanation: "AI-powered attacks require sophisticated, adaptive training and defense mechanisms." },
    { threat: "Quantum Computing Threat", question: "Your organization needs to prepare for the quantum computing threat to current encryption. What should be your long-term strategy?", options: ["Wait until quantum computers become widely available","Begin transitioning to post-quantum cryptography standards","Increase the key length of current encryption methods","Focus only on physical security measures"], correct: 1, hint: "Quantum computers will break current encryption. Post-quantum cryptography is being developed as a solution.", explanation: "Quantum computers will break current encryption, requiring transition to quantum-resistant algorithms." },
    { threat: "IoT Botnet", question: "Your security team discovers that IoT devices in your building are participating in a massive botnet without affecting their normal operations. What's the most critical concern?", options: ["The devices might stop working properly","Your organization could face legal liability for participating in attacks on others","The botnet might slow down your internet connection","The devices might need firmware updates"], correct: 1, hint: "Participating in botnets makes your organization complicit in attacks against others, creating legal risks.", explanation: "IoT botnets use your resources to attack others, creating significant legal and ethical liabilities." },
    { threat: "Fileless Malware", question: "Your advanced threat detection identifies malicious activity, but no malware files are found on disk. The attack uses legitimate system tools and operates entirely in memory. How should you investigate?", options: ["Focus only on file-based antivirus scanning","Analyze memory dumps, process behavior, and network communications","Ignore the alert since no files were found","Only check for unauthorized software installations"], correct: 1, hint: "Fileless malware operates in memory using legitimate tools. Behavioral analysis is key.", explanation: "Fileless malware requires behavioral analysis and memory forensics for detection and investigation." },
    { threat: "Living off the Land", question: "Attackers in your network are exclusively using legitimate system administration tools like PowerShell, WMI, and PsExec for malicious activities. What detection strategy is most effective?", options: ["Block all administrative tools completely","Implement behavioral analytics to detect unusual usage patterns of legitimate tools","Focus on signature-based detection only","Monitor only file creation and deletion"], correct: 1, hint: "When attackers use legitimate tools, you must focus on how they're being used rather than what tools.", explanation: "Living off the Land attacks require behavioral analysis to distinguish malicious from legitimate tool usage." },
    { threat: "Cloud Security Breach", question: "Your organization's cloud storage misconfiguration exposed customer data for an unknown period. Forensic analysis is difficult due to limited cloud logs. What's your immediate priority?", options: ["Keep the breach secret until investigation is complete","Immediately notify affected customers and regulatory authorities as required by law","Wait for the cloud provider to conduct their own investigation","Focus only on fixing the misconfiguration"], correct: 1, hint: "Data breach notification laws require prompt disclosure, and transparency helps maintain trust.", explanation: "Data breach laws require timely notification, and transparency is crucial for maintaining stakeholder trust." },
    { threat: "Insider Threat Detection", question: "An employee with privileged access has been accessing files outside their normal job responsibilities, but hasn't yet exfiltrated data. Their access is technically authorized. How should you proceed?", options: ["Immediately terminate their access and employment","Conduct discrete investigation while monitoring their activities closely","Ignore the behavior since access is authorized","Confront the employee directly about their activities"], correct: 1, hint: "Insider threats require careful investigation to understand intent while preventing data loss.", explanation: "Suspected insider threats require careful investigation and monitoring to determine intent and prevent damage." },
    { threat: "Cryptocurrency Mining Malware", question: "Your incident response team discovers cryptocurrency mining malware that has been running on your servers for months, causing performance degradation but no obvious data theft. What's the most concerning aspect?", options: ["The electricity costs from mining operations","The malware demonstrates long-term persistent access that could be used for more serious attacks","The performance impact on business operations","The potential for hardware damage from overheating"], correct: 1, hint: "The real threat isn't the mining itself, but the demonstrated ability for long-term persistent access.", explanation: "Cryptocurrency mining malware indicates persistent access that could be leveraged for more serious attacks." },
    { threat: "API Security Breach", question: "Your organization's API has been compromised through an authentication bypass vulnerability. The API provides access to sensitive customer data. What should be your first technical response?", options: ["Patch the vulnerability while keeping the API online","Immediately disable the API until the vulnerability can be patched and tested","Only monitor API access more closely","Change the API endpoint URLs"], correct: 1, hint: "When APIs with sensitive data are compromised, immediate shutdown prevents further data exposure.", explanation: "Compromised APIs with sensitive data access should be immediately secured to prevent ongoing data exposure." }
  ]
};

const pointsConfig = { level1: 10, level2: 15, level3: 20 };

// Utilities
function $(id) { return document.getElementById(id); }
function qs(sel) { return document.querySelector(sel); }
function qsa(sel) { return Array.from(document.querySelectorAll(sel)); }

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Storage
const SETTINGS_KEY = 'cyberguard_settings';
const PROGRESS_KEY = 'cyberguard_progress';

function loadSettings() {
  try { const s = JSON.parse(localStorage.getItem(SETTINGS_KEY)); if (s) settings = { ...settings, ...s }; } catch {}
  $('soundCheckbox').checked = !!settings.sound;
  $('animCheckbox').checked = !!settings.animations;
  $('soundToggle').setAttribute('aria-pressed', String(!!settings.sound));
  $('animToggle').setAttribute('aria-pressed', String(!!settings.animations));
}

function saveSettings() { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); }

function loadProgress() {
  try { const p = JSON.parse(localStorage.getItem(PROGRESS_KEY)); if (p) progress = { ...progress, ...p }; } catch {}
  // reflect UI
  $('totalPoints').textContent = progress.totalPoints || 0;
  $('greetingText').textContent = `Welcome, ${progress.name || 'Agent'}`;
  updateLocks();
}

function saveProgress() { localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress)); }

// Settings toggles
function toggleSound(fromCheckbox) {
  if (fromCheckbox) {
    settings.sound = $('soundCheckbox').checked;
  } else {
    settings.sound = !settings.sound;
    $('soundCheckbox').checked = settings.sound;
  }
  $('soundToggle').setAttribute('aria-pressed', String(settings.sound));
  $('soundToggle').textContent = settings.sound ? '🔊' : '🔇';
  saveSettings();
}

function toggleAnimations(fromCheckbox) {
  if (fromCheckbox) {
    settings.animations = $('animCheckbox').checked;
  } else {
    settings.animations = !settings.animations;
    $('animCheckbox').checked = settings.animations;
  }
  $('animToggle').setAttribute('aria-pressed', String(settings.animations));
  saveSettings();
}

function openSettings() { $('settingsModal').classList.add('show'); }
function closeSettings() { $('settingsModal').classList.remove('show'); }

// Toasts
function showToast(message) {
  const wrap = $('toastContainer');
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = message;
  wrap.appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; el.style.transform = 'translateY(6px)'; }, 2000);
  setTimeout(() => { wrap.removeChild(el); }, 2400);
}

// Simple audio feedback
let audioCtx;
function playTone(freq = 520, dur = 0.08, type = 'sine') {
  if (!settings.sound) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = type; o.frequency.value = freq;
    g.gain.value = 0.04;
    o.connect(g); g.connect(audioCtx.destination);
    o.start();
    setTimeout(() => { o.stop(); }, Math.max(10, dur * 1000));
  } catch {}
}

// Confetti (minimal - primary + white)
function confettiBurst() {
  if (!settings.animations) return;
  const N = 16;
  for (let i = 0; i < N; i++) {
    const s = document.createElement('span');
    s.textContent = i % 2 ? '▮' : '▴';
    s.style.position = 'fixed';
    s.style.left = (window.innerWidth / 2) + 'px';
    s.style.top = '140px';
    s.style.fontSize = (10 + Math.random() * 10) + 'px';
    s.style.color = Math.random() > 0.5 ? 'white' : 'var(--primary)';
    s.style.pointerEvents = 'none';
    s.style.zIndex = 9999;
    document.body.appendChild(s);
    let x = 0, y = 0; const dx = (Math.random() - 0.5) * 6; const dy = - (2 + Math.random() * 3);
    const id = setInterval(() => {
      x += dx; y += dy; dy += 0.15;
      s.style.transform = `translate(${x * 8}px, ${y * 8}px)`;
      s.style.opacity = String(1 - Math.min(1, (y + 20) / 60));
      if (y > 16) { clearInterval(id); document.body.removeChild(s); }
    }, 16);
  }
}

// Threat stats update (kept minimal)
function updateThreatStats() {
  const statAttacks = $('statAttacks');
  const statDamage = $('statDamage');
  const statHuman = $('statHuman');
  if (statAttacks && statDamage && statHuman) {
    statAttacks.textContent = (4.6 + Math.random() * 0.5).toFixed(1) + 'M';
    statDamage.textContent = '$' + (5.9 + Math.random() * 0.5).toFixed(1) + 'T';
    statHuman.textContent = (94 + Math.floor(Math.random() * 4)) + '%';
  }
}

// Init background micro effects (non-intrusive)
function addBackgroundEffects() {
  if (!settings.animations) return;
  // Minimal: skip heavy effects for clean look
}

// Onboarding
function handleOnboard(e) {
  e.preventDefault();
  const name = ($('playerName').value || '').trim() || 'Agent';
  progress.name = name;
  saveProgress();
  $('greetingText').textContent = `Welcome, ${name}`;
  startGame();
  return false;
}

function startGame() {
  $('welcomeScreen').style.display = 'none';
  $('levelSelection').style.display = 'block';
  updateLocks();
}

function exitToLevels() {
  $('quizContainer').style.display = 'none';
  $('resultsScreen').style.display = 'none';
  $('levelSelection').style.display = 'block';
}

function updateLocks() {
  const lock2 = $('lock2');
  const lock3 = $('lock3');
  const lvl2 = document.querySelector('[data-level="2"]');
  const lvl3 = document.querySelector('[data-level="3"]');
  if (progress.highestLevelUnlocked >= 2) { lock2.style.display = 'none'; lvl2.removeAttribute('aria-disabled'); }
  else { lock2.style.display = 'block'; lvl2.setAttribute('aria-disabled', 'true'); }
  if (progress.highestLevelUnlocked >= 3) { lock3.style.display = 'none'; lvl3.removeAttribute('aria-disabled'); }
  else { lock3.style.display = 'block'; lvl3.setAttribute('aria-disabled', 'true'); }
}

// Start specific level
function startLevel(level) {
  if (level > progress.highestLevelUnlocked) {
    showToast('Unlock previous levels first');
    playTone(300, 0.07, 'square');
    return;
  }
  gameState.currentLevel = level;
  gameState.currentQuestion = 0;
  gameState.levelPoints = 0;
  gameState.correctAnswers = 0;
  gameState.levelQuestions = shuffleArray([...quizDatabase[`level${level}`]]);
  gameState.totalQuestions = gameState.levelQuestions.length;

  $('levelSelection').style.display = 'none';
  $('quizContainer').style.display = 'block';

  updateQuizHeader();
  loadQuestion();
}

function updateQuizHeader() {
  $('currentLevel').textContent = `Level ${gameState.currentLevel}`;
  $('currentQuestion').textContent = gameState.currentQuestion + 1;
  $('totalQuestions').textContent = gameState.totalQuestions;
  $('progressFill').style.width = `${(gameState.currentQuestion / gameState.totalQuestions) * 100}%`;
}

function loadQuestion() {
  const question = gameState.levelQuestions[gameState.currentQuestion];
  gameState.selectedAnswer = null;
  gameState.hintUsed = false;

  $('threatType').textContent = question.threat;
  $('questionText').textContent = question.question;
  $('hintSection').style.display = 'none';
  $('hintBtn').style.display = 'inline-flex';
  $('submitBtn').disabled = true;

  const container = $('optionsContainer');
  container.innerHTML = '';
  question.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.type = 'button';
    btn.textContent = opt;
    btn.onclick = () => selectOption(i);
    container.appendChild(btn);
  });

  updateQuizHeader();
}

function selectOption(index) {
  qsa('.option-btn').forEach(b => b.classList.remove('selected'));
  qsa('.option-btn')[index].classList.add('selected');
  gameState.selectedAnswer = index;
  $('submitBtn').disabled = false;
  playTone(520, 0.05, 'sine');
}

function showHint() {
  if (!gameState.hintUsed) {
    const question = gameState.levelQuestions[gameState.currentQuestion];
    $('hintText').textContent = question.hint;
    $('hintSection').style.display = 'flex';
    $('hintBtn').style.display = 'none';
    gameState.hintUsed = true;
    showToast('Hint used (-30% points)');
  }
}

function submitAnswer() {
  if (gameState.selectedAnswer === null) return;

  const question = gameState.levelQuestions[gameState.currentQuestion];
  const isCorrect = gameState.selectedAnswer === question.correct;

  const options = qsa('.option-btn');
  options[question.correct].classList.add('correct');
  if (!isCorrect) options[gameState.selectedAnswer].classList.add('incorrect');
  options.forEach(b => b.disabled = true);
  $('submitBtn').disabled = true;

  let points = 0;
  if (isCorrect) {
    points = pointsConfig[`level${gameState.currentLevel}`];
    if (gameState.hintUsed) points = Math.floor(points * 0.7);
    gameState.correctAnswers++;
    gameState.levelPoints += points;
    gameState.totalPoints += points;
    progress.totalPoints += points;
    $('totalPoints').textContent = progress.totalPoints;
    saveProgress();
    showToast(`+${points} points`);
    playTone(760, 0.09, 'triangle');
  } else {
    showToast('Review the explanation and try similar questions carefully');
    playTone(260, 0.09, 'sawtooth');
  }

  showFeedback(isCorrect, points, question.explanation);

  setTimeout(() => {
    gameState.currentQuestion++;
    if (gameState.currentQuestion < gameState.totalQuestions) {
      loadQuestion();
    } else {
      showResults();
    }
  }, 2200);
}

function showFeedback(isCorrect, points, explanation) {
  const modal = $('feedbackModal');
  const icon = $('feedbackIcon');
  const title = $('feedbackTitle');
  const text = $('feedbackText');
  const pointsEarned = $('pointsEarned');

  if (isCorrect) {
    icon.textContent = '✅';
    title.textContent = 'Correct';
    title.style.color = 'var(--primary)';
    text.textContent = explanation;
    pointsEarned.textContent = `+${points} Points`;
    pointsEarned.style.display = 'inline-block';
  } else {
    icon.textContent = '❌';
    title.textContent = 'Incorrect';
    title.style.color = 'var(--error)';
    text.textContent = explanation;
    pointsEarned.style.display = 'none';
  }

  modal.classList.add('show');
  setTimeout(() => modal.classList.remove('show'), 1800);
}

function showResults() {
  $('quizContainer').style.display = 'none';
  $('resultsScreen').style.display = 'block';

  const accuracy = Math.round((gameState.correctAnswers / gameState.totalQuestions) * 100);
  $('levelPoints').textContent = gameState.levelPoints;
  $('finalPoints').textContent = progress.totalPoints;
  $('accuracy').textContent = `${accuracy}%`;

  const resultTitle = $('resultTitle');
  const resultAnimation = $('resultAnimation');
  if (accuracy >= 90) { resultTitle.textContent = 'Cyber Security Expert'; resultAnimation.textContent = '🏆'; }
  else if (accuracy >= 70) { resultTitle.textContent = 'Well Done'; resultAnimation.textContent = '🥈'; }
  else if (accuracy >= 50) { resultTitle.textContent = 'Good Effort'; resultAnimation.textContent = '🥉'; }
  else { resultTitle.textContent = 'Keep Learning'; resultAnimation.textContent = '📚'; }

  if (accuracy >= 60 && progress.highestLevelUnlocked < Math.min(3, gameState.currentLevel + 1)) {
    progress.highestLevelUnlocked = Math.min(3, gameState.currentLevel + 1);
    saveProgress();
    showToast('Next level unlocked');
    confettiBurst();
  }

  const nextLevelBtn = $('nextLevelBtn');
  if (gameState.currentLevel < 3 && accuracy >= 60) {
    nextLevelBtn.style.display = 'inline-flex';
    nextLevelBtn.textContent = `Next Level (${gameState.currentLevel + 1})`;
  } else {
    nextLevelBtn.style.display = 'none';
  }
}

function nextLevel() { startLevel(gameState.currentLevel + 1); }

function restartGame() {
  gameState = { currentLevel: 1, currentQuestion: 0, totalPoints: 0, levelPoints: 0, correctAnswers: 0, totalQuestions: 0, selectedAnswer: null, hintUsed: false, levelQuestions: [] };
  $('resultsScreen').style.display = 'none';
  $('welcomeScreen').style.display = 'block';
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if ($('quizContainer').style.display !== 'none') {
    if (e.key >= '1' && e.key <= '4') {
      const idx = parseInt(e.key) - 1; const opts = qsa('.option-btn'); if (opts[idx] && !opts[idx].disabled) selectOption(idx);
    }
    if (e.key === 'Enter' && !$('submitBtn').disabled) submitAnswer();
    if (e.key.toLowerCase() === 'h' && !$('hintBtn').hidden && $('hintBtn').style.display !== 'none') showHint();
  }
});

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  // Load settings and progress
  loadSettings();
  loadProgress();
  updateThreatStats();
  setInterval(updateThreatStats, 10000);

  // If name exists, prefill and go to levels
  if (progress.name && progress.name !== 'Agent') {
    $('playerName').value = progress.name;
    $('greetingText').textContent = `Welcome, ${progress.name}`;
  }
}); 