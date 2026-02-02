document.addEventListener('DOMContentLoaded', () => {
    const grassland = document.getElementById('grassland');
    const scoreElement = document.getElementById('score-display');
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
            avatar: "https://cdn.sa.net/2026/02/02/oqjinWOgeBhNkAG.jpg",
            name: "安安@大健康",
            wechat: "ananshop88",
            unlocked: false
        },
        {
            avatar: "https://cdn.sa.net/2026/02/02/t4XFZlMv1fVkisb.jpg",
            name: "小易@AI代写",
            wechat: "xiaoyi102704",
            unlocked: false
        },
        {
            avatar: "https://cdn.sa.net/2026/02/02/fwuFspBLhGTyDi1.jpg",
            name: "明同学@助贷",
            wechat: "LJ521280",
            unlocked: false
        },
        {
            avatar: "https://cdn.sa.net/2026/02/02/7pDRnCPdbHulTM5.jpg",
            name: "薯条@私域电商",
            wechat: "Anais_L",
            unlocked: false
        },
        {
            avatar: "https://cdn.sa.net/2026/02/02/CtrfIaR7BGudw1U.jpg",
            name: "侠狼@AI出海",
            wechat: "code_cao",
            unlocked: false
        },
        {
            avatar: "https://cdn.sa.net/2026/02/02/IfYhTeiHOVZnFzq.jpg",
            name: "深圳的阳@互联网",
            wechat: "Passware",
            unlocked: false
        },
        {
            avatar: "https://cdn.sa.net/2026/02/02/jzgWx7TfFvLo3S8.jpg",
            name: "小伟@AI智能硬件",
            wechat: "siuserxiaowei",
            unlocked: false
        },
        {
            avatar: "https://cdn.sa.net/2026/02/02/HTp98PjXbZqs1zw.jpg",
            name: "数码哥@数码租赁",
            wechat: "WhitepaperBTC",
            unlocked: false
        },
        {
            avatar: "https://cdn.sa.net/2026/02/02/U2coQkwWMtEsJr3.jpg",
            name: "大猪@旅游",
            wechat: "Dazhu0911",
            unlocked: false
        },
        {
            avatar: "https://cdn.sa.net/2026/02/02/yqK6UhZwesbHuWc.jpg",
            name: "喵喵@Web3",
            wechat: "daa1434",
            unlocked: false
        },
        {
            avatar: "https://cdn.sa.net/2026/02/02/wk8aGl3prBTvOL4.jpg",
            name: "千穹@Ai出海",
            wechat: "pac10299",
            unlocked: false
        },
        {
            avatar: "https://cdn.sa.net/2026/02/02/eQ72hMigYfrldO9.jpg",
            name: "俊国@小红书",
            wechat: "wgwg2026",
            unlocked: false
        },
        {
            avatar: "https://cdn.sa.net/2026/02/02/ahl8fZA1JWuvT2n.jpg",
            name: "卧龙@小红书",
            wechat: "SRX11186",
            unlocked: false
        },
        {
            avatar: "https://cdn.sa.net/2026/02/02/h1WOrft4DSLJYG6.jpg",
            name: "Jason@个人IP",
            wechat: "BearJason1",
            unlocked: false
        },
        {
            avatar: "https://cdn.sa.net/2026/02/02/Sy1fNAm5oFxMBu4.jpg",
            name: "言絮@IP陪跑",
            wechat: "DS520QQA",
            unlocked: false
        },
        {
            avatar: "https://cdn.sa.net/2026/02/02/vX8W1BiUYIKNLn6.jpg",
            name: "文轩@付费进群",
            wechat: "vivohuoyu",
            unlocked: false
        },
        {
            avatar: "https://cdn.sa.net/2026/02/02/RfwAOIp5LSbTXY2.jpg",
            name: "叶嘉新@网盘拉新",
            wechat: "xxjj200909",
            unlocked: false
        },
        {
            avatar: "https://cdn.sa.net/2026/02/02/au71PhfOyjkwsc5.jpg",
            name: "黎小琴@企业补贴",
            wechat: "Lxq_430281",
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
    let wolfHasSpawned = false; // 狼总每场游戏只出现一次
    let wolfSpawnTimeout = null;
    let bgMusic = null; // 背景音乐对象

    // 播放背景音乐
    function playBackgroundMusic() {
        // 如果已有音乐在播放，先停止
        if (bgMusic) {
            bgMusic.pause();
            bgMusic.currentTime = 0;
        }

        bgMusic = new Audio('https://zuju20251015.oss-cn-beijing.aliyuncs.com/upload/yang/%E9%A9%AC%E5%8F%AB.AAC');
        bgMusic.loop = false; // 只播放一次
        bgMusic.volume = 0.6; // 音量设为60%
        bgMusic.play().catch(e => console.error("Background music play failed:", e));
    }

    // 停止背景音乐
    function stopBackgroundMusic() {
        if (bgMusic) {
            bgMusic.pause();
            bgMusic.currentTime = 0;
        }
    }

    function startTimer() {
        // Reset timer
        timeLeft = 60;
        timerElement.textContent = `${timeLeft}`;

        // Reset digital timer states
        const digitalTimer = document.querySelector('.digital-timer');
        if (digitalTimer) {
            digitalTimer.classList.remove('warning', 'critical');
        }

        isGameOver = false;
        isPaused = false;

        startTimerLoop();
        // 狼总改为通过召唤卡触发，不再自动生成
    }

    function startTimerLoop() {
        // Clear existing interval if any
        if (timerInterval) clearInterval(timerInterval);

        const digitalTimer = document.querySelector('.digital-timer');

        timerInterval = setInterval(() => {
            if (isPaused) return;

            timeLeft--;
            timerElement.textContent = `${timeLeft}`;

            // Update digital timer warning states
            if (digitalTimer) {
                digitalTimer.classList.remove('warning', 'critical');
                if (timeLeft <= 10) {
                    digitalTimer.classList.add('critical');
                } else if (timeLeft <= 20) {
                    digitalTimer.classList.add('warning');
                }
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

    // 从peopleData中获取所有头像URL
    const flashImages = peopleData.map(person => person.avatar);

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
            scoreElement.textContent = `👏 已拍: ${Object.keys(imageClickCounts).length} 人`;
            showToast("红包领取成功！正在跳转...");

            // 在新窗口打开红包链接
            setTimeout(() => {
                window.open('https://yb.tencent.com/fes/red/claim?signature=eb037ea2e574be17f835b2f4da08341b909b67db3c1a72e898c8dd268ba55927&red_packet_id=3452b35185d54e9983eb6d807131ca09&yb_use_wechat_download_page=1', '_blank');
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
        scoreElement.textContent = `👏 已拍: ${Object.keys(imageClickCounts).length} 人`;

        if (itemCountElement) {
            itemCountElement.textContent = `🔓 道具: ${wechatItemCount} 个`;
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

    // 狼总召唤卡弹窗
    const wolfSummonModal = document.getElementById('wolf-summon-modal');
    const wolfSummonCloseBtn = document.getElementById('wolf-summon-close');
    const summonWolfBtn = document.getElementById('summon-wolf-btn');

    function showWolfSummonModal() {
        wolfSummonModal.classList.remove('hidden');
        pauseTimer();
    }

    function hideWolfSummonModal() {
        wolfSummonModal.classList.add('hidden');
        resumeTimer();
    }

    // 狼总召唤卡关闭按钮
    if (wolfSummonCloseBtn) {
        wolfSummonCloseBtn.addEventListener('click', hideWolfSummonModal);
    }

    // 立即召唤按钮 - 点击后随机召唤狼总或摩托
    if (summonWolfBtn) {
        summonWolfBtn.addEventListener('click', () => {
            hideWolfSummonModal();

            // 随机选择召唤狼总或摩托（二选一）
            showToast("🐺 狼总正在赶来！");
            setTimeout(() => {
                if (Math.random() < 0.5) {
                    spawnWolf();
                } else {
                    spawnMotor();
                }
            }, 500);
        });
    }

    // 点击弹窗外部关闭
    window.addEventListener('click', (e) => {
        if (e.target === wolfSummonModal) {
            hideWolfSummonModal();
        }
        if (e.target === pigSummonModal) {
            hidePigSummonModal();
        }
    });

    // 大猪召唤卡弹窗
    const pigSummonModal = document.getElementById('pig-summon-modal');
    const pigSummonCloseBtn = document.getElementById('pig-summon-close');
    const summonPigBtn = document.getElementById('summon-pig-btn');

    function showPigSummonModal() {
        pigSummonModal.classList.remove('hidden');
        pauseTimer();
    }

    function hidePigSummonModal() {
        pigSummonModal.classList.add('hidden');
        resumeTimer();
    }

    // 大猪召唤卡关闭按钮
    if (pigSummonCloseBtn) {
        pigSummonCloseBtn.addEventListener('click', hidePigSummonModal);
    }

    // 立即召唤大猪按钮
    if (summonPigBtn) {
        summonPigBtn.addEventListener('click', () => {
            hidePigSummonModal();
            showToast("🐷 大猪正在赶来！");
            setTimeout(() => {
                spawnPig();
            }, 500);
        });
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

        // Random interval between 3 and 8 seconds (更频繁出现白马)
        const interval = 3000 + Math.random() * 5000;

        setTimeout(() => {
            // 每次只出现一匹白马
            if (document.querySelectorAll('.white-horse').length === 0) {
                spawnWhiteHorse();
            }
            startWhiteHorseSpawner(); // Schedule next spawn check
        }, interval);
    }

    // 狼总角色 - 每场游戏只出现一次
    function startWolfSpawner() {
        if (isGameOver || wolfHasSpawned) return;

        // 在游戏进行到 10-50 秒之间的某个随机时刻出现
        const spawnDelay = 10000 + Math.random() * 40000;

        wolfSpawnTimeout = setTimeout(() => {
            if (!isGameOver && !wolfHasSpawned) {
                spawnWolf();
                wolfHasSpawned = true;
            }
        }, spawnDelay);
    }

    function spawnWolf() {
        if (isGameOver) return;

        // 播放狼总专属BGM
        const wolfBgm = new Audio('https://zuju20251015.oss-cn-beijing.aliyuncs.com/upload/yang/%E5%9D%A6%E5%85%8Bbgm.AAC');
        wolfBgm.play().catch(e => console.error("Wolf BGM play failed:", e));

        const wolf = document.createElement('div');
        wolf.className = 'horse wolf-character running-across';

        // Random vertical position (perspective) - 狼总只出现在中间或上方，不在底部
        const minTop = 35;
        const maxTop = 55;
        const top = minTop + Math.random() * (maxTop - minTop);

        wolf.style.top = `${top}%`;
        wolf.style.left = '110%';
        wolf.style.zIndex = 9999; // 确保狼总在最顶层，不被其他角色遮挡

        // 使用狼总的GIF图片
        const wolfContent = document.createElement('img');
        wolfContent.src = 'https://zuju20251015.oss-cn-beijing.aliyuncs.com/upload/yang/%E5%9D%A6%E5%85%8B.gif';
        wolfContent.alt = '狼总（侠狼）';
        wolfContent.style.width = '350px';
        wolfContent.style.height = 'auto';
        wolfContent.style.pointerEvents = 'none';
        // 保持原始方向，狼总朝向左侧（移动方向）
        wolf.appendChild(wolfContent);

        // 点击区域
        const butt = document.createElement('div');
        butt.className = 'butt-area wolf-butt';
        butt.title = '点击狼总获取超级奖励！';

        let hasBeenClicked = false;

        butt.addEventListener('click', (e) => {
            e.stopPropagation();

            if (hasBeenClicked) {
                showToast("狼总已经被拍过了！");
                return;
            }

            hasBeenClicked = true;
            butt.style.cursor = 'default';

            // 播放金币音效
            playCoinSound();
            showRandomImage(e.clientX, e.clientY);

            // 狼总专属奖励 - 给予3个道具
            wechatItemCount += 3;
            if (itemCountElement) {
                itemCountElement.textContent = `🔓 道具: ${wechatItemCount} 个`;
                // 动画效果
                itemCountElement.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    itemCountElement.style.transform = 'scale(1)';
                }, 200);
            }

            // 显示特殊提示（只保留toast，不弹出道具+1弹窗）
            showToast("🐺 狼总降临！获得3个解锁道具！");
        });

        wolf.appendChild(butt);
        grassland.appendChild(wolf);

        // 狼总穿过屏幕后移除（与白马动画时间一致 6 秒 + 缓冲）
        setTimeout(() => {
            if (wolf.parentNode) {
                wolf.parentNode.removeChild(wolf);
            }
        }, 6500);
    }

    // 摩托角色 - 与狼总随机出现
    function spawnMotor() {
        if (isGameOver) return;

        // 播放摩托专属配音
        const motorBgm = new Audio('https://zuju20251015.oss-cn-beijing.aliyuncs.com/upload/yang/%E6%91%A9%E6%89%98.AAC');
        motorBgm.play().catch(e => console.error("Motor BGM play failed:", e));

        const motor = document.createElement('div');
        motor.className = 'horse wolf-character running-across';

        // Random vertical position (perspective) - 摩托只出现在中间或上方，不在底部
        const minTop = 35;
        const maxTop = 55;
        const top = minTop + Math.random() * (maxTop - minTop);

        motor.style.top = `${top}%`;
        motor.style.left = '110%';
        motor.style.zIndex = 9999; // 确保摩托在最顶层，不被其他角色遮挡

        // 使用摩托的GIF图片
        const motorContent = document.createElement('img');
        motorContent.src = 'https://zuju20251015.oss-cn-beijing.aliyuncs.com/upload/yang/%E6%91%A9%E6%89%98.gif';
        motorContent.alt = '摩托';
        motorContent.style.width = '350px';
        motorContent.style.height = 'auto';
        motorContent.style.pointerEvents = 'none';
        motor.appendChild(motorContent);

        // 点击区域
        const butt = document.createElement('div');
        butt.className = 'butt-area wolf-butt';
        butt.title = '点击摩托获取超级奖励！';

        let hasBeenClicked = false;

        butt.addEventListener('click', (e) => {
            e.stopPropagation();

            if (hasBeenClicked) {
                showToast("摩托已经被拍过了！");
                return;
            }

            hasBeenClicked = true;
            butt.style.cursor = 'default';

            // 播放金币音效
            playCoinSound();
            showRandomImage(e.clientX, e.clientY);

            // 摩托专属奖励 - 给予3个道具
            wechatItemCount += 3;
            if (itemCountElement) {
                itemCountElement.textContent = `🔓 道具: ${wechatItemCount} 个`;
                // 动画效果
                itemCountElement.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    itemCountElement.style.transform = 'scale(1)';
                }, 200);
            }

            // 显示特殊提示
            showToast("🏍️ 摩托降临！获得3个解锁道具！");
        });

        motor.appendChild(butt);
        grassland.appendChild(motor);

        // 摩托穿过屏幕后移除
        setTimeout(() => {
            if (motor.parentNode) {
                motor.parentNode.removeChild(motor);
            }
        }, 6500);
    }

    // 大猪/佩奇角色 - 与狼总、摩托随机出现
    function spawnPig() {
        if (isGameOver) return;

        // 播放大猪专属配音
        const pigBgm = new Audio('https://zuju20251015.oss-cn-beijing.aliyuncs.com/upload/yang/%E5%A4%A7%E7%8C%AA%E5%87%BA%E5%9C%BA.AAC');
        pigBgm.play().catch(e => console.error("Pig BGM play failed:", e));

        const pig = document.createElement('div');
        pig.className = 'horse wolf-character running-across';

        // Random vertical position (perspective) - 大猪只出现在中间或上方，不在底部
        const minTop = 35;
        const maxTop = 55;
        const top = minTop + Math.random() * (maxTop - minTop);

        pig.style.top = `${top}%`;
        pig.style.left = '110%';
        pig.style.zIndex = 9999; // 确保大猪在最顶层，不被其他角色遮挡

        // 使用大猪的GIF图片
        const pigContent = document.createElement('img');
        pigContent.src = 'https://cdn.sa.net/2026/02/02/PQVe37bwjzvFHAN.gif';
        pigContent.alt = '大猪（佩奇）';
        pigContent.style.width = '500px';
        pigContent.style.height = 'auto';
        pigContent.style.pointerEvents = 'none';
        pig.appendChild(pigContent);

        // 点击区域
        const butt = document.createElement('div');
        butt.className = 'butt-area wolf-butt';
        butt.title = '点击大猪获取超级奖励！';

        let hasBeenClicked = false;

        butt.addEventListener('click', (e) => {
            e.stopPropagation();

            if (hasBeenClicked) {
                showToast("大猪已经被拍过了！");
                return;
            }

            hasBeenClicked = true;
            butt.style.cursor = 'default';

            // 播放金币音效
            playCoinSound();
            showRandomImage(e.clientX, e.clientY);

            // 大猪专属奖励 - 给予3个道具
            wechatItemCount += 3;
            if (itemCountElement) {
                itemCountElement.textContent = `🔓 道具: ${wechatItemCount} 个`;
                // 动画效果
                itemCountElement.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    itemCountElement.style.transform = 'scale(1)';
                }, 200);
            }

            // 显示特殊提示
            showToast("🐷 大猪驾到！获得3个解锁道具！");
        });

        pig.appendChild(butt);
        grassland.appendChild(pig);

        // 大猪穿过屏幕后移除
        setTimeout(() => {
            if (pig.parentNode) {
                pig.parentNode.removeChild(pig);
            }
        }, 6500);
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

            // 随机触发：红包(30%) / 道具(40%) / 召唤卡(30%)
            const rand = Math.random();
            if (rand < 0.3) {
                showRedPacketModal();
            } else if (rand < 0.7) {
                showWechatItemModal();
            } else {
                // 获得召唤卡 - 随机狼总(50%)或大猪(50%)
                if (Math.random() < 0.5) {
                    showWolfSummonModal();
                } else {
                    showPigSummonModal();
                }
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
        scoreElement.textContent = `👏 已拍: ${uniqueCount} 人`;

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

        // 停止背景音乐
        stopBackgroundMusic();

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
            itemCountElement.textContent = `🔓 道具: ${wechatItemCount} 个`;
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
        scoreElement.textContent = `👏 已拍: 0 人`;

        // Reset item count display
        if (itemCountElement) {
            itemCountElement.textContent = `🔓 道具: ${wechatItemCount} 个`;
        }

        // Reset people unlock status
        resetPeopleData();

        // Reset wolf spawn status
        wolfHasSpawned = false;
        if (wolfSpawnTimeout) {
            clearTimeout(wolfSpawnTimeout);
            wolfSpawnTimeout = null;
        }

        gameOverModal.classList.add('hidden');

        // Remove all horses and recreate them
        grassland.innerHTML = '';
        for (let i = 0; i < numberOfHorses; i++) {
            createHorse();
        }

        // Restart with countdown
        showCountdown(() => {
            startTimer();
            // 重新启动白马生成器
            startWhiteHorseSpawner();
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

                // Play background music
                playBackgroundMusic();

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
