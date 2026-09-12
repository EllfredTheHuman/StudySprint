/* =========================================================
   STUDYSPRINT — ACCOUNT
   Supabase authentication
========================================================= */


/* =========================================================
   SUPABASE
========================================================= */

const SUPABASE_URL =
    "https://yfteudoecpkosxjucuky.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_d7w3Cg-X8oTsmJLgIO_OgQ_3DmiqeMo";


const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


/* =========================================================
   ELEMENTS
========================================================= */

const authScreen =
    document.getElementById("auth-screen");

const accountScreen =
    document.getElementById("account-screen");

const title =
    document.getElementById("title");

const subtitle =
    document.getElementById("subtitle");

const signinTab =
    document.getElementById("signin-tab");

const signupTab =
    document.getElementById("signup-tab");

const authForm =
    document.getElementById("auth-form");

const emailInput =
    document.getElementById("email");

const passwordInput =
    document.getElementById("password");

const confirmContainer =
    document.getElementById("confirm-container");

const confirmPasswordInput =
    document.getElementById("confirm-password");

const submitButton =
    document.getElementById("submit-button");

const submitText =
    document.getElementById("submit-text");

const message =
    document.getElementById("message");

const switchText =
    document.getElementById("switch-text");

const switchButton =
    document.getElementById("switch-button");

const accountEmail =
    document.getElementById("account-email");

const logoutButton =
    document.getElementById("logout-button");


/* =========================================================
   STATE
========================================================= */

let mode = "signin";


/* =========================================================
   MESSAGE
========================================================= */

function showMessage(text, type = "") {

    message.textContent = text;

    message.className = "message";

    if (type) {
        message.classList.add(type);
    }

}


/* =========================================================
   MODE
========================================================= */

function setMode(newMode) {

    mode = newMode;

    showMessage("");

    if (mode === "signup") {

        title.textContent =
            "Create your account.";

        subtitle.textContent =
            "Join StudySprint and start learning.";

        signinTab.classList.remove("active");
        signupTab.classList.add("active");

        confirmContainer.classList.remove("hidden");

        confirmPasswordInput.required = true;

        submitText.textContent =
            "Create Account";

        switchText.textContent =
            "Already have an account?";

        switchButton.textContent =
            "Sign In";

        passwordInput.autocomplete =
            "new-password";

    } else {

        title.textContent =
            "Welcome back.";

        subtitle.textContent =
            "Sign in to continue your StudySprint journey.";

        signupTab.classList.remove("active");
        signinTab.classList.add("active");

        confirmContainer.classList.add("hidden");

        confirmPasswordInput.required = false;

        confirmPasswordInput.value = "";

        submitText.textContent =
            "Sign In";

        switchText.textContent =
            "Don't have an account?";

        switchButton.textContent =
            "Sign Up";

        passwordInput.autocomplete =
            "current-password";
    }

}


/* =========================================================
   LOADING
========================================================= */

function setLoading(loading) {

    submitButton.disabled = loading;

    if (loading) {

        submitText.textContent =
            mode === "signup"
                ? "Creating account..."
                : "Signing in...";

    } else {

        submitText.textContent =
            mode === "signup"
                ? "Create Account"
                : "Sign In";

    }

}


/* =========================================================
   SIGN UP
========================================================= */

async function signUp() {

    const email =
        emailInput.value.trim();

    const password =
        passwordInput.value;

    const confirmPassword =
        confirmPasswordInput.value;


    if (password.length < 6) {

        showMessage(
            "Your password must be at least 6 characters.",
            "error"
        );

        return;
    }


    if (password !== confirmPassword) {

        showMessage(
            "Your passwords don't match.",
            "error"
        );

        return;
    }


    setLoading(true);


    const { error } =
        await supabaseClient.auth.signUp({

            email: email,

            password: password,

            options: {

                emailRedirectTo:
                    "https://ellfredthehuman.github.io/StudySprint/main/account/"

            }

        });


    setLoading(false);


    if (error) {

        showMessage(
            error.message,
            "error"
        );

        return;
    }


    showMessage(
        "Account created! Check your email to confirm your account.",
        "success"
    );

}


/* =========================================================
   SIGN IN
========================================================= */

async function signIn() {

    const email =
        emailInput.value.trim();

    const password =
        passwordInput.value;


    setLoading(true);


    const { data, error } =
        await supabaseClient.auth.signInWithPassword({

            email: email,

            password: password

        });


    setLoading(false);


    if (error) {

        showMessage(
            error.message,
            "error"
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
   AUTH FORM
========================================================= */

authForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        showMessage("");

        if (!emailInput.value.trim()) {

            showMessage(
                "Please enter your email address.",
                "error"
            );

            return;
        }


        if (!passwordInput.value) {

            showMessage(
                "Please enter your password.",
                "error"
            );

            return;
        }


        try {

            if (mode === "signup") {

                await signUp();

            } else {

                await signIn();

            }

        } catch (error) {

            showMessage(
                "Something went wrong. Please try again.",
                "error"
            );

            setLoading(false);

        }

    }
);


/* =========================================================
   TABS
========================================================= */

signinTab.onclick = function () {

    setMode("signin");

};


signupTab.onclick = function () {

    setMode("signup");

};


switchButton.onclick = function () {

    setMode(
        mode === "signin"
            ? "signup"
            : "signin"
    );

};


/* =========================================================
   LOGGED-IN SCREEN
========================================================= */

function showLoggedIn(user) {

    authScreen.classList.add("hidden");

    accountScreen.classList.remove("hidden");

    accountEmail.textContent =
        user.email || "Account";

}


/* =========================================================
   LOGGED-OUT SCREEN
========================================================= */

function showLoggedOut() {

    accountScreen.classList.add("hidden");

    authScreen.classList.remove("hidden");

}


/* =========================================================
   LOGOUT
========================================================= */

logoutButton.onclick =
    async function () {

        const { error } =
            await supabaseClient.auth.signOut();


        if (error) {

            console.error(error);

            return;
        }


        emailInput.value = "";

        passwordInput.value = "";

        confirmPasswordInput.value = "";

        showLoggedOut();

        setMode("signin");

    };


/* =========================================================
   CHECK EXISTING SESSION
========================================================= */

async function checkSession() {

    const {
        data,
        error
    } =
        await supabaseClient.auth.getSession();


    if (error) {

        console.error(
            "Session error:",
            error
        );

        return;
    }


    if (data.session) {

        showLoggedIn(
            data.session.user
        );

    } else {

        showLoggedOut();

    }

}


/* =========================================================
   AUTH STATE CHANGES
========================================================= */

supabaseClient.auth.onAuthStateChange(
    function (event, session) {

        if (session) {

            showLoggedIn(
                session.user
            );

        } else {

            showLoggedOut();

        }

    }
);


/* =========================================================
   START
========================================================= */

setMode("signin");

checkSession();
