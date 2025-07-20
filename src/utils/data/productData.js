// data/products.js
import { turboCompressor } from "../../assets/images";
import {
    Blovac,
    Horisan,
    IHI,
    NOP,
    SMK,
    SUTO,
    Teral,
    Trident,
} from "../../assets/brands";

export const products = [
    {
        id: 1,
        slug: "ihi-turbo-compressor",
        category: "compressor",
        brand: "ihi",
        brandName: "IHI",
        brandLogo: IHI,
        image: turboCompressor,
        images: [turboCompressor, turboCompressor, turboCompressor],
        title: "IHI Turbo Compressor",
        subtitle: "Kompresor sentrifugal IHI yang memiliki desain optimal",
        description: `IHI Centrifugal Compressor adalah solusi kompresor generasi terbaru yang dirancang dengan teknologi canggih untuk memenuhi kebutuhan industri modern akan efisiensi dan keandalan. Kompresor ini menggabungkan performa tinggi dengan pengoperasian yang mudah, memberikan keuntungan jangka panjang bagi industri yang mengandalkan udara bersih dan stabil dalam proses produksinya.

Dengan desain yang kompak namun tangguh, kompresor ini memaksimalkan efisiensi energi melalui sistem kontrol pintar yang menyesuaikan kinerja berdasarkan kebutuhan pengguna. Dirancang khusus tanpa menggunakan oli pada jalur udara, IHI Compressor menjamin udara bersih 100% dan telah tersertifikasi Class 0 - menjadikannya pilihan ideal bagi industri makanan, farmasi, elektronik, hingga otomotif.

Tidak hanya efisien, kompresor ini juga dirancang untuk tahan lama, minim perawatan, serta mampu beroperasi secara andal dalam lingkungan industri yang paling menantang sekalipun.`,
        specifications: {
            Kapasitas: "50-500 m³/min",
            Tekanan: "0.7-1.0 MPa",
            Daya: "75-500 kW",
            Efisiensi: "Class 0 Oil-Free",
            Sertifikasi: "ISO 8573-1 Class 0",
            Aplikasi: "Industri makanan, farmasi, elektronik, otomotif",
        },
        features: [
            "Desain kompak dan tangguh",
            "Sistem kontrol pintar",
            "100% oil-free operation",
            "Class 0 certified",
            "Efisiensi energi tinggi",
            "Maintenance minimal",
        ],
        translations: {
            EN: {
                title: "IHI Turbo Compressor",
                subtitle: "IHI centrifugal compressor with optimal design",
                description: `IHI Centrifugal Compressor is the latest generation compressor solution designed with advanced technology to meet modern industry needs for efficiency and reliability. This compressor combines high performance with easy operation, providing long-term benefits for industries that rely on clean and stable air in their production processes.

With a compact yet robust design, this compressor maximizes energy efficiency through smart control systems that adjust performance based on user needs. Specifically designed without using oil in the air path, IHI Compressor guarantees 100% clean air and is Class 0 certified - making it an ideal choice for food, pharmaceutical, electronics, and automotive industries.

Not only efficient, this compressor is also designed to be durable, require minimal maintenance, and able to operate reliably in the most challenging industrial environments.`,
                specifications: {
                    Capacity: "50-500 m³/min",
                    Pressure: "0.7-1.0 MPa",
                    Power: "75-500 kW",
                    Efficiency: "Class 0 Oil-Free",
                    Certification: "ISO 8573-1 Class 0",
                    Application:
                        "Food, pharmaceutical, electronics, automotive industries",
                },
                features: [
                    "Compact and robust design",
                    "Smart control system",
                    "100% oil-free operation",
                    "Class 0 certified",
                    "High energy efficiency",
                    "Minimal maintenance",
                ],
            },
        },
    },
    {
        id: 2,
        slug: "blovac-compressor-pro",
        category: "compressor",
        brand: "blovac",
        brandName: "Blovac",
        brandLogo: Blovac,
        image: turboCompressor,
        images: [turboCompressor],
        title: "Blovac Compressor Pro",
        subtitle: "Kompresor berkualitas tinggi untuk industri",
        description:
            "Kompresor Blovac Pro dirancang khusus untuk aplikasi industri yang membutuhkan performa tinggi dan keandalan maksimal. Dengan teknologi terdepan dan konstruksi yang kokoh, kompresor ini memberikan efisiensi energi optimal untuk berbagai kebutuhan industri.",
        specifications: {
            Kapasitas: "100-1000 m³/min",
            Tekanan: "0.8-1.2 MPa",
            Daya: "100-750 kW",
            Efisiensi: "High Performance",
            Aplikasi: "Industri manufaktur, konstruksi",
        },
        features: [
            "Performa tinggi",
            "Keandalan maksimal",
            "Efisiensi energi",
            "Konstruksi kokoh",
        ],
        translations: {
            EN: {
                title: "Blovac Compressor Pro",
                subtitle: "High-quality compressor for industry",
                description:
                    "Blovac Pro Compressor is specifically designed for industrial applications that require high performance and maximum reliability. With cutting-edge technology and robust construction, this compressor provides optimal energy efficiency for various industrial needs.",
                specifications: {
                    Capacity: "100-1000 m³/min",
                    Pressure: "0.8-1.2 MPa",
                    Power: "100-750 kW",
                    Efficiency: "High Performance",
                    Application: "Manufacturing, construction industries",
                },
                features: [
                    "High performance",
                    "Maximum reliability",
                    "Energy efficiency",
                    "Robust construction",
                ],
            },
        },
    },
    {
        id: 3,
        slug: "suto-air-dryer",
        category: "air-dryer",
        brand: "suto",
        brandName: "SUTO",
        brandLogo: SUTO,
        image: turboCompressor,
        images: [turboCompressor],
        title: "SUTO Air Dryer",
        subtitle: "Pengering udara berkualitas tinggi untuk industri",
        description:
            "SUTO Air Dryer merupakan solusi pengering udara terdepan yang dirancang untuk memberikan udara kering berkualitas tinggi untuk berbagai aplikasi industri. Dengan teknologi canggih dan desain yang efisien, produk ini memastikan kualitas udara optimal untuk proses produksi Anda.",
        specifications: {
            Kapasitas: "10-2000 m³/h",
            "Tekanan Kerja": "0.6-1.6 MPa",
            "Dew Point": "-40°C hingga -70°C",
            Efisiensi: "Energy Saving",
            Aplikasi: "Industri farmasi, makanan, elektronik",
        },
        features: [
            "Teknologi pengering canggih",
            "Efisiensi energi tinggi",
            "Kualitas udara optimal",
            "Maintenance mudah",
        ],
        translations: {
            EN: {
                title: "SUTO Air Dryer",
                subtitle: "High-quality air dryer for industry",
                description:
                    "SUTO Air Dryer is a leading air drying solution designed to provide high-quality dry air for various industrial applications. With advanced technology and efficient design, this product ensures optimal air quality for your production processes.",
                specifications: {
                    Capacity: "10-2000 m³/h",
                    "Working Pressure": "0.6-1.6 MPa",
                    "Dew Point": "-40°C to -70°C",
                    Efficiency: "Energy Saving",
                    Application: "Pharmaceutical, food, electronics industries",
                },
                features: [
                    "Advanced drying technology",
                    "High energy efficiency",
                    "Optimal air quality",
                    "Easy maintenance",
                ],
            },
        },
    },
    {
        id: 4,
        slug: "horisan-impact-tool",
        category: "impact-tools",
        brand: "horisan",
        brandName: "Horisan",
        brandLogo: Horisan,
        image: turboCompressor,
        images: [turboCompressor],
        title: "Horisan Impact Tool",
        subtitle: "Alat impact pneumatik untuk aplikasi berat",
        description:
            "Horisan Impact Tool adalah alat pneumatik berkualitas tinggi yang dirancang untuk aplikasi industri berat. Dengan daya impact yang kuat dan konstruksi yang tahan lama, alat ini memberikan performa optimal untuk berbagai kebutuhan pemasangan dan pembongkaran.",
        specifications: {
            "Torsi Maksimum": "500-2000 Nm",
            "Tekanan Udara": "0.6-0.8 MPa",
            "Konsumsi Udara": "200-500 L/min",
            Berat: "2.5-5.0 kg",
            Aplikasi: "Industri otomotif, konstruksi",
        },
        features: [
            "Daya impact tinggi",
            "Konstruksi tahan lama",
            "Ergonomis dan mudah digunakan",
            "Performa konsisten",
        ],
        translations: {
            EN: {
                title: "Horisan Impact Tool",
                subtitle: "Pneumatic impact tool for heavy applications",
                description:
                    "Horisan Impact Tool is a high-quality pneumatic tool designed for heavy industrial applications. With powerful impact force and durable construction, this tool provides optimal performance for various installation and dismantling needs.",
                specifications: {
                    "Maximum Torque": "500-2000 Nm",
                    "Air Pressure": "0.6-0.8 MPa",
                    "Air Consumption": "200-500 L/min",
                    Weight: "2.5-5.0 kg",
                    Application: "Automotive, construction industries",
                },
                features: [
                    "High impact power",
                    "Durable construction",
                    "Ergonomic and easy to use",
                    "Consistent performance",
                ],
            },
        },
    },
    {
        id: 5,
        slug: "nop-oil-pump",
        category: "oil-pump",
        brand: "nop",
        brandName: "NOP",
        brandLogo: NOP,
        image: turboCompressor,
        images: [turboCompressor],
        title: "NOP Oil Pump",
        subtitle: "Pompa oli industri dengan efisiensi tinggi",
        description:
            "NOP Oil Pump adalah pompa oli industri yang dirancang dengan teknologi terdepan untuk memberikan efisiensi dan keandalan maksimal. Cocok untuk berbagai aplikasi industri yang membutuhkan sirkulasi oli yang presisi dan konsisten.",
        specifications: {
            Kapasitas: "50-5000 L/min",
            Tekanan: "0.5-3.0 MPa",
            "Suhu Operasi": "-20°C hingga 120°C",
            Viskositas: "1-1000 cSt",
            Aplikasi: "Industri mesin, otomotif, manufaktur",
        },
        features: [
            "Efisiensi tinggi",
            "Tahan terhadap berbagai jenis oli",
            "Operasi senyap",
            "Maintenance minimal",
        ],
        translations: {
            EN: {
                title: "NOP Oil Pump",
                subtitle: "High-efficiency industrial oil pump",
                description:
                    "NOP Oil Pump is an industrial oil pump designed with cutting-edge technology to provide maximum efficiency and reliability. Suitable for various industrial applications that require precise and consistent oil circulation.",
                specifications: {
                    Capacity: "50-5000 L/min",
                    Pressure: "0.5-3.0 MPa",
                    "Operating Temperature": "-20°C to 120°C",
                    Viscosity: "1-1000 cSt",
                    Application:
                        "Machine, automotive, manufacturing industries",
                },
                features: [
                    "High efficiency",
                    "Resistant to various oil types",
                    "Silent operation",
                    "Minimal maintenance",
                ],
            },
        },
    },
    {
        id: 6,
        slug: "teral-industrial-vacuum",
        category: "industrial-vacuum",
        brand: "teral",
        brandName: "Teral",
        brandLogo: Teral,
        image: turboCompressor,
        images: [turboCompressor],
        title: "Teral Industrial Vacuum",
        subtitle: "Vacuum industri untuk pembersihan profesional",
        description:
            "Teral Industrial Vacuum adalah solusi vacuum industri yang dirancang untuk aplikasi pembersihan profesional dan proses industri yang membutuhkan sistem vacuum berkualitas tinggi. Dengan daya hisap yang kuat dan sistem filtrasi canggih.",
        specifications: {
            "Daya Hisap": "5-50 kW",
            "Kapasitas Tangki": "50-500 L",
            "Tingkat Vakum": "90-99%",
            "Sistem Filtrasi": "HEPA Filter",
            Aplikasi: "Industri farmasi, makanan, kimia",
        },
        features: [
            "Daya hisap tinggi",
            "Sistem filtrasi canggih",
            "Konstruksi stainless steel",
            "Mudah dibersihkan",
        ],
        translations: {
            EN: {
                title: "Teral Industrial Vacuum",
                subtitle: "Industrial vacuum for professional cleaning",
                description:
                    "Teral Industrial Vacuum is an industrial vacuum solution designed for professional cleaning applications and industrial processes that require high-quality vacuum systems. With powerful suction and advanced filtration systems.",
                specifications: {
                    "Suction Power": "5-50 kW",
                    "Tank Capacity": "50-500 L",
                    "Vacuum Level": "90-99%",
                    "Filtration System": "HEPA Filter",
                    Application: "Pharmaceutical, food, chemical industries",
                },
                features: [
                    "High suction power",
                    "Advanced filtration system",
                    "Stainless steel construction",
                    "Easy to clean",
                ],
            },
        },
    },
    {
        id: 7,
        slug: "trident-compressor",
        category: "compressor",
        brand: "trident",
        brandName: "Trident",
        brandLogo: Trident,
        image: turboCompressor,
        images: [turboCompressor],
        title: "Trident Compressor",
        subtitle: "Kompresor andal untuk berbagai aplikasi industri",
        description:
            "Trident Compressor adalah kompresor serbaguna yang dirancang untuk memenuhi berbagai kebutuhan industri. Dengan teknologi yang terbukti dan konstruksi yang kokoh, kompresor ini memberikan performa yang konsisten dan andal.",
        specifications: {
            Kapasitas: "20-800 m³/min",
            Tekanan: "0.7-1.2 MPa",
            Daya: "30-600 kW",
            Efisiensi: "Standard Industrial",
            Aplikasi: "Industri umum, manufaktur",
        },
        features: [
            "Serbaguna untuk berbagai aplikasi",
            "Konstruksi kokoh",
            "Performa konsisten",
            "Harga kompetitif",
        ],
        translations: {
            EN: {
                title: "Trident Compressor",
                subtitle:
                    "Reliable compressor for various industrial applications",
                description:
                    "Trident Compressor is a versatile compressor designed to meet various industrial needs. With proven technology and robust construction, this compressor provides consistent and reliable performance.",
                specifications: {
                    Capacity: "20-800 m³/min",
                    Pressure: "0.7-1.2 MPa",
                    Power: "30-600 kW",
                    Efficiency: "Standard Industrial",
                    Application: "General industry, manufacturing",
                },
                features: [
                    "Versatile for various applications",
                    "Robust construction",
                    "Consistent performance",
                    "Competitive price",
                ],
            },
        },
    },
    {
        id: 8,
        slug: "smk-air-treatment",
        category: "air-dryer",
        brand: "smk",
        brandName: "SMK",
        brandLogo: SMK,
        image: turboCompressor,
        images: [turboCompressor],
        title: "SMK Air Treatment",
        subtitle: "Sistem pengolahan udara canggih",
        description:
            "SMK Air Treatment adalah sistem pengolahan udara terintegrasi yang dirancang untuk memberikan kualitas udara terbaik untuk berbagai aplikasi industri. Dengan teknologi filtrasi dan pengolahan yang canggih.",
        specifications: {
            Kapasitas: "100-5000 m³/h",
            "Tingkat Filtrasi": "0.01 micron",
            Efisiensi: "99.99%",
            Sistem: "Multi-stage filtration",
            Aplikasi: "Industri presisi, elektronik",
        },
        features: [
            "Sistem filtrasi multi-stage",
            "Efisiensi tinggi",
            "Kontrol otomatis",
            "Monitoring real-time",
        ],
        translations: {
            EN: {
                title: "SMK Air Treatment",
                subtitle: "Advanced air treatment system",
                description:
                    "SMK Air Treatment is an integrated air treatment system designed to provide the best air quality for various industrial applications. With advanced filtration and treatment technology.",
                specifications: {
                    Capacity: "100-5000 m³/h",
                    "Filtration Level": "0.01 micron",
                    Efficiency: "99.99%",
                    System: "Multi-stage filtration",
                    Application: "Precision industry, electronics",
                },
                features: [
                    "Multi-stage filtration system",
                    "High efficiency",
                    "Automatic control",
                    "Real-time monitoring",
                ],
            },
        },
    },
];

export const productCategories = [
    { id: "all", name: "Semua Kategori" },
    { id: "compressor", name: "Compressor" },
    { id: "air-dryer", name: "Air Dryer" },
    { id: "impact-tools", name: "Impact Tools" },
    { id: "oil-pump", name: "Oil Pump" },
    { id: "industrial-vacuum", name: "Industrial Vacuum" },
];

// English categories for translation support
export const productCategoriesTranslations = {
    EN: [
        { id: "all", name: "All Categories" },
        { id: "compressor", name: "Compressor" },
        { id: "air-dryer", name: "Air Dryer" },
        { id: "impact-tools", name: "Impact Tools" },
        { id: "oil-pump", name: "Oil Pump" },
        { id: "industrial-vacuum", name: "Industrial Vacuum" },
    ],
    ID: [
        { id: "all", name: "Semua Kategori" },
        { id: "compressor", name: "Compressor" },
        { id: "air-dryer", name: "Air Dryer" },
        { id: "impact-tools", name: "Impact Tools" },
        { id: "oil-pump", name: "Oil Pump" },
        { id: "industrial-vacuum", name: "Industrial Vacuum" },
    ],
};
