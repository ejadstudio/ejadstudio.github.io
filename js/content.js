/* ============================================================
   EJAD Studio — كل نصوص الموقع ومحتواه في مكان واحد
   عدّل هنا فقط: النصوص (ar / en)، الأعمال، الريلز، العملاء، التواصل
   ============================================================ */

window.EJAD = {

  /* ---------- التواصل ---------- */
  contact: {
    whatsapp: "966566899870",          // بدون + وبدون صفر
    phoneDisplay: "05 66 8 99 870",
    email: "ejad.st@outlook.sa",
    instagram: "https://instagram.com/ejad.st",   // يختفي الزر إذا كان فاضي
    tiktok: "https://www.tiktok.com/@ejad.st",
    handle: "@EJAD.ST"
  },

  /* ---------- الواجهة ---------- */
  hero: {
    // فيديو واحد فيه الأعمدة الأربعة: wide للشاشات العريضة و tall للجوال
    wide: { video: "assets/hero/hero-wide.mp4", poster: "assets/hero/hero-wide.webp" },
    tall: { video: "assets/hero/hero-tall.mp4", poster: "assets/hero/hero-tall.webp" }
  },

  /* ---------- نصوص الواجهة ---------- */
  ui: {
    "nav.home":      { ar: "إيجاد",   en: "EJAD" },
    "nav.work":      { ar: "أعمالنا", en: "Work" },
    "nav.services":  { ar: "خدماتنا", en: "Services" },
    "nav.contact":   { ar: "تواصل",   en: "Contact" },
    "lang.switch":   { ar: "EN", en: "ع" },
    "lang.label":    { ar: "Switch to English", en: "التبديل إلى العربية" },

    "hero.kicker":   { ar: "استوديو إبداعي سعودي", en: "A Saudi Creative Studio" },
    "intro.tagline": { ar: "استوديو إبداعي سعودي", en: "A Saudi Creative Studio" },
    "hero.title":    { ar: "علامات تُبنى<br>لتُعرف.", en: "Brands built<br>to be recognised." },
    "hero.sub":      { ar: "نبني العلامة التجارية من الاستراتيجية إلى أدق تفاصيلها البصرية.",
                       en: "We build brands from strategy to the finest visual detail." },
    "hero.cta1":     { ar: "استعرض أعمالنا", en: "View our work" },
    "hero.cta2":     { ar: "تواصل معنا", en: "Contact us" },

    "about.kicker":  { ar: "فلسفتنا", en: "Our philosophy" },
    "about.title":   { ar: "<em>الوضوح</em> قبل التصميم.",
                       en: "<em>Clarity</em> before design." },
    "about.sub":     { ar: "قبل الشعار والألوان نحدد ما تقوله علامتك ولمن تقوله ثم ندع أعمالنا تعبّر عنا.",
                       en: "Before the logo and the colours we define what your brand says and to whom and then let our work speak for itself." },

    "work.kicker":   { ar: "أعمال مختارة", en: "Selected work" },
    "work.title":    { ar: "هويات بُنيت<br>بهدف.", en: "Identities built<br>with purpose." },
    "work.did":      { ar: "ما قدمناه", en: "Scope of work" },
    "card.play":     { ar: "تشغيل", en: "Play" },

    "reels.kicker":  { ar: "مقاطع الريلز", en: "Reels" },
    "reels.title":   { ar: "الحركة تروي<br>قصة العلامة.", en: "Motion tells<br>the brand’s story." },
    "reels.prev":    { ar: "السابق", en: "Previous" },
    "reels.next":    { ar: "التالي", en: "Next" },


    "process.kicker": { ar: "منهجية العمل", en: "Our process" },
    "process.title":  { ar: "من الفهم<br>إلى الإطلاق.", en: "From understanding<br>to launch." },

    "services.kicker": { ar: "خدماتنا", en: "Our services" },
    "services.title":  { ar: "ثلاث خدمات<br>لعلامة واحدة.", en: "Three services.<br>One brand." },

    "clients.kicker":  { ar: "عملاء عملنا معهم", en: "Clients we have worked with" },
    "lab.kicker":      { ar: "مختبر العلامات", en: "Brand Lab" },

    "contact.kicker":  { ar: "تواصل", en: "Contact" },
    "contact.title":   { ar: "لنبنِ<br><span class=\"hand\">علامتك</span>.", en: "Let us build<br><span class=\"hand\">yours</span>." },
    "contact.sub":     { ar: "علامتك تستحق أن تُعرف فتواصل معنا اليوم وسنرد عليك في أقرب وقت.", en: "Your brand deserves to be known so contact us today and we will respond as soon as possible." },
    "contact.whatsapp":{ ar: "واتساب", en: "WhatsApp" },
    "contact.email":   { ar: "البريد الإلكتروني", en: "Email" },
    "contact.instagram":{ ar: "إنستغرام", en: "Instagram" },
    "contact.tiktok":  { ar: "تيك توك", en: "TikTok" },
    "footer.rights":   { ar: "© 2026 استوديو إيجاد", en: "© 2026 EJAD Studio" },
    "footer.top":      { ar: "العودة إلى الأعلى", en: "Back to top" }
  },

  /* ---------- طريقة الشغل ---------- */
  process: [
    { ar: "نكتشف", en: "Discover", dar: "نتعرّف على نشاطك وجمهورك وسوقك.", den: "We study your business, audience and market." },
    { ar: "نحدد",  en: "Define",   dar: "نحدد الاتجاه قبل البدء في أي تصميم.", den: "We establish the direction before any design begins." },
    { ar: "نصنع",  en: "Create",   dar: "نصمم الهوية ونبني نظامها.", den: "We design the identity and build its system." },
    { ar: "نطلق",  en: "Launch",   dar: "نطبق الهوية على المطبوعات ومنصات التواصل والموشن.", den: "We apply the identity across print, social media and motion." }
  ],

  /* ---------- الخدمات ---------- */
  services: [
    { ar: "استراتيجية العلامة", en: "Brand strategy",   dar: "اسم العلامة ورسالتها وشخصيتها. نصوغها أولًا ليكون كل قرار لاحق واضحًا.", den: "Name, message and personality. Defined first so that every later decision is clear." },
    { ar: "الهوية البصرية",     en: "Visual identity",  dar: "شعار وألوان وخطوط مع دليل يوضح طريقة استخدامها.", den: "Logo, colours and typography with a guide to their use." },
    { ar: "الموشن والمونتاج",   en: "Motion & editing", dar: "مقاطع ريلز وشعارات متحركة وأفلام قصيرة من كتابة النص إلى المونتاج النهائي.", den: "Reels, animated logos and short films from script to final edit." }
  ],

  /* ---------- الأعمال (بالترتيب) ----------
     sector: القطاع · desc: سطرين عن البراند · services: وش قدمنا
     pos: مكان التركيز لكل صورة · logo: شعار أبيض شفاف
     images: الصور (الأولى رئيسية والباقي تتبدل كل ثانيتين)                                            */
  projects: [
    {
      id: "abyat", logo: "assets/logos/abyat.png", pos: ["50% 45%", "72% 50%", "50% 50%", "50% 62%"],
      title:  { ar: "أبيات الرياض العقارية", en: "Abyat Riyadh Real Estate" },
      sector: { ar: "عقار", en: "Real estate" },
      desc:   { ar: "مفهوم سكني معاصر في الرياض. نظام موحد من الألوان والأيقونات يشمل جميع تطبيقات الهوية.",
                en: "A contemporary residential concept in Riyadh. A unified colour and icon system spans every application." },
      services: { ar: ["الهوية البصرية", "دليل الهوية", "نظام الألوان", "الأيقونات", "تطبيقات الهوية"],
                  en: ["Visual identity", "Brand guidelines", "Colour system", "Icons", "Applications"] },
      images: ["assets/work/abyat-1.webp", "assets/work/abyat-2.webp", "assets/work/abyat-3.webp", "assets/work/abyat-4.webp"]
    },
    {
      id: "qadi", logo: "assets/logos/qadi.png", pos: ["50% 50%", "50% 50%", "50% 50%"],
      title:  { ar: "عبدالله القاضي", en: "Abdullah Alkadi" },
      sector: { ar: "فيلم تاريخي قصير", en: "Historical short film" },
      desc:   { ar: "فيلم قصير عن الأميال القديمة في عهد الرسول ﷺ يقدّم المعلومة التاريخية في قالب قصصي مرئي.",
                en: "A short film on the ancient miles in the Prophet’s ﷺ time that presents historical fact as a visual narrative." },
      services: { ar: ["المونتاج", "تطوير النص", "الترجمة المعتمدة", "التعليق الصوتي"],
                  en: ["Editing", "Script development", "Approved translation", "Voice-over"] },
      images: ["assets/work/qadi-1.webp", "assets/work/qadi-2.webp", "assets/work/qadi-3.webp"]
    },
    {
      id: "scm", logo: "assets/logos/scm.png", pos: ["50% 50%", "72% 50%"],
      title:  { ar: "إس سي إم كِت", en: "SCM Kit" },
      sector: { ar: "منصة رقمية", en: "Digital platform" },
      desc:   { ar: "منصة تجمع أدوات العمل وقوالبه في مكان واحد وتعبّر هويتها عن ذلك من النظرة الأولى.",
                en: "A platform that brings work tools and templates together. The identity conveys this at first glance." },
      services: { ar: ["الهوية البصرية", "دليل الهوية", "نظام الألوان", "تطبيقات الهوية"],
                  en: ["Visual identity", "Brand guidelines", "Colour system", "Applications"] },
      images: ["assets/work/scm-1.webp", "assets/work/scm-2.webp"]
    },
    {
      id: "ghada", logo: "assets/logos/ghada.png", pos: ["50% 50%"],
      title:  { ar: "غادة القاضي", en: "Ghada Alkadi" },
      sector: { ar: "تصميم داخلي", en: "Interior design" },
      desc:   { ar: "مصممة داخلية. أعددنا الهوية والملف التعريفي وعروض المشاريع على منصات التواصل.",
                en: "An interior designer. We developed the identity, company profile and social media project carousels." },
      services: { ar: ["الهوية البصرية", "الملف التعريفي", "عروض المشاريع", "مقاطع ريلز"],
                  en: ["Visual identity", "Company profile", "Project carousels", "Reels"] },
      images: ["assets/work/ghada-1.webp"]
    },
    {
      id: "axen", lab: true, logo: "assets/logos/axen.png", pos: ["72% 50%", "50% 40%", "50% 40%"],
      title:  { ar: "أكسن", en: "AXEN" },
      sector: { ar: "علامة رياضية", en: "Performance wear" },
      desc:   { ar: "علامة ملابس رياضية تقوم على الأداء والانضباط. هوية مستمدة من الحركة تمتد من الشعار إلى القطعة.",
                en: "Performance wear built on discipline. An identity derived from movement extends from logo to garment." },
      services: { ar: ["الهوية البصرية", "دليل الهوية", "نظام الألوان", "تطبيقات الملابس"],
                  en: ["Visual identity", "Brand guidelines", "Colour system", "Apparel applications"] },
      images: ["assets/work/axen-1.webp", "assets/work/axen-2.webp", "assets/work/axen-3.webp"]
    },
    {
      id: "darla", lab: true, logo: "assets/logos/darla.png", pos: ["78% 50%"],
      title:  { ar: "دارلا", en: "Darla" },
      sector: { ar: "مطعم إيطالي", en: "Italian restaurant" },
      desc:   { ar: "مطعم إيطالي معاصر تقوم فكرته على المشاركة حول طاولة واحدة ومنها انطلقت الهوية.",
                en: "A contemporary Italian restaurant built around sharing a table. The identity starts from that idea." },
      services: { ar: ["الهوية البصرية", "دليل الهوية", "نظام الألوان", "تطبيقات الهوية"],
                  en: ["Visual identity", "Brand guidelines", "Colour system", "Applications"] },
      images: ["assets/work/darla-1.webp"]
    },
    {
      id: "zirvae", lab: true, logo: "assets/logos/zirvae.png", pos: ["72% 50%"],
      title:  { ar: "زيرفاي", en: "ZIRVAE" },
      sector: { ar: "دار عطور", en: "Perfume house" },
      desc:   { ar: "دار عطور تقوم على العمق والدقة. هوية مقتصدة تجعل العطر في الصدارة.",
                en: "A perfume house built on depth and precision. A restrained identity that places the scent at the forefront." },
      services: { ar: ["الهوية البصرية", "تطبيقات الهوية", "محتوى منصات التواصل", "مقطع ريل"],
                  en: ["Visual identity", "Applications", "Social media content", "Reel"] },
      images: ["assets/work/zirvae-1.webp"]
    },
    {
      id: "sola", lab: true, logo: "assets/logos/sola.png", pos: ["50% 62%"],
      title:  { ar: "سولا", en: "SOLA" },
      sector: { ar: "عناية صيفية", en: "Summer care" },
      desc:   { ar: "علامة عناية وتسمير مستوحاة من الشمس والبحر. تنقل الهوية والعبوات أجواء الصيف.",
                en: "A sun-care and tanning brand inspired by sun and sea. Identity and packaging convey the atmosphere of summer." },
      services: { ar: ["الهوية البصرية", "دليل الهوية", "نظام الألوان", "تصميم العبوات"],
                  en: ["Visual identity", "Brand guidelines", "Colour system", "Packaging"] },
      images: ["assets/work/sola-3.webp"]
    },
    {
      id: "ghabas", lab: true, logo: "assets/logos/ghabas.png", pos: ["50% 55%"],
      title:  { ar: "غبس", en: "Ghabas" },
      sector: { ar: "مقهى", en: "Coffee" },
      desc:   { ar: "قهوة عند أول الضوء. تنطلق الهوية وقائمة المشروبات ونمط منصات التواصل من لحظة الصباح.",
                en: "Coffee at first light. The identity, menu and social media style originate from that early-morning moment." },
      services: { ar: ["الهوية البصرية", "دليل الهوية", "قائمة المشروبات", "نمط منصات التواصل"],
                  en: ["Visual identity", "Brand guidelines", "Menu", "Social media style"] },
      images: ["assets/work/ghabas-1.webp"]
    },
    {
      id: "hawn", lab: true, logo: "assets/logos/hawn.png", pos: ["50% 50%"],
      title:  { ar: "هون", en: "Hawn" },
      sector: { ar: "استوديو عافية", en: "Wellness studio" },
      desc:   { ar: "استوديو عافية يقوم على التوازن والحركة. هوية خفيفة تمنح مساحة للتنفس.",
                en: "A wellness studio built on balance and movement. A light identity that leaves room to breathe." },
      services: { ar: ["الهوية البصرية", "تطبيقات الهوية", "محتوى منصات التواصل"],
                  en: ["Visual identity", "Applications", "Social media content"] },
      images: ["assets/work/hawn-1.webp"]
    },
    {
      id: "wadi", lab: true, logo: "assets/logos/wadi.png", pos: ["50% 55%", "50% 55%", "50% 50%"],
      title:  { ar: "وادي ٢٧", en: "Wadi 27" },
      sector: { ar: "ضيافة صحراوية", en: "Desert hospitality" },
      desc:   { ar: "ضيافة في قلب الطبيعة بعمارة معاصرة. هوية وعبوات مستوحاة من الصحراء السعودية.",
                en: "Hospitality set in nature with contemporary architecture. Identity and packaging inspired by the Saudi desert." },
      services: { ar: ["الهوية البصرية", "دليل الهوية", "نظام الألوان", "تصميم العبوات"],
                  en: ["Visual identity", "Brand guidelines", "Colour system", "Packaging"] },
      images: ["assets/work/wadi-1.webp", "assets/work/wadi-2.webp", "assets/work/wadi-3.webp"]
    }
  ],

  /* ---------- الريلز (بالترتيب) ---------- */
  reels: [
    { id: "r-scm",       title: { ar: "إس سي إم كِت", en: "SCM Kit" },                 client: "SCM Kit",       cover: "assets/reels/scm.webp",             src: "assets/reels/scm.mp4" },
    { id: "r-ghada-id",  title: { ar: "هوية غادة القاضي", en: "Ghada Alkadi identity" }, client: "Ghada Alkadi",  cover: "assets/reels/ghada-id.webp",        src: "assets/reels/ghada-id.mp4" },
    { id: "r-penthouse", title: { ar: "بنتهاوس غادة القاضي", en: "Ghada Alkadi penthouse" }, client: "Ghada Alkadi", cover: "assets/reels/ghada-penthouse.webp", src: "assets/reels/ghada-penthouse.mp4" },
    { id: "r-axen",      title: { ar: "انطلق مع أكسن", en: "Go with AXEN" },                client: "AXEN",          cover: "assets/reels/axen.webp",            src: "assets/reels/axen.mp4" },
    { id: "r-zirvae",    title: { ar: "زيرفاي", en: "ZIRVAE" },                         client: "ZIRVAE",        cover: "assets/reels/zirvae.webp",          src: "assets/reels/zirvae.mp4" },
    { id: "r-cities",    title: { ar: "مدن المملكة", en: "Saudi cities" },             client: "EJAD",          cover: "assets/reels/cities.webp",          src: "assets/reels/cities.mp4" },
    { id: "r-voice",     title: { ar: "نصمم هويتك", en: "We design your identity" },  client: "EJAD",          cover: "assets/reels/voice.webp",           src: "assets/reels/voice.mp4" },
    { id: "r-chars",     title: { ar: "شخصيات إيجاد", en: "EJAD characters" },         client: "EJAD",          cover: "assets/reels/characters.webp",      src: "assets/reels/characters.mp4" }
  ],

  /* ---------- الشعارات ----------
     partners: عملاء فعليين · lab: براندات Brand Lab            */
  partners: [
    { name: "Abyat Riyadh",    logo: "assets/logos/abyat.png" },
    { name: "SCM Kit",         logo: "assets/logos/scm.png" },
    { name: "Ghada Alkadi",    logo: "assets/logos/ghada.png" },
    { name: "Abdullah Alkadi", logo: "assets/logos/qadi.png" }
  ],
  lab: [
    { name: "AXEN",    logo: "assets/logos/axen.png" },
    { name: "Darla",   logo: "assets/logos/darla.png" },
    { name: "ZIRVAE",  logo: "assets/logos/zirvae.png" },
    { name: "Ghabas",  logo: "assets/logos/ghabas.png" },
    { name: "SOLA",    logo: "assets/logos/sola.png" },
    { name: "Hawn",    logo: "assets/logos/hawn.png" },
    { name: "Wadi 27", logo: "assets/logos/wadi.png" }
  ]
};
