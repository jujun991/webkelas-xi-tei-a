import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import { db } from "./firebase.js";


const judulInput =
    document.getElementById("judulBroadcast");

const isiInput =
    document.getElementById("isiBroadcast");

const tombolTambah =
    document.getElementById("tambahBroadcast");

const daftarBroadcast =
    document.getElementById("daftarBroadcast");


// ================================
// MENAMPILKAN BROADCAST
// ================================

async function tampilkanBroadcast() {

    try {

        const snapshot =
            await getDocs(
                collection(db, "broadcast")
            );

        daftarBroadcast.innerHTML = "";


        if (snapshot.empty) {

            daftarBroadcast.innerHTML =
                "<p>Belum ada broadcast.</p>";

            return;
        }


        snapshot.forEach((docSnapshot) => {

            const data =
                docSnapshot.data();


            const card =
                document.createElement("div");

            card.className =
                "broadcast-card";


            card.innerHTML = `
                <h3>${data.judul}</h3>

                <p>
                    ${data.isi}
                </p>

                <small>
                    ${data.tanggal}
                </small>

                <br>

                <button class="hapus-broadcast">
                    Hapus
                </button>
            `;


            card
                .querySelector(
                    ".hapus-broadcast"
                )
                .addEventListener(
                    "click",
                    async () => {

                        const yakin =
                            confirm(
                                "Hapus broadcast ini?"
                            );


                        if (!yakin) {
                            return;
                        }


                        await deleteDoc(
                            doc(
                                db,
                                "broadcast",
                                docSnapshot.id
                            )
                        );


                        tampilkanBroadcast();

                    }
                );


            daftarBroadcast.appendChild(card);

        });

    } catch (error) {

        console.error(error);

        daftarBroadcast.innerHTML =
            "<p>Gagal mengambil broadcast.</p>";

    }

}


// ================================
// TAMBAH BROADCAST
// ================================

tombolTambah.addEventListener(
    "click",
    async () => {

        const judul =
            judulInput.value.trim();

        const isi =
            isiInput.value.trim();


        if (!judul) {

            alert(
                "Judul broadcast belum diisi!"
            );

            return;
        }


        if (!isi) {

            alert(
                "Isi broadcast belum diisi!"
            );

            return;
        }


        try {

            const tanggal =
                new Date()
                    .toLocaleDateString(
                        "id-ID",
                        {
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                        }
                    );


            await addDoc(
                collection(
                    db,
                    "broadcast"
                ),
                {
                    judul: judul,
                    isi: isi,
                    tanggal: tanggal
                }
            );


            alert(
                "Broadcast berhasil ditambahkan!"
            );


            judulInput.value = "";

            isiInput.value = "";


            tampilkanBroadcast();

        } catch (error) {

            console.error(error);

            alert(
                "Gagal menambahkan broadcast!"
            );

        }

    }
);


// ================================
// JALANKAN
// ================================

tampilkanBroadcast();