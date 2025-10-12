// data/products.js
import {
    // Vacuum - Blovac
    VacuumBlovacBlovacBlowbackDrum,
    VacuumBlovacBlovacSilentVs300Vs500StandardModel,
    VacuumBlovacBlovacSilentVs300hVs500hHighVacuumModel,
    VacuumBlovacBlovacSilentVs530wVs550wHighCapacityModel,
    VacuumBlovacBlovacV300V500StandardModel,
    VacuumBlovacBlovacV300hV500hHighVacuumModel,
    VacuumBlovacBlovacV530wV550wHighCapacityModel,

    // Compressor - IHI
    CompressorIhiIhiCompressorT2Series,
    CompressorIhiIhiCompressorT3Series,
    CompressorIhiIhiCompressorTraSeries,
    CompressorIhiIhiCompressorTreSeries,
    CompressorIhiIhiCompressorTrxSeries,
    CompressorIhiIhiCompressorTrzSeries,

    // Compressor - Raifu
    CompressorRaifuMeMsSeriesPowerFrequencyWithoutTankCompressor1,
    CompressorRaifuMeMsSeriesPowerFrequencyWithoutTankCompressor2,
    CompressorRaifuMsSeriesSingleStageScrewAirCompressor1,
    CompressorRaifuMsSeriesSingleStageScrewAirCompressor2,
    CompressorRaifuWeSeriesSingleStageScrewAirCompressor1,
    CompressorRaifuWeSeriesSingleStageScrewAirCompressor2,
    CompressorRaifuYtSeriesIntegratedSingleStagePmVsdAirCooledCompactCompressor1,
    CompressorRaifuYtSeriesIntegratedSingleStagePmVsdAirCooledCompactCompressor2,

    // Compressor - Taitian
    CompressorTaitianTaitianScrewCompressorTa1,
    CompressorTaitianTaitianScrewCompressorTa2,
    CompressorTaitianTaitianScrewCompressorTb1,
    CompressorTaitianTaitianScrewCompressorTb2,
    CompressorTaitianTaitianScrewCompressorTe1,
    CompressorTaitianTaitianScrewCompressorTe2,
    CompressorTaitianTaitianScrewCompressorTf1,
    CompressorTaitianTaitianScrewCompressorTf2,
    CompressorTaitianTaitianScrewCompressorTg1,
    CompressorTaitianTaitianScrewCompressorTg2,
    CompressorTaitianTaitianScrewCompressorTk20081,
    CompressorTaitianTaitianScrewCompressorTk20082,
    CompressorTaitianTaitianScrewCompressorTk7581,
    CompressorTaitianTaitianScrewCompressorTk7582,
    CompressorTaitianTaitianScrewCompressorTq1,
    CompressorTaitianTaitianScrewCompressorTq2,

    // Impact Tools - Raifu
    ImpactToolsRaifuRaifuImpactToolsRf1300,
    ImpactToolsRaifuRaifuImpactToolsRf380a,
    ImpactToolsRaifuRaifuImpactToolsRf380b,
    ImpactToolsRaifuRaifuImpactToolsRf800,
    ImpactToolsRaifuRaifuImpactToolsRf990,

    // Oil Pump - NOP
    OilPumpNopNop1hgHighPressureTrochoidPumpSmallCapacityOilPumpUpTo25MpaForHydraulicSystems,
    OilPumpNopNop1meTrochoidPumpCompactOilPumpForLubricationAndHydraulicOil18LminMadeInJapan,
    OilPumpNopNop1raTrochoidPumpBiDirectionalReversibleOilPumpForHydraulicAndCirculationSystems,
    OilPumpNopNop2hbTrochoidPumpMediumCapacityInternalGearPumpForIndustrialLubricatingOil,
    OilPumpNopNop2hwmTrochoidPumpCoolantFluidTransferPumpWithFilterForCncAndMachineTools,
    OilPumpNopNop3vTrochoidPumpHighViscosityOilPumpForGearOilAndHeavyLubricantApplications,
    OilPumpNopNop4amTrochoidPumpLargeCapacityOilPumpUpTo586LminForMarineAndTurbineSystems,

    // Water Pump - Teral
    WaterPumpTeralLpLinePump,
    WaterPumpTeralMkhsVolutePumps,
    WaterPumpTeralNxVolutePumps,
    WaterPumpTeralSjm2Sjm3VolutePumps,
    WaterPumpTeralSjmsVolutePumps,
    WaterPumpTeralMsuDeepWellSubmersiblePumps,
    WaterPumpTeralMsuhDeepWellSubmersiblePumps,
    WaterPumpTeralMsusDeepWellSubmersiblePumps,
} from "../../assets/Produk";
import {
    Blovac,
    Horisan,
    IHI,
    NOP,
    SMK,
    SUTO,
    Teral,
    Trident,
    Taitian,
    Raifu,
} from "../../assets/brands";
import { brandLogos } from "../constants/home";

export const products = [
    // ─── VACUUM (7 produk) ────────────────────────────────────
    {
        id: 1,
        slug: "blovac-blowback-drum",
        category: "vacuum",
        brand: "blovac",
        brandLogo: Blovac,
        brandName: "Blovac",
        image: VacuumBlovacBlovacBlowbackDrum,
        images: [VacuumBlovacBlovacBlowbackDrum],
        title: "Blovac Blowback Drum",
        subtitle: "Sistem vacuum industri dengan teknologi blowback otomatis",
        description:
            "Blovac Blowback Drum menawarkan pembersihan kontinu tanpa henti operasi, ideal untuk aplikasi debu berat di pabrik dan workshop.",
        specifications: false,
        features: false,
        translations: {
            EN: {
                title: "Blovac Blowback Drum",
                subtitle:
                    "Industrial vacuum system with automatic blowback technology",
                description:
                    "The Blovac Blowback Drum enables continuous operation with automatic filter cleaning, perfect for heavy-duty dust applications in factories and workshops.",
                specifications: false,
                features: false,
            },
        },
    },
    {
        id: 2,
        slug: "blovac-silent-vs300-vs500-standard-model",
        category: "vacuum",
        brand: "blovac",
        brandLogo: Blovac,
        brandName: "Blovac",
        image: VacuumBlovacBlovacSilentVs300Vs500StandardModel,
        images: [VacuumBlovacBlovacSilentVs300Vs500StandardModel],
        title: "Blovac Silent VS300-VS500 Standard Model",
        subtitle: "Vacuum industri senyap dengan kapasitas menengah",
        description:
            "Dirancang untuk lingkungan kerja yang membutuhkan kebisingan rendah tanpa mengorbankan daya hisap.",
        specifications: false,
        features: false,
        translations: {
            EN: {
                title: "Blovac Silent VS300-VS500 Standard Model",
                subtitle: "Quiet industrial vacuum with medium capacity",
                description:
                    "Designed for low-noise environments without compromising suction power.",
                specifications: false,
                features: false,
            },
        },
    },
    {
        id: 3,
        slug: "blovac-silent-vs300h-vs500h-high-vacuum-model",
        category: "vacuum",
        brand: "blovac",
        brandLogo: Blovac,
        brandName: "Blovac",
        image: VacuumBlovacBlovacSilentVs300hVs500hHighVacuumModel,
        images: [VacuumBlovacBlovacSilentVs300hVs500hHighVacuumModel],
        title: "Blovac Silent VS300H-VS500H High Vacuum Model",
        subtitle: "Model vacuum tekanan tinggi untuk aplikasi khusus",
        description:
            "Menyediakan tingkat vakum lebih dalam untuk kebutuhan proses industri yang memerlukan tekanan rendah ekstrem.",
        specifications: false,
        features: false,
        translations: {
            EN: {
                title: "Blovac Silent VS300H-VS500H High Vacuum Model",
                subtitle: "High vacuum model for specialized applications",
                description:
                    "Delivers deeper vacuum levels for industrial processes requiring extreme low pressure.",
                specifications: false,
                features: false,
            },
        },
    },
    {
        id: 4,
        slug: "blovac-silent-vs530w-vs550w-high-capacity-model",
        category: "vacuum",
        brand: "blovac",
        brandLogo: Blovac,
        brandName: "Blovac",
        image: VacuumBlovacBlovacSilentVs530wVs550wHighCapacityModel,
        images: [VacuumBlovacBlovacSilentVs530wVs550wHighCapacityModel],
        title: "Blovac Silent VS530W-VS550W High Capacity Model",
        subtitle: "Kapasitas besar untuk volume debu tinggi",
        description:
            "Dirancang untuk menangani volume debu sangat besar dalam operasi berkelanjutan.",
        specifications: false,
        features: false,
        translations: {
            EN: {
                title: "Blovac Silent VS530W-VS550W High Capacity Model",
                subtitle: "High-capacity model for high dust volume",
                description:
                    "Designed to handle very high dust volumes in continuous operation.",
                specifications: false,
                features: false,
            },
        },
    },
    {
        id: 5,
        slug: "blovac-v300-v500-standard-model",
        category: "vacuum",
        brand: "blovac",
        brandLogo: Blovac,
        brandName: "Blovac",
        image: VacuumBlovacBlovacV300V500StandardModel,
        images: [VacuumBlovacBlovacV300V500StandardModel],
        title: "Blovac V300-V500 Standard Model",
        subtitle: "Model standar andalan untuk berbagai aplikasi",
        description:
            "Solusi vacuum serbaguna yang telah terbukti di berbagai industri manufaktur.",
        specifications: false,
        features: false,
        translations: {
            EN: {
                title: "Blovac V300-V500 Standard Model",
                subtitle: "Reliable standard model for various applications",
                description:
                    "A versatile vacuum solution proven across multiple manufacturing industries.",
                specifications: false,
                features: false,
            },
        },
    },
    {
        id: 6,
        slug: "blovac-v300h-v500h-high-vacuum-model",
        category: "vacuum",
        brand: "blovac",
        brandLogo: Blovac,
        brandName: "Blovac",
        image: VacuumBlovacBlovacV300hV500hHighVacuumModel,
        images: [VacuumBlovacBlovacV300hV500hHighVacuumModel],
        title: "Blovac V300H-V500H High Vacuum Model",
        subtitle: "Versi high vacuum dari model standar",
        description:
            "Meningkatkan kemampuan vakum untuk aplikasi yang memerlukan tekanan lebih rendah.",
        specifications: false,
        features: false,
        translations: {
            EN: {
                title: "Blovac V300H-V500H High Vacuum Model",
                subtitle: "High vacuum version of the standard model",
                description:
                    "Enhanced vacuum capability for applications requiring lower pressure.",
                specifications: false,
                features: false,
            },
        },
    },
    {
        id: 7,
        slug: "blovac-v530w-v550w-high-capacity-model",
        category: "vacuum",
        brand: "blovac",
        brandLogo: Blovac,
        brandName: "Blovac",
        image: VacuumBlovacBlovacV530wV550wHighCapacityModel,
        images: [VacuumBlovacBlovacV530wV550wHighCapacityModel],
        title: "Blovac V530W-V550W High Capacity Model",
        subtitle: "Kapasitas ekstra besar untuk produksi massal",
        description:
            "Ideal untuk lini produksi dengan volume debu sangat tinggi dan operasi 24/7.",
        specifications: false,
        features: false,
        translations: {
            EN: {
                title: "Blovac V530W-V550W High Capacity Model",
                subtitle: "Extra-large capacity for mass production",
                description:
                    "Ideal for production lines with extremely high dust volume and 24/7 operation.",
                specifications: false,
                features: false,
            },
        },
    },

    // ─── COMPRESSOR - IHI (6 produk) ──────────────────────────
    {
        id: 8,
        slug: "ihi-compressor-t2-series",
        category: "compressor",
        isFeatured: true,
        brand: "ihi",
        brandLogo: IHI,
        brandName: "IHI",
        image: CompressorIhiIhiCompressorT2Series,
        images: [CompressorIhiIhiCompressorT2Series],
        title: "IHI Compressor T2 Series",
        subtitle:
            "Kompresor screw seri T2 untuk aplikasi ringan hingga menengah",
        description:
            "Kompresor udara sekrup IHI T2 Series menawarkan keandalan tinggi dan efisiensi energi untuk operasi harian di bengkel dan pabrik skala kecil.",
        specifications: false,
        features: false,
        translations: {
            EN: {
                title: "IHI Compressor T2 Series",
                subtitle:
                    "T2 series screw compressor for light to medium applications",
                description:
                    "The IHI T2 Series screw air compressor delivers high reliability and energy efficiency for daily operation in workshops and small factories.",
                specifications: false,
                features: false,
            },
        },
    },
    {
        id: 9,
        slug: "ihi-compressor-t3-series",
        category: "compressor",
        brand: "ihi",
        brandLogo: IHI,
        brandName: "IHI",
        image: CompressorIhiIhiCompressorT3Series,
        images: [CompressorIhiIhiCompressorT3Series],
        title: "IHI Compressor T3 Series",
        subtitle: "Kompresor seri T3 dengan kapasitas lebih tinggi",
        description:
            "Versi upgrade dari T2 Series dengan kapasitas udara lebih besar untuk kebutuhan produksi yang meningkat.",
        specifications: false,
        features: false,
        translations: {
            EN: {
                title: "IHI Compressor T3 Series",
                subtitle: "Higher-capacity T3 series compressor",
                description:
                    "An upgraded version of the T2 Series with greater air capacity for growing production needs.",
                specifications: false,
                features: false,
            },
        },
    },
    {
        id: 10,
        slug: "ihi-compressor-tra-series",
        category: "compressor",
        brand: "ihi",
        brandLogo: IHI,
        brandName: "IHI",
        image: CompressorIhiIhiCompressorTraSeries,
        images: [CompressorIhiIhiCompressorTraSeries],
        title: "IHI Compressor TRA Series",
        subtitle: "Seri TRA untuk aplikasi tugas berat",
        description:
            "Dirancang untuk operasi kontinu di lingkungan industri berat dengan keandalan maksimal.",
        specifications: false,
        features: false,
        translations: {
            EN: {
                title: "IHI Compressor TRA Series",
                subtitle: "TRA series for heavy-duty applications",
                description:
                    "Designed for continuous operation in heavy industrial environments with maximum reliability.",
                specifications: false,
                features: false,
            },
        },
    },
    {
        id: 11,
        slug: "ihi-compressor-tre-series",
        category: "compressor",
        brand: "ihi",
        brandLogo: IHI,
        brandName: "IHI",
        image: CompressorIhiIhiCompressorTreSeries,
        images: [CompressorIhiIhiCompressorTreSeries],
        title: "IHI Compressor TRE Series",
        subtitle: "Efisiensi energi tinggi untuk operasi jangka panjang",
        description:
            "Menggabungkan teknologi terkini untuk mengurangi konsumsi energi tanpa mengorbankan performa.",
        specifications: false,
        features: false,
        translations: {
            EN: {
                title: "IHI Compressor TRE Series",
                subtitle: "High energy efficiency for long-term operation",
                description:
                    "Combines cutting-edge technology to reduce energy consumption without sacrificing performance.",
                specifications: false,
                features: false,
            },
        },
    },
    {
        id: 12,
        slug: "ihi-compressor-trx-series",
        category: "compressor",
        brand: "ihi",
        brandLogo: IHI,
        brandName: "IHI",
        image: CompressorIhiIhiCompressorTrxSeries,
        images: [CompressorIhiIhiCompressorTrxSeries],
        title: "IHI Compressor TRX Series",
        subtitle: "Performa tinggi dengan desain kompak",
        description:
            "Solusi ideal ketika ruang terbatas namun dibutuhkan output udara yang besar.",
        specifications: false,
        features: false,
        translations: {
            EN: {
                title: "IHI Compressor TRX Series",
                subtitle: "High performance in a compact design",
                description:
                    "The ideal solution when space is limited but high air output is required.",
                specifications: false,
                features: false,
            },
        },
    },
    {
        id: 13,
        slug: "ihi-compressor-trz-series",
        category: "compressor",
        brand: "ihi",
        brandLogo: IHI,
        brandName: "IHI",
        image: CompressorIhiIhiCompressorTrzSeries,
        images: [CompressorIhiIhiCompressorTrzSeries],
        title: "IHI Compressor TRZ Series",
        subtitle: "Seri flagship dengan teknologi tercanggih",
        description:
            "Puncak inovasi IHI dengan kontrol cerdas, pemantauan jarak jauh, dan efisiensi luar biasa.",
        specifications: false,
        features: false,
        translations: {
            EN: {
                title: "IHI Compressor TRZ Series",
                subtitle: "Flagship series with cutting-edge technology",
                description:
                    "The pinnacle of IHI innovation featuring smart control, remote monitoring, and exceptional efficiency.",
                specifications: false,
                features: false,
            },
        },
    },

    // ─── COMPRESSOR - RAI FU (1 produk, 2 angle) ──────────────
    {
        id: 14,
        slug: "raifu-me-ms-series-power-frequency-compressor",
        category: "compressor",
        isFeatured: true,
        brand: "raifu",
        brandLogo: Raifu,
        brandName: "Raifu",
        image: CompressorRaifuMeMsSeriesPowerFrequencyWithoutTankCompressor1,
        images: [
            CompressorRaifuMeMsSeriesPowerFrequencyWithoutTankCompressor1,
            CompressorRaifuMeMsSeriesPowerFrequencyWithoutTankCompressor2,
        ],
        title: "Raifu ME/MS Series Power Frequency Compressor",
        subtitle: "Kompresor frekuensi daya tanpa tangki dari Raifu",
        description:
            "Kompresor udara sekrup tanpa tangki yang ideal untuk integrasi sistem langsung, hemat ruang dan efisien.",
        specifications: false,
        features: false,
        translations: {
            EN: {
                title: "Raifu ME/MS Series Power Frequency Compressor",
                subtitle: "Tankless power frequency compressor by Raifu",
                description:
                    "A tankless screw air compressor ideal for direct system integration, space-saving and efficient.",
                specifications: false,
                features: false,
            },
        },
    },
    {
        id: 15,
        slug: "raifu-ms-series-single-stage-screw-air-compressor",
        category: "compressor",
        brand: "raifu",
        brandLogo: Raifu,
        brandName: "Raifu",
        image: CompressorRaifuMsSeriesSingleStageScrewAirCompressor1,
        images: [
            CompressorRaifuMsSeriesSingleStageScrewAirCompressor1,
            CompressorRaifuMsSeriesSingleStageScrewAirCompressor2,
        ],
        title: "Raifu MS Series Single Stage Screw Air Compressor",
        subtitle: "Kompresor sekrup satu tahap dengan efisiensi tinggi",
        description:
            "Dirancang untuk operasi berkelanjutan dengan konsumsi energi minimal dan perawatan mudah.",
        specifications: false,
        features: false,
        translations: {
            EN: {
                title: "Raifu MS Series Single Stage Screw Air Compressor",
                subtitle: "High-efficiency single-stage screw compressor",
                description:
                    "Designed for continuous operation with minimal energy consumption and easy maintenance.",
                specifications: false,
                features: false,
            },
        },
    },
    {
        id: 16,
        slug: "raifu-we-series-single-stage-screw-air-compressor",
        category: "compressor",
        brand: "raifu",
        brandLogo: Raifu,
        brandName: "Raifu",
        image: CompressorRaifuWeSeriesSingleStageScrewAirCompressor1,
        images: [
            CompressorRaifuWeSeriesSingleStageScrewAirCompressor1,
            CompressorRaifuWeSeriesSingleStageScrewAirCompressor2,
        ],
        title: "Raifu WE Series Single Stage Screw Air Compressor",
        subtitle: "Seri WE untuk aplikasi berat dengan pendinginan optimal",
        description:
            "Menghadirkan kinerja stabil bahkan dalam kondisi beban penuh berkepanjangan.",
        specifications: false,
        features: false,
        translations: {
            EN: {
                title: "Raifu WE Series Single Stage Screw Air Compressor",
                subtitle:
                    "WE series for heavy-duty applications with optimal cooling",
                description:
                    "Delivers stable performance even under prolonged full-load conditions.",
                specifications: false,
                features: false,
            },
        },
    },
    {
        id: 17,
        slug: "raifu-yt-series-integrated-pm-vsd-compressor",
        category: "compressor",
        brand: "raifu",
        brandLogo: Raifu,
        brandName: "Raifu",
        image: CompressorRaifuYtSeriesIntegratedSingleStagePmVsdAirCooledCompactCompressor1,
        images: [
            CompressorRaifuYtSeriesIntegratedSingleStagePmVsdAirCooledCompactCompressor1,
            CompressorRaifuYtSeriesIntegratedSingleStagePmVsdAirCooledCompactCompressor2,
        ],
        title: "Raifu YT Series Integrated PM VSD Compressor",
        subtitle: "Kompresor compact dengan teknologi inverter hemat energi",
        description:
            "Menggunakan motor permanen magnet dan pengatur kecepatan variabel (VSD) untuk efisiensi maksimal sesuai kebutuhan udara aktual.",
        specifications: false,
        features: false,
        translations: {
            EN: {
                title: "Raifu YT Series Integrated PM VSD Compressor",
                subtitle:
                    "Compact compressor with energy-saving inverter technology",
                description:
                    "Features permanent magnet motor and variable speed drive (VSD) for maximum efficiency based on actual air demand.",
                specifications: false,
                features: false,
            },
        },
    },

    // ─── COMPRESSOR - TAITIAN (7 produk, semua 2 angle) ────────
    {
        id: 18,
        slug: "taitian-screw-compressor-ta",
        category: "compressor",
        isFeatured: true,
        brand: "taitian",
        brandLogo: Taitian,
        brandName: "Taitian",
        image: CompressorTaitianTaitianScrewCompressorTa1,
        images: [
            CompressorTaitianTaitianScrewCompressorTa1,
            CompressorTaitianTaitianScrewCompressorTa2,
        ],
        title: "Taitian Screw Compressor TA",
        subtitle: "Kompresor sekrup seri TA untuk aplikasi umum",
        description:
            "Seri TA menawarkan keseimbangan sempurna antara kinerja, keandalan, dan biaya operasional rendah.",
        specifications: false,
        features: false,
        translations: {
            EN: {
                title: "Taitian Screw Compressor TA",
                subtitle: "General-purpose TA series screw compressor",
                description:
                    "The TA series offers the perfect balance of performance, reliability, and low operating cost.",
                specifications: false,
                features: false,
            },
        },
    },
    {
        id: 19,
        slug: "taitian-screw-compressor-tb",
        category: "compressor",
        brand: "taitian",
        brandLogo: Taitian,
        brandName: "Taitian",
        image: CompressorTaitianTaitianScrewCompressorTb1,
        images: [
            CompressorTaitianTaitianScrewCompressorTb1,
            CompressorTaitianTaitianScrewCompressorTb2,
        ],
        title: "Taitian Screw Compressor TB",
        subtitle: "Performa tinggi untuk industri manufaktur",
        description:
            "Dirancang untuk memberikan output udara konsisten dalam lingkungan produksi yang menuntut.",
        specifications: false,
        features: false,
        translations: {
            EN: {
                title: "Taitian Screw Compressor TB",
                subtitle: "High performance for manufacturing industries",
                description:
                    "Designed to deliver consistent air output in demanding production environments.",
                specifications: false,
                features: false,
            },
        },
    },
    {
        id: 20,
        slug: "taitian-screw-compressor-te",
        category: "compressor",
        brand: "taitian",
        brandLogo: Taitian,
        brandName: "Taitian",
        image: CompressorTaitianTaitianScrewCompressorTe1,
        images: [
            CompressorTaitianTaitianScrewCompressorTe1,
            CompressorTaitianTaitianScrewCompressorTe2,
        ],
        title: "Taitian Screw Compressor TE",
        subtitle: "Efisiensi energi untuk operasi jangka panjang",
        description:
            "Mengoptimalkan konsumsi listrik tanpa mengorbankan tekanan atau volume udara.",
        specifications: false,
        features: false,
        translations: {
            EN: {
                title: "Taitian Screw Compressor TE",
                subtitle: "Energy efficiency for long-term operation",
                description:
                    "Optimizes electricity consumption without sacrificing air pressure or volume.",
                specifications: false,
                features: false,
            },
        },
    },
    {
        id: 21,
        slug: "taitian-screw-compressor-tf",
        category: "compressor",
        brand: "taitian",
        brandLogo: Taitian,
        brandName: "Taitian",
        image: CompressorTaitianTaitianScrewCompressorTf1,
        images: [
            CompressorTaitianTaitianScrewCompressorTf1,
            CompressorTaitianTaitianScrewCompressorTf2,
        ],
        title: "Taitian Screw Compressor TF",
        subtitle: "Solusi andal untuk aplikasi berat",
        description:
            "Komponen berkualitas tinggi memastikan umur pakai panjang bahkan dalam kondisi ekstrem.",
        specifications: false,
        features: false,
        translations: {
            EN: {
                title: "Taitian Screw Compressor TF",
                subtitle: "Reliable solution for heavy-duty applications",
                description:
                    "High-quality components ensure long service life even in extreme conditions.",
                specifications: false,
                features: false,
            },
        },
    },
    {
        id: 22,
        slug: "taitian-screw-compressor-tg",
        category: "compressor",
        brand: "taitian",
        brandLogo: Taitian,
        brandName: "Taitian",
        image: CompressorTaitianTaitianScrewCompressorTg1,
        images: [
            CompressorTaitianTaitianScrewCompressorTg1,
            CompressorTaitianTaitianScrewCompressorTg2,
        ],
        title: "Taitian Screw Compressor TG",
        subtitle: "Desain kompak dengan output maksimal",
        description:
            "Ideal untuk fasilitas dengan ruang terbatas namun membutuhkan kapasitas udara besar.",
        specifications: false,
        features: false,
        translations: {
            EN: {
                title: "Taitian Screw Compressor TG",
                subtitle: "Compact design with maximum output",
                description:
                    "Ideal for facilities with limited space but high air capacity requirements.",
                specifications: false,
                features: false,
            },
        },
    },
    {
        id: 23,
        slug: "taitian-screw-compressor-tk-200-8",
        category: "compressor",
        brand: "taitian",
        brandLogo: Taitian,
        brandName: "Taitian",
        image: CompressorTaitianTaitianScrewCompressorTk20081,
        images: [
            CompressorTaitianTaitianScrewCompressorTk20081,
            CompressorTaitianTaitianScrewCompressorTk20082,
        ],
        title: "Taitian Screw Compressor TK 200-8",
        subtitle: "Kapasitas besar untuk kebutuhan industri skala besar",
        description:
            "Menyediakan aliran udara besar untuk aplikasi seperti pneumatik berat, pengecatan industri, dan sistem kontrol proses.",
        specifications: false,
        features: false,
        translations: {
            EN: {
                title: "Taitian Screw Compressor TK 200-8",
                subtitle: "High capacity for large-scale industrial needs",
                description:
                    "Provides high air flow for applications such as heavy pneumatics, industrial painting, and process control systems.",
                specifications: false,
                features: false,
            },
        },
    },
    {
        id: 24,
        slug: "taitian-screw-compressor-tk-75-8",
        category: "compressor",
        brand: "taitian",
        brandLogo: Taitian,
        brandName: "Taitian",
        image: CompressorTaitianTaitianScrewCompressorTk7581,
        images: [
            CompressorTaitianTaitianScrewCompressorTk7581,
            CompressorTaitianTaitianScrewCompressorTk7582,
        ],
        title: "Taitian Screw Compressor TK 75-8",
        subtitle: "Kinerja optimal untuk operasi menengah",
        description:
            "Pilihan tepat untuk pabrik berukuran sedang yang membutuhkan keseimbangan antara kapasitas dan efisiensi.",
        specifications: false,
        features: false,
        translations: {
            EN: {
                title: "Taitian Screw Compressor TK 75-8",
                subtitle: "Optimal performance for medium-duty operation",
                description:
                    "The perfect choice for medium-sized factories requiring a balance between capacity and efficiency.",
                specifications: false,
                features: false,
            },
        },
    },
    {
        id: 25,
        slug: "taitian-screw-compressor-tq",
        category: "compressor",
        brand: "taitian",
        brandLogo: Taitian,
        brandName: "Taitian",
        image: CompressorTaitianTaitianScrewCompressorTq1,
        images: [
            CompressorTaitianTaitianScrewCompressorTq1,
            CompressorTaitianTaitianScrewCompressorTq2,
        ],
        title: "Taitian Screw Compressor TQ",
        subtitle: "Teknologi canggih untuk kontrol presisi",
        description:
            "Dilengkapi sistem kontrol digital canggih untuk pengaturan tekanan dan aliran yang akurat.",
        specifications: false,
        features: false,
        translations: {
            EN: {
                title: "Taitian Screw Compressor TQ",
                subtitle: "Advanced technology for precise control",
                description:
                    "Equipped with advanced digital control system for accurate pressure and flow regulation.",
                specifications: false,
                features: false,
            },
        },
    },

    // ─── IMPACT TOOLS - RAI FU (5 produk) ─────────────────────
    {
        id: 26,
        slug: "raifu-impact-tools-rf-1300",
        category: "impact-tools",
        brand: "raifu",
        brandLogo: Raifu,
        brandName: "Raifu",
        image: ImpactToolsRaifuRaifuImpactToolsRf1300,
        images: [ImpactToolsRaifuRaifuImpactToolsRf1300],
        title: "Raifu Impact Tools RF-1300",
        subtitle: "Palu bor rotari berkekuatan tinggi",
        description:
            "Dirancang untuk pekerjaan berat di konstruksi dan pertambangan, dengan daya tumbuk maksimal dan tahan lama.",
        specifications: false,
        features: false,
        translations: {
            EN: {
                title: "Raifu Impact Tools RF-1300",
                subtitle: "High-power rotary hammer drill",
                description:
                    "Built for heavy-duty construction and mining tasks with maximum impact force and durability.",
                specifications: false,
                features: false,
            },
        },
    },
    {
        id: 27,
        slug: "raifu-impact-tools-rf-380a",
        category: "impact-tools",
        brand: "raifu",
        brandLogo: Raifu,
        brandName: "Raifu",
        image: ImpactToolsRaifuRaifuImpactToolsRf380a,
        images: [ImpactToolsRaifuRaifuImpactToolsRf380a],
        title: "Raifu Impact Tools RF-380A",
        subtitle: "Palu bor ringan untuk pekerjaan presisi",
        description:
            "Ideal untuk pekerjaan detail seperti pemasangan rak, instalasi listrik, dan pekerjaan beton ringan.",
        specifications: false,
        features: false,
        translations: {
            EN: {
                title: "Raifu Impact Tools RF-380A",
                subtitle: "Lightweight hammer drill for precision work",
                description:
                    "Ideal for detailed tasks such as shelving installation, electrical work, and light concrete drilling.",
                specifications: false,
                features: false,
            },
        },
    },
    {
        id: 28,
        slug: "raifu-impact-tools-rf-380b",
        category: "impact-tools",
        brand: "raifu",
        brandLogo: Raifu,
        brandName: "Raifu",
        image: ImpactToolsRaifuRaifuImpactToolsRf380b,
        images: [ImpactToolsRaifuRaifuImpactToolsRf380b],
        title: "Raifu Impact Tools RF-380B",
        subtitle: "Versi upgrade dari RF-380A dengan fitur tambahan",
        description:
            "Menawarkan kontrol kecepatan variabel dan mode bor murni untuk fleksibilitas maksimal.",
        specifications: false,
        features: false,
        translations: {
            EN: {
                title: "Raifu Impact Tools RF-380B",
                subtitle:
                    "Upgraded version of RF-380A with additional features",
                description:
                    "Offers variable speed control and pure drilling mode for maximum flexibility.",
                specifications: false,
                features: false,
            },
        },
    },
    {
        id: 29,
        slug: "raifu-impact-tools-rf-800",
        category: "impact-tools",
        brand: "raifu",
        brandLogo: Raifu,
        brandName: "Raifu",
        image: ImpactToolsRaifuRaifuImpactToolsRf800,
        images: [ImpactToolsRaifuRaifuImpactToolsRf800],
        title: "Raifu Impact Tools RF-800",
        subtitle: "Palu bor mid-range untuk konstruksi umum",
        description:
            "Keseimbangan sempurna antara daya, berat, dan ergonomi untuk penggunaan harian di lokasi proyek.",
        specifications: false,
        features: false,
        translations: {
            EN: {
                title: "Raifu Impact Tools RF-800",
                subtitle: "Mid-range hammer drill for general construction",
                description:
                    "Perfect balance of power, weight, and ergonomics for daily use on construction sites.",
                specifications: false,
                features: false,
            },
        },
    },
    {
        id: 30,
        slug: "raifu-impact-tools-rf-990",
        category: "impact-tools",
        brand: "raifu",
        brandLogo: Raifu,
        brandName: "Raifu",
        image: ImpactToolsRaifuRaifuImpactToolsRf990,
        images: [ImpactToolsRaifuRaifuImpactToolsRf990],
        title: "Raifu Impact Tools RF-990",
        subtitle: "Palu bor profesional untuk tugas berat",
        description:
            "Dirancang untuk profesional yang membutuhkan alat tahan lama dengan performa konsisten di berbagai material.",
        specifications: false,
        features: false,
        translations: {
            EN: {
                title: "Raifu Impact Tools RF-990",
                subtitle: "Professional-grade hammer drill for heavy tasks",
                description:
                    "Designed for professionals who need durable tools with consistent performance across various materials.",
                specifications: false,
                features: false,
            },
        },
    },

    // ─── OIL PUMP - NOP (3 produk pertama) ────────────────────
    {
        id: 31,
        slug: "nop-1hg-high-pressure-trochoid-pump",
        category: "oil-pump",
        isFeatured: true,
        brand: "nop",
        brandLogo: NOP,
        brandName: "NOP",
        image: OilPumpNopNop1hgHighPressureTrochoidPumpSmallCapacityOilPumpUpTo25MpaForHydraulicSystems,
        images: [
            OilPumpNopNop1hgHighPressureTrochoidPumpSmallCapacityOilPumpUpTo25MpaForHydraulicSystems,
        ],
        title: "NOP 1HG High Pressure Trochoid Pump",
        subtitle: "Pompa trochoid tekanan tinggi hingga 2.5 MPa",
        description:
            "Pompa oli kecil berkapasitas rendah namun tekanan tinggi, ideal untuk sistem hidrolik presisi.",
        specifications: false,
        features: false,
        translations: {
            EN: {
                title: "NOP 1HG High Pressure Trochoid Pump",
                subtitle: "High-pressure trochoid pump up to 2.5 MPa",
                description:
                    "A compact, high-pressure oil pump ideal for precision hydraulic systems.",
                specifications: false,
                features: false,
            },
        },
    },
    {
        id: 32,
        slug: "nop-1me-trochoid-pump",
        category: "oil-pump",
        brand: "nop",
        brandLogo: NOP,
        brandName: "NOP",
        image: OilPumpNopNop1meTrochoidPumpCompactOilPumpForLubricationAndHydraulicOil18LminMadeInJapan,
        images: [
            OilPumpNopNop1meTrochoidPumpCompactOilPumpForLubricationAndHydraulicOil18LminMadeInJapan,
        ],
        title: "NOP 1ME Trochoid Pump",
        subtitle: "Pompa trochoid kompak untuk pelumasan dan hidrolik",
        description:
            "Dirancang untuk aplikasi pelumasan mesin dan sistem hidrolik kecil dengan kapasitas 1–8 L/menit.",
        specifications: false,
        features: false,
        translations: {
            EN: {
                title: "NOP 1ME Trochoid Pump",
                subtitle:
                    "Compact trochoid pump for lubrication and hydraulics",
                description:
                    "Designed for machine lubrication and small hydraulic systems with capacity of 1–8 L/min.",
                specifications: false,
                features: false,
            },
        },
    },
    {
        id: 33,
        slug: "nop-1ra-bi-directional-trochoid-pump",
        category: "oil-pump",
        brand: "nop",
        brandLogo: NOP,
        brandName: "NOP",
        image: OilPumpNopNop1raTrochoidPumpBiDirectionalReversibleOilPumpForHydraulicAndCirculationSystems,
        images: [
            OilPumpNopNop1raTrochoidPumpBiDirectionalReversibleOilPumpForHydraulicAndCirculationSystems,
        ],
        title: "NOP 1RA Bi-Directional Trochoid Pump",
        subtitle: "Pompa trochoid reversibel untuk sistem sirkulasi",
        description:
            "Mampu memompa oli dalam dua arah, ideal untuk sistem sirkulasi dan hidrolik yang memerlukan aliran bolak-balik.",
        specifications: false,
        features: false,
        translations: {
            EN: {
                title: "NOP 1RA Bi-Directional Trochoid Pump",
                subtitle: "Reversible trochoid pump for circulation systems",
                description:
                    "Capable of pumping oil in both directions, ideal for circulation and hydraulic systems requiring bidirectional flow.",
                specifications: false,
                features: false,
            },
        },
    },
    {
        id: 34,
        slug: "nop-2hb-medium-capacity-trochoid-pump",
        category: "oil-pump",
        brand: "nop",
        brandName: "NOP",
        brandLogo: NOP,
        image: OilPumpNopNop2hbTrochoidPumpMediumCapacityInternalGearPumpForIndustrialLubricatingOil,
        images: [
            OilPumpNopNop2hbTrochoidPumpMediumCapacityInternalGearPumpForIndustrialLubricatingOil,
        ],
        title: "NOP 2HB Medium Capacity Trochoid Pump",
        subtitle: "Pompa trochoid kapasitas menengah untuk pelumasan industri",
        description:
            "Dirancang untuk sistem pelumasan mesin industri berukuran sedang hingga besar dengan keandalan tinggi.",
        specifications: false,
        features: false,
        translations: {
            EN: {
                title: "NOP 2HB Medium Capacity Trochoid Pump",
                subtitle:
                    "Medium-capacity trochoid pump for industrial lubrication",
                description:
                    "Designed for lubrication systems in medium to large industrial machinery with high reliability.",
                specifications: false,
                features: false,
            },
        },
    },
    {
        id: 35,
        slug: "nop-2hwm-coolant-transfer-pump",
        category: "oil-pump",
        brand: "nop",
        brandName: "NOP",
        brandLogo: NOP,
        image: OilPumpNopNop2hwmTrochoidPumpCoolantFluidTransferPumpWithFilterForCncAndMachineTools,
        images: [
            OilPumpNopNop2hwmTrochoidPumpCoolantFluidTransferPumpWithFilterForCncAndMachineTools,
        ],
        title: "NOP 2HWM Coolant Fluid Transfer Pump",
        subtitle: "Pompa transfer cairan pendingin dengan filter terintegrasi",
        description:
            "Solusi lengkap untuk sirkulasi cairan pendingin pada mesin CNC dan peralatan pemesinan presisi.",
        specifications: false,
        features: false,
        translations: {
            EN: {
                title: "NOP 2HWM Coolant Fluid Transfer Pump",
                subtitle: "Coolant transfer pump with integrated filter",
                description:
                    "A complete solution for coolant circulation in CNC machines and precision machining equipment.",
                specifications: false,
                features: false,
            },
        },
    },
    {
        id: 36,
        slug: "nop-3v-high-viscosity-oil-pump",
        category: "oil-pump",
        brand: "nop",
        brandName: "NOP",
        brandLogo: NOP,
        image: OilPumpNopNop3vTrochoidPumpHighViscosityOilPumpForGearOilAndHeavyLubricantApplications,
        images: [
            OilPumpNopNop3vTrochoidPumpHighViscosityOilPumpForGearOilAndHeavyLubricantApplications,
        ],
        title: "NOP 3V High Viscosity Oil Pump",
        subtitle: "Pompa oli viskositas tinggi untuk gear oil",
        description:
            "Mampu menangani oli berat dan pelumas kental seperti gear oil, ideal untuk gearbox dan transmisi industri.",
        specifications: false,
        features: false,
        translations: {
            EN: {
                title: "NOP 3V High Viscosity Oil Pump",
                subtitle: "High-viscosity oil pump for gear oil",
                description:
                    "Capable of handling heavy oils and thick lubricants such as gear oil, ideal for industrial gearboxes and transmissions.",
                specifications: false,
                features: false,
            },
        },
    },
    {
        id: 37,
        slug: "nop-4am-large-capacity-oil-pump",
        category: "oil-pump",
        brand: "nop",
        brandName: "NOP",
        brandLogo: NOP,
        image: OilPumpNopNop4amTrochoidPumpLargeCapacityOilPumpUpTo586LminForMarineAndTurbineSystems,
        images: [
            OilPumpNopNop4amTrochoidPumpLargeCapacityOilPumpUpTo586LminForMarineAndTurbineSystems,
        ],
        title: "NOP 4AM Large Capacity Oil Pump",
        subtitle: "Pompa oli kapasitas besar hingga 586 L/menit",
        description:
            "Dirancang untuk aplikasi maritim dan turbin yang memerlukan aliran oli sangat besar dan kontinu.",
        specifications: false,
        features: false,
        translations: {
            EN: {
                title: "NOP 4AM Large Capacity Oil Pump",
                subtitle: "Large-capacity oil pump up to 586 L/min",
                description:
                    "Designed for marine and turbine applications requiring very high and continuous oil flow.",
                specifications: false,
                features: false,
            },
        },
    },

    // ─── WATER PUMP - TERAL (8 produk) ────────────────────────
    {
        id: 38,
        slug: "teral-lp-line-pump",
        category: "water-pump",
        brand: "teral",
        brandName: "Teral",
        brandLogo: Teral,
        image: WaterPumpTeralLpLinePump,
        images: [WaterPumpTeralLpLinePump],
        title: "Teral LP Line Pump",
        subtitle: "Pompa air permukaan seri LP untuk transfer air",
        description:
            "Pompa sentrifugal tipe LP dari Teral dirancang untuk efisiensi tinggi dalam aplikasi transfer air bersih.",
        specifications: false,
        features: false,
        translations: {
            EN: {
                title: "Teral LP Line Pump",
                subtitle: "LP series above-ground water transfer pump",
                description:
                    "Teral's LP series centrifugal pump is designed for high efficiency in clean water transfer applications.",
                specifications: false,
                features: false,
            },
        },
    },
    {
        id: 39,
        slug: "teral-mkhs-volute-pumps",
        category: "water-pump",
        brand: "teral",
        brandName: "Teral",
        brandLogo: Teral,
        image: WaterPumpTeralMkhsVolutePumps,
        images: [WaterPumpTeralMkhsVolutePumps],
        title: "Teral MKHS Volute Pumps",
        subtitle: "Pompa volute untuk tekanan menengah",
        description:
            "Ideal untuk sistem irigasi, pasokan air gedung, dan aplikasi industri ringan.",
        specifications: false,
        features: false,
        translations: {
            EN: {
                title: "Teral MKHS Volute Pumps",
                subtitle: "Volute pumps for medium pressure",
                description:
                    "Ideal for irrigation systems, building water supply, and light industrial applications.",
                specifications: false,
                features: false,
            },
        },
    },
    {
        id: 40,
        slug: "teral-nx-volute-pumps",
        category: "water-pump",
        brand: "teral",
        brandName: "Teral",
        brandLogo: Teral,
        image: WaterPumpTeralNxVolutePumps,
        images: [WaterPumpTeralNxVolutePumps],
        title: "Teral NX Volute Pumps",
        subtitle: "Desain NX untuk efisiensi hidrolik optimal",
        description:
            "Menggunakan impeller canggih untuk mengurangi kehilangan energi dan meningkatkan efisiensi keseluruhan.",
        specifications: false,
        features: false,
        translations: {
            EN: {
                title: "Teral NX Volute Pumps",
                subtitle: "NX design for optimal hydraulic efficiency",
                description:
                    "Features advanced impeller design to reduce energy loss and improve overall efficiency.",
                specifications: false,
                features: false,
            },
        },
    },
    {
        id: 41,
        slug: "teral-sjm2-sjm3-volute-pumps",
        category: "water-pump",
        brand: "teral",
        brandName: "Teral",
        brandLogo: Teral,
        image: WaterPumpTeralSjm2Sjm3VolutePumps,
        images: [WaterPumpTeralSjm2Sjm3VolutePumps],
        title: "Teral SJM2/SJM3 Volute Pumps",
        subtitle: "Seri SJM untuk aplikasi multi-tahap",
        description:
            "Dirancang untuk tekanan lebih tinggi melalui konfigurasi multi-tahap, cocok untuk gedung bertingkat dan sistem boost.",
        specifications: false,
        features: false,
        translations: {
            EN: {
                title: "Teral SJM2/SJM3 Volute Pumps",
                subtitle: "SJM series for multi-stage applications",
                description:
                    "Designed for higher pressure through multi-stage configuration, suitable for high-rise buildings and boosting systems.",
                specifications: false,
                features: false,
            },
        },
    },
    {
        id: 42,
        slug: "teral-sjms-volute-pumps",
        category: "water-pump",
        brand: "teral",
        brandName: "Teral",
        brandLogo: Teral,
        image: WaterPumpTeralSjmsVolutePumps,
        images: [WaterPumpTeralSjmsVolutePumps],
        title: "Teral SJMS Volute Pumps",
        subtitle: "Versi stainless steel dari seri SJM",
        description:
            "Konstruksi stainless steel membuatnya ideal untuk air bersih, kimia ringan, atau aplikasi yang memerlukan ketahanan korosi.",
        specifications: false,
        features: false,
        translations: {
            EN: {
                title: "Teral SJMS Volute Pumps",
                subtitle: "Stainless steel version of SJM series",
                description:
                    "Stainless steel construction makes it ideal for clean water, light chemicals, or corrosion-resistant applications.",
                specifications: false,
                features: false,
            },
        },
    },
    {
        id: 43,
        slug: "teral-msu-deep-well-submersible-pumps",
        category: "water-pump",
        brand: "teral",
        brandName: "Teral",
        brandLogo: Teral,
        image: WaterPumpTeralMsuDeepWellSubmersiblePumps,
        images: [WaterPumpTeralMsuDeepWellSubmersiblePumps],
        title: "Teral MSU Deep Well Submersible Pumps",
        subtitle: "Pompa sumur dalam tipe MSU",
        description:
            "Dirancang untuk sumur dalam dengan kedalaman signifikan, memberikan aliran air stabil dan andal.",
        specifications: false,
        features: false,
        translations: {
            EN: {
                title: "Teral MSU Deep Well Submersible Pumps",
                subtitle: "MSU type deep well submersible pumps",
                description:
                    "Designed for deep wells with significant depth, providing stable and reliable water flow.",
                specifications: false,
                features: false,
            },
        },
    },
    {
        id: 44,
        slug: "teral-msuh-deep-well-submersible-pumps",
        category: "water-pump",
        brand: "teral",
        brandName: "Teral",
        brandLogo: Teral,
        image: WaterPumpTeralMsuhDeepWellSubmersiblePumps,
        images: [WaterPumpTeralMsuhDeepWellSubmersiblePumps],
        title: "Teral MSUH Deep Well Submersible Pumps",
        subtitle: "Versi high-head dari seri MSU",
        description:
            "Memberikan tekanan lebih tinggi untuk aplikasi yang memerlukan pengangkatan air dari kedalaman ekstrem.",
        specifications: false,
        features: false,
        translations: {
            EN: {
                title: "Teral MSUH Deep Well Submersible Pumps",
                subtitle: "High-head version of MSU series",
                description:
                    "Delivers higher pressure for applications requiring water lifting from extreme depths.",
                specifications: false,
                features: false,
            },
        },
    },
    {
        id: 45,
        slug: "teral-msus-deep-well-submersible-pumps",
        category: "water-pump",
        brand: "teral",
        brandName: "Teral",
        brandLogo: Teral,
        image: WaterPumpTeralMsusDeepWellSubmersiblePumps,
        images: [WaterPumpTeralMsusDeepWellSubmersiblePumps],
        title: "Teral MSUS Deep Well Submersible Pumps",
        subtitle: "Seri stainless steel untuk air bersih",
        description:
            "Material stainless steel memastikan kualitas air tetap terjaga dan tahan terhadap korosi jangka panjang.",
        specifications: false,
        features: false,
        translations: {
            EN: {
                title: "Teral MSUS Deep Well Submersible Pumps",
                subtitle: "Stainless steel series for clean water",
                description:
                    "Stainless steel material ensures water quality and long-term corrosion resistance.",
                specifications: false,
                features: false,
            },
        },
    },
];
