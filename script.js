// ==========================
// DATA KEHADIRAN (localStorage)
// ==========================
let attendance = JSON.parse(localStorage.getItem("attendance")) || [];

const attendanceList = document.getElementById("attendanceList");

// ==========================
// RENDER TABEL
// ==========================
function renderTable() {
    attendanceList.innerHTML = "";
    const emptyMsg = document.getElementById("emptyMsg");

    if (attendance.length === 0) {
        emptyMsg.style.display = "block";
        return;
    }

    emptyMsg.style.display = "none";

    attendance.forEach((item, index) => {
        attendanceList.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.nama}</td>
                <td>${item.instansi}</td>
                <td>${item.jam}</td>
            </tr>
        `;
    });
}

// Tampilkan data saat halaman dimuat
renderTable();

// ==========================
// FORM SUBMIT
// ==========================
document.getElementById("formHadir").addEventListener("submit", function (e) {
    e.preventDefault();

    const nama = document.getElementById("inputNama").value.trim();
    const instansi = document.getElementById("inputInstansi").value.trim();
    const jam = new Date().toLocaleTimeString("id-ID");

    // Simpan ke localStorage
    attendance.push({ nama, instansi, jam });
    localStorage.setItem("attendance", JSON.stringify(attendance));

    // Reset form
    this.reset();

    // Tampilkan pesan sukses
    const msg = document.getElementById("msgSuccess");
    msg.style.display = "block";
    setTimeout(() => { msg.style.display = "none"; }, 2000);

    // Render ulang tabel
    renderTable();
});

// ==========================
// EXPORT CSV
// ==========================
document.getElementById("exportCSV").addEventListener("click", function () {
    if (attendance.length === 0) {
        alert("Tidak ada data untuk di-export!");
        return;
    }

    let csv = "No,Nama,Instansi,Jam Hadir\n";

    attendance.forEach((item, index) => {
        csv += `${index + 1},"${item.nama}","${item.instansi}","${item.jam}"\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    const tanggal = new Date().toLocaleDateString("id-ID").replace(/\//g, "-");
    link.setAttribute("href", url);
    link.setAttribute("download", "Daftar_Hadir_" + tanggal + ".csv");
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// ==========================
// RESET DATA
// ==========================
document.getElementById("resetData").addEventListener("click", function () {
    if (!confirm("Yakin ingin menghapus semua data kehadiran?")) return;

    attendance = [];
    localStorage.setItem("attendance", JSON.stringify(attendance));
    renderTable();
});
