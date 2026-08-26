/*
=========================================================
STUDYSPRINT PROTECTED PAGE AUTH CHECK
=========================================================

Use this ONLY on pages that require a login.

Example:
    ../auth/check.js

Do NOT put this on auth/index.html.
*/

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
        SUPABASE_KEY,
        {
            auth: {
                persistSession: true,
                autoRefreshToken: true,
                detectSessionInUrl: true
            }
        }
    );


const AUTH_PAGE =
    "/StudySprint/auth/index.html";


async function runAuthCheck() {

    console.log(
        "StudySprint: checking authentication..."
    );


    try {

        const {
            data,
            error
        } =
            await supabase.auth.getSession();


        if (error) {

            console.error(
                "StudySprint auth error:",
                error
            );

            return;

        }


        /*
        =============================================
        USER IS NOT SIGNED IN
        =============================================
        */

        if (!data.session) {

            console.log(
                "StudySprint: no session."
            );


            window.location.replace(
                AUTH_PAGE
            );


            return;

        }


        /*
        =============================================
        USER IS SIGNED IN
        =============================================
        */

        console.log(
            "StudySprint: signed in."
        );

        console.log(
            "User:",
            data.session.user.email
        );

    }

    catch (error) {

        console.error(
            "StudySprint authentication failed:",
            error
        );

    }

}


runAuthCheck();
