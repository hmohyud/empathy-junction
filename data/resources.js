// ============================================================
//  RESOURCES PAGE — CONTENT FILE
//
//  This file controls what appears on the Resources page.
//  You don't need to know how to code — just copy one of
//  the examples below, paste it in the right section,
//  and change the text inside the "quotes".
//
//
//  HOW TO ADD A NEW RESOURCE:
//  ─────────────────────────
//    1. Scroll down to the right section (Videos, Audio, etc.)
//    2. Copy an existing block (everything from { to },)
//    3. Paste it RIGHT ABOVE the one you copied
//       (new items should always go at the top of each section)
//    4. Change the text between the "quotes" to your own content
//    5. Save the file and refresh the website to see your changes
//
//
//  IMPORTANT — COMMON MISTAKES TO AVOID:
//  ──────────────────────────────────────
//    - Every piece of text MUST be wrapped in "quotes"
//    - Every block MUST end with },  (closing brace + comma)
//    - Don't delete the lines that say // ---- VIDEOS ---- etc.
//    - Don't change the lines that say  type: "video"  etc.
//      (those tell the website what kind of card to show)
//
//
//  COPY-PASTE TEMPLATES:
//  ─────────────────────
//  Below are ready-to-copy templates for each type of resource.
//  Just copy the one you need, paste it in the right section,
//  and replace the placeholder text with your own.
//
//
//  YOUTUBE VIDEO:
//  (paste the full YouTube link — or just the video ID)
//
//    {
//        type: "video",
//        title: "Name of the video",
//        excerpt: "A short description of what this video is about.",
//        date: "February 2026",
//        videoId: "https://www.youtube.com/watch?v=XXXXXXXXXXX"
//    },
//
//
//  AUDIO RECORDING:
//  (put the audio file in the "public" folder first,
//   then type the file name below — e.g. "public/my-track.mp3")
//
//    {
//        type: "audio",
//        title: "Name of the audio",
//        excerpt: "A short description of what this audio is about.",
//        date: "February 2026",
//        audioSrc: "public/my-file-name.mp3"
//    },
//
//
//  WRITTEN ARTICLE:
//  (readers see the excerpt first, then click to expand and
//   read the full paragraphs)
//
//    {
//        type: "article",
//        title: "Title of the article",
//        excerpt: "A short preview shown before the reader expands.",
//        date: "February 2026",
//        body: [
//            "First paragraph goes here.",
//            "Second paragraph goes here.",
//            "Add as many paragraphs as you like — one per line."
//        ]
//    },
//
//
//  REFERENCE LIST:
//  (for grouped lists like needs, feelings, sensations, etc.)
//
//    {
//        type: "list",
//        title: "Name of the list",
//        excerpt: "A short description of what this list is for.",
//        items: [
//            { category: "Group Name", values: "item one, item two, item three" },
//            { category: "Another Group", values: "item one, item two" }
//        ]
//    },
//
//
//  EXTERNAL LINK:
//  (for book recommendations, websites, or other external pages)
//
//    {
//        type: "link",
//        title: "Name of the book or website",
//        excerpt: "A short description of why this is worth visiting.",
//        url: "https://www.example.com/"
//    },
//
//
//  TRANSLATIONS (OPTIONAL):
//  ─────────────────────────
//  You can add Hindi or Urdu versions of the title and excerpt.
//  If you don't add translations, the English text will be shown
//  regardless of which language the visitor picks.
//
//  To add translations, add an "i18n" section to any resource:
//
//    {
//        type: "video",
//        title: "English title here",
//        excerpt: "English description here.",
//        date: "February 2026",
//        videoId: "XXXXXXXXXXX",
//        i18n: {
//            hi: { title: "हिंदी शीर्षक", excerpt: "हिंदी विवरण।" },
//            ur: { title: "اردو عنوان", excerpt: "اردو تفصیل۔" }
//        }
//    },
//
//  You can translate just one language (e.g. only "hi") — you
//  don't have to do both. Fields you don't translate will stay
//  in English. For articles, you can also translate the "body":
//
//        i18n: {
//            hi: {
//                title: "हिंदी शीर्षक",
//                excerpt: "हिंदी विवरण।",
//                body: ["पहला पैराग्राफ।", "दूसरा पैराग्राफ।"]
//            }
//        }
//
// ============================================================

window.RESOURCES_DATA = [

    // ---- VIDEOS ----

    {
        type: "video",
        title: "Marshall Rosenberg — NVC San Francisco Workshop",
        excerpt: "A full Nonviolent Communication workshop by Marshall Rosenberg, covering the foundations of empathic listening and compassionate dialogue.",
        date: "February 2026",
        videoId: "l7TONauJGfc",
        i18n: {
            hi: {
                title: "Marshall Rosenberg — NVC San Francisco कार्यशाला",
                excerpt: "Marshall Rosenberg द्वारा एक पूर्ण अहिंसक संवाद कार्यशाला, जिसमें सहानुभूतिपूर्ण सुनने और करुणामय संवाद की नींव शामिल है।",
                date: "फ़रवरी 2026"
            },
            ur: {
                title: "Marshall Rosenberg — NVC San Francisco ورکشاپ",
                excerpt: "Marshall Rosenberg کی ایک مکمل غیر تشدد مواصلات ورکشاپ، جس میں ہمدردانہ سننے اور شفقت آمیز مکالمے کی بنیادیں شامل ہیں۔",
                date: "فروری 2026"
            }
        }
    },
    {
        type: "video",
        title: "Vulnerable Honesty — Yoram Mosenzon (TEDx)",
        excerpt: "A powerful TEDx talk by a CNVC-certified trainer on the courage of honest, compassionate self-expression.",
        date: "January 2026",
        videoId: "LSGfqyhleUA",
        i18n: {
            hi: {
                title: "सच्ची ईमानदारी — Yoram Mosenzon (TEDx)",
                excerpt: "CNVC-प्रमाणित प्रशिक्षक द्वारा एक प्रभावशाली TEDx वार्ता — ईमानदार, करुणामय आत्म-अभिव्यक्ति के साहस पर।",
                date: "जनवरी 2026"
            },
            ur: {
                title: "کمزور ایمانداری — Yoram Mosenzon (TEDx)",
                excerpt: "CNVC سے تصدیق شدہ ٹرینر کی ایک طاقتور TEDx گفتگو — ایمانداری اور شفقت سے اپنے آپ کو ظاہر کرنے کی ہمت پر۔",
                date: "جنوری 2026"
            }
        }
    },

    // ---- AUDIO ----

    {
        type: "audio",
        title: "When Distance Creeps In",
        excerpt: "A gentle bilingual reflection (English & Hindi) on the quiet moments when disconnection begins — and the tender awareness that can bring us back to listening.",
        date: "February 2026",
        audioSrc: "public/track_1.mpeg",
        i18n: {
            hi: {
                title: "जब दूरी बढ़ने लगती है",
                excerpt: "एक सौम्य द्विभाषी चिंतन (अंग्रेज़ी और हिंदी) — उन शांत क्षणों पर जब अलगाव शुरू होता है, और वह कोमल जागरूकता जो हमें वापस सुनने की ओर ले जा सकती है।",
                date: "फ़रवरी 2026"
            },
            ur: {
                title: "جب فاصلہ بڑھنے لگتا ہے",
                excerpt: "ایک نرم دو زبانی عکاسی (انگریزی اور ہندی) — ان خاموش لمحات پر جب دوری شروع ہوتی ہے، اور وہ نرم آگاہی جو ہمیں دوبارہ سننے کی طرف لے جا سکتی ہے۔",
                date: "فروری 2026"
            }
        }
    },
    {
        type: "audio",
        title: "Soft Instrumental: Meditation",
        excerpt: "A calming ambient instrumental piece to accompany your reflection, journaling, or quiet moments.",
        date: "January 2026",
        audioSrc: "https://archive.org/download/ambientforfilm/Meditation.mp3",
        i18n: {
            hi: {
                title: "मधुर वाद्य संगीत: ध्यान",
                excerpt: "आपके चिंतन, जर्नलिंग या शांत क्षणों के साथ सुकून देने वाला एक वाद्य संगीत।",
                date: "जनवरी 2026"
            },
            ur: {
                title: "نرم آلاتی موسیقی: مراقبہ",
                excerpt: "آپ کے غور و فکر، جرنلنگ یا پرسکون لمحات کے ساتھ سکون دینے والا ایک آلاتی ٹکڑا۔",
                date: "جنوری 2026"
            }
        }
    },

    // ---- ARTICLES ----

    {
        type: "article",
        title: "What Is Nonviolent Communication?",
        excerpt: "An introduction to Marshall Rosenberg's framework for compassionate dialogue and how it forms the backbone of our practice.",
        date: "December 2025",
        body: [
            "Nonviolent Communication (NVC) is a way of communicating that leads us to giving from the heart. It guides us to reframe how we express ourselves and hear others by focusing our consciousness on four areas: what we are observing, feeling, needing, and what we are requesting to enrich our lives.",
            "At Join the Dots, we use NVC as a foundational tool in our listening circles and compassion courses. The practice helps participants move beyond judgement and connect with the universal human needs underlying every expression.",
            "Whether you are new to NVC or have years of practice, these principles can transform your everyday conversations and deepen your connection with yourself and others."
        ],
        i18n: {
            hi: {
                title: "अहिंसक संवाद (NVC) क्या है?",
                excerpt: "Marshall Rosenberg के करुणामय संवाद ढांचे का परिचय और यह हमारे अभ्यास की रीढ़ कैसे है।",
                date: "दिसंबर 2025",
                body: [
                    "अहिंसक संवाद (NVC) संवाद का एक ऐसा तरीक़ा है जो हमें दिल से देने की ओर ले जाता है। यह हमें अपनी अभिव्यक्ति और दूसरों को सुनने के तरीक़े को चार क्षेत्रों पर केंद्रित करके बदलने का मार्गदर्शन करता है: हम क्या देख रहे हैं, क्या महसूस कर रहे हैं, क्या चाहते हैं, और जीवन को समृद्ध करने के लिए क्या अनुरोध कर रहे हैं।",
                    "Join the Dots में हम NVC को अपने लिसनिंग सर्कल और कम्पैशन कोर्स में एक बुनियादी उपकरण के रूप में इस्तेमाल करते हैं। यह अभ्यास प्रतिभागियों को निर्णय से परे जाकर हर अभिव्यक्ति के पीछे छिपी सार्वभौमिक मानवीय ज़रूरतों से जुड़ने में मदद करता है।",
                    "चाहे आप NVC में नए हों या आपके पास वर्षों का अभ्यास हो, ये सिद्धांत आपकी रोज़मर्रा की बातचीत को बदल सकते हैं और अपने और दूसरों के साथ जुड़ाव को गहरा कर सकते हैं।"
                ]
            },
            ur: {
                title: "غیر تشدد مواصلات (NVC) کیا ہے؟",
                excerpt: "Marshall Rosenberg کے شفقت آمیز مکالمے کے فریم ورک کا تعارف اور یہ ہماری مشق کی بنیاد کیسے ہے۔",
                date: "دسمبر 2025",
                body: [
                    "غیر تشدد مواصلات (NVC) بات چیت کا ایک ایسا طریقہ ہے جو ہمیں دل سے دینے کی طرف لے جاتا ہے۔ یہ ہمیں چار شعبوں پر توجہ مرکوز کرکے اپنے اظہار اور سننے کے طریقے کو نئی شکل دینے کی رہنمائی کرتا ہے: ہم کیا دیکھ رہے ہیں، محسوس کر رہے ہیں، چاہتے ہیں، اور زندگی کو بہتر بنانے کے لیے کیا درخواست کر رہے ہیں۔",
                    "Join the Dots میں ہم NVC کو اپنے لسننگ سرکل اور کمپیشن کورس میں ایک بنیادی آلے کے طور پر استعمال کرتے ہیں۔ یہ مشق شرکاء کو فیصلے سے آگے بڑھ کر ہر اظہار کے پیچھے چھپی عالمگیر انسانی ضروریات سے جوڑنے میں مدد کرتی ہے۔",
                    "چاہے آپ NVC میں نئے ہوں یا آپ کے پاس برسوں کی مشق ہو، یہ اصول آپ کی روزمرہ گفتگو کو بدل سکتے ہیں اور اپنے اور دوسروں سے تعلق کو گہرا کر سکتے ہیں۔"
                ]
            }
        }
    },
    {
        type: "article",
        title: "The Science of Empathy",
        excerpt: "How neuroscience and psychology reveal that empathy is not just a feeling but a skill that can be developed and strengthened.",
        date: "November 2025",
        body: [
            "Research in neuroscience has shown that empathy activates specific brain regions, including the anterior insula and anterior cingulate cortex. These areas light up both when we experience pain and when we observe someone else in pain.",
            "Studies demonstrate that empathy can be cultivated through deliberate practice, much like a muscle. Mindfulness meditation, compassion training, and perspective-taking exercises have all been shown to increase empathic accuracy and response.",
            "Our programs at Join the Dots are designed around these evidence-based principles, helping participants build their empathic capacity in a supportive, structured environment."
        ],
        i18n: {
            hi: {
                title: "सहानुभूति का विज्ञान",
                excerpt: "न्यूरोसाइंस और मनोविज्ञान कैसे बताते हैं कि सहानुभूति सिर्फ़ एक भावना नहीं बल्कि एक कौशल है जिसे विकसित और मज़बूत किया जा सकता है।",
                date: "नवंबर 2025",
                body: [
                    "न्यूरोसाइंस में शोध से पता चला है कि सहानुभूति मस्तिष्क के विशिष्ट क्षेत्रों को सक्रिय करती है। ये क्षेत्र तब भी सक्रिय होते हैं जब हम दर्द अनुभव करते हैं और तब भी जब हम किसी और को दर्द में देखते हैं।",
                    "अध्ययनों से पता चलता है कि सहानुभूति को जानबूझकर अभ्यास से विकसित किया जा सकता है, बिल्कुल एक मांसपेशी की तरह। माइंडफ़ुलनेस मेडिटेशन, करुणा प्रशिक्षण और दृष्टिकोण-ग्रहण अभ्यास सभी सहानुभूतिक सटीकता बढ़ाने में कारगर साबित हुए हैं।",
                    "Join the Dots के कार्यक्रम इन्हीं साक्ष्य-आधारित सिद्धांतों के आसपास डिज़ाइन किए गए हैं, जो प्रतिभागियों को सहायक और संरचित माहौल में अपनी सहानुभूतिक क्षमता बढ़ाने में मदद करते हैं।"
                ]
            },
            ur: {
                title: "ہمدردی کی سائنس",
                excerpt: "نیوروسائنس اور نفسیات کیسے ظاہر کرتی ہیں کہ ہمدردی صرف ایک جذبہ نہیں بلکہ ایک ہنر ہے جسے ترقی دی اور مضبوط کیا جا سکتا ہے۔",
                date: "نومبر 2025",
                body: [
                    "نیوروسائنس میں تحقیق سے ثابت ہوا ہے کہ ہمدردی دماغ کے مخصوص حصوں کو فعال کرتی ہے۔ یہ حصے تب بھی فعال ہوتے ہیں جب ہم خود درد محسوس کرتے ہیں اور تب بھی جب ہم کسی اور کو درد میں دیکھتے ہیں۔",
                    "مطالعات سے ظاہر ہوتا ہے کہ ہمدردی کو جان بوجھ کر مشق سے پروان چڑھایا جا سکتا ہے، بالکل ایک پٹھے کی طرح۔ مراقبہ، شفقت کی تربیت اور نقطہ نظر سمجھنے کی مشقیں سب ہمدردانہ درستگی بڑھانے میں مؤثر ثابت ہوئی ہیں۔",
                    "Join the Dots کے پروگرام انہی ثبوت پر مبنی اصولوں کے گرد ڈیزائن کیے گئے ہیں، جو شرکاء کو معاون اور منظم ماحول میں اپنی ہمدردانہ صلاحیت بڑھانے میں مدد کرتے ہیں۔"
                ]
            }
        }
    },

    // ---- LISTS ----

    {
        type: "list",
        title: "Universal Human Needs",
        excerpt: "A reference list of universal human needs used in Nonviolent Communication practice.",
        items: [
            { category: "Connection", values: "belonging, closeness, intimacy, love, nurturing, support, trust" },
            { category: "Physical Well-being", values: "air, food, rest, shelter, safety, touch, water" },
            { category: "Honesty", values: "authenticity, integrity, self-worth, presence" },
            { category: "Play", values: "joy, humour, fun, rejuvenation" },
            { category: "Peace", values: "ease, harmony, equality, beauty, communion, inspiration" },
            { category: "Autonomy", values: "choice, freedom, independence, space, spontaneity" },
            { category: "Meaning", values: "awareness, celebration, challenge, contribution, creativity, growth, purpose" }
        ],
        i18n: {
            hi: {
                title: "सार्वभौमिक मानवीय ज़रूरतें",
                excerpt: "अहिंसक संवाद अभ्यास में प्रयुक्त सार्वभौमिक मानवीय ज़रूरतों की संदर्भ सूची।",
                items: [
                    { category: "जुड़ाव", values: "अपनापन, निकटता, अंतरंगता, प्रेम, पालन-पोषण, सहयोग, विश्वास" },
                    { category: "शारीरिक कल्याण", values: "हवा, भोजन, आराम, आश्रय, सुरक्षा, स्पर्श, पानी" },
                    { category: "ईमानदारी", values: "प्रामाणिकता, सत्यनिष्ठा, आत्म-मूल्य, उपस्थिति" },
                    { category: "खेल", values: "आनंद, हास्य, मज़ा, पुनर्जीवन" },
                    { category: "शांति", values: "सहजता, सामंजस्य, समानता, सौंदर्य, सह-भागिता, प्रेरणा" },
                    { category: "स्वायत्तता", values: "चुनाव, स्वतंत्रता, आज़ादी, स्थान, सहजता" },
                    { category: "अर्थ", values: "जागरूकता, उत्सव, चुनौती, योगदान, रचनात्मकता, विकास, उद्देश्य" }
                ]
            },
            ur: {
                title: "عالمگیر انسانی ضروریات",
                excerpt: "غیر تشدد مواصلات کی مشق میں استعمال ہونے والی عالمگیر انسانی ضروریات کی حوالہ فہرست۔",
                items: [
                    { category: "تعلق", values: "اپنائیت، قربت، بے تکلفی، محبت، پرورش، مدد، اعتماد" },
                    { category: "جسمانی بہبود", values: "ہوا، خوراک، آرام، پناہ، حفاظت، چھوہ، پانی" },
                    { category: "ایمانداری", values: "اصلیت، دیانتداری، خود اعتمادی، موجودگی" },
                    { category: "کھیل", values: "خوشی، مزاح، تفریح، تازگی" },
                    { category: "سکون", values: "آسانی، ہم آہنگی، برابری، خوبصورتی، اشتراک، الہام" },
                    { category: "خود مختاری", values: "انتخاب، آزادی، خودانحصاری، جگہ، بے ساختگی" },
                    { category: "معنی", values: "آگاہی، جشن، چیلنج، شراکت، تخلیقیت، ترقی، مقصد" }
                ]
            }
        }
    },
    {
        type: "list",
        title: "Feelings Inventory",
        excerpt: "Common feelings when needs are met and unmet — a guide for identifying and naming emotions.",
        items: [
            { category: "When needs are met", values: "grateful, hopeful, inspired, joyful, peaceful, relieved, tender, warm" },
            { category: "When needs are not met", values: "afraid, angry, confused, disconnected, embarrassed, frustrated, hopeless, lonely, sad, uncomfortable" }
        ],
        i18n: {
            hi: {
                title: "भावनाओं की सूची",
                excerpt: "ज़रूरतें पूरी होने और न होने पर सामान्य भावनाएं — भावनाओं को पहचानने और नाम देने की एक मार्गदर्शिका।",
                items: [
                    { category: "जब ज़रूरतें पूरी होती हैं", values: "आभारी, आशावान, प्रेरित, आनंदित, शांत, राहत, कोमल, ऊष्म" },
                    { category: "जब ज़रूरतें पूरी नहीं होतीं", values: "भयभीत, क्रोधित, भ्रमित, विछिन्न, लज्जित, निराश, निराशाजनक, अकेला, दुखी, असहज" }
                ]
            },
            ur: {
                title: "جذبات کی فہرست",
                excerpt: "ضروریات پوری ہونے اور نہ ہونے پر عام جذبات — جذبات کی شناخت اور نام دینے کی رہنمائی۔",
                items: [
                    { category: "جب ضروریات پوری ہوتی ہیں", values: "شکرگزار، پرامید، متاثر، خوش، پرسکون، مطمئن، نرم، گرم" },
                    { category: "جب ضروریات پوری نہیں ہوتیں", values: "خوفزدہ، ناراض، الجھا ہوا، منقطع، شرمندہ، مایوس، نا امید، تنہا، اداس، بے آرام" }
                ]
            }
        }
    },

    // ---- LINKS ----

    {
        type: "link",
        title: "Nonviolent Communication: A Language of Life",
        excerpt: "The foundational book by Marshall B. Rosenberg — essential reading for anyone interested in compassionate communication.",
        url: "https://www.nonviolentcommunication.com/",
        i18n: {
            hi: {
                title: "Nonviolent Communication: A Language of Life",
                excerpt: "Marshall B. Rosenberg की मूलभूत पुस्तक — करुणामय संवाद में रुचि रखने वाले हर व्यक्ति के लिए आवश्यक पठन।"
            },
            ur: {
                title: "Nonviolent Communication: A Language of Life",
                excerpt: "Marshall B. Rosenberg کی بنیادی کتاب — شفقت آمیز رابطے میں دلچسپی رکھنے والے ہر شخص کے لیے ضروری مطالعہ۔"
            }
        }
    },
    {
        type: "link",
        title: "The Center for Nonviolent Communication",
        excerpt: "The global organisation founded by Marshall Rosenberg — trainings, resources, and community.",
        url: "https://www.cnvc.org/",
        i18n: {
            hi: {
                title: "The Center for Nonviolent Communication",
                excerpt: "Marshall Rosenberg द्वारा स्थापित वैश्विक संस्था — प्रशिक्षण, संसाधन और समुदाय।"
            },
            ur: {
                title: "The Center for Nonviolent Communication",
                excerpt: "Marshall Rosenberg کی قائم کردہ عالمی تنظیم — تربیت، وسائل اور کمیونٹی۔"
            }
        }
    }

];
