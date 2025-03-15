import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    url: "http://localhost:8443",
    realm: "local",
    clientId: "frontend-app"
});

export default keycloak;
