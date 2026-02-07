export interface EvidenceItem {
  label: string;
  content: string;
}

export interface PolicyLever {
  text: string;
}

export interface VerdictOption {
  type: VerdictType;
  label: string;
  emoji: string;
}

export interface CaseData {
  id: number;
  title: string;
  subtitle: string;
  story: string;
  evidence: EvidenceItem[];
  verdictOptions: VerdictOption[];
  correctVerdict: VerdictType;
  policyLevers: PolicyLever[];
  whatHappened: string;
  negativeImpact: string[];
  whatYouCanDo: string;
  sources: { label: string; url: string }[];
  isLocal?: boolean;
  localTag?: string;
}

export type VerdictType = "guilty" | "not_guilty" | "mixed";

export const verdictStyleClasses: Record<VerdictType, string> = {
  guilty: "border-verdict-illegal hover:bg-verdict-illegal/10 text-verdict-illegal",
  not_guilty: "border-verdict-legal hover:bg-verdict-legal/10 text-verdict-legal",
  mixed: "border-verdict-reform hover:bg-verdict-reform/10 text-verdict-reform",
};

export const verdictColorClasses: Record<VerdictType, string> = {
  guilty: "text-verdict-illegal border-verdict-illegal",
  not_guilty: "text-verdict-legal border-verdict-legal",
  mixed: "text-verdict-reform border-verdict-reform",
};

export const verdictBgClasses: Record<VerdictType, string> = {
  guilty: "bg-verdict-illegal/10",
  not_guilty: "bg-verdict-legal/10",
  mixed: "bg-verdict-reform/10",
};

export const verdictResultClasses: Record<VerdictType, string> = {
  guilty: "text-verdict-illegal bg-verdict-illegal/10 border-verdict-illegal/30",
  not_guilty: "text-verdict-legal bg-verdict-legal/10 border-verdict-legal/30",
  mixed: "text-verdict-reform bg-verdict-reform/10 border-verdict-reform/30",
};

export const cases: CaseData[] = [
  {
    id: 1,
    title: "The UCLA Consent Problem",
    subtitle: "Case No. 2025-MCR-001 (Moore v. Regents)",
    story:
      "A leukemia patient at UCLA learns that tissue removed during treatment may have been used for research and commercialization without the full story being explained upfront. You decide whether the system should treat this as theft, a disclosure failure, or acceptable research practice, and what patients deserve to know before consenting.",
    evidence: [
      {
        label: "Power imbalance",
        content:
          "Patients may not realize doctors can have research or economic interests in the tissue they remove. This creates an inherent power imbalance in the consent process.",
      },
      {
        label: "Trust impact",
        content:
          "Lack of transparency can reduce willingness to seek care or join research. When patients feel used rather than respected, community trust erodes.",
      },
      {
        label: "What a fair system does",
        content:
          "Clear disclosure plus consent people can actually understand. Patients should know upfront if their tissue may be used for research or commercial purposes.",
      },
    ],
    verdictOptions: [
      { type: "guilty", label: "Patient rights violated", emoji: "🚫" },
      { type: "not_guilty", label: "Research priority", emoji: "🔬" },
      { type: "mixed", label: "Allowed only with full disclosure + consent", emoji: "⚖️" },
    ],
    correctVerdict: "mixed",
    policyLevers: [
      { text: "Require clear, plain-language disclosure when tissue may be used for research or commercial purposes." },
      { text: "Give patients meaningful consent rights over downstream use of their biological materials." },
    ],
    whatHappened: "The California Supreme Court allowed disclosure-based claims to proceed but rejected a property-based 'conversion' claim over removed cells.",
    negativeImpact: [
      "Normalizes patient distrust if people feel used rather than respected partners in care and research.",
      "Leaves patients with limited leverage over downstream commercialization compared to what many expect.",
    ],
    whatYouCanDo: "Support informed consent legislation that requires clear disclosure when patient tissue may be used for research or commercial purposes.",
    sources: [
      { label: "Justia: Moore v. Regents", url: "https://law.justia.com/cases/california/supreme-court/3d/51/120.html" },
      { label: "LSU Biotech Law: Moore v. Regents", url: "https://biotech.law.lsu.edu/cases/consent/moore_v_regents.htm" },
    ],
  },
  {
    id: 2,
    title: "Red Tape and the MRI",
    subtitle: "Case No. 2025-RKF-002 (Rahm v. Kaiser)",
    story:
      "A teen patient's worsening symptoms raise alarm, but an MRI authorization is delayed. By the time imaging happens, the cancer is advanced and the surgery becomes extreme. You decide if the system's delay is 'just bureaucracy' or a preventable harm, and what rules should change.",
    evidence: [
      {
        label: "Where delay happens",
        content:
          "Approvals and administrative steps can slow time-sensitive care. Authorization queues don't distinguish between routine requests and urgent red-flag symptoms.",
      },
      {
        label: "Outcome cost",
        content:
          "Late detection can force more aggressive treatment and disability. What could have been a manageable procedure becomes a life-altering surgery.",
      },
      {
        label: "Fair system",
        content:
          "Fast-track pathways for red-flag symptoms plus accountability for delays. Time-sensitive conditions should never wait in a general authorization queue.",
      },
    ],
    verdictOptions: [
      { type: "guilty", label: "Negligent delay caused harm", emoji: "🚫" },
      { type: "not_guilty", label: "Standard met / unavoidable", emoji: "📜" },
      { type: "mixed", label: "System failure: fix protocols", emoji: "⚖️" },
    ],
    correctVerdict: "guilty",
    policyLevers: [
      { text: "Create fast-track authorization pathways for time-sensitive symptoms and suspected cancer diagnoses." },
      { text: "Require insurers to meet binding turnaround times (e.g., 48 hours) for urgent imaging requests." },
    ],
    whatHappened: "A Los Angeles jury awarded the patient more than $28 million in a case described as involving delayed MRI and diagnosis leading to devastating outcomes.",
    negativeImpact: [
      "Reinforces that coverage and authorization friction can translate into irreversible harm for cancer patients.",
    ],
    whatYouCanDo: "Support prior authorization reform legislation requiring real-time decisions for urgent diagnoses.",
    sources: [
      { label: "LA Times: Kaiser Cancer Patient", url: "https://www.latimes.com/business/la-fi-jury-awards-kaiser-cancer-patient-20150326-story.html" },
      { label: "Jury Verdict Alert: Rahm v. Kaiser", url: "https://juryverdictalert.com/medical-malpractice/rahm-v-kaiser" },
    ],
  },
  {
    id: 3,
    title: "Fired After Diagnosis",
    subtitle: "Case No. 2025-BVS-003 (Beck v. Sybase)",
    story:
      "A worker is diagnosed with lymphoma and soon faces termination. You decide whether this is discrimination, 'business as usual,' or a system that needs stronger protections. Job loss can also threaten insurance, income, and stability during treatment.",
    evidence: [
      {
        label: "Economic shock",
        content:
          "Cancer plus job loss multiplies stress and barriers to care. Losing employer-sponsored insurance during active treatment can be catastrophic.",
      },
      {
        label: "Chilling effect",
        content:
          "Workers may hide illness or delay treatment to avoid retaliation. The fear of job loss can be as harmful as the disease itself.",
      },
      {
        label: "Fair system",
        content:
          "Enforce anti-discrimination rules plus protect time needed for care. Workers should never have to choose between treatment and a paycheck.",
      },
    ],
    verdictOptions: [
      { type: "guilty", label: "Cancer discrimination", emoji: "🚫" },
      { type: "not_guilty", label: "Legitimate termination", emoji: "📜" },
      { type: "mixed", label: "Process violated: stronger enforcement", emoji: "⚖️" },
    ],
    correctVerdict: "guilty",
    policyLevers: [
      { text: "Strengthen enforcement of anti-discrimination protections for employees undergoing cancer treatment." },
      { text: "Require continuation of health benefits during medical leave for serious diagnoses." },
    ],
    whatHappened: "A Los Angeles Superior Court jury awarded compensatory damages, and the matter later settled for $1.75 million rather than proceed to punitive damages.",
    negativeImpact: [
      "Signals to patients that disclosure and treatment time can put livelihoods at risk.",
    ],
    whatYouCanDo: "Advocate for stronger workplace protections for employees undergoing cancer treatment in your state.",
    sources: [
      { label: "LA Times: Beck v. Sybase", url: "https://www.latimes.com/archives/la-xpm-1999-mar-20-mn-19161-story.html" },
    ],
  },
  {
    id: 4,
    title: "Punished for Treatment Time",
    subtitle: "Case No. 2025-RCW-004 (Rubio v. CIA Wheel Group)",
    story:
      "A worker undergoing cancer treatment needs time for chemo and follow-ups. She alleges she's terminated because she has cancer. You decide whether the system protected her rights, ignored them, or only responded after serious harm, and what workplace protections should look like.",
    evidence: [
      {
        label: "Care reality",
        content:
          "Treatment schedules collide with rigid workplace rules. Chemotherapy, radiation, and follow-ups require flexible time that many jobs don't accommodate.",
      },
      {
        label: "Retaliation risk",
        content:
          "People may skip care if they fear job loss. Missed treatments can mean the difference between remission and progression.",
      },
      {
        label: "Fair system",
        content:
          "Strong enforcement plus meaningful penalties to deter discrimination. Employers must know that terminating cancer patients carries real consequences.",
      },
    ],
    verdictOptions: [
      { type: "guilty", label: "Terminated due to cancer", emoji: "🚫" },
      { type: "not_guilty", label: "For cause", emoji: "📜" },
      { type: "mixed", label: "Retaliation risk: tighten enforcement", emoji: "⚖️" },
    ],
    correctVerdict: "guilty",
    policyLevers: [
      { text: "Strengthen enforcement and meaningful penalties to deter cancer-related workplace discrimination." },
      { text: "Expand protected leave for cancer treatment, including chemotherapy and follow-up appointments." },
    ],
    whatHappened: "The Court of Appeal rejected the employer's challenge to punitive damages as constitutionally excessive in this cancer-termination context, siding with the worker.",
    negativeImpact: [
      "Shows survivorship is shaped by worker protections: fear of firing can block treatment follow-through.",
    ],
    whatYouCanDo: "Support legislation that expands protected leave for cancer treatment and strengthens penalties for discrimination.",
    sources: [
      { label: "Justia: Rubio v. CIA Wheel Group", url: "https://law.justia.com/cases/california/court-of-appeal/2021/b300021.html" },
      { label: "Helmer Friedman: CA Employment Law Notes", url: "https://www.helmerfriedman.com/california-employment-law-2021-andrew-h-friedman-notes/" },
    ],
    isLocal: true,
    localTag: "🏙️ LA / Local Legends",
  },
];
