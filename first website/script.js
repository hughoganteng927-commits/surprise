// --- KONFIGURASI PIN, PLAYLIST, & CATATAN ---
const SECRET_PASSWORD = "1606"; // PIN Kunci Layar 16 Juni
let currentInput = "";

// Daftar antrean Playlist (0: Nadin Amizah, 1: .Feast)
const playlist = [
    "assets/musik.mp3", // Lagu 1: Bertaut (File mp3 yang di-upload)
    "assets/nina.mp3"   // Lagu 2: Nina - .Feast (Pastikan ditaruh di folder assets dengan nama nina.mp3)
];
let currentTrackIndex = 0;

// Catatan bersyukur kado botol
const jarNotes = [
    "Aku bersyukur dengan caramu tersenyum yang selalu bisa membuat hariku cerah. 💖",
    "Terima kasih sudah menjadi tempat teraman dan ternyaman untukku pulang. 🌸",
    "Aku suka hatimu yang lembut dan caramu yang indah dalam memandang hidup. ✨",
    "Sangat bersyukur atas setiap tawa dan obrolan konyol yang kita lalui bersama. 🫙",
    "Kamu adalah orang favoritku, hari ini, esok, dan selamanya. 💕"
];

// --- JALANKAN OTOMATIS SAAT PEMBUKAAN ---
window.addEventListener('DOMContentLoaded', () => {
    createFallingFlowers();
    setupAudioPlaylistListener(); // Hubungkan pendengar akhir lagu otomatis
    
    // Transisi otomatis dari Loading Screen ke Password Screen dalam 2.5 detik
    setTimeout(() => {
        document.getElementById('loading-screen').classList.add('hidden');
        document.getElementById('password-screen').classList.remove('hidden');
    }, 2500);
});

// Sistem kelopak sakura berguguran
function createFallingFlowers() {
    const container = document.getElementById('flowers-bg');
    const flowers = ['🌸', '✨', '🌸'];
    setInterval(() => {
        const flower = document.createElement('div');
        flower.classList.add('falling-flower');
        flower.innerText = flowers[Math.floor(Math.random() * flowers.length)];
        flower.style.left = Math.random() * 100 + 'vw';
        flower.style.animationDuration = Math.random() * 3 + 3 + 's';
        flower.style.opacity = Math.random();
        container.appendChild(flower);
        setTimeout(() => flower.remove(), 6000);
    }, 400);
}

// --- SISTEM PLAYLIST ANTREAN OTOMATIS ---
function setupAudioPlaylistListener() {
    const audioPlayer = document.getElementById('backsound');
    if (audioPlayer) {
        audioPlayer.addEventListener('ended', () => {
            currentTrackIndex++; // Naikkan antrean lagu
            
            // Kalau lagu Nina .Feast selesai, dia akan looping kembali ke lagu pertama (Nadin)
            if (currentTrackIndex >= playlist.length) {
                currentTrackIndex = 0;
            }
            
            audioPlayer.src = playlist[currentTrackIndex];
            audioPlayer.play().catch((err) => console.log("Autoplay antrean dicegah browser:", err));
            
            // Ubah teks judul dan nama penyanyi di layar
            updateMusicDisplay();
        });
    }
}

function updateMusicDisplay() {
    const songTitle = document.getElementById('song-title');
    const songArtist = document.getElementById('song-artist');
    
    if (currentTrackIndex === 0) {
        if (songTitle) songTitle.innerText = "Bertaut";
        if (songArtist) songArtist.innerText = "Nadin Amizah";
    } else if (currentTrackIndex === 1) {
        if (songTitle) songTitle.innerText = "Nina";
        if (songArtist) songArtist.innerText = ".Feast";
    }
}

// --- SISTEM KEYPAD LOCK SCREEN ---
function pressKey(num) {
    // Membuka jalan audio secara aman semenjak sentuhan angka pertama
    document.getElementById('backsound').play().catch(() => {});

    if (currentInput.length < 4) {
        currentInput += num;
        updateDots();
    }
}

function clearKey() {
    currentInput = "";
    updateDots();
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index < currentInput.length) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// --- VALIDASI KEAMANAN POP-UP KUSTOM ---
function checkPassword() {
    if (currentInput === SECRET_PASSWORD) { 
        document.getElementById('password-screen').classList.add('hidden');
        document.getElementById('main-content').classList.remove('hidden');
    } else {
        document.getElementById('error-popup').classList.remove('hidden');
    }
}

function closePopup() {
    document.getElementById('error-popup').classList.add('hidden');
    clearKey();
}

// --- KADO 1: FUNGSI BUKET BUNGA ---
function revealFlower(message) {
    const box = document.getElementById('bouquet-msg');
    box.style.opacity = 0;
    setTimeout(() => {
        box.innerText = message;
        box.style.opacity = 1;
    }, 200);
}

// --- KADO 3: FUNGSI TOMBOL MUSIK ---
function togglePlay() {
    const audio = document.getElementById('backsound');
    const disc = document.getElementById('disc');
    
    if (audio.paused) {
        audio.play().catch(() => {});
        disc.classList.add('playing');
    } else {
        audio.pause();
        disc.classList.remove('playing');
    }
}

// --- KADO 4: FUNGSI BOTOL KACA ---
function shakeJar() {
    const jar = document.getElementById('jar');
    const msgBox = document.getElementById('jar-msg');
    
    jar.classList.add('shake');
    setTimeout(() => jar.classList.remove('shake'), 500);
    
    const randomNote = jarNotes[Math.floor(Math.random() * jarNotes.length)];
    
    msgBox.classList.remove('hidden');
    msgBox.style.opacity = 0;
    setTimeout(() => {
        msgBox.innerText = randomNote;
        msgBox.style.opacity = 1;
    }, 200);
}

// --- KADO 5: FUNGSI KARTU MOTIVASI ---
function toggleMotivation(card) {
    card.classList.toggle('flipped');
}

// --- KADO 6: LOGIKA TIUP LILIN & KE WA OTOMATIS ---
function showCake() {
    document.getElementById('wish-ready-container').classList.add('hidden');
    document.getElementById('cake-area').classList.remove('hidden');
}

function blowCandle() {
    const flame = document.getElementById('flame');
    if (flame) {
        flame.style.display = 'none';
    }
    document.getElementById('blow-btn').classList.add('hidden');
    
    setTimeout(() => {
        document.getElementById('wish-box-area').classList.remove('hidden');
        document.getElementById('wish-box-area').scrollIntoView({ behavior: 'smooth' });
    }, 1000);
}

function saveWish() {
    const wishText = document.getElementById('wish-text').value;
    
    if (wishText.trim() === "") {
        alert("Ketik permohonanmu dulu atuh, biar semesta mendengarnya... ✨");
        return;
    }
    
    // ⚠️ MASUKKAN NOMOR WA-MU DI SINI (Contoh: "628123456789")
    const nomorWA = "6285821631621"; 
    const teksPesan = encodeURIComponent(`Hugho, ini permohonan dan harapanku di ulang tahun kali ini:\n\n"${wishText}"`);
    
    // Buka tautan WhatsApp otomatis ke nomor Hugho
    window.open(`https://wa.me/${nomorWA}?text=${teksPesan}`, '_blank');
    
    document.querySelector('.btn-save-wish').classList.add('hidden');
    document.getElementById('wish-text').setAttribute('disabled', 'true');
    document.getElementById('wish-saved-msg').classList.remove('hidden');
}