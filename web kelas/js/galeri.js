import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import { db } from "./firebase.js";


const judulFoto =
    document.getElementById("judulFoto");

const pengirimFoto =
    document.getElementById("pengirimFoto");

const fotoGaleri =
    document.getElementById("fotoGaleri");

const tombolTambah =
    document.getElementById("tambahFoto");

const daftarGaleri =
    document.getElementById("daftarGaleri");


// =================================
// MENAMPILKAN GALERI
// =================================

async function tampilkanGaleri() {

    try {

        const snapshot = await getDocs(
            collection(db, "galeri")
        );

        daftarGaleri.innerHTML = "";


        if (snapshot.empty) {

            daftarGaleri.innerHTML =
                "<p>Belum ada foto.</p>";

            return;

        }


        snapshot.forEach((docSnapshot) => {

            const foto =
                docSnapshot.data();


            const card =
                document.createElement("div");

            card.className =
                "galeri-card";


            card.innerHTML = `
                <img
                    src="${foto.foto}"
                    alt="${foto.judul}"
                >

                <h3>
                    ${foto.judul}
                </h3>

                <p>
                    Oleh: ${foto.pengirim}
                </p>

                <p>
                    ${foto.tanggal}
                </p>

                <button class="hapus-foto">
                    Hapus
                </button>
            `;


            const tombolHapus =
                card.querySelector(
                    ".hapus-foto"
                );


            tombolHapus.addEventListener(
                "click",
                async () => {

                    const yakin =
                        confirm(
                            "Hapus foto ini?"
                        );


                    if (!yakin) {
                        return;
                    }


                    await deleteDoc(
                        doc(
                            db,
                            "galeri",
                            docSnapshot.id
                        )
                    );


                    tampilkanGaleri();

                }
            );


            daftarGaleri.appendChild(card);

        });

    } catch (error) {

        console.error(error);

        daftarGaleri.innerHTML =
            "<p>Gagal mengambil galeri.</p>";

    }

}


// =================================
// TAMBAH FOTO
// =================================

tombolTambah.addEventListener(
    "click",
    async () => {

        const judul =
            judulFoto.value.trim();

        const pengirim =
            pengirimFoto.value.trim();

        const file =
            fotoGaleri.files[0];


        if (!judul) {

            alert("Judul foto belum diisi!");

            return;

        }


        if (!pengirim) {

            alert("Nama pengirim belum diisi!");

            return;

        }


        if (!file) {

            alert("Pilih foto dulu!");

            return;

        }


        const reader =
            new FileReader();


        reader.onload = async function () {

            const img =
                new Image();


            img.onload = async function () {

                const canvas =
                    document.createElement(
                        "canvas"
                    );


                const maxWidth = 800;
                const maxHeight = 800;


                let width = img.width;
                let height = img.height;


                if (width > height) {

                    if (width > maxWidth) {

                        height *=
                            maxWidth / width;

                        width =
                            maxWidth;

                    }

                } else {

                    if (height > maxHeight) {

                        width *=
                            maxHeight / height;

                        height =
                            maxHeight;

                    }

                }


                canvas.width = width;
                canvas.height = height;


                const ctx =
                    canvas.getContext(
                        "2d"
                    );


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

                    const tanggal =
                        new Date()
                            .toISOString()
                            .split("T")[0];


                    await addDoc(
                        collection(
                            db,
                            "galeri"
                        ),
                        {
                            judul: judul,
                            pengirim: pengirim,
                            foto: fotoBase64,
                            tanggal: tanggal
                        }
                    );


                    alert(
                        "Foto berhasil ditambahkan!"
                    );


                    judulFoto.value = "";
                    pengirimFoto.value = "";
                    fotoGaleri.value = "";


                    tampilkanGaleri();


                } catch (error) {

                    console.error(error);

                    alert(
                        "Gagal menyimpan foto!"
                    );

                }

            };


            img.src =
                reader.result;

        };


        reader.readAsDataURL(file);

    }
);


// Jalankan saat halaman dibuka

tampilkanGaleri();