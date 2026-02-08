import { Share2, Clock, Printer } from "lucide-react";

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string; // HTML string for rich text
  author: string;
  date: string;
  category: "World" | "Human Nonsense" | "Technology" | "Opinion" | "Market" | "Investigation" | "Breaking Mews";
  image?: string;
  imageCaption?: string;
  readTime: string;
  featured?: boolean;
  externalUrl?: string; // Add this field for external links
}

// Images 
import facepalmImg from "@assets/2695AF9A-6BB7-4C8A-BF2C-164E3B4AE948_1768793227695.jpeg";
import nonsenseIndexImg from "@assets/2461FCEE-BFD3-48AA-9F70-05029E5A5BBC_1768793227695.jpeg";
import deadlineImg from "@assets/071C8AA9-7D37-4030-BEE0-80C5542926C4_1768793227695.jpeg";
import conspiracyImg from "@assets/2F548495-6636-4154-9BDC-D07E96C4A229_1768793227695.jpeg";
import boardroomImg from "@assets/55F198BE-5F75-4F01-A9DA-A32286C8814B_1768793227695.jpeg";
import breakingImg from "@assets/C74553BB-7594-4D6F-AA79-AE443CE49153_1768793227695.jpeg";
import anchorsImg from "@assets/69731D7A-6EE1-4C93-A318-4B7F1B48AF28_1768793227695.jpeg";

export const ARTICLES: Article[] = [
  {
    id: "wiggly-lines",
    title: "BREAKING: Humans Paint Wiggly Lines on Road, Somehow Think That’ll Fix Speeding",
    excerpt: "In a stunning display of primate logic, local authorities have deployed 'squiggles' to combat velocity. We sent our best field agents to stare at it.",
    content: "", // Content not needed for external link
    author: "Anchorman Whiskerberg",
    date: "April 4, 2025",
    category: "Human Nonsense",
    image: breakingImg,
    imageCaption: "An artist's rendition of the chaos. Or just Tuesday.",
    readTime: "3 min read",
    featured: true,
    externalUrl: "https://medium.com/@thegoodmeow/breaking-humans-paint-wiggly-lines-on-road-somehow-think-thatll-fix-speeding-94ece1aace3b"
  },
  {
    id: "exclusive-takeover",
    title: "THE GOOD MEOW EXCLUSIVE: We Have Seized The Broadcast",
    excerpt: "The previous administration (The GOOD Now) has been relieved of duty due to gross incompetence and a lack of tuna.",
    content: "",
    author: "The Editorial Board",
    date: "March 26, 2025",
    category: "Breaking Mews",
    image: anchorsImg,
    imageCaption: "The new management team settling in.",
    readTime: "5 min read",
    featured: true,
    externalUrl: "https://medium.com/@thegoodmeow/the-good-meow-exclusive-8cedb2427321"
  },
  {
    id: "croissant-crisis",
    title: "In Today’s Crumb of a Crisis: Humans Can’t Say Croissant",
    excerpt: "They struggle with the 'R'. It sounds like they are choking on a hairball, but without the dignity.",
    content: "",
    author: "Culture Desk",
    date: "March 21, 2025",
    category: "Human Nonsense",
    image: facepalmImg,
    imageCaption: "The collective shame is palpable.",
    readTime: "4 min read",
    externalUrl: "https://medium.com/@thegoodmeow/in-todays-crumb-of-a-crisis-humans-can-t-say-croissant-3e4defdaf8e4"
  },
  {
    id: "philly-birds",
    title: "Humans Win Big, Wreck Bigger: A Cat’s Eye View of Philly’s Feathered Frenzy",
    excerpt: "The humans in green shirts are climbing poles again. Is this a mating ritual? A war dance? We are confused and slightly afraid.",
    content: "",
    author: "Field Agent Mittens",
    date: "Feb 20, 2025",
    category: "Investigation",
    image: nonsenseIndexImg,
    imageCaption: "Charting the correlation between touchdowns and property damage.",
    readTime: "6 min read",
    externalUrl: "https://medium.com/@thegoodmeow/humans-win-big-wreck-bigger-a-cats-eye-view-of-philly-s-feathered-frenzy-3616353f8a53"
  },
  {
    id: "ocean-heist",
    title: "The Great Water Heist: Humans Have Decided They Can Rename the Ocean",
    excerpt: "Apparently, the big wet part of the world needed a rebrand. The fish were not consulted.",
    content: "",
    author: "Science Editor",
    date: "Feb 18, 2025",
    category: "World",
    image: boardroomImg,
    imageCaption: "The board discusses the liquidity of the situation.",
    readTime: "4 min read",
    externalUrl: "https://medium.com/@thegoodmeow/the-great-water-heist-humans-have-decided-they-can-rename-the-ocean-7387913ed75f"
  },
  {
    id: "valentines-desperation",
    title: "Valentine’s Day: Proof That Humans Are Desperate for Love and Validation",
    excerpt: "They exchange dead plants and brown sludge. They look sad. We offered them a dead mouse; they screamed. Ungrateful.",
    content: "",
    author: "Relationship Guru Fluffy",
    date: "Feb 14, 2025",
    category: "Human Nonsense",
    image: conspiracyImg,
    imageCaption: "Trying to connect the dots of human romance.",
    readTime: "5 min read",
    externalUrl: "https://medium.com/@thegoodmeow/valentines-day-proof-that-humans-are-desperate-for-love-and-validation-7159d843c928"
  },
  {
    id: "bird-died",
    title: "In Other Stupid Human News, A Bird Died. We Are Not Mourning.",
    excerpt: "A famous bird has ceased function. The humans are weeping. We are checking if it is still edible.",
    content: "",
    author: "Obituary Desk",
    date: "Feb 14, 2025",
    category: "World",
    image: deadlineImg,
    imageCaption: "The news cycle never sleeps, unlike us (18 hours a day).",
    readTime: "2 min read",
    externalUrl: "https://medium.com/@thegoodmeow/in-other-stupid-human-news-a-bird-died-we-are-not-mourning-c6dca45d38a0"
  },
  {
    id: "sponsored-gear",
    title: "REVIEW: We Tested 'Cool Cat Stuff' So You Don't Have To (But You Should)",
    excerpt: "Finally, equipment worthy of our species. We review the latest in tactical lounging technology.",
    content: `
      <p class="drop-cap">For years, we have suffered indignity. Cardboard boxes that collapse. Scratching posts that tip over when subjected to real rage. The humans buy us garbage from the big store with the blue smiley face.</p>
      <p>But there is hope. We have intercepted a shipment from <a href="https://coolcatstuff.com" target="_blank" class="font-bold underline decoration-accent decoration-2">CoolCatStuff.com</a>.</p>
      <h3>The Findings</h3>
      <p>The items appear to be designed by individuals who actually understand feline physics. The beds are sufficiently cup-shaped to maximize heat retention. The toys mimic the erratic movement of prey, not just a pendulum of boredom.</p>
      <p><strong>Verdict:</strong> 5/5 Paws. We have decided not to push these items off the shelf. That is the highest honor we can bestow.</p>
    `,
    author: "Gear Review Unit",
    date: "April 5, 2025",
    category: "Market",
    readTime: "4 min read",
    featured: false,
    // No external URL for this one, it's internal
  }
];
