/*
=========================================================
STUDYSPRINT AUTH
=========================================================
*/

import {
    createClient
} from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";


const SUPABASE_URL =
    "https://yfteudoecpkosxjucuky.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_d7w3Cg-X8oTsmJLgIO_OgQ_3DmiqeMo";


const supabase =
    createClient(
        SUPABASE_URL,
        SUPABASE_KEY,
        {
            auth: {
                persistSession: true,
                autoRefreshToken: true,
                detectSessionInUrl: true
            }
        }
    );


const HOME_PAGE =
    "/StudySprint/";


/*
=========================================================
ELEMENTS
=========================================================
*/

const loginForm =
    document.getElementById("login-form");

const signupForm =
    document.getElementById("signup-form");

const loginEmail =
    document.getElementById("login-email");

const loginPassword =
    document.getElementById("login-password");

const signupEmail =
    document.getElementById("signup-email");

const signupPassword =
    document.getElementById("signup-password");

const message =
    document.getElementById("auth-message");


/*
=========================================================
MESSAGE
=========================================================
*/

function showMessage(text, type = "") {

    if (!message) {
        return;
    }

    message.textContent = text;

    message.className =
        "auth-message " + type;

}


/*
=========================================================
CHECK EXISTING SESSION
=========================================================
*/

async function checkExistingSession() {

    console.log(
        "StudySprint: checking existing session..."
    );


    try {

        const {
            data,
            error
        } =
            await supabase.auth.getSession();


        if (error) {

            console.error(
                "Session check error:",
                error
            );

            return;

        }


        if (data.session) {

            console.log(
                "StudySprint: already signed in."
            );


            /*
            Don't redirect until Supabase has
            actually returned the session.
            */

            window.location.replace(
                HOME_PAGE
            );

        }

    }

    catch (error) {

        console.error(
            "Could not check session:",
            error
        );

    }

}


checkExistingSession();


/*
=========================================================
LOGIN
=========================================================
*/

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const email =
                loginEmail.value.trim();

            const password =
                loginPassword.value;


            if (!email || !password) {

                showMessage(
                    "Please enter your email and password.",
                    "error"
                );

                return;

            }


            showMessage(
                "Signing you in..."
            );


            const {
                data,
                error
            } =
                await supabase.auth.signInWithPassword({
                    email: email,
                    password: password
                });


            if (error) {

                console.error(
                    "Login error:",
                    error
                );


                showMessage(
                    error.message,
                    "error"
                );


                return;

            }


            if (!data.session) {

                showMessage(
                    "Login succeeded, but no session was created.",
                    "error"
                );


                return;

            }


            showMessage(
                "Signed in! Loading StudySprint..."
            );


            /*
            Give Supabase a moment to persist the
            session before navigating.
            */

            setTimeout(
                function() {

                    window.location.replace(
                        HOME_PAGE
                    );

                },
                150
            );

        }
    );

}


/*
=========================================================
SIGN UP
=========================================================
*/

if (signupForm) {

    signupForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const email =
                signupEmail.value.trim();

            const password =
                signupPassword.value;


            if (!email || !password) {

                showMessage(
                    "Please enter an email and password.",
                    "error"
                );

                return;

            }


            if (password.length < 6) {

                showMessage(
                    "Your password must be at least 6 characters.",
                    "error"
                );

                return;

            }


            showMessage(
                "Creating your account..."
            );


            const {
                data,
                error
            } =
                await supabase.auth.signUp({

                    email: email,

                    password: password,

                    options: {

                        emailRedirectTo:
                            "https://ellfredthehuman.github.io/StudySprint/"

                    }

                });


            if (error) {

                console.error(
                    "Signup error:",
                    error
                );


                showMessage(
                    error.message,
                    "error"
                );


                return;

            }


            /*
            Email confirmation is enabled:
            */

            if (
                data.user &&
                !data.session
            ) {

                showMessage(
                    "Account created! Check your email to confirm your account.",
                    "success"
                );


                return;

            }


            /*
            Auto-confirm is enabled:
            */

            if (data.session) {

                showMessage(
                    "Account created! Loading StudySprint..."
                );


                setTimeout(
                    function() {

                        window.location.replace(
                            HOME_PAGE
                        );

                    },
                    150
                );

            }

        }
    );

}


/*
=========================================================
AUTH STATE LISTENER
=========================================================

This watches for real Supabase authentication changes.
=========================================================
*/

supabase.auth.onAuthStateChange(
    function(event, session) {

        console.log(
            "StudySprint auth event:",
            event
        );


        /*
        Only redirect from the auth page when
        a real signed-in session exists.
        */

        if (
            session &&
            (
                event === "SIGNED_IN" ||
                event === "INITIAL_SESSION"
            )
        ) {

            window.location.replace(
                HOME_PAGE
            );

        }

    }
);
