import {
    getAuth,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import { app } from "./firebase.js";


const auth = getAuth(app);


const emailInput =
    document.getElementById("email");

const passwordInput =
    document.getElementById("password");

const loginButton =
    document.getElementById("loginButton");

const loginStatus =
    document.getElementById("loginStatus");


loginButton.addEventListener(
    "click",
    async () => {

        const email =
            emailInput.value.trim();

        const password =
            passwordInput.value;


        if (!email) {

            loginStatus.textContent =
                "Email belum diisi.";

            return;

        }


        if (!password) {

            loginStatus.textContent =
                "Password belum diisi.";

            return;

        }


        try {

            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );


            loginStatus.textContent =
                "Login berhasil.";


            window.location.href =
                "admin.html";


        } catch (error) {

            console.error(error);

            loginStatus.textContent =
                "Email atau password salah.";

        }

    }
);