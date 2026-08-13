import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import { db } from "./firebase.js";

console.log("JADWAL HOME JS BERHASIL DIMUAT");


const jadwalHari =
    document.getElementById("jadwalHari");


async function ambilJadwal() {

    console.log("MULAI AMBIL JADWAL");


    try {

        const snapshot =
            await getDocs(
                collection(db, "jadwal")
            );


        console.log(
            "JUMLAH DATA:",
            snapshot.size
        );


        jadwalHari.innerHTML = "";


        if (snapshot.empty) {

            jadwalHari.innerHTML =
                "<p>Belum ada jadwal.</p>";

            return;

        }


        snapshot.forEach((docSnapshot) => {

            const jadwal =
                docSnapshot.data();


            console.log(
                "DATA:",
                jadwal
            );


            const item =
                document.createElement("div");


            item.className =
                "jadwal-home-item";


            item.innerHTML = `

                <div class="jadwal-jam">
                    ${jadwal.hari}
                    <br>
                    ${jadwal.jam}
                </div>

                <div class="jadwal-info">

                    <h3>
                        ${jadwal.pelajaran}
                    </h3>

                    <p>
                        ${jadwal.guru}
                    </p>

                </div>

            `;


            jadwalHari.appendChild(item);

        });


    } catch (error) {

        console.error(
            "ERROR JADWAL:",
            error
        );

        jadwalHari.innerHTML =
            "<p>Gagal mengambil jadwal.</p>";

    }

}


ambilJadwal();