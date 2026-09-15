(function () {

    var SUPABASE_URL =
        "https://yfteudoecpkosxjucuky.supabase.co";

    var SUPABASE_KEY =
        "sb_publishable_d7w3Cg-X8oTsmJLgIO_OgQ_3DmiqeMo";


    var supabaseClient = null;

    var selectedAvatar =
        localStorage.getItem("studysprint_avatar") || "👤";


    var defaultUsername =
        localStorage.getItem("studysprint_username") || "Student";


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
                reject(new Error("Could not load Supabase."));
            };


            document.head.appendChild(script);

        });

    }



    async function init() {

        try {

            await loadSupabase();


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


            var result =
                await supabaseClient.auth.getUser();


            var user =
                result.data.user;


            if (!user) {

                window.location.replace(
                    "/StudySprint/main/account/index.html"
                );

                return;
            }


            setupProfile(user);

            setupButtons(user);

            loadStats();

            setupAvatarPicker();

        } catch (error) {

            console.error(
                "StudySprint profile error:",
                error
            );

            setupProfile(null);

            setupButtons(null);

            loadStats();

            setupAvatarPicker();

        }

    }



    function setupProfile(user) {

        var username =
            localStorage.getItem("studysprint_username");


        if (!username && user) {

            username =
                user.user_metadata &&
                user.user_metadata.username
                    ? user.user_metadata.username
                    : null;

        }


        if (!username) {

            username = "Student";

        }


        username =
            String(username).trim();


        if (!username) {

            username = "Student";

        }


        var email =
            user && user.email
                ? user.email
                : "StudySprint account";


        document.getElementById(
            "profile-name"
        ).textContent = username;


        document.getElementById(
            "profile-email"
        ).textContent = email;


        document.getElementById(
            "avatar"
        ).textContent = selectedAvatar;


        document.getElementById(
            "profile-avatar"
        ).textContent = selectedAvatar;

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


        document.getElementById(
            "stat-streak"
        ).textContent = streak;


        document.getElementById(
            "stat-quizzes"
        ).textContent = quizzes;


        document.getElementById(
            "stat-achievements"
        ).textContent = achievements;

    }



    function setupButtons(user) {

        var editButton =
            document.getElementById(
                "edit-profile-button"
            );


        var modal =
            document.getElementById(
                "edit-modal"
            );


        var closeButton =
            document.getElementById(
                "close-modal"
            );


        var backdrop =
            document.getElementById(
                "modal-backdrop"
            );


        var saveButton =
            document.getElementById(
                "save-profile-button"
            );


        var usernameInput =
            document.getElementById(
                "username-input"
            );


        editButton.addEventListener(
            "click",
            function () {

                usernameInput.value =
                    localStorage.getItem(
                        "studysprint_username"
                    ) || "Student";


                selectedAvatar =
                    localStorage.getItem(
                        "studysprint_avatar"
                    ) || "👤";


                updateAvatarSelection();


                document
                    .getElementById("form-message")
                    .textContent = "";


                modal.classList.remove("hidden");

            }
        );


        closeButton.addEventListener(
            "click",
            closeModal
        );


        backdrop.addEventListener(
            "click",
            closeModal
        );


        saveButton.addEventListener(
            "click",
            function () {

                var username =
                    usernameInput.value.trim();


                if (!username) {

                    document
                        .getElementById("form-message")
                        .textContent =
                        "Please enter a username.";

                    return;
                }


                if (username.length > 24) {

                    document
                        .getElementById("form-message")
                        .textContent =
                        "Username is too long.";

                    return;
                }


                localStorage.setItem(
                    "studysprint_username",
                    username
                );


                localStorage.setItem(
                    "studysprint_avatar",
                    selectedAvatar
                );


                if (user && supabaseClient) {

                    supabaseClient.auth.updateUser({

                        data: {
                            username: username
                        }

                    }).catch(function (error) {

                        console.warn(
                            "Could not update auth metadata:",
                            error
                        );

                    });

                }


                document.getElementById(
                    "profile-name"
                ).textContent = username;


                document.getElementById(
                    "profile-email"
                ).textContent =
                    user && user.email
                        ? user.email
                        : "StudySprint account";


                document.getElementById(
                    "avatar"
                ).textContent =
                    selectedAvatar;


                document.getElementById(
                    "profile-avatar"
                ).textContent =
                    selectedAvatar;


                closeModal();

            }
        );


        document
            .getElementById("sign-out-button")
            .addEventListener(
                "click",
                async function () {

                    var button =
                        document.getElementById(
                            "sign-out-button"
                        );


                    button.disabled = true;


                    if (supabaseClient) {

                        try {

                            await supabaseClient.auth.signOut();

                        } catch (error) {

                            console.error(
                                "Sign out error:",
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



    function closeModal() {

        document
            .getElementById("edit-modal")
            .classList.add("hidden");

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
                            button.dataset.avatar;


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

                if (
                    button.dataset.avatar ===
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



    init();

})();
