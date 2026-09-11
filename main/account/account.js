```js
/* =========================================================
   STUDYSPRINT — SUPABASE ACCOUNT
========================================================= */


/*
    IMPORTANT

    Put your Supabase publishable key between
    the quotation marks below.

    Do NOT put a service_role key here.
*/

const SUPABASE_URL =
    "https://yfteudoecpkosxjucuky.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_d7w3Cg-X8oTsmJLgIO_OgQ_3DmiqeMo";


/* =========================================================
   SUPABASE
========================================================= */

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


/* =========================================================
   ELEMENTS
========================================================= */

const authSection =
    document.getElementById(
        "auth-section"
    );

const loggedInSection =
    document.getElementById(
        "logged-in-section"
    );

const title =
    document.getElementById(
        "title"
    );

const subtitle =
    document.getElementById(
        "subtitle"
    );

const authForm =
    document.getElementById(
        "auth-form"
    );

const emailInput =
    document.getElementById(
        "email"
    );

const passwordInput =
    document.getElementById(
        "password"
    );

const submitButton =
    document.getElementById(
        "submit-button"
    );

const switchText =
    document.getElementById(
        "switch-text"
    );

const switchButton =
    document.getElementById(
        "switch-button"
    );

const message =
    document.getElementById(
        "message"
    );

const userEmail =
    document.getElementById(
        "user-email"
    );

const continueButton =
    document.getElementById(
        "continue-button"
    );

const logoutButton =
    document.getElementById(
        "logout-button"
    );


/* =========================================================
   STATE
========================================================= */

let signUpMode = false;


/* =========================================================
   MESSAGE
========================================================= */

function showMessage(text) {

    message.textContent =
        text;

    message.style.display =
        "block";
}


function hideMessage() {

    message.textContent =
        "";

    message.style.display =
        "none";
}


/* =========================================================
   SWITCH LOGIN / SIGNUP
========================================================= */

switchButton.addEventListener(
    "click",
    function () {

        signUpMode =
            !signUpMode;

        hideMessage();


        if (signUpMode) {

            title.textContent =
                "Create your account.";

            subtitle.textContent =
                "Create an account to save your StudySprint progress.";

            submitButton.textContent =
                "Create Account";

            switchText.textContent =
                "Already have an account?";

            switchButton.textContent =
                "Log In";

            passwordInput.autocomplete =
                "new-password";

        } else {

            title.textContent =
                "Welcome back.";

            subtitle.textContent =
                "Log in to continue your StudySprint account.";

            submitButton.textContent =
                "Log In";

            switchText.textContent =
                "Don't have an account?";

            switchButton.textContent =
                "Sign Up";

            passwordInput.autocomplete =
                "current-password";
        }

    }
);


/* =========================================================
   SUBMIT
========================================================= */

authForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        hideMessage();


        const email =
            emailInput.value
                .trim()
                .toLowerCase();

        const password =
            passwordInput.value;


        if (!email || !password) {

            showMessage(
                "Enter your email and password."
            );

            return;
        }


        submitButton.disabled =
            true;

        submitButton.textContent =
            signUpMode
                ? "Creating..."
                : "Logging in...";


        try {

            if (signUpMode) {

                await createAccount(
                    email,
                    password
                );

            } else {

                await login(
                    email,
                    password
                );
            }

        } catch (error) {

            console.error(error);

            showMessage(
                error.message ||
                "Something went wrong."
            );

        } finally {

            submitButton.disabled =
                false;

            submitButton.textContent =
                signUpMode
                    ? "Create Account"
                    : "Log In";
        }

    }
);


/* =========================================================
   CREATE ACCOUNT
========================================================= */

async function createAccount(
    email,
    password
) {

    const {
        data,
        error
    } =
        await supabaseClient.auth.signUp({

            email:
                email,

            password:
                password,

            options: {

                emailRedirectTo:
                    "https://ellfredthehuman.github.io/StudySprint/main/account/"
            }

        });


    if (error) {

        throw error;
    }


    /*
        If email confirmation is enabled,
        Supabase may return a user without
        an active session.
    */

    if (
        data.user &&
        !data.session
    ) {

        showMessage(
            "Account created! Check your email to confirm your account, then log in."
        );

        return;
    }


    if (data.session) {

        showLoggedIn(
            data.session.user
        );
    }
}


/* =========================================================
   LOGIN
========================================================= */

async function login(
    email,
    password
) {

    const {
        data,
        error
    } =
        await supabaseClient.auth.signInWithPassword({

            email:
                email,

            password:
                password
        });


    if (error) {

        throw error;
    }


    showLoggedIn(
        data.user
    );
}


/* =========================================================
   SHOW LOGGED IN
========================================================= */

function showLoggedIn(
    user
) {

    if (!user) {
        return;
    }


    authSection.style.display =
        "none";

    loggedInSection.style.display =
        "block";


    userEmail.textContent =
        user.email ||
        "Signed-in StudySprint user";
}


/* =========================================================
   CHECK CURRENT SESSION
========================================================= */

async function checkSession() {

    const {
        data,
        error
    } =
        await supabaseClient.auth.getSession();


    if (error) {

        console.error(error);

        return;
    }


    if (data.session) {

        showLoggedIn(
            data.session.user
        );
    }
}


/* =========================================================
   AUTH STATE
========================================================= */

supabaseClient.auth.onAuthStateChange(
    function (
        event,
        session
    ) {

        if (session) {

            showLoggedIn(
                session.user
            );

        } else {

            authSection.style.display =
                "block";

            loggedInSection.style.display =
                "none";
        }

    }
);


/* =========================================================
   CONTINUE
========================================================= */

continueButton.addEventListener(
    "click",
    function () {

        window.location.href =
            "../index.html";

    }
);


/* =========================================================
   LOG OUT
========================================================= */

logoutButton.addEventListener(
    "click",
    async function () {

        logoutButton.disabled =
            true;

        logoutButton.textContent =
            "Logging out...";


        const {
            error
        } =
            await supabaseClient.auth.signOut();


        if (error) {

            console.error(error);

            showMessage(
                error.message
            );

            logoutButton.disabled =
                false;

            logoutButton.textContent =
                "Log Out";

            return;
        }


        logoutButton.disabled =
            false;

        logoutButton.textContent =
            "Log Out";

    }
);


/* =========================================================
   START
========================================================= */

checkSession();
```
