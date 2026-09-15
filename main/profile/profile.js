(function () {

    var SUPABASE_URL =
        "https://yfteudoecpkosxjucuky.supabase.co";

    var SUPABASE_KEY =
        "sb_publishable_d7w3Cg-X8oTsmJLgIO_OgQ_3DmiqeMo";


    var supabaseClient = null;

    var selectedAvatar =
        localStorage.getItem("studysprint_avatar") || "S";


    function getElement(id) {
        return document.getElementById(id);
    }


    function setText(id, value) {

        var element = getElement(id);

        if (element) {
            element.textContent = value;
        }

    }


    function loadSupabase() {

        return new Promise(function (resolve, reject) {

            if (window.supabase) {
                resolve();
                return;
            }


            var script =
                document.createElement("script");


            script.src =
                "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";


            script.onload = function () {
                resolve();
            };


            script.onerror = function () {
                reject(
                    new Error("Supabase failed to load.")
                );
            };


            document.head.appendChild(script);

        });

    }



    async function createSupabase() {

        try {

            await loadSupabase();

            if (
                window.supabase &&
                window.supabase.createClient
            ) {

                supabaseClient =
                    window.supabase.createClient(
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

            }

        } catch (error) {

            console.warn(
                "Supabase could not initialise:",
                error
            );

        }

    }



    async function getUser() {

        if (!supabaseClient) {
            return null;
        }


        try {

            var result =
                await supabaseClient.auth.getUser();


            if (
                result &&
                result.data &&
                result.data.user
            ) {

                return result.data.user;

            }

        } catch (error) {

            console.warn(
                "Could not get Supabase user:",
                error
            );

        }


        return null;

    }



    function getUsername(user) {

        var saved =
            localStorage.getItem(
                "studysprint_username"
            );


        if (
            saved &&
            saved.trim()
        ) {

            return saved.trim();

        }


        if (
            user &&
            user.user_metadata &&
            user.user_metadata.username
        ) {

            return String(
                user.user_metadata.username
            ).trim();

        }


        return "Student";

    }



    function setupProfile(user) {

        var username =
            getUsername(user);


        var email =
            user && user.email
                ? user.email
                : "StudySprint account";


        setText(
            "profile-name",
            username
        );


        setText(
            "profile-email",
            email
        );


        setText(
            "avatar",
            selectedAvatar
        );


        setText(
            "profile-avatar",
            selectedAvatar
        );


        var usernameInput =
            getElement("username-input");


        if (usernameInput) {

            usernameInput.value =
                username;

        }

    }



    function loadStats() {

        var streak =
            Number(
                localStorage.getItem("streak")
            ) || 0;


        var quizzes =
            Number(
                localStorage.getItem("quizzes")
            ) || 0;


        if (!quizzes) {

            quizzes =
                Number(
                    localStorage.getItem(
                        "quizzes_completed"
                    )
                ) || 0;

        }


        var achievements =
            Number(
                localStorage.getItem("achievements")
            ) || 0;


        setText(
            "stat-streak",
            streak
        );


        setText(
            "stat-quizzes",
            quizzes
        );


        setText(
            "stat-achievements",
            achievements
        );

    }



    function openModal() {

        var modal =
            getElement("edit-modal");


        var input =
            getElement("username-input");


        if (!modal) {
            return;
        }


        if (input) {

            input.value =
                localStorage.getItem(
                    "studysprint_username"
                ) || "Student";

        }


        selectedAvatar =
            localStorage.getItem(
                "studysprint_avatar"
            ) || "S";


        updateAvatarSelection();


        var message =
            getElement("form-message");


        if (message) {
            message.textContent = "";
        }


        modal.classList.remove("hidden");

        document.body.classList.add(
            "modal-open"
        );

    }



    function closeModal() {

        var modal =
            getElement("edit-modal");


        if (modal) {

            modal.classList.add("hidden");

        }


        document.body.classList.remove(
            "modal-open"
        );

    }



    function setupEditButton() {

        var button =
            getElement(
                "edit-profile-button"
            );


        if (!button) {

            console.warn(
                "StudySprint: edit-profile-button not found."
            );

            return;

        }


        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                openModal();

            }
        );

    }



    function setupModal() {

        var closeButton =
            getElement(
                "close-modal"
            );


        var backdrop =
            getElement(
                "modal-backdrop"
            );


        var saveButton =
            getElement(
                "save-profile-button"
            );


        if (closeButton) {

            closeButton.addEventListener(
                "click",
                function () {

                    closeModal();

                }
            );

        }


        if (backdrop) {

            backdrop.addEventListener(
                "click",
                function () {

                    closeModal();

                }
            );

        }


        if (saveButton) {

            saveButton.addEventListener(
                "click",
                saveProfile
            );

        }

    }



    async function saveProfile() {

        var input =
            getElement(
                "username-input"
            );


        var message =
            getElement(
                "form-message"
            );


        var button =
            getElement(
                "save-profile-button"
            );


        if (!input) {
            return;
        }


        var username =
            input.value.trim();


        if (!username) {

            if (message) {

                message.textContent =
                    "Please enter a username.";

            }

            return;

        }


        if (username.length > 24) {

            if (message) {

                message.textContent =
                    "Username must be 24 characters or less.";

            }

            return;

        }


        if (button) {
            button.disabled = true;
        }


        localStorage.setItem(
            "studysprint_username",
            username
        );


        localStorage.setItem(
            "studysprint_avatar",
            selectedAvatar
        );


        setText(
            "profile-name",
            username
        );


        setText(
            "avatar",
            selectedAvatar
        );


        setText(
            "profile-avatar",
            selectedAvatar
        );


        if (
            supabaseClient &&
            supabaseClient.auth
        ) {

            try {

                await supabaseClient.auth.updateUser({

                    data: {
                        username: username
                    }

                });

            } catch (error) {

                console.warn(
                    "Username saved locally, but Supabase metadata could not be updated:",
                    error
                );

            }

        }


        if (button) {
            button.disabled = false;
        }


        closeModal();

    }



    function setupAvatarPicker() {

        var buttons =
            document.querySelectorAll(
                "#avatar-picker button"
            );


        buttons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        selectedAvatar =
                            button.dataset.avatar || "S";


                        updateAvatarSelection();

                    }
                );

            }
        );


        updateAvatarSelection();

    }



    function updateAvatarSelection() {

        var buttons =
            document.querySelectorAll(
                "#avatar-picker button"
            );


        buttons.forEach(
            function (button) {

                var avatar =
                    button.dataset.avatar;


                if (
                    avatar ===
                    selectedAvatar
                ) {

                    button.classList.add(
                        "selected"
                    );

                } else {

                    button.classList.remove(
                        "selected"
                    );

                }

            }
        );

    }



    function setupSignOut() {

        var button =
            getElement(
                "sign-out-button"
            );


        if (!button) {
            return;
        }


        button.addEventListener(
            "click",
            async function () {

                button.disabled = true;


                if (
                    supabaseClient &&
                    supabaseClient.auth
                ) {

                    try {

                        await supabaseClient.auth.signOut();

                    } catch (error) {

                        console.warn(
                            "Supabase sign out error:",
                            error
                        );

                    }

                }


                window.location.replace(
                    "/StudySprint/main/account/index.html"
                );

            }
        );

    }



    async function init() {

        /*
         * Set up the UI FIRST.
         * This means Edit Profile still works even
         * if Supabase has a problem.
         */

        setupProfile(null);

        loadStats();

        setupEditButton();

        setupModal();

        setupAvatarPicker();

        setupSignOut();


        /*
         * Supabase is secondary.
         */

        await createSupabase();


        var user =
            await getUser();


        if (user) {

            setupProfile(user);

        }

    }



    /*
     * Wait until the page exists before touching it.
     */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            init
        );

    } else {

        init();

    }

})();
