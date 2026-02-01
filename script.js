document.addEventListener('DOMContentLoaded', () => {
    const grassland = document.getElementById('grassland');
    const scoreElement = document.getElementById('score');
    const toast = document.getElementById('toast');
    const redPacketModal = document.getElementById('red-packet-modal');
    const closeBtn = document.querySelector('.close-btn');
    const claimBtn = document.getElementById('claim-btn');
    let score = 0;
    
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
    if (closeBtn) {
        closeBtn.addEventListener('click', hideRedPacketModal);
    }
    if (claimBtn) {
        claimBtn.addEventListener('click', () => {
            hideRedPacketModal();
            // Optional: Add score or special effect
            score += 10;
            scoreElement.textContent = `拍马屁次数: ${score}`;
            showToast("红包领取成功！正在跳转...");
            
            // Redirect to the red packet URL
            setTimeout(() => {
                window.location.href = 'https://yb.tencent.com/fes/red/claim?signature=3984168b467169e0b7d40708890d8b92c1495c1579d6a533ecdde493645dba8c&red_packet_id=27002e9a8f4843f8a85a9700fccfece4&yb_use_wechat_download_page=1';
            }, 500);
        });
    }

    // Close modal if clicking outside content
    window.addEventListener('click', (e) => {
        if (e.target === redPacketModal) {
            hideRedPacketModal();
        }
    });

    function showRedPacketModal() {
        redPacketModal.classList.remove('hidden');
    }

    function hideRedPacketModal() {
        redPacketModal.classList.add('hidden');
    }

    // Create horses
    const numberOfHorses = 15;
    
    for (let i = 0; i < numberOfHorses; i++) {
        createHorse();
    }

    // Start white horse spawner
    startWhiteHorseSpawner();

    function startWhiteHorseSpawner() {
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

    function generatePixelHorse() {
        const w = 32;
        const h = 24;
        const frames = 4;
        const scale = 1; // Draw 1:1, scale via CSS
        const canvas = document.createElement('canvas');
        canvas.width = w * frames;
        canvas.height = h;
        const ctx = canvas.getContext('2d');

        // Palette
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

        // Base Body (Shared shape roughly, but we'll define full frames for better animation)
        // 32x24 Grid. Head at right (facing right).
        
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

    function getHorseContent() {
        const horseContent = document.createElement('div');
        horseContent.className = 'horse-content';
        // Set sprite sheet as background
        horseContent.style.backgroundImage = `url(${generatePixelHorse()})`;
        return horseContent;
    }

    function spawnWhiteHorse() {
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
        
        const horseContent = getHorseContent();
        horse.appendChild(horseContent);
        
        // Butt interaction area for White Horse
        const butt = document.createElement('div');
        butt.className = 'butt-area';
        butt.title = '点击领取红包';
        
        butt.addEventListener('click', (e) => {
            e.stopPropagation();
            showRandomImage(e.clientX, e.clientY);
            showRedPacketModal();
            // Optional: Also make it run away or disappear?
            // For now, just show modal. It continues its running-across animation.
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
        const horseContent = getHorseContent();
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
        score++;
        scoreElement.textContent = `拍马屁次数: ${score}`;
        
        // Show visual feedback at click location
        showFeedback(x, y);
        
        // Show random flashing image
        showRandomImage(x, y);
        
        // Show toast
        showToast();
        
        // Play sound effect
        playSlapSound();
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
});
