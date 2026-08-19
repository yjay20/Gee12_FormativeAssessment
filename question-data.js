// Edit this array to change the quiz. Each object is one "Pause & Decide" round.
// Both index.html and admin.html read from this same list, in this same order.
const questions = [
  {
    eyebrow: "Pause & Decide · 1 of 10",
    law: "RA 11313 · Safe Spaces Act",
    situation: "Ana is walking home when a stranger repeatedly whistles at her, makes unwanted sexual comments, and follows her for several minutes.",
    prompt: "What law is most relevant to this situation?",
    options: [
      { letter: "A", text: "RA 7192 — Women in Development and Nation-Building" },
      { letter: "B", text: "RA 9710 — Magna Carta of Women" },
      { letter: "C", text: "RA 11313 — Safe Spaces Act" },
      { letter: "D", text: "RA 10354 — Responsible Parenthood and Reproductive Health Act" }
    ],
    correctLetter: "C",
    correctLabel: "RA 11313 — Safe Spaces Act",
    explain: "This is gender-based sexual harassment in a public space — street-level catcalling and following — which the Safe Spaces Act directly covers.",
    takeaway: "RA 11313 covers gender-based sexual harassment in streets and public spaces, online, in workplaces, and in schools."
  },
  {
    eyebrow: "Pause & Decide · 2 of 10",
    law: "RA 7877 · Anti-Sexual Harassment Act",
    situation: "Mark's supervisor repeatedly comments on his body, sends him flirty messages after work hours, and hints that a promotion depends on how he responds.",
    prompt: "What law is most relevant to this situation?",
    options: [
      { letter: "A", text: "RA 11313 — Safe Spaces Act" },
      { letter: "B", text: "RA 7877 — Anti-Sexual Harassment Act" },
      { letter: "C", text: "RA 9262 — Anti-VAWC Act" },
      { letter: "D", text: "RA 10173 — Data Privacy Act" }
    ],
    correctLetter: "B",
    correctLabel: "RA 7877 — Anti-Sexual Harassment Act",
    explain: "A supervisor using authority over a subordinate to demand sexual favors in exchange for a work benefit is the core scenario RA 7877 was written for.",
    takeaway: "RA 7877 covers sexual harassment by someone with authority, influence, or moral ascendancy over another, in work, education, or training settings."
  },
  {
    eyebrow: "Pause & Decide · 3 of 10",
    law: "RA 9262 · Anti-VAWC Act",
    situation: "Liza's boyfriend controls who she can talk to, checks her phone daily, and threatens to hurt her if she tries to end the relationship.",
    prompt: "What law is most relevant to this situation?",
    options: [
      { letter: "A", text: "RA 9262 — Anti-Violence Against Women and Their Children Act" },
      { letter: "B", text: "RA 11313 — Safe Spaces Act" },
      { letter: "C", text: "RA 9710 — Magna Carta of Women" },
      { letter: "D", text: "RA 7192 — Women in Development and Nation-Building" }
    ],
    correctLetter: "A",
    correctLabel: "RA 9262 — Anti-Violence Against Women and Their Children Act",
    explain: "Controlling behavior and threats within an intimate relationship — psychological and emotional abuse — fall squarely under RA 9262.",
    takeaway: "RA 9262 covers physical, sexual, psychological, and economic abuse committed by a spouse, partner, or someone with whom the victim has or had a relationship."
  },
  {
    eyebrow: "Pause & Decide · 4 of 10",
    law: "RA 11313 · Safe Spaces Act",
    situation: "A classmate keeps sending unsolicited explicit photos and sexual jokes to Ana in a group chat, even after she asks him to stop.",
    prompt: "What law is most relevant to this situation?",
    options: [
      { letter: "A", text: "RA 10175 — Cybercrime Prevention Act only" },
      { letter: "B", text: "RA 11313 — Safe Spaces Act (online provisions)" },
      { letter: "C", text: "RA 9995 — Anti-Photo and Video Voyeurism Act" },
      { letter: "D", text: "RA 7610 — Special Protection of Children Act" }
    ],
    correctLetter: "B",
    correctLabel: "RA 11313 — Safe Spaces Act",
    explain: "Unwanted sexual remarks and content sent online after being told to stop is gender-based online sexual harassment, which the Safe Spaces Act's online provisions cover.",
    takeaway: "The Safe Spaces Act's online harassment provisions cover unwanted sexual comments, threats, and content sent through digital platforms."
  },
  {
    eyebrow: "Pause & Decide · 5 of 10",
    law: "RA 7610 · Special Protection of Children Act",
    situation: "A 15-year-old student is being pressured by an adult online acquaintance to send private photos in exchange for money.",
    prompt: "What law is most relevant to this situation?",
    options: [
      { letter: "A", text: "RA 7610 — Special Protection of Children Against Abuse, Exploitation and Discrimination Act" },
      { letter: "B", text: "RA 11313 — Safe Spaces Act" },
      { letter: "C", text: "RA 9262 — Anti-VAWC Act" },
      { letter: "D", text: "RA 10354 — Responsible Parenthood and Reproductive Health Act" }
    ],
    correctLetter: "A",
    correctLabel: "RA 7610 — Special Protection of Children Act",
    explain: "Because the person being pressured is a minor, this is child sexual exploitation, which is specifically addressed by RA 7610 rather than the adult-focused Safe Spaces Act.",
    takeaway: "When the person being harassed or exploited is a minor, child-protection laws like RA 7610 generally take precedence over general anti-harassment laws."
  },
  {
    eyebrow: "Pause & Decide · 6 of 10",
    law: "RA 9710 · Magna Carta of Women",
    situation: "A qualified woman is repeatedly passed over for management roles at her company because leadership assumes she'll prioritize family over the job.",
    prompt: "What law is most relevant to this situation?",
    options: [
      { letter: "A", text: "RA 9710 — Magna Carta of Women" },
      { letter: "B", text: "RA 7877 — Anti-Sexual Harassment Act" },
      { letter: "C", text: "RA 11313 — Safe Spaces Act" },
      { letter: "D", text: "RA 9262 — Anti-VAWC Act" }
    ],
    correctLetter: "A",
    correctLabel: "RA 9710 — Magna Carta of Women",
    explain: "This is gender-based discrimination in employment opportunities, not sexual harassment — the Magna Carta of Women is the law designed to eliminate this kind of discrimination.",
    takeaway: "RA 9710 focuses on eliminating discrimination against women, including in employment, and promoting substantive equality."
  },
  {
    eyebrow: "Pause & Decide · 7 of 10",
    law: "RA 11313 · Safe Spaces Act",
    situation: "During a college orientation, a professor makes repeated sexual jokes about female students in front of the class, making several of them visibly uncomfortable.",
    prompt: "What law is most relevant to this situation?",
    options: [
      { letter: "A", text: "RA 7877 — Anti-Sexual Harassment Act only" },
      { letter: "B", text: "RA 11313 — Safe Spaces Act (educational institutions)" },
      { letter: "C", text: "RA 9710 — Magna Carta of Women" },
      { letter: "D", text: "RA 10354 — Responsible Parenthood and Reproductive Health Act" }
    ],
    correctLetter: "B",
    correctLabel: "RA 11313 — Safe Spaces Act",
    explain: "The Safe Spaces Act expanded harassment coverage to include gender-based harassment in educational settings, including by faculty, beyond the older RA 7877 framework.",
    takeaway: "RA 11313 explicitly extends anti-harassment protections into schools and training institutions, covering both peer-to-peer and authority-based harassment."
  },
  {
    eyebrow: "Pause & Decide · 8 of 10",
    law: "RA 9995 · Anti-Photo and Video Voyeurism Act",
    situation: "Someone secretly records a private moment between two people without their consent and threatens to post it online.",
    prompt: "What law is most relevant to this situation?",
    options: [
      { letter: "A", text: "RA 9995 — Anti-Photo and Video Voyeurism Act" },
      { letter: "B", text: "RA 11313 — Safe Spaces Act" },
      { letter: "C", text: "RA 10173 — Data Privacy Act" },
      { letter: "D", text: "RA 9262 — Anti-VAWC Act" }
    ],
    correctLetter: "A",
    correctLabel: "RA 9995 — Anti-Photo and Video Voyeurism Act",
    explain: "Secretly recording a private, intimate moment without consent and threatening to share it is exactly what RA 9995 was written to criminalize.",
    takeaway: "RA 9995 punishes taking, copying, or sharing photos or videos of a person's private parts or sexual act without consent, even if the recording itself was consensual at first."
  },
  {
    eyebrow: "Pause & Decide · 9 of 10",
    law: "RA 11313 · Safe Spaces Act",
    situation: "A group of men on a street corner make kissing sounds and comment loudly on a passing woman's body as she walks by.",
    prompt: "What law is most relevant to this situation?",
    options: [
      { letter: "A", text: "RA 11313 — Safe Spaces Act" },
      { letter: "B", text: "RA 9262 — Anti-VAWC Act" },
      { letter: "C", text: "RA 7877 — Anti-Sexual Harassment Act" },
      { letter: "D", text: "RA 9995 — Anti-Photo and Video Voyeurism Act" }
    ],
    correctLetter: "A",
    correctLabel: "RA 11313 — Safe Spaces Act",
    explain: "Catcalling and unwanted sexual remarks directed at a stranger in a public space is the textbook example of gender-based public harassment under the Safe Spaces Act.",
    takeaway: "The Safe Spaces Act was the first law to specifically criminalize catcalling, wolf-whistling, and similar sexual remarks made toward strangers in public."
  },
  {
    eyebrow: "Pause & Decide · 10 of 10",
    law: "RA 11313 · Safe Spaces Act",
    situation: "An HR officer receives a harassment complaint from an employee but dismisses it, telling her to 'just ignore it' instead of investigating.",
    prompt: "Under RA 11313, what is the employer's obligation in this situation?",
    options: [
      { letter: "A", text: "Employers have no legal obligation unless police get involved" },
      { letter: "B", text: "Employers must investigate and act on harassment complaints, or risk liability" },
      { letter: "C", text: "Only RA 7877 applies, so RA 11313 has no bearing here" },
      { letter: "D", text: "The complaint should be handled entirely by the employee's family" }
    ],
    correctLetter: "B",
    correctLabel: "RA 11313 — Safe Spaces Act (employer duty to act)",
    explain: "RA 11313 requires employers to have mechanisms for receiving and acting on harassment complaints — failing to investigate can make the employer independently liable.",
    takeaway: "RA 11313 places a duty on employers, school administrators, and local governments to prevent, address, and act on gender-based harassment — not just to react after the fact."
  }
];