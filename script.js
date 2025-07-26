
let daftarNama = [];
let daftarTersisa = [];
let kelompokOtomatis = [];

function getNamaDariTextarea() {
  const input = document.getElementById("namaInput").value.trim();
  return input.split("\n").map(n => n.trim()).filter(n => n !== "");
}

function mulaiSpin() {
  if (daftarTersisa.length === 0) {
    daftarNama = getNamaDariTextarea();
    if (daftarNama.length < 3) {
      alert("Masukkan setidaknya 3 nama.");
      return;
    }
    daftarTersisa = [...daftarNama];
    kelompokOtomatis = [];
    updateTextareaDaftar();
  }

  if (daftarTersisa.length === 0) {
    alert("Semua nama sudah dikelompokkan.");
    return;
  }

  const spinner = document.getElementById("spinner");
  const selected = document.getElementById("selected");
  selected.textContent = "";

  let count = 0;
  const totalSpin = 30 + Math.floor(Math.random() * 20);

  const spinInterval = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * daftarTersisa.length);
    spinner.textContent = daftarTersisa[randomIndex];
    count++;

    if (count >= totalSpin) {
      clearInterval(spinInterval);
      const namaTerpilih = daftarTersisa[randomIndex];
      selected.textContent = `🎉 Terpilih: ${namaTerpilih}`;

      daftarTersisa.splice(randomIndex, 1);
      masukkanKeKelompok(namaTerpilih);
      tampilkanKelompok(kelompokOtomatis);
      updateTextareaDaftar();
    }
  }, 100);
}

function masukkanKeKelompok(nama) {
  let ditempatkan = false;
  for (let k of kelompokOtomatis) {
    if (k.length < 4) {
      k.push(nama);
      ditempatkan = true;
      break;
    }
  }

  if (!ditempatkan) {
    kelompokOtomatis.push([nama]);
  }
}

function tampilkanKelompok(kelompok) {
  const out = document.getElementById("kelompokOutput");
  out.innerHTML = "";
  kelompok.forEach((k, idx) => {
    const div = document.createElement("div");
    div.className = "kelompok";
    div.innerHTML = `<strong>Kelompok ${idx + 1}:</strong><br>${k.join("<br>")}`;
    out.appendChild(div);
  });
}

function updateTextareaDaftar() {
  document.getElementById("namaInput").value = daftarTersisa.join("\n");
}
