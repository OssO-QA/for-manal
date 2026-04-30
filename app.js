// Shared utilities for MAISON YAHYA experience
// LocalStorage key for rewards counter
const REWARDS_KEY = 'manal_rewards_count';

function getRewardsCount() {
  return parseInt(localStorage.getItem(REWARDS_KEY) || '0', 10);
}

function incrementRewards() {
  const newCount = getRewardsCount() + 1;
  localStorage.setItem(REWARDS_KEY, newCount.toString());
  return newCount;
}

// Weighted random: ~3% jackpot, ~27% win, ~70% loss
function spinVault() {
  const symbols = ['💎', '🍣', '❤️', '🌹', '👑', '✨'];
  const winMessages = {
    '💎': "Un diamant (symbolique... pour l'instant 😉)",
    '🍣': 'Une soirée sushi all-you-can-eat offerte',
    '❤️': 'Un câlin de 10 minutes minimum, non négociable',
    '🌹': 'Un bouquet surprise dans la semaine',
    '✨': 'Un compliment sincère à exiger maintenant',
    '👑': 'Un week-end surprise. OMG.'
  };
  const rand = Math.random();
  if (rand < 0.03) {
    return { symbols: ['👑','👑','👑'], isWin: true, isJackpot: true, message: winMessages['👑'] };
  }
  if (rand < 0.30) {
    const winSymbol = symbols[Math.floor(Math.random() * symbols.length)];
    return { symbols: [winSymbol, winSymbol, winSymbol], isWin: true, isJackpot: false, message: winMessages[winSymbol] };
  }
  const s = [];
  while (s.length < 3) {
    s.push(symbols[Math.floor(Math.random() * symbols.length)]);
  }
  if (s[0] === s[1] && s[1] === s[2]) {
    s[2] = symbols[(symbols.indexOf(s[2]) + 1) % symbols.length];
  }
  return { symbols: s, isWin: false, isJackpot: false, message: 'Presque... retente ta chance, Mlle Abbou.' };
}

function launchConfetti(duration = 2000) {
  if (!document.querySelector('#confetti-style')) {
    const style = document.createElement('style');
    style.id = 'confetti-style';
    style.textContent = '@keyframes confetti-fall { 0% { transform: translateY(0) rotate(0deg); opacity:1; } 100% { transform: translateY(105vh) rotate(720deg); opacity:0; } }';
    document.head.appendChild(style);
  }
  const container = document.createElement('div');
  container.setAttribute('aria-hidden', 'true');
  container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;overflow:hidden;';
  document.body.appendChild(container);
  const colors = ['#d4af37','#c41e3a','#f5f5dc','#e8f4f8','#a8892a'];
  for (let i = 0; i < 90; i++) {
    const el = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = (Math.random() * 7 + 4).toFixed(1);
    const left = (Math.random() * 100).toFixed(1);
    const delay = (Math.random() * 0.6).toFixed(2);
    const dur = (Math.random() * 1.8 + 1.5).toFixed(2);
    const radius = Math.random() > 0.5 ? '50%' : '2px';
    el.style.cssText = `position:absolute;width:${size}px;height:${size}px;background:${color};left:${left}%;top:-12px;border-radius:${radius};animation:confetti-fall ${dur}s ${delay}s ease-in forwards;`;
    container.appendChild(el);
  }
  setTimeout(() => { if (container.parentNode) container.parentNode.removeChild(container); }, duration + 1200);
}
