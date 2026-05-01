export interface Testimonial {
  id: string;
  name: string;
  text: string;
  photo: string;
}

const getDirectDriveLink = (url: string | undefined): string => {
  if (!url) return "/Avatar.png";
  const match = url.match(/\/d\/(.+?)(?:\/|$|\?)/) || url.match(/id=(.+?)(?:&|$)/);
  return match ? `https://lh3.googleusercontent.com/d/${match[1]}` : url;
};

export const testimonialsData: Testimonial[] = [
  {
    id: "1",
    name: "ADAKANOU Hériter",
    text: "Participer au challenge des Pros de la Tech a été une expérience très enrichissante pour moi. La phase de personal branding m’a aidé à développer une vraie présence sur LinkedIn, à être plus discipliné et constant, et à créer l’habitude d’apprendre et de partager régulièrement. Ensuite, la phase de design, plus exigeante et compétitive, m’a permis d’améliorer mes compétences et ma rigueur. Mais ce qui me marque le plus, c’est qu’on est en train de construire une petite communauté, une sorte de nouvelle famille, avec de nouveaux amis, de nouvelles connaissances, et même pour certains des mentors trouvés à travers les formations. Au final, ce challenge m’a permis de grandir, de renforcer mon réseau et d’évoluer avec d’autres personnes motivées.",
    photo: getDirectDriveLink("https://drive.google.com/file/d/1ytnPGnfI-4hSDXDMwjnt_UtS-aR7HbYX/view?usp=drive_link"),
  },
  {
    id: "2",
    name: "ADJIVON Yao Clément",
    text: "Franchement, mon expérience chez les Pros de la Tech est très positive.\n\nDepuis le début, j’ai surtout appris à être plus constant et à passer à l’action. Les challenges m’ont aidé à sortir de ma zone de confort, que ce soit pour publier sur LinkedIn ou travailler sur le design.\n\nCe que j’aime le plus, c’est l’aspect pratique. On ne reste pas juste dans la théorie, on fait réellement des choses.\nAujourd’hui, je vois déjà une différence dans ma manière de réfléchir, de travailler et de me présenter.",
    photo: getDirectDriveLink("https://drive.google.com/file/d/1snuLsCydyFYnrDqcTfJY7peoPiZVyJbm/view?usp=drive_link"),
  },
  {
    id: "3",
    name: "AMANA Essoninam Roi",
    text: "Depuis le début du programme, j’ai déjà acquis de nouvelles compétences et une meilleure compréhension, autant sur le plan personnel que professionnel. Ce que j’apprécie particulièrement, c’est l’esprit de communauté, le partage d’expériences et l’accompagnement des formateurs. Cela m’aide à gagner en discipline, en confiance et à mieux structurer ma progression. Même si mon parcours est toujours en cours, je vois déjà des résultats concrets. Je remercie sincèrement toute la communauté, les encadrants et les challengers pour leur soutien et leur motivation constante.",
    photo: getDirectDriveLink("https://drive.google.com/file/d/1fw4HVfJgxG4N0VmRdDB-fnQ7DTjgJ7sc/view?usp=drive_link"),
  },
  {
    id: "4",
    name: "AMOUZOU Edem Wilfried",
    text: "Ma participation à la première cohorte des Pros de la Tech a été un véritable catalyseur. Plus que de simples formations et challenges intensifs en design, web et Personal Branding, j'ai pu transformer la théorie en compétences concrètes. Cette immersion m'a donné l'agilité nécessaire pour me démarquer sur le terrain. Aujourd'hui, la rigueur acquise reste un pilier essentiel qui booste ma carrière au quotidien.",
    photo: getDirectDriveLink("https://drive.google.com/file/d/15xVvEYloNwVc44NMgXpmCwq2nSQlZIOg/view?usp=drive_link"),
  },
  {
    id: "5",
    name: "AMOUZOU-ABLO Cédric Jean-Marc",
    text: "J'ai commencé mon parcours avec Les Pros de la Tech en tant que challenger, car je voulais apprendre et progresser. Maintenant, je dirige les activités de la communauté.\n\nGrâce à cette expérience, j'ai acquis plus que des compétences techniques. J'ai appris à être rigoureux et constant, et j'ai compris que passer à l'action est essentiel. Chez Les Pros de la Tech, on ne se contente pas d'apprendre, on met en pratique ce que l'on apprend, on évolue et on prend position.\n\nLa force de Les Pros de la Tech réside dans sa vision. L'objectif est de former des personnes qui pourront à leur tour devenir des acteurs de la communauté. Cela signifie former, accompagner et contribuer à des projets concrets.\n\nMême aujourd'hui, mon expérience avec Les Pros de la Tech a un impact direct sur mon parcours.\n\nLes Pros de la Tech, ce n'est pas seulement une formation. C'est un système qui permet de créer des acteurs capables de prendre leur place dans la communauté.",
    photo: getDirectDriveLink("https://drive.google.com/file/d/1arOErx5Y94AWFJX4aW7KILXhX5CYByVi/view?usp=drive_link"),
  },
  {
    id: "6",
    name: "BOUKARY Schéba",
    text: "Avant les challenges des Pros de la Tech, j'utilisais LinkedIn sans vraiment en maîtriser les codes ni l'art d'en faire un levier d'opportunités. Ce parcours a totalement changé ma vision du réseau.\n\nCôté Design, j'avançais seule sans progresser ; aujourd'hui, je vois enfin une réelle évolution. Mon but est de devenir une référence dans ce domaine, et je sais qu'avec de la persévérance, j'y arriverai. Un grand merci à M. Leonel et à toute l'équipe pour la qualité des formations.\n\nLe challenge me pousse aussi à me dépasser : le niveau des autres me motive à donner le meilleur de moi-même. Mon classement actuel n'est qu'un début... préparez-vous pour la remontada ! Merci encore. 🙏🏽",
    photo: getDirectDriveLink("https://drive.google.com/file/d/1zHgsANpeVUzhP8mi0a3A99i0-u1Y3w-y/view?usp=drive_link"),
  },
  {
    id: "7",
    name: "DIALLO Khadidja",
    text: "Le personal branding a été un vrai déclencheur : sortir de sa zone de confort pour définir qui l'on veut devenir, c'est intimidant mais tellement nécessaire. Aujourd'hui, je m'éclate sur le Design et je vois mes compétences grimper de jour en jour. Ce que je retiens de l'aventure, c'est cette rigueur nouvelle et ce plaisir de la compétition saine. On n'apprend pas juste à coder ou à designer, on apprend à croire en son potentiel.",
    photo: getDirectDriveLink("https://drive.google.com/file/d/1X8Z7ZXUI0Mho11qcmtw5VioL7brNxDnj/view?usp=drive_link"),
  },
  {
    id: "8",
    name: "DIALLO Mariyama Sadio",
    text: "Franchement, participer aux challenges des Pros de la Tech, c’est une sacrée expérience. Au début, je voyais ça comme de simples exercices, mais j’ai vite compris que c’était bien plus que ça. Le premier défi sur le personal branding m’a vraiment forcée à réfléchir : qu’est-ce que je veux faire ? Qui je veux devenir ? Ça m'a donné une clarté que je n'avais pas. Et là, sur le Design, je m'éclate ! Je sens que je progresse pour de bon. Ce que j'en retiens surtout, c'est la discipline. J'apprends à ne pas lâcher, à être rigoureuse et, surtout, à croire en ce que je suis capable de créer.",
    photo: getDirectDriveLink("https://drive.google.com/file/d/1s3SIh1QmV5n6No2IC8H2NkEtiXtFqiMB/view?usp=drive_link"),
  },
  {
    id: "9",
    name: "DUGLI Emmanuella Alix",
    text: "Je suis Emmanuella, challenger de la cohorte 1 ! Avant, je n’osais pas me lancer, mais les challenges m'ont aidée à passer ce cap grâce à une discipline quotidienne en design, en web et sur LinkedIn. Les formations avec Mr Léonel m’ont permis d’y voir plus clair sur l’IA et de prendre confiance en prenant la parole lors des sessions et meetups. Aujourd’hui, je collabore avec des profils tech, je comprends leur travail et je n’ai plus peur de ce qui était nouveau pour moi. Je suis très contente d’avoir fait partie de cette cohorte. Merci LPT !",
    photo: getDirectDriveLink("https://drive.google.com/file/d/16-Dn_Ix6x4jiFRpoyoDV9NzDCUO9gWFV/view?usp=drive_link"),
  },
  {
    id: "10",
    name: "FANGBEMI Abla Ilétou",
    text: "Participer au challenge des Pros de la Tech est une expérience incroyable. Le volet personal branding a été un vrai déclencheur : il m'a permis de renouer avec des contacts précieux qui m'aident aujourd'hui à progresser.\n\nC’est aussi une chance immense d'accéder gratuitement à des formations de cette qualité. Côté Design, j'avais une certaine appréhension, mais ce challenge m'a prouvé qu'avec du travail et de la pratique, tout devient accessible.\n\nUn grand merci pour tous vos efforts et votre accompagnement. J'ai hâte de découvrir les prochains challenges qui s'annoncent passionnants !",
    photo: getDirectDriveLink("https://drive.google.com/file/d/1tvIqZzNf4Sy_DlCbKygMXtWV3sMMNhmj/view?usp=drive_link"),
  },
  {
    id: "11",
    name: "FOLIKPO-AWUTE Dzogoedzikpe Sophos",
    text: "Ce que j’aime dans mon aventure aux Pros de la Tech, c’est avant tout comment tout a commencé : j’ai rejoint la communauté grâce à quelqu’un dans mon école qui m’inspirait beaucoup et qui m’a parlé de tout ce qu’il avait appris ici. Ça m’a motivé à tenter l’aventure en tant que challenger. Ce que j’apprécie le plus aujourd’hui, c’est cet esprit de famille : quand tu as un problème, tu peux écrire à n’importe quel challenger ou même aux organisateurs, et tu reçois toujours de l’aide. J’ai aussi appris à développer mon personal branding et j’ai découvert une vraie passion pour le design, alors qu’au début je pensais que ce serait difficile. Finalement, j’ai compris que c’est surtout une question de pratique, d’inspiration et de passion. Ce que je retiens surtout, c’est l’esprit d’équipe, l’ambiance fun et le soutien constant, notamment lors des meetups que j’aime beaucoup.",
    photo: getDirectDriveLink("https://drive.google.com/file/d/101TeQezVxBRuptWElSEOApkDl-PEHHDU/view?usp=drive_link"),
  },
  {
    id: "12",
    name: "KOUYAKOUTILI Essowassam Stella",
    text: "Mon expérience avec les Pros de la Tech est hyper enrichissante. Le challenge de personal branding m'a vraiment aidée à mieux me connaître et à structurer mes contenus en ligne.\n\nAu-delà de la technique, être challenger booste mon développement personnel : j'y gagne en discipline, en confiance et en constance. Ce que j'adore, c'est cet esprit d'entraide qui nous pousse tous à sortir de notre zone de confort. Je repars plus motivée que jamais à évoluer dans la tech.\n\nMerci ! Thanks you.",
    photo: getDirectDriveLink("https://drive.google.com/file/d/16HOMP9JTDg6M22AtfafX-2XWpIf76QvY/view?usp=drive_link"),
  },
  {
    id: "13",
    name: "NAZA Charbel",
    text: "Je tiens à exprimer ma sincère gratitude envers la communauté des Pros de la Tech ainsi qu’envers nos formateurs. Un grand merci à Monsieur Sadate ISSIFOU, Parfait TOKE, Saturnin Jason et Monsieur Lionel ADAGBE pour la qualité de leurs formations, vraiment enrichissantes, qui nous permettent d’évoluer rapidement, notamment en personal branding et actuellement à travers le challenge design avec la création régulière de visuels. Cette rigueur mérite d’être saluée. Je renouvelle donc mon engagement à continuer ces challenges qui, même s’ils peuvent parfois sembler exigeants, restent extrêmement formateurs et gratifiants. Merci à tous.",
    photo: getDirectDriveLink("https://drive.google.com/file/d/1P8dHuaaHE1nDNKFUS70imZh0eQ7r-jMN/view?usp=drive_link"),
  },
  {
    id: "14",
    name: "PEREIRA DA SILVA Péniel",
    text: "Au départ, je voyais ça comme de simples exercices, mais j'ai réalisé que ça m'a surtout appris la discipline. J'ai tendance à me lasser vite : dès que je saisis le concept, je passe à autre chose. Mais là, j'ai tenu bon jusqu'au bout ! La compétition a rendu l'expérience super stimulante. J'ai compris que chaque détail compte, que ce soit dans la reproduction de designs ou le personal branding (choisir le bon ton, se démarquer quand tout le monde dit la même chose...). Finalement, au-delà de la technique, je repars avec de la rigueur et une vraie force mentale.",
    photo: getDirectDriveLink("https://drive.google.com/file/d/1ko4zJLcEuKt_Mu4vgqaR_G00nee-oZPe/view?usp=drive_link"),
  },
  {
    id: "15",
    name: "SOKPA Edo Yao",
    text: "En tant que participant de la cohorte 1 des Challengers des Pros de la Tech, j’ai découvert et développé une vraie passion pour le design. Aujourd’hui, je peux fièrement me qualifier de designer.\n\nL’accompagnement, les challenges et l’esprit de communauté ont été déterminants dans mon évolution.\n\nPetit coucou et merci à Mr Leonel Adagbé pour l’inspiration et l’encadrement",
    photo: "/Avatar.png",
  },
  {
    id: "16",
    name: "TCHIWANOU BLEOSSI Don de Dieu Isaac Napoléon",
    text: "Ces challenges ont été un véritable moteur pour moi. Au-delà de la technique, j'y ai gagné en discipline et en clarté, ce qui a totalement transformé ma façon de travailler.\n\nC’est une expérience intense qui m’a poussée à sortir de ma zone de confort et qui me donne aujourd'hui des bases solides pour la suite. Un grand merci aux Pros de la Tech et aux formateurs pour cet accompagnement qui marque une étape clé de mon parcours.",
    photo: getDirectDriveLink("https://drive.google.com/file/d/1eSNFxbkbJ6RTWnT_Lw0QnuxWA-9E9hc-/view?usp=drive_link"),
  },
  {
    id: "17",
    name: "TOSSA Yao Kévin",
    text: "Bonjour, je suis Yao Kevin TOSSA, logisticien de formation et passionné d’IA et de création de contenu. Mon expérience aux challenges des Pros de la Tech a été à la fois enrichissante et challengeante. J’y ai acquis de solides compétences, notamment en graphic design et en UI/UX. Même si les parties en développement web et mobile m’ont parfois mis en difficulté 😅, elles m’’ont surtout permis de progresser. J’ai aussi beaucoup apprécié la qualité des formations et la disponibilité des formateurs. Aujourd’hui, cette expérience continue d’avoir un impact positif sur mon quotidien, et je remercie les promoteurs pour cette belle initiative.",
    photo: getDirectDriveLink("https://drive.google.com/file/d/14oBCwq8Z6-uQYoRbuPHUdDDlTBv_HfJg/view?usp=drive_link"),
  },
];
