import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import { db } from "./firebase.js";


const namaProjek =
    document.getElementById("namaProjek");

const deskripsiProjek =
    document.getElementById("deskripsiProjek");

const anggotaProjek =
    document.getElementById("anggotaProjek");

const tombolTambah =
    document.getElementById("tambahProjek");

const daftarProjek =
    document.getElementById("daftarProjek");


// =================================
// MENAMPILKAN PROJEK
// =================================

async function tampilkanProjek() {

    try {

        const snapshot = await getDocs(
            collection(db, "projek")
        );

        daftarProjek.innerHTML = "";


        if (snapshot.empty) {

            daftarProjek.innerHTML =
                "<p>Belum ada projek.</p>";

            return;

        }


        snapshot.forEach((docSnapshot) => {

            const projek =
                docSnapshot.data();


            const card =
                document.createElement("div");

            card.className = "projek-card";


            card.innerHTML = `
                <h3>${projek.nama}</h3>

                <p>
                    ${projek.deskripsi}
                </p>

                <p>
                    <strong>Anggota:</strong>
                    ${projek.anggota}
                </p>

                <p>
                    <strong>Tanggal:</strong>
                    ${projek.tanggal}
                </p>

                <button class="hapus-projek">
                    Hapus
                </button>
            `;


            const tombolHapus =
                card.querySelector(".hapus-projek");


            tombolHapus.addEventListener(
                "click",
                async () => {

                    const yakin =
                        confirm(
                            "Hapus projek ini?"
                        );


                    if (!yakin) {
                        return;
                    }


                    await deleteDoc(
                        doc(
                            db,
                            "projek",
                            docSnapshot.id
                        )
                    );


                    tampilkanProjek();

                }
            );


            daftarProjek.appendChild(card);

        });

    } catch (error) {

        console.error(error);

        daftarProjek.innerHTML =
            "<p>Gagal mengambil data projek.</p>";

    }

}


// =================================
// TAMBAH PROJEK
// =================================

tombolTambah.addEventListener(
    "click",
    async () => {

        const nama =
            namaProjek.value.trim();

        const deskripsi =
            deskripsiProjek.value.trim();

        const anggota =
            anggotaProjek.value.trim();


        if (!nama) {

            alert("Nama projek belum diisi!");

            return;

        }


        if (!deskripsi) {

            alert("Deskripsi projek belum diisi!");

            return;

        }


        if (!anggota) {

            alert("Anggota projek belum diisi!");

            return;

        }


        try {

            const tanggal =
                new Date()
                    .toISOString()
                    .split("T")[0];


            const docRef = await addDoc(
    collection(db, "projek"),
    {
        nama: nama,
        deskripsi: deskripsi,
        anggota: anggota,
        tanggal: tanggal
    }
);

console.log("PROJEK BERHASIL DISIMPAN!");
console.log("ID DOKUMEN:", docRef.id);


            alert("Projek berhasil ditambahkan!");


            namaProjek.value = "";
            deskripsiProjek.value = "";
            anggotaProjek.value = "";


            tampilkanProjek();

        } catch (error) {

            console.error(error);

            alert("Gagal menambahkan projek!");

        }

    }
);


// Jalankan saat halaman dibuka

tampilkanProjek();