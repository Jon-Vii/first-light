// src/game/StarField.ts
class StarField {
  skyWidth;
  skyHeight;
  stars;
  backgroundStars;
  time = 0;
  constructor(skyWidth, skyHeight) {
    this.skyWidth = skyWidth;
    this.skyHeight = skyHeight;
    this.stars = this.generateStars(800);
    this.backgroundStars = this.generateBackgroundStars(200);
  }
  generateStars(count) {
    const stars = [];
    let seed = 12345;
    const random = () => {
      seed = seed * 1103515245 + 12345 & 2147483647;
      return seed / 2147483647;
    };
    for (let i = 0;i < count; i++) {
      stars.push({
        x: random() * this.skyWidth,
        y: random() * this.skyHeight,
        size: random() * 2 + 0.5,
        brightness: random() * 0.5 + 0.5,
        twinkleOffset: random() * Math.PI * 2
      });
    }
    return stars;
  }
  generateBackgroundStars(count) {
    const stars = [];
    let seed = 67890;
    const random = () => {
      seed = seed * 1103515245 + 12345 & 2147483647;
      return seed / 2147483647;
    };
    for (let i = 0;i < count; i++) {
      stars.push({
        x: random() * this.skyWidth,
        y: random() * this.skyHeight,
        size: random() * 1.5 + 0.3,
        brightness: random() * 0.6 + 0.2,
        twinkleOffset: random() * Math.PI * 2
      });
    }
    return stars;
  }
  getBackgroundStars() {
    return this.backgroundStars;
  }
  render(ctx, viewX, viewY, canvasWidth, canvasHeight, telescopePos) {
    this.time += 0.016;
    const gradient = ctx.createRadialGradient(telescopePos.x, telescopePos.y, 0, telescopePos.x, telescopePos.y, 400);
    gradient.addColorStop(0, "#0f1020");
    gradient.addColorStop(0.5, "#0a0a18");
    gradient.addColorStop(1, "#050510");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    for (const star of this.stars) {
      const screenX = star.x - viewX + canvasWidth / 2;
      const screenY = star.y - viewY + canvasHeight / 2;
      if (screenX < -50 || screenX > canvasWidth + 50 || screenY < -50 || screenY > canvasHeight + 50) {
        continue;
      }
      const twinkle = Math.sin(this.time * 2 + star.twinkleOffset) * 0.2 + 0.8;
      const brightness = star.brightness * twinkle;
      this.drawStar(ctx, screenX, screenY, star.size, brightness);
    }
  }
  drawStar(ctx, x, y, size, brightness) {
    const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, size * 4);
    glowGradient.addColorStop(0, `rgba(200, 210, 255, ${brightness * 0.3})`);
    glowGradient.addColorStop(0.5, `rgba(200, 210, 255, ${brightness * 0.1})`);
    glowGradient.addColorStop(1, "rgba(200, 210, 255, 0)");
    ctx.beginPath();
    ctx.arc(x, y, size * 4, 0, Math.PI * 2);
    ctx.fillStyle = glowGradient;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
    ctx.fill();
  }
}

// src/game/Telescope.ts
class Telescope {
  element;
  radius;
  currentOffsetX = 0;
  currentOffsetY = 0;
  targetOffsetX = 0;
  targetOffsetY = 0;
  lagFactor = 0.06;
  constructor(element) {
    this.element = element;
    this.radius = this.calculateRadius();
    window.addEventListener("resize", () => {
      this.radius = this.calculateRadius();
      this.updateElementPosition();
    });
    this.updateElementPosition();
  }
  calculateRadius() {
    return Math.min(window.innerWidth, window.innerHeight) * 0.425;
  }
  update(mouseX, mouseY, deltaTime) {
    this.targetOffsetX = mouseX - window.innerWidth / 2;
    this.targetOffsetY = mouseY - window.innerHeight / 2;
    const lagAmount = 1 - Math.pow(1 - this.lagFactor, deltaTime * 60);
    const dx = this.targetOffsetX - this.currentOffsetX;
    const dy = this.targetOffsetY - this.currentOffsetY;
    this.currentOffsetX += dx * lagAmount;
    this.currentOffsetY += dy * lagAmount;
  }
  updateElementPosition() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    this.element.style.left = `${centerX}px`;
    this.element.style.top = `${centerY}px`;
  }
  getPosition() {
    return {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    };
  }
  getViewOffset() {
    return {
      x: this.currentOffsetX,
      y: this.currentOffsetY
    };
  }
  getRadius() {
    return this.radius;
  }
}

// src/game/Constellation.ts
class Constellation {
  data;
  hoverTime = 0;
  discoveryProgress = 0;
  isAnimating = false;
  animationTime = 0;
  revealedConnections = 0;
  currentConnectionProgress = 0;
  lastRevealedConnections = 0;
  onAnimationComplete = null;
  onConnectionRevealed = null;
  starActivationTimes = new Map;
  cosmicFlashTime = 0;
  colors = {
    coreWhite: "rgba(255, 255, 245, ",
    innerGold: "rgba(255, 225, 130, ",
    midAmber: "rgba(255, 190, 80, ",
    outerGlow: "rgba(220, 160, 60, ",
    cosmicHaze: "rgba(180, 140, 100, "
  };
  hoverTimeRequired = 2;
  animationDuration = 3.5;
  starFlashDuration = 0.6;
  cosmicFlashDuration = 1.2;
  constructor(data) {
    this.data = { ...data };
  }
  getData() {
    return this.data;
  }
  getAnimationDuration() {
    return this.animationDuration;
  }
  setOnAnimationComplete(callback) {
    this.onAnimationComplete = callback;
  }
  setOnConnectionRevealed(callback) {
    this.onConnectionRevealed = callback;
  }
  isDiscovered() {
    return this.data.discovered;
  }
  addHoverTime(deltaTime) {
    if (this.data.discovered || this.isAnimating)
      return false;
    this.hoverTime += deltaTime;
    this.discoveryProgress = Math.min(1, this.hoverTime / this.hoverTimeRequired);
    if (this.hoverTime >= this.hoverTimeRequired) {
      this.discover();
      return true;
    }
    return false;
  }
  resetHoverTime() {
    this.hoverTime = Math.max(0, this.hoverTime - 0.1);
    this.discoveryProgress = this.hoverTime / this.hoverTimeRequired;
  }
  discover() {
    this.data.discovered = true;
    this.isAnimating = true;
    this.animationTime = 0;
    this.revealedConnections = 0;
    this.starActivationTimes.clear();
    this.cosmicFlashTime = 0;
  }
  update(deltaTime) {
    if (!this.isAnimating)
      return;
    const wasFirstFrame = this.animationTime === 0;
    this.animationTime += deltaTime;
    if (wasFirstFrame && this.data.connections.length > 0) {
      const firstConnection = this.data.connections[0];
      if (firstConnection) {
        const [starIdx1] = firstConnection;
        if (starIdx1 !== undefined) {
          this.starActivationTimes.set(starIdx1, this.animationTime);
          if (this.onConnectionRevealed) {
            this.onConnectionRevealed(-1, this.data.connections.length);
          }
        }
      }
    }
    const totalProgress = Math.min(1, this.animationTime / this.animationDuration);
    const connectionProgress = totalProgress * this.data.connections.length;
    const newRevealedConnections = Math.floor(connectionProgress);
    this.currentConnectionProgress = connectionProgress - newRevealedConnections;
    if (newRevealedConnections > this.revealedConnections) {
      for (let i = this.revealedConnections;i < newRevealedConnections; i++) {
        if (this.onConnectionRevealed) {
          this.onConnectionRevealed(i, this.data.connections.length);
        }
        const connection = this.data.connections[i];
        if (connection) {
          const [, starIdx2] = connection;
          if (starIdx2 !== undefined && !this.starActivationTimes.has(starIdx2)) {
            this.starActivationTimes.set(starIdx2, this.animationTime);
          }
        }
      }
    }
    this.revealedConnections = newRevealedConnections;
    if (this.animationTime >= this.animationDuration) {
      this.isAnimating = false;
      this.revealedConnections = this.data.connections.length;
      this.currentConnectionProgress = 0;
      if (this.onAnimationComplete) {
        this.onAnimationComplete();
        this.onAnimationComplete = null;
        this.onConnectionRevealed = null;
      }
    }
  }
  render(ctx, viewX, viewY, canvasWidth, canvasHeight) {
    const centerScreenX = this.data.centerX - viewX + canvasWidth / 2;
    const centerScreenY = this.data.centerY - viewY + canvasHeight / 2;
    if (Math.abs(centerScreenX - canvasWidth / 2) > canvasWidth || Math.abs(centerScreenY - canvasHeight / 2) > canvasHeight) {
      return;
    }
    if (this.data.discovered) {
      this.renderDiscovered(ctx, viewX, viewY, canvasWidth, canvasHeight);
    } else if (this.discoveryProgress > 0) {
      this.renderHint(ctx, viewX, viewY, canvasWidth, canvasHeight);
    }
  }
  renderHint(ctx, viewX, viewY, canvasWidth, canvasHeight) {
    const alpha = this.discoveryProgress * 0.5;
    for (const star of this.data.stars) {
      const screenX = star.x - viewX + canvasWidth / 2;
      const screenY = star.y - viewY + canvasHeight / 2;
      const pulse = Math.sin(Date.now() * 0.005) * 0.3 + 0.7;
      const size = 3 + star.brightness * 2;
      ctx.beginPath();
      ctx.arc(screenX, screenY, size * 3, 0, Math.PI * 2);
      const glowGradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, size * 3);
      glowGradient.addColorStop(0, `rgba(255, 217, 61, ${alpha * pulse * 0.5})`);
      glowGradient.addColorStop(1, "rgba(255, 217, 61, 0)");
      ctx.fillStyle = glowGradient;
      ctx.fill();
    }
  }
  renderDiscovered(ctx, viewX, viewY, canvasWidth, canvasHeight) {
    const centerScreenX = this.data.centerX - viewX + canvasWidth / 2;
    const centerScreenY = this.data.centerY - viewY + canvasHeight / 2;
    const justCompleted = this.isAnimating && this.revealedConnections === this.data.connections.length;
    if (justCompleted && this.cosmicFlashTime === 0) {
      this.cosmicFlashTime = this.animationTime;
    }
    let cosmicFlashIntensity = 0;
    if (this.cosmicFlashTime > 0) {
      const timeSinceFlash = this.animationTime - this.cosmicFlashTime;
      if (timeSinceFlash < this.cosmicFlashDuration) {
        const progress = timeSinceFlash / this.cosmicFlashDuration;
        cosmicFlashIntensity = Math.sin(progress * Math.PI);
      }
    }
    const baseAlpha = this.isAnimating ? 0.8 : 0.6;
    const lineAlpha = baseAlpha + cosmicFlashIntensity * 0.4;
    if (cosmicFlashIntensity > 0) {
      const shockwaveRadius = cosmicFlashIntensity * 350;
      const shockwaveGradient = ctx.createRadialGradient(centerScreenX, centerScreenY, shockwaveRadius * 0.7, centerScreenX, centerScreenY, shockwaveRadius);
      shockwaveGradient.addColorStop(0, `rgba(255, 220, 100, 0)`);
      shockwaveGradient.addColorStop(0.5, `rgba(255, 180, 50, ${cosmicFlashIntensity * 0.4})`);
      shockwaveGradient.addColorStop(1, `rgba(255, 140, 30, 0)`);
      ctx.beginPath();
      ctx.arc(centerScreenX, centerScreenY, shockwaveRadius, 0, Math.PI * 2);
      ctx.fillStyle = shockwaveGradient;
      ctx.fill();
      const glowGradient = ctx.createRadialGradient(centerScreenX, centerScreenY, 0, centerScreenX, centerScreenY, 180);
      glowGradient.addColorStop(0, `rgba(255, 250, 220, ${cosmicFlashIntensity * 0.5})`);
      glowGradient.addColorStop(0.4, `rgba(255, 200, 100, ${cosmicFlashIntensity * 0.3})`);
      glowGradient.addColorStop(1, `rgba(255, 160, 50, 0)`);
      ctx.beginPath();
      ctx.arc(centerScreenX, centerScreenY, 180, 0, Math.PI * 2);
      ctx.fillStyle = glowGradient;
      ctx.fill();
    }
    ctx.lineCap = "round";
    const connectionsToRender = this.isAnimating ? this.revealedConnections : this.data.connections.length;
    for (let i = 0;i < connectionsToRender; i++) {
      const connection = this.data.connections[i];
      if (!connection)
        continue;
      const [starIdx1, starIdx2] = connection;
      const star1 = this.data.stars[starIdx1];
      const star2 = this.data.stars[starIdx2];
      if (!star1 || !star2)
        continue;
      const x1 = star1.x - viewX + canvasWidth / 2;
      const y1 = star1.y - viewY + canvasHeight / 2;
      const x2 = star2.x - viewX + canvasWidth / 2;
      const y2 = star2.y - viewY + canvasHeight / 2;
      this.drawGlowingLine(ctx, x1, y1, x2, y2, lineAlpha);
    }
    if (this.isAnimating && this.revealedConnections < this.data.connections.length) {
      const currentConnection = this.data.connections[this.revealedConnections];
      if (currentConnection) {
        const [starIdx1, starIdx2] = currentConnection;
        const star1 = this.data.stars[starIdx1];
        const star2 = this.data.stars[starIdx2];
        if (star1 && star2) {
          const x1 = star1.x - viewX + canvasWidth / 2;
          const y1 = star1.y - viewY + canvasHeight / 2;
          const x2 = star2.x - viewX + canvasWidth / 2;
          const y2 = star2.y - viewY + canvasHeight / 2;
          const destAlreadyLit = starIdx2 !== undefined && this.starActivationTimes.has(starIdx2);
          if (destAlreadyLit) {
            this.drawGlowingLine(ctx, x1, y1, x2, y2, lineAlpha);
          } else {
            const progress = this.currentConnectionProgress;
            const currentX = x1 + (x2 - x1) * progress;
            const currentY = y1 + (y2 - y1) * progress;
            this.drawGlowingLine(ctx, x1, y1, currentX, currentY, lineAlpha);
            this.drawSparkHead(ctx, currentX, currentY);
          }
        }
      }
    }
    for (let starIdx = 0;starIdx < this.data.stars.length; starIdx++) {
      const star = this.data.stars[starIdx];
      if (!star)
        continue;
      const screenX = star.x - viewX + canvasWidth / 2;
      const screenY = star.y - viewY + canvasHeight / 2;
      const activationTime = this.starActivationTimes.get(starIdx);
      const isActivated = activationTime !== undefined;
      let size = 3 + star.brightness * 3;
      let starAlpha = baseAlpha + cosmicFlashIntensity * 0.3;
      let flashProgress = 0;
      if (this.isAnimating && !isActivated) {
        const hintAlpha = 0.35;
        const hintSize = 3 + star.brightness * 2;
        const pulse = Math.sin(Date.now() * 0.005) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(screenX, screenY, hintSize * 3, 0, Math.PI * 2);
        const glowGradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, hintSize * 3);
        glowGradient.addColorStop(0, `rgba(255, 217, 61, ${hintAlpha * pulse * 0.5})`);
        glowGradient.addColorStop(1, "rgba(255, 217, 61, 0)");
        ctx.fillStyle = glowGradient;
        ctx.fill();
        continue;
      }
      if (this.isAnimating && isActivated) {
        const timeSinceActivation = this.animationTime - activationTime;
        if (timeSinceActivation < this.starFlashDuration) {
          flashProgress = Math.sin(timeSinceActivation / this.starFlashDuration * Math.PI);
          size *= 1 + flashProgress * 0.4;
          starAlpha = Math.min(1, starAlpha + flashProgress * 0.3);
        }
      }
      this.renderCosmicStar(ctx, screenX, screenY, size, starAlpha, isActivated, flashProgress);
    }
    if (!this.isAnimating) {
      ctx.font = '16px "Cormorant Garamond", serif';
      ctx.fillStyle = "rgba(255, 220, 180, 0.7)";
      ctx.textAlign = "center";
      ctx.shadowColor = "rgba(255, 180, 80, 0.5)";
      ctx.shadowBlur = 10;
      ctx.fillText(this.data.name, centerScreenX, centerScreenY + this.data.radius + 35);
      ctx.shadowBlur = 0;
    }
  }
  drawGlowingLine(ctx, x1, y1, x2, y2, alpha) {
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = `${this.colors.outerGlow}${alpha * 0.2})`;
    ctx.lineWidth = 12;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = `${this.colors.midAmber}${alpha * 0.4})`;
    ctx.lineWidth = 6;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = `${this.colors.innerGold}${alpha * 0.7})`;
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = `${this.colors.coreWhite}${alpha * 0.9})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
  drawSparkHead(ctx, x, y) {
    const sparkSize = 10;
    const time = Date.now() * 0.01;
    const flicker = 0.85 + Math.sin(time) * 0.15;
    const outerGlow = ctx.createRadialGradient(x, y, 0, x, y, sparkSize * 2.5);
    outerGlow.addColorStop(0, `rgba(255, 160, 60, ${0.8 * flicker})`);
    outerGlow.addColorStop(0.5, `rgba(220, 100, 40, ${0.4 * flicker})`);
    outerGlow.addColorStop(1, "rgba(180, 80, 60, 0)");
    ctx.beginPath();
    ctx.arc(x, y, sparkSize * 2.5, 0, Math.PI * 2);
    ctx.fillStyle = outerGlow;
    ctx.fill();
    const coreGlow = ctx.createRadialGradient(x, y, 0, x, y, sparkSize);
    coreGlow.addColorStop(0, `rgba(255, 255, 250, ${flicker})`);
    coreGlow.addColorStop(0.4, `rgba(255, 230, 150, ${0.9 * flicker})`);
    coreGlow.addColorStop(0.7, `rgba(255, 180, 80, ${0.5 * flicker})`);
    coreGlow.addColorStop(1, "rgba(255, 140, 50, 0)");
    ctx.beginPath();
    ctx.arc(x, y, sparkSize, 0, Math.PI * 2);
    ctx.fillStyle = coreGlow;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, y, sparkSize * 0.25, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${flicker})`;
    ctx.fill();
  }
  renderCosmicStar(ctx, x, y, size, alpha, isActivated, flashProgress) {
    const coronaMultiplier = isActivated ? 1 + flashProgress * 0.6 : 0.5;
    if (isActivated) {
      const outerRadius = size * 6 * coronaMultiplier;
      const outerHaze = ctx.createRadialGradient(x, y, size * 2, x, y, outerRadius);
      outerHaze.addColorStop(0, `${this.colors.outerGlow}${alpha * 0.15})`);
      outerHaze.addColorStop(0.6, `${this.colors.cosmicHaze}${alpha * 0.08})`);
      outerHaze.addColorStop(1, "rgba(180, 140, 100, 0)");
      ctx.beginPath();
      ctx.arc(x, y, outerRadius, 0, Math.PI * 2);
      ctx.fillStyle = outerHaze;
      ctx.fill();
    }
    const amberRadius = size * 4 * coronaMultiplier;
    const amberGlow = ctx.createRadialGradient(x, y, size, x, y, amberRadius);
    amberGlow.addColorStop(0, `${this.colors.midAmber}${alpha * 0.4})`);
    amberGlow.addColorStop(0.6, `${this.colors.outerGlow}${alpha * 0.2})`);
    amberGlow.addColorStop(1, "rgba(220, 160, 60, 0)");
    ctx.beginPath();
    ctx.arc(x, y, amberRadius, 0, Math.PI * 2);
    ctx.fillStyle = amberGlow;
    ctx.fill();
    const goldRadius = size * 2.5 * coronaMultiplier;
    const goldGlow = ctx.createRadialGradient(x, y, 0, x, y, goldRadius);
    goldGlow.addColorStop(0, `${this.colors.innerGold}${alpha * 0.7})`);
    goldGlow.addColorStop(0.5, `${this.colors.midAmber}${alpha * 0.4})`);
    goldGlow.addColorStop(1, "rgba(255, 190, 80, 0)");
    ctx.beginPath();
    ctx.arc(x, y, goldRadius, 0, Math.PI * 2);
    ctx.fillStyle = goldGlow;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, y, size * 0.8, 0, Math.PI * 2);
    ctx.fillStyle = `${this.colors.coreWhite}${Math.min(1, alpha * 1.1)})`;
    ctx.fill();
  }
}

// src/ui/DiscoveriesTab.ts
class DiscoveriesTab {
  listElement;
  countElement;
  discoveries = [];
  constructor() {
    this.listElement = document.getElementById("discoveries-list");
    this.countElement = document.querySelector(".discovery-count");
  }
  addDiscovery(constellation) {
    this.discoveries.push(constellation);
    this.updateCount();
    this.addCard(constellation);
    const toggle = document.getElementById("discoveries-toggle");
    if (toggle) {
      toggle.classList.add("pulse");
      setTimeout(() => toggle.classList.remove("pulse"), 500);
    }
  }
  updateCount() {
    if (this.countElement) {
      this.countElement.textContent = String(this.discoveries.length);
    }
  }
  addCard(constellation) {
    if (!this.listElement)
      return;
    const card = document.createElement("div");
    card.className = "discovery-card";
    card.innerHTML = `
      <h3>${constellation.name}</h3>
      <p>${constellation.description || constellation.latinName || ""}</p>
    `;
    card.style.opacity = "0";
    card.style.transform = "translateY(-20px)";
    this.listElement.prepend(card);
    requestAnimationFrame(() => {
      card.style.transition = "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    });
  }
  getDiscoveries() {
    return this.discoveries;
  }
}

// src/audio/AudioManager.ts
class AudioManager {
  audioContext = null;
  masterGain = null;
  ambientGain = null;
  ambientNodes = [];
  isAmbientPlaying = false;
  initialized = false;
  constructor() {
    this.initOnInteraction();
  }
  initOnInteraction() {
    const initAudio = () => {
      this.ensureInitialized();
      document.removeEventListener("click", initAudio);
      document.removeEventListener("keydown", initAudio);
      document.removeEventListener("mousemove", initAudio);
    };
    document.addEventListener("click", initAudio);
    document.addEventListener("keydown", initAudio);
    document.addEventListener("mousemove", initAudio);
  }
  ensureInitialized() {
    if (this.initialized && this.audioContext) {
      if (this.audioContext.state === "suspended") {
        this.audioContext.resume();
      }
      return true;
    }
    try {
      this.audioContext = new AudioContext;
      this.masterGain = this.audioContext.createGain();
      this.masterGain.gain.value = 0.3;
      this.masterGain.connect(this.audioContext.destination);
      this.ambientGain = this.audioContext.createGain();
      this.ambientGain.gain.value = 0;
      this.ambientGain.connect(this.masterGain);
      this.initialized = true;
      console.log("\uD83D\uDD0A Audio initialized, state:", this.audioContext.state);
      if (this.audioContext.state === "suspended") {
        this.audioContext.resume();
      }
      return true;
    } catch (e) {
      console.warn("Audio initialization failed:", e);
      return false;
    }
  }
  startAmbient() {
    if (this.isAmbientPlaying)
      return;
    if (!this.ensureInitialized() || !this.audioContext || !this.ambientGain)
      return;
    this.isAmbientPlaying = true;
    const frequencies = [55, 82.5, 110, 165];
    const now = this.audioContext.currentTime;
    for (const freq of frequencies) {
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.value = 0.02;
      osc.connect(gain);
      gain.connect(this.ambientGain);
      osc.start();
      this.ambientNodes.push(osc);
    }
    this.ambientGain.gain.linearRampToValueAtTime(0.5, now + 2);
  }
  stopAmbient() {
    if (!this.audioContext || !this.ambientGain)
      return;
    const now = this.audioContext.currentTime;
    this.ambientGain.gain.linearRampToValueAtTime(0, now + 1);
    setTimeout(() => {
      for (const osc of this.ambientNodes) {
        osc.stop();
        osc.disconnect();
      }
      this.ambientNodes = [];
      this.isAmbientPlaying = false;
    }, 1000);
  }
  playDiscoverySound() {
    if (!this.ensureInitialized() || !this.audioContext || !this.masterGain) {
      return;
    }
    const ctx = this.audioContext;
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5];
    const noteDuration = 0.15;
    for (let i = 0;i < notes.length; i++) {
      const freq = notes[i];
      if (!freq)
        continue;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      const startTime = now + i * noteDuration;
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.3, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + noteDuration * 2);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(startTime);
      osc.stop(startTime + noteDuration * 3);
    }
    const finalOsc = ctx.createOscillator();
    const finalGain = ctx.createGain();
    finalOsc.type = "sine";
    finalOsc.frequency.value = 523.25;
    const finalStart = now + notes.length * noteDuration;
    finalGain.gain.setValueAtTime(0, finalStart);
    finalGain.gain.linearRampToValueAtTime(0.4, finalStart + 0.1);
    finalGain.gain.exponentialRampToValueAtTime(0.01, finalStart + 1.5);
    finalOsc.connect(finalGain);
    finalGain.connect(this.masterGain);
    finalOsc.start(finalStart);
    finalOsc.stop(finalStart + 2);
  }
  playStarConnectionSound(index, total) {
    if (!this.ensureInitialized() || !this.audioContext || !this.masterGain) {
      return;
    }
    const ctx = this.audioContext;
    const now = ctx.currentTime;
    const baseFreq = 400;
    const freq = baseFreq + index / total * 400;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.3);
  }
}

// src/data/constellations.ts
var SKY_WIDTH = 4000;
var SKY_HEIGHT = 2000;
var CONSTELLATIONS = [
  {
    id: "orion",
    name: "Orion",
    latinName: "Orion",
    description: "The Hunter - One of the most recognizable constellations in the night sky.",
    centerX: 800,
    centerY: 600,
    radius: 200,
    discovered: false,
    stars: [
      { id: "betelgeuse", x: 700, y: 450, brightness: 1 },
      { id: "bellatrix", x: 900, y: 470, brightness: 0.85 },
      { id: "alnitak", x: 770, y: 600, brightness: 0.8 },
      { id: "alnilam", x: 800, y: 590, brightness: 0.85 },
      { id: "mintaka", x: 830, y: 580, brightness: 0.8 },
      { id: "saiph", x: 720, y: 750, brightness: 0.75 },
      { id: "rigel", x: 880, y: 770, brightness: 0.95 }
    ],
    connections: [
      [0, 1],
      [0, 2],
      [1, 4],
      [2, 3],
      [3, 4],
      [2, 5],
      [4, 6]
    ]
  },
  {
    id: "ursa-major",
    name: "Ursa Major",
    latinName: "Ursa Major",
    description: "The Great Bear - Contains the famous Big Dipper asterism.",
    centerX: 1800,
    centerY: 400,
    radius: 180,
    discovered: false,
    stars: [
      { id: "dubhe", x: 1650, y: 320, brightness: 0.9 },
      { id: "merak", x: 1680, y: 420, brightness: 0.85 },
      { id: "phecda", x: 1780, y: 450, brightness: 0.8 },
      { id: "megrez", x: 1820, y: 380, brightness: 0.7 },
      { id: "alioth", x: 1900, y: 360, brightness: 0.85 },
      { id: "mizar", x: 1970, y: 340, brightness: 0.9 },
      { id: "alkaid", x: 2050, y: 380, brightness: 0.88 }
    ],
    connections: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0],
      [3, 4],
      [4, 5],
      [5, 6]
    ]
  },
  {
    id: "cassiopeia",
    name: "Cassiopeia",
    latinName: "Cassiopeia",
    description: "The Queen - Easily recognized by its distinctive W shape.",
    centerX: 2800,
    centerY: 300,
    radius: 140,
    discovered: false,
    stars: [
      { id: "schedar", x: 2650, y: 280, brightness: 0.9 },
      { id: "caph", x: 2720, y: 350, brightness: 0.85 },
      { id: "gamma-cas", x: 2800, y: 260, brightness: 0.95 },
      { id: "ruchbah", x: 2880, y: 340, brightness: 0.8 },
      { id: "segin", x: 2950, y: 290, brightness: 0.75 }
    ],
    connections: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4]
    ]
  },
  {
    id: "cygnus",
    name: "Cygnus",
    latinName: "Cygnus",
    description: "The Swan - Also known as the Northern Cross.",
    centerX: 1200,
    centerY: 1200,
    radius: 160,
    discovered: false,
    stars: [
      { id: "deneb", x: 1200, y: 1050, brightness: 1 },
      { id: "sadr", x: 1200, y: 1180, brightness: 0.85 },
      { id: "gienah", x: 1100, y: 1220, brightness: 0.75 },
      { id: "delta-cyg", x: 1300, y: 1230, brightness: 0.78 },
      { id: "albireo", x: 1200, y: 1350, brightness: 0.8 }
    ],
    connections: [
      [0, 1],
      [1, 4],
      [1, 2],
      [1, 3]
    ]
  },
  {
    id: "lyra",
    name: "Lyra",
    latinName: "Lyra",
    description: "The Lyre - Home to Vega, one of the brightest stars.",
    centerX: 2400,
    centerY: 900,
    radius: 100,
    discovered: false,
    stars: [
      { id: "vega", x: 2400, y: 820, brightness: 1 },
      { id: "sulafat", x: 2380, y: 920, brightness: 0.7 },
      { id: "sheliak", x: 2420, y: 930, brightness: 0.72 },
      { id: "delta-lyr", x: 2360, y: 990, brightness: 0.65 },
      { id: "zeta-lyr", x: 2440, y: 980, brightness: 0.68 }
    ],
    connections: [
      [0, 1],
      [0, 2],
      [1, 2],
      [1, 3],
      [2, 4],
      [3, 4]
    ]
  },
  {
    id: "scorpius",
    name: "Scorpius",
    latinName: "Scorpius",
    description: "The Scorpion - Features the red supergiant Antares.",
    centerX: 3200,
    centerY: 1400,
    radius: 200,
    discovered: false,
    stars: [
      { id: "antares", x: 3100, y: 1300, brightness: 1 },
      { id: "graffias", x: 3000, y: 1200, brightness: 0.75 },
      { id: "dschubba", x: 3050, y: 1250, brightness: 0.8 },
      { id: "sigma-sco", x: 3150, y: 1380, brightness: 0.7 },
      { id: "tau-sco", x: 3200, y: 1450, brightness: 0.72 },
      { id: "sargas", x: 3280, y: 1520, brightness: 0.78 },
      { id: "shaula", x: 3350, y: 1580, brightness: 0.85 }
    ],
    connections: [
      [1, 2],
      [2, 0],
      [0, 3],
      [3, 4],
      [4, 5],
      [5, 6]
    ]
  }
];

// src/game/Game.ts
class Game {
  canvas;
  ctx;
  telescopeOverlay;
  state;
  starField;
  telescope;
  constellations;
  discoveriesTab;
  audioManager;
  lastFrameTime = 0;
  animationFrameId = 0;
  constructor(canvas, telescopeOverlay) {
    this.canvas = canvas;
    this.telescopeOverlay = telescopeOverlay;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Could not get 2D context");
    }
    this.ctx = ctx;
    this.state = {
      running: false,
      mouseX: window.innerWidth / 2,
      mouseY: window.innerHeight / 2,
      viewX: SKY_WIDTH / 2,
      viewY: SKY_HEIGHT / 2,
      discoveredCount: 0
    };
    this.starField = new StarField(SKY_WIDTH, SKY_HEIGHT);
    this.telescope = new Telescope(telescopeOverlay);
    this.constellations = CONSTELLATIONS.map((data) => new Constellation(data));
    this.discoveriesTab = new DiscoveriesTab;
    this.audioManager = new AudioManager;
    this.setupEventListeners();
    this.resizeCanvas();
  }
  setupEventListeners() {
    window.addEventListener("mousemove", (e) => {
      this.state.mouseX = e.clientX;
      this.state.mouseY = e.clientY;
    });
    window.addEventListener("resize", () => this.resizeCanvas());
    const toggle = document.getElementById("discoveries-toggle");
    const panel = document.getElementById("discoveries-panel");
    if (toggle && panel) {
      toggle.addEventListener("click", () => {
        panel.classList.toggle("collapsed");
      });
    }
  }
  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  start() {
    this.state.running = true;
    this.lastFrameTime = performance.now();
    this.audioManager.startAmbient();
    this.gameLoop();
  }
  stop() {
    this.state.running = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.audioManager.stopAmbient();
  }
  gameLoop = () => {
    if (!this.state.running)
      return;
    const currentTime = performance.now();
    const deltaTime = (currentTime - this.lastFrameTime) / 1000;
    this.lastFrameTime = currentTime;
    this.update(deltaTime);
    this.render();
    this.animationFrameId = requestAnimationFrame(this.gameLoop);
  };
  update(deltaTime) {
    this.telescope.update(this.state.mouseX, this.state.mouseY, deltaTime);
    const viewOffset = this.telescope.getViewOffset();
    const viewSpeedX = viewOffset.x * 0.5;
    const viewSpeedY = viewOffset.y * 0.5;
    this.state.viewX += viewSpeedX * deltaTime;
    this.state.viewY += viewSpeedY * deltaTime;
    const margin = 400;
    this.state.viewX = Math.max(margin, Math.min(SKY_WIDTH - margin, this.state.viewX));
    this.state.viewY = Math.max(margin, Math.min(SKY_HEIGHT - margin, this.state.viewY));
    this.checkConstellationDiscovery(deltaTime);
    for (const constellation of this.constellations) {
      constellation.update(deltaTime);
    }
  }
  checkConstellationDiscovery(deltaTime) {
    const telescopePos = this.telescope.getPosition();
    const telescopeRadius = this.telescope.getRadius();
    const skyX = this.state.viewX;
    const skyY = this.state.viewY;
    for (const constellation of this.constellations) {
      if (constellation.isDiscovered())
        continue;
      const data = constellation.getData();
      const distance = Math.hypot(skyX - data.centerX, skyY - data.centerY);
      if (distance < data.radius + telescopeRadius * 0.3) {
        const discovered = constellation.addHoverTime(deltaTime);
        if (discovered) {
          this.onConstellationDiscovered(constellation);
        }
      } else {
        constellation.resetHoverTime();
      }
    }
  }
  onConstellationDiscovered(constellation) {
    const data = constellation.getData();
    this.state.discoveredCount++;
    constellation.setOnConnectionRevealed((index, total) => {
      this.audioManager.playStarConnectionSound(index, total);
    });
    constellation.setOnAnimationComplete(() => {
      this.audioManager.playDiscoverySound();
      this.discoveriesTab.addDiscovery(data);
      this.showDiscoveryNotification(data.name);
    });
  }
  showDiscoveryNotification(name) {
    const notification = document.getElementById("discovery-notification");
    const nameEl = notification?.querySelector(".constellation-name");
    if (notification && nameEl) {
      notification.classList.remove("hidden");
      nameEl.textContent = name;
      requestAnimationFrame(() => {
        notification.classList.add("visible");
      });
      setTimeout(() => {
        notification.classList.remove("visible");
        setTimeout(() => {
          notification.classList.add("hidden");
        }, 500);
      }, 3000);
    }
  }
  render() {
    const { ctx, canvas } = this;
    const { viewX, viewY } = this.state;
    ctx.fillStyle = "#050510";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const telescopePos = this.telescope.getPosition();
    const telescopeRadius = this.telescope.getRadius();
    ctx.save();
    ctx.beginPath();
    ctx.arc(telescopePos.x, telescopePos.y, telescopeRadius, 0, Math.PI * 2);
    ctx.clip();
    this.starField.render(ctx, viewX, viewY, canvas.width, canvas.height, telescopePos);
    for (const constellation of this.constellations) {
      constellation.render(ctx, viewX, viewY, canvas.width, canvas.height);
    }
    ctx.restore();
    this.renderBackgroundStars();
  }
  renderBackgroundStars() {
    const { ctx, canvas } = this;
    const telescopePos = this.telescope.getPosition();
    const telescopeRadius = this.telescope.getRadius();
    const bgStars = this.starField.getBackgroundStars();
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.arc(telescopePos.x, telescopePos.y, telescopeRadius + 30, 0, Math.PI * 2, true);
    ctx.clip();
    for (const star of bgStars) {
      const screenX = star.x / SKY_WIDTH * canvas.width;
      const screenY = star.y / SKY_HEIGHT * canvas.height;
      ctx.beginPath();
      ctx.arc(screenX, screenY, star.size * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 210, 255, ${star.brightness * 0.3})`;
      ctx.fill();
    }
    ctx.restore();
  }
}

// src/main.ts
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("sky-canvas");
  const telescopeOverlay = document.getElementById("telescope-overlay");
  const startScreen = document.getElementById("start-screen");
  const startButton = document.getElementById("start-button");
  if (!canvas || !telescopeOverlay) {
    console.error("Required elements not found");
    return;
  }
  const game = new Game(canvas, telescopeOverlay);
  startButton?.addEventListener("click", () => {
    startScreen.classList.add("hidden");
    game.start();
  });
});

//# debugId=3E83BDCE67DBE22B64756E2164756E21
//# sourceMappingURL=main.js.map
