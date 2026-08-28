// Edit this array to change the quiz. Each object is one round.
// Both index.html and admin.html read from this same list, in this same order.
//
// Each option now has:
//   - letter: the option's permanent identity, used for voting, scoring,
//     and correctness checks. Never changes.
//   - text: the canonical wording, used by admin.js (presenter view/tally
//     bars/scoreboard) and as correctLabel's source of truth.
//   - variants: 3 alternate phrasings of the exact same meaning. app.js
//     (student view) deterministically picks ONE of these per device per
//     question, so students see different wording for "the same" answer
//     — on top of the existing per-device letter shuffle — making it much
//     harder to just copy a friend's answer by matching text.
const questions = [
  {
    eyebrow: "Quiz · 1 of 18",
    law: "CHED Memorandum Order No. 1, s. 2015",
    situation: "",
    prompt: "What is the main purpose of CHED Memorandum Order No. 1, s. 2015?",
    options: [
      { letter: "A", text: "To require all schools to hire more female teachers",
        variants: [
          "To make schools hire additional women faculty members",
          "To mandate that colleges increase the number of female instructors on staff",
          "To force higher education institutions to prioritize hiring women teachers"
        ] },
      { letter: "B", text: "To set official guidelines for Gender and Development (GAD) in CHED and higher education institutions",
        variants: [
          "To establish the formal policy framework that institutionalizes GAD across CHED and colleges/universities",
          "To lay down CHED's official rules for implementing Gender and Development programs in higher education",
          "To provide the standard guidelines HEIs and CHED must follow for Gender and Development initiatives"
        ] },
      { letter: "C", text: "To ban gender-based courses in college curricula",
        variants: [
          "To prohibit subjects related to gender from being offered in college",
          "To remove gender-focused courses from university programs",
          "To outlaw the teaching of gender-related subjects in higher education"
        ] },
      { letter: "D", text: "To fund scholarships exclusively for women",
        variants: [
          "To provide financial grants reserved only for female students",
          "To set up a scholarship program limited to women applicants",
          "To allocate funding for scholarships that only women can receive"
        ] }
    ],
    correctLetter: "B",
    correctLabel: "To set official guidelines for Gender and Development (GAD) in CHED and higher education institutions",
    explain: "CMO No. 1, s. 2015 institutionalizes GAD in CHED and in higher education institutions by setting the official policy framework they must follow.",
    takeaway: "CHED CMO No. 1, s. 2015 is the guideline document for institutionalizing GAD across CHED and HEIs."
  },
  {
    eyebrow: "Quiz · 2 of 18",
    law: "CHED Memorandum Order No. 1, s. 2015",
    situation: "",
    prompt: "Which of the following is NOT one of the structures/requirements mandated by CHED Memo No. 1, s. 2015?",
    options: [
      { letter: "A", text: "GAD Focal Point System",
        variants: [
          "A designated GAD Focal Point structure within the institution",
          "The system that establishes a GAD Focal Point in schools",
          "An organized GAD Focal Point mechanism required of HEIs"
        ] },
      { letter: "B", text: "GAD Plan and budget",
        variants: [
          "A GAD-specific plan paired with an allocated budget",
          "A budgeted plan dedicated to Gender and Development activities",
          "A formal GAD plan with corresponding funding set aside"
        ] },
      { letter: "C", text: "Annual reporting to CHED",
        variants: [
          "Submitting a yearly report to CHED",
          "A once-a-year accomplishment report submitted to CHED",
          "Regular annual reporting requirements directed at CHED"
        ] },
      { letter: "D", text: "Mandatory military training for all students",
        variants: [
          "Compulsory military drills required of every student",
          "A required military training program for the entire student body",
          "Obligatory military instruction that all students must undergo"
        ] }
    ],
    correctLetter: "D",
    correctLabel: "Mandatory military training for all students",
    explain: "The memo mandates a GAD Focal Point System, a GAD Plan and budget, and annual reporting to CHED. Military training has nothing to do with GAD policy.",
    takeaway: "Know the actual mandated structures under CMO No. 1, s. 2015: GAD Focal Point System, GAD Plan & Budget, and annual reporting."
  },
  {
    eyebrow: "Quiz · 3 of 18",
    law: "1987 Constitution, Article II, Section 14",
    situation: "",
    prompt: "According to Article II, Section 14 of the 1987 Constitution, what does the State recognize and ensure?",
    options: [
      { letter: "A", text: "Equal pay for all professions regardless of experience",
        variants: [
          "The same salary for every profession no matter the years of experience",
          "Identical compensation across all jobs regardless of how experienced a worker is",
          "Uniform pay rates for all occupations without regard to tenure"
        ] },
      { letter: "B", text: "The role of women in nation-building and fundamental equality before the law of women and men",
        variants: [
          "Women's contribution to building the nation, and the basic legal equality between women and men",
          "The importance of women in nation-building along with equal standing of men and women under the law",
          "Women's part in national development and the principle that men and women are equal before the law"
        ] },
      { letter: "C", text: "Mandatory representation of women in Congress",
        variants: [
          "A required quota of women who must sit in Congress",
          "Compulsory seats reserved for women in the legislature",
          "An obligatory guarantee that women hold seats in Congress"
        ] },
      { letter: "D", text: "Free education for all women in the Philippines",
        variants: [
          "Tuition-free schooling for every woman in the country",
          "Education provided at no cost to all Filipino women",
          "Cost-free access to education for women nationwide"
        ] }
    ],
    correctLetter: "B",
    correctLabel: "The role of women in nation-building and fundamental equality before the law of women and men",
    explain: "Article II, Section 14 is the constitutional basis for gender equality in the Philippines, recognizing women's role in nation-building and equality before the law.",
    takeaway: "Article II, Section 14 of the 1987 Constitution is the foundational provision for gender equality that later laws like the Magna Carta of Women build on."
  },
  {
    eyebrow: "Quiz · 4 of 18",
    law: "CEDAW",
    situation: "",
    prompt: "What does CEDAW stand for?",
    options: [
      { letter: "A", text: "The Convention on the Equality of Development All Women",
        variants: [
          "The Convention concerning Equal Development for All Women",
          "The Convention on Equal Development among All Women",
          "The Convention for the Equality of Development of All Women"
        ] },
      { letter: "B", text: "The Convention on the Elimination of All Discrimination against Women",
        variants: [
          "The Convention that seeks to end every form of discrimination against women",
          "The Convention for the Elimination of All Forms of Discrimination against Women",
          "The Convention aimed at eliminating all forms of discrimination directed at women"
        ] },
      { letter: "C", text: "The Convention on the Elimination of Discrimination against Women",
        variants: [
          "The Convention addressing the elimination of discrimination against women",
          "The Convention on ending discrimination against women",
          "The Convention concerned with removing discrimination against women"
        ] },
      { letter: "D", text: "The Convention on the Economic Development and Assistance for Women",
        variants: [
          "The Convention on Economic Assistance and Development for Women",
          "The Convention providing economic development aid to women",
          "The Convention focused on economic assistance programs for women"
        ] }
    ],
    correctLetter: "B",
    correctLabel: "The Convention on the Elimination of All Discrimination against Women",
    explain: "CEDAW's full name includes the word \"All\" — it is the Convention on the Elimination of All Forms of Discrimination against Women, covering discrimination broadly, not just one type.",
    takeaway: "Watch for the word \"All\" in CEDAW's full name — it signals the convention's broad, comprehensive scope against discrimination."
  },
  {
    eyebrow: "Quiz · 5 of 18",
    law: "CEDAW",
    situation: "",
    prompt: "When was CEDAW adopted by the UN?",
    options: [
      { letter: "A", text: "1945",
        variants: ["The year 1945", "Nineteen forty-five", "1945, the year the UN itself was founded"] },
      { letter: "B", text: "1967",
        variants: ["The year 1967", "Nineteen sixty-seven", "1967"] },
      { letter: "C", text: "1979",
        variants: ["The year 1979", "Nineteen seventy-nine", "1979"] },
      { letter: "D", text: "1981",
        variants: ["The year 1981", "Nineteen eighty-one", "1981"] }
    ],
    correctLetter: "C",
    correctLabel: "1979",
    explain: "CEDAW was adopted by the UN General Assembly in 1979; it later entered into force in 1981, which is a related but different date.",
    takeaway: "CEDAW was adopted in 1979 — don't confuse this with 1981, the year it entered into force."
  },
  {
    eyebrow: "Quiz · 6 of 18",
    law: "CEDAW",
    situation: "",
    prompt: "Which organization adopted CEDAW?",
    options: [
      { letter: "A", text: "World Bank",
        variants: ["The World Bank", "The World Bank Group", "The international World Bank institution"] },
      { letter: "B", text: "ASEAN",
        variants: ["The Association of Southeast Asian Nations (ASEAN)", "ASEAN, the regional Southeast Asian bloc", "The ASEAN organization"] },
      { letter: "C", text: "United Nations",
        variants: ["The United Nations (UN)", "The UN General Assembly", "The United Nations organization"] },
      { letter: "D", text: "PWD",
        variants: ["PWD", "The PWD organization", "PWD (Persons with Disabilities) group"] }
    ],
    correctLetter: "C",
    correctLabel: "United Nations",
    explain: "CEDAW is a United Nations human rights treaty, adopted by the UN General Assembly — not a regional body like ASEAN or a financial institution like the World Bank.",
    takeaway: "CEDAW is a UN treaty, which is why countries that ratify it are bound by international obligations, not just regional agreements."
  },
  {
    eyebrow: "Quiz · 7 of 18",
    law: "Beijing Platform for Action (BPfA)",
    situation: "",
    prompt: "What is the main purpose of the Beijing Platform for Action (BPfA)?",
    options: [
      { letter: "A", text: "To establish a single international law for women",
        variants: [
          "To create one unified international law governing women's rights",
          "To set up a single binding global law specifically for women",
          "To form one worldwide legal statute covering women"
        ] },
      { letter: "B", text: "To provide a global framework for gender equality and women's empowerment",
        variants: [
          "To offer a worldwide roadmap for advancing gender equality and empowering women",
          "To serve as an international guide for promoting gender equality and women's empowerment",
          "To set a global strategy that supports gender equality and the empowerment of women"
        ] },
      { letter: "C", text: "To regulate women's participation in elections",
        variants: [
          "To control how women take part in elections",
          "To govern the rules for women's involvement in electoral processes",
          "To manage women's participation in voting and elections"
        ] },
      { letter: "D", text: "To focus only on women's economic development",
        variants: [
          "To concentrate solely on advancing women's economic status",
          "To address women's economic progress exclusively",
          "To limit its scope to just women's economic advancement"
        ] }
    ],
    correctLetter: "B",
    correctLabel: "To provide a global framework for gender equality and women's empowerment",
    explain: "The BPfA is not a binding law but a global framework agreed on at the 1995 UN Fourth World Conference on Women, guiding gender equality and women's empowerment efforts worldwide.",
    takeaway: "The Beijing Platform for Action is a global policy framework, not a single law — it guides national action on gender equality."
  },
  {
    eyebrow: "Quiz · 8 of 18",
    law: "Beijing Platform for Action — Critical Areas of Concern",
    situation: "A government creates programs that increase women's access to employment, business opportunities, credit, and financial resources.",
    prompt: "Which Critical Area of Concern does this address?",
    options: [
      { letter: "A", text: "Women and Poverty",
        variants: [
          "The Women and Poverty concern area",
          "The critical area covering women and poverty",
          "Women and Poverty, as a Critical Area of Concern"
        ] },
      { letter: "B", text: "Women and Health",
        variants: [
          "The Women and Health concern area",
          "The critical area covering women and health",
          "Women and Health, as a Critical Area of Concern"
        ] },
      { letter: "C", text: "Women and the Media",
        variants: [
          "The Women and the Media concern area",
          "The critical area covering women and the media",
          "Women and the Media, as a Critical Area of Concern"
        ] },
      { letter: "D", text: "The Girl-Child",
        variants: [
          "The Girl-Child concern area",
          "The critical area covering the girl-child",
          "The Girl-Child, as a Critical Area of Concern"
        ] }
    ],
    correctLetter: "A",
    correctLabel: "Women and Poverty",
    explain: "Programs expanding women's access to jobs, business, credit, and financial resources directly target the economic dimension of the Women and Poverty critical area.",
    takeaway: "\"Women and Poverty\" as a Critical Area of Concern is about economic access — jobs, credit, business opportunities — not just income level."
  },
  {
    eyebrow: "Quiz · 9 of 18",
    law: "Gender mainstreaming",
    situation: "A government considers gender equality when creating laws, policies, programs, budgets, and development plans.",
    prompt: "What concept does this demonstrate?",
    options: [
      { letter: "A", text: "Economic independence",
        variants: [
          "Financial self-sufficiency",
          "The state of being economically self-reliant",
          "Independence in economic terms"
        ] },
      { letter: "B", text: "Gender mainstreaming",
        variants: [
          "The strategy of gender mainstreaming",
          "Mainstreaming gender considerations into governance",
          "Embedding a gender perspective across policymaking, i.e. gender mainstreaming"
        ] },
      { letter: "C", text: "Political participation",
        variants: [
          "Involvement in political processes",
          "Taking part in political activity",
          "Engagement in politics and governance"
        ] },
      { letter: "D", text: "Conflict resolution",
        variants: [
          "The process of resolving conflicts",
          "Methods for settling disputes",
          "Approaches to resolving conflict"
        ] }
    ],
    correctLetter: "B",
    correctLabel: "Gender mainstreaming",
    explain: "Gender mainstreaming means embedding a gender perspective into every stage of policymaking — laws, budgets, and programs — rather than treating gender as a separate add-on issue.",
    takeaway: "Gender mainstreaming is a strategy, not a single program: it means gender is considered in the design of every policy, not addressed separately afterward."
  },
  {
    eyebrow: "Quiz · 10 of 18",
    law: "RA 11313 · Safe Spaces Act",
    situation: "",
    prompt: "Which statement best describes the primary objective of Republic Act No. 11313, or the Safe Spaces Act?",
    options: [
      { letter: "A", text: "To promote equal access to employment and economic opportunities",
        variants: [
          "To ensure fair and equal access to jobs and economic opportunities",
          "To advance equal opportunity in employment and the economy",
          "To promote equitable access to work and economic prospects"
        ] },
      { letter: "B", text: "To prevent and address gender-based sexual harassment and promote safe and respectful spaces",
        variants: [
          "To stop and respond to gender-based sexual harassment while fostering safe, respectful environments",
          "To prevent gender-based sexual harassment and build safer, more respectful spaces for everyone",
          "To address and curb gender-based sexual harassment and encourage safe, respectful public and online spaces"
        ] },
      { letter: "C", text: "To establish educational standards for gender-related subjects",
        variants: [
          "To set academic standards for gender-focused courses",
          "To create curriculum standards for gender-related education",
          "To define educational benchmarks for gender studies subjects"
        ] },
      { letter: "D", text: "To provide financial assistance to individuals affected by discrimination",
        variants: [
          "To give monetary aid to people who experienced discrimination",
          "To offer financial support to victims of discrimination",
          "To extend financial help to those affected by discriminatory acts"
        ] }
    ],
    correctLetter: "B",
    correctLabel: "To prevent and address gender-based sexual harassment and promote safe and respectful spaces",
    explain: "RA 11313 expands the definition and coverage of gender-based sexual harassment across streets, public spaces, online platforms, workplaces, and schools.",
    takeaway: "The Safe Spaces Act's core goal is prevention and redress of gender-based sexual harassment across multiple settings, not employment or education standards generally."
  },
  {
    eyebrow: "Quiz · 11 of 18",
    law: "RA 11313 · Safe Spaces Act",
    situation: "",
    prompt: "Why are institutional mechanisms important in implementing RA 11313 in educational institutions?",
    options: [
      { letter: "A", text: "They establish procedures for preventing, reporting, investigating, and addressing harassment.",
        variants: [
          "They set up clear steps for preventing harassment, reporting it, investigating it, and resolving it.",
          "They create formal processes covering harassment prevention, reporting, investigation, and resolution.",
          "They put in place structured procedures to prevent, report, look into, and act on harassment cases."
        ] },
      { letter: "B", text: "They assign the responsibility for addressing harassment primarily to individual students.",
        variants: [
          "They place the main duty of handling harassment on individual students themselves.",
          "They make individual students mostly responsible for dealing with harassment on their own.",
          "They shift the primary burden of addressing harassment onto the students affected."
        ] },
      { letter: "C", text: "They limit the involvement of school authorities in handling harassment-related concerns.",
        variants: [
          "They reduce how much school officials get involved in harassment cases.",
          "They restrict the role school administrators play in addressing harassment issues.",
          "They minimize school authorities' participation in resolving harassment concerns."
        ] },
      { letter: "D", text: "They reduce the need for schools to establish policies on gender-based sexual harassment.",
        variants: [
          "They lessen schools' obligation to create their own harassment policies.",
          "They make it less necessary for schools to draft gender-based harassment policies.",
          "They decrease the requirement for institutions to set harassment-related policies."
        ] }
    ],
    correctLetter: "A",
    correctLabel: "They establish procedures for preventing, reporting, investigating, and addressing harassment.",
    explain: "Institutional mechanisms give schools a concrete, structured process to prevent, receive, investigate, and act on harassment complaints, rather than leaving it informal.",
    takeaway: "Institutional mechanisms exist to formalize the school's response to harassment — clear procedures, not diffuse or optional responsibility."
  },
  {
    eyebrow: "Quiz · 12 of 18",
    law: "RA 11313 · Safe Spaces Act",
    situation: "",
    prompt: "Which statement correctly describes gender-based online sexual harassment under RA 11313?",
    options: [
      { letter: "A", text: "It applies only to harassment committed through official government websites.",
        variants: [
          "It only covers harassment that happens on official government web pages.",
          "It is limited to harassment carried out through government-run websites.",
          "It applies exclusively to harassment on official state websites."
        ] },
      { letter: "B", text: "It may involve unwanted sexual conduct communicated through digital or online platforms.",
        variants: [
          "It can include unwelcome sexual behavior sent through any digital or online channel.",
          "It covers unwanted sexual remarks or conduct delivered via online or digital means.",
          "It may include unsolicited sexual conduct transmitted through the internet or digital platforms."
        ] },
      { letter: "C", text: "It applies only when the offender and victim are physically present in the same location.",
        variants: [
          "It requires that the harasser and victim be in the same physical place.",
          "It only counts when both parties are physically together at the same location.",
          "It is limited to cases where offender and victim share the same physical space."
        ] },
      { letter: "D", text: "It excludes harassment committed through social media and messaging applications.",
        variants: [
          "It does not cover harassment done via social media or messaging apps.",
          "It leaves out harassment carried out through social platforms or chat applications.",
          "It does not include incidents that happen on social media or messaging apps."
        ] }
    ],
    correctLetter: "B",
    correctLabel: "It may involve unwanted sexual conduct communicated through digital or online platforms.",
    explain: "RA 11313's online provisions cover unwanted sexual remarks, threats, or content sent via any digital platform — social media, messaging apps, or otherwise — regardless of physical proximity.",
    takeaway: "Online harassment under RA 11313 doesn't require physical presence or a government platform — any digital channel counts."
  },
  {
    eyebrow: "Quiz · 13 of 18",
    law: "RA 9262 · Anti-VAWC Act",
    situation: "",
    prompt: "What is the primary purpose of Republic Act No. 9262?",
    options: [
      { letter: "A", text: "To regulate marriage",
        variants: [
          "To set rules governing marriage",
          "To oversee and regulate marital arrangements",
          "To control how marriages are conducted"
        ] },
      { letter: "B", text: "To protect women and their children from violence",
        variants: [
          "To safeguard women and their children against violence",
          "To shield women, along with their children, from acts of violence",
          "To defend women and their children from harm and abuse"
        ] },
      { letter: "C", text: "To provide employment opportunities",
        variants: [
          "To create job opportunities",
          "To offer opportunities for employment",
          "To generate work opportunities for people"
        ] },
      { letter: "D", text: "To regulate family property",
        variants: [
          "To govern how family property is handled",
          "To set rules for managing family-owned property",
          "To control the disposition of family property"
        ] }
    ],
    correctLetter: "B",
    correctLabel: "To protect women and their children from violence",
    explain: "RA 9262, the Anti-Violence Against Women and Their Children Act, exists specifically to protect women and their children from physical, sexual, psychological, and economic abuse.",
    takeaway: "RA 9262's protection extends to both the woman and her children, not just the woman alone."
  },
  {
    eyebrow: "Quiz · 14 of 18",
    law: "RA 9262 · Anti-VAWC Act",
    situation: "",
    prompt: "Which of the following is NOT one of the forms of violence recognized under RA 9262?",
    options: [
      { letter: "A", text: "Physical violence",
        variants: ["Violence that is physical in nature", "Bodily harm or physical abuse", "Physical forms of violence"] },
      { letter: "B", text: "Sexual violence",
        variants: ["Violence of a sexual nature", "Sexual abuse or violence", "Sexually-related violence"] },
      { letter: "C", text: "Psychological violence",
        variants: ["Violence that is psychological or emotional", "Mental or emotional abuse", "Psychological/emotional forms of violence"] },
      { letter: "D", text: "Political violence",
        variants: ["Violence that is political in nature", "Politically motivated violence", "Violence tied to political activity"] }
    ],
    correctLetter: "D",
    correctLabel: "Political violence",
    explain: "RA 9262 recognizes physical, sexual, psychological, and economic abuse. Political violence is not one of its recognized categories.",
    takeaway: "RA 9262 covers four forms of abuse: physical, sexual, psychological, and economic — memorize these four, not a broader list."
  },
  {
    eyebrow: "Quiz · 15 of 18",
    law: "RA 9262 · Anti-VAWC Act",
    situation: "",
    prompt: "Which of the following is a type of protection order under RA 9262?",
    options: [
      { letter: "A", text: "Barangay Protection Order (BPO)",
        variants: [
          "The Barangay Protection Order, or BPO",
          "A protection order issued at the barangay level (BPO)",
          "BPO — Barangay Protection Order"
        ] },
      { letter: "B", text: "Family Protection Certificate (FPC)",
        variants: [
          "The Family Protection Certificate, or FPC",
          "An FPC, or Family Protection Certificate",
          "A certificate for family protection (FPC)"
        ] },
      { letter: "C", text: "Gender Safety Order (GSO)",
        variants: [
          "The Gender Safety Order, or GSO",
          "A GSO, or Gender Safety Order",
          "An order for gender safety (GSO)"
        ] },
      { letter: "D", text: "Community Protection Permit (CPP)",
        variants: [
          "The Community Protection Permit, or CPP",
          "A CPP, or Community Protection Permit",
          "A permit for community protection (CPP)"
        ] }
    ],
    correctLetter: "A",
    correctLabel: "Barangay Protection Order (BPO)",
    explain: "RA 9262 provides for the Barangay Protection Order (BPO), along with Temporary and Permanent Protection Orders issued by courts — the other options aren't real protection order types under the law.",
    takeaway: "The BPO is issued at the barangay level for immediate protection, distinct from the Temporary and Permanent Protection Orders issued by courts."
  },
  {
    eyebrow: "Quiz · 16 of 18",
    law: "RA 10354 · Responsible Parenthood and RH Act",
    situation: "",
    prompt: "What is one main purpose of RA 10354 – Responsible Parenthood and Reproductive Health Act of 2012?",
    options: [
      { letter: "A", text: "To regulate political participation",
        variants: [
          "To govern how people take part in politics",
          "To control political involvement and participation",
          "To set rules around participating in political activity"
        ] },
      { letter: "B", text: "To promote access to reproductive health information and services",
        variants: [
          "To expand people's access to reproductive health information and care",
          "To make reproductive health information and services more accessible",
          "To improve public access to reproductive health services and knowledge"
        ] },
      { letter: "C", text: "To require couples to have a specific number of children",
        variants: [
          "To mandate that couples bear a set number of children",
          "To obligate couples to have a fixed number of kids",
          "To require a specific child count from every couple"
        ] },
      { letter: "D", text: "To prohibit reproductive health education",
        variants: [
          "To ban the teaching of reproductive health",
          "To outlaw reproductive health education programs",
          "To forbid instruction on reproductive health topics"
        ] }
    ],
    correctLetter: "B",
    correctLabel: "To promote access to reproductive health information and services",
    explain: "RA 10354's core purpose is ensuring universal access to reproductive health information and services, not dictating family size or restricting education.",
    takeaway: "RA 10354 is about access to information and services — it does not mandate a number of children or restrict RH education."
  },
  {
    eyebrow: "Quiz · 17 of 18",
    law: "RA 10354 · Responsible Parenthood and RH Act",
    situation: "",
    prompt: "Which of the following is included in the reproductive health services promoted under RA 10354?",
    options: [
      { letter: "A", text: "Prevention and management of STIs and HIV/AIDS",
        variants: [
          "Preventing and managing sexually transmitted infections and HIV/AIDS",
          "Programs for STI and HIV/AIDS prevention and treatment",
          "Services covering the prevention and management of STIs, including HIV/AIDS"
        ] },
      { letter: "B", text: "Restriction of maternal health services",
        variants: [
          "Limiting the availability of maternal health services",
          "Cutting back on services related to maternal health",
          "Reducing access to maternal health care"
        ] },
      { letter: "C", text: "Removal of sexuality education",
        variants: [
          "Eliminating sexuality education from the curriculum",
          "Taking sexuality education out of schools",
          "Discontinuing sexuality education programs"
        ] },
      { letter: "D", text: "Limitation of men's participation in reproductive health",
        variants: [
          "Restricting how much men can be involved in reproductive health",
          "Reducing men's role in reproductive health matters",
          "Limiting male participation in reproductive health care"
        ] }
    ],
    correctLetter: "A",
    correctLabel: "Prevention and management of STIs and HIV/AIDS",
    explain: "RA 10354's reproductive health services include STI/HIV prevention and management, alongside maternal care and sexuality education — it expands rather than restricts these services.",
    takeaway: "RA 10354 expands RH services (including STI/HIV care) and includes men in reproductive health, rather than limiting either."
  },
  {
    eyebrow: "Quiz · 18 of 18",
    law: "RA 10354 · Responsible Parenthood and RH Act",
    situation: "",
    prompt: "Why is RA 10354 relevant to the study of Gender and Society?",
    options: [
      { letter: "A", text: "It focuses only on women's responsibilities in the family.",
        variants: [
          "It centers exclusively on what women owe their families.",
          "It deals only with women's duties within the household.",
          "It limits its scope to women's family obligations."
        ] },
      { letter: "B", text: "It connects reproductive health with gender equality, shared responsibility, and freedom from discrimination.",
        variants: [
          "It ties reproductive health to gender equality, mutual responsibility, and non-discrimination.",
          "It links reproductive health to equality between genders, shared accountability, and freedom from discrimination.",
          "It frames reproductive health as connected to gender equality, joint responsibility, and protection from discrimination."
        ] },
      { letter: "C", text: "It removes the role of men in reproductive health decisions.",
        variants: [
          "It eliminates men's involvement in reproductive health choices.",
          "It excludes men entirely from reproductive health decision-making.",
          "It strips men of any role in reproductive health decisions."
        ] },
      { letter: "D", text: "It focuses only on population growth and not on individual rights.",
        variants: [
          "It concerns itself only with population numbers, ignoring individual rights.",
          "It is concerned solely with population control rather than personal rights.",
          "It prioritizes population growth alone, without addressing individual rights."
        ] }
    ],
    correctLetter: "B",
    correctLabel: "It connects reproductive health with gender equality, shared responsibility, and freedom from discrimination.",
    explain: "RA 10354 frames reproductive health as a gender and rights issue — linking it to equality, shared responsibility between partners, and non-discrimination, not just population control.",
    takeaway: "RA 10354 matters to Gender and Society because it treats reproductive health as a rights and equality issue, not merely a population-management tool."
  }
];
