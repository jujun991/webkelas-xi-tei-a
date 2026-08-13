import {
    collection,
    getDocs,
    doc,
    setDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import { db } from "./firebase.js";


const daftarSiswa = document.getElementById("daftarSiswa");
const tombolSimpan = document.getElementById("simpanAbsensi");

const pilihSiswa = document.getElementById("pilihSiswa");
const fotoInput = document.getElementById("fotoInput");
const uploadFoto = document.getElementById("uploadFoto");


// ================================
// MENAMPILKAN DATA SISWA
// ================================

async function tampilkanSiswa() {

    try {

        const snapshot = await getDocs(
            collection(db, "siswa")
        );

        daftarSiswa.innerHTML = "";

        pilihSiswa.innerHTML = `
            <option value="">Pilih siswa</option>
        `;


        snapshot.forEach((docSnapshot) => {

            const siswa = docSnapshot.data();


            // MASUKKAN SISWA KE DROPDOWN

            const option = document.createElement("option");

            option.value = docSnapshot.id;
            option.textContent = siswa.nama;

            pilihSiswa.appendChild(option);


            // MEMBUAT KARTU SISWA

            const card = document.createElement("div");

            card.className = "siswa-card";

            card.dataset.nama = siswa.nama;
            card.dataset.nisn = siswa.nisn;


            card.innerHTML = `
                <img
                    src="${siswa.foto || 'assets/default.jpg'}"
                    alt="Foto ${siswa.nama}"
                    class="foto-siswa"
                >

                <h3>${siswa.nama}</h3>

                <p>NISN: ${siswa.nisn}</p>

                <select class="status">
                    <option value="Hadir">Hadir</option>
                    <option value="Izin">Izin</option>
                    <option value="Sakit">Sakit</option>
                    <option value="Alfa">Alfa</option>
                </select>
            `;


            daftarSiswa.appendChild(card);

        });

    } catch (error) {

        console.error(error);

        daftarSiswa.innerHTML =
            "<p>Gagal mengambil data siswa.</p>";

    }

}


// ================================
// SIMPAN ABSENSI
// ================================

tombolSimpan.addEventListener("click", async () => {

    try {

        const semuaSiswa =
            document.querySelectorAll(".siswa-card");

        const tanggal =
            new Date().toISOString().split("T")[0];


        for (const siswa of semuaSiswa) {

            const nama =
                siswa.dataset.nama;

            const nisn =
                siswa.dataset.nisn;

            const status =
                siswa.querySelector(".status").value;


            const idAbsensi =
                `${nisn}_${tanggal}`;


            await setDoc(
                doc(db, "absensi", idAbsensi),
                {
                    nama: nama,
                    nisn: nisn,
                    status: status,
                    tanggal: tanggal
                }
            );

        }


        alert("Absensi hari ini berhasil disimpan!");

    } catch (error) {

        console.error(error);

        alert("Gagal menyimpan absensi!");

    }

});


// ================================
// UPLOAD FOTO SISWA
// ================================

uploadFoto.addEventListener("click", async () => {

    const siswaId = pilihSiswa.value;

    const file = fotoInput.files[0];


    if (!siswaId) {

        alert("Pilih siswa dulu!");

        return;

    }


    if (!file) {

        alert("Pilih foto dulu!");

        return;

    }


    const reader = new FileReader();


    reader.onload = async function () {

        const img = new Image();


        img.onload = async function () {

            const canvas =
                document.createElement("canvas");


            const maxWidth = 500;
            const maxHeight = 500;


            let width = img.width;
            let height = img.height;


            if (width > height) {

                if (width > maxWidth) {

                    height *= maxWidth / width;

                    width = maxWidth;

                }

            } else {

                if (height > maxHeight) {

                    width *= maxHeight / height;

                    height = maxHeight;

                }

            }


            canvas.width = width;
            canvas.height = height;


            const ctx =
                canvas.getContext("2d");


            ctx.drawImage(
                img,
                0,
                0,
                width,
                height
            );


            const fotoBase64 =
                canvas.toDataURL(
                    "image/jpeg",
                    0.7
                );


            try {

                await updateDoc(
                    doc(db, "siswa", siswaId),
                    {
                        foto: fotoBase64
                    }
                );


                alert("Foto berhasil disimpan!");

                fotoInput.value = "";

                tampilkanSiswa();


            } catch (error) {

                console.error(error);

                alert("Gagal menyimpan foto!");

            }

        };


        img.src = reader.result;

    };


    reader.readAsDataURL(file);

});


// ================================
// JALANKAN SAAT HALAMAN DIBUKA
// ================================

tampilkanSiswa();