// ===== Elemen Form =====
const form = document.getElementById("formDaftar");
const nama = document.getElementById("nama");
const email = document.getElementById("email");
const password = document.getElementById("password");
const konfirmasi = document.getElementById("konfirmasi");
const ekskul = document.getElementById("ekskul");
const pesanSukses = document.getElementById("pesanSukses");
const strengthBar = document.getElementById("strengthBar");
const kekuatanTeks = document.getElementById("kekuatanTeks");

// ===== Fungsi Tampilkan Error / Sukses =====
function tampilkanError(input, pesan) {
  const g = input.closest(".form-group");
  g.classList.add("error");
  g.classList.remove("success");
  g.querySelector(".pesan-error").textContent = pesan;
}

function tampilkanSukses(input) {
  const g = input.closest(".form-group");
  g.classList.add("success");
  g.classList.remove("error");
}

// ===== Fungsi Validasi =====
function validasiNama() {
  if (nama.value.trim().length < 3) {
    tampilkanError(nama, "Nama minimal 3 karakter dan tidak boleh kosong.");
    return false;
  }
  tampilkanSukses(nama);
  return true;
}

function validasiEmail() {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    tampilkanError(email, "Format email belum benar. Contoh: nama@email.com");
    return false;
  }
  tampilkanSukses(email);
  return true;
}

function validasiPassword() {
  if (password.value.length < 8) {
    tampilkanError(password, "Password minimal 8 karakter.");
    return false;
  }
  tampilkanSukses(password);
  return true;
}

function validasiKonfirmasi() {
  if (konfirmasi.value === "" || konfirmasi.value !== password.value) {
    tampilkanError(konfirmasi, "Konfirmasi harus sama persis dengan password.");
    return false;
  }
  tampilkanSukses(konfirmasi);
  return true;
}

function validasiEkskul() {
  if (ekskul.value === "") {
    tampilkanError(ekskul, "Pilih salah satu ekstrakurikuler.");
    return false;
  }
  tampilkanSukses(ekskul);
  return true;
}

// ===== Event Listener Input Form =====
nama.addEventListener("input", validasiNama);
email.addEventListener("input", validasiEmail);
password.addEventListener("input", function () {
  validasiPassword();
  tampilkanKekuatan();
  if (konfirmasi.value !== "") validasiKonfirmasi();
});
konfirmasi.addEventListener("input", validasiKonfirmasi);
ekskul.addEventListener("change", validasiEkskul);

// ===== Pengukur Kekuatan Password =====
function tampilkanKekuatan() {
  const p = password.value;
  let skor = 0;
  if (p.length >= 8) skor++;
  if (/[A-Z]/.test(p) && /[a-z]/.test(p)) skor++;
  if (/[0-9]/.test(p)) skor++;
  if (/[^A-Za-z0-9]/.test(p)) skor++;
  
  const warna = ["", "#ef4444", "#f59e0b", "#3b82f6", "#10b981"];
  const teks = ["", "lemah", "cukup", "kuat", "sangat kuat"];
  
  strengthBar.style.width = ["0%", "25%", "50%", "75%", "100%"][skor];
  strengthBar.style.backgroundColor = warna[skor];
  kekuatanTeks.textContent = p ? "Kekuatan password: " + teks[skor] : "";
}

// ===== Tombol Sembunyikan / Lihat Password =====
document.querySelectorAll(".toggle").forEach(function (t) {
  t.addEventListener("click", function () {
    const input = document.getElementById(t.dataset.target);
    const sembunyi = input.type === "password";
    input.type = sembunyi ? "text" : "password";
    t.textContent = sembunyi ? "Sembunyi" : "Lihat";
  });
});

// ===== Submit Form =====
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const hasil = [validasiNama(), validasiEmail(), validasiPassword(), validasiKonfirmasi(), validasiEkskul()];
  
  if (!hasil.includes(false)) {
    const pilihan = ekskul.options[ekskul.selectedIndex].text;
    pesanSukses.textContent = "Pendaftaran berhasil! Selamat bergabung di " + pilihan + ", " + nama.value.trim() + ".";
    pesanSukses.style.display = "block";
    form.reset();
    strengthBar.style.width = "0%";
    kekuatanTeks.textContent = "";
    
    form.querySelectorAll(".form-group").forEach(function (g) {
      g.classList.remove("success", "error");
    });
    form.querySelectorAll(".toggle").forEach(function (t) {
      t.textContent = "Lihat";
    });
  } else {
    pesanSukses.style.display = "none";
    const pertama = form.querySelector(".form-group.error input, .form-group.error select");
    if (pertama) pertama.focus();
  }
});