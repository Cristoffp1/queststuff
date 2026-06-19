'use strict';

// ===== SUPABASE CONFIG =====
const SUPABASE_URL = 'https://flnzycipcdqtwcyujzqe.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsbnp5Y2lwY2RxdHdjeXVqenFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2MjA5MzcsImV4cCI6MjA5NzE5NjkzN30.plqw_CtlaJmChDlnkTfHN9MUPVn0IK7Ty_WfujM3ICo'; 

// Inicializa o cliente do Supabase
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
    steps: ['Deite de costas com os joelhos dobrados','Pés apoiados no chão na largura dos ombros','Empurde os quadris para cima contraindo os glúteos','Mantenha por 1 segundo no topo','Desça devagar sem encostar no chão']
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
  { id: 'w4', title: 'Mestre da Consistência', desc: 'Complete 3 missões por dia em 3 dias', xp: 550, diff: 'Épico', progress: () => state.weekConsistency, total: 3 }
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
  { id: 'a12', icon: '👑', title: 'Nível 50', desc: 'Alcance o nível 50', check: s => s.level >= 50 }
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
  earlyBird: false, trioPerfect: false, todayCategories: []
};

let state = { ...DEFAULT_STATE };
let currentTab = 'home';
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
    if (authContainer) authContainer.style.display = 'flex';
    if (userBar) userBar.style.display = 'none';
    if (btnLogout) btnLogout.style.display = 'none';

    const savedLocal = localStorage.getItem('fitnessRPG_state');
    if (savedLocal) {
        try { state = JSON.parse(savedLocal); } catch(e) { state = { ...DEFAULT_STATE }; }
    } else {
        state = { ...DEFAULT_STATE };
    }
    
    renderTab(currentTab);
  }
});

// ========================================================
// SINCRONIZAÇÃO ONLINE (profiles EM MINÚSCULO)
// ========================================================

async function loadState(user) {
  try {
    if (!user) return;

    let { data: profile, error } = await supabase
      .from('profiles')
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
        .from('profiles')
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
    renderTab(currentTab);

  } catch (e) {
    console.error("Erro no Supabase, usando local:", e);
    const saved = localStorage.getItem('fitnessRPG_state');
    if (saved) state = { ...DEFAULT_STATE, ...JSON.parse(saved) };
  }
}

async function saveState() {
    try {
        localStorage.setItem('fitnessRPG_state', JSON.stringify(state));
    } catch (err) {
        console.error("Erro localstorage:", err);
    }

    try {
        const { data: { session } } = await supabase.auth.getSession();
        const user = session?.user;
        
        if (user) {
            await supabase
                .from('profiles')
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
        console.error("Erro ao salvar online:", e);
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
    }
    state.completedToday = [];
    state.todayCategories = [];
    state.earlyBird = false;
    state.trioPerfect = false;
  }
}

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

function scaledTarget(ex) {
  const factor = Math.min(1, state.totalMissions / 50);
  const range = ex.max - ex.base;
  return Math.floor(ex.base + range * factor);
}

// ===== MISSION ACTIONS =====
let activeMission = null;
let currentSet = 1;
let currentReps = 0;
let timerInterval = null;
let restInterval = null;
let restRemaining = 30;

window.startMission = function(id) {
  const ex = EXERCISES.find(e => e.id === id);
  if (!ex) return;
  activeMission = { ...ex, target: scaledTarget(ex) };
  currentSet = 1; currentReps = 0;
  openMissionScreen();
}

function openMissionScreen() {
  const ex = activeMission;
  const target = ex.target;
  const el = document.getElementById('mission-screen');
  if (!el) return;

  el.innerHTML = `
    <div style="padding: 20px; padding-bottom:100px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
        <h2>${ex.icon} ${ex.name}</h2>
        <button style="padding:8px 14px; background:#f44336; color:white; border:none; border-radius:6px; cursor:pointer;" onclick="closeMissionScreen()">Sair</button>
      </div>
      <h3 style="color:var(--muted)">Série ${currentSet} de ${ex.sets}</h3>
      
      <div style="text-align:center; margin:30px 0;">
        <h1 id="prog-label" style="font-size:48px; margin:0;">${ex.type === 'timer' ? target : '0'}</h1>
        <p style="color:var(--muted)">de ${target} ${ex.unit}</p>
      </div>

      <div style="text-align:center; margin-bottom:30px;">
        ${ex.type === 'reps'
          ? `<button style="padding:20px 40px; font-size:20px; border-radius:50px; background:#4CAF50; color:white; border:none; cursor:pointer; font-weight:bold;" onclick="addRep()">+1 Concluído</button>`
          : `<button style="padding:16px 32px; font-size:16px; border-radius:8px; background:#2196F3; color:white; border:none; cursor:pointer;" onclick="startTimer()" id="timer-start-btn">▶ Iniciar Timer</button>`
        }
      </div>

      <div>
        <h4>Como executar:</h4>
        <ul>${ex.steps.map(s => `<li style="margin-bottom:8px;">${s}</li>`).join('')}</ul>
      </div>
    </div>
  `;
  el.classList.add('open');
}

window.closeMissionScreen = function() {
  clearInterval(timerInterval);
  document.getElementById('mission-screen')?.classList.remove('open');
}

window.addRep = function() {
  currentReps++;
  const label = document.getElementById('prog-label');
  if (label) label.textContent = currentReps;
  if (currentReps >= activeMission.target) finishSet();
}

window.startTimer = function() {
  const btn = document.getElementById('timer-start-btn');
  if (btn) btn.style.display = 'none';
  let elapsed = 0;
  const total = activeMission.target;
  const label = document.getElementById('prog-label');
  
  timerInterval = setInterval(() => {
    elapsed++;
    if (label) label.textContent = total - elapsed;
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
  rs.style.display = 'flex';
  
  const count = document.getElementById('rest-count');
  if (count) count.textContent = restRemaining;

  restInterval = setInterval(() => {
    restRemaining--;
    if (count) count.textContent = restRemaining;
    if (restRemaining <= 0) {
      clearInterval(restInterval);
      nextSet();
    }
  }, 1000);
}

window.skipRest = function() {
  clearInterval(restInterval);
  nextSet();
}

function nextSet() {
  document.getElementById('rest-screen').style.display = 'none';
  currentReps = 0;
  openMissionScreen();
}

async function completeMission() {
  const ex = activeMission;
  document.getElementById('mission-screen')?.classList.remove('open');

  if (!state.completedToday.includes(ex.id)) {
    state.completedToday.push(ex.id);
  }
  state.lastTrainingDate = new Date().toDateString();
  state.totalMissions++;

  let didLevel = addXP(ex.xp);
  await saveState();

  showToast(`✅ ${ex.name} completo! +${ex.xp} XP`);
  if (didLevel) setTimeout(() => showLevelUp(state.level), 800);
  
  renderTab(currentTab);
}

// ===== CONTROLE DAS ABAS =====
window.switchTab = function(tab) {
  currentTab = tab;
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  renderTab(tab);
}

function renderTab(tab) {
  const content = document.getElementById('content');
  if (!content) return;
  
  if (tab === 'home') {
    const xpNeeded = xpForLevel(state.level);
    const pct = Math.min(100, Math.round((state.xp / xpNeeded) * 100));
    
    content.innerHTML = `
      <h2>Olá, Guerreiro! 👋</h2>
      <div style="background:var(--card-bg, #151724); padding:16px; border-radius:12px; margin-bottom:20px;">
        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
          <span>⭐ Nível ${state.level}</span>
          <span>${state.xp}/${xpNeeded} XP</span>
        </div>
        <div style="background:#1E2040; height:10px; border-radius:5px; overflow:hidden;">
          <div style="background:#4CAF50; height:100%; width:${pct}%"></div>
        </div>
      </div>
      <h3>Missões de Hoje</h3>
      <div style="display:flex; flex-direction:column; gap:12px;">
        ${EXERCISES.map(ex => {
          const done = state.completedToday.includes(ex.id);
          return `
            <div style="background:var(--card-bg, #151724); padding:14px; border-radius:10px; display:flex; justify-content:space-between; align-items:center; opacity:${done ? 0.6 : 1}">
              <div>
                <strong>${ex.icon} ${ex.name}</strong>
                <div style="font-size:12px; color:var(--muted, #8b8eaf)">${scaledTarget(ex)} ${ex.unit}</div>
              </div>
              ${done ? '<span>✅</span>' : `<button style="padding:8px 14px; background:#4CAF50; color:white; border:none; border-radius:6px; cursor:pointer;" onclick="startMission('${ex.id}')">Iniciar</button>`}
            </div>
          `;
        }).join('')}
      </div>
    `;
  } else {
    content.innerHTML = `<h3 style="text-align:center; color:var(--muted); margin-top:40px;">Aba ${tab.toUpperCase()} pronta para conteúdo.</h3>`;
  }
}

// ===== AUTH ACTIONS =====
window.handleSignIn = async function() {
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;
    if (!email || !password) return alert('Preencha os campos.');

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert('Erro: ' + error.message);
}

window.handleSignUp = async function() {
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;
    if (!email || !password) return alert('Preencha os campos.');

    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert('Erro: ' + error.message);
    else alert('Cadastro realizado! Verifique seu e-mail.');
}

window.handleSignOut = async function() {
    await supabase.auth.signOut();
    localStorage.removeItem('fitnessRPG_state');
    window.location.reload();
}

function showToast(msg) {
  const el = document.getElementById('toast');
  if (el) {
    el.innerHTML = `<div style="background:#4CAF50; color:white; padding:12px; border-radius:8px; text-align:center;">${msg}</div>`;
    setTimeout(() => { el.innerHTML = ''; }, 3000);
  }
}

function showLevelUp(level) {
  const el = document.getElementById('levelup-overlay');
  const num = document.getElementById('levelup-num');
  if (num) num.textContent = level;
  if (el) el.style.display = 'flex';
}

window.closeLevelUp = function() {
  const el = document.getElementById('levelup-overlay');
  if (el) el.style.display = 'none';
}

// ===== INITIALIZATION =====
function init() {
    const bar = document.getElementById('offline-bar');
    window.addEventListener('online', () => bar?.classList.remove('show'));
    window.addEventListener('offline', () => bar?.classList.add('show'));

    setTimeout(() => {
        const splash = document.getElementById('splash');
        const app = document.getElementById('app');
        if (splash) splash.style.display = 'none';
        if (app) app.style.display = 'flex';
        renderTab('home');
    }, 1200);
}

document.addEventListener('DOMContentLoaded', init);
