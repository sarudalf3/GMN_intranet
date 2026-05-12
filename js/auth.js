// js/auth.js
const myMSALObj = new msal.PublicClientApplication(msalConfig);

// Esta función se ejecuta CADA VEZ que se carga una página que use este script
myMSALObj.handleRedirectPromise()
    .then((response) => {
        if (response !== null) {
            console.log("Sesión capturada de la URL");
            window.location.href("dashboard.html");
        } else {
            // Si no venimos de un login, revisamos si ya hay cuenta
            checkAccount();
        }
    })
    .catch((error) => {
        if (error.errorMessage && error.errorMessage.includes("interaction_in_progress")) {
            console.warn("Hay una interacción en curso, esperando...");
        } else {
            console.error("Error en MSAL:", error);
        }
    });

function checkAccount() {
    const currentAccounts = myMSALObj.getAllAccounts();
    if (currentAccounts.length > 0) {
        // Si ya hay sesión y estamos en el index, saltamos al dashboard
        if (window.location.pathname.includes("index.html") || window.location.pathname.endsWith("/GMN_intranet/")) {
            window.location.href("dashboard.html");
        }
    }
}

function signIn() {
    if (myMSALObj.interactionInProgress) return;
    myMSALObj.loginRedirect(loginRequest);
}

function signOut() {
    const logoutRequest = {
        account: myMSALObj.getAccountByHomeId(sessionStorage.getItem("msalAccount")),
        postLogoutRedirectUri: window.location.origin + "/GMN_intranet/index.html",
    };
    myMSALObj.logoutRedirect(logoutRequest);
}