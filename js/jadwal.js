import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import { db } from "./firebase.js";


const hariJadwal =
    document.getElementById("hariJadwal");

const jamJadwal =
    document.getElementById("jamJadwal");

const pelajaranJadwal =
    document.getElementById("pelajaranJadwal");

const guruJadwal =
    document.getElementById("guruJadwal");

const tombolTambah =
    document.getElementById("tambahJadwal");

const daftarJadwal =
    document.getElementById("daftarJadwal");


// =================================
// URUTAN HARI
// =================================

const urutanHari = {
    "Senin": 1,
    "Selasa": 2,
    "Rabu": 3,
    "Kamis": 4,
    "Jumat": 5
};


// =================================
// TAMPILKAN JADWAL
// =================================

async function tampilkanJadwal() {

    try {

        const snapshot =
            await getDocs(
                collection(db, "jadwal")
            );

        daftarJadwal.innerHTML = "";


        if (snapshot.empty) {

            daftarJadwal.innerHTML =
                "<p>Belum ada jadwal.</p>";

            return;

        }


        const data = [];


        snapshot.forEach((docSnapshot) => {

            data.push({
                id: docSnapshot.id,
                ...docSnapshot.data()
            });

        });


        // Urutkan berdasarkan hari lalu jam

        data.sort((a, b) => {

            const hari =
                urutanHari[a.hari] -
                urutanHari[b.hari];

            if (hari !== 0) {
                return hari;
            }

            return a.jam.localeCompare(b.jam);

        });


        data.forEach((jadwal) => {

            const card =
                document.createElement("div");

            card.className =
                "jadwal-card";


            card.innerHTML = `

                <div>

                    <small>
                        ${jadwal.hari}
                    </small>

                    <h3>
                        ${jadwal.jam}
                    </h3>

                </div>

                <div>

                    <h3>
                        ${jadwal.pelajaran}
                    </h3>

                    <p>
                        ${jadwal.guru}
                    </p>

                </div>

                <button class="hapus-jadwal">
                    Hapus
                </button>

            `;


            card
                .querySelector(
                    ".hapus-jadwal"
                )
                .addEventListener(
                    "click",
                    async () => {

                        const yakin =
                            confirm(
                                "Hapus jadwal ini?"
                            );

                        if (!yakin) {
                            return;
                        }


                        await deleteDoc(
                            doc(
                                db,
                                "jadwal",
                                jadwal.id
                            )
                        );


                        tampilkanJadwal();

                    }
                );


            daftarJadwal.appendChild(card);

        });


    } catch (error) {

        console.error(error);

        daftarJadwal.innerHTML =
            "<p>Gagal mengambil jadwal.</p>";

    }

}


// =================================
// TAMBAH JADWAL
// =================================

tombolTambah.addEventListener(
    "click",
    async () => {

        const hari =
            hariJadwal.value;

        const jam =
            jamJadwal.value;

        const pelajaran =
            pelajaranJadwal.value.trim();

        const guru =
            guruJadwal.value.trim();


        if (!hari ||
            !jam ||
            !pelajaran ||
            !guru) {

            alert(
                "Lengkapi semua data jadwal!"
            );

            return;

        }


        try {

            await addDoc(
                collection(
                    db,
                    "jadwal"
                ),
                {
                    hari: hari,
                    jam: jam,
                    pelajaran: pelajaran,
                    guru: guru
                }
            );


            alert(
                "Jadwal berhasil ditambahkan!"
            );


            hariJadwal.value = "";

            jamJadwal.value = "";

            pelajaranJadwal.value = "";

            guruJadwal.value = "";


            tampilkanJadwal();


        } catch (error) {

            console.error(error);

            alert(
                "Gagal menambahkan jadwal!"
            );

        }

    }
);


// =================================
// JALANKAN
// =================================

tampilkanJadwal();