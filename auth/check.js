/* =========================================================
   STUDYSPRINT AUTH CHECK
   ONLY USE THIS ON PROTECTED PAGES
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

    try {

        const {
            data,
            error
        } =
            await supabase.auth.getSession();


        if (error) {

            console.error(
                "Auth check failed:",
                error
            );

            window.location.replace(
                AUTH_URL
            );

            return;

        }


        /* =============================================
           NO SESSION
        ============================================= */

        if (!data.session) {

            window.location.replace(
                AUTH_URL
            );

            return;

        }


        /* =============================================
           SESSION EXISTS
           User is authenticated.
           DO NOTHING.
        ============================================= */

        console.log(
            "StudySprint: authenticated"
        );

    }

    catch (error) {

        console.error(
            "Authentication error:",
            error
        );


        window.location.replace(
            AUTH_URL
        );

    }

}


checkAuth();
