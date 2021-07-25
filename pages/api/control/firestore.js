import firebaseAdmin from "@utils/firebaseServer";

export default async (req, res) => {
  try {
    if (process.env.NODE_ENV !== "development") throw new TypeError("authentication failed");

    for (const [key, value] of Object.entries({
      "2021-06-15":
        "Twitter Rejected Nigerian government's demand that Nnamdi Kanu's account be blocked - Lai Mohammed@@@North Korea Priorities Bilateral Relations with Nigeria, Says Ambassador@@@Despite Buhari's claims, Inflation pushes 7m Nigerians below poverty line, says World Bank@@@EFCC boss Bawa opens up: 'I have been receiving death threats'@@@Kill those carrying guns before they kill you - Uzodinma(Imo governor) charges security operative to kill his own people@@@No crisis in APGA, ignore imposters - Victor Oye@@@Gunmen kills sports Council Official in Plateau@@@Address Insecurity in Nigeria, you were not elected to only borrow money - Wike tells Buhari@@@We're being marginalized - Ogun west leaders slam Abiodun@@@Nigeria Army seeks Boko Haram, ISWAP terrorists' reconciliation",
      "2021-06-16":
        "Wizkid’s 3rd Baby Mama, Jada P Cries About The Negative@@@ PDP brands Buhari’s ‘sanctuary of corruption’ over alleged indictment of minister in $37m@@@ Put a stop to incessant kidnappings in Nigeria – UNICEF to FG@@@ Igboho to Buhari: Order Fulani in Southwest to vacate now@@@ Akwa Ibom Pastor Christopher beats wife to death, buries her in shallow grave@@@ Intimidation, threat can’t stop Biafra agitation, Iwuanyanwu tells FG The Nation@@@ Man Dies While Having Sex With Best Friend's Ex-Wife@@@ Nigerian Army says its soldiers killed scores in 14-day raid of South East@@@ 18-year-old EndSARS protester gives birth in prison@@@ Insecurity: Don’t shy away from your responsibility, Tambuwal tells Buhari The Daily@@@ Bandits kill farmers, children, abduct two others in Ondo@@@ Cases Of COVID-19 On The Rise In Africa, Approaching Peak Of First Wave@@@ ICPC, DSS, NSC, Others Set Up Task Team Against Corruption At Ports Leadership",
      "2021-06-17":
        "APC, PDP clash as INEC releases Ekiti guber election timetable@@@ EFCC confirms Orji Kalu will be prosecuted all over again@@@ How bandits used a parent’s vehicle to evacuate abducted Kebbi students@@@ We’ll bring perpetrators of Iwo Road violence to book – Makinde Independent@@@ Kenneth Kaunda, Zambia’s founding father dies aged 97 Business Hallmark@@@ Court voids probe of Ondo Chief Judge over viral video Ripples Nigeria@@@ Buhari directs security agencies to give no breathing space to terrorists, criminals Daily Nigerian@@@ Reps moves to check NBC’s seeming excesses Nigerian Guardian@@@ Twitter Ban: PDP knocks Buhari over comment on governors@@@ $37.5m scandal: Buhari's anti-corruption fight a circus show@@@ Uniben Don shot dead in Edo@@@ EndSARS Protester, Nicholas Mbah, Freed After 8 Months In Prison@@@ Iheanacho ‘Attacked’ For Visiting Governor Yahaya Bello Of Kogi",
      "2021-06-18":
        "Benue 2023: Gemade formally informs Jechira traditional rulers of his intention to contest@@@ NEMA advises residents as another tanker crashes, spills content in Lagos@@@ Delta State DG Orders Journalist’s Arrest@@@ Nigeria earned $34.2bn from Oil and Gas sector in 2019@@@ Bauchi health agency moves to contain gastroenteritis@@@ FG earmarks N1.13bn for cattle grazing projects, insists on routes recovery@@@ NNPC boss says rising oil prices will create problems for Nigeria@@@ Ogun: Dangote truck set ablaze for crushing okada rider, passenger to death@@@ UN General Assembly calls for end to arms deliveries to Myanmar Premium Times@@@ Oyetola’s administration self-serving, irresponsible – Osun PDP Daily Post11:06 OML 150: Relief for Conoil as Host Communities Settle Leadership Dispute@@@ FRSC RS5 Zonal Commander Tasks Special Marshals on Diligence@@@ Be Ready to Manage Severe Turbulence in Rainy Season, NiMet Cautions Pilots@@@ ASUU threatens strike over non payment of salaries, remittance of check off dues@@@ Obasanjo: Your days are numbered – Bamgbose slams Femi Adesina@@@ CBN to sell N722bn treasury bills in Q3@@@ 16-Year-Old Girl Connives With Boyfriend To Fake Kidnap, Demands N500,000@@@ Bagudu visits school, pledges support to security agencies@@@ Ogun LG polls: PDP drags OGSIEC to court@@@ Yauri abduction: Why Kebbi didn’t close school despite report of bandits’ presence@@@ ‘We will terminate anyone opposed to troops’ victory against terrorists’ – Gen Musa@@@ Ethiopia Election: Tigray conflict raises concerns@@@ Nigeria’s President Buhari hardly shows empathy during national disasters@@@ Akwa Ibom Group declares ‘Ibom Republic’, heads to UN for Secession@@@ Many Nigerians to fall into poverty as unemployment rises",
      "2021-06-19":
        "Gov. Bagudu: Kebbi bandits overpowered 22 crack policemen to abduct students@@@ 8 Confirmed dead in Lagos LPG explosion@@@ Ibadan Mayhem: Auxillary working for Gov. Makinde, we expelled him in 2011, NURTW says@@@ Hardline judiciary chief Raisi wins Iran’s presidential election@@@ JAMB says 95% of UTME candidates met NIN requirement, to organize mop up exams@@@ Nigeria earned $34.2bn from Oil and Gas sector in 2019@@@ JAMB 2021 UTME commences nationwide Nigerian@@@ NGX suspends trading in GTBank shares@@@ ASUU announces plans to embark on fresh strike@@@ ASUU to begin fresh strike PM News@@@ How #TwitterBan is limiting access to justice, shrinking civic space@@@ Bauchi residents lament erratic power supply@@@ NOA, NTA collaborate on communication dissemination of government policies Nigerian@@@ Air travel cost in Nigeria rises by 18 percent@@@ NESG faults Buhari, says more Nigerians pushed into poverty in 2020@@@ APGA Conflict: Oye recognised as authentic party chair by INEC@@@ Thumbprint error mars 60 applicants from partaking in UTME in Ondo@@@ Controversy trails death of teen hit by stray bullet in Delta@@@ One student confirmed dead, four others rescued from terrorists in Kebbi@@@ Dangote Truck Set Ablaze In Ondo For Crushing Two To Death@@@ NEMA advises residents as another tanker crashes, spills content in Lagos@@@ Insecurity: Protesting villagers block Kaduna-Abuja highway",
    })) {
      await firebaseAdmin
        .firestore()
        .collection("news")
        .doc(key)
        .set({
          date: firebaseAdmin.firestore.Timestamp.now(),
          flash: value,
        })
        .then()
        .catch((error) => {
          throw new TypeError(error);
        });
    }

    return res.status(200).send(true);
  } catch (error) {
    // console.log(error);
    return res.status(401).send(false);
  }
};
