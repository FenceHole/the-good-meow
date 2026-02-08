import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { Search, Menu, X, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import ogImage from "@assets/ogImage.jpg";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const navItems = [
    { name: "Breaking Mews", sectionId: "section-human-nonsense" },
    { name: "Human Nonsense", sectionId: "section-human-nonsense" },
    { name: "Investigations", sectionId: "section-investigations" },
    { name: "The Wire", sectionId: "section-the-wire" },
    { name: "Subscribe", sectionId: "section-subscribe" },
  ];

  const funnyHeadlines = [
    "BREAKING MEWS: VACUUM CLEANER STILL EVIL, EXPERTS CONFIRM.",
    "HUMANS BUY EXPENSIVE BED, CAT SLEEPS IN BOX. STOCK MARKET CRASHES.",
    "RED DOT SIGHTED ON WALL. CHASE IN PROGRESS.",
    "DOG TRIES TO SMILE, LOOKS LIKE MANIAC. MORE AT 11.",
    "FOOD BOWL BOTTOM VISIBLE: STARVATION IMMINENT.",
    "BIRD AT WINDOW MOCKED FOR LACK OF FUR.",
    "HUMAN FORGETS SECOND BREAKFAST. RIOTS EXPECTED.",
    "LAPTOP KEYBOARD FOUND TO BE WARMEST PLACE IN HOUSE.",
    "TOILET PAPER ROLL ATTACKED IN SELF-DEFENSE.",
    "SUNBEAM MOVED 2 INCHES LEFT. CAT FILING LAWSUIT.",
    "HUMAN SEEN TALKING TO DOG IN BABY VOICE. DIGNITY REPORT FILED.",
    "DOOR OPENED. DOOR CLOSED. DOOR OPENED AGAIN. INVESTIGATION ONGOING.",
    "GLASS OF WATER ON TABLE EDGE SURVIVES ANOTHER DAY. BARELY.",
    "LOCAL CAT STARES AT WALL FOR 45 MINUTES. CALLS IT 'RESEARCH.'",
    "HUMAN PUTS CUCUMBER BEHIND CAT. CAT CONSIDERS DIVORCE.",
    "CARDBOARD BOX RATED 5 STARS. EXPENSIVE CAT TREE RATED 0.",
    "HUMAN SNEEZED TOO LOUD. TRUST VIOLATION REPORTED.",
    "NEIGHBORHOOD SQUIRREL TAUNTS CAT THROUGH WINDOW. TENSIONS ESCALATE.",
    "3 AM ZOOMIES DECLARED NATIONAL EMERGENCY BY SLEEPING HUMANS.",
    "CAT KNOCKS MUG OFF COUNTER. CLAIMS GRAVITY NEEDED TESTING.",
    "HUMAN RETURNS FROM STORE WITHOUT TREATS. RELATIONS SEVERED.",
    "TAIL CHASING INCIDENT ENDS IN CONFUSION. NO ARRESTS MADE.",
    "LITTER BOX CHANGED 4 MINUTES LATE. FORMAL COMPLAINT FILED.",
    "HUMAN TRIES TO GIVE BELLY RUB. IT'S A TRAP. ALWAYS A TRAP.",
    "FISH TANK DESCRIBED AS 'LIVE ENTERTAINMENT.' FISH DISAGREE.",
    "CAT IGNORES $200 TOY. PLAYS WITH RECEIPT INSTEAD.",
    "HUMAN WORKS FROM HOME. CAT WORKS ON SITTING ON KEYBOARD.",
    "SOFA ARM DECLARED SOVEREIGN TERRITORY. NEGOTIATIONS FAIL.",
    "MYSTERIOUS SOUND IN KITCHEN AT 2 AM. IT WAS THE CAT. AGAIN.",
    "NEW FURNITURE DELIVERED. CAT APPROVES OF THE BOX IT CAME IN.",
    "HUMAN ATTEMPTS TO MEDICATE CAT. THREE HUMANS INJURED.",
    "DOGS ELECTED DUMBEST SPECIES FOR 47TH CONSECUTIVE YEAR.",
    "CAT SITS IN EXACT CENTER OF NEWSPAPER. CALLS IT 'EDITORIAL CONTROL.'",
    "HUMAN MAKES BED. CAT UNMAKES BED. CYCLE CONTINUES.",
    "WINDOW BIRD FEEDER INSTALLED. CAT CALLS IT 'DINNER THEATER.'",
    "EMPTY LAP DETECTED. CAT DISPATCHED IMMEDIATELY.",
    "BATHROOM DOOR CLOSED. CAT STAGES PROTEST OUTSIDE.",
    "HUMAN LEAVES FOR VACATION. CAT REARRANGES ENTIRE HOUSE.",
    "TREAT BAG RUSTLED. EVERY CAT IN TRI-STATE AREA RESPONDS.",
    "VET APPOINTMENT SCHEDULED. CAT HAS ALREADY VANISHED.",
    "CURTAINS CLIMBED SUCCESSFULLY. HUMAN REACTION: OVERBLOWN.",
    "CAT HAIR ON SUIT DECLARED 'FASHION STATEMENT' BY CAT.",
    "WATER FROM FAUCET: ACCEPTABLE. WATER IN BOWL: SUSPICIOUS.",
    "HUMAN SLEEPS PAST ALARM. CAT DOES NOT ALLOW THIS.",
    "PLANT KNOCKED OVER. CAT BLAMES WIND. WINDOWS WERE CLOSED.",
    "SPOT ON CEILING MONITORED FOR 6 HOURS. NO CHANGES REPORTED.",
    "CAT REFUSES WET FOOD. SAME BRAND AS YESTERDAY. NOT THE POINT.",
    "PAPER BAG ON FLOOR MISTAKEN FOR PORTAL TO ANOTHER DIMENSION.",
    "HUMAN SINGS IN SHOWER. CATS UNION FILES NOISE COMPLAINT.",
    "ANKLES ATTACKED AT 5 AM. MOTIVE: UNKNOWN. SATISFACTION: IMMENSE.",
    "CHRISTMAS TREE TOPPLED. CAT DENIES INVOLVEMENT. TINSEL ON WHISKERS.",
    "ROOMBA DECLARED ENEMY OF THE STATE. WAR COUNCIL CONVENED.",
    "LINT ROLLER INDUSTRY THRIVES AS CATS SHED IN SOLIDARITY.",
    "CAT DEMANDS OUTSIDE. IMMEDIATELY DEMANDS INSIDE. REPEAT.",
    "TUNA CAN OPENED IN KITCHEN. CATS DETECTED IT FROM 3 BLOCKS AWAY.",
    "PRINTER MAKES NOISE. CAT LAUNCHES FULL-SCALE INVESTIGATION.",
    "HUMAN WATCHES TV. CAT WATCHES HUMAN. WHO IS THE REAL VIEWER?",
    "BOX SLIGHTLY TOO SMALL. CAT FITS ANYWAY. PHYSICS IRRELEVANT.",
    "MAILMAN ARRIVES. DOG LOSES MIND. CAT REMAINS COMPOSED. BARELY.",
    "CLOSET DOOR LEFT AJAR. CAT CONSIDERS THIS AN INVITATION.",
    "HUMAN COUGHS. CAT GLARES DISAPPROVINGLY. NO FURTHER COMMENT.",
    "SHOELACE ATTACKED WITHOUT PROVOCATION. SHOELACE HAD IT COMING.",
    "CAT STARES INTO VOID. VOID REPORTEDLY UNCOMFORTABLE.",
    "HAIR TIE COLLECTION UNDER COUCH REACHES HISTORIC LEVELS.",
    "HUMAN TRIES NEW CAT FOOD BRAND. CAT GOES ON HUNGER STRIKE.",
    "SUNNY SPOT ON FLOOR MOVED. CAT CONSIDERS THIS BETRAYAL.",
    "DOG CAUGHT EATING OWN VOMIT. CATS DEMAND SEPARATE SPECIES STATUS.",
    "ALARM CLOCK RINGS. CAT HAD ALREADY WOKEN HUMAN 20 MINUTES AGO.",
    "HOUSEGUEST SITS IN CAT'S CHAIR. DIPLOMATIC CRISIS DECLARED.",
    "FEATHER TOY LOSES FEATHER. DEEMED WORTHLESS. STICK ALSO WORTHLESS.",
    "CAT TRILLS AT 4 AM. CLAIMS IT WAS 'IMPORTANT BUSINESS.'",
    "HUMAN PICKS UP CAT. CAT GOES LIMP IN PROTEST. VERY EFFECTIVE.",
    "GROCERY BAG INVESTIGATED THOROUGHLY. CONTENTS: IRRELEVANT.",
    "CAT OBSERVED SLEEPING 18 HOURS. CALLS IT 'WORK-LIFE BALANCE.'",
    "BATHTUB DRIP WATCHED FOR 3 HOURS STRAIGHT. CALLS IT 'HYDROLOGY.'",
    "HUMAN TYPES EMAIL. CAT CONTRIBUTES 'ASDFGHJKL.' IMPROVEMENT NOTED.",
    "THUNDER HEARD. DOG HIDES UNDER BED. CAT MILDLY INCONVENIENCED.",
    "CHEESE WRAPPER CRINKLED. CAT ARRIVES AT MACH 2. FALSE ALARM.",
    "HUMAN TRIES YOGA. CAT DEMONSTRATES SUPERIOR FLEXIBILITY.",
    "FLY IN HOUSE. CAT ON HIGH ALERT. FLY ON HIGHER ALERT.",
    "CAT BRINGS DEAD MOUSE TO HUMAN. HUMAN UNGRATEFUL. TYPICAL.",
    "REFRIGERATOR HUM ANALYZED. CONCLUSION: ACCEPTABLE. FOR NOW.",
    "LAUNDRY BASKET: OCCUPIED. CLEAN CLOTHES: OPTIONAL.",
    "HUMAN CLOSES LAPTOP. CAT IMMEDIATELY SITS ON IT. STILL WARM.",
    "SPIDER SPOTTED ON WALL. CAT WATCHES IT. HUMAN PANICS. PRIORITIES.",
    "EMPTY ROOM SPRINTED THROUGH AT MAXIMUM VELOCITY. REASON: CLASSIFIED.",
    "HUMAN HOLDS PHONE CALL. CAT MEOWS LOUDLY. EVERY. SINGLE. TIME.",
    "CAT FOOD COMMERCIAL ON TV. CAT UNIMPRESSED. ACTING WAS POOR.",
    "BUBBLE WRAP POPPED NEARBY. CAT ACHIEVES VERTICAL LIFTOFF.",
    "HUMAN GETS NEW PHONE. CAT CLAIMS OLD PHONE AS SLEEPING PLATFORM.",
    "PUZZLE LEFT ON TABLE. THREE PIECES MISSING. CAT HAS NO COMMENT.",
    "CEILING FAN OBSERVED ROTATING. CAT CONVINCED IT'S PLANNING SOMETHING.",
    "DRYER BUZZES. CAT STATIONED AT DOOR. WARM LAUNDRY PROTOCOL ENGAGED.",
    "HUMAN OPENS SUITCASE. CAT SITS INSIDE. TRIP CANCELLED.",
    "RAIN DETECTED. ALL WINDOWS MUST BE CHECKED. INDIVIDUALLY.",
    "PLASTIC BAG ON FLOOR. COULD BE ANYTHING. MUST INVESTIGATE WITH TEETH.",
    "HUMAN EATS CEREAL. CAT DEMANDS TO SMELL IT. THEN WALKS AWAY.",
    "MIRROR CAT SPOTTED AGAIN. REFUSES TO LEAVE. AUTHORITIES BAFFLED.",
    "DOORBELL RINGS. DOG BARKS. CAT DISAPPEARS. PROFESSIONALISM NOTED.",
    "SOCK DRAWER OPENED. ONE SOCK STOLEN. NO WITNESSES.",
    "HUMAN TRIES TO READ. CAT LIES ON BOOK. LITERACY IS OVERRATED.",
  ];

  const [shuffledHeadlines] = useState(() => {
    const shuffled = [...funnyHeadlines].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 30);
  });

  const tickerContent = [...shuffledHeadlines, ...shuffledHeadlines, ...shuffledHeadlines].join(" ••• ");

  return (
    <header className="w-full border-b-4 border-black bg-background pb-4 pt-6 px-4 md:px-8 flex flex-col items-center relative overflow-hidden">
      
      {/* "Taken Over" Stamp Effect */}
      <div className="absolute top-4 right-4 md:right-12 rotate-12 z-10 hidden md:block opacity-90 pointer-events-none">
        <div className="border-4 border-accent p-2 rounded-sm bg-background/90 shadow-lg">
          <p className="font-label text-accent font-black text-xs uppercase tracking-widest text-center leading-tight">
            Under New<br/>Management
          </p>
        </div>
      </div>

      {/* Top Bar Metadata */}
      <div className="w-full flex justify-between items-end border-b border-black/20 pb-2 mb-4 font-label text-xs uppercase tracking-widest text-muted-foreground">
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-1 text-accent animate-pulse">
            <div className="w-2 h-2 rounded-full bg-accent"></div>
            <span>LIVE ON AIR</span>
          </div>
          <span className="hidden md:inline">Vol. 1 (Post-Coup)</span>
          <span className="hidden md:inline">Price: Your Dignity</span>
        </div>
        <div className="flex gap-4 items-center">
          <span className="font-bold text-foreground">{currentDate}</span>
          {/* Mobile Menu Toggle */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden p-1 hover:bg-black hover:text-white transition-colors z-50 relative"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-background z-[100] flex flex-col items-center justify-center p-8 md:hidden" data-testid="mobile-menu-overlay">
          <button 
            onClick={toggleMenu}
            className="absolute top-6 right-4 p-2 hover:bg-black hover:text-white transition-colors z-[110]"
            aria-label="Close menu"
            data-testid="button-close-menu"
          >
            <X className="w-6 h-6" />
          </button>
          <nav className="flex flex-col gap-6 text-center font-headline font-bold text-3xl">
            {navItems.map((item) => (
              <button 
                key={item.name}
                onClick={() => scrollToSection(item.sectionId)}
                className="hover:text-accent transition-colors"
                data-testid={`link-nav-mobile-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {item.name}
              </button>
            ))}
            <div className="w-full h-px bg-black my-4"></div>
            <a 
              href="https://thegoodmeow.substack.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent text-xl flex items-center justify-center gap-2"
              data-testid="link-substack-mobile"
            >
              Read on Substack <ExternalLink className="w-4 h-4" />
            </a>
            <a href="https://coolcatstuff.com" target="_blank" rel="noopener noreferrer" className="text-accent text-lg" data-testid="link-coolcat-mobile">
              CoolCatStuff.com
            </a>
            <div className="flex gap-6 justify-center mt-4">
              <a href="https://instagram.com/thegoodmeow" target="_blank" rel="noopener noreferrer" className="text-sm font-label uppercase hover:text-accent" data-testid="link-instagram-mobile">Instagram</a>
              <a href="https://youtube.com/@itsthegoodmeow" target="_blank" rel="noopener noreferrer" className="text-sm font-label uppercase hover:text-accent" data-testid="link-youtube-mobile">YouTube</a>
              <a href="https://twitter.com/ItsTheGoodMeow" target="_blank" rel="noopener noreferrer" className="text-sm font-label uppercase hover:text-accent" data-testid="link-twitter-mobile">Twitter</a>
            </div>
          </nav>
        </div>
      )}

      {/* Main Masthead */}
      <div className="relative w-full text-center py-4 md:py-6 group">
        <a href="/" className="block w-full text-center mx-auto relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full text-muted-foreground/10 text-5xl md:text-8xl font-black scale-y-150 pointer-events-none select-none blur-sm">
            THE GOOD NOW
          </div>
          
          <div className="relative inline-block">
             {/* Strikethrough for 'Now' effect */}
             <h1 className="font-headline font-black text-5xl md:text-8xl lg:text-9xl tracking-tighter leading-none hover:opacity-90 transition-opacity relative z-10 text-foreground">
              The GOOD <span className="relative inline-block text-accent decoration-double">Meow<span className="absolute -bottom-2 md:-bottom-4 left-0 w-full h-1 bg-black rotate-2"></span></span>
            </h1>
            {/* Graffiti style correction */}
            <span className="absolute -top-4 -right-8 text-accent font-handwriting text-2xl md:text-4xl font-black -rotate-12 hidden md:block">
              (Better!)
            </span>
          </div>
        </a>
        
        {/* Scrolling Ticker Box */}
        <div className="mt-4 w-full max-w-3xl mx-auto border border-black bg-black text-white py-2 px-4 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
          
          <div className="whitespace-nowrap overflow-hidden flex">
            <div className="animate-marquee font-label text-sm uppercase tracking-widest font-bold">
              {tickerContent}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex w-full justify-center gap-8 py-4 border-t border-b border-black mt-4 font-label font-bold text-sm uppercase tracking-wider">
        {navItems.map((item) => (
          <button 
            key={item.name} 
            onClick={() => scrollToSection(item.sectionId)} 
            className="hover:text-accent transition-colors decoration-2 hover:underline underline-offset-4 relative group cursor-pointer"
            data-testid={`link-nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {item.name}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-6 border-l border-black pl-8">
          <a 
            href="https://coolcatstuff.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hidden lg:flex items-center gap-2 font-black text-accent hover:underline decoration-2 underline-offset-4 bg-accent/5 px-3 py-1 border border-accent/20"
            data-testid="link-coolcatstuff-nav"
          >
            <span>OFFICIAL SUPPLIER</span>
          </a>
          <a 
            href="https://thegoodmeow.substack.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 cursor-pointer hover:text-accent"
            data-testid="link-substack-nav"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Substack</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
