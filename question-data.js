// Edit this array to change the quiz. Each object is one round.
// Both index.html and admin.html read from this same list, in this same order.
const questions = [
  {
    eyebrow: "Quiz · 1 of 15",
    law: "CHED Memorandum Order No. 1, s. 2015",
    situation: "",
    prompt: "What is the main purpose of CHED Memorandum Order No. 1, s. 2015?",
    options: [
      { letter: "A", text: "To require all schools to hire more female teachers" },
      { letter: "B", text: "To set official guidelines for Gender and Development (GAD) in CHED and higher education institutions" },
      { letter: "C", text: "To ban gender-based courses in college curricula" },
      { letter: "D", text: "To fund scholarships exclusively for women" }
    ],
    correctLetter: "B",
    correctLabel: "To set official guidelines for Gender and Development (GAD) in CHED and higher education institutions",
    explain: "CMO No. 1, s. 2015 institutionalizes GAD in CHED and in higher education institutions by setting the official policy framework they must follow.",
    takeaway: "CHED CMO No. 1, s. 2015 is the guideline document for institutionalizing GAD across CHED and HEIs."
  },
  {
    eyebrow: "Quiz · 2 of 15",
    law: "CHED Memorandum Order No. 1, s. 2015",
    situation: "",
    prompt: "Which of the following is NOT one of the structures/requirements mandated by CHED Memo No. 1, s. 2015?",
    options: [
      { letter: "A", text: "GAD Focal Point System" },
      { letter: "B", text: "GAD Plan and budget" },
      { letter: "C", text: "Annual reporting to CHED" },
      { letter: "D", text: "Mandatory military training for all students" }
    ],
    correctLetter: "D",
    correctLabel: "Mandatory military training for all students",
    explain: "The memo mandates a GAD Focal Point System, a GAD Plan and budget, and annual reporting to CHED. Military training has nothing to do with GAD policy.",
    takeaway: "Know the actual mandated structures under CMO No. 1, s. 2015: GAD Focal Point System, GAD Plan & Budget, and annual reporting."
  },
  {
    eyebrow: "Quiz · 3 of 15",
    law: "1987 Constitution, Article II, Section 14",
    situation: "",
    prompt: "According to Article II, Section 14 of the 1987 Constitution, what does the State recognize and ensure?",
    options: [
      { letter: "A", text: "Equal pay for all professions regardless of experience" },
      { letter: "B", text: "The role of women in nation-building and fundamental equality before the law of women and men" },
      { letter: "C", text: "Mandatory representation of women in Congress" },
      { letter: "D", text: "Free education for all women in the Philippines" }
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
      { letter: "A", text: "The Convention on the Equality of Development All Women" },
      { letter: "B", text: "The Convention on the Elimination of All Discrimination against Women" },
      { letter: "C", text: "The Convention on the Elimination of Discrimination against Women" },
      { letter: "D", text: "The Convention on the Economic Development and Assistance for Women" }
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
      { letter: "A", text: "1945" },
      { letter: "B", text: "1967" },
      { letter: "C", text: "1979" },
      { letter: "D", text: "1981" }
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
      { letter: "A", text: "World Bank" },
      { letter: "B", text: "ASEAN" },
      { letter: "C", text: "United Nations" },
      { letter: "D", text: "PWD" }
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
      { letter: "A", text: "To establish a single international law for women" },
      { letter: "B", text: "To provide a global framework for gender equality and women's empowerment" },
      { letter: "C", text: "To regulate women's participation in elections" },
      { letter: "D", text: "To focus only on women's economic development" }
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
      { letter: "A", text: "Women and Poverty" },
      { letter: "B", text: "Women and Health" },
      { letter: "C", text: "Women and the Media" },
      { letter: "D", text: "The Girl-Child" }
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
      { letter: "A", text: "Economic independence" },
      { letter: "B", text: "Gender mainstreaming" },
      { letter: "C", text: "Political participation" },
      { letter: "D", text: "Conflict resolution" }
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
      { letter: "A", text: "To promote equal access to employment and economic opportunities" },
      { letter: "B", text: "To prevent and address gender-based sexual harassment and promote safe and respectful spaces" },
      { letter: "C", text: "To establish educational standards for gender-related subjects" },
      { letter: "D", text: "To provide financial assistance to individuals affected by discrimination" }
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
      { letter: "A", text: "They establish procedures for preventing, reporting, investigating, and addressing harassment." },
      { letter: "B", text: "They assign the responsibility for addressing harassment primarily to individual students." },
      { letter: "C", text: "They limit the involvement of school authorities in handling harassment-related concerns." },
      { letter: "D", text: "They reduce the need for schools to establish policies on gender-based sexual harassment." }
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
      { letter: "A", text: "It applies only to harassment committed through official government websites." },
      { letter: "B", text: "It may involve unwanted sexual conduct communicated through digital or online platforms." },
      { letter: "C", text: "It applies only when the offender and victim are physically present in the same location." },
      { letter: "D", text: "It excludes harassment committed through social media and messaging applications." }
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
      { letter: "A", text: "To regulate marriage" },
      { letter: "B", text: "To protect women and their children from violence" },
      { letter: "C", text: "To provide employment opportunities" },
      { letter: "D", text: "To regulate family property" }
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
      { letter: "A", text: "Physical violence" },
      { letter: "B", text: "Sexual violence" },
      { letter: "C", text: "Psychological violence" },
      { letter: "D", text: "Political violence" }
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
      { letter: "A", text: "Barangay Protection Order (BPO)" },
      { letter: "B", text: "Family Protection Certificate (FPC)" },
      { letter: "C", text: "Gender Safety Order (GSO)" },
      { letter: "D", text: "Community Protection Permit (CPP)" }
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
      { letter: "A", text: "To regulate political participation" },
      { letter: "B", text: "To promote access to reproductive health information and services" },
      { letter: "C", text: "To require couples to have a specific number of children" },
      { letter: "D", text: "To prohibit reproductive health education" }
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
      { letter: "A", text: "Prevention and management of STIs and HIV/AIDS" },
      { letter: "B", text: "Restriction of maternal health services" },
      { letter: "C", text: "Removal of sexuality education" },
      { letter: "D", text: "Limitation of men's participation in reproductive health" }
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
      { letter: "A", text: "It focuses only on women's responsibilities in the family." },
      { letter: "B", text: "It connects reproductive health with gender equality, shared responsibility, and freedom from discrimination." },
      { letter: "C", text: "It removes the role of men in reproductive health decisions." },
      { letter: "D", text: "It focuses only on population growth and not on individual rights." }
    ],
    correctLetter: "B",
    correctLabel: "It connects reproductive health with gender equality, shared responsibility, and freedom from discrimination.",
    explain: "RA 10354 frames reproductive health as a gender and rights issue — linking it to equality, shared responsibility between partners, and non-discrimination, not just population control.",
    takeaway: "RA 10354 matters to Gender and Society because it treats reproductive health as a rights and equality issue, not merely a population-management tool."
  }
];
