(function () {

    var SUPABASE_URL =
        "https://yfteudoecpkosxjucuky.supabase.co";

    var SUPABASE_KEY =
        "sb_publishable_d7w3Cg-X8oTsmJLgIO_OgQ_3DmiqeMo";

    var script =
        document.createElement("script");

    script.src =
        "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";

    script.onload = async function () {

        var client =
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

        try {

            var result =
                await client.auth.getUser();

            var user =
                result.data.user;

            if (!user) {

                window.location.replace(
                    "/StudySprint/main/account/index.html"
                );

                return;
            }

            document.documentElement.style.visibility =
                "visible";

        } catch (error) {

            console.error(
                "StudySprint auth error:",
                error
            );

            window.location.replace(
                "/StudySprint/main/account/index.html"
            );
        }
    };

    script.onerror = function () {

        window.location.replace(
            "/StudySprint/main/account/index.html"
        );
    };

    document.documentElement.style.visibility =
        "hidden";

    document.head.appendChild(script);

})();
