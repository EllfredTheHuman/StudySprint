/* =========================================================
   STUDYSPRINT AUTHENTICATION
========================================================= */

import {
    createClient
} from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";


/* =========================================================
   SUPABASE
========================================================= */

const SUPABASE_URL =
    "https://yfteudoecpkosxjucuky.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_d7w3Cg-X8oTsmJLgIO_OgQ_3DmiqeMo";

const supabase =
    createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


/* =========================================================
   STUDYSPRINT URL
========================================================= */

const STUDYSPRINT_URL =
    "https://ellfredthehuman.github.io/StudySprint/";


/* =========================================================
   ELEMENTS
========================================================= */

const loginSection =
    document.getElementById(
        "login-section"
    );

const signupSection =
    document.getElementById(
        "signup-section"
    );

const loginForm =
    document.getElementById(
        "login-form"
    );

const signupForm =
    document.getElementById(
        "signup-form"
    );

const loginMessage =
    document.getElementById(
        "login-message"
    );

const signupMessage =
    document.getElementById(
        "signup-message"
    );


/* =========================================================
   MESSAGE
========================================================= */

function showMessage(
    element,
    message,
    type = ""
) {

    if (!element) {
        return;
    }

    element.textContent =
        message;

    element.className =
        "auth-message " + type;

}


/* =========================================================
   SWITCH TO SIGN UP
========================================================= */

const showSignup =
    document.getElementById(
        "show-signup"
    );

if (showSignup) {

    showSignup.addEventListener(
        "click",
        () => {

            if (loginSection) {

                loginSection.classList.add(
                    "hidden"
                );

            }

            if (signupSection) {

                signupSection.classList.remove(
                    "hidden"
                );

            }

            showMessage(
                loginMessage,
                ""
            );

        }
    );

}


/* =========================================================
   SWITCH TO LOGIN
========================================================= */

const showLogin =
    document.getElementById(
        "show-login"
    );

if (showLogin) {

    showLogin.addEventListener(
        "click",
        () => {

            if (signupSection) {

                signupSection.classList.add(
                    "hidden"
                );

            }

            if (loginSection) {

                loginSection.classList.remove(
                    "hidden"
                );

            }

            showMessage(
                signupMessage,
                ""
            );

        }
    );

}


/* =========================================================
   EXISTING SESSION
========================================================= */

async function checkExistingSession() {

    const {
        data,
        error
    } =
        await supabase.auth.getSession();


    if (error) {

        console.error(
            "Session check failed:",
            error
        );

        return;

    }


    if (data.session) {

        const user =
            data.session.user;


        const username =
            user
                ?.user_metadata
                ?.username ||
            "Player";


        localStorage.setItem(
            "username",
            username
        );


        window.location.replace(
            "../index.html"
        );

    }

}


checkExistingSession();


/* =========================================================
   LOGIN
========================================================= */

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const button =
                loginForm.querySelector(
                    "button"
                );


            button.disabled =
                true;


            showMessage(
                loginMessage,
                "Signing in..."
            );


            const email =
                document
                    .getElementById(
                        "login-email"
                    )
                    .value
                    .trim();


            const password =
                document
                    .getElementById(
                        "login-password"
                    )
                    .value;


            const {
                data,
                error
            } =
                await supabase.auth.signInWithPassword(
                    {
                        email,
                        password
                    }
                );


            if (error) {

                showMessage(
                    loginMessage,
                    error.message,
                    "error"
                );

                button.disabled =
                    false;

                return;

            }


            const username =
                data
                    ?.user
                    ?.user_metadata
                    ?.username ||
                "Player";


            localStorage.setItem(
                "username",
                username
            );


            showMessage(
                loginMessage,
                "Signed in! Loading...",
                "success"
            );


            window.location.replace(
                "../index.html"
            );

        }
    );

}


/* =========================================================
   SIGN UP
========================================================= */

if (signupForm) {

    signupForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const button =
                signupForm.querySelector(
                    "button"
                );


            button.disabled =
                true;


            showMessage(
                signupMessage,
                "Creating account..."
            );


            const username =
                document
                    .getElementById(
                        "signup-username"
                    )
                    .value
                    .trim();


            const email =
                document
                    .getElementById(
                        "signup-email"
                    )
                    .value
                    .trim();


            const password =
                document
                    .getElementById(
                        "signup-password"
                    )
                    .value;


            /* ---------------------------------------------
               VALIDATION
            --------------------------------------------- */

            if (username.length < 2) {

                showMessage(
                    signupMessage,
                    "Username must be at least 2 characters.",
                    "error"
                );

                button.disabled =
                    false;

                return;

            }


            if (username.length > 20) {

                showMessage(
                    signupMessage,
                    "Username must be 20 characters or fewer.",
                    "error"
                );

                button.disabled =
                    false;

                return;

            }


            if (password.length < 6) {

                showMessage(
                    signupMessage,
                    "Password must be at least 6 characters.",
                    "error"
                );

                button.disabled =
                    false;

                return;

            }


            /* ---------------------------------------------
               CREATE ACCOUNT
            --------------------------------------------- */

            const {
                data,
                error
            } =
                await supabase.auth.signUp({

                    email,

                    password,

                    options: {

                        data: {

                            username

                        },

                        /*
                           THIS IS THE IMPORTANT PART.

                           Supabase will now send the user
                           back to GitHub Pages after they
                           confirm their email.
                        */

                        emailRedirectTo:
                            STUDYSPRINT_URL

                    }

                });


            /* ---------------------------------------------
               ERROR
            --------------------------------------------- */

            if (error) {

                console.error(
                    "Signup error:",
                    error
                );


                showMessage(
                    signupMessage,
                    error.message,
                    "error"
                );


                button.disabled =
                    false;

                return;

            }


            /* ---------------------------------------------
               ACCOUNT CREATED
            --------------------------------------------- */

            /*
               If email confirmation is disabled,
               Supabase gives us a session immediately.
            */

            if (data.session) {

                localStorage.setItem(
                    "username",
                    username
                );


                showMessage(
                    signupMessage,
                    "Account created! Loading...",
                    "success"
                );


                setTimeout(
                    () => {

                        window.location.replace(
                            "../index.html"
                        );

                    },
                    500
                );


                return;

            }


            /*
               If email confirmation is enabled,
               there won't be a session yet.
            */

            showMessage(
                signupMessage,
                "Account created! Check your email and click the confirmation link to finish signing up.",
                "success"
            );


            button.disabled =
                false;

        }
    );

}


/* =========================================================
   AUTH STATE
========================================================= */

supabase.auth.onAuthStateChange(
    (event, session) => {

        if (
            event === "SIGNED_IN" &&
            session
        ) {

            const username =
                session
                    ?.user
                    ?.user_metadata
                    ?.username ||
                "Player";


            localStorage.setItem(
                "username",
                username
            );

        }

    }
);
