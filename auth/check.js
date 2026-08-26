/* =========================================================
   STUDYSPRINT AUTH CHECK
========================================================= */

import {
    createClient
} from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";


const SUPABASE_URL =
    "https://yfteudoecpkosxjucuky.supabase.co";


const SUPABASE_KEY =
    "sb_publishable_d7w3Cg-X8oTsmJLgIO_OgQ_3DmiqeMo";


const supabase =
    createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


const AUTH_URL =
    "/StudySprint/auth/";


async function checkAuth() {

    console.log(
        "StudySprint auth check started"
    );


    try {

        const result =
            await supabase.auth.getSession();


        console.log(
            "Supabase session result:",
            result
        );


        const session =
            result.data?.session;


        /* =============================================
           SESSION EXISTS
        ============================================= */

        if (session) {

            console.log(
                "User is signed in."
            );

            console.log(
                "Email:",
                session.user.email
            );

            /*
             * IMPORTANT:
             *
             * DO NOT REDIRECT.
             *
             * The user is already on a protected
             * StudySprint page, so we simply allow
             * the page to continue loading.
             */

            return;

        }


        /* =============================================
           NO SESSION
        ============================================= */

        console.log(
            "No active session."
        );


        /*
         * Small delay so the browser does not get
         * trapped in an instant redirect loop while
         * debugging.
         */

        setTimeout(
            function() {

                window.location.href =
                    AUTH_URL;

            },
            500
        );

    }

    catch (error) {

        console.error(
            "AUTH CHECK ERROR:",
            error
        );


        /*
         * Do NOT immediately redirect on an error.
         *
         * This prevents an error from creating
         * an infinite redirect loop.
         */

        document.body.insertAdjacentHTML(
            "afterbegin",
            `
            <div style="
                position:fixed;
                inset:0;
                z-index:999999;
                display:flex;
                align-items:center;
                justify-content:center;
                padding:30px;
                background:#080a12;
                color:white;
                font-family:Arial,sans-serif;
                text-align:center;
            ">
                <div>
                    <h1>Authentication Error</h1>
                    <p>
                        StudySprint couldn't check your login.
                    </p>
                    <p style="color:#999">
                        Open the browser console to see the error.
                    </p>
                </div>
            </div>
            `
        );

    }

}


checkAuth();
