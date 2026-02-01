document.addEventListener('DOMContentLoaded', () => {
    const grassland = document.getElementById('grassland');
    const scoreElement = document.getElementById('score');
    const toast = document.getElementById('toast');
    const itemCountElement = document.getElementById('item-count-display');
    // Modals
    const redPacketModal = document.getElementById('red-packet-modal');
    // Using specific IDs for close buttons now
    const redPacketCloseBtn = document.getElementById('red-packet-close');
    const claimBtn = document.getElementById('claim-btn');

    const wechatItemModal = document.getElementById('wechat-item-modal');
    const wechatItemCloseBtn = document.getElementById('wechat-item-close');
    const wechatClaimBtn = document.getElementById('wechat-claim-btn');

    const timerElement = document.getElementById('timer');
    const clockProgress = document.querySelector('.clock-progress');
    const gameOverModal = document.getElementById('game-over-modal');
    const finalScoreElement = document.getElementById('final-score');
    const finalWechatCountElement = document.getElementById('final-wechat-count');
    const restartBtn = document.getElementById('restart-btn');
    const gameOverCloseBtn = document.getElementById('game-over-close');
    const peopleListElement = document.getElementById('people-list');

    // Restart Prompt Modal
    const restartPromptModal = document.getElementById('restart-prompt-modal');
    const restartPromptBtn = document.getElementById('restart-prompt-btn');

    // Countdown elements
    const countdownOverlay = document.getElementById('countdown-overlay');
    const countdownNumber = document.getElementById('countdown-number');

    // People data - avatars, nicknames, and WeChat IDs
    const peopleData = [
        {
            avatar: "https://zuju20251015.oss-cn-beijing.aliyuncs.com/upload/yang/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_2026-02-01_120631_275.jpg",
            name: "Test001",
            wechat: "wexin001",
            unlocked: false
        },
        {
            avatar: "https://zuju20251015.oss-cn-beijing.aliyuncs.com/upload/yang/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_2026-02-01_120621_958.jpg",
            name: "Test002",
            wechat: "Wexin002",
            unlocked: false
        },
        {
            avatar: "https://zuju20251015.oss-cn-beijing.aliyuncs.com/upload/yang/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_2026-02-01_120615_128.jpg",
            name: "Test003",
            wechat: "Wexin003",
            unlocked: false
        },
        {
            avatar: "https://zuju20251015.oss-cn-beijing.aliyuncs.com/upload/yang/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_2026-02-01_120604_222.jpg",
            name: "Test004",
            wechat: "Wexin004",
            unlocked: false
        },
        {
            avatar: "https://zuju20251015.oss-cn-beijing.aliyuncs.com/upload/yang/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_2026-02-01_120557_022.jpg",
            name: "Test005",
            wechat: "Wexin005",
            unlocked: false
        },
        {
            avatar: "https://zuju20251015.oss-cn-beijing.aliyuncs.com/upload/yang/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_2026-02-01_120549_145.jpg",
            name: "Test006",
            wechat: "Wexin006",
            unlocked: false
        },
        {
            avatar: "https://zuju20251015.oss-cn-beijing.aliyuncs.com/upload/yang/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_2026-02-01_120540_995.jpg",
            name: "Test007",
            wechat: "Wexin007",
            unlocked: false
        },
        {
            avatar: "https://zuju20251015.oss-cn-beijing.aliyuncs.com/upload/yang/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_2026-02-01_120525_410.jpg",
            name: "Test008",
            wechat: "Wexin008",
            unlocked: false
        },
        {
            avatar: "https://zuju20251015.oss-cn-beijing.aliyuncs.com/upload/yang/%E5%A4%B4%E5%83%8F.jpg",
            name: "test009",
            wechat: "wexin009",
            unlocked: false
        }
    ];

    let score = 0;
    let wechatItemCount = 0;
    let imageClickCounts = {};
    let timeLeft = 60;
    let timerInterval;
    let isGameOver = false;
    let isPaused = false;

    function startTimer() {
        // Reset timer
        timeLeft = 60;
        timerElement.textContent = `${timeLeft}s`;
        if (clockProgress) {
            clockProgress.style.strokeDashoffset = 0;
        }
        isGameOver = false;
        isPaused = false;

        startTimerLoop();
    }

    function startTimerLoop() {
        // Clear existing interval if any
        if (timerInterval) clearInterval(timerInterval);

        const circumference = 113; // 2 * PI * 18

        timerInterval = setInterval(() => {
            if (isPaused) return;

            timeLeft--;
            timerElement.textContent = `${timeLeft}s`;

            // Update clock progress
            if (clockProgress) {
                const offset = circumference - (timeLeft / 60) * circumference;
                clockProgress.style.strokeDashoffset = offset;
            }

            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);
    }

    function pauseTimer() {
        isPaused = true;
    }

    function resumeTimer() {
        isPaused = false;
    }

    const flashImages = [
        "https://zuju20251015.oss-cn-beijing.aliyuncs.com/upload/yang/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_2026-02-01_120631_275.jpg",
        "https://zuju20251015.oss-cn-beijing.aliyuncs.com/upload/yang/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_2026-02-01_120621_958.jpg",
        "https://zuju20251015.oss-cn-beijing.aliyuncs.com/upload/yang/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_2026-02-01_120615_128.jpg",
        "https://zuju20251015.oss-cn-beijing.aliyuncs.com/upload/yang/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_2026-02-01_120604_222.jpg",
        "https://zuju20251015.oss-cn-beijing.aliyuncs.com/upload/yang/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_2026-02-01_120557_022.jpg",
        "https://zuju20251015.oss-cn-beijing.aliyuncs.com/upload/yang/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_2026-02-01_120549_145.jpg",
        "https://zuju20251015.oss-cn-beijing.aliyuncs.com/upload/yang/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_2026-02-01_120540_995.jpg",
        "https://zuju20251015.oss-cn-beijing.aliyuncs.com/upload/yang/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_2026-02-01_120525_410.jpg",
        "https://zuju20251015.oss-cn-beijing.aliyuncs.com/upload/yang/%E5%A4%B4%E5%83%8F.jpg"
    ];

    // Modal Event Listeners
    if (redPacketCloseBtn) {
        redPacketCloseBtn.addEventListener('click', hideRedPacketModal);
    }

    if (wechatItemCloseBtn) {
        wechatItemCloseBtn.addEventListener('click', hideWechatItemModal);
    }

    if (claimBtn) {
        claimBtn.addEventListener('click', () => {
            hideRedPacketModal();
            // Optional: Add score or special effect
            score += 10;
            scoreElement.textContent = `已拍马屁人数: ${Object.keys(imageClickCounts).length}`;
            showToast("红包领取成功！正在跳转...");

            // Redirect to the red packet URL
            setTimeout(() => {
                window.location.href = 'https://yb.tencent.com/fes/red/claim?signature=3984168b467169e0b7d40708890d8b92c1495c1579d6a533ecdde493645dba8c&red_packet_id=27002e9a8f4843f8a85a9700fccfece4&yb_use_wechat_download_page=1';
            }, 500);
        });
    }

    // wechatClaimBtn removed

    if (restartBtn) {
        restartBtn.addEventListener('click', restartGame);
    }

    if (gameOverCloseBtn) {
        gameOverCloseBtn.addEventListener('click', () => {
            gameOverModal.classList.add('hidden');
            // 显示重新进入游戏弹窗
            restartPromptModal.classList.remove('hidden');
        });
    }

    // Restart Prompt Button - restart the game
    if (restartPromptBtn) {
        restartPromptBtn.addEventListener('click', () => {
            restartPromptModal.classList.add('hidden');
            restartGame();
        });
    }

    // Close modal if clicking outside content
    window.addEventListener('click', (e) => {
        if (e.target === redPacketModal) {
            hideRedPacketModal();
        }
        if (e.target === wechatItemModal) {
            hideWechatItemModal();
        }
        // 点击遮罩层也可以关闭重启提示弹窗并重启游戏
        if (e.target === restartPromptModal) {
            restartPromptModal.classList.add('hidden');
            restartGame();
        }
    });

    function showRedPacketModal() {
        redPacketModal.classList.remove('hidden');
        pauseTimer();
    }

    function hideRedPacketModal() {
        redPacketModal.classList.add('hidden');
        resumeTimer();
    }

    function showWechatItemModal() {
        wechatItemModal.classList.remove('hidden');
        pauseTimer();

        // Increment count immediately when found
        wechatItemCount++;
        score += 20; // Add score immediately since button is removed
        scoreElement.textContent = `已拍马屁人数: ${Object.keys(imageClickCounts).length}`;

        if (itemCountElement) {
            itemCountElement.textContent = `🔓 道具: ${wechatItemCount}`;
            // Animation
            itemCountElement.style.transform = 'scale(1.3)';
            setTimeout(() => {
                itemCountElement.style.transform = 'scale(1)';
            }, 200);
        }
    }

    function hideWechatItemModal() {
        wechatItemModal.classList.add('hidden');
        resumeTimer();
    }

    // Create horses
    const numberOfHorses = 15;

    for (let i = 0; i < numberOfHorses; i++) {
        createHorse();
    }

    // Start white horse spawner
    startWhiteHorseSpawner();

    function startWhiteHorseSpawner() {
        if (isGameOver) return;

        // Random interval between 5 and 15 seconds
        const interval = 5000 + Math.random() * 10000;

        setTimeout(() => {
            // Only spawn if there isn't one already (or maybe allow a couple, but let's stick to 1 to avoid chaos)
            if (document.querySelectorAll('.white-horse').length === 0) {
                spawnWhiteHorse();
            }
            startWhiteHorseSpawner(); // Schedule next spawn check
        }, interval);
    }

    function generateNormalHorse() {
        const w = 32;
        const h = 24;
        const frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = w * frames;
        canvas.height = h;
        const ctx = canvas.getContext('2d');

        // Palette (Shared)
        const C = {
            _: null,
            b: '#A0522D', // Sienna (Body)
            d: '#8B4513', // SaddleBrown (Darker)
            s: '#CD853F', // Peru (Highlight)
            m: '#2F1B10', // Dark Mane
            h: '#111111', // Hoof
            w: '#FFFFFF', // Eye White
            p: '#000000'  // Pupil
        };

        const frame1 = [ // Gathered (Legs under)
            "................................",
            ".......................mm.......",
            ".....................mmddbmm....",
            "....................mddbbbbm....",
            "...................mddbbbbbb....",
            "..................mddbbbbbbb....",
            ".........dddddddddmmdbbbbbbb....",
            "........dbbbbbbbbbbbbbbbbbbd....",
            ".......dbbbbbbbbbbbbbbbbbbbd....",
            ".......dbbbbbbbbbbbbbbbbbbbd....",
            ".......dbbbbbbbbbbbbbbbbbbbd....",
            ".......dbbbbbbbbbbbbbbbbbbd.....",
            "........dbbbbbbbbbbbbbbbbd......",
            ".........dbbbbbbbbbbbbbbd.......",
            "..........dbbbbbbbbbbbbd........",
            "...........dbbbbbbbbbbd.........",
            "...........dbbb.dbbbd...........",
            "..........dbbb...dbbb...........",
            ".........dbbb.....dbb...........",
            "........dbbb......dbb...........",
            ".......hhbb.......bbhh..........",
            ".......hhhh.......hhhh..........",
            "................................",
            "................................"
        ];

        const frame2 = [ // Kicking Off (Back legs back, Front forward)
            "................................",
            ".......................mm.......",
            ".....................mmddbmm....",
            "....................mddbbbbm....",
            "...................mddbbbbbb....",
            "..................mddbbbbbbb....",
            ".........dddddddddmmdbbbbbbb....",
            "........dbbbbbbbbbbbbbbbbbbd....",
            ".......dbbbbbbbbbbbbbbbbbbbd....",
            ".......dbbbbbbbbbbbbbbbbbbbd....",
            ".......dbbbbbbbbbbbbbbbbbbbd....",
            ".......dbbbbbbbbbbbbbbbbbbd.....",
            "........dbbbbbbbbbbbbbbbbd......",
            ".........dbbbbbbbbbbbbbbd.......",
            "..........dbbbbbbbbbbbbd........",
            "...........dbbbbbbbbbbd.........",
            "..........dbb.....dbbb..........",
            ".........dbb.......dbbb.........",
            "........dbb.........dbbb........",
            ".......dbb...........dbbb.......",
            "......hhb.............bhh.......",
            "......hhhh............hhhh......",
            "................................",
            "................................"
        ];

        const frame3 = [ // Extended (Flying)
            "................................",
            ".......................mm.......",
            ".....................mmddbmm....",
            "....................mddbbbbm....",
            "...................mddbbbbbb....",
            "..................mddbbbbbbb....",
            ".........dddddddddmmdbbbbbbb....",
            "........dbbbbbbbbbbbbbbbbbbd....",
            ".......dbbbbbbbbbbbbbbbbbbbd....",
            ".......dbbbbbbbbbbbbbbbbbbbd....",
            ".......dbbbbbbbbbbbbbbbbbbbd....",
            ".......dbbbbbbbbbbbbbbbbbbd.....",
            "........dbbbbbbbbbbbbbbbbd......",
            ".........dbbbbbbbbbbbbbbd.......",
            "..........dbbbbbbbbbbbbd........",
            "...........dbbbbbbbbbbd.........",
            ".........dbbb......dbbb.........",
            "........dbbb........dbbb........",
            ".......dbbb..........dbbb.......",
            "......hhb.............bhh.......",
            "......hhhh............hhhh......",
            "................................",
            "................................",
            "................................"
        ];

        const frame4 = [ // Landing (Front legs landing)
            "................................",
            ".......................mm.......",
            ".....................mmddbmm....",
            "....................mddbbbbm....",
            "...................mddbbbbbb....",
            "..................mddbbbbbbb....",
            ".........dddddddddmmdbbbbbbb....",
            "........dbbbbbbbbbbbbbbbbbbd....",
            ".......dbbbbbbbbbbbbbbbbbbbd....",
            ".......dbbbbbbbbbbbbbbbbbbbd....",
            ".......dbbbbbbbbbbbbbbbbbbbd....",
            ".......dbbbbbbbbbbbbbbbbbbd.....",
            "........dbbbbbbbbbbbbbbbbd......",
            ".........dbbbbbbbbbbbbbbd.......",
            "..........dbbbbbbbbbbbbd........",
            "...........dbbbbbbbbbbd.........",
            "............dbbb..dbbb..........",
            ".............dbb..dbb...........",
            ".............dbb..dbb...........",
            ".............dbb..dbb...........",
            "............hhb...bhh...........",
            "............hhhh..hhhh..........",
            "................................",
            "................................"
        ];

        const frameMaps = [frame1, frame2, frame3, frame4];

        frameMaps.forEach((map, frameIndex) => {
            const offsetX = frameIndex * w;
            map.forEach((row, y) => {
                for (let x = 0; x < row.length; x++) {
                    const char = row[x];
                    if (C[char]) {
                        ctx.fillStyle = C[char];
                        ctx.fillRect(offsetX + x, y, 1, 1);
                    }
                    // Add Eye detail if in head area
                    if (x === 24 && y === 4) { // Approximate eye position
                        ctx.fillStyle = C.w;
                        ctx.fillRect(offsetX + x, y, 1, 1);
                        ctx.fillStyle = C.p;
                        ctx.fillRect(offsetX + x + 1, y, 1, 1); // Pupil
                    }
                }
            });
        });

        return canvas.toDataURL();
    }

    // function generateFunnyHorse() REMOVED as we now use a GIF

    function getHorseContent(isFunny = false) {
        const horseContent = document.createElement('div');
        horseContent.className = 'horse-content';

        if (isFunny) {
            // Use the GIF provided by the user
            const gifUrl = "https://zuju20251015.oss-cn-beijing.aliyuncs.com/upload/yang/%E9%A9%AC.gif";
            horseContent.style.backgroundImage = `url('${gifUrl}')`;

            // Override sprite animation styles for GIF
            horseContent.style.backgroundSize = 'contain';
            horseContent.style.backgroundPosition = 'center';
            horseContent.style.animation = 'none'; // Disable sprite animation
            horseContent.style.transform = 'scaleX(1)'; // Face left (original GIF direction)
        } else {
            // White horse GIF
            const gifUrl = "https://zuju20251015.oss-cn-beijing.aliyuncs.com/upload/yang/%E7%99%BD%E9%A9%AC.gif";
            horseContent.style.backgroundImage = `url('${gifUrl}')`;

            // Override sprite animation styles for GIF
            horseContent.style.backgroundSize = 'contain';
            horseContent.style.backgroundPosition = 'center';
            horseContent.style.animation = 'none'; // Disable sprite animation
            horseContent.style.transform = 'scaleX(1)'; // Assume same direction as brown horse GIF
        }

        return horseContent;
    }

    function spawnWhiteHorse() {
        if (isGameOver) return;

        const horse = document.createElement('div');
        horse.className = 'horse white-horse running-across';

        // Random vertical position (perspective)
        const minTop = 35;
        const maxTop = 85;
        const top = minTop + Math.random() * (maxTop - minTop);

        horse.style.top = `${top}%`;
        // Initial left is handled by CSS animation (starts at 110%)
        horse.style.left = '110%';

        horse.style.zIndex = Math.floor(top * 10) + 50; // Ensure it's visible but respects depth

        const horseContent = getHorseContent(false); // Normal for white horse
        horse.appendChild(horseContent);

        // Butt interaction area for White Horse
        const butt = document.createElement('div');
        butt.className = 'butt-area';
        butt.title = '点击领取红包';

        let hasBeenClicked = false; // Track if this horse has been clicked

        butt.addEventListener('click', (e) => {
            e.stopPropagation();

            if (hasBeenClicked) {
                showToast("这匹马已经被拍过了！");
                return;
            }

            hasBeenClicked = true;
            butt.style.cursor = 'default'; // Visual feedback

            playCoinSound();
            showRandomImage(e.clientX, e.clientY);

            // Randomly trigger either Red Packet or WeChat Item
            if (Math.random() < 0.5) {
                showRedPacketModal();
            } else {
                showWechatItemModal();
            }

            // Optional: Also make it run away or disappear?
            // For now, just show modal. It continues its running-across animation.
        });

        // Reset click status when horse reappears (animation loops)
        horse.addEventListener('animationiteration', () => {
            hasBeenClicked = false;
            butt.style.cursor = 'pointer';
        });

        horse.appendChild(butt);

        grassland.appendChild(horse);

        // Remove after animation completes (4s + buffer)
        // REMOVED auto-deletion so it loops infinitely
        /*
        setTimeout(() => {
            if (horse.parentNode) {
                horse.parentNode.removeChild(horse);
            }
        }, 4500);
        */
    }

    // Sound effect URLs
    const soundEffects = [
        "https://zuju20251015.oss-cn-beijing.aliyuncs.com/upload/yang/%E5%B0%8F%E7%98%AA%E4%B8%89.aac",
        "https://zuju20251015.oss-cn-beijing.aliyuncs.com/upload/yang/%E6%88%91%E8%A6%81%E7%87%95%E7%89%8C.aac",
        "https://zuju20251015.oss-cn-beijing.aliyuncs.com/upload/yang/%E7%89%8C%E6%B2%A1%E6%9C%89%E9%97%AE%E9%A2%98.aac",
        "https://zuju20251015.oss-cn-beijing.aliyuncs.com/upload/yang/%E7%BB%99%E6%88%91%E6%93%A6%E7%9A%AE%E9%9E%8B.aac"
    ];

    function createHorse() {
        const horse = document.createElement('div');
        horse.className = 'horse';

        // Random position on the grass
        const minTop = 35;
        const maxTop = 85;
        const top = minTop + Math.random() * (maxTop - minTop);

        // Random speed (duration) between 8s and 20s
        const duration = 8 + Math.random() * 12;

        // Random start position (negative delay) so they are spread out
        const delay = -Math.random() * duration;

        horse.style.top = `${top}%`;
        horse.style.zIndex = Math.floor(top * 10);

        // Apply random animation properties
        horse.style.animationDuration = `${duration}s`;
        horse.style.animationDelay = `${delay}s`;

        // Use GIF instead of emoji
        const horseContent = getHorseContent(true); // Funny for brown horse
        horse.appendChild(horseContent);


        // Butt interaction area
        const butt = document.createElement('div');
        butt.className = 'butt-area';
        butt.title = '点击拍马屁';

        butt.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent bubbling if necessary
            patButt(e.clientX, e.clientY);
            runAway(horse);
        });

        horse.appendChild(butt);
        grassland.appendChild(horse);
    }

    function runAway(horse) {
        // Play the specific running sound
        playRunningSound();

        // Add running class
        horse.classList.add('running');

        // Remove after animation and create a new one
        setTimeout(() => {
            if (horse.parentNode) {
                horse.parentNode.removeChild(horse);
            }
            // Respawn a new horse to maintain population
            setTimeout(() => {
                createHorse();
            }, 500);
        }, 1500); // Matches animation duration
    }

    function playRunningSound() {
        const audio = new Audio('https://zuju20251015.oss-cn-beijing.aliyuncs.com/upload/yang/1%E6%9C%8831%E6%97%A5.aac');
        audio.play().catch(e => console.error("Audio play failed:", e));
    }

    function playCoinSound() {
        const audio = new Audio('https://zuju20251015.oss-cn-beijing.aliyuncs.com/upload/yang/%E9%87%91%E5%B8%81.aac');
        audio.play().catch(e => console.error("Coin audio play failed:", e));
    }

    // Audio Context
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    function playSlapSound() {
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const t = audioCtx.currentTime;

        // Noise buffer for "slap" texture
        const bufferSize = audioCtx.sampleRate * 0.1; // 0.1 seconds
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = audioCtx.createBufferSource();
        noise.buffer = buffer;

        // Filter to make it sound more like skin/flesh
        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1000, t);

        // Envelope for short percussive sound
        const gain = audioCtx.createGain();
        gain.gain.setValueAtTime(1, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);

        noise.start(t);
        noise.stop(t + 0.1);
    }

    function playNeigh() {
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        const t = audioCtx.currentTime;

        // Carrier oscillator (the main pitch)
        const osc = audioCtx.createOscillator();
        osc.type = 'sawtooth';

        // Pitch envelope: start high, drop down
        osc.frequency.setValueAtTime(1200, t);
        osc.frequency.exponentialRampToValueAtTime(600, t + 0.8);

        // LFO for vibrato (the "neigh" wobble)
        const lfo = audioCtx.createOscillator();
        lfo.frequency.value = 10; // 10 Hz wobble

        const lfoGain = audioCtx.createGain();
        lfoGain.gain.value = 100; // Modulation depth

        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);

        // Gain envelope (volume)
        const gain = audioCtx.createGain();
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.3, t + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.8);

        // Filter to soften the sawtooth
        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 3000;

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(t);
        lfo.start(t);
        osc.stop(t + 0.8);
        lfo.stop(t + 0.8);
    }

    function playGallop() {
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        const t = audioCtx.currentTime;
        const duration = 1.5; // Match animation duration
        const tempo = 0.15; // Time between beats in a triplet

        // Create a noise buffer for hoofbeats
        const bufferSize = audioCtx.sampleRate * 0.05; // 50ms click
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * 0.5; // Softer noise
        }

        // Schedule triplets: 1-2-3... 1-2-3...
        // Rhythm pattern: beat, beat, beat, pause
        for (let time = 0; time < duration; time += 0.4) {
            scheduleHoofBeat(t + time, buffer);
            scheduleHoofBeat(t + time + 0.1, buffer);
            scheduleHoofBeat(t + time + 0.2, buffer);
        }
    }

    function scheduleHoofBeat(time, buffer) {
        const source = audioCtx.createBufferSource();
        source.buffer = buffer;

        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 600; // Muffled thud

        const gain = audioCtx.createGain();
        gain.gain.setValueAtTime(0.5, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.05);

        source.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);

        source.start(time);
        source.stop(time + 0.05);
    }

    function patButt(x, y) {
        // 先显示随机头像（这会更新 imageClickCounts）
        showRandomImage(x, y);

        // 统计去重后的人数
        const uniqueCount = Object.keys(imageClickCounts).length;
        scoreElement.textContent = `已拍马屁人数: ${uniqueCount}`;

        // Show visual feedback at click location
        showFeedback(x, y);

        // Show toast
        showToast();

        // Play sound effect
        playRandomSound();
    }

    function playRandomSound() {
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const randomSound = soundEffects[Math.floor(Math.random() * soundEffects.length)];
        const audio = new Audio(randomSound);
        audio.play().catch(e => console.error("Error playing sound:", e));
    }

    function showFeedback(x, y) {
        const feedback = document.createElement('div');
        feedback.textContent = '👋 啪!';
        feedback.style.position = 'absolute';
        feedback.style.left = `${x}px`;
        feedback.style.top = `${y}px`;
        feedback.style.fontSize = '24px';
        feedback.style.fontWeight = 'bold';
        feedback.style.color = '#FFF';
        feedback.style.pointerEvents = 'none';
        feedback.style.textShadow = '2px 2px 4px #000';
        feedback.style.zIndex = '1000';
        feedback.style.animation = 'floatUp 1s ease-out forwards';

        // Add animation keyframes dynamically if not present
        if (!document.getElementById('feedback-style')) {
            const style = document.createElement('style');
            style.id = 'feedback-style';
            style.textContent = `
                @keyframes floatUp {
                    0% { transform: translateY(0); opacity: 1; }
                    100% { transform: translateY(-50px); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(feedback);

        setTimeout(() => {
            feedback.remove();
        }, 1000);
    }

    function showRandomImage(x, y) {
        const imgUrl = flashImages[Math.floor(Math.random() * flashImages.length)];

        // Track click count for this image
        imageClickCounts[imgUrl] = (imageClickCounts[imgUrl] || 0) + 1;

        const img = document.createElement('img');
        img.src = imgUrl;
        img.style.position = 'absolute';
        img.style.left = `${x - 40}px`; // Center horizontally (80px width)
        img.style.top = `${y - 120}px`; // Above the click
        img.style.width = '80px';
        img.style.height = '80px';
        img.style.borderRadius = '50%';
        img.style.objectFit = 'cover';
        img.style.border = '2px solid #FFF';
        img.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
        img.style.zIndex = '1001';
        img.style.pointerEvents = 'none';

        img.style.animation = 'flashImage 1.5s ease-out forwards';

        if (!document.getElementById('flash-image-style')) {
            const style = document.createElement('style');
            style.id = 'flash-image-style';
            style.textContent = `
                @keyframes flashImage {
                    0% { transform: scale(0) translateY(0); opacity: 0; }
                    20% { transform: scale(1.2) translateY(-20px); opacity: 1; }
                    40% { transform: scale(1) translateY(-25px); opacity: 1; }
                    80% { opacity: 1; }
                    100% { transform: scale(1) translateY(-60px); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(img);

        setTimeout(() => {
            img.remove();
        }, 1500);
    }

    function showToast(message = null) {
        toast.classList.remove('hidden');
        // Force reflow
        void toast.offsetWidth;
        toast.classList.add('show');

        if (message) {
            toast.textContent = message;
        } else {
            // Random compliment
            const compliments = [
                "拍马屁成功！",
                "这马屁拍得响！",
                "好听！再来一个！",
                "马儿很享受！",
                "高情商！",
                "马到成功！",
                "溜须拍马！"
            ];
            toast.textContent = compliments[Math.floor(Math.random() * compliments.length)];
        }

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.classList.add('hidden');
            }, 300);
        }, 1500);
    }

    function endGame() {
        clearInterval(timerInterval);
        isGameOver = true;

        // Show game over modal
        // 统计去重后的人数
        const uniquePeopleCount = Object.keys(imageClickCounts).length;
        finalScoreElement.innerHTML = `本次已拍马屁人数: <span style="font-size: 1.5em; color: #f0ad4e; font-weight: bold;">${uniquePeopleCount}</span> 人`;

        if (finalWechatCountElement) {
            finalWechatCountElement.innerHTML = `🔓 可用道具: <span style="font-size: 1.3em;">${wechatItemCount}</span> 个`;
        }

        // Generate People List - Only show people that were clicked
        if (peopleListElement) {
            peopleListElement.innerHTML = '';

            // Filter people who were clicked during the game
            const clickedPeople = [];
            peopleData.forEach((person, index) => {
                // Check if this person's avatar was clicked (match avatar URL with flashImages)
                const avatarUrl = person.avatar;
                if (imageClickCounts[avatarUrl] && imageClickCounts[avatarUrl] > 0) {
                    clickedPeople.push({
                        ...person,
                        index: index,
                        clickCount: imageClickCounts[avatarUrl]
                    });
                }
            });

            // If no one was clicked, show a hint
            if (clickedPeople.length === 0) {
                const noClickHint = document.createElement('div');
                noClickHint.className = 'no-items-hint';
                noClickHint.innerHTML = '😢 本轮没有拍到任何马屁<br>再来一次试试吧！';
                peopleListElement.appendChild(noClickHint);
            } else {
                // Sort by click count (descending)
                clickedPeople.sort((a, b) => b.clickCount - a.clickCount);

                clickedPeople.forEach((person) => {
                    const card = document.createElement('div');
                    card.className = 'person-card' + (person.unlocked ? ' unlocked' : '');
                    card.id = `person-card-${person.index}`;

                    const maskedWechat = person.unlocked ? person.wechat : '********';
                    const wechatClass = person.unlocked ? 'visible-wechat' : 'hidden-wechat';

                    card.innerHTML = `
                        <img src="${person.avatar}" class="person-avatar" alt="${person.name}">
                        <div class="person-name">${person.name}</div>
                        <div class="click-count">👋 拍了 <span style="color: #f0ad4e; font-weight: bold;">${person.clickCount}</span> 次</div>
                        <div class="person-wechat ${wechatClass}" id="wechat-${person.index}">
                            ${person.unlocked ? '' : '<span class="unlock-icon">🔒</span>'}
                            ${maskedWechat}
                        </div>
                        ${person.unlocked ? `<button class="copy-btn" onclick="event.stopPropagation(); copyWechat('${person.wechat}')">📋 复制微信号</button>` : ''}
                    `;

                    // Add click handler for unlocking
                    if (!person.unlocked) {
                        card.addEventListener('click', () => unlockPerson(person.index));
                    }

                    peopleListElement.appendChild(card);
                });
            }
        }

        gameOverModal.classList.remove('hidden');
    }

    // Function to unlock a person's WeChat
    function unlockPerson(index) {
        if (wechatItemCount <= 0) {
            showToast('道具不足！继续游戏获取更多道具吧~');
            return;
        }

        if (peopleData[index].unlocked) {
            showToast('该微信号已解锁！');
            return;
        }

        // Consume one item
        wechatItemCount--;
        peopleData[index].unlocked = true;

        // Update item count display
        if (itemCountElement) {
            itemCountElement.textContent = `🔓 道具: ${wechatItemCount}`;
        }

        // Update the final wechat count display in modal
        if (finalWechatCountElement) {
            finalWechatCountElement.innerHTML = `🔓 可用道具: <span style="font-size: 1.3em;">${wechatItemCount}</span> 个`;
        }

        // Update the card UI
        const card = document.getElementById(`person-card-${index}`);
        const wechatDiv = document.getElementById(`wechat-${index}`);

        if (card && wechatDiv) {
            card.classList.add('unlocked');
            wechatDiv.className = 'person-wechat visible-wechat';
            wechatDiv.innerHTML = peopleData[index].wechat;

            // Add copy button
            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-btn';
            copyBtn.textContent = '📋 复制微信号';
            copyBtn.onclick = (e) => {
                e.stopPropagation();
                copyWechat(peopleData[index].wechat);
            };
            card.appendChild(copyBtn);

            // Remove click handler
            card.style.cursor = 'default';
            card.onclick = null;
        }

        showToast(`🎉 解锁成功！微信号: ${peopleData[index].wechat}`);
        playCoinSound();
    }

    // Global function for copying WeChat ID
    window.copyWechat = function (wechatId) {
        copyToClipboard(wechatId, `微信号已复制: ${wechatId}`);
    };

    function restartGame() {
        score = 0;
        wechatItemCount = 0;
        imageClickCounts = {};
        scoreElement.textContent = `拍马屁次数: ${score}`;

        // Reset item count display
        if (itemCountElement) {
            itemCountElement.textContent = `🔓 道具: ${wechatItemCount}`;
        }

        // Reset people unlock status
        resetPeopleData();

        gameOverModal.classList.add('hidden');

        // Remove all horses and recreate them
        grassland.innerHTML = '';
        for (let i = 0; i < numberOfHorses; i++) {
            createHorse();
        }

        // Restart with countdown
        showCountdown(() => {
            startTimer();
        });
    }

    // Reset people data when restarting
    function resetPeopleData() {
        peopleData.forEach(person => {
            person.unlocked = false;
        });
    }

    function copyToClipboard(text, successMessage) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(successMessage || "内容已复制到剪贴板！");
        }).catch(err => {
            console.error('Could not copy text: ', err);
            showToast("复制失败，请手动复制");
        });
    }

    // Countdown function - shows 3, 2, 1, GO! before starting the game
    function showCountdown(callback) {
        const countdownSequence = ['3', '2', '1', '开始!'];
        let index = 0;

        // Show overlay
        countdownOverlay.classList.remove('hidden');
        countdownNumber.classList.remove('go');
        countdownNumber.textContent = countdownSequence[0];

        const countdownInterval = setInterval(() => {
            index++;

            if (index < countdownSequence.length) {
                countdownNumber.textContent = countdownSequence[index];

                // Add special styling for "开始!"
                if (countdownSequence[index] === '开始!') {
                    countdownNumber.classList.add('go');
                }

                // Play tick sound
                playCountdownSound(index);
            } else {
                // Countdown finished
                clearInterval(countdownInterval);

                // Hide overlay with fade
                countdownOverlay.classList.add('hidden');

                // Start the actual game
                if (callback) callback();
            }
        }, 1000);

        // Play first tick sound
        playCountdownSound(0);
    }

    // Sound for countdown
    function playCountdownSound(step) {
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const t = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        if (step === 3) {
            // "GO" sound - higher pitch, longer
            osc.frequency.value = 880;
            gain.gain.setValueAtTime(0.3, t);
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.3);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(t);
            osc.stop(t + 0.3);
        } else {
            // Tick sound
            osc.frequency.value = 440;
            gain.gain.setValueAtTime(0.2, t);
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(t);
            osc.stop(t + 0.15);
        }
    }

    // Start game with countdown on load
    showCountdown(() => {
        startTimer();
    });
});
