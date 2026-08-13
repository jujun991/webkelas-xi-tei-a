import {
    doc,
    getDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import { db } from "./firebase.js";


const namaWali =
    document.getElementById("namaWali");

const penjelasanWali =
    document.getElementById("penjelasanWali");

const fotoWali =
    document.getElementById("fotoWali");

const simpanWali =
    document.getElementById("simpanWali");


// ================================
// AMBIL DATA WALI KELAS
// ================================

async function ambilDataWali() {

    try {

        const referensi =
            doc(db, "waliKelas", "utama");

        const snapshot =
            await getDoc(referensi);


        if (!snapshot.exists()) {

            console.log(
                "Data wali kelas belum ada."
            );

            return;
        }


        const data =
            snapshot.data();


        namaWali.value =
            data.nama || "";

        penjelasanWali.value =
            data.penjelasan || "";


    } catch (error) {

        console.error(error);

    }

}


// ================================
// SIMPAN DATA
// ================================

simpanWali.addEventListener(
    "click",
    async () => {

        const nama =
            namaWali.value.trim();

        const penjelasan =
            penjelasanWali.value.trim();


        if (!nama) {

            alert(
                "Nama wali kelas belum diisi!"
            );

            return;
        }


        if (!penjelasan) {

            alert(
                "Penjelasan belum diisi!"
            );

            return;
        }


        try {

            let foto = "";


            // =========================
            // JIKA PILIH FOTO
            // =========================

            if (fotoWali.files[0]) {

                const file =
                    fotoWali.files[0];

                const reader =
                    new FileReader();


                reader.onload =
                    async function () {

                        const img =
                            new Image();


                        img.onload =
                            async function () {

                                const canvas =
                                    document.createElement(
                                        "canvas"
                                    );


                                const maxSize = 500;


                                let width =
                                    img.width;

                                let height =
                                    img.height;


                                if (width > height) {

                                    if (
                                        width >
                                        maxSize
                                    ) {

                                        height *=
                                            maxSize /
                                            width;

                                        width =
                                            maxSize;
                                    }

                                } else {

                                    if (
                                        height >
                                        maxSize
                                    ) {

                                        width *=
                                            maxSize /
                                            height;

                                        height =
                                            maxSize;
                                    }
                                }


                                canvas.width =
                                    width;

                                canvas.height =
                                    height;


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


                                foto =
                                    canvas.toDataURL(
                                        "image/jpeg",
                                        0.7
                                    );


                                await simpanKeFirebase(
                                    nama,
                                    penjelasan,
                                    foto
                                );

                            };


                        img.src =
                            reader.result;

                    };


                reader.readAsDataURL(file);

            } else {

                // =========================
                // TANPA GANTI FOTO
                // =========================

                const snapshot =
                    await getDoc(
                        doc(
                            db,
                            "waliKelas",
                            "utama"
                        )
                    );


                if (snapshot.exists()) {

                    foto =
                        snapshot.data().foto ||
                        "";
                }


                await simpanKeFirebase(
                    nama,
                    penjelasan,
                    foto
                );
            }

        } catch (error) {

            console.error(error);

            alert(
                "Gagal menyimpan data wali kelas!"
            );

        }

    }
);


// ================================
// SIMPAN KE FIREBASE
// ================================

async function simpanKeFirebase(
    nama,
    penjelasan,
    foto
) {

    await setDoc(
        doc(
            db,
            "waliKelas",
            "utama"
        ),
        {
            nama: nama,
            penjelasan: penjelasan,
            foto: foto
        }
    );


    alert(
        "Data wali kelas berhasil disimpan!"
    );


    fotoWali.value = "";

}


// ================================
// JALANKAN
// ================================

ambilDataWali();