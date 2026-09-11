```js
/* =========================================================
   STUDYSPRINT — ACCOUNT
========================================================= */


/* =========================================================
   SUPABASE SETUP
========================================================= */

const SUPABASE_URL =
    "https://yfteudoecpkosxjucuky.supabase.co";


const SUPABASE_KEY =
    "sb_publishable_d7w3Cg-X8oTsmJLgIO_OgQ_3DmiqeMo";


if (
    typeof window.supabase === "undefined"
) {

    document.getElementById("message").textContent =
        "Could not load the account system.";

    throw new Error(
        "Supabase library did not load."
    );
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
   MODE SWITCHING
========================================================= */

function setMode(newMode) {

    mode = newMode;

    clearMessage();

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
            "Sign in to your StudySprint account.";


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
   MESSAGES
========================================================= */

function clearMessage() {

    message.textContent = "";

    message.className =
        "message";
}


function showMessage(
    text,
    type
) {

    message.textContent =
        text;

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
   SIGN UP
========================================================= */

async function signUp() {

    const userEmail =
        email.value.trim();

    const userPassword =
        password.value;

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


        showMessage(
            "Account created! Check your email to confirm your account.",
            "success"
        );


        authForm.reset();


    } catch (error) {

        console.error(
            "Sign up error:",
            error
        );


        showMessage(
            getErrorMessage(error),
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

    const userEmail =
        email.value.trim();

    const userPassword =
        password.value;


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
            "Sign in error:",
            error
        );


        showMessage(
            getErrorMessage(error),
            "error"
        );

    } finally {

        setLoading(false);
    }
}


/* =========================================================
   FORM
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
   SWITCH BUTTON
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

        if (mode === "signin") {

            setMode("signup");

        } else {

            setMode("signin");
        }

    }
);


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

logoutButton.addEventListener(
    "click",
    async function () {

        logoutButton.disabled =
            true;

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
                "Sign out error:",
                error
            );

        } finally {

            logoutButton.disabled =
                false;

            logoutButton.textContent =
                "Sign Out";
        }

    }
);


/* =========================================================
   ERROR TRANSLATION
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
   CHECK SESSION
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
            "Session error:",
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
```
