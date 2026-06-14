const ATTORNEY_RULES = [
  {
    type: 'WomensRights',
    keywords: [
      // Violence & Abuse
      'harassment', 'sexual harassment', 'domestic violence', 'domestic abuse',
      'abuse', 'abused', 'abusing', 'abusive', 'beaten', 'beating',
      'beaten by husband', 'husband beats', 'husband hit', 'husband hits',
      'physical abuse', 'mental abuse', 'emotional abuse', 'psychological abuse',
      'mental torture', 'emotional torture', 'tortured', 'torture',
      // Acid & Extreme
      'acid attack', 'acid throwing', 'acid victim', 'disfigured',
      'honor killing', 'karo kari', 'ghairat', 'wani', 'swara',
      // Sexual
      'sexual assault', 'rape', 'gang rape', 'molested', 'molestation',
      'touched inappropriately', 'indecent assault', 'sexual abuse',
      'exposed', 'obscene', 'pornography without consent',
      // Marriage Related
      'forced marriage', 'child marriage', 'underage marriage', 'early marriage',
      'talaq forced', 'nikah forced', 'marriage against will',
      'second wife', 'second marriage without consent',
      // Dowry
      'dowry', 'dowry harassment', 'dowry demand', 'jahez', 'jaheez',
      'demanding dowry', 'dowry pressure', 'in laws demanding',
      // Trafficking
      'trafficking', 'human trafficking', 'sold', 'sex trafficking',
      // Workplace
      'workplace harassment', 'office harassment', 'boss harassing',
      'colleague harassment', 'job harassment', 'promotion denied woman',
      // Protection
      'shelter home', 'darul aman', 'protection order', 'restraining order',
      'women protection', 'women rights', 'female rights',
      // Identity
      'women', 'woman', 'girl', 'female', 'lady', 'beti', 'bahu',
      'gender', 'gender based', 'gender discrimination', 'gender violence',
      // Control & Threats
      'threatening', 'threatened by husband', 'threatened by in laws',
      'zulm', 'tyranny', 'oppression', 'locked inside house',
      'not allowed to go out', 'passport taken', 'documents taken',
      'in laws', 'in-laws', 'sasural', 'saas', 'nand', 'dewar',
      // Legal Instruments
      'women protection act', 'pwma', 'anti harassment act',
      'ombudsperson', 'women ombudsman', 'fwbl',
    ],
    experienceHints: {
      Senior: ['rape', 'gang rape', 'acid attack', 'honor killing', 'karo kari', 'trafficking', 'severe', 'brutal', 'violence', 'assault', 'murder attempt', 'wani', 'swara'],
      Junior: ['advice', 'guidance', 'awareness', 'counseling', 'information', 'workplace', 'office harassment'],
    },
  },
  {
    type: 'Criminal',
    keywords: [
      // Homicide
      'murder', 'killing', 'killed', 'qatl', 'manslaughter',
      'death threat', 'attempt to murder', 'attempted murder', 'qatl e amd',
      // Theft & Robbery
      'theft', 'stolen', 'steal', 'stole', 'chor', 'chori',
      'robbery', 'armed robbery', 'dacoity', 'dacoits', 'looting', 'mugging',
      'snatching', 'mobile snatched', 'purse snatched', 'bike snatched',
      'burglary', 'house robbery', 'break in', 'breaking in',
      // Fraud & Deception
      'fraud', 'fraudulent', 'cheating', 'cheated', 'scam', 'scammed',
      'deceived', 'deception', 'dhoka', 'embezzlement',
      'money laundering', 'benami', 'benami transaction',
      // Assault
      'assault', 'attacked', 'physical fight', 'fight', 'brawl',
      'hurt', 'injured', 'injuries caused', 'grievous hurt',
      // Police & Court
      'crime', 'criminal', 'criminal case', 'criminal charges', 'criminal record',
      'arrested', 'arrest', 'arrested by police', 'in custody', 'custody',
      'police', 'police case', 'police station', 'thana',
      'fir', 'first information report', 'case registered against me',
      'challan', 'chargesheet', 'prosecution', 'prosecuted',
      // Bail & Detention
      'bail', 'bail application', 'pre arrest bail', 'post arrest bail',
      'remand', 'judicial remand', 'physical remand',
      'prison', 'jail', 'locked up', 'behind bars', 'detention', 'detain',
      'lockup', 'cell',
      // Drugs
      'drug', 'drugs', 'narcotics', 'drug trafficking', 'drug case',
      'heroin', 'cocaine', 'charas', 'bhang', 'afeem', 'opium',
      'drug dealer', 'drug peddler', 'possession of drugs',
      // Weapons
      'weapon', 'illegal weapon', 'arms', 'gun', 'pistol', 'firearm',
      'katta', 'kalashnikov', 'rifle', 'unlicensed weapon', 'arms act',
      // Kidnapping
      'kidnapping', 'kidnapped', 'abduction', 'abducted', 'ransom',
      'missing person', 'child abduction', 'aghwa',
      // Blackmail & Extortion
      'blackmail', 'blackmailing', 'extortion', 'threatening for money',
      'bhatta', 'land mafia', 'mafia',
      // Forgery & Documents
      'forgery', 'fake documents', 'fake id', 'counterfeit', 'forged signature',
      'fake nikah', 'fake property papers',
      // Cyber Crime
      'cyber crime', 'cybercrime', 'hacking', 'hacked',
      'online fraud', 'online scam', 'social media harassment',
      'facebook complaint', 'whatsapp complaint', 'peca', 'pta complaint',
      'revenge porn', 'fake account', 'identity theft online',
      'bank fraud', 'atm fraud', 'credit card fraud', 'sim fraud',
      // Terrorism
      'terrorism', 'terrorist', 'anti terrorism', 'ata', 'terror',
      // Legal Status
      'accused', 'allegation', 'alleged', 'suspect', 'suspect in case',
      'acquittal', 'acquit', 'innocent', 'wrongly accused', 'false case',
      'false fir', 'planted evidence',
      'appeal', 'high court', 'supreme court', 'sessions court',
      // Traffic
      'hit and run', 'car accident criminal', 'reckless driving',
    ],
    experienceHints: {
      Senior: ['murder', 'qatl', 'terrorism', 'kidnapping', 'drug trafficking', 'dacoity', 'arms', 'anti terrorism', 'money laundering', 'gang'],
      Junior: ['minor offense', 'first offense', 'small case', 'traffic', 'simple bail', 'false fir', 'mobile snatching'],
    },
  },
  {
    type: 'Tax',
    keywords: [
      // Returns & Filing
      'tax', 'income tax', 'income tax return', 'tax return', 'annual return',
      'filing', 'file return', 'tax filing', 'file my taxes', 'file taxes',
      'not filed return', 'pending return', 'overdue return',
      // FBR
      'fbr', 'federal board of revenue', 'fbr notice', 'fbr letter',
      'fbr audit', 'fbr portal', 'iris', 'fbr iris', 'fbr online',
      'fbr raid', 'fbr inquiry', 'fbr case',
      // Registration
      'ntn', 'ntn registration', 'ntn number', 'national tax number',
      'strn', 'sales tax registration number', 'sales tax registered',
      'active taxpayer', 'atl', 'active taxpayer list', 'filer',
      'non filer', 'become filer', 'filer status',
      // Sales Tax / GST
      'gst', 'general sales tax', 'sales tax', 'sales tax return',
      'sales tax registration', 'input tax', 'output tax', 'tax invoice',
      // Withholding
      'withholding tax', 'advance tax', 'tax deduction', 'tax deducted',
      'tds', 'tax at source', 'salary tax', 'tax on salary',
      // Audit
      'audit', 'tax audit', 'under audit', 'audit selected', 'audit notice',
      'books of accounts', 'audit report',
      // Refund
      'refund', 'tax refund', 'refund claim', 'claim refund', 'refund pending',
      // Penalty & Notice
      'penalty', 'tax penalty', 'fine fbr', 'late filing penalty',
      'default surcharge', 'tax demand', 'recovery notice',
      'notice 111', 'notice 176', 'notice 122',
      // Evasion
      'evade', 'evasion', 'tax evasion', 'tax fraud', 'hiding income',
      'undeclared income', 'black money', 'cash economy',
      // Customs
      'customs', 'custom duty', 'import duty', 'export duty',
      'clearance', 'customs clearance', 'customs agent',
      'smuggling', 'under invoicing',
      // Types of Tax
      'corporate tax', 'company tax', 'business tax', 'sme tax',
      'wealth tax', 'property tax', 'capital gains tax', 'cgt',
      'super tax', 'minimum tax', 'alternative corporate tax', 'act',
      'dividend tax', 'rental income tax',
      // Schemes & Appeals
      'amnesty scheme', 'whitener', 'tax whitener', 'asset declaration',
      'tax commissioner', 'appellate tribunal', 'itat',
      'tax appeal', 'objection to notice', 'reply to fbr',
      // Business Tax Related
      'shop tax', 'trader tax', 'business registration tax',
      'secp', 'company registration', 'pvt ltd tax',
    ],
    experienceHints: {
      Senior: ['evasion', 'audit', 'penalty', 'evade', 'corporate tax', 'tax fraud', 'appellate', 'tribunal', 'customs', 'smuggling', 'black money'],
      Junior: ['filing', 'return', 'basic', 'first time', 'ntn', 'registration', 'strn', 'filer', 'non filer', 'become filer'],
    },
  },
  {
    type: 'RealEstate',
    keywords: [
      // Property Types
      'property', 'land', 'plot', 'marla', 'kanal', 'acre',
      'house', 'home', 'residential', 'makan',
      'flat', 'apartment', 'floor', 'portion', 'room',
      'commercial property', 'shop', 'dukan', 'plaza', 'office space', 'warehouse',
      'agricultural land', 'farm land', 'zameen', 'jagir', 'raqba',
      // Rent & Tenancy
      'rent', 'rental', 'rented', 'renting', 'kiraya',
      'tenant', 'tenancy', 'kiraya dar',
      'landlord', 'landlady', 'makan malik',
      'eviction', 'evict', 'evicted', 'forced to leave', 'asked to vacate',
      'not vacating', 'tenant not leaving', 'illegal tenant',
      'security deposit', 'advance rent', 'token money', 'bayana',
      'rent increase', 'rent dispute', 'rent agreement expired',
      'locked out', 'locks changed', 'key not given', 'access denied',
      // Lease & Agreement
      'lease', 'lease agreement', 'lease deed', 'tenancy agreement',
      'agreement to sell', 'sale agreement', 'sale deed', 'bai nama',
      'rent deed', 'rent agreement',
      // Ownership & Transfer
      'title', 'title deed', 'ownership', 'owner',
      'registry', 'property registry', 'registered',
      'transfer', 'property transfer', 'mutation', 'intiqal', 'fard mutation',
      'name transfer', 'transfer in my name',
      'sale purchase', 'buying property', 'selling property',
      // Documents
      'fard', 'jamabandi', 'khasra', 'khatauni', 'girdawari',
      'patwari', 'tehsildar', 'dc office',
      'noc', 'no objection certificate', 'completion certificate',
      'approved map', 'building plan', 'building permission',
      // Mortgage & Loan
      'mortgage', 'housing loan', 'home loan', 'property mortgage',
      'bank property', 'bank seized', 'foreclosure',
      // Construction Disputes
      'construction', 'building', 'contractor', 'builder dispute',
      'grey structure', 'incomplete construction', 'defective construction',
      // Boundaries & Encroachment
      'boundary', 'boundary wall', 'boundary dispute', 'wall dispute',
      'encroachment', 'illegal encroachment', 'illegal construction',
      'trespass', 'trespassing', 'neighbour dispute', 'neighbor dispute',
      // Possession
      'possession', 'possession dispute', 'illegal possession',
      'qabza', 'qabza group', 'land grabbing', 'land mafia',
      'occupied', 'forcibly occupied', 'not giving possession',
      // Societies & Schemes
      'society', 'housing society', 'housing scheme',
      'dha', 'bahria', 'gulshan', 'askari', 'pwd', 'cda', 'lda', 'kda',
      'cancelled plot', 'allotment cancelled', 'allotment letter',
      'plot not developed', 'society fraud', 'file',
      // Inheritance Property
      'inherited property', 'ancestral property', 'family property dispute',
      'brother not giving share', 'sister share in property',
    ],
    experienceHints: {
      Senior: ['fraud', 'encroachment', 'illegal possession', 'forgery', 'boundary dispute', 'qabza', 'land mafia', 'society fraud', 'mortgage'],
      Junior: ['rent', 'lease', 'tenant', 'security deposit', 'basic agreement', 'eviction', 'locked out'],
    },
  },
  {
    type: 'Family',
    keywords: [
      // Divorce
      'divorce', 'talaq', 'talaaq', 'divorced', 'want divorce', 'seeking divorce',
      'separation', 'separated', 'living separately', 'not living together',
      'khula', 'khulla', 'wife wants divorce', 'wife filed for divorce',
      'triple talaq', 'one sided divorce', 'divorce notice',
      // Custody
      'custody', 'child custody', 'children custody', 'custody of kids',
      'custody battle', 'fighting for custody', 'custody case',
      'visitation rights', 'right to meet children',
      'not allowing to meet children', 'children taken away',
      // Children
      'child', 'children', 'minor', 'kids', 'son', 'daughter',
      'bachay', 'beta', 'beti', 'bacha',
      'child education', 'school fee dispute', 'child maintenance',
      // Maintenance
      'maintenance', 'alimony', 'nafaqah', 'nafqa', 'monthly maintenance',
      'wife maintenance', 'child support', 'not paying maintenance',
      'maintenance order', 'maintenance case',
      // Marriage
      'marriage', 'nikah', 'shadi', 'wedding', 'married',
      'marriage certificate', 'nikah nama', 'nikah certificate',
      'nikah registrar', 'court marriage', 'nikah dispute',
      'marriage registration', 'unregistered nikah',
      'second marriage', 'remarriage', 'polygamy', 'multiple wives',
      'marriage without consent', 'love marriage',
      // Inheritance & Succession
      'inheritance', 'wirasat', 'virsa', 'share in inheritance',
      'will', 'wasiyat', 'estate', 'deceased property',
      'succession', 'heirship', 'legal heir', 'legal heirs',
      'father died', 'mother died', 'parents died', 'waris',
      'property of deceased', 'not getting my share',
      // Guardianship
      'guardian', 'guardianship', 'parental rights', 'parent rights',
      'adoption', 'adopted child', 'foster',
      // Family Relations
      'family', 'family dispute', 'family issue', 'family problem', 'family case',
      'family court', 'family court case',
      'spouse', 'husband', 'wife', 'ex wife', 'ex husband',
      'father', 'mother', 'parents', 'siblings', 'brother', 'sister',
      'in laws', 'relatives dispute',
      // Dower & Mehr
      'mehir', 'mehr', 'haq mehr', 'dower', 'mahar not paid',
      // Living Arrangements
      'domestic relationship', 'living together issue',
      'not providing shelter', 'no house', 'kicked out of home',
      'property after divorce', 'share in property after divorce',
      'husband not giving rights',
    ],
    experienceHints: {
      Senior: ['custody', 'inheritance', 'succession', 'international custody', 'contested divorce', 'guardianship', 'custody battle', 'property after divorce'],
      Junior: ['nikah', 'simple divorce', 'advice', 'marriage certificate', 'basic maintenance', 'nikah registration', 'court marriage'],
    },
  },
];

const scoreText = (text, keywords) => {
  const lower = text.toLowerCase();
  return keywords.reduce((score, kw) => {
    const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, 'gi');
    const matches = lower.match(regex);
    return score + (matches ? matches.length : 0);
  }, 0);
};

const inferExperience = (text, hints) => {
  const lower = text.toLowerCase();
  if (hints.Junior.some(kw => lower.includes(kw))) return 'Junior';
  return 'Senior';
};

exports.matchAttorney = (req, res) => {
  const { problemDescription } = req.body;
  if (!problemDescription || problemDescription.trim().length < 10) {
    return res.status(400).json({ message: 'Provide a detailed problem description (min 10 chars).' });
  }

  const scores = ATTORNEY_RULES.map(rule => ({
    type: rule.type,
    score: scoreText(problemDescription, rule.keywords),
    experience: inferExperience(problemDescription, rule.experienceHints),
  }));

  scores.sort((a, b) => b.score - a.score);
  const top = scores[0];

  if (top.score === 0) {
    return res.json({
      recommendedType: 'Family',
      experienceLevel: 'Mid',
      confidence: 'low',
      confidenceLabel: 'low',
      message: 'Could not determine attorney type. Please describe your problem in more detail.',
      allScores: scores,
    });
  }

  const total = scores.reduce((s, r) => s + r.score, 0);
  const confidence = total > 0 ? Math.round((top.score / total) * 100) : 0;
  const confidenceLabel = confidence >= 35 ? 'high' : confidence >= 20 ? 'medium' : 'low';

  res.json({
    recommendedType: top.type,
    experienceLevel: top.experience,
    confidence: `${confidence}%`,
    confidenceLabel,
    message: `We recommend a ${top.experience}-level ${top.type} attorney.`,
    allScores: scores,
  });
};
