import {
    collection,
    getDocs,
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import { db } from "./firebase.js";


const jumlahSiswa =
    document.getElementById("jumlahSiswa");

const broadcastTerbaru =
    document.getElementById("broadcastTerbaru");

const projekTerbaru =
    document.getElementById("projekTerbaru");

const galeriTerbaru =
    document.getElementById("galeriTerbaru");

console.log("INDEX JS BERHASIL DIMUAT");



async function tampilkanWaliKelas() {

    console.log("FUNGSI WALI KELAS DIJALANKAN");

    const walikelas =
        document.getElementById("waliKelas");

    console.log("ELEMENT:", walikelas);

    try {

        const referensi =
            doc(db, "walikelas", "utama");

        console.log("MENGAMBIL DATA FIREBASE...");

        const snapshot =
            await getDoc(referensi);

        console.log(
            "DOKUMEN ADA:",
            snapshot.exists()
        );

        if (!snapshot.exists()) {

            walikelas.innerHTML =
                "<p>Dokumen walikelas/utama tidak ditemukan.</p>";

            return;
        }

        const data =
            snapshot.data();

        console.log("DATA FIREBASE:", data);

        walikelas.innerHTML = `
            <h3>${data.nama || "Nama kosong"}</h3>

            <p>
                ${data.penjelasan || "Penjelasan kosong"}
            </p>
        `;

    } catch (error) {

        console.error(
            "ERROR WALI KELAS:",
            error
        );

        walikelas.innerHTML =
            "<p>Gagal mengambil data.</p>";
    }
}


// =================================
// JUMLAH SISWA
// =================================

async function tampilkanJumlahSiswa() {

    try {

        const snapshot = await getDocs(
            collection(db, "siswa")
        );

        jumlahSiswa.textContent =
            snapshot.size + " Siswa";

    } catch (error) {

        console.error(error);

        jumlahSiswa.textContent =
            "Gagal memuat";

    }

}


// =================================
// BROADCAST
// =================================

async function tampilkanBroadcast() {

    try {

        const snapshot = await getDocs(
            collection(db, "broadcast")
        );

        broadcastTerbaru.innerHTML = "";


        if (snapshot.empty) {

            broadcastTerbaru.innerHTML =
                "<p>Belum ada broadcast.</p>";

            return;

        }


        let jumlah = 0;


        snapshot.forEach((docSnapshot) => {

            if (jumlah >= 3) {
                return;
            }


            const data =
                docSnapshot.data();


            const card =
                document.createElement("div");


            card.className =
                "home-card";


            card.innerHTML = `
                <h3>${data.judul}</h3>

                <p>
                    ${data.isi}
                </p>

                <small>
                    Oleh: ${data.pengirim}
                </small>
            `;


            broadcastTerbaru.appendChild(card);

            jumlah++;

        });

    } catch (error) {

        console.error(error);

    }

}


// =================================
// PROJEK
// =================================

async function tampilkanProjek() {

    try {

        const snapshot = await getDocs(
            collection(db, "projek")
        );

        projekTerbaru.innerHTML = "";


        if (snapshot.empty) {

            projekTerbaru.innerHTML =
                "<p>Belum ada projek.</p>";

            return;

        }


        let jumlah = 0;


        snapshot.forEach((docSnapshot) => {

            if (jumlah >= 3) {
                return;
            }


            const data =
                docSnapshot.data();


            const card =
                document.createElement("div");


            card.className =
                "home-card";


            card.innerHTML = `
                <h3>${data.nama}</h3>

                <p>
                    ${data.deskripsi}
                </p>

                <small>
                    Anggota: ${data.anggota}
                </small>
            `;


            projekTerbaru.appendChild(card);

            jumlah++;

        });

    } catch (error) {

        console.error(error);

    }

}


// =================================
// GALERI
// =================================

async function tampilkanGaleri() {

    try {

        const snapshot = await getDocs(
            collection(db, "galeri")
        );

        galeriTerbaru.innerHTML = "";


        if (snapshot.empty) {

            galeriTerbaru.innerHTML =
                "<p>Belum ada foto.</p>";

            return;

        }


        let jumlah = 0;


        snapshot.forEach((docSnapshot) => {

            if (jumlah >= 4) {
                return;
            }


            const data =
                docSnapshot.data();


            const img =
                document.createElement("img");


            img.src = data.foto;

            img.alt = data.judul;

            img.className =
                "foto-home";


            galeriTerbaru.appendChild(img);

            jumlah++;

        });

    } catch (error) {

        console.error(error);

    }

}


// =================================
// JALANKAN
// =================================

tampilkanJumlahSiswa();

tampilkanWaliKelas();

tampilkanBroadcast();

tampilkanProjek();

tampilkanGaleri();