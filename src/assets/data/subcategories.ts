interface ISubcategories {
    [key: string]: {
      label: string;
      value: string;
    }[];
  }
const subcategories: ISubcategories = {
    "Sports, activités de plein air": [
        { label: "🏎️ Sports mécaniques (sport automobile, moto, trial)", value: "Sports mécaniques (sport automobile, moto, trial)" },
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
        { label: "🏟️ Gestion d'équipements sportifs, organisation de rencontres sportives, organisation de championnats, clubs de supporters", value: "Gestion d'équipements sportifs, organisation de rencontres sportives, organisation de championnats, clubs de supporters" },
        { label: "🏀 Basket-ball", value: "Basket-ball" },
        { label: "🌊 Nautisme, glisse sur eau (ski nautique, surf, char à voile)", value: "Nautisme, glisse sur eau (ski nautique, surf, char à voile)" },
        { label: "⛵ Voile (voile, dériveur, planche à voile)", value: "Voile (voile, dériveur, planche à voile)" },
        { label: "🏊 Natation - Baignade (natation, plongée)", value: "Natation - Baignade (natation, plongée)" },
        { label: "🛩️ Sports aériens (avion, planeur, ULM, parachutisme)", value: "Sports aériens (avion, planeur, ULM, parachutisme)" },
        { label: "🥋 Judo", value: "Judo" },
        { label: "🏂 Sports de neige (ski alpin, ski de fond, snowboard), montagne", value: "Sports de neige (ski alpin, ski de fond, snowboard), montagne" },
        { label: "🤾 Handball", value: "Handball" },
        { label: "🦽 Handisport", value: "Handisport" },
        { label: "🛹 Roller, skate", value: "Roller, skate" },
        { label: "🏓 Tennis de table (tennis de table, ping-pong)", value: "Tennis de table (tennis de table, ping-pong)" },
        { label: "⛳ Golf", value: "Golf" },
        { label: "🏢 Associations multisports d'entreprise", value: "Associations multisports d'entreprise" },
        { label: "🏐 Volley ball (volley, beach volley)", value: "Volley ball (volley, beach volley)" },
        { label: "🏈 Autres sports collectifs (baseball, hockey sur glace, football américain)", value: "Autres sports collectifs (baseball, hockey sur glace, football américain)" },
        { label: "🧗 Escalade, montagne (escalade, spéléologie, via ferrata, canyonisme, alpinisme)", value: "Escalade, montagne (escalade, spéléologie, via ferrata, canyonisme, alpinisme)" },
        { label: "💪 Musculation (culturisme, musculation)", value: "Musculation (culturisme, musculation)" },
        { label: "🚣 Aviron, canoë kayak (aviron, rafting, canoë kayak, joutes)", value: "Aviron, canoë kayak (aviron, rafting, canoë kayak, joutes)" },
        { label: "🤺 Escrime", value: "Escrime" },
        { label: "🏒 Hockey sur glace, sports de glace", value: "Hockey sur glace, sports de glace" }
    ],
    "culture, pratiques d'activités artistiques, culturelles": [
        { label: "🎤 Chant choral et musique", value: "chant choral, musique" },
        { label: "🎨 Promotion de l'art et des artistes", value: "promotion de l'art et des artistes" },
        { label: "🎭 Théâtre, marionnettes, cirque et spectacles de variété", value: "théâtre, marionnettes, cirque, spectacles de variété" },
        { label: "💃 Danse", value: "Danse" },
        { label: "🧪 Loisirs scientifiques et techniques", value: "Loisirs scientifiques et techniques" },
        { label: "🧶 Artisanat, travaux manuels, bricolage et expositions", value: "Artisanat, travaux manuels, bricolage et expositions" },
        { label: "🎥 Photographie et cinéma", value: "Photographie et cinéma" },
        { label: "📝 Expression écrite, littérature et poésie", value: "Expression écrite, littérature et poésie" },
        { label: "🎨 Arts graphiques, bande dessinée, peinture, sculpture et architecture", value: "Arts graphiques, bande dessinée, peinture, sculpture et architecture" },
        { label: "🌍 Folklore", value: "Folklore" },
        { label: "🗣️ Langues, dialectes et patois", value: "Langues, dialectes et patois" },
        { label: "📚 Bibliothèques, ludothèques, discothèques et vidéothèques", value: "Bibliothèques, ludothèques, discothèques et vidéothèques" },
        { label: "🎨 Arts de la rue", value: "Arts de la rue" }
    ],
    "Amicales, groupements affinitaires, groupes d'entraide (hors défense de droits fondamentaux)": [
        { label: "🤝 Groupements d'entraide et de solidarité", value: "Groupements d'entraide et de solidarité" },
        { label: "🌍 Amicale de personnes originaires d'un même pays", value: "Amicale de personnes originaires d'un même pays" },
        { label: "💼 Organisation de professions", value: "Organisation de professions" },
        { label: "♿ Associations de personnes en situation de handicap", value: "Associations de personnes en situation de handicap" },
        { label: "👥 Association du personnel d'une entreprise", value: "Association du personnel d'une entreprise" },
        { label: "👴 Associations de classe d'âge", value: "Associations de classe d'âge" },
        { label: "🗺️ Amicale de personnes originaires d'une même région", value: "Amicale de personnes originaires d'une même région" },
        { label: "👩 Associations féminines pour l'entraide et la solidarité", value: "Associations féminines pour l'entraide et la solidarité" },
        { label: "🏳️‍🌈 Associations de personnes homosexuelles", value: "Associations de personnes homosexuelles" }
    ],
    "éducation formation": [
        { label: "🎓 Établissement de formation professionnelle, formation continue", value: "Établissement de formation professionnelle, formation continue" },
        { label: "👨‍🎓 Associations d’étudiants, d’élèves", value: "Associations d’étudiants, d’élèves" },
        { label: "👪 Parents d’élèves", value: "Parents d’élèves" },
        { label: "🤝 Associations périscolaires, coopération, aide à l’enseignement", value: "Associations périscolaires, coopération, aide à l’enseignement" },
        { label: "🎓 Centre d'enseignement et de formation", value: "Centre d'enseignement et de formation" },
        { label: "👴 Amicales, associations d’anciens étudiants, d’anciens élèves", value: "Amicales, associations d’anciens étudiants, d’anciens élèves" },
        { label: "🏫 Amicales, personnel d’établissements scolaires ou universitaires", value: "Amicales, personnel d’établissements scolaires ou universitaires" },
        { label: "🗣️ Études et formations linguistiques", value: "Études et formations linguistiques" },
        { label: "🛫 Organisation, financement de voyages d’études, d’échanges, pour scolaires ou universitaires", value: "Organisation, financement de voyages d’études, d’échanges, pour scolaires ou universitaires" },
        { label: "👨‍🔧 Apprentissage", value: "Apprentissage" },
        { label: "🏫 Organisme de gestion d’établissement d’enseignement général et technique", value: "Organisme de gestion d’établissement d’enseignement général et technique" },
        { label: "👨‍🏫 Organisation de professions enseignantes, amicales de personnel", value: "Organisation de professions enseignantes, amicales de personnel" },
        { label: "🎓 Promotion de titres, de diplômes", value: "Promotion de titres, de diplômes" },
        { label: "❤️ Œuvres sociales en faveur des élèves, œuvres en faveur pupilles de la nation", value: "Œuvres sociales en faveur des élèves, œuvres en faveur pupilles de la nation" },
        { label: "🎓 Organisme de gestion d’établissement d’enseignement supérieur", value: "Organisme de gestion d’établissement d’enseignement supérieur" },
        { label: "🏡 Maisons familiales rurales", value: "Maisons familiales rurales" }
      ],
    "Clubs de loisirs, relations" : [
        { label: "🤝 échanges locaux, réseaux d'échanges", value: "échanges locaux, réseaux d'échanges" },
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
        { label: "📚 Sensibilisation et éducation à l'environnement et au développement durable", value: "actions de sensibilisation et d'éducation à l'environnement et au développement durable" },
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
    "Conduite d'activités économiques":[
        { label: "💼 Association à but commercial, développement économique", value: "Association à but commercial, développement économique" },
        { label: "🏬 Amicales de commerçants, organisation de foires", value: "Amicales de commerçants, organisation de foires" },
        { label: "🛍️ Groupement d’achats, groupement d’entreprises", value: "Groupement d’achats, groupement d’entreprises" },
        { label: "💰 Gestion financière, gestion immobilière", value: "Gestion financière, gestion immobilière" },
        { label: "🍽️ Cantines, restaurants d’entreprises", value: "Cantines, restaurants d’entreprises" },
        { label: "🚐 Transports", value: "Transports" },
        { label: "🏛️ Chambres de commerce, chambres économiques", value: "Chambres de commerce, chambres économiques" },
        { label: "💰 Caisses de retraite, de prévoyance, de pensions", value: "Caisses de retraite, de prévoyance, de pensions" },
        { label: "🤝 Caisses de congés payés, caisses de secours", value: "Caisses de congés payés, caisses de secours" }
    ],
    "Action socio-culturelle": [
        { label: "🌍 Jumelages, échanges culturels", value: "Jumelages, échanges culturels" },
        { label: "🎉 Comités des fêtes", value: "Comités des fêtes" },
        { label: "👴 Clubs du troisième âge", value: "Clubs du troisième âge" },
        { label: "🧑‍🎓 Mouvements éducatifs de jeunesse et d'éducation populaire", value: "Mouvements éducatifs de jeunesse et d'éducation populaire" },
        { label: "🌟 Associations socio-éducatives, scoutisme", value: "Associations socio-éducatives, scoutisme" },
        { label: "🏠 Maisons de jeunes, foyers, clubs de jeunes", value: "Maisons de jeunes, foyers, clubs de jeunes" },
        { label: "♿️ Loisirs pour personnes en situation de handicap", value: "Loisirs pour personnes en situation de handicap" },
        { label: "🎭 Majorettes, twirlings, carnavals, défilés", value: "Majorettes, twirlings, carnavals, défilés" },
        { label: "🎭 Maisons de la culture, office municipal, centres culturels", value: "Maisons de la culture, office municipal, centres culturels" },
        { label: "🌾 Foyers ruraux", value: "Foyers ruraux" },
        { label: "🏕️ Centres aérés, colonies de vacances", value: "Centres aérés, colonies de vacances" }
    ],
    "Associations caritatives, humanitaires, aide au développement, développement du bénévolat": [
        { label: "🌍 Associations caritatives intervenant au plan international", value: "Associations caritatives intervenant au plan international" },
        { label: "🤝 Associations caritatives à buts multiples", value: "Associations caritatives à buts multiples" },
        { label: "🚚 Secours en nature, distribution de nourriture et de vêtements", value: "Secours en nature, distribution de nourriture et de vêtements" },
        { label: "💰 Secours financiers et autres services aux personnes en difficulté", value: "Secours financiers et autres services aux personnes en difficulté" },
        { label: "🤝👥 Développement du bénévolat", value: "Développement du bénévolat" }
    ],
    "Santé": [
        { label: "🆘 Accompagnement, aide aux malades", value: "Accompagnement, aide aux malades" },
        { label: "📚 Organisation de professions médicales ou paramédicales", value: "Organisation de professions médicales ou paramédicales" },
        { label: "🔬 Recherche médicale", value: "Recherche médicale" },
        { label: "🍃 Homéopathie, médecines douces", value: "Homéopathie, médecines douces" },
        { label: "📚 Éducation sanitaire, prévention générale", value: "Éducation sanitaire, prévention générale" },
        { label: "🥗 Hygiène, diététique", value: "Hygiène, diététique" },
        { label: "🏥 Prévention et dépistage de maladies (autres que le sida)", value: "Prévention et dépistage de maladies (autres que le sida)" },
        { label: "👥 Associations de personnes malades, ou anciens malades", value: "Associations de personnes malades, ou anciens malades" },
        { label: "💰 Financement de la recherche médicale", value: "Financement de la recherche médicale" },
        { label: "🏥 Cliniques, centres médicaux, hôpitaux, sanatoriums, établissements de rééducation, maisons de convalescence", value: "Cliniques, centres médicaux, hôpitaux, sanatoriums, établissements de rééducation, maisons de convalescence" },
        { label: "🏥 Dispensaires, soins infirmiers, services paramédicaux, de garde", value: "Dispensaires, soins infirmiers, services paramédicaux, de garde" },
        { label: "💉 Don de sang, d’organes", value: "Don de sang, d’organes" },
        { label: "🐶 Médecine animale, vétérinaire", value: "Médecine animale, vétérinaire" },
        { label: "🧑‍⚕️ Organisation de congrès médicaux", value: "Organisation de congrès médicaux" },
        { label: "🚑 Services médicaux d’urgence", value: "Services médicaux d’urgence" },
        { label: "💉 Gestion de matériel médical", value: "Gestion de matériel médical" },
        { label: "🏥 Hôpitaux psychiatriques, soins ambulatoires en santé mentale", value: "Hôpitaux psychiatriques, soins ambulatoires en santé mentale" },
        { label: "🏭 Médecine du travail", value: "Médecine du travail" },
        { label: "🏥 Prévention et dépistage du sida", value: "Prévention et dépistage du sida" },
        { label: "🏋️‍♀️ Centres de réadaptation", value: "Centres de réadaptation" },
        { label: "🤰 Accueil, information pour contraception et avortement", value: "Accueil, information pour contraception et avortement" }
    ],
    "Représentation, promotion et défense d'intérêts économiques":[
        { label: "🌱 Associations d'exploitants agricoles, élevage, horticulture, aviculture, apiculture, viticulture, viniculture", value: "Associations d'exploitants agricoles, élevage, horticulture, aviculture, apiculture, viticulture, viniculture" },
        { label: "💼 Représentation d’intérêts économiques sectoriels", value: "Représentation d’intérêts économiques sectoriels" },
        { label: "🗺️ Représentation d’intérêts régionaux et locaux", value: "Représentation d’intérêts régionaux et locaux" },
        { label: "👥 Groupements professionnels", value: "Groupements professionnels" },
        { label: "🛍️ Associations pour la représentation d'artisans, de commerçants", value: "Associations pour la représentation d'artisans, de commerçants" },
        { label: "🛒 Mouvements de consommateurs", value: "Mouvements de consommateurs" },
        { label: "👵 Associations de défense d'intérêts des retraités ou des personnes âgées", value: "Associations de défense d'intérêts des retraités ou des personnes âgées" },
        { label: "⚓ Association d’intérêts maritimes, marins", value: "Association d’intérêts maritimes, marins" },
        { label: "📚 Association de représentation de professions libérales", value: "Association de représentation de professions libérales" },
        { label: "🏢 Usagers de services publics", value: "Usagers de services publics" },
        { label: "💰 Défense des contribuables", value: "Défense des contribuables" },
        { label: "👥 Groupements de salariés à caractère syndical", value: "Groupements de salariés à caractère syndical" },
        { label: "💼 Unions patronales", value: "Unions patronales" },
        { label: "💰 Actionnaires, épargnants", value: "Actionnaires, épargnants" }
    ],
    "Interventions sociales":[
        { label: "🆘 Aide aux personnes en danger, solitude, désespoir, soutien psychologique et moral", value: "Aide aux personnes en danger, solitude, désespoir, soutien psychologique et moral" },
        { label: "👪 Aide et conseils aux familles", value: "Aide et conseils aux familles" },
        { label: "🧑 Aide à l’insertion des jeunes", value: "Aide à l’insertion des jeunes" },
        { label: "👨‍👩‍👧‍👦 Associations familiales, services sociaux pour les familles", value: "Associations familiales, services sociaux pour les familles" },
        { label: "🌊 Aide aux victimes de calamités, de catastrophes naturelles", value: "Aide aux victimes de calamités, de catastrophes naturelles" },
        { label: "🌍 Aide aux réfugiés et aux immigrés (hors droits fondamentaux)", value: "Aide aux réfugiés et aux immigrés (hors droits fondamentaux)" },
        { label: "🏫 Centres sociaux et socioculturels, foyers de jeunes travailleurs, centres d'études et d'action sociale", value: "Centres sociaux et socioculturels, foyers de jeunes travailleurs, centres d'études et d'action sociale" },
        { label: "📚 Lutte contre l'illettrisme", value: "Lutte contre l'illettrisme" },
        { label: "💼 Groupements de chômeurs, aide aux chômeurs", value: "Groupements de chômeurs, aide aux chômeurs" },
        { label: "🏠 Foyers socio-éducatifs", value: "Foyers socio-éducatifs" },
        { label: "👶 Aide aux victimes de violences faites aux enfants", value: "Aide aux victimes de violences faites aux enfants" },
        { label: "🚪 Soutien, reclassement des détenus", value: "Soutien, reclassement des détenus" },
        { label: "👊 Lutte contre diverses formes de violence", value: "Lutte contre diverses formes de violence" },
        { label: "💔 Aide aux victimes de violences conjugales", value: "Aide aux victimes de violences conjugales" },
        { label: "🚪 Réinsertion des délinquants", value: "Réinsertion des délinquants" },
        { label: "🚦 Lutte contre la violence routière", value: "Lutte contre la violence routière" },
        { label: "💰 Lutte contre le surendettement", value: "Lutte contre le surendettement" }
    ],
    "Information communication":[
        { label: "🎥 Audiovisuel", value: "Audiovisuel" },
        { label: "🌐 Réseaux internet", value: "Réseaux internet" },
        { label: "📻 Autres supports de communication", value: "Autres supports de communication" },
        { label: "📰 Presse, édition", value: "Presse, édition" },
        { label: "📻 Radios privées", value: "Radios privées" },
        { label: "👂 Auditeurs, consommateurs d'outils d'information et de communication", value: "Auditeurs, consommateurs d'outils d'information et de communication" },
        { label: "📊 Professionnels de l'information et de communication", value: "Professionnels de l'information et de communication" }
    ],        
    "Aide à l'emploi, développement local, promotion de solidarités économiques, vie locale":[
        { label: "🏠 Comités de défense et d'animation de quartier, association locale ou municipale", value: "Comités de défense et d'animation de quartier, association locale ou municipale" },
        { label: "🌍 Promotion d’initiatives de développement durable", value: "Promotion d’initiatives de développement durable" },
        { label: "👥 Groupement d'employeurs", value: "Groupement d'employeurs" },
        { label: "🏭 Aide à la création d’activités économiques individuelles", value: "Aide à la création d’activités économiques individuelles" },
        { label: "🤝 Entreprises d'insertion, associations intermédiaires, régies de quartier", value: "Entreprises d'insertion, associations intermédiaires, régies de quartier" },
        { label: "💼 Comité, défense d'un emploi", value: "Comité, défense d'un emploi" }
    ],
    "Défense de droits fondamentaux, activités civiques":[
        { label: "🗳️ Activités civiques", value: "Activités civiques" },
        { label: "📚 Information civique", value: "Information civique" },
        { label: "🕊️ Défense des libertés publiques et des droits de l’Homme", value: "Défense des libertés publiques et des droits de l’Homme" },
        { label: "👩🏻‍🦱 Défense des droits des femmes, condition féminine", value: "Défense des droits des femmes, condition féminine" },
        { label: "🚫 Lutte contre les discriminations", value: "Lutte contre les discriminations" },
        { label: "🌍 Défense des droits des personnes étrangères ou immigrées, de personnes réfugiées", value: "Défense des droits des personnes étrangères ou immigrées, de personnes réfugiées" },
        { label: "👦 Défense des droits des enfants", value: "Défense des droits des enfants" },
        { label: "♿️ Défense des droits des personnes en situation de handicap", value: "Défense des droits des personnes en situation de handicap" },
        { label: "☮️ Défense de la paix", value: "Défense de la paix" },
        { label: "🌈 Association pour la défense de droits de minorités", value: "Association pour la défense de droits de minorités" },
        { label: "🌈 Défense des droits des personnes homosexuelles", value: "Défense des droits des personnes homosexuelles" },
        { label: "🏡 Défense des droits des personnes rapatriées", value: "Défense des droits des personnes rapatriées" }
    ],
    "Préservation du patrimoine":[
        { label: "🏰 Comités de défense du patrimoine", value: "Comités de défense du patrimoine" },
        { label: "🎖️ Commémorations, entretien de monuments et sites historiques, souvenir militaire", value: "Commémorations, entretien de monuments et sites historiques, souvenir militaire" },
        { label: "📚 Associations, sociétés savantes pour des études historiques, histoire du patrimoine", value: "Associations, sociétés savantes pour des études historiques, histoire du patrimoine" },
        { label: "🖼️ Musées, collections historiques", value: "Musées, collections historiques" },
        { label: "📚 Collections d'objets, de documents, bibliothèques spécialisées pour la sauvegarde et l'entretien du patrimoine", value: "Collections d'objets, de documents, bibliothèques spécialisées pour la sauvegarde et l'entretien du patrimoine" },
        { label: "📜 Sociétés, clubs de généalogie", value: "Sociétés, clubs de généalogie" },
        { label: "🏗️ Construction de monuments (sauf lieux de culte)", value: "Construction de monuments (sauf lieux de culte)" }
    ],
    "Activités religieuses, spirituelles ou philosophiques":[
    ],
    "Services familiaux, services aux personnes âgées":[
        { label: "👶🏼 Crèches, garderies, haltes garderies", value: "Crèches, garderies, haltes garderies" },
        { label: "🧑‍🦱 Aide à domicile", value: "Aide à domicile" },
        { label: "🧓🏻 Foyers pour personnes âgées, maisons de retraite, maisons de retraite médicalisées", value: "Foyers pour personnes âgées, maisons de retraite, maisons de retraite médicalisées" },
        { label: "☎️ Services aux personnes âgées (téléalarme...)", value: "Services aux personnes âgées (téléalarme...)" }
    ],
    "Activités politiques":[
        { label: "💰 Soutien et financement de partis et de campagnes électorales", value: "Soutien et financement de partis et de campagnes électorales" },
        { label: "🏠 Action politique locale", value: "Action politique locale" },
        { label: "🤝 Associations à caractère politique général", value: "Associations à caractère politique général" },
        { label: "🌎 Action politique globale", value: "Action politique globale" },
        { label: "🇪🇺 Activités citoyennes européennes", value: "Activités citoyennes européennes" }    
    ],
    "Clubs, cercles de réflexion": [
        { label: "🤔 Clubs de réflexion", value: "Clubs de réflexion" },
        { label: "🎤 Organisation de conférences", value: "Organisation de conférences" },
        { label: "🤝 Associations philanthropiques", value: "Associations philanthropiques" },
        { label: "👥 Amicales laïques", value: "Amicales laïques" }
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
        { label: "🏥 Établissements et services pour adultes en difficulté, CHRS (centres d'hébergement et de réadaptation sociale)", value: "Établissements et services pour adultes en difficulté, CHRS (centres d'hébergement et de réadaptation sociale)" },
        { label: "🚑 Aide aux accidentés du travail", value: "Aide aux accidentés du travail" },
        { label: "💼 Aide aux victimes de maladies professionnelles", value: "Aide aux victimes de maladies professionnelles" }
    ],
    "Logement":[
        { label: "🏠 Associations et comités de locataires, de propriétaires, comités de logement", value: "Associations et comités de locataires, de propriétaires, comités de logement" },
        { label: "🏠 Aide au logement", value: "Aide au logement" },
        { label: "🚧 Réhabilitation et construction de logements", value: "Réhabilitation et construction de logements" }
    ],
    "Recherche":[
        { label: "🧑‍🔬 Association de recherches scientifiques, sciences physiques, sciences humaines…", value: "Association de recherches scientifiques, sciences physiques, sciences humaines…" },
        { label: "🔍 Autres associations de recherche", value: "Autres associations de recherche" },
        { label: "📚 Diffusion de savoirs, sociétés savantes ou académiques", value: "Diffusion de savoirs, sociétés savantes ou académiques" },
        { label: "🎭 Recherche sur la culture", value: "Recherche sur la culture" },
        { label: "🏫 Recherche sur l'éducation et la formation", value: "Recherche sur l'éducation et la formation" },
        { label: "🌍 Recherche sur la vie sociale et politique", value: "Recherche sur la vie sociale et politique" },
        { label: "🌳 Recherche sur l'environnement et le climat", value: "Recherche sur l'environnement et le climat" }    
    ],
    "Armée (dont préparation militaire, médailles)":[
        { label: "🎖️ Anciens combattants", value: "Anciens combattants" },
        { label: "👥 Associations de militaires, amicales, associations de conscrits", value: "Associations de militaires, amicales, associations de conscrits" }
    ],
    "Tourisme":[
        { label: "🌍 Syndicats d'initiative, offices de tourisme, salons du tourisme", value: "Syndicats d'initiative, offices de tourisme, salons du tourisme" },
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
    "Justice":[
        { label: "🤝 Médiation, prévention", value: "Médiation, prévention" },
        { label: "👥 Défense des droits des victimes", value: "Défense des droits des victimes" },
        { label: "🧑‍⚖️ Contrôle judiciaire, associations de personnels de justice", value: "Contrôle judiciaire, associations de personnels de justice" },
        { label: "📝 Accès aux droits dans les tribunaux, assistance juridique", value: "Accès aux droits dans les tribunaux, assistance juridique" },
        { label: "🏛️ Maisons du droit, accès au droit", value: "Maisons du droit, accès au droit" }
    ]
};
  
export default subcategories;

