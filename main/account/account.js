/* =========================================================
   STUDYSPRINT — ACCOUNT
========================================================= */

const SUPABASE_URL =
    "https://yfteudoecpkosxjucuky.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_d7w3Cg-X8oTsmJLgIO_OgQ_3DmiqeMo";


/* =========================================================
   START SUPABASE
========================================================= */

if (!window.supabase) {
    throw new Error("Supabase failed to load.");
}

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

const email =
    document.getElementById("email");

const password =
    document.getElementById("password");

const confirmContainer =
    document.getElementById("confirm-container");

const confirmPassword =
    document.getElementById("confirm-password");

const submitButton =
    document.getElementById("submit-button");

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
   MODE
========================================================= */

let mode = "signin";


/* =========================================================
   SET MODE
========================================================= */

function setMode(newMode) {

    mode = newMode;

    message.textContent = "";
    message.className = "message";

    authForm.reset();


    if (mode === "signup") {

        title.textContent =
            "Create your account.";

        subtitle.textContent =
            "Create an account to save your StudySprint progress.";

        signinTab.classList.remove("active");
        signupTab.classList.add("active");

        confirmContainer.classList.remove("hidden");

        confirmPassword.required = true;

        submitButton.textContent =
            "Create Account";

        switchText.textContent =
            "Already have an account?";

        switchButton.textContent =
            "Sign In";

        password.autocomplete =
            "new-password";

    } else {

        title.textContent =
            "Welcome back.";

        subtitle.textContent =
            "Sign in to continue your StudySprint journey.";

        signupTab.classList.remove("active");
        signinTab.classList.add("active");

        confirmContainer.classList.add("hidden");

        confirmPassword.required = false;

        submitButton.textContent =
            "Sign In";

        switchText.textContent =
            "Don't have an account?";

        switchButton.textContent =
            "Sign Up";

        password.autocomplete =
            "current-password";
    }
}


/* =========================================================
   SIGN IN TAB
========================================================= */

signinTab.onclick = function () {
    setMode("signin");
};


/* =========================================================
   SIGN UP TAB
========================================================= */

signupTab.onclick = function () {
    setMode("signup");
};


/* =========================================================
   BOTTOM SWITCH BUTTON
========================================================= */

switchButton.onclick = function () {

    if (mode === "signin") {

        setMode("signup");

    } else {

        setMode("signin");
    }
};


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


/* =========================================================
   LOADING
========================================================= */

function setLoading(
    loading
) {

    submitButton.disabled =
        loading;

    signinTab.disabled =
        loading;

    signupTab.disabled =
        loading;

    switchButton.disabled =
        loading;


    if (loading) {

        if (mode === "signup") {

            submitButton.textContent =
                "Creating Account...";

        } else {

            submitButton.textContent =
                "Signing In...";
        }

    } else {

        if (mode === "signup") {

            submitButton.textContent =
                "Create Account";

        } else {

            submitButton.textContent =
                "Sign In";
        }
    }
}


/* =========================================================
   FORM SUBMIT
========================================================= */

authForm.onsubmit = async function (event) {

    event.preventDefault();

    message.textContent = "";
    message.className = "message";


    const userEmail =
        email.value.trim();

    const userPassword =
        password.value;


    if (!userEmail) {

        showMessage(
            "Please enter your email.",
            "error"
        );

        return;
    }


    if (!userPassword) {

        showMessage(
            "Please enter your password.",
            "error"
        );

        return;
    }


    /* =====================================================
       SIGN UP
    ===================================================== */

    if (mode === "signup") {

        const repeatedPassword =
            confirmPassword.value;


        if (
            userPassword !==
            repeatedPassword
        ) {

            showMessage(
                "The passwords do not match.",
                "error"
            );

            return;
        }


        if (
            userPassword.length < 6
        ) {

            showMessage(
                "Password must be at least 6 characters.",
                "error"
            );

            return;
        }


        setLoading(true);


        try {

            const result =
                await supabaseClient.auth.signUp({

                    email: userEmail,

                    password: userPassword,

                    options: {

                        emailRedirectTo:
                            "https://ellfredthehuman.github.io/StudySprint/main/account/"

                    }

                });


            if (result.error) {
                throw result.error;
            }


            authForm.reset();


            showMessage(
                "Account created! Check your email to confirm your account.",
                "success"
            );


        } catch (error) {

            console.error(
                "SIGN UP ERROR:",
                error
            );


            showMessage(
                getErrorMessage(error),
                "error"
            );

        } finally {

            setLoading(false);
        }


        return;
    }


    /* =====================================================
       SIGN IN
    ===================================================== */

    setLoading(true);


    try {

        const result =
            await supabaseClient.auth.signInWithPassword({

                email: userEmail,

                password: userPassword

            });


        if (result.error) {
            throw result.error;
        }


        showMessage(
            "Signed in successfully.",
            "success"
        );


    } catch (error) {

        console.error(
            "SIGN IN ERROR:",
            error
        );


        showMessage(
            getErrorMessage(error),
            "error"
        );

    } finally {

        setLoading(false);
    }

};


/* =========================================================
   LOGGED-IN SCREEN
========================================================= */

function showAccount(user) {

    authScreen.classList.add("hidden");

    accountScreen.classList.remove("hidden");


    if (
        user &&
        user.email
    ) {

        accountEmail.textContent =
            user.email;

    } else {

        accountEmail.textContent =
            "Your StudySprint account";
    }
}


/* =========================================================
   LOGGED-OUT SCREEN
========================================================= */

function showAuth() {

    accountScreen.classList.add("hidden");

    authScreen.classList.remove("hidden");

    setMode("signin");
}


/* =========================================================
   SIGN OUT
========================================================= */

logoutButton.onclick = async function () {

    logoutButton.disabled = true;

    logoutButton.textContent =
        "Signing Out...";


    try {

        const result =
            await supabaseClient.auth.signOut();


        if (result.error) {
            throw result.error;
        }


        showAuth();


    } catch (error) {

        console.error(
            "SIGN OUT ERROR:",
            error
        );

    } finally {

        logoutButton.disabled =
            false;

        logoutButton.textContent =
            "Sign Out";
    }
};


/* =========================================================
   ERROR MESSAGES
========================================================= */

function getErrorMessage(error) {

    if (
        !error ||
        !error.message
    ) {

        return "Something went wrong. Please try again.";
    }


    const text =
        error.message.toLowerCase();


    if (
        text.includes(
            "invalid login credentials"
        )
    ) {

        return "Incorrect email or password.";
    }


    if (
        text.includes(
            "email not confirmed"
        )
    ) {

        return "Please confirm your email before signing in.";
    }


    if (
        text.includes(
            "user already registered"
        )
    ) {

        return "An account with this email already exists.";
    }


    if (
        text.includes(
            "password"
        ) &&
        text.includes(
            "6"
        )
    ) {

        return "Password must be at least 6 characters.";
    }


    return error.message;
}


/* =========================================================
   CHECK EXISTING SESSION
========================================================= */

async function checkSession() {

    try {

        const result =
            await supabaseClient.auth.getSession();


        if (result.error) {
            throw result.error;
        }


        if (
            result.data &&
            result.data.session
        ) {

            showAccount(
                result.data.session.user
            );

        } else {

            showAuth();
        }


    } catch (error) {

        console.error(
            "SESSION ERROR:",
            error
        );

        showAuth();
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

            showAccount(
                session.user
            );

        } else {

            showAuth();
        }

    }
);


/* =========================================================
   START
========================================================= */

setMode("signin");

checkSession();
