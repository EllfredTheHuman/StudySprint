```javascript
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
   MESSAGE HELPER
========================================================= */

function showMessage(
    element,
    message,
    type = ""
) {

    element.textContent =
        message;

    element.className =
        "auth-message " +
        type;

}


/* =========================================================
   SWITCH TO SIGN UP
========================================================= */

document
    .getElementById("show-signup")
    .addEventListener(
        "click",
        () => {

            loginSection.classList.add(
                "hidden"
            );

            signupSection.classList.remove(
                "hidden"
            );

            showMessage(
                loginMessage,
                ""
            );

        }
    );


/* =========================================================
   SWITCH TO LOGIN
========================================================= */

document
    .getElementById("show-login")
    .addEventListener(
        "click",
        () => {

            signupSection.classList.add(
                "hidden"
            );

            loginSection.classList.remove(
                "hidden"
            );

            showMessage(
                signupMessage,
                ""
            );

        }
    );


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

        window.location.replace(
            "../home/index.html"
        );

    }

}


checkExistingSession();


/* =========================================================
   LOGIN
========================================================= */

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


        showMessage(
            loginMessage,
            "Signed in! Loading...",
            "success"
        );


        window.location.replace(
            "../home/index.html"
        );

    }
);


/* =========================================================
   SIGN UP
========================================================= */

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


        if (
            username.length < 2
        ) {

            showMessage(
                signupMessage,
                "Username must be at least 2 characters.",
                "error"
            );

            button.disabled =
                false;

            return;

        }


        const {
            data,
            error
        } =
            await supabase.auth.signUp(
                {

                    email,

                    password,

                    options: {

                        data: {

                            username

                        }

                    }

                }
            );


        if (error) {

            showMessage(
                signupMessage,
                error.message,
                "error"
            );

            button.disabled =
                false;

            return;

        }


        /*
           Email confirmation OFF:
           Supabase gives us a session.
        */

        if (data.session) {

            localStorage.setItem(
                "username",
                username
            );


            window.location.replace(
                "../home/index.html"
            );

            return;

        }


        /*
           Email confirmation ON.
        */

        showMessage(
            signupMessage,
            "Account created! Check your email to confirm your account.",
            "success"
        );


        button.disabled =
            false;

    }
);
```
