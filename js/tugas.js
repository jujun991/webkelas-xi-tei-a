
import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import { db } from "./firebase.js";


console.log("TUGAS JS BERHASIL DIMUAT");


const daftarTugas =
    document.getElementById("daftarTugas");


async function tampilkanTugas() {

    console.log("MENGAMBIL DATA TUGAS...");


    try {

        const referensi =
            collection(db, "tugas");


        const snapshot =
            await getDocs(referensi);


        console.log(
            "JUMLAH TUGAS:",
            snapshot.size
        );


        daftarTugas.innerHTML = "";


        if (snapshot.empty) {

            daftarTugas.innerHTML = `
                <p>
                    Belum ada tugas.
                </p>
            `;

            return;
        }


        snapshot.forEach((docSnapshot) => {

            const tugas =
                docSnapshot.data();


            console.log(
                "DATA TUGAS:",
                tugas
            );


            const card =
                document.createElement("div");


            card.className =
                "tugas-card";


            card.innerHTML = `

                <h3>
                    ${tugas.mapel || "Mata Pelajaran"}
                </h3>

                <a
                    href="${tugas.linkDrive}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="tugas-link"
                >
                    Buka Google Drive
                </a>

            `;


            daftarTugas.appendChild(card);

        });


    } catch (error) {

        console.error(
            "ERROR TUGAS:",
            error
        );


        daftarTugas.innerHTML = `
            <p>
                Gagal mengambil data tugas.
            </p>
        `;

    }

}


tampilkanTugas();