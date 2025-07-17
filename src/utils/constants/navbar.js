import { en, id } from "../../assets/icons";
import { ID } from "../../lang/id";

export const navItems = [
    { name: ID.nav.home, path: "/" },
    { name: ID.nav.about, path: "/about" },
    { name: ID.nav.products, path: "/products" },
    { name: ID.nav.services, path: "/service" },
    { name: ID.nav.contact, path: "/contact" },
    { name: ID.nav.blog, path: "/blog" },
];

export const languages = [
    { code: "EN", name: "English", flag: en },
    { code: "ID", name: "Indonesia", flag: id },
];
