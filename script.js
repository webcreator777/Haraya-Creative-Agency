/* =====================================================
   HARAYA CREATIVE AGENCY
   INTERACTION SCRIPT
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const navbar =
    document.getElementById("navbar");

const heroCircle =
    document.getElementById("heroCircle");

const heroMessage =
    document.getElementById("heroMessage");

const agencyTitle =
    document.getElementById("agencyTitle");

const hero =
    document.getElementById("home");


/* =====================================================
   MOBILE MENU
===================================================== */

const menuButton =
    document.getElementById("menuButton");

const closeMenu =
    document.getElementById("closeMenu");

const mobileMenu =
    document.getElementById("mobileMenu");

const menuOverlay =
    document.getElementById("menuOverlay");


function openMenu() {

    mobileMenu.classList.add("active");

    menuOverlay.classList.add("active");

}


function closeMobileMenu() {

    mobileMenu.classList.remove("active");

    menuOverlay.classList.remove("active");

}


menuButton.addEventListener(
    "click",
    openMenu
);


closeMenu.addEventListener(
    "click",
    closeMobileMenu
);


menuOverlay.addEventListener(
    "click",
    closeMobileMenu
);


document
    .querySelectorAll(".mobile-menu a")
    .forEach(link => {

        link.addEventListener(
            "click",
            closeMobileMenu
        );

    });


/* =====================================================
   MOBILE SERVICES
===================================================== */

const mobileServicesButton =
    document.getElementById(
        "mobileServicesButton"
    );

const mobileServices =
    document.getElementById(
        "mobileServices"
    );


mobileServicesButton.addEventListener(
    "click",
    () => {

        mobileServices.classList.toggle(
            "active"
        );

        const symbol =
            mobileServicesButton.querySelector(
                "span"
            );

        if (
            mobileServices.classList.contains(
                "active"
            )
        ) {

            symbol.textContent = "−";

        } else {

            symbol.textContent = "+";

        }

    }
);


/* =====================================================
   HERO SCROLL EXPERIENCE
===================================================== */

let lastScroll =
    window.scrollY;


window.addEventListener(
    "scroll",
    () => {

        const scrollY =
            window.scrollY;

        const heroHeight =
            hero.offsetHeight;

        const heroProgress =
            Math.min(
                scrollY /
                (heroHeight * 0.7),
                1
            );


        /* -----------------------------------------
           HERO CIRCLE
        ----------------------------------------- */

        const isMobile =
            window.innerWidth <= 600;


        let circleWidth;
        let circleHeight;


        if (isMobile) {

            circleWidth =
                125 +
                heroProgress * 170;

            circleHeight =
                62.5 +
                heroProgress * 85;

        } else {

            circleWidth =
                860 +
                heroProgress * 1700;

            circleHeight =
                430 +
                heroProgress * 850;

        }


        heroCircle.style.width =
            isMobile
                ? `${circleWidth}vw`
                : `${circleWidth}px`;


        heroCircle.style.height =
            isMobile
                ? `${circleHeight}vw`
                : `${circleHeight}px`;


        /* -----------------------------------------
           HERO CONTENT
        ----------------------------------------- */

        if (heroProgress > 0.2) {

            agencyTitle.classList.add(
                "hidden"
            );

            heroMessage.classList.add(
                "hidden"
            );

            navbar.classList.add(
                "hidden"
            );

        } else {

            agencyTitle.classList.remove(
                "hidden"
            );

            heroMessage.classList.remove(
                "hidden"
            );

            navbar.classList.remove(
                "hidden"
            );

        }


        /* -----------------------------------------
           SHOW NAV AFTER HERO
        ----------------------------------------- */

        if (
            scrollY >
            heroHeight * 0.85
        ) {

            navbar.classList.remove(
                "hidden"
            );

        }


        lastScroll =
            scrollY;

    },
    {
        passive: true
    }
);


/* =====================================================
   CAMPAIGNS
===================================================== */

const campaignImage =
    document.getElementById(
        "campaignImage"
    );

const campaignContent =
    document.getElementById(
        "campaignContent"
    );

const campaignNumber =
    document.getElementById(
        "campaignNumber"
    );

const campaignDots =
    document.querySelectorAll(
        ".campaign-dot"
    );


const campaigns = [

    {

        number: "01",

        small: "CAMPAIGN 01",

        title:
            "Make them<br><em>look twice.</em>",

        description:
            "A campaign designed to capture attention, establish a visual identity, and make a brand impossible to overlook.",

        category:
            "BRAND CAMPAIGN"

    },

    {

        number: "02",

        small: "CAMPAIGN 02",

        title:
            "Give your story<br><em>a voice.</em>",

        description:
            "Creative content built around a clear message, turning what your brand has to say into something audiences want to hear.",

        category:
            "CONTENT CAMPAIGN"

    },

    {

        number: "03",

        small: "CAMPAIGN 03",

        title:
            "Turn attention<br><em>into action.</em>",

        description:
            "Strategic marketing that connects creative ideas with real goals and gives audiences a reason to engage.",

        category:
            "MARKETING CAMPAIGN"

    }

];


let currentCampaign =
    0;


function updateCampaign(index) {

    if (
        index < 0 ||
        index >= campaigns.length
    ) {

        return;

    }


    if (
        index === currentCampaign &&
        campaignContent.dataset.loaded
    ) {

        return;

    }


    const campaign =
        campaigns[index];


    campaignContent.style.opacity =
        "0";

    campaignImage.style.opacity =
        "0";


    campaignContent.style.transform =
        "translateY(-45%)";


    setTimeout(
        () => {

            campaignNumber.textContent =
                campaign.number;


            campaignContent.querySelector(
                ".campaign-small"
            ).textContent =
                campaign.small;


            campaignContent.querySelector(
                "h3"
            ).innerHTML =
                campaign.title;


            campaignContent.querySelector(
                "p"
            ).textContent =
                campaign.description;


            campaignContent.querySelector(
                ".campaign-category"
            ).textContent =
                campaign.category;


            campaignDots.forEach(
                (dot, dotIndex) => {

                    dot.classList.toggle(
                        "active",
                        dotIndex === index
                    );

                }
            );


            campaignContent.style.transform =
                "translateY(-50%)";

            campaignContent.style.opacity =
                "1";

            campaignImage.style.opacity =
                "1";


            currentCampaign =
                index;

            campaignContent.dataset.loaded =
                "true";

        },
        250
    );

}


/* =====================================================
   CAMPAIGN SCROLL CONTROL
===================================================== */

const workSection =
    document.getElementById("work");

const campaignStage =
    document.querySelector(".campaign-stage");


/*
    IMPORTANT: campaignStage uses position: sticky.

    Once a sticky element becomes "stuck", the browser
    reports its offsetTop as shifting together with the
    scroll position (it no longer reflects the element's
    original, static position in the page).

    That means these values can NOT be recalculated
    from campaignStage.offsetTop inside the scroll
    handler — doing so made stageStart chase scrollY
    on every frame, so campaignProgress stayed pinned
    near 0 and the campaigns never advanced.

    Instead, the geometry is measured once (on load
    and on resize, while everything is still laid out
    in its natural, non-stuck flow) and cached here.
*/

let stageStart = 0;
let stageHeight = 0;
let sectionBottom = 0;
let campaignScrollDistance = 0;


function calculateCampaignGeometry() {

    const sectionTop =
        workSection.offsetTop;

    stageStart =
        sectionTop +
        campaignStage.offsetTop;

    stageHeight =
        campaignStage.offsetHeight;

    sectionBottom =
        sectionTop +
        workSection.offsetHeight;

    campaignScrollDistance =
        sectionBottom -
        stageStart -
        stageHeight;

}


calculateCampaignGeometry();


window.addEventListener(
    "resize",
    calculateCampaignGeometry
);


window.addEventListener(
    "scroll",
    () => {

        const viewportHeight =
            window.innerHeight;


        if (
            campaignScrollDistance <= 0
        ) {

            return;

        }


        const scrollPosition =
            window.scrollY;


        const campaignProgress =
            (
                scrollPosition -
                stageStart
            ) /
            campaignScrollDistance;


        /*
            Keep the progress between 0 and 1.
        */

        const progress =
            Math.max(
                0,
                Math.min(
                    0.999999,
                    campaignProgress
                )
            );


        /*
            01 = first third
            02 = second third
            03 = final third
        */

        let index =
            Math.floor(
                progress *
                campaigns.length
            );


        index =
            Math.max(
                0,
                Math.min(
                    campaigns.length - 1,
                    index
                )
            );


        /*
            Only update while the campaign
            sticky experience is active.
        */

        const stickyEnd =
            sectionBottom -
            viewportHeight;


        if (
            scrollPosition >= stageStart &&
            scrollPosition <= stickyEnd
        ) {

            updateCampaign(index);

        }

    },
    {
        passive: true
    }
);

/* =====================================================
   CAMPAIGN DOT CLICK
===================================================== */

campaignDots.forEach(
    (dot, index) => {

        dot.addEventListener(
            "click",
            () => {

                const sectionTop =
                    workSection.offsetTop;


                const targetOffset =
                    window.innerHeight *
                    (0.7 + index * 0.8);


                window.scrollTo({

                    top:
                        sectionTop +
                        targetOffset,

                    behavior:
                        "smooth"

                });

            }
        );

    }
);


/* =====================================================
   PROCESS STORY
===================================================== */

const processSection =
    document.getElementById(
        "process"
    );

const processNumber =
    document.getElementById(
        "processNumber"
    );

const processWord =
    document.getElementById(
        "processWord"
    );

const processDescription =
    document.getElementById(
        "processDescription"
    );

const processDots =
    document.querySelectorAll(
        ".process-dot"
    );


const processSteps = [

    {

        number: "01",

        word: "DISCOVER",

        description:
            "We learn about your brand, your goals, your audience, and what makes you different."

    },

    {

        number: "02",

        word: "CREATE",

        description:
            "We turn the strategy into concepts, visuals, content, and experiences built around your identity."

    },

    {

        number: "03",

        word: "LAUNCH",

        description:
            "We bring the work into the real world and make sure your message reaches the people who matter."

    },

    {

        number: "04",

        word: "GROW",

        description:
            "We learn from the response, refine the direction, and continue building your brand forward."

    }

];


let currentProcess =
    -1;


function updateProcess(index) {

    if (
        index === currentProcess
    ) {

        return;

    }


    const step =
        processSteps[index];


    processNumber.style.opacity =
        "0";

    processWord.style.opacity =
        "0";

    processDescription.style.opacity =
        "0";


    processWord.style.transform =
        "translateY(30px)";


    setTimeout(
        () => {

            processNumber.textContent =
                step.number;

            processWord.textContent =
                step.word;

            processDescription.textContent =
                step.description;


            processDots.forEach(
                (dot, dotIndex) => {

                    dot.classList.toggle(
                        "active",
                        dotIndex === index
                    );

                }
            );


            processNumber.style.opacity =
                "1";

            processWord.style.opacity =
                "1";

            processDescription.style.opacity =
                "1";

            processWord.style.transform =
                "translateY(0)";


            currentProcess =
                index;

        },
        180
    );

}


/* =====================================================
   PROCESS SCROLL
===================================================== */

window.addEventListener(
    "scroll",
    () => {

        const rect =
            processSection.getBoundingClientRect();


        const viewportHeight =
            window.innerHeight;


        if (
            rect.top <= 0 &&
            rect.bottom >= viewportHeight
        ) {

            const totalScrollable =
                processSection.offsetHeight -
                viewportHeight;


            const progress =
                Math.abs(rect.top) /
                totalScrollable;


            let index =
                Math.floor(
                    progress * 4
                );


            index =
                Math.max(
                    0,
                    Math.min(
                        3,
                        index
                    )
                );


            updateProcess(index);

        }

    },
    {
        passive: true
    }
);


/* =====================================================
   INITIALIZE
===================================================== */

updateCampaign(0);

updateProcess(0);


/* =====================================================
   RESIZE
===================================================== */

window.addEventListener(
    "resize",
    () => {

        /*
            Recalculate hero geometry
            on resize.
        */

        const scrollY =
            window.scrollY;

        const heroHeight =
            hero.offsetHeight;

        const heroProgress =
            Math.min(
                scrollY /
                (heroHeight * 0.7),
                1
            );


        const isMobile =
            window.innerWidth <= 600;


        if (isMobile) {

            heroCircle.style.width =
                `${
                    125 +
                    heroProgress * 170
                }vw`;

            heroCircle.style.height =
                `${
                    62.5 +
                    heroProgress * 85
                }vw`;

        }

    }
);