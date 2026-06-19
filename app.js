'use strict';

// ===== SUPABASE CONFIG =====
const SUPABASE_URL = 'https://flnzycipcdqtwcyujzqe.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsbnp5Y2lwY2RxdHdjeXVqenFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2MjA5MzcsImV4cCI6MjA5NzE5NjkzN30.plqw_CtlaJmChDlnkTfHN9MUPVn0IK7Ty_WfujM3ICo'; 

// Inicializa o cliente do Supabase diretamente no objeto window
window.supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ===== EXERCISES DATA =====
const EXERCISES = [
  {
    id: 'd1', name: 'Guerreiro das Flexões', icon: '💪',
    base: 12, max: 40, sets: 2, unit: 'flexões', type: 'reps', cat: 'força',
    muscles: ['Peito', 'Tríceps', 'Ombros'], pose: 'pushup',
    mColor: '#ef4444', xp: 65, diff: 'Fácil',
    steps: ['Deite de bruços com as mãos na largura dos ombros','Mantenha o corpo reto como uma prancha','Desça o peito até quase tocar o chão','Empurre com força para subir','Respire fundo em cada repetição']
  },
  {
    id: 'd2', name: 'Pernas de Aço', icon: '🦵',
    base: 15, max: 50, sets: 2, unit: 'agachamentos', type: 'reps', cat: 'força',
    muscles: ['Quadríceps', 'Glúteos', 'Panturrilha'], pose: 'squat',
    mColor: '#ef4444', xp: 60, diff: 'Fácil',
    steps: ['Fique em pé com os pés na largura dos ombros','Aponte os pés levemente para fora','Desça como se fosse sentar em uma cadeira','Mantenha os joelhos alinhados com os pés','Suba empurrando o chão com os calcanhares']
  },
  {
    id: 'd3', name: 'Núcleo de Ferro', icon: '🔥',
    base: 20, max: 90, sets: 2, unit: 'segundos', type: 'timer', cat: 'core',
    muscles: ['Core', 'Abdômen', 'Lombar'], pose: 'plank',
    mColor: '#f59e0b', xp: 70, diff: 'Médio',
    steps: ['Apoie nos antebraços e pontas dos pés','Mantenha o corpo em linha reta da cabeça ao calcanhar','Contraia o abdômen com força','Não deixe o quadril subir ou descer','Respire normalmente e mantenha a posição']
  },
  {
    id: 'd4', name: 'Coração Forte', icon: '⚡',
    base: 20, max: 60, sets: 2, unit: 'polichinelos', type: 'reps', cat: 'cardio',
    muscles: ['Corpo todo', 'Cardio'], pose: 'jumpingjack',
    mColor: '#00aaff', xp: 60, diff: 'Fácil',
    steps: ['Fique em pé com os pés juntos e braços ao lado','Pule abrindo as pernas e levantando os braços','Palmas se encontram acima da cabeça','Volte à posição inicial pulando','Mantenha um ritmo constante e controlado']
  },
  {
    id: 'd5', name: 'Abdômen de Guerreiro', icon: '🎯',
    base: 15, max: 50, sets: 2, unit: 'abdominais', type: 'reps', cat: 'core',
    muscles: ['Abdômen', 'Core'], pose: 'crunch',
    mColor: '#f59e0b', xp: 60, diff: 'Fácil',
    steps: ['Deite de costas com os joelhos dobrados','Mãos atrás da cabeça sem puxar o pescoço','Contraia o abdômen para levantar os ombros','Não suba completamente — foque no core','Desça devagar controlando o movimento']
  },
  {
    id: 'd6', name: 'Afundo Poderoso', icon: '🦶',
    base: 10, max: 30, sets: 2, unit: 'afundos (cada perna)', type: 'reps', cat: 'força',
    muscles: ['Quadríceps', 'Glúteos', 'Isquiotibial'], pose: 'lunge',
    mColor: '#ef4444', xp: 65, diff: 'Médio',
    steps: ['Fique em pé com os pés juntos','Dê um passo largo para frente','Desça o joelho traseiro em direção ao chão','Mantenha o joelho da frente acima do tornozelo','Suba e alterne as pernas']
  },
  {
    id: 'd7', name: 'Elevação de Quadril', icon: '🍑',
    base: 15, max: 40, sets: 2, unit: 'elevações', type: 'reps', cat: 'força',
    muscles: ['Glúteos', 'Isquiotibial', 'Lombar'], pose: 'glute',
    mColor: '#ef4444', xp: 60, diff: 'Fácil',
    steps: ['Deite de costas com os joelhos dobrados','Pés apoiados no chão na largura dos ombros','Empurre os quadris para cima contraindo os glúteos','Mantenha por 1 segundo no topo','Desça devagar sem encostar no chão']
  },
  {
    id: 'd8', name: 'Tríceps em Casa', icon: '🪑',
    base: 10, max: 30, sets: 2, unit: 'mergulhos', type: 'reps', cat: 'força',
    muscles: ['Tríceps', 'Ombros'], pose: 'dip',
    mColor: '#ef4444', xp: 65, diff: 'Médio',
    steps: ['Use uma cadeira ou superfície estável','Mãos na borda com os dedos apontando para frente','Escorregue o corpo para frente da cadeira','Desça dobrando os cotovelos a 90°','Empurre para subir usando os tríceps']
  }
];

const WEEKLY_MISSIONS = [
  { id: 'w1', title: 'Semana do Guerreiro', desc: 'Treine pelo menos 5 dias esta semana', xp: 500, diff: 'Épico', progress: () => state.weekDaysTraining, total: 5 },
  { id: 'w2', title: 'Rei das Flexões', desc: 'Acumule 60 flexões esta semana', xp: 350, diff: 'Difícil', progress: () => state.weekFlexoes, total: 60 },
  { id: 'w3', title: 'Cardio Consistente', desc: 'Complete 4 missões de cardio esta semana', xp: 400, diff: 'Difícil', progress: () => state.weekCardio, total: 4 },
  { id: 'w4', title: 'Mestre da Consistência', desc: 'Complete 3 missões por dia in 3 dias', xp: 550, diff: 'Épico', progress: () => state.weekConsistency, total: 3 }
];

const SPECIAL_MISSIONS = [
  { id: 's1', title: 'Despertar do Herói', desc: 'Complete sua primeira missão', xp: 50, diff: 'Iniciante', check: () => state.totalMissions >= 1 },
  { id: 's2', title: 'Madrugador', desc: 'Complete uma missão antes das 9h', xp: 150, diff: 'Especial', check: () => state.earlyBird },
  { id: 's3', title: 'Trio Perfeito', desc: 'Complete missões de 3 categorias hoje', xp: 200, diff: 'Especial', check: () => state.trioPerfect },
  { id: 's4', title: 'Imparável', desc: '7 dias seguidos treinando', xp: 700, diff: 'Lendário', check: () => state.streak >= 7 },
  { id: 's5', title: 'Centurião Total', desc: '100 missões concluídas', xp: 1000, diff: 'Lendário', check: () => state.totalMissions >= 100 }
];

const ACHIEVEMENTS = [
  { id: 'a1', icon: '🌟', title: 'Primeira Missão', desc: 'Complete 1 missão', check: s => s.totalMissions >= 1 },
  { id: 'a2', icon: '💪', title: 'Em Forma', desc: 'Complete 10 missões', check: s => s.totalMissions >= 10 },
  { id: 'a3', icon: '🎯', title: 'Dedicado', desc: 'Complete 25 missões', check: s => s.totalMissions >= 25 },
  { id: 'a4', icon: '⚔️', title: 'Guerreiro', desc: 'Complete 50 missões', check: s => s.totalMissions >= 50 },
  { id: 'a5', icon: '💯', title: '100 Missões', desc: 'Complete 100 missões', check: s => s.totalMissions >= 100 },
  { id: 'a6', icon: '🔥', title: '3 Dias Seguidos', desc: 'Streak de 3 dias', check: s => s.streak >= 3 },
  { id: 'a7', icon: '🗓️', title: '7 Dias Seguidos', desc: 'Streak de 7 dias', check: s => s.streak >= 7 },
  { id: 'a8', icon: '🏆', title: 'Mês Perfeito', desc: 'Streak de 30 dias', check: s => s.streak >= 30 },
  { id: 'a9', icon: '⭐', title: 'Nível 5', desc: 'Alcance o nível 5', check: s => s.level >= 5 },
  { id: 'a10', icon: '🌠', title: 'Nível 10', desc: 'Alcance o nível 10', check: s => s.level >= 10 },
  { id: 'a11', icon: '💎', title: 'Nível 25', desc: 'Alcance o nível 25', check: s => s.level >= 25 },
  { id: 'a12', icon: '👑', title: 'Nível 50', desc: 'Alcance o nível 50', check: s => s.level >= 50 },
  { id: 'a13', icon: '💥', title: 'Mestre das Flexões', desc: '200 flexões totais', check: s => s.totalFlexoes >= 200 },
  { id: 'a14', icon: '🦾', title: 'Pernas de Titânio', desc: '300 agachamentos totais', check: s => s.totalAgacham >= 300 },
  { id: 'a15', icon: '🛡️', title: 'Guardião do Core', desc: '600s de prancha total', check: s => s.totalPrancha >= 600 },
  { id: 'a16', icon: '🧠', title: 'Guerreiro da Disciplina', desc: '5 missões em um dia', check: s => s.maxDayMissions >= 5 },
  { id: 'a17', icon: '📈', title: 'Progressão Real', desc: '10 missões seguidas concluídas', check: s => s.maxConsecutive >= 10 },
  { id: 'a18', icon: '🌈', title: 'Lendário', desc: 'Nível 50 e 200 missões', check: s => s.level >= 50 && s.totalMissions >= 200 }
];

// ===== STATE =====
const DEFAULT_STATE = {
  level: 1, xp: 0, totalXP: 0,
  streak: 0, lastTrainingDate: null,
  totalMissions: 0, completedToday: [],
  weekDaysTraining: 0, weekFlexoes: 0, weekCardio: 0, weekConsistency: 0,
  totalFlexoes: 0, totalAgacham: 0, totalPrancha: 0,
  maxDayMissions: 0, maxConsecutive: 0, consecutiveRun: 0,
  completedWeekly: [], completedSpecial: [], unlockedAchievements: [],
  earlyBird: false, trioPerfect: false,
  todayCategories: []
};

let state = { ...DEFAULT_STATE };

// ========================================================
// CONTROLE DE SESSÃO E AUTENTICAÇÃO
// ========================================================

supabase.auth.onAuthStateChange(async (event, session) => {
  const authContainer = document.getElementById('auth-container');
  const userBar = document.getElementById('user-bar');
  const userDisplayName = document.getElementById('user-display-name');
  const btnLogout = document.getElementById('btn-logout');

  if (session) {
    if (authContainer) authContainer.style.display = 'none';
    if (userBar) userBar.style.display = 'flex';
    if (userDisplayName) userDisplayName.textContent = session.user.email;
    if (btnLogout) btnLogout.style.display = 'block';
    
    await loadState(session.user);
  } else {
    if (authContainer) authContainer.style.display = 'block';
    if (userBar) userBar.style.display = 'none';
    if (btnLogout) btnLogout.style.display = 'none';

    const savedLocal = localStorage.getItem('fitnessRPG_state');
    if (savedLocal) {
        try {
            state = JSON.parse(savedLocal);
        } catch(e) {
            state = { ...DEFAULT_STATE };
        }
    } else {
        state = { ...DEFAULT_STATE };
    }
    
    if (typeof renderTab === 'function') renderTab(currentTab);
  }
});

// ========================================================
// SINCRONIZAÇÃO ONLINE (PROFILES & PROGRESS)
// ========================================================

async function loadState(user) {
  try {
    if (!user) return;

    let { data: profile, error } = await supabase
      .from('Profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error && error.code === 'PGRST116') {
      const novoPerfil = {
        id: user.id,
        nome: user.email.split('@')[0],
        xp: 0,
        nivel: 1,
        moedas: 0,
        streak: 0,
        total_missions: 0,
        max_day_missions: 0,
        last_training_date: null
      };

      const { error: insertError } = await supabase
        .from('Profiles')
        .insert([novoPerfil]);

      if (insertError) throw insertError;
      profile = novoPerfil;
    } else if (error) {
      throw error;
    }

    state.xp = profile.xp || 0;
    state.level = profile.nivel || 1;
    state.moedas = profile.moedas || 0;
    state.streak = profile.streak || 0;
    state.totalMissions = profile.total_missions || 0;
    state.maxDayMissions = profile.max_day_missions || 0;
    state.lastTrainingDate = profile.last_training_date || null;

    checkDayReset();
    if (typeof renderTab === 'function') renderTab(currentTab);

  } catch (e) {
    console.error("Erro ao carregar dados do Supabase, usando local:", e);
    const saved = localStorage.getItem('fitnessRPG_state');
    if (saved) state = { ...DEFAULT_STATE, ...JSON.parse(saved) };
  }
}

async function saveState() {
    try {
        localStorage.setItem('fitnessRPG_state', JSON.stringify(state));
    } catch (err) {
        console.error("Erro ao salvar no localStorage:", err);
    }

    try {
        const { data: { session } } = await supabase.auth.getSession();
        const user = session?.user;
        
        if (user) {
            await supabase
                .from('Profiles')
                .upsert({
                    id: user.id,
                    xp: state.xp,
                    nivel: state.level,
                    moedas: state.moedas || 0,
                    streak: state.streak || 0,
                    total_missions: state.totalMissions || 0,
                    max_day_missions: state.maxDayMissions || 0,
                    last_training_date: state.lastTrainingDate
                });
        }
    } catch (e) {
        console.error("Erro ao salvar dados online:", e);
    }
}

async function registrarConquistaOnline(nomeConquista) {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user;
    if (user) {
      await supabase
        .from('achievements')
        .insert([{
          user_id: user.id,
          conquista: nomeConquista,
          data: new Date().toISOString()
        }]);
    }
  } catch (e) {
    console.error("Erro ao registrar conquista online:", e);
  }
}

function checkDayReset() {
  const today = new Date().toDateString();
  if (state.lastTrainingDate !== today) {
    if (state.completedToday.length > 0) {
      const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
      if (state.lastTrainingDate === yesterday.toDateString()) {
        state.streak = (state.streak || 0) + 1;
      } else {
        state.streak = 0;
      }
      if (state.completedToday.length >= state.maxDayMissions) {
        state.maxDayMissions = Math.max(state.maxDayMissions, state.completedToday.length);
      }
    }
    state.completedToday = [];
    state.todayCategories = [];
    state.earlyBird = false;
    state.trioPerfect = false;
  }
}

// ===== XP / LEVEL =====
function xpForLevel(lv) {
  return Math.floor(100 * Math.pow(lv, 1.5));
}
function addXP(amount) {
  state.xp += amount;
  state.totalXP += amount;
  let didLevel = false;
  while (state.xp >= xpForLevel(state.level)) {
    state.xp -= xpForLevel(state.level);
    state.level++;
    didLevel = true;
  }
  return didLevel;
}

// ===== DIFFICULTY SCALING =====
function scaledTarget(ex) {
  const factor = Math.min(1, state.totalMissions / 50);
  const range = ex.max - ex.base;
  return Math.floor(ex.base + range * factor);
}

// ===== MISSION CONTROLS =====
let activeMission = null;
let currentSet = 1;
let currentReps = 0;
let timerInterval = null;
let restInterval = null;
let restRemaining = 30;

function startMission(id) {
  const ex = EXERCISES.find(e => e.id === id);
  if (!ex) return;
  activeMission = { ...ex, target: scaledTarget(ex), currentSet: 1, currentReps: 0 };
  currentSet = 1; currentReps = 0;
  openMissionScreen();
}

function openMissionScreen() {
  const ex = activeMission;
  const target = ex.target;
  const el = document.getElementById('mission-screen');
  if (!el) return;
  el.innerHTML = '';

  el.innerHTML = `
    <div style="padding-bottom:30px">
      <div class="mission-screen-header">
        <button class="back-btn" onclick="closeMissionScreen()">X</button>
        <div>
          <div class="mission-screen-title">${ex.icon} ${ex.name}</div>
          <div class="mission-screen-series">Série ${currentSet} de ${ex.sets}</div>
        </div>
      </div>
      <div class="figure-container">
        <img src="./${ex.pose}.png" class="exercise-image" alt="${ex.name}">
      </div>
      <div class="muscle-tags">
        ${ex.muscles.map(m => `<span class="muscle-tag" style="background:${ex.mColor}22;color:${ex.mColor}">${m}</span>`).join('')}
      </div>
      <div class="progress-ring-wrap">
        <svg viewBox="0 0 120 120" width="130" height="130">
          <circle cx="60" cy="60" r="50" fill="none" stroke="#1E2040" stroke-width="10"/>
          <circle id="prog-ring" cx="60" cy="60" r="50" fill="none" stroke="${ex.mColor}" stroke-width="10"
            stroke-dasharray="314.16" stroke-dashoffset="314.16" stroke-linecap="round"
            transform="rotate(-90 60 60)" style="transition:stroke-dashoffset 0.3s"/>
        </svg>
        <div class="progress-ring-label" id="prog-label">${ex.type === 'timer' ? target : '0'}</div>
        <div class="progress-ring-sub">${ex.type === 'timer' ? 'segundos restantes' : `de ${target} ${ex.unit}`}</div>
      </div>
      <div class="series-bars">
        <div class="series-bar-label">Progresso das séries</div>
        <div class="series-dots">
          ${Array.from({length: ex.sets}, (_, i) => `<div class="series-dot ${i+1 < currentSet ? 'done' : i+1 === currentSet ? 'active' : ''}"></div>`).join('')}
        </div>
      </div>
      <div class="action-area">
        ${ex.type === 'reps'
          ? `<button class="rep-btn pulse-btn" id="rep-btn" onclick="addRep()">+1 ${ex.unit.split(' ')[0].toUpperCase()}</button>`
          : `<button class="btn-primary" onclick="startTimer()" id="timer-start-btn">▶ Iniciar Timer</button>`
        }
      </div>
      <div class="steps-container">
        <div class="steps-title">Como executar</div>
        <ul class="steps-list">
          ${ex.steps.map((s, i) => `<li><span class="step-num">${i+1}</span><span>${s}</span></li>`).join('')}
        </ul>
      </div>
    </div>
  `;
  el.classList.add('open');
  if (ex.type === 'timer') updateRing(0, target);
}

function deleteMissionScreen() {
  clearInterval(timerInterval);
  document.getElementById('mission-screen')?.classList.remove('open');
}

// ===== MISSION LOGIC FIX =====
async function completeMission() {
  const ex = activeMission;
  document.getElementById('mission-screen')?.classList.remove('open');

  const today = new Date().toDateString();
  const hour = new Date().getHours();

  if (!state.completedToday.includes(ex.id)) {
    state.completedToday.push(ex.id);
  }
  state.lastTrainingDate = today;
  state.totalMissions++;
  state.consecutiveRun++;
  state.maxConsecutive = Math.max(state.maxConsecutive, state.consecutiveRun);
  state.maxDayMissions = Math.max(state.maxDayMissions, state.completedToday.length);

  if (hour < 9) state.earlyBird = true;

  if (!state.todayCategories.includes(ex.cat)) {
    state.todayCategories.push(ex.cat);
  }
  if (state.todayCategories.length >= 3) state.trioPerfect = true;

  if (ex.id === 'd1') state.totalFlexoes += ex.target;
  if (ex.id === 'd2') state.totalAgacham += ex.target;
  if (ex.id === 'd3') state.totalPrancha += ex.target;
  if (ex.cat === 'cardio') state.weekCardio++;
  if (ex.id === 'd1') state.weekFlexoes += ex.target;

  checkSpecialMissions();

  state.weekDaysTraining = Math.min(7, (state.weekDaysTraining || 0) + (state.completedToday.length === 1 ? 1 : 0));
  if (state.completedToday.length >= 3) {
    state.weekConsistency = Math.min(3, (state.weekConsistency || 0) + 1);
  }

  let didLevel = addXP(ex.xp);

  try {
    localStorage.setItem('fitnessRPG_state', JSON.stringify(state));
    
    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData?.session?.user;

    if (user) {
      const { error } = await supabase
        .from('Profiles')
        .upsert({
          id: user.id,
          xp: state.xp,
          nivel: state.level,
          moedas: state.moedas || 0,
          streak: state.streak || 0,
          total_missions: state.totalMissions || 0,
          max_day_missions: state.maxDayMissions || 0,
          last_training_date: state.lastTrainingDate
        });
        
      if (error) console.error("Erro ao fazer upsert no Supabase:", error.message);
    }
  } catch (e) {
    console.error("Erro ao salvar progresso:", e);
  }

  showToast(`✅ ${ex.name} completo! +${ex.xp} XP`, 'success');
  spawnParticles();

  if (didLevel) {
    setTimeout(() => showLevelUp(state.level), 800);
  }

  const newAchs = checkAchievements();
  if (newAchs.length > 0) {
    await registrarConquistaOnline(newAchs[0].title);
    setTimeout(() => showAchievementFlash(newAchs[0]), didLevel ? 3500 : 1000);
  }

  checkWeeklyMissions();
  
  if (typeof renderTab === 'function') {
    renderTab(typeof currentTab !== 'undefined' ? currentTab : 'home');
  }
}

function updateRing(current, total) {
  const ring = document.getElementById('prog-ring');
  const label = document.getElementById('prog-label');
  if (!ring || !label) return;
  const circumference = 314.16;
  const pct = Math.min(current / total, 1);
  ring.style.strokeDashoffset = circumference * (1 - pct);
  if (activeMission.type === 'timer') {
    label.textContent = total - current;
  } else {
    label.textContent = current;
  }
}

function addRep() {
  currentReps++;
  updateRing(currentReps, activeMission.target);
  if (currentReps >= activeMission.target) finishSet();
}

function startTimer() {
  const btn = document.getElementById('timer-start-btn');
  if (btn) btn.style.display = 'none';
  let elapsed = 0;
  const total = activeMission.target;
  timerInterval = setInterval(() => {
    elapsed++;
    updateRing(elapsed, total);
    if (elapsed >= total) {
      clearInterval(timerInterval);
      finishSet();
    }
  }, 1000);
}

function finishSet() {
  clearInterval(timerInterval);
  if (currentSet < activeMission.sets) {
    currentSet++;
    openRestScreen();
  } else {
    completeMission();
  }
}

function openRestScreen() {
  restRemaining = 30;
  const rs = document.getElementById('rest-screen');
  if (!rs) return;
  rs.classList.add('show');
  updateRestRing(30);
  restInterval = setInterval(() => {
    restRemaining--;
    updateRestRing(restRemaining);
    if (restRemaining <= 0) {
      clearInterval(restInterval);
      nextSet();
    }
  }, 1000);
}

function updateRestRing(remaining) {
  const prog = document.getElementById('rest-progress');
  const count = document.getElementById('rest-count');
  if (!prog || !count) return;
  const pct = remaining / 30;
  prog.style.strokeDashoffset = 326.7 * (1 - pct);
  count.textContent = remaining;
}

function skipRest() {
  clearInterval(restInterval);
  nextSet();
}

function nextSet() {
  document.getElementById('rest-screen')?.classList.remove('show');
  currentReps = 0;
  openMissionScreen();
}

function checkWeeklyMissions() {
  WEEKLY_MISSIONS.forEach(m => {
    if (!state.completedWeekly.includes(m.id)) {
      if (m.progress() >= m.total) {
        state.completedWeekly.push(m.id);
        addXP(m.xp);
        showToast(`🏆 Missão semanal "${m.title}" completa! +${m.xp} XP`, 'gold');
      }
    }
  });
}

function checkSpecialMissions() {
  SPECIAL_MISSIONS.forEach(m => {
    if (!state.completedSpecial.includes(m.id) && m.check()) {
      state.completedSpecial.push(m.id);
      addXP(m.xp);
      showToast(`⭐ Missão especial "${m.title}" completa! +${m.xp} XP`, 'gold');
    }
  });
}

function checkAchievements() {
  const newOnes = [];
  ACHIEVEMENTS.forEach(a => {
    if (!state.unlockedAchievements.includes(a.id) && a.check(state)) {
      state.unlockedAchievements.push(a.id);
      newOnes.push(a);
    }
  });
  return newOnes;
}

// ===== FEEDBACK =====
let toastTimeout = null;
function showToast(msg, type = 'default') {
  const el = document.getElementById('toast');
  if (!el) return;
  el.innerHTML = `<div class="toast-inner ${type}">${msg}</div>`;
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => { el.innerHTML = ''; }, 3000);
}

// ===== VISUAL PARTICLES =====
function spawnParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const colors = ['#7C3AED', '#F59E0B', '#10B981', '#EF4444', '#00AAFF', '#FF6B6B', '#A78BFA'];
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const angle = Math.random() * Math.PI * 2;
    const dist = 80 + Math.random() * 120;
    p.style.cssText = `
      left: ${40 + Math.random() * 20}%;
      top: ${30 + Math.random() * 20}%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      --tx: ${Math.cos(angle) * dist}px;
      --ty: ${Math.sin(angle) * dist}px;
      animation-delay: ${Math.random() * 0.3}s;
    `;
    container.appendChild(p);
    setTimeout(() => p.remove(), 1500);
  }
}

function showLevelUp(level) {
  const el = document.getElementById('levelup-overlay');
  const num = document.getElementById('levelup-num');
  if (num) num.textContent = level;
  el?.classList.add('show');
  spawnParticles();
}

// ===== AUTH ACTIONS GLOBALS =====

window.handleSignIn = async function() {
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;

    if (!email || !password) {
        alert('Por favor, preencha o e-mail e a senha.');
        return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        alert('Erro ao entrar: ' + error.message);
    } else {
        alert("Login realizado com sucesso!");
    }
}

window.handleSignUp = async function() {
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;

    if (!email || !password) {
        alert('Por favor, preencha o e-mail e a senha.');
        return;
    }

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
        alert('Erro ao registrar: ' + error.message);
    } else {
        alert('Cadastro realizado! Se divertir no Quest Stuff.');
    }
}

window.handleSignOut = async function() {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        
        localStorage.removeItem('fitnessRPG_state'); 
        alert("Deslogado com sucesso!");
        window.location.reload();
    } catch (error) {
        console.error('Erro ao sair:', error.message);
    }
}

function closeLevelUp() {
  document.getElementById('levelup-overlay')?.classList.remove('show');
}

function showAchievementFlash(ach) {
  const el = document.getElementById('ach-flash');
  const icon = document.getElementById('ach-flash-icon');
  const title = document.getElementById('ach-flash-title');
  if (icon) icon.textContent = ach.icon;
  if (title) title.textContent = ach.title;
  el?.classList.add('show');
  setTimeout(() => el?.classList.remove('show'), 3000);
}

// ===== RANKING DATA =====
function getRankingPlayers(scope) {
  const bases = {
    regional: [
      { name: 'Bruno Lima', avatar: '🦁', level: 8, xp: 3200 },
      { name: 'Carla Mendes', avatar: '🐯', level: 7, xp: 2800 },
      { name: 'Diego Costa', avatar: '🦊', level: 6, xp: 2400 },
      { name: 'Fernanda Reis', avatar: '🐺', level: 5, xp: 1900 },
      { name: 'Gabriel Souza', avatar: '🦅', level: 4, xp: 1500 },
      { name: 'Helena Martins', avatar: '🦋', level: 3, xp: 1100 },
      { name: 'Igor Ferreira', avatar: '🐉', level: 2, xp: 700 },
      { name: 'Julia Santos', avatar: '🦄', level: 1, xp: 300 }
    ],
    nacional: [
      { name: 'André Oliveira', avatar: '🔥', level: 15, xp: 8500 },
      { name: 'Beatriz Cruz', avatar: '⚡', level: 12, xp: 6200 },
      { name: 'Carlos Neto', avatar: '💎', level: 10, xp: 5100 },
      { name: 'Daniela Pires', avatar: '🌟', level: 9, xp: 4300 },
      { name: 'Eduardo Alves', avatar: '🏆', level: 8, xp: 3800 },
      { name: 'Flavia Rocha', avatar: '🎯', level: 7, xp: 3100 },
      { name: 'Gustavo Lima', avatar: '⚔️', level: 6, xp: 2500 },
      { name: 'Ingrid Vale', avatar: '🛡️', level: 5, xp: 1800 }
    ],
    mundial: [
      { name: 'Alex Storm', avatar: '🌪️', level: 50, xp: 85000 },
      { name: 'Maria Fuerte', avatar: '💥', level: 42, xp: 62000 },
      { name: 'Kai Thunder', avatar: '⚡', level: 35, xp: 48000 },
      { name: 'Yuki Blade', avatar: '🗡️', level: 28, xp: 35000 },
      { name: 'Camila Power', avatar: '💪', level: 22, xp: 25000 },
      { name: 'Ruan Force', avatar: '🔥', level: 18, xp: 18000 },
      { name: 'Priya Wins', avatar: '🏆', level: 15, xp: 12000 },
      { name: 'Luca Speed', avatar: '💨', level: 10, xp: 7000 }
    ]
  };
  const players = [...(bases[scope] || bases.regional)];
  const me = { name: 'Você', avatar: '⚔️', level: state.level, xp: state.totalXP, isMe: true };
  players.push(me);
  players.sort((a, b) => b.xp - a.xp);
  return players;
}

// ===== NAVIGATION & RENDER =====
let currentTab = 'home';
let missionSubTab = 'daily';
let rankingSubTab = 'regional';

function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  renderTab(tab);
}

function renderTab(tab) {
  const content = document.getElementById('content');
  if (!content) return;
  switch (tab) {
    case 'home': content.innerHTML = renderHome(); break;
    case 'missions': content.innerHTML = renderMissions(); break;
    case 'achievements': content.innerHTML = renderAchievements(); break;
    case 'ranking': content.innerHTML = renderRanking(); break;
    case 'profile': content.innerHTML = renderProfile(); break;
  }
}

function renderHome() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';
  const xpNeeded = xpForLevel(state.level);
  const pct = Math.min(100, Math.round((state.xp / xpNeeded) * 100));
  const todayExercises = EXERCISES.filter(e => !state.completedToday.includes(e.id));
  const completedExercises = EXERCISES.filter(e => state.completedToday.includes(e.id));

  return `
    <div class="home-header">
      <div>
        <div class="home-greeting">${greeting}, Guerreiro! 👋</div>
        <div class="home-name">Quest Stuff</div>
      </div>
      <div class="home-avatar">⚔️</div>
    </div>
    <div class="card xp-card" style="margin:16px 20px 0">
      <div class="xp-top">
        <span class="level-badge">⭐ Nível ${state.level}</span>
        <span class="xp-nums">${state.xp} / <span>${xpNeeded}</span> XP</span>
      </div>
      <div class="xp-bar"><div class="xp-fill" style="width:${pct}%"></div></div>
    </div>
    ${state.streak >= 3 ? `<div class="streak-banner">🔥 ${state.streak} dias seguidos! Continue assim!</div>` : ''}
    <div class="section-title">Missões de Hoje (${state.completedToday.length}/${EXERCISES.length})</div>
    <div class="mission-grid">
      ${todayExercises.map(ex => `
        <div class="mission-item" onclick="startMission('${ex.id}')">
          <div class="mission-icon">${ex.icon}</div>
          <div class="mission-info">
            <div class="mission-name">${ex.name}</div>
            <div class="mission-meta">${scaledTarget(ex)} ${ex.unit} · ${ex.sets} séries</div>
            <span class="muscle-tag" style="background:${ex.mColor}22;color:${ex.mColor}">${ex.cat}</span>
          </div>
          <div class="mission-xp">+${ex.xp}<br><span style="font-size:10px;color:var(--muted)">XP</span></div>
        </div>
      `).join('')}
      ${completedExercises.map(ex => `
        <div class="mission-item completed">
          <div class="mission-icon">${ex.icon}</div>
          <div class="mission-info">
            <div class="mission-name">${ex.name}</div>
            <div class="mission-meta">Concluído ✓</div>
          </div>
          <div class="mission-done">✅</div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderMissions() {
  const tabs = ['daily', 'weekly', 'special'];
  const labels = { daily: 'Diárias', weekly: 'Semanais', special: 'Especiais' };
  return `
    <div class="missions-header">
      <div class="missions-title">⚔️ Missões</div>
      <div class="missions-sub">Escolha seu desafio</div>
    </div>
    <div class="tab-pills">
      ${tabs.map(t => `<button class="pill ${missionSubTab === t ? 'active' : ''}" onclick="switchMissionTab('${t}')">${labels[t]}</button>`).join('')}
    </div>
    <div class="missions-list">
      ${missionSubTab === 'daily' ? renderDailyMissions() : ''}
      ${missionSubTab === 'weekly' ? renderWeeklyMissions() : ''}
      ${missionSubTab === 'special' ? renderSpecialMissions() : ''}
    </div>
  `;
}

function renderDailyMissions() {
  return EXERCISES.map(ex => {
    const done = state.completedToday.includes(ex.id);
    const target = scaledTarget(ex);
    return `
      <div class="mission-card ${done ? 'completed' : ''}">
        <div class="mission-card-header" onclick="toggleMissionCard('mc-${ex.id}')">
          <div class="mission-icon">${ex.icon}</div>
          <div style="flex:1">
            <div style="font-weight:700;font-size:15px">${ex.name}</div>
            <div style="font-size:12px;color:var(--muted)">${target} ${ex.unit} · ${ex.sets} séries</div>
          </div>
          <span class="diff-badge diff-${ex.diff}">${ex.diff}</span>
        </div>
      </div>
    `;
  }).join('');
}

function renderWeeklyMissions() {
  return WEEKLY_MISSIONS.map(m => {
    const done = state.completedWeekly.includes(m.id);
    const prog = Math.min(m.progress(), m.total);
    const pct = Math.round((prog / m.total) * 100);
    return `
      <div class="weekly-card ${done ? 'completed' : ''}">
        <div style="font-weight:700;font-size:15px">${m.title}</div>
        <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
      </div>
    `;
  }).join('');
}

function renderSpecialMissions() {
  return SPECIAL_MISSIONS.map(m => {
    const done = state.completedSpecial.includes(m.id);
    return `
      <div class="special-card ${done ? 'completed' : ''}">
        <div style="font-weight:700;font-size:15px">${m.title}</div>
      </div>
    `;
  }).join('');
}

function toggleMissionCard(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

function switchMissionTab(tab) {
  missionSubTab = tab;
  renderTab('missions');
}

function renderAchievements() {
  const unlocked = state.unlockedAchievements.length;
  return `
    <div class="achievements-header">
      <div style="font-size:24px;font-weight:800">🏆 Conquistas</div>
    </div>
    <div class="ach-grid">
      ${ACHIEVEMENTS.map(a => {
        const isUnlocked = state.unlockedAchievements.includes(a.id);
        return `<div class="ach-card">${a.title}</div>`;
      }).join('')}
    </div>
  `;
}

function renderRanking() {
  return `<div class="ranking-header">📊 Ranking em Tempo Real</div>`;
}

function renderProfile() {
  const xpNeeded = xpForLevel(state.level);
  return `
    <div class="profile-header">
      <div class="profile-name">Guerreiro</div>
      <button class="btn-secondary" style="width:100%;margin-top:8px" onclick="resetGame()">🔄 Resetar Progresso</button>
    </div>
  `;
}

function resetGame() {
  if (confirm('Resetar todo o progresso? Esta ação não pode ser desfeita.')) {
    localStorage.removeItem('fitnessRPG_state');
    state = { ...DEFAULT_STATE };
    saveState(); 
    window.location.reload();
  }
}

// ==========================================
// INITIALIZATION AND NETWORK CONTROL
// ==========================================
let splash;
let app;

function updateOnline() {
    const bar = document.getElementById('offline-bar');
    if (bar) {
        if (!navigator.onLine) bar.classList.add('show');
        else bar.classList.remove('show');
    }
}

function init() {
    const salvo = localStorage.getItem('fitnessRPG_state');
    if (salvo) {
        try { state = JSON.parse(salvo); } catch (e) { state = { ...DEFAULT_STATE }; }
    } else {
        state = { ...DEFAULT_STATE };
    }

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js').catch(() => {});
    }

    splash = document.getElementById('splash');
    app = document.getElementById('app');

    window.addEventListener('online', updateOnline);
    window.addEventListener('offline', updateOnline);
    updateOnline();

    // Controle do Splash Screen
    setTimeout(() => {
        if (splash) splash.classList.add('hidden');
        if (app) app.style.display = 'flex';
        
        renderTab('home');

        setTimeout(() => {
            if (splash) splash.style.display = 'none';
        }, 600);
    }, 1800);
}

document.addEventListener('DOMContentLoaded', init);
