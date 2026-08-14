import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import { db } from "./firebase.js";


const daftarTugas =
    document.getElementById("daftarTugas");


async function tampilkanTugas() {

    try {

        const snapshot =
            await getDocs(
                collection(db, "tugas")
            );

        daftarTugas.innerHTML = "";


        if (snapshot.empty) {

            daftarTugas.innerHTML =
                "<p>Belum ada tugas.</p>";

            return;

        }


        snapshot.forEach((docSnapshot) => {

            const tugas =
                docSnapshot.data();


            const card =
                document.createElement("div");


            card.className =
                "tugas-card";


            card.innerHTML = `

                <h3>
                    ${tugas.mapel}
                </h3>

                <a
                    href="${tugas.linkDrive}"
                    target="_blank"
                    class="tugas-link"
                >
                    Buka Google Drive
                </a>

            `;


            daftarTugas.appendChild(card);

        });


    } catch (error) {

        console.error(
            "Gagal mengambil tugas:",
            error
        );

        daftarTugas.innerHTML =
            "<p>Gagal mengambil data tugas.</p>";

    }

}


tampilkanTugas();