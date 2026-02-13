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
// ============================================================

window.RESOURCES_DATA = [

    // ---- VIDEOS ----

    {
        type: "video",
        title: "Marshall Rosenberg — NVC San Francisco Workshop",
        excerpt: "A full Nonviolent Communication workshop by Marshall Rosenberg, covering the foundations of empathic listening and compassionate dialogue.",
        date: "February 2026",
        videoId: "l7TONauJGfc"
    },
    {
        type: "video",
        title: "Vulnerable Honesty — Yoram Mosenzon (TEDx)",
        excerpt: "A powerful TEDx talk by a CNVC-certified trainer on the courage of honest, compassionate self-expression.",
        date: "January 2026",
        videoId: "LSGfqyhleUA"
    },

    // ---- AUDIO ----

    {
        type: "audio",
        title: "When Distance Creeps In",
        excerpt: "A gentle bilingual reflection (English & Hindi) on the quiet moments when disconnection begins — and the tender awareness that can bring us back to listening.",
        date: "February 2026",
        audioSrc: "public/track_1.mpeg"
    },
    {
        type: "audio",
        title: "Soft Instrumental: Meditation",
        excerpt: "A calming ambient instrumental piece to accompany your reflection, journaling, or quiet moments.",
        date: "January 2026",
        audioSrc: "https://archive.org/download/ambientforfilm/Meditation.mp3"
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
        ]
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
        ]
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
        ]
    },
    {
        type: "list",
        title: "Feelings Inventory",
        excerpt: "Common feelings when needs are met and unmet — a guide for identifying and naming emotions.",
        items: [
            { category: "When needs are met", values: "grateful, hopeful, inspired, joyful, peaceful, relieved, tender, warm" },
            { category: "When needs are not met", values: "afraid, angry, confused, disconnected, embarrassed, frustrated, hopeless, lonely, sad, uncomfortable" }
        ]
    },

    // ---- LINKS ----

    {
        type: "link",
        title: "Nonviolent Communication: A Language of Life",
        excerpt: "The foundational book by Marshall B. Rosenberg — essential reading for anyone interested in compassionate communication.",
        url: "https://www.nonviolentcommunication.com/"
    },
    {
        type: "link",
        title: "The Center for Nonviolent Communication",
        excerpt: "The global organisation founded by Marshall Rosenberg — trainings, resources, and community.",
        url: "https://www.cnvc.org/"
    }

];
