// ============================================================
//  BLOG PAGE — CONTENT FILE
//
//  This file controls what appears on the Blog page.
//  You don't need to know how to code — just copy the
//  template below, paste it at the top of the list,
//  and change the text inside the "quotes".
//
//
//  HOW TO ADD A NEW BLOG POST:
//  ───────────────────────────
//    1. Copy everything between the --- lines below
//    2. Paste it RIGHT BELOW the line that says
//       window.BLOG_DATA = [
//       (new posts always go at the TOP so they appear first)
//    3. Change the text between the "quotes" to your own content
//    4. Save the file and refresh the website to see your post
//
//
//  COPY-PASTE TEMPLATE:
//  ────────────────────
//  --- copy from here ---
//
//    {
//        date: "14 February 2026",
//        author: "Your Name",
//        role: "Trainer",
//        title: "Title of Your Blog Post",
//        body: [
//            "First paragraph goes here.",
//            "Second paragraph goes here.",
//            "Add as many paragraphs as you like — one per line."
//        ]
//    },
//
//  --- copy to here ---
//
//
//  WHAT EACH LINE MEANS:
//  ─────────────────────
//    date   — The date shown on the post (e.g. "14 February 2026")
//    author — The writer's name (e.g. "Join the Dots Team")
//    role   — Shows as a small label next to the name.
//             Use "Trainer" or "Participant" (or any role you like)
//    title  — The headline of the blog post
//    body   — The paragraphs of the post. Each paragraph is on
//             its own line, wrapped in "quotes", separated by commas.
//
//
//  IMPORTANT — COMMON MISTAKES TO AVOID:
//  ──────────────────────────────────────
//    - Every piece of text MUST be wrapped in "quotes"
//    - Every post block MUST end with },  (closing brace + comma)
//    - Each paragraph inside body must be in "quotes" with a
//      comma after it (except the very last one)
//
//
//  TRANSLATIONS (OPTIONAL):
//  ─────────────────────────
//  You can add Hindi or Urdu versions of the title and body.
//  If you don't add translations, the English text will be shown
//  regardless of which language the visitor picks.
//
//  To add translations, add an "i18n" section to any post:
//
//    {
//        date: "14 February 2026",
//        author: "Your Name",
//        role: "Trainer",
//        title: "English Title Here",
//        body: [
//            "English paragraph one.",
//            "English paragraph two."
//        ],
//        i18n: {
//            hi: {
//                title: "हिंदी शीर्षक",
//                body: ["पहला पैराग्राफ।", "दूसरा पैराग्राफ।"]
//            },
//            ur: {
//                title: "اردو عنوان",
//                body: ["پہلا پیراگراف۔", "دوسرا پیراگراف۔"]
//            }
//        }
//    },
//
//  You can translate just one language (e.g. only "hi") — you
//  don't have to do both. Fields you don't translate will stay
//  in English.
//
// ============================================================

window.BLOG_DATA = [

    {
        date: "13 February 2026",
        author: "Join the Dots Team",
        role: "Trainer",
        title: "Welcome to Our Blog",
        body: [
            "We are excited to launch the Join the Dots blog — a space for reflections, stories, and insights from our community. Here, we will share our experiences with empathic listening, compassionate communication, and the quiet transformations that happen when people truly feel heard.",
            "This blog is for everyone — whether you have been practising NVC for years or are just beginning to explore what it means to listen with your whole heart. We invite you to read, reflect, and share your own thoughts with us.",
            "Stay tuned for articles from our facilitators, community members, and guest writers. Together, we are joining the dots between understanding and connection."
        ],
        i18n: {
            hi: {
                date: "13 फ़रवरी 2026",
                author: "Join the Dots टीम",
                role: "प्रशिक्षक",
                title: "हमारे ब्लॉग में आपका स्वागत है",
                body: [
                    "हमें Join the Dots ब्लॉग शुरू करते हुए खुशी हो रही है — हमारे समुदाय से चिंतन, कहानियों और अंतर्दृष्टि का एक स्थान। यहां हम सहानुभूतिपूर्ण सुनने, करुणामय संवाद और उन शांत परिवर्तनों के अनुभव साझा करेंगे जो तब होते हैं जब लोग सचमुच सुने जाते हैं।",
                    "यह ब्लॉग सभी के लिए है — चाहे आप वर्षों से NVC का अभ्यास कर रहे हों या अभी शुरुआत कर रहे हों। हम आपको पढ़ने, चिंतन करने और अपने विचार हमारे साथ साझा करने का निमंत्रण देते हैं।",
                    "हमारे सूत्रधारों, समुदाय के सदस्यों और अतिथि लेखकों के लेखों के लिए जुड़े रहें। साथ मिलकर हम समझ और जुड़ाव के बीच के बिंदुओं को जोड़ रहे हैं।"
                ]
            },
            ur: {
                date: "13 فروری 2026",
                author: "Join the Dots ٹیم",
                role: "ٹرینر",
                title: "ہمارے بلاگ میں خوش آمدید",
                body: [
                    "ہمیں Join the Dots بلاگ شروع کرتے ہوئے خوشی ہو رہی ہے — ہماری کمیونٹی سے عکاسی، کہانیاں اور بصیرت کی ایک جگہ۔ یہاں ہم ہمدردانہ سننے، شفقت آمیز رابطے اور ان خاموش تبدیلیوں کے تجربات بانٹیں گے جو تب ہوتی ہیں جب لوگ واقعی سنے جاتے ہیں۔",
                    "یہ بلاگ سب کے لیے ہے — چاہے آپ برسوں سے NVC کی مشق کر رہے ہوں یا ابھی شروعات کر رہے ہوں۔ ہم آپ کو پڑھنے، غور کرنے اور اپنے خیالات ہمارے ساتھ بانٹنے کی دعوت دیتے ہیں۔",
                    "ہمارے سہولت کاروں، کمیونٹی کے اراکین اور مہمان لکھاریوں کے مضامین کے لیے جڑے رہیں۔ مل کر ہم سمجھ اور تعلق کے نقطوں کو جوڑ رہے ہیں۔"
                ]
            }
        }
    },

    {
        date: "10 February 2026",
        author: "Join the Dots Team",
        role: "Trainer",
        title: "Why Listening Is the First Step",
        body: [
            "In our fast-paced world, truly listening to another person has become a rare gift. We often listen to respond rather than to understand. At Join the Dots, we believe that deep listening is the foundation of all meaningful connection.",
            "When someone feels genuinely heard — without judgement, advice, or interruption — something shifts. Defences soften. Trust builds. And the door opens for authentic dialogue.",
            "Our Listening Circles create this space every month, and we have seen firsthand how powerful it can be. If you have never experienced empathic listening, we invite you to join us for a free session and discover what becomes possible when you simply listen."
        ],
        i18n: {
            hi: {
                date: "10 फ़रवरी 2026",
                author: "Join the Dots टीम",
                role: "प्रशिक्षक",
                title: "सुनना पहला कदम क्यों है",
                body: [
                    "हमारी तेज़-रफ़्तार दुनिया में किसी दूसरे व्यक्ति को सचमुच सुनना एक दुर्लभ उपहार बन गया है। हम अक्सर समझने के लिए नहीं, बल्कि जवाब देने के लिए सुनते हैं। Join the Dots में हम मानते हैं कि गहरी सुनवाई सभी सार्थक जुड़ाव की नींव है।",
                    "जब कोई सचमुच सुना महसूस करता है — बिना किसी निर्णय, सलाह या बीच में टोकने के — तो कुछ बदलता है। रक्षात्मकता नरम पड़ती है। विश्वास बनता है। और प्रामाणिक संवाद का दरवाज़ा खुलता है।",
                    "हमारे लिसनिंग सर्कल हर महीने यही जगह बनाते हैं, और हमने स्वयं देखा है कि यह कितना शक्तिशाली हो सकता है। अगर आपने कभी सहानुभूतिपूर्ण सुनवाई का अनुभव नहीं किया है, तो हम आपको एक मुफ़्त सत्र में शामिल होने का निमंत्रण देते हैं।"
                ]
            },
            ur: {
                date: "10 فروری 2026",
                author: "Join the Dots ٹیم",
                role: "ٹرینر",
                title: "سننا پہلا قدم کیوں ہے",
                body: [
                    "ہماری تیز رفتار دنیا میں کسی دوسرے شخص کو واقعی سننا ایک نادر تحفہ بن گیا ہے۔ ہم اکثر سمجھنے کے لیے نہیں بلکہ جواب دینے کے لیے سنتے ہیں۔ Join the Dots میں ہم مانتے ہیں کہ گہرا سننا تمام بامعنی تعلقات کی بنیاد ہے۔",
                    "جب کوئی واقعی سنا محسوس کرتا ہے — بغیر کسی فیصلے، مشورے یا مداخلت کے — تو کچھ بدلتا ہے۔ دفاعیت نرم پڑتی ہے۔ اعتماد بنتا ہے۔ اور حقیقی مکالمے کا دروازہ کھلتا ہے۔",
                    "ہمارے لسننگ سرکل ہر مہینے یہی جگہ بناتے ہیں، اور ہم نے خود دیکھا ہے کہ یہ کتنا طاقتور ہو سکتا ہے۔ اگر آپ نے کبھی ہمدردانہ سننے کا تجربہ نہیں کیا، تو ہم آپ کو ایک مفت سیشن میں شامل ہونے کی دعوت دیتے ہیں۔"
                ]
            }
        }
    }

];
