/* =========================================================
   STUDYSPRINT — ACCOUNT
   Supabase Authentication
========================================================= */


/* =========================================================
   SUPABASE
========================================================= */

const SUPABASE_URL =
    "https://yfteudoecpkosxjucuky.supabase.co";

const SUPABASE_KEY =
    "PASTE_YOUR_SUPABASE_PUBLISHABLE_KEY_HERE";


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

const loggedInScreen =
    document.getElementById("logged-in-screen");


const formTitle =
    document.getElementById("form-title");

const formSubtitle =
    document.getElementById("form-subtitle");


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

const confirmPasswordGroup =
    document.getElementById("confirm-password-group");

const confirmPasswordInput =
    document.getElementById("confirm-password");


const submitButton =
    document.getElementById("submit-button");


const message =
    document.getElementById("message");


const switchQuestion =
    document.getElementById("switch-question");

const switchButton =
    document.getElementById("switch-button");


const loggedInEmail =
    document.getElementById("logged-in-email");

const signoutButton =
    document.getElementById("signout-button");


/* =========================================================
   STATE
========================================================= */

let mode = "signin";


/* =========================================================
   SWITCH BETWEEN SIGN IN / SIGN UP
========================================================= */

function setMode(newMode) {

    mode = newMode;

    clearMessage();

    authForm.reset();


    if (mode === "signup") {

        formTitle.textContent =
            "Create your account.";

        formSubtitle.textContent =
            "Create an account to save your StudySprint progress.";

        signinTab.classList.remove("active");
        signupTab.classList.add("active");

        confirmPasswordGroup.classList.remove("hidden");

        confirmPasswordInput.required = true;

        submitButton.textContent =
            "Create Account";

        switchQuestion.textContent =
            "Already have an account?";

        switchButton.textContent =
            "Sign In";

        passwordInput.autocomplete =
            "new-password";

    } else {

        formTitle.textContent =
            "Welcome back.";

        formSubtitle.textContent =
            "Sign in to continue your StudySprint journey.";

        signupTab.classList.remove("active");
        signinTab.classList.add("active");

        confirmPasswordGroup.classList.add("hidden");

        confirmPasswordInput.required = false;

        submitButton.textContent =
            "Sign In";

        switchQuestion.textContent =
            "Don't have an account?";

        switchButton.textContent =
            "Sign Up";

        passwordInput.autocomplete =
            "current-password";
    }
}


/* =========================================================
   MESSAGE
========================================================= */

function showMessage(
    text,
    type
) {

    message.textContent = text;

    message.className =
        "message " + type;
}


function clearMessage() {

    message.textContent = "";

    message.className =
        "message";
}


/* =========================================================
   LOADING STATE
========================================================= */

function setLoading(isLoading) {

    submitButton.disabled =
        isLoading;

    if (isLoading) {

        submitButton.textContent =
            mode === "signup"
                ? "Creating Account..."
                : "Signing In...";

    } else {

        submitButton.textContent =
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


    if (password !== confirmPassword) {

        showMessage(
            "Your passwords do not match.",
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


    setLoading(true);


    try {

        const {
            data,
            error
        } =
            await supabaseClient.auth.signUp({

                email: email,

                password: password,

                options: {
                    emailRedirectTo:
                        "https://ellfredthehuman.github.io/StudySprint/main/account/"
                }

            });


        if (error) {
            throw error;
        }


        if (
            data.user &&
            data.user.identities &&
            data.user.identities.length === 0
        ) {

            showMessage(
                "An account with that email may already exist.",
                "error"
            );

            return;
        }


        showMessage(
            "Account created! Check your email to confirm your account.",
            "success"
        );


        authForm.reset();


    } catch (error) {

        console.error(error);

        showMessage(
            getFriendlyError(error),
            "error"
        );

    } finally {

        setLoading(false);
    }
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


    try {

        const {
            error
        } =
            await supabaseClient.auth.signInWithPassword({

                email: email,

                password: password

            });


        if (error) {
            throw error;
        }


        showMessage(
            "Signed in successfully.",
            "success"
        );


    } catch (error) {

        console.error(error);

        showMessage(
            getFriendlyError(error),
            "error"
        );

    } finally {

        setLoading(false);
    }
}


/* =========================================================
   FORM SUBMIT
========================================================= */

authForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        clearMessage();


        if (mode === "signup") {

            await signUp();

        } else {

            await signIn();
        }

    }
);


/* =========================================================
   SWITCH BUTTONS
========================================================= */

signinTab.addEventListener(
    "click",
    function () {

        setMode("signin");

    }
);


signupTab.addEventListener(
    "click",
    function () {

        setMode("signup");

    }
);


switchButton.addEventListener(
    "click",
    function () {

        if (mode === "signup") {

            setMode("signin");

        } else {

            setMode("signup");
        }

    }
);


/* =========================================================
   SHOW LOGGED-IN STATE
========================================================= */

function showLoggedIn(user) {

    authScreen.classList.add("hidden");

    loggedInScreen.classList.remove("hidden");


    if (user && user.email) {

        loggedInEmail.textContent =
            user.email;

    } else {

        loggedInEmail.textContent =
            "Your StudySprint account is ready.";
    }
}


/* =========================================================
   SHOW LOGGED-OUT STATE
========================================================= */

function showLoggedOut() {

    loggedInScreen.classList.add("hidden");

    authScreen.classList.remove("hidden");

    setMode("signin");
}


/* =========================================================
   SIGN OUT
========================================================= */

signoutButton.addEventListener(
    "click",
    async function () {

        signoutButton.disabled =
            true;

        signoutButton.textContent =
            "Signing Out...";


        const {
            error
        } =
            await supabaseClient.auth.signOut();


        if (error) {

            console.error(error);

            signoutButton.disabled =
                false;

            signoutButton.textContent =
                "Sign Out";

            return;
        }


        signoutButton.disabled =
            false;

        signoutButton.textContent =
            "Sign Out";

        showLoggedOut();

    }
);


/* =========================================================
   FRIENDLY ERROR MESSAGES
========================================================= */

function getFriendlyError(error) {

    if (!error || !error.message) {

        return "Something went wrong. Please try again.";
    }


    const text =
        error.message.toLowerCase();


    if (
        text.includes("invalid login credentials")
    ) {

        return "Incorrect email or password.";
    }


    if (
        text.includes("email not confirmed")
    ) {

        return "Please confirm your email before signing in.";
    }


    if (
        text.includes("user already registered")
    ) {

        return "An account with this email already exists.";
    }


    if (
        text.includes("password")
        &&
        text.includes("6")
    ) {

        return "Your password must be at least 6 characters.";
    }


    if (
        text.includes("rate limit")
    ) {

        return "Too many attempts. Please wait a moment and try again.";
    }


    return error.message;
}


/* =========================================================
   CHECK EXISTING SESSION
========================================================= */

async function checkSession() {

    try {

        const {
            data,
            error
        } =
            await supabaseClient.auth.getSession();


        if (error) {
            throw error;
        }


        if (data.session) {

            showLoggedIn(
                data.session.user
            );

        } else {

            showLoggedOut();
        }


    } catch (error) {

        console.error(
            "Session check failed:",
            error
        );

        showLoggedOut();
    }
}


/* =========================================================
   AUTH STATE CHANGES
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

            showLoggedOut();
        }

    }
);


/* =========================================================
   START
========================================================= */

setMode("signin");

checkSession();
