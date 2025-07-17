import {
    AHM,
    Ajinomoto,
    Blivac,
    Chemco,
    Daihatsu,
    Horisan,
    IHI,
    Karunia,
    Marugo,
    Musashi,
    NOP,
    SMK,
    SUTO,
    Teral,
    Toyota,
    Trident,
} from "../../assets/brands";
import {
    certified,
    engine,
    maintenance,
    team,
    time,
    wrench,
    // wrench,
} from "../../assets/icons";
import {
    airDryer,
    airQuality,
    Banner1,
    Banner2,
    Banner3,
    epoxyMetal,
    slide1,
    slide2,
    slide3,
    turboCompressor,
} from "../../assets/images";

export const heroImages = [Banner1, Banner2, Banner3];

export const brandLogos = [
    Blivac,
    Horisan,
    IHI,
    NOP,
    SMK,
    SUTO,
    Teral,
    Trident,
];

export const aboutImages = [slide1, slide2, slide3];

export const servicesIcon = [
    engine,
    time,
    certified,
    wrench,
    team,
    maintenance,
];

export const products = [
    {
        title: "IHI Turbo Compressor",
        subtitle: "Kompresor centrifugal berkualitas tinggi untuk industri",
        image: turboCompressor,
        brandLogo: IHI,
    },
    {
        title: "Air Quality & Audit",
        subtitle: "Alat quality dan audit untuk lingkungan kerja",
        image: airQuality,
        brandLogo: SUTO,
    },
    {
        title: "Epoxy Metal Repair Putty",
        subtitle:
            "Perekat dan sealant berkinerja tinggi yang dirancang untuk beragam aplikasi industri",
        image: epoxyMetal,
        brandLogo: NOP,
    },
    {
        title: "IHI Air Treatment",
        subtitle: "Air Treatment System",
        image: airDryer,
        brandLogo: IHI,
    },
];

export const trustedBrands = [
    Chemco,
    AHM,
    Toyota,
    Ajinomoto,
    Musashi,
    Karunia,
    Marugo,
    Daihatsu,
];
