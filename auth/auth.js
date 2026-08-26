```javascript
/* =========================================================
   STUDYSPRINT AUTH
========================================================= */


/* =========================================================
   SUPABASE
========================================================= */

import {
    createClient
} from
    "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";


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

const loginForm =
    document.getElementById(
        "login-form"
    );


const signupForm =
    document.getElementById(
        "signup-form"
    );


const login =
    document.getElementById(
        "login"
    );


const signup =
    document.getElementById(
        "signup"
    );


const showSignup =
    document.getElementById(
        "show-signup"
    );


const showLogin =
    document.getElementById(
        "show-login"
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

    element.textContent =
        message;

    element.className =
        "auth-message " +
        type;

}


/* =========================================================
   SWITCH TO SIGN UP
========================================================= */

showSignup.addEventListener(
    "click",
    function() {

        loginForm.classList.add(
            "hidden"
        );

        signupForm.classList.remove(
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

showLogin.addEventListener(
    "click",
    function() {

        signupForm.classList.add(
            "hidden"
        );

        loginForm.classList.remove(
            "hidden"
        );

        showMessage(
            signupMessage,
            ""
        );

    }
);


/* =========================================================
   SIGN UP
========================================================= */

signup.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


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

            return;

        }


        if (
            username.length > 20
        ) {

            showMessage(
                signupMessage,
                "Username must be 20 characters or less.",
                "error"
            );

            return;

        }


        if (
            password.length < 6
        ) {

            showMessage(
                signupMessage,
                "Password must be at least 6 characters.",
                "error"
            );

            return;

        }


        showMessage(
            signupMessage,
            "Creating your account..."
        );


        const {
            data,
            error
        } =
            await supabase.auth.signUp({

                email:
                    email,

                password:
                    password,

                options: {

                    data: {

                        username:
                            username

                    }

                }

            });


        if (error) {

            showMessage(
                signupMessage,
                error.message,
                "error"
            );

            return;

        }


        /*
           Supabase may require email
           confirmation depending on
           your project settings.
        */

        if (
            data.session
        ) {

            localStorage.setItem(
                "username",
                username
            );


            showMessage(
                signupMessage,
                "Account created! Loading StudySprint...",
                "success"
            );


            setTimeout(
                function() {

                    window.location.href =
                        "../index.html";

                },
                700
            );

        }

        else {

            showMessage(
                signupMessage,
                "Account created! Check your email to confirm your account.",
                "success"
            );

        }

    }
);


/* =========================================================
   LOGIN
========================================================= */

login.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


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


        showMessage(
            loginMessage,
            "Logging in..."
        );


        const {
            data,
            error
        } =
            await supabase.auth.signInWithPassword({

                email:
                    email,

                password:
                    password

            });


        if (error) {

            showMessage(
                loginMessage,
                error.message,
                "error"
            );

            return;

        }


        const user =
            data.user;


        const username =
            user
                ?.user_metadata
                ?.username ||
            "Player";


        localStorage.setItem(
            "username",
            username
        );


        showMessage(
            loginMessage,
            "Login successful! Loading StudySprint...",
            "success"
        );


        setTimeout(
            function() {

                window.location.href =
                    "../index.html";

            },
            500
        );

    }
);


/* =========================================================
   CHECK EXISTING SESSION
========================================================= */

async function checkSession() {

    const {
        data
    } =
        await supabase.auth.getSession();


    if (
        data.session
    ) {

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


        window.location.href =
            "../index.html";

    }

}


/* =========================================================
   AUTH STATE
========================================================= */

supabase.auth.onAuthStateChange(
    function(
        event,
        session
    ) {

        if (
            event === "SIGNED_OUT"
        ) {

            localStorage.removeItem(
                "username"
            );

        }

    }
);


/* =========================================================
   START
========================================================= */

checkSession();
```
