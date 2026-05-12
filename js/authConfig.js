// js/authConfig.js
const msalConfig = {
    auth: {
        clientId: "d2b137ef-4acc-488b-bf72-3aedcc5ee545",
        authority: "https://login.microsoftonline.com/c5598f60-6a92-4ebb-8cb7-26d72d709407",
        // Usamos window.location.origin para que sirva en local y en producción
        //redirectUri: window.location.origin + "/GMN_intranet/dashboard.html", 
        redirectUri: "https://sarudalf3.github.io/GMN_intranet/dashboard.html", // Asegúrate de que sea la URL completa
        navigateToLoginRequestUrl: false 
    },
    cache: {
        cacheLocation: "sessionStorage", 
        storeAuthStateInCookie: false,
    }
};

// Scopes necesarios para leer el perfil del usuario
const loginRequest = {
    scopes: ["User.Read"]
};

