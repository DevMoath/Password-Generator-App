import Page from "./Page";
import PasswordGenerator from "./PasswordGenerator";

window.$ = require("jquery");
require("bootstrap/dist/css/bootstrap.min.css");
require("@fortawesome/fontawesome-free/js/fontawesome.min");
require("@fortawesome/fontawesome-free/js/brands.min");
require("@fortawesome/fontawesome-free/js/solid.min");
require("./index.css");
window.swal = require("sweetalert2");

window.onload = () => {
    const page = new Page();
    const app = new PasswordGenerator(page);
    page.init(app);
    page.generate.click();
};
