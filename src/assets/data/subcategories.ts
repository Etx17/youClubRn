interface ISubcategories {
    [key: string]: {
      label: string;
      value: string;
    }[];
  }
const subcategories: ISubcategories = {
    "Sports, activités de plein air": [
        { label: "Toutes", value: "all" },
        { label: "Non catégorisé", value: "all" },
        { label: "⚽ Football (football, futsal)", value: "Football (football, futsal)" },
        { label: "🤸 Gymnastique (gymnastique, gymnastique d’entretien, éducation physique, yoga), aérobic", value: "Gymnastique (gymnastique, gymnastique d’entretien, éducation physique, yoga), aérobic" },
        { label: "🥋 Autres arts martiaux (karaté, aïkido, taekwondo)", value: "Autres arts martiaux (karaté, aïkido, taekwondo)" },
        { label: "🐴 Equitation (équitation, hippisme, course camarguaise, landaise)", value: "Equitation (équitation, hippisme, course camarguaise, landaise)" },
        { label: "🤼‍♂️ Associations multisports locales", value: "associations multisports locales" },
        { label: "🥊 Sports de combat (boxe, kick box, boxe thaï, lutte)", value: "Sports de combat (boxe, kick box, boxe thaï, lutte)" },
        { label: "🚴 Cyclisme (cyclisme, vélo, VTT, y c course d’orientation à vélo, cyclotourisme)", value: "Cyclisme (cyclisme, vélo, VTT, y c course d’orientation à vélo, cyclotourisme)" },
        { label: "🚶 Marche sportive (randonnée pédestre, raid, trekking, course orientation)", value: "Marche sportive (randonnée pédestre, raid, trekking, course orientation)" },
        { label: "🎲 Boules (pétanque, boules)", value: "Boules (pétanque, boules)" },
        { label: "🏅 Associations pour la promotion du sport, médailles, mérite sportif", value: "associations pour la promotion du sport, médailles, mérite sportif" },
        { label: "🌳 Activités de plein air (dont saut à l’élastique)", value: "activités de plein air (dont saut à l’élastique)" },
        { label: "🎯 Tir (tir à l’arc, tir à balle, ball trap), javelot", value: "Tir (tir à l’arc, tir à balle, ball trap), javelot" },
        { label: "🎓 Associations multisports scolaires ou universitaires", value: "associations multisports scolaires ou universitaires" },
        { label: "🏉 Rugby (rugby à 13, à 15)", value: "Rugby (rugby à 13, à 15)" },
        { label: "💃 Danse sportive (danse sportive, hip hop, claquettes)", value: "Danse sportive (danse sportive, hip hop, claquettes)" },
        { label: "🎾 Tennis (tennis, longue paume)", value: "Tennis (tennis, longue paume)" },
        { label: "🏃 Athlétisme (triathlon, pentathlon, footing, jogging)", value: "Athlétisme (triathlon, pentathlon, footing, jogging)" },
        { label: "🏟️ Gestion d’équipements sportifs, organisation de rencontres sportives, organisation de championnats, clubs de supporters", value: "gestion d'équipements sportifs, organisation de rencontres sportives, organisation de championnats, clubs de supporters" },
        { label: "🏀 Basket-ball", value: "Basket-ball" },
        { label: "🌊 Nautisme, glisse sur eau (ski nautique, surf, char à voile)", value: "nautisme, glisse sur eau (ski nautique, surf, char à voile)" },
        { label: "⛵ Voile (voile, dériveur, planche à voile)", value: "Voile (voile, dériveur, planche à voile)" },
        { label: "🏊 Natation - Baignade (natation, plongée)", value: "Natation - Baignade (natation, plongée)" },
        { label: "🛩️ Sports aériens (avion, planeur, ULM, parachutisme)", value: "Sports aériens (avion, planeur, ULM, parachutisme)" },
        { label: "🥋 Judo", value: "Judo" },
        { label: "🏂 Sports de neige (ski alpin, ski de fond, snowboard), montagne", value: "Sports de neige (ski alpin, ski de fond, snowboard), montagne" },
        { label: "🤾 Handball", value: "Handball" },
        { label: "🦽 Handisport", value: "handisport" },
        { label: "🛹 Roller, skate", value: "Roller, skate" },
        { label: "🏓 Tennis de table (tennis de table, ping-pong)", value: "Tennis de table (tennis de table, ping-pong)" },
        { label: "⛳ Golf", value: "Golf" },
        { label: "🏢 Associations multisports d’entreprise", value: "associations multisports d’entreprise" },
        { label: "🏐 Volley ball (volley, beach volley)", value: "Volley ball (volley, beach volley)" },
        { label: "🏈 Autres sports collectifs (baseball, hockey sur glace, football américain)", value: "Autres sports collectifs (baseball, hockey sur glace, football américain)" },
        { label: "🧗 Escalade, montagne (escalade, spéléologie, via ferrata, canyonisme, alpinisme)", value: "Escalade, montagne (escalade, spéléologie, via ferrata, canyonisme, alpinisme)" },
        { label: "💪 Musculation (culturisme, musculation)", value: "Musculation (culturisme, musculation)" },
        { label: "🚣 Aviron, canoë kayak (aviron, rafting, canoë kayak, joutes)", value: "Aviron, canoë kayak (aviron, rafting, canoë kayak, joutes)" },
        { label: "🤺 Escrime", value: "Escrime" },
        { label: "🏒 Hockey sur glace, sports de glace", value: "hockey sur glace, sports de glace" },
        { label: "💪 Haltérophilie", value: "Haltérophilie" },
        { label: "🏸 Badminton (badminton, squash, pelote basque)", value: "Badminton (badminton, squash, pelote basque)" },
        { label: "Non categorisé", value: "Non categorisé" }
    ],
    "culture, pratiques d’activités artistiques, culturelles": [
        { label: "🎤 Chant choral et musique", value: "chant choral, musique" },
        { label: "🎨 Promotion de l’art et des artistes", value: "promotion de l’art et des artistes" },
        { label: "🎭 Théâtre, marionnettes, cirque, spectacles de variété", value: "théâtre, marionnettes, cirque, spectacles de variété" },
        { label: "💃 Danse", value: "danse" },
        { label: "🧪 Loisirs scientifiques et techniques", value: "loisirs scientifiques et techniques" },
        { label: "🧶 Artisanat, travaux manuels, bricolage et expositions", value: "artisanat, travaux manuels, bricolage, expositions" },
        { label: "🎥 Photographie, cinéma (dont ciné-clubs)", value: "photographie, cinéma (dont ciné-clubs)" },
        { label: "📝 Expression écrite, littérature, poésie", value: "expression écrite, littérature, poésie" },
        { label: "🎨 Arts graphiques, bande dessinée, peinture, sculpture, architecture", value: "arts graphiques, bande dessinée, peinture, sculpture, architecture" },
        { label: "🌍 Folklore", value: "folklore" },
        { label: "🗣️ Langues, dialectes et patois", value: "langues, dialectes, patois" },
        { label: "📚 Bibliothèques, ludothèques, discothèques et vidéothèques", value: "bibliothèques, ludothèques, discothèques, vidéothèques" },
        { label: "🎨 Arts de la rue", value: "arts de la rue" }
    ],
    "amicales, groupements affinitaires, groupements d’entraide (hors défense de droits fondamentaux": [
        { label: "🤝 Groupements d’entraide et de solidarité", value: "groupements d’entraide et de solidarité" },
        { label: "🌍 Amicale de personnes originaires d’un même pays", value: "amicale de personnes originaires d’un même pays (hors défense des droits des étrangers)" },
        { label: "💼 Organisation de professions", value: "organisation de professions (hors caractère syndical)" },
        { label: "♿ Associations de personnes en situation de handicap", value: "associations de personnes en situation de handicap pour l’entraide et la solidarité (hors défense de droits fondamentaux)" },
        { label: "👥 Association du personnel d’une entreprise (hors caractère syndical)", value: "association du personnel d’une entreprise (hors caractère syndical)" },
        { label: "👴 Associations de classe d’âge", value: "associations de classe d’âge" },
        { label: "🗺️ Amicale de personnes originaires d’une même région", value: "amicale de personnes originaires d’une même région" },
        { label: "👩 Associations féminines pour l’entraide et la solidarité", value: "associations féminines pour l’entraide et la solidarité (hors défense de droits fondamentaux)" },
        { label: "🏳️‍🌈 Associations de personnes homosexuelles pour l’entraide et la solidarité (hors défense de droits fondamentaux)", value: "associations de personnes homosexuelles pour l’entraide et la solidarité (hors défense de droits fondamentaux)" }
    ],
    "éducation formation": [
        { label: "🎓 Établissement de formation professionnelle, formation continue", value: "établissement de formation professionnelle, formation continue" },
        { label: "👨‍🎓 Associations d’étudiants, d’élèves", value: "associations d’étudiants, d’élèves" },
        { label: "👪 Parents d’élèves", value: "parents d’élèves" },
        { label: "🤝 Associations périscolaires, coopération, aide à l’enseignement", value: "associations périscolaires, coopération, aide à l’enseignement" },
        { label: "🎓 Centre d’enseignement et de formation", value: "centre d'enseignement et de formation" },
        { label: "👴 Amicales, associations d’anciens étudiants, d’anciens élèves", value: "amicales, associations d’anciens étudiants, d’anciens élèves" },
        { label: "🏫 Amicales, personnel d’établissements scolaires ou universitaires", value: "amicales, personnel d’établissements scolaires ou universitaires" },
        { label: "🗣️ Études et formations linguistiques", value: "études et formations linguistiques" },
        { label: "🛫 Organisation, financement de voyages d’études, d’échanges, pour scolaires ou universitaires", value: "organisation, financement de voyages d’études, d’échanges, pour scolaires ou universitaires" },
        { label: "👨‍🔧 Apprentissage", value: "apprentissage" },
        { label: "🏫 Organisme de gestion d’établissement d’enseignement général et technique", value: "organisme de gestion d’établissement d’enseignement général et technique" },
        { label: "👨‍🏫 Organisation de professions enseignantes, amicales de personnel", value: "organisation de professions enseignantes, amicales de personnel" },
        { label: "🎓 Promotion de titres, de diplômes", value: "promotion de titres, de diplômes" },
        { label: "❤️ Œuvres sociales en faveur des élèves, œuvres en faveur pupilles de la nation", value: "œuvres sociales en faveur des élèves, œuvres en faveur pupilles de la nation" },
        { label: "🎓 Organisme de gestion d’établissement d’enseignement supérieur", value: "organisme de gestion d’établissement d’enseignement supérieur" },
        { label: "🏡 Maisons familiales rurales", value: "maisons familiales rurales" }
      ],
    "clubs de loisirs, relations" : [
        { label: "🤝 échanges locaux, réseaux d’échanges", value: "échanges locaux, réseaux d'échanges" },
        { label: "🎉 activités festives (soirées…)", value: "activités festives (soirées…)" },
        { label: "🧘 relaxation, sophrologie", value: "relaxation, sophrologie" },
        { label: "🏞️ centres de loisirs, clubs de loisirs multiples", value: "centres de loisirs, clubs de loisirs multiples" },
        { label: "♟️ bridge, jeux de cartes, échecs, dames, jeux de société...", value: "bridge, jeux de cartes, échecs, dames, jeux de société..." },
        { label: "🍷 gastronomie, œnologie, confréries, gourmets", value: "gastronomie, œnologie, confréries, gourmets" },
        { label: "🐾 animaux familiers, colombophilie, aquariophilie", value: "animaux familiers, colombophilie, aquariophilie" },
        { label: "🌺 jardins ouvriers, floralies", value: "jardins ouvriers, floralies" },
        { label: "🚗 collectionneurs de véhicules, clubs amateurs de voitures anciennes", value: "collectionneurs de véhicules, clubs amateurs de voitures anciennes" },
        { label: "👥 cercles privés, fan-clubs", value: "cercles privés, fan-clubs" },
        { label: "🐶 élevage canin, clubs de chiens de défense", value: "élevage canin, clubs de chiens de défense" },
        { label: "🗞️ clubs de collectionneurs (hors sauvegarde, entretien du patrimoine), philatélie, numismatique", value: "clubs de collectionneurs (hors sauvegarde, entretien du patrimoine), philatélie, numismatique" },
        { label: "🚁 modélisme", value: "modélisme" },
        { label: "🎱 billard, quilles", value: "billard, quilles" },
        { label: "✈️ aéroclubs", value: "aéroclubs" },
        { label: "📻 radioamateurs", value: "radioamateurs" }
    ],
    "Environnement, cadre de vie":[
        { label: "🛠️ Défense et amélioration du cadre de vie", value: "défense et amélioration du cadre de vie" },
        { label: "📚 Sensibilisation et éducation à l’environnement et au développement durable", value: "actions de sensibilisation et d'éducation à l'environnement et au développement durable" },
        { label: "🦜 Protection des animaux", value: "protection des animaux" },
        { label: "🌱 Mouvements écologiques", value: "mouvements écologiques" },
        { label: "🛡️ Comités de défense et de sauvegarde", value: "comités de défense, de sauvegarde" },
        { label: "🌲 Protection de sites naturels", value: "protection de sites naturels" },
        { label: "🍃 Espaces naturels", value: "espaces naturels" },
        { label: "🐘 Préservation de la faune sauvage", value: "préservation de la faune sauvage" },
        { label: "⚡ Ressources naturelles", value: "ressources naturelles"},
        { label: "🚮 Pollutions et assainissement", value: "pollutions, assainissement"},
        { label: "🌼 Préservation de la flore sauvage", value: "préservation de la flore sauvage" },
    ],
    // "Conduite d’activités économiques":[
    //     { label: "💼 Association à but commercial, développement économique", value: "Association à but commercial, développement économique" },
    //     { label: "🏬 Amicales de commerçants, organisation de foires", value: "Amicales de commerçants, organisation de foires" },
    //     { label: "🛍️ Groupement d’achats, groupement d’entreprises", value: "Groupement d’achats, groupement d’entreprises" },
    //     { label: "💰 Gestion financière, gestion immobilière", value: "Gestion financière, gestion immobilière" },
    //     { label: "🍽️ Cantines, restaurants d’entreprises", value: "Cantines, restaurants d’entreprises" },
    //     { label: "🚐 Transports", value: "Transports" },
    //     { label: "🏛️ Chambres de commerce, chambres économiques", value: "Chambres de commerce, chambres économiques" },
    //     { label: "💰 Caisses de retraite, de prévoyance, de pensions", value: "Caisses de retraite, de prévoyance, de pensions" },
    //     { label: "🤝 Caisses de congés payés, caisses de secours", value: "Caisses de congés payés, caisses de secours" }
    // ],
    // "Action socio-culturelle": [
    //     { label: "🌍 Jumelages, échanges culturels", value: "Jumelages, échanges culturels" },
    //     { label: "🎉 Comités des fêtes", value: "Comités des fêtes" },
    //     { label: "👴 Clubs du troisième âge", value: "Clubs du troisième âge" },
    //     { label: "🧑‍🎓 Mouvements éducatifs de jeunesse et d’éducation populaire", value: "Mouvements éducatifs de jeunesse et d’éducation populaire" },
    //     { label: "🌟 Associations socio-éducatives, scoutisme", value: "Associations socio-éducatives, scoutisme" },
    //     { label: "🏠 Maisons de jeunes, foyers, clubs de jeunes", value: "Maisons de jeunes, foyers, clubs de jeunes" },
    //     { label: "♿️ Loisirs pour personnes en situation de handicap", value: "Loisirs pour personnes en situation de handicap" },
    //     { label: "🎭 Majorettes, twirlings, carnavals, défilés", value: "Majorettes, twirlings, carnavals, défilés" },
    //     { label: "🎭 Maisons de la culture, office municipal, centres culturels", value: "Maisons de la culture, office municipal, centres culturels" },
    //     { label: "🌾 Foyers ruraux", value: "Foyers ruraux" },
    //     { label: "🏕️ Centres aérés, colonies de vacances", value: "Centres aérés, colonies de vacances" }
    // ],
    "associations caritatives, humanitaires, aide au développement, développement du bénévolat": [
        { label: "🌍 Associations caritatives intervenant au plan international", value: "associations caritatives intervenant au plan international" },
        { label: "🤝 Associations caritatives à buts multiples", value: "associations caritatives à buts multiples" },
        { label: "🚚 Secours en nature, distribution de nourriture et de vêtements", value: "secours en nature, distribution de nourriture et de vêtements" },
        { label: "💰 Secours financiers et autres services aux personnes en difficulté", value: "secours financiers et autres services aux personnes en difficulté" },
        { label: "🤝👥 Développement du bénévolat", value: "développement du bénévolat" }
    ],
    "santé": [
        { label: "🆘 Accompagnement, aide aux malades", value: "accompagnement, aide aux malades" },
        { label: "📚 Organisation de professions médicales ou paramédicales", value: "organisation de professions médicales ou paramédicales" },
        { label: "🔬 Recherche médicale", value: "recherche médicale" },
        { label: "🍃 Homéopathie, médecines douces", value: "homéopathie, médecines douces" },
        { label: "📚 Éducation sanitaire, prévention générale", value: "éducation sanitaire, prévention générale" },
        { label: "🥗 Hygiène, diététique", value: "hygiène, diététique" },
        { label: "🏥 Prévention et dépistage de maladies (autres que le sida)", value: "prévention et dépistage de maladies (autres que le sida)" },
        { label: "👥 Associations de personnes malades, ou anciens malades", value: "associations de personnes malades, ou anciens malades" },
        { label: "💰 Financement de la recherche médicale", value: "financement de la recherche médicale" },
        { label: "🏥 Cliniques, centres médicaux, hôpitaux, sanatoriums, établissements de rééducation, maisons de convalescence", value: "cliniques, centres médicaux, hôpitaux, sanatoriums, établissements de rééducation, maisons de convalescence" },
        { label: "🏥 Dispensaires, soins infirmiers, services paramédicaux, de garde", value: "dispensaires, soins infirmiers, services paramédicaux, de garde" },
        { label: "💉 Don de sang, d’organes", value: "don de sang, d’organes" },
        { label: "🐶 Médecine animale, vétérinaire", value: "médecine animale, vétérinaire" },
        { label: "🧑‍⚕️ Organisation de congrès médicaux", value: "organisation de congrès médicaux" },
        { label: "🚑 Services médicaux d’urgence", value: "services médicaux d’urgence" },
        { label: "💉 Gestion de matériel médical", value: "gestion de matériel médical" },
        { label: "🏥 Hôpitaux psychiatriques, soins ambulatoires en santé mentale", value: "hôpitaux psychiatriques, soins ambulatoires en santé mentale" },
        { label: "🏭 Médecine du travail", value: "médecine du travail" },
        { label: "🏥 Prévention et dépistage du sida", value: "prévention et dépistage du sida" },
        { label: "🏋️‍♀️ Centres de réadaptation", value: "centres de réadaptation" },
        { label: "🤰 Accueil, information pour contraception et avortement", value: "accueil, information pour contraception et avortement" }
    ],
    // "Représentation, promotion et défense d’intérêts économiques":[
    //     { label: "🌱 Associations d’exploitants agricoles, élevage, horticulture, aviculture, apiculture, viticulture, viniculture", value: "Associations d’exploitants agricoles, élevage, horticulture, aviculture, apiculture, viticulture, viniculture" },
    //     { label: "💼 Représentation d’intérêts économiques sectoriels", value: "Représentation d’intérêts économiques sectoriels" },
    //     { label: "🗺️ Représentation d’intérêts régionaux et locaux", value: "Représentation d’intérêts régionaux et locaux" },
    //     { label: "👥 Groupements professionnels", value: "Groupements professionnels" },
    //     { label: "🛍️ Associations pour la représentation d’artisans, de commerçants", value: "Associations pour la représentation d’artisans, de commerçants" },
    //     { label: "🛒 Mouvements de consommateurs", value: "Mouvements de consommateurs" },
    //     { label: "👵 Associations de défense d’intérêts des retraités ou des personnes âgées", value: "Associations de défense d’intérêts des retraités ou des personnes âgées" },
    //     { label: "⚓ Association d’intérêts maritimes, marins", value: "Association d’intérêts maritimes, marins" },
    //     { label: "📚 Association de représentation de professions libérales", value: "Association de représentation de professions libérales" },
    //     { label: "🏢 Usagers de services publics", value: "Usagers de services publics" },
    //     { label: "💰 Défense des contribuables", value: "Défense des contribuables" },
    //     { label: "👥 Groupements de salariés à caractère syndical", value: "Groupements de salariés à caractère syndical" },
    //     { label: "💼 Unions patronales", value: "Unions patronales" },
    //     { label: "💰 Actionnaires, épargnants", value: "Actionnaires, épargnants" }
    // ],
    "interventions sociales":[
        { label: "🆘 Aide aux personnes en danger, solitude, désespoir, soutien psychologique et moral", value: "aide aux personnes en danger, solitude, désespoir, soutien psychologique et moral" },
        { label: "👪 Aide et conseils aux familles", value: "aide et conseils aux familles" },
        { label: "🧑 Aide à l’insertion des jeunes", value: "aide à l’insertion des jeunes" },
        { label: "👨‍👩‍👧‍👦 Associations familiales, services sociaux pour les familles", value: "associations familiales, services sociaux pour les familles" },
        { label: "🌊 Aide aux victimes de calamités, de catastrophes naturelles", value: "aide aux victimes de calamités, de catastrophes naturelles" },
        { label: "🌍 Aide aux réfugiés et aux immigrés (hors droits fondamentaux)", value: "aide aux réfugiés et aux immigrés (hors droits fondamentaux)" },
        { label: "🏫 Centres sociaux et socioculturels, foyers de jeunes travailleurs, centres d’études et d’action sociale", value: "centres sociaux et socioculturels, foyers de jeunes travailleurs, centres d'études et d'action sociale" },
        { label: "📚 Lutte contre l’illettrisme", value: "lutte contre l'illettrisme" },
        { label: "💼 Groupements de chômeurs, aide aux chômeurs", value: "groupements de chômeurs, aide aux chômeurs" },
        { label: "🏠 Foyers socio-éducatifs", value: "foyers socio-éducatifs" },
        { label: "👶 Aide aux victimes de violences faites aux enfants", value: "aide aux victimes de violences faites aux enfants" },
        { label: "🚪 Soutien, reclassement des détenus", value: "soutien, reclassement des détenus" },
        { label: "👊 Lutte contre diverses formes de violence", value: "lutte contre diverses formes de violence" },
        { label: "💔 Aide aux victimes de violences conjugales", value: "aide aux victimes de violences conjugales" },
        { label: "🚪 Réinsertion des délinquants", value: "réinsertion des délinquants" },
        { label: "🚦 Lutte contre la violence routière", value: "lutte contre la violence routière" },
        { label: "💰 Lutte contre le surendettement", value: "lutte contre le surendettement" }
    ],
    // "Information communication":[
    //     { label: "🎥 Audiovisuel", value: "Audiovisuel" },
    //     { label: "🌐 Réseaux internet", value: "Réseaux internet" },
    //     { label: "📻 Autres supports de communication", value: "Autres supports de communication" },
    //     { label: "📰 Presse, édition", value: "Presse, édition" },
    //     { label: "📻 Radios privées", value: "Radios privées" },
    //     { label: "👂 Auditeurs, consommateurs d’outils d’information et de communication", value: "Auditeurs, consommateurs d’outils d’information et de communication" },
    //     { label: "📊 Professionnels de l’information et de communication", value: "Professionnels de l’information et de communication" }
    // ],
    // "Aide à l’emploi, développement local, promotion de solidarités économiques, vie locale":[
    //     { label: "🏠 Comités de défense et d’animation de quartier, association locale ou municipale", value: "Comités de défense et d’animation de quartier, association locale ou municipale" },
    //     { label: "🌍 Promotion d’initiatives de développement durable", value: "Promotion d’initiatives de développement durable" },
    //     { label: "👥 Groupement d’employeurs", value: "Groupement d’employeurs" },
    //     { label: "🏭 Aide à la création d’activités économiques individuelles", value: "Aide à la création d’activités économiques individuelles" },
    //     { label: "🤝 Entreprises d’insertion, associations intermédiaires, régies de quartier", value: "Entreprises d’insertion, associations intermédiaires, régies de quartier" },
    //     { label: "💼 Comité, défense d’un emploi", value: "Comité, défense d’un emploi" }
    // ],
    // "Défense de droits fondamentaux, activités civiques":[
    //     { label: "🗳️ Activités civiques", value: "Activités civiques" },
    //     { label: "📚 Information civique", value: "Information civique" },
    //     { label: "🕊️ Défense des libertés publiques et des droits de l’Homme", value: "Défense des libertés publiques et des droits de l’Homme" },
    //     { label: "👩🏻‍🦱 Défense des droits des femmes, condition féminine", value: "Défense des droits des femmes, condition féminine" },
    //     { label: "🚫 Lutte contre les discriminations", value: "Lutte contre les discriminations" },
    //     { label: "🌍 Défense des droits des personnes étrangères ou immigrées, de personnes réfugiées", value: "Défense des droits des personnes étrangères ou immigrées, de personnes réfugiées" },
    //     { label: "👦 Défense des droits des enfants", value: "Défense des droits des enfants" },
    //     { label: "♿️ Défense des droits des personnes en situation de handicap", value: "Défense des droits des personnes en situation de handicap" },
    //     { label: "☮️ Défense de la paix", value: "Défense de la paix" },
    //     { label: "🌈 Association pour la défense de droits de minorités", value: "Association pour la défense de droits de minorités" },
    //     { label: "🌈 Défense des droits des personnes homosexuelles", value: "Défense des droits des personnes homosexuelles" },
    //     { label: "🏡 Défense des droits des personnes rapatriées", value: "Défense des droits des personnes rapatriées" }
    // ],
    // "Préservation du patrimoine":[
    //     { label: "🏰 Comités de défense du patrimoine", value: "Comités de défense du patrimoine" },
    //     { label: "🎖️ Commémorations, entretien de monuments et sites historiques, souvenir militaire", value: "Commémorations, entretien de monuments et sites historiques, souvenir militaire" },
    //     { label: "📚 Associations, sociétés savantes pour des études historiques, histoire du patrimoine", value: "Associations, sociétés savantes pour des études historiques, histoire du patrimoine" },
    //     { label: "🖼️ Musées, collections historiques", value: "Musées, collections historiques" },
    //     { label: "📚 Collections d’objets, de documents, bibliothèques spécialisées pour la sauvegarde et l’entretien du patrimoine", value: "Collections d’objets, de documents, bibliothèques spécialisées pour la sauvegarde et l’entretien du patrimoine" },
    //     { label: "📜 Sociétés, clubs de généalogie", value: "Sociétés, clubs de généalogie" },
    //     { label: "🏗️ Construction de monuments (sauf lieux de culte)", value: "Construction de monuments (sauf lieux de culte)" }
    // ],
    "activités religieuses, spirituelles ou philosophiques":[
    ],
    // "Services familiaux, services aux personnes âgées":[
    //     { label: "👶🏼 Crèches, garderies, haltes garderies", value: "Crèches, garderies, haltes garderies" },
    //     { label: "🧑‍🦱 Aide à domicile", value: "Aide à domicile" },
    //     { label: "🧓🏻 Foyers pour personnes âgées, maisons de retraite, maisons de retraite médicalisées", value: "Foyers pour personnes âgées, maisons de retraite, maisons de retraite médicalisées" },
    //     { label: "☎️ Services aux personnes âgées (téléalarme...)", value: "Services aux personnes âgées (téléalarme...)" }
    // ],
    "activités politiques":[
        { label: "💰 Soutien et financement de partis et de campagnes électorales", value: "soutien et financement de partis et de campagnes électorales" },
        { label: "🏠 Action politique locale", value: "action politique locale" },
        { label: "🤝 Associations à caractère politique général", value: "associations à caractère politique général" },
        { label: "🌎 Action politique globale", value: "action politique globale" },
        { label: "🇪🇺 Activités citoyennes européennes", value: "activités citoyennes européennes" }
    ],
    "clubs, cercles de réflexion": [
        { label: "🤔 Clubs de réflexion", value: "clubs de réflexion" },
        { label: "🎤 Organisation de conférences", value: "organisation de conférences" },
        { label: "🤝 Associations philanthropiques", value: "associations philanthropiques" },
        { label: "👥 Amicales laïques", value: "amicales laïques" }
    ],
    "Chasse pêche":[
        { label: "Chasse 🏹", value: "Chasse" },
        { label: "Pêche 🎣", value: "Pêche" },
    ],
    "Services et établissements médico-sociaux":[
        { label: "👶🏼 Accueil et protection de la petite enfance", value: "Accueil et protection de la petite enfance" },
        { label: "🤝 Aide sociale aux personnes en situation de handicap", value: "Aide sociale aux personnes en situation de handicap" },
        { label: "🏥 Établissements, services pour personnes handicapées (y compris les C.A.T)", value: "Établissements, services pour personnes handicapées (y compris les C.A.T)" },
        { label: "🧑‍🎓 Établissements et services pour adolescents en difficulté", value: "Établissements et services pour adolescents en difficulté" },
        { label: "🚫 Prévention et lutte contre l’alcoolisme, la toxicomanie", value: "Prévention et lutte contre l’alcoolisme, la toxicomanie" },
        { label: "🏥 Établissements et services pour adultes en difficulté, CHRS (centres d’hébergement et de réadaptation sociale)", value: "Établissements et services pour adultes en difficulté, CHRS (centres d’hébergement et de réadaptation sociale)" },
        { label: "🚑 Aide aux accidentés du travail", value: "Aide aux accidentés du travail" },
        { label: "💼 Aide aux victimes de maladies professionnelles", value: "Aide aux victimes de maladies professionnelles" }
    ],
    "Logement":[
        { label: "🏠 Associations et comités de locataires, de propriétaires, comités de logement", value: "Associations et comités de locataires, de propriétaires, comités de logement" },
        { label: "🏠 Aide au logement", value: "Aide au logement" },
        { label: "🚧 Réhabilitation et construction de logements", value: "Réhabilitation et construction de logements" }
    ],
    "recherche":[
        { label: "🧑‍🔬 Association de recherches scientifiques, sciences physiques, sciences humaines…", value: "association de recherches scientifiques, sciences physiques, sciences humaines…" },
        { label: "🔍 Autres associations de recherche", value: "autres associations de recherche" },
        { label: "📚 Diffusion de savoirs, sociétés savantes ou académiques", value: "diffusion de savoirs, sociétés savantes ou académiques" },
        { label: "🎭 Recherche sur la culture", value: "recherche sur la culture" },
        { label: "🏫 Recherche sur l'éducation et la formation", value: "recherche sur l'éducation et la formation" },
        { label: "🌍 Recherche sur la vie sociale et politique", value: "recherche sur la vie sociale et politique" },
        { label: "🌳 Recherche sur l'environnement et le climat", value: "recherche sur l'environnement et le climat" }
    ],
    "Armée (dont préparation militaire, médailles)":[
        { label: "🎖️ Anciens combattants", value: "Anciens combattants" },
        { label: "👥 Associations de militaires, amicales, associations de conscrits", value: "Associations de militaires, amicales, associations de conscrits" }
    ],
    "Tourisme":[
        { label: "🌍 Syndicats d’initiative, offices de tourisme, salons du tourisme", value: "Syndicats d’initiative, offices de tourisme, salons du tourisme" },
        { label: "🏨 Auberges de jeunesse, organisation de voyages", value: "Auberges de jeunesse, organisation de voyages" },
        { label: "🏕️ Gîtes ruraux, camping, caravaning, naturisme", value: "Gîtes ruraux, camping, caravaning, naturisme" },
        { label: "🌴 Maisons et villages de vacances", value: "Maisons et villages de vacances" }
    ],
    "Sécurité, protection civile":[
        { label: "🚒 Amicale de sapeurs-pompiers", value: "Amicale de sapeurs-pompiers" },
        { label: "🆘 Sauvetage, secourisme, protection civile", value: "Sauvetage, secourisme, protection civile" },
        { label: "📚 Prévention, formation, cours de secourisme", value: "Prévention, formation, cours de secourisme" },
        { label: "🚗 Sécurité routière", value: "Sécurité routière" },
        { label: "🌊 Sauvetage en mer", value: "Sauvetage en mer" },
        { label: "⛰️ Sécurité et sauvetage en montagne", value: "Sécurité et sauvetage en montagne" }
        ],
    "justice":[
        { label: "🤝 Médiation, prévention", value: "médiation, prévention" },
        { label: "👥 Défense des droits des victimes", value: "défense des droits des victimes" },
        { label: "🧑‍⚖️ Contrôle judiciaire, associations de personnels de justice", value: "contrôle judiciaire, associations de personnels de justice" },
        { label: "📝 Accès aux droits dans les tribunaux, assistance juridique", value: "accès aux droits dans les tribunaux, assistance juridique" },
        { label: "🏛️ Maisons du droit, accès au droit", value: "maisons du droit, accès au droit" }
    ]
};

export default subcategories;
