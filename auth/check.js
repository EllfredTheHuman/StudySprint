```javascript
/* =========================================================
   STUDYSPRINT AUTH CHECK
========================================================= */

import {
    createClient
} from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";


/* =========================================================
   SUPABASE
========================================================= */

const SUPABASE_URL =
    "https://yfteudoecpkosxjucuky.supabase.co";


const SUPABASE_KEY =
    "sb_publishable_d7w3Cg-X8oTsmJLgIO_OgQ_3DmiqeMo";


const supabase =
    createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


/* =========================================================
   CHECK SESSION
========================================================= */

async function checkAuthentication() {

    const {
        data,
        error
    } =
        await supabase.auth.getSession();


    if (error) {

        console.error(
            "Authentication error:",
            error
        );

        return;

    }


    /*
       If there is no session,
       send the user to the auth page.
    */

    if (!data.session) {

        window.location.replace(
            "../auth/index.html"
        );

        return;

    }


    /*
       User is logged in.

       Save their username locally
       for the rest of StudySprint.
    */

    const user =
        data.session.user;


    const username =
        user
            ?.user_metadata
            ?.username ||
        "Player";


    localStorage.setItem(
        "username",
        username
    );

}


/* =========================================================
   START
========================================================= */

checkAuthentication();
```
