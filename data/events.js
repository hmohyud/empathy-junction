// ============================================================
//  SCHEDULE / EVENTS — CONTENT FILE
//
//  This file controls the events shown on the homepage
//  (the Schedule section). You don't need to know how to
//  code — just copy the template below, paste it in the
//  right section, and change the text inside the "quotes".
//
//
//  THERE ARE TWO SECTIONS:
//  ───────────────────────
//    "upcoming"   — Events with a specific date and time.
//                   These appear as the main event cards.
//
//    "persistent" — Ongoing programs with no specific date
//                   (e.g. Compassion Course, Monthly Pass).
//                   These appear as smaller highlight cards.
//
//
//  HOW TO ADD A NEW UPCOMING EVENT:
//  ────────────────────────────────
//    1. Find the "upcoming" section below
//    2. Copy an existing event block (everything from { to },)
//    3. Paste it where you want it to appear in the list
//    4. Change the text between the "quotes"
//    5. Save the file and refresh the website
//
//
//  COPY-PASTE TEMPLATE — UPCOMING EVENT:
//
//        {
//            "title": "Name of the Event",
//            "subtitle": "A short label like 'Monthly Gathering'",
//            "date": "2026-03-15",
//            "time": "10:00 AM – 12:00 PM IST",
//            "description": "A sentence or two about what this event is.",
//            "tag": "Free"
//        },
//
//  WHAT EACH LINE MEANS:
//    title       — The event name
//    subtitle    — A short label shown below the title
//    date        — The date in YYYY-MM-DD format (e.g. "2026-03-15"
//                  for 15 March 2026). This MUST use this format.
//    time        — The time shown to attendees (any text you like)
//    description — A short description of the event
//    tag         — The label on the card (e.g. "Free", "₹600")
//
//
//  COPY-PASTE TEMPLATE — PERSISTENT PROGRAM:
//
//        {
//            "title": "Name of the Program",
//            "subtitle": "A short label",
//            "description": "A sentence about this program.",
//            "link": "#pricing",
//            "tag": "Ongoing"
//        },
//
//
//  IMPORTANT — COMMON MISTAKES TO AVOID:
//  ──────────────────────────────────────
//    - Every piece of text MUST be wrapped in "quotes"
//    - Every block MUST end with },  (closing brace + comma)
//    - Dates MUST be in YYYY-MM-DD format (e.g. "2026-03-15")
//    - Don't delete the lines that say "upcoming" or "persistent"
//
//
//  TRANSLATIONS (OPTIONAL):
//  ─────────────────────────
//  You can add Hindi or Urdu versions of the title, subtitle,
//  description, time, and tag. If you don't add translations,
//  the English text will be shown regardless of which language
//  the visitor picks.
//
//  To add translations, add an "i18n" section to any event:
//
//        {
//            "title": "Listening Circle",
//            "subtitle": "Monthly Community Gathering",
//            "date": "2026-03-15",
//            "time": "10:00 AM – 12:00 PM IST",
//            "description": "An open, gentle space for deep listening.",
//            "tag": "Free",
//            "i18n": {
//                "hi": {
//                    "title": "लिसनिंग सर्कल",
//                    "subtitle": "मासिक सामुदायिक मिलन",
//                    "description": "गहरी सुनवाई के लिए एक खुला, सौम्य स्थान।",
//                    "tag": "मुफ्त"
//                },
//                "ur": {
//                    "title": "لسننگ سرکل",
//                    "description": "گہری سننے کے لیے ایک کھلی جگہ۔"
//                }
//            }
//        },
//
//  You can translate just one language (e.g. only "hi") — you
//  don't have to do both. Fields you don't translate will stay
//  in English.
//
// ============================================================
window.EVENTS_DATA = {
    "upcoming": [
        // {
        //     "title": "Listening Circle",
        //     "subtitle": "Monthly Community Gathering",
        //     "date": "2026-02-15",
        //     "time": "10:00 AM – 12:00 PM IST",
        //     "description": "An open, gentle space where we practise deep listening — no advice, no fixing, just presence.",
        //     "tag": "Free"
        // },
        // {
        //     "title": "Join the Dots Workshop",
        //     "subtitle": "Thematic Exploration: Boundaries",
        //     "date": "2026-02-22",
        //     "time": "10:00 AM – 12:00 PM IST",
        //     "description": "This month we explore boundaries — learning to say yes and no from a place of self-connection.",
        //     "tag": "₹600"
        // },
        // {
        //     "title": "Empathy Café",
        //     "subtitle": "Guided Practice Session",
        //     "date": "2026-03-01",
        //     "time": "5:00 PM – 7:00 PM IST",
        //     "description": "Practise empathic listening in pairs and small groups, with gentle facilitation and real-life scenarios.",
        //     "tag": "₹600"
        // }
    ],
    "persistent": [
        {
            "title": "The Compassion Course",
            "subtitle": "52 Weeks with Thom Bond",
            "description": "A year-long transformational journey into compassionate communication. 50% off for Monthly Pass holders.",
            "link": "#compassion",
            "tag": "Ongoing"
        },
        {
            "title": "Monthly Pass",
            "subtitle": "Best Value for Regulars",
            "description": "All 6 weekend sessions, community circles, and full month access for just ₹1,200.",
            "link": "#pricing",
            "tag": "Save ₹600"
        }
    ]
};
