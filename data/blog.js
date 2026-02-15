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
        ]
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
        ]
    }

];
