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
   CHECK
========================================================= */

async function checkAuthentication() {

    const {
        data,
        error
    } =
        await supabase.auth.getSession();


    if (error) {

        console.error(
            "Authentication check failed:",
            error
        );

        return;

    }


    /*
       No session = not logged in.
    */

    if (!data.session) {

        window.location.replace(
            "../index.html"
        );

        return;

    }


    /*
       Get the logged-in user.
    */

    const user =
        data.session.user;


    const username =
        user
            ?.user_metadata
            ?.username ||
        "Player";


    /*
       Keep username available to
       the existing StudySprint UI.
    */

    localStorage.setItem(
        "username",
        username
    );

}


checkAuthentication();
```
