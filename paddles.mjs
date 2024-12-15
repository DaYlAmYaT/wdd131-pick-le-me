const paddles = [
    {
        name: 'AMPED Pro Air Epic',
        brand: "Selkirk",
        power: 8.9,
        control: 8.8,
        spin: 9.0,
        price: 179.99,
        description: "The Selkirk AMPED Pro Air Epic is designed for players who seek the perfect combination of power and control. With its larger surface area and longer handle, this paddle delivers enhanced performance, catering to both beginners and advanced players alike. The paddle features Selkirk's FiberFlex+ fiberglass face, offering consistent power and touch for both aggressive shots and finesse play. The upgraded X5+ core ensures a reliable sweet spot and optimal control, making it a great choice for competitive players looking to elevate their game.",
        image: "./images/amped_pro_air_epic.jpg",
    },
    {
        name: 'AMPED Pro Air Invikta',
        brand: "Selkirk",
        power: 8.7,
        control: 9.1,
        spin: 8.9,
        price: 179.99,
        description: "The Selkirk AMPED Pro Air Invikta is an all-court pickleball paddle designed for players who want a blend of power, control, and a forgiving sweet spot. With its elongated shape, it offers extended reach and excellent ball control, making it ideal for both offensive and defensive play. This paddle is suitable for players seeking a powerful option that doesn’t compromise control, with solid performance in both spin and precision.",
        image: "./images/amped_pro_air_invikta.jpg",
    },
    {
        name: 'Bantam ALW-C 12.7mm',
        brand: "Paddletek",
        power: 9.5,
        control: 8,
        spin: 8,
        price: 249.00,
        description: "The Paddletek Bantam ALW-C 12.7mm pickleball paddle is built for aggressive players, offering excellent power and speed with its 12.7mm polymer honeycomb core and textured raw carbon fiber face. Designed for quick handling, it excels in volleys and drives but requires precision for softer shots. Developed with pro Anna Leigh Waters, it features a 5.25-inch handle and a middleweight frame.",
        image: "./images/bantam_alwc_12mm.jpg",
    },
    {
        name: 'Bantam ALW-C 14.3mm',
        brand: "Paddletek",
        power: 9,
        control: 8,
        spin: 9.5,
        price: 249.00,
        description: "The Paddletek Bantam ALW-C 14.3mm is a premium pickleball paddle designed for high-performance players. Developed in collaboration with Anna Leigh Waters, the paddle balances power, control, and spin. It features a 14.3mm polymer honeycomb Bantam core for a forgiving feel and a PT-700 unidirectional raw carbon fiber surface for enhanced spin and precision.",
        image: "./images/bantam_alwc_12mm.jpg",
    },
    {
        name: 'Bantam ESQ-C 12.7mm',
        brand: "Paddletek",
        power: 8.5,
        control: 7.5,
        spin: 8.5,
        price: 249.00,
        description: "The Paddletek Bantam ESQ-C 12.7mm Pickleball Paddle is built for power and control, featuring a responsive 12.7mm Bantam Polymer honeycomb core that offers excellent pop and reduces vibration. The paddle’s PT-700 Unidirectional RAW Carbon Fiber face delivers impressive spin and durability. Designed to meet the demands of professional player Andrea Koop, it excels in providing a balanced and responsive playing experience, particularly in aggressive shots​.",
        image: "./images/bantam_esqc_12mm.jpg",
    },
    {
        name: 'Bantam ESQ-C 14.3mm',
        brand: "Paddletek",
        power: 8,
        control: 8,
        spin: 8,
        price: 249.00,
        description: "The Paddletek Bantam ESQ-C 14.3mm pickleball paddle, used by pro player Andrea Koop, blends power and control for both offensive and defensive playstyles. It features a PT-700 Unidirectional Raw Carbon Fiber face for durability and a 14.3mm Bantam Honeycomb Polymer core for enhanced stability. With a wide sweet spot and comfortable grip, this paddle is ideal for players seeking high performance​.",
        image: "./images/bantam_esqc_14mm.jpg",
    },
    {
        name: 'Bantam TKO-C 12.7mm',
        brand: "Paddletek",
        power: 9,
        control: 8.5,
        spin: 8.5,
        price: 249.00,
        description: "The Paddletek Bantam TKO-C 12.7mm paddle is co-developed with pro player Christian Alshon, who uses it to deliver power, control, and spin during competitive play. It’s designed with a 12.7mm polymer core and raw carbon fiber surface for precision and consistency, tailored to high-level performance​.",
        image: "./images/bantam_tkoc_12mm.jpg",
    },
    {
        name: 'Bantam TKO-C 14.3mm',
        brand: "Paddletek",
        power: 9,
        control: 9,
        spin: 9,
        price: 249.00,
        description: "The Paddletek Bantam TKO-C 14.3mm paddle, co-developed with pro Christian Alshon, combines power, control, and spin. Its 14.3mm Bantam PolyCore and PT-700 raw carbon fiber surface offer a forgiving sweet spot, ideal for players seeking power and consistency. The elongated shape and 5.25-inch grip are great for reach and two-handed backhands, while the textured surface generates impressive spin. This paddle is perfect for advanced players who want a durable, high-performance option​.",
        image: "./images/bantam_tkoc_14mm.jpg",
    },
    {
        name: 'Hyperion Gen 3S 14mm',
        brand: "Joola",
        power: 9.5,
        control: 9.7,
        spin: 9.6,
        price: 279.95,
        description: "The JOOLA Ben Johns Hyperion 3S 14mm is designed for high performance, featuring the brand's Propulsion Core technology and a Charged Carbon surface for powerful, yet controlled shots. Its Aero Curve shape reduces drag and increases swing speed, making it ideal for players seeking stability and finesse.",
        image: "./images/hyperion_3s_14mm.jpg",
    },
    {
        name: 'Hyperion Gen 3S 16mm',
        brand: "Joola",
        power: 9.3,
        control: 9.8,
        spin: 9.7,
        price: 279.95,
        description: "The JOOLA Ben Johns Hyperion 3S 16mm paddle is known for its blend of power and control, thanks to the Propulsion Core technology. Its carbon fiber surface offers crisp feedback and a responsive pop. This paddle’s larger hitting area makes it easier to maintain control, while the NFC chip unlocks an enhanced JOOLA experience.",
        image: "./images/hyperion_3s_16mm.jpg",
    },
    {
        name: 'LUXX Control Air Epic',
        brand: "Selkirk",
        power: 9.6,
        control: 9.5,
        spin: 9.6,
        price: 249.99,
        description: "The Selkirk LUXX Control Air Epic is designed for players seeking maximum control and finesse. Featuring Florek Carbon Fiber technology and a 20mm X7 Thikset Honeycomb core, it provides exceptional feel and a large sweet spot for precision shots. The paddle is lightweight and maneuverable, making it ideal for players who rely on touch and placement, while also offering ample power for drives and serves. It's endorsed by pro player Jack Sock​.",
        image: "./images/luxx_control_air_epic.jpg",
    },
    {
        name: 'LUXX Control Air Invikta',
        brand: "Selkirk",
        power: 9.4,
        control: 9.7,
        spin: 9.5,
        price: 249.99,
        description: "The Selkirk LUXX Control Air Invikta is a high-performance pickleball paddle designed for players seeking ultimate control and precision. Featuring a 20mm thick honeycomb core and Florek Carbon Fiber for an expanded sweet spot and added power, this paddle is ideal for those who prioritize finesse. It has an elongated shape for added reach and maneuverability, making it suitable for all-court play. Pro player Jack Sock endorses this paddle, making it a top choice for competitive players.",
        image: "./images/luxx_control_air_invikta.jpg",
    },
    {
        name: 'LUXX Control Air S2',
        brand: "Selkirk",
        power: 9.5,
        control: 9.8,
        spin: 9.3,
        price: 249.99,
        description: "The Selkirk LUXX Control Air S2 is a high-performance paddle designed for players prioritizing control and precision. Featuring Florek Carbon Fiber technology, it offers an expanded sweet spot and enhanced spin. With a 20mm Thikset Honeycomb core and Aero-DuraEdge Edgeless technology, this paddle delivers durability and a consistent feel. It's ideal for tacticians who rely on finesse over power.",
        image: "./images/luxx_control_air_s2.jpg",
    },
    {
        name: 'Magnus Gen 3S 14mm',
        brand: "Joola",
        power: 9.7,
        control: 9.3,
        spin: 9.5,
        price: 279.95,
        description: "The JOOLA Magnus Gen 3S 14mm paddle, used by professional player Tyson McGuffin, is designed for precision and control. With its advanced Propulsion Core Technology, the paddle delivers consistent performance, offering excellent shot placement and handling. It’s built for players who demand reliable power and control in their game​.",
        image: "./images/magnus_3s_14mm.jpg",
    },
    {
        name: 'Magnus Gen 3S 16mm',
        brand: "Joola",
        power: 9.5,
        control: 9.4,
        spin: 9.6,
        price: 279.95,
        description: "The JOOLA Tyson McGuffin Magnus Gen 3S 16mm pickleball paddle offers exceptional power and precision, with a solid construction designed to enhance performance during fast-paced games. Ideal for players looking for stability, it is known for its responsive touch and impressive control. As used by top pro player Tyson McGuffin, this paddle is a favorite among competitive players seeking strength in every shot.",
        image: "./images/magnus_3s_16mm.jpg",
    },
    {
        name: 'Perseus Gen 3S 14mm',
        brand: "Joola",
        power: 9.8,
        control: 9.6,
        spin: 9.6,
        price: 279.95,
        description: "The Joola Gen 3S Perseus 14mm pickleball paddle is designed for Ben Johns and players who value power combined with control. It features a responsive carbon fiber face and advanced technology that maximizes ball speed and power while maintaining a high level of control. The paddle excels in defense, with its extra power helping players counter baseline drives effectively. The firm and lively feel at impact gives players an edge, though it requires skill to manage its dynamic response. It’s a great choice for advanced players looking to up their game.",
        image: "./images/perseus_3s_14mm.jpg",
    },
    {
        name: 'Perseus Gen 3S 16mm',
        brand: "Joola",
        power: 9.6,
        control: 9.8,
        spin: 9.7,
        price: 279.95,
        description: "The JOOLA Ben Johns Perseus 3S 16mm Pickleball Paddle is designed for Ben Johns, the world number 1 player. It features a Charged Carbon surface and a Propulsion Core, offering excellent power and control. The paddle's unique 16mm core enhances stability and shot placement, making it ideal for aggressive players. It is UPA-A certified, ensuring it meets official performance standards.",
        image: "./images/perseus_3s_16mm.jpg",
    },
    {
        name: 'Scorpeus Gen 3S 14mm',
        brand: "Joola",
        power: 9.8,
        control: 9.4,
        spin: 9.6,
        price: 279.95,
        description: "The JOOLA Scorpeus Gen 3S 14mm pickleball paddle is designed for players seeking power and control. With its Propulsion Core and raw carbon fiber face, it offers excellent ball pop while maintaining maneuverability. Ideal for advanced players who need a paddle that combines power with precision, it’s particularly effective for aggressive play. The paddle is favored by pro Anna Bright, known for her quick and dynamic game.",
        image: "./images/scorpeus_3s_14mm.jpg",
    },
    {
        name: 'Scorpeus Gen 3S 16mm',
        brand: "Joola",
        power: 9.7,
        control: 9.6,
        spin: 9.7,
        price: 279.95,
        description: "The JOOLA Scorpeus Gen 3S 16mm pickleball paddle is designed for advanced players like Collin Johns. It features a wider sweet spot, ideal for defensive play and fast hands at the kitchen. The paddle combines control and power, with a 'trampoline effect' propulsion core for easy shot placement. It's known for durability and its forgiving nature, making it perfect for players who need precision and speed in their game.",
        image: "./images/scorpeus_3s_16mm.jpg",
    },
    {
        name: 'SLK Halo Control - Max',
        brand: "Selkirk",
        power: 9.3,
        control: 9.6,
        spin: 9.5,
        price: 130.00,
        description: "The Selkirk SLK Halo Control Max is designed for players who prioritize control and precision, offering a forgiving response for both dinking and power shots. With a responsive face and excellent handling, it's perfect for players looking to improve their accuracy. This paddle is part of the SLK series, known for its lightweight and balanced feel. It's an excellent choice for intermediate players who seek enhanced control without sacrificing performance.",
        image: "./images/slk_halo_max.jpg",
    },
    {
        name: 'Vanguard Control Invikta',
        brand: "Selkirk",
        power: 9.2,
        control: 9.7,
        spin: 9.5,
        price: 199.99,
        description: "The Selkirk Vanguard Control Invikta is a high-performance paddle designed for players who prioritize control and precision. It features a T700 Raw QuadCarbon Fiber face and a Vanguard X5+ Honeycomb Core for durability and enhanced spin potential. Known for its large sweet spot, this paddle excels in control, especially for strategic play, making it ideal for advanced and competitive players. The ergonomic grip and design provide comfort during prolonged matches.",
        image: "./images/vanguard_control_invikta.jpg",
    },
    {
        name: 'Vanguard Pro Invikta',
        brand: "Selkirk",
        power: 9.6,
        control: 9.3,
        spin: 9.6,
        price: 229.99,
        description: "The Selkirk Vanguard Invikta 16mm is crafted for advanced players seeking enhanced reach and power. With a larger sweet spot and balanced design, it combines precision, spin, and control. Featuring the Quantum-CarbonFiber face and Pro-Spin Texture, this paddle excels in both aggressive and controlled play. ",
        image: "./images/vanguard_pro_invikta.jpg",
    },
]

export default paddles;