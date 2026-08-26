/* =========================================================
   STUDYSPRINT AUTH
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

const HOME_URL =
    "https://ellfredthehuman.github.io/StudySprint/";


/* =========================================================
   ELEMENTS
========================================================= */

const loading =
    document.getElementById(
        "auth-loading"
    );

const authApp =
    document.getElementById(
        "auth-app"
    );


const loginForm =
    document.getElementById(
        "login-form"
    );

const signupForm =
    document.getElementById(
        "signup-form"
    );


const loginTab =
    document.getElementById(
        "login-tab"
    );

const signupTab =
    document.getElementById(
        "signup-tab"
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
   HELPERS
========================================================= */

function showAuthPage() {

    if (loading) {

        loading.style.display =
            "none";

    }


    if (authApp) {

        authApp.style.display =
            "flex";

    }

}


function goHome() {

    window.location.replace(
        HOME_URL
    );

}


function setMessage(
    element,
    text,
    type = ""
) {

    if (!element) {
        return;
    }


    element.textContent =
        text;

    element.className =
        "auth-message " +
        type;

}


function saveUser(user) {

    if (!user) {
        return;
    }


    const username =
        user.user_metadata?.username ||
        localStorage.getItem(
            "username"
        ) ||
        "Player";


    localStorage.setItem(
        "username",
        username
    );

}


/* =========================================================
   TABS
========================================================= */

function showLogin() {

    loginTab.classList.add(
        "active"
    );

    signupTab.classList.remove(
        "active"
    );


    loginForm.style.display =
        "block";

    signupForm.style.display =
        "none";


    setMessage(
        loginMessage,
        ""
    );

    setMessage(
        signupMessage,
        ""
    );

}


function showSignup() {

    signupTab.classList.add(
        "active"
    );

    loginTab.classList.remove(
        "active"
    );


    signupForm.style.display =
        "block";

    loginForm.style.display =
        "none";


    setMessage(
        loginMessage,
        ""
    );

    setMessage(
        signupMessage,
        ""
    );

}


loginTab.addEventListener(
    "click",
    showLogin
);


signupTab.addEventListener(
    "click",
    showSignup
);


/* =========================================================
   INITIAL SESSION CHECK
========================================================= */

async function initialiseAuth() {

    try {

        const {
            data,
            error
        } =
            await supabase.auth.getSession();


        if (error) {

            console.error(
                "Supabase session error:",
                error
            );

            showAuthPage();

            return;

        }


        /* ---------------------------------------------
           ALREADY SIGNED IN
        --------------------------------------------- */

        if (data.session) {

            saveUser(
                data.session.user
            );

            goHome();

            return;

        }


        /* ---------------------------------------------
           NOT SIGNED IN
        --------------------------------------------- */

        showAuthPage();

    }

    catch (error) {

        console.error(
            "Authentication error:",
            error
        );

        showAuthPage();

    }

}


initialiseAuth();


/* =========================================================
   LOGIN
========================================================= */

loginForm.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        const button =
            loginForm.querySelector(
                "button[type='submit']"
            );


        button.disabled =
            true;


        setMessage(
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
            await supabase.auth.signInWithPassword({

                email,

                password

            });


        if (error) {

            console.error(
                "Login error:",
                error
            );


            setMessage(
                loginMessage,
                error.message,
                "error"
            );


            button.disabled =
                false;


            return;

        }


        saveUser(
            data.user
        );


        setMessage(
            loginMessage,
            "Signed in! Loading...",
            "success"
        );


        goHome();

    }
);


/* =========================================================
   SIGN UP
========================================================= */

signupForm.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        const button =
            signupForm.querySelector(
                "button[type='submit']"
            );


        button.disabled =
            true;


        setMessage(
            signupMessage,
            "Creating your account..."
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

        if (
            username.length < 2 ||
            username.length > 20
        ) {

            setMessage(
                signupMessage,
                "Username must be between 2 and 20 characters.",
                "error"
            );


            button.disabled =
                false;

            return;

        }


        if (password.length < 6) {

            setMessage(
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

                        username:
                            username

                    },

                    emailRedirectTo:
                        HOME_URL

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


            setMessage(
                signupMessage,
                error.message,
                "error"
            );


            button.disabled =
                false;

            return;

        }


        /* ---------------------------------------------
           EMAIL CONFIRMATION
        --------------------------------------------- */

        if (!data.session) {

            setMessage(
                signupMessage,
                "Account created! Check your email and click the confirmation link.",
                "success"
            );


            button.disabled =
                false;

            return;

        }


        /* ---------------------------------------------
           SIGNED IN IMMEDIATELY
        --------------------------------------------- */

        saveUser(
            data.user
        );


        setMessage(
            signupMessage,
            "Account created! Loading...",
            "success"
        );


        goHome();

    }
);


/* =========================================================
   AUTH STATE
========================================================= */

supabase.auth.onAuthStateChange(
    function(
        event,
        session
    ) {

        if (
            event === "SIGNED_IN" &&
            session
        ) {

            saveUser(
                session.user
            );

        }

    }
);
