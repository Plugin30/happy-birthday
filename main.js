// ========================================
// ระบบตรวจสอบวันเกิด
// ========================================


// 🔴 แก้วันเกิดตรงนี้
// ตัวอย่าง: 25 / 12 / 2005
const correctBirthday = {
  day: 20,
  month: 10,
  year: 2548
};


// ========================================
// Element
// ========================================
const birthdayScreen =
  document.getElementById('birthdayScreen');
const birthdayBox =
  document.querySelector('.birthday-box');
const birthdayBtn =
  document.getElementById('birthdayBtn');
const birthdayMessage =
  document.getElementById('birthdayMessage');
const birthDay =
  document.getElementById('birthDay');
const birthMonth =
  document.getElementById('birthMonth');
const birthYear =
  document.getElementById('birthYear');
const mainStage =
  document.getElementById('mainStage');

// ========================================
// ข้อความตอนตอบผิด
// ========================================

const wrongMessages = [
  '❌ วันเกิดตัวเองใส่ผิดได้ไงง 😂',
  '🤨 แน่ใจนะว่านี่วันเกิดตัวเอง?',
  '😂 ลองใหม่อีกที คิดดี ๆ',
  '👀 พี่รู้ว่าเจด้ารู้...',
  '😏 ใกล้แล้วมั้ง? หรือเปล่า?',
  '❌ ยังไม่ถูกอี๊กก! ลองอีกครั้ง'
];

let wrongCount = 0;

// ========================================
// ตรวจสอบวันเกิด
// ========================================

function checkBirthday() {
  const day =
    Number(birthDay.value);
  const month =
    Number(birthMonth.value);
  const year =
    Number(birthYear.value);

  // -------------------------------
  // ยังกรอกไม่ครบ
  // -------------------------------

  if (
    !day ||
    !month ||
    !year
  ) {
    birthdayMessage.textContent =
      'กรอกให้ครบก่อนนะ 👀';
    return;
  }

  // -------------------------------
  // ตรวจว่าถูกไหม
  // -------------------------------

  if (
    day === correctBirthday.day &&
    month === correctBirthday.month &&
    year === correctBirthday.year
  ) {
    birthdayCorrect();
  } else {
    birthdayWrong();
  }

}

// ========================================
// กรอกผิด
// ========================================

function birthdayWrong() {
  birthdayMessage.textContent =
    wrongMessages[
      wrongCount %
      wrongMessages.length
    ];

  wrongCount++;

  // Animation สั่น
  birthdayBox.classList.remove('shake');
  void birthdayBox.offsetWidth;
  birthdayBox.classList.add('shake');
}

// ========================================
// กรอกถูก
// ========================================
const correctSound = new Audio('light-a-candel.mp3');
correctSound.volume = 1.0;

function birthdayCorrect() {

  correctSound.currentTime = 0;
  correctSound.play();

  birthdayMessage.textContent =
    '✅ เจด้าจริงๆด้วยย! ยินดีต้อนรับ 🎉';

  birthdayBtn.textContent =
    'กำลังเปิด... 🎁';

  birthdayBtn.disabled =
    true;

  // รอเล็กน้อยก่อนเปิดหน้า HBD
  setTimeout(() => {
    birthdayScreen.style.opacity =
      '0';

    birthdayScreen.style.visibility =
      'hidden';

    mainStage.style.display =
      'block';

    // เริ่ม Animation หน้า HBD
    mainStage.style.animation =
      'fadeIn 1s ease';

  }, 1000);
}

// ========================================
// กดปุ่มตรวจสอบ
// ========================================

birthdayBtn.addEventListener(
  'click',
  checkBirthday
);

// ========================================
// กด Enter เพื่อส่ง
// ========================================

[
  birthDay,
  birthMonth,
  birthYear

].forEach(input => {
  input.addEventListener(
    'keydown',
    event => {
      if (
        event.key === 'Enter'
      ) {
        checkBirthday();
      }
    }
  );
});

// ========================================
// ระบบสไลด์รูปภาพ
// ========================================

const photoTrack = document.getElementById('photoTrack');
const photoSlider = document.getElementById('photoSlider');
const photoDots = document.getElementById('photoDots');

const photoImages = photoTrack.querySelectorAll('img, video');

let currentPhoto = 0;

// สร้างจุดตามจำนวนรูป
photoImages.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = 'photo-dot';
    if (index === 0) {
        dot.classList.add('active');
    }
    photoDots.appendChild(dot);
});

const dots = photoDots.querySelectorAll('.photo-dot');

// เปลี่ยนรูป
function showPhoto(index) {
    const totalPhotos = photoImages.length;
    // ถ้าเกินรูปสุดท้าย → กลับรูปแรก
    if (index >= totalPhotos) {
        currentPhoto = 0;
    }
    // ถ้าย้อนก่อนรูปแรก → ไปรูปสุดท้าย
    else if (index < 0) {
        currentPhoto = totalPhotos - 1;
    }
    else {
        currentPhoto = index;
    }
    photoTrack.style.transform =
        `translateX(-${currentPhoto * 100}%)`;
    // เปลี่ยนจุด
    dots.forEach((dot, i) => {
        dot.classList.toggle(
            'active',
            i === currentPhoto
        );
    });
}

// ========================================
// ระบบปัด / ลากรูป
// ========================================

let touchStartX = 0;
let touchEndX = 0;

// มือถือ
photoSlider.addEventListener(
    'touchstart',
    (event) => {
        touchStartX = event.touches[0].clientX;
    },
    { passive: true }
);

photoSlider.addEventListener(
    'touchend',
    (event) => {
        touchEndX = event.changedTouches[0].clientX;
        const distance = touchStartX - touchEndX;
        if (distance > 50) {
            showPhoto(currentPhoto + 1);
        }
        else if (distance < -50) {
            showPhoto(currentPhoto - 1);
        }
    },
    { passive: true }
);


// คอมพิวเตอร์
let mouseStartX = 0;
let isDragging = false;

photoSlider.addEventListener(
    'mousedown',
    (event) => {
        mouseStartX = event.clientX;
        isDragging = true;
        photoSlider.style.cursor = 'grabbing';
    }
);
photoSlider.addEventListener(
    'mouseup',
    (event) => {
        if (!isDragging) return;
        const mouseEndX = event.clientX;
        const distance = mouseStartX - mouseEndX;
        isDragging = false;
        photoSlider.style.cursor = 'grab';
        if (distance > 50) {
            showPhoto(currentPhoto + 1);
        }
        else if (distance < -50) {
            showPhoto(currentPhoto - 1);
        }
    }
);
photoSlider.addEventListener(
    'mouseleave',
    () => {
        isDragging = false;
        photoSlider.style.cursor = 'grab';
    }
);

const recipientName = 'เจด้า';

// ========================================
// ข้อความที่จะวนแสดง
// ========================================

const messages = [
    `เป็นกำลังใจให้เจด้าเสมออ 💖`,
    `ไม่ว่าจะเจอเรื่องยากแค่ไหน ขอให้ผ่านมันไปได้ด้วยดีนะ ✨`,
    `พบเจอแต่คนที่ใจดีและเอาใจใส่เธอเสมอ` ,
    `จะคอยซัพพอร์ตอยู่ห่างๆตรงนี้เสมอ💪` ,
    `และพร้อมที่จะรับฟังถ้ามีเรื่องทำให้เจด้ารู้สึกแย่` ,
    `นั่นคง...เป็นสิ่งเดียวที่พี่ถนัดและทำได้ดีที่สุดแล้วล่ะมั้ง 😅` ,
    `ยังไงก็อย่าลืมดูแลสุขภาพตัวเองดีๆด้วยนะคับบคนเก่ง🤗`, 
];

// ========================================
// ระบบ Typewriter
// ========================================

const typeEl =
    document.getElementById('typewriter');

let msgIndex = 0;


function typeMessage(text, done) {
    typeEl.textContent = '';
    let i = 0;
    const timer = setInterval(() => {
        typeEl.textContent += text.charAt(i);
        i++;
        if (i > text.length) {
            clearInterval(timer);
            setTimeout(done, 800);
        }
    }, 40);
}

// ========================================
// วนข้อความ
// ========================================

function loopMessages() {
    typeMessage(
        messages[msgIndex],
        () => {
            msgIndex =
                (msgIndex + 1) % messages.length;
            setTimeout(
                loopMessages,
                1000
            );

        }
    );
}


// ========================================
// ปุ่มเปิดการ์ด
// ========================================

const revealBtn =
    document.getElementById('revealBtn');

revealBtn.addEventListener(
    'click',
    () => {

        // 🔊 เสียงกดปุ่ม
        const buttonSound = new Audio('open.mp3');

        buttonSound.play().catch(() => {});

        // เปลี่ยนปุ่มทันที
        revealBtn.disabled = true;
        revealBtn.textContent = 'ได้บอกแล้ว 💌';

        // รอเสียงปุ่มจบ แล้วค่อยเริ่มเพลง
        buttonSound.addEventListener('ended', () => {

    // เริ่มข้อความ
    loopMessages();

});
    }
);

// ========================================
// ปุ่มส่งกำลังใจ
// ========================================
const loveBtn =
    document.getElementById('loveBtn');
const sound =
    new Audio('pop.mp3');

loveBtn.addEventListener(
    'click',
    () => {
        // เสียง
        sound.currentTime = 0;
        sound.play();

        // หัวใจตก
        createFallingHearts(40);
    }
);

// ========================================
// สร้างหัวใจ / ดาวตก
// ========================================
function createFallingHearts(count = 30) {
    const colors = [
        '#ff6b81',
        '#ff9ff3',
        '#a29bfe',
        '#74b9ff',
        '#ffeaa7'
    ];

    for (let i = 0; i < count; i++) {
        const heart =
            document.createElement('div');

        heart.textContent = '✨';

        heart.className =
            'fall-heart';

        heart.style.top =
            '-40px';

        heart.style.left =
            Math.random() *
            window.innerWidth +
            'px';

        heart.style.fontSize =
            14 +
            Math.random() * 20 +
            'px';

        heart.style.color =
            colors[
            Math.floor(
                Math.random() *
                colors.length
            )
            ];

        document.body.appendChild(
            heart
        );

        // Animation
        heart.animate(
            [
                {
                    transform:
                        'translateY(0)',
                    opacity: 1
                },
                {
                    transform:
                        `translateY(${window.innerHeight + 80}px)`,
                    opacity: 0
                }
            ],
            {
                duration:
                    4500 +
                    Math.random() * 3000,
                easing: 'ease-in'
            }
        ).onfinish = () => {
            heart.remove();

        };
    }
}

document.body.classList.add('cake-dark');

const blowCakeBtn =
    document.getElementById('blowCakeBtn');

const cake =
    document.getElementById('cake');

const blowSound = new Audio('blow-candle.mp3');
blowSound.volume = 1.0;

blowCakeBtn.addEventListener('click', () => {

    blowSound.currentTime = 0;
    blowSound.play();

    cake.src = 'photo/cake-off.png';

    setTimeout(() => {
        cake.classList.add('cake-moved');
    }, 300);

    blowCakeBtn.disabled = true;
    blowCakeBtn.textContent = 'เป่าแล้ว 💨';

    document.body.classList.remove('cake-dark');

    // 🎵 เล่นเพลงหลังเสียงเป่าเทียนจบ
    blowSound.addEventListener('ended', () => {

        const bgm = document.getElementById('bgm');
        bgm.volume = 0.5;
        bgm.currentTime = 16;
        bgm.play().catch(() => {});

    }, { once: true });

});
