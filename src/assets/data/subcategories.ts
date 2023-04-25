interface ISubcategories {
    [key: string]: {
      label: string;
      value: string;
    }[];
  }
const subcategories: ISubcategories = {
    "sports": [
        { label: "🏎️ Sports mécaniques (sport automobile, moto, trial)", value: "motorsports" },
        { label: "⚽ Football (football, futsal)", value: "football" },
        { label: "🤸 Gymnastique (gymnastique, gymnastique d’entretien, éducation physique, yoga), aérobic", value: "gymnastics_aerobics" },
        { label: "🥋 Autres arts martiaux (karaté, aïkido, taekwondo)", value: "martial_arts" },
        { label: "🐴 Equitation (équitation, hippisme, course camarguaise, landaise)", value: "equestrianism" },
        { label: "🤼‍♂️ Associations multisports locales", value: "local_multisports" },
        { label: "🥊 Sports de combat (boxe, kick box, boxe thaï, lutte)", value: "combat_sports" },
        { label: "🚴 Cyclisme (cyclisme, vélo, VTT, y c course d’orientation à vélo, cyclotourisme)", value: "cycling" },
        { label: "🚶 Marche sportive (randonnée pédestre, raid, trekking, course orientation)", value: "walking_sports" },
        { label: "🎲 Boules (pétanque, boules)", value: "boules" },
        { label: "🏅 Associations pour la promotion du sport, médailles, mérite sportif", value: "sports_promotion" },
        { label: "🌳 Activités de plein air (dont saut à l’élastique)", value: "outdoor_activities" },
        { label: "🎯 Tir (tir à l’arc, tir à balle, ball trap), javelot", value: "shooting_sports" },
        { label: "🎓 Associations multisports scolaires ou universitaires", value: "school_university_multisports" },
        { label: "🏉 Rugby (rugby à 13, à 15)", value: "rugby" },
        { label: "💃 Danse sportive (danse sportive, hip hop, claquettes)", value: "dance_sports" },
        { label: "🎾 Tennis (tennis, longue paume)", value: "tennis" },
        { label: "🏃 Athlétisme (triathlon, pentathlon, footing, jogging)", value: "athletics" },
        { label: "🏟️ Gestion d'équipements sportifs, organisation de rencontres sportives, organisation de championnats, clubs de supporters", value: "sports_management" },
        { label: "🏀 Basket-ball", value: "basketball" },
        { label: "🌊 Nautisme, glisse sur eau (ski nautique, surf, char à voile)", value: "watersports" },
        { label: "⛵ Voile (voile, dériveur, planche à voile)", value: "sailing" },
        { label: "🏊 Natation - Baignade (natation, plongée)", value: "swimming_diving" },
        { label: "🛩️ Sports aériens (avion, planeur, ULM, parachutisme)", value: "aerial_sports" },
        { label: "🥋 Judo", value: "judo" },
        { label: "🏂 Sports de neige (ski alpin, ski de fond, snowboard), montagne", value: "winter_sports" },
        { label: "🤾 Handball", value: "handball" },
        { label: "🦽 Handisport", value: "disability_sports" },
        { label: "🛹 Roller, skate", value: "roller_skate" },
        { label: "🏓 Tennis de table (tennis de table, ping-pong)", value: "table_tennis" },
        { label: "⛳ Golf", value: "golf" },
        { label: "🏢 Associations multisports d'entreprise", value: "corporate_sports" },
        { label: "🏐 Volley ball (volley, beach volley)", value: "volleyball" },
        { label: "🏈 Autres sports collectifs (baseball, hockey sur glace, football américain)", value: "other_team_sports" },
        { label: "🧗 Escalade, montagne (escalade, spéléologie, via ferrata, canyonisme, alpinisme)", value: "mountain_climbing" },
        { label: "💪 Musculation (culturisme, musculation)", value: "bodybuilding" },
        { label: "🚣 Aviron, canoë kayak (aviron, rafting, canoë kayak, joutes)", value: "rowing_kayaking" },
        { label: "🤺 Escrime", value: "fencing" },
        { label: "🏒 Hockey sur glace, sports de glace", value: "ice_hockey" }
    ],
    "artistic_activities": [
        { label: "🎤 Chant choral et musique", value: "choral_music" },  
        { label: "🎨 Promotion de l'art et des artistes", value: "art_promotion" },  
        { label: "🎭 Théâtre, marionnettes, cirque et spectacles de variété", value: "theater_circus" },  
        { label: "💃 Danse", value: "dance" },  
        { label: "🧪 Loisirs scientifiques et techniques", value: "science_technology" },  
        { label: "🧶 Artisanat, travaux manuels, bricolage et expositions", value: "crafts_exhibitions" },  
        { label: "🎥 Photographie et cinéma", value: "photography_cinema" },  
        { label: "📝 Expression écrite, littérature et poésie", value: "literature_writing" },  
        { label: "🎨 Arts graphiques, bande dessinée, peinture, sculpture et architecture", value: "visual_arts" },  
        { label: "🌍 Folklore", value: "folklore" },  
        { label: "🗣️ Langues, dialectes et patois", value: "languages" },  
        { label: "📚 Bibliothèques, ludothèques, discothèques et vidéothèques", value: "libraries" },  
        { label: "🎨 Arts de la rue", value: "street_arts" }
    ],
    "community_support": [    
        { label: "🤝 Groupements d'entraide et de solidarité", value: "mutual_aid" },
        { label: "🌍 Amicale de personnes originaires d'un même pays", value: "country_origin" },
        { label: "💼 Organisation de professions", value: "professional_organization" },
        { label: "♿ Associations de personnes en situation de handicap", value: "disability_support" },
        { label: "👥 Association du personnel d'une entreprise", value: "company_staff_association" },
        { label: "👴 Associations de classe d'âge", value: "age_class_associations" },
        { label: "🗺️ Amicale de personnes originaires d'une même région", value: "regional_origin" },
        { label: "👩 Associations féminines pour l'entraide et la solidarité", value: "women_support" },
        { label: "🏳️‍🌈 Associations de personnes homosexuelles", value: "lgbtq_support" }
    ],
    "education_training": [
        { label: "🎓 Établissement de formation professionnelle, formation continue", value: "professional_training" },
        { label: "👨‍🎓 Associations d’étudiants, d’élèves", value: "student_associations" },
        { label: "👪 Parents d’élèves", value: "parents_of_students" },
        { label: "🤝 Associations périscolaires, coopération, aide à l’enseignement", value: "after_school_associations" },
        { label: "🎓 Centre d'enseignement et de formation", value: "teaching_center" },
        { label: "👴 Amicales, associations d’anciens étudiants, d’anciens élèves", value: "alumni_associations" },
        { label: "🏫 Amicales, personnel d’établissements scolaires ou universitaires", value: "school_staff_associations" },
        { label: "🗣️ Études et formations linguistiques", value: "language_studies" },
        { label: "🛫 Organisation, financement de voyages d’études, d’échanges, pour scolaires ou universitaires", value: "study_travel_organization" },
        { label: "👨‍🔧 Apprentissage", value: "apprenticeship" },
        { label: "🏫 Organisme de gestion d’établissement d’enseignement général et technique", value: "management_of_educational_institutions" },
        { label: "👨‍🏫 Organisation de professions enseignantes, amicales de personnel", value: "teaching_professionals_organization" },
        { label: "🎓 Promotion de titres, de diplômes", value: "degree_promotion" },
        { label: "❤️ Œuvres sociales en faveur des élèves, œuvres en faveur pupilles de la nation", value: "social_works_for_students" },
        { label: "🎓 Organisme de gestion d’établissement d’enseignement supérieur", value: "management_of_higher_education_institutions" },
        { label: "🏡 Maisons familiales rurales", value: "rural_family_homes" }
    ],
    "clubs_relationships" : [
        { label: "🤝 échanges locaux, réseaux d'échanges", value: "local_exchanges" },
        { label: "🎉 activités festives (soirées…)", value: "festive_activities" },
        { label: "🧘 relaxation, sophrologie", value: "relaxation" },
        { label: "🏞️ centres de loisirs, clubs de loisirs multiples", value: "leisure_centers" },
        { label: "♟️ bridge, jeux de cartes, échecs, dames, jeux de société...", value: "board_games" },
        { label: "🍷 gastronomie, œnologie, confréries, gourmets", value: "gastronomy" },
        { label: "🐾 animaux familiers, colombophilie, aquariophilie", value: "pets" },
        { label: "🌺 jardins ouvriers, floralies", value: "gardening" },
        { label: "🚗 collectionneurs de véhicules, clubs amateurs de voitures anciennes", value: "car_collectors" },
        { label: "👥 cercles privés, fan-clubs", value: "fan_clubs" },
        { label: "🐶 élevage canin, clubs de chiens de défense", value: "dog_breeding" },
        { label: "🗞️ clubs de collectionneurs (hors sauvegarde, entretien du patrimoine), philatélie, numismatique", value: "collectors_clubs" },
        { label: "🚁 modélisme", value: "modeling" },
        { label: "🎱 billard, quilles", value: "billiards" },
        { label: "✈️ aéroclubs", value: "aeroclubs" },
        { label: "📻 radioamateurs", value: "ham_radio" }
    ],
    "environment_living":[
        { label: "🛠️ Défense et amélioration du cadre de vie", value: "cadre_de_vie" },
        { label: "📚 Éducation à l'environnement et au développement durable", value: "environnement" },
        { label: "🦜 Protection des animaux", value: "protection_animaux" },
        { label: "🌱 Mouvements écologiques", value: "mouvements_ecologiques" },
        { label: "🛡️ Comités de défense, de sauvegarde", value: "comites_defense" },
        { label: "🌲 Protection de sites naturels", value: "protection_sites_naturels" },
        { label: "🍃 Espaces naturels", value: "espaces_naturels" },
        { label: "🐘 Préservation de la faune sauvage", value: "preservation_faune" },
        { label: "⚡ Ressources naturelles", value: "ressources_naturelles" },
        { label: "🚮 Pollutions, assainissement", value: "pollutions" },
        { label: "🌼 Préservation de la flore sauvage", value: "preservation_flore" }
    ],
    "business_finance":[
        { label: "💼 Association à but commercial, développement économique", value: "commercial_associations" },
        { label: "🏬 Amicales de commerçants, organisation de foires", value: "traders_associations" },
        { label: "🛍️ Groupement d’achats, groupement d’entreprises", value: "business_groups" },
        { label: "💰 Gestion financière, gestion immobilière", value: "financial_management" },
        { label: "🍽️ Cantines, restaurants d’entreprises", value: "company_restaurants" },
        { label: "🚐 Transports", value: "transportation" },
        { label: "🏛️ Chambres de commerce, chambres économiques", value: "chambers_of_commerce" },
        { label: "💰 Caisses de retraite, de prévoyance, de pensions", value: "pension_funds" },
        { label: "🤝 Caisses de congés payés, caisses de secours", value: "employee_funds" }
    ],
    "social_cultural_action":[
        { label: "🌍 Jumelages, échanges culturels", value: "international_exchanges" },    
        { label: "🎉 Comités des fêtes", value: "festive_committees" },    
        { label: "👴 Clubs du troisième âge", value: "senior_clubs" },    
        { label: "🧑‍🎓 Mouvements éducatifs de jeunesse et d'éducation populaire", value: "youth_education_movements" },
        { label: "🌟 Associations socio-éducatives, scoutisme", value: "socio-educational_associations" },    
        { label: "🏠 Maisons de jeunes, foyers, clubs de jeunes", value: "youth_clubs" },    
        { label: "♿️ Loisirs pour personnes en situation de handicap", value: "disability_leisure_activities" },    
        { label: "🎭 Majorettes, twirlings, carnavals, défilés", value: "majorettes_and_carnivals" },   
        { label: "🎭 Maisons de la culture, office municipal, centres culturels", value: "cultural_centers" },  
        { label: "🌾 Foyers ruraux", value: "rural_centers" },  
        { label: "🏕️ Centres aérés, colonies de vacances", value: "holiday_centers" }
    ],
    "charity_volunteering":[
        { label: "🌍 Associations caritatives intervenant au plan international", value: "international_charity" },
        { label: "🤝 Associations caritatives à buts multiples", value: "charity" },
        { label: "🚚 Secours en nature, distribution de nourriture et de vêtements", value: "relief" },
        { label: "💰 Secours financiers et autres services aux personnes en difficulté", value: "financial_aid" },
        { label: "🤝👥 Développement du bénévolat", value: "volunteer_development" }
    ],
    "health_wellness":[
        { label: "🆘 Accompagnement, aide aux malades", value: "medical_aid" },
        { label: "📚 Organisation de professions médicales ou paramédicales", value: "medical_professions" },
        { label: "🔬 Recherche médicale", value: "medical_research" },
        { label: "🍃 Homéopathie, médecines douces", value: "alternative_medicine" },
        { label: "📚🤝 Éducation sanitaire, prévention générale", value: "health_education" },
        { label: "🥗💧 Hygiène, diététique", value: "dietetics" },
        { label: "🏥🩺 Prévention et dépistage de maladies (autres que le sida)", value: "disease_prevention" },
        { label: "👥💊 Associations de personnes malades, ou anciens malades", value: "patient_associations" },
        { label: "💰🔬 Financement de la recherche médicale", value: "medical_research_funding" },
        { label: "🏥🛌 Cliniques, centres médicaux, hôpitaux, sanatoriums, établissements de rééducation, maisons de convalescence", value: "health_care_facilities" },
        { label: "🏥🩺 Dispensaires, soins infirmiers, services paramédicaux, de garde", value: "medical_services" },
        { label: "💉❤️ Don de sang, d’organes", value: "blood_organ_donation" },
        { label: "🐶🐱 Médecine animale, vétérinaire", value: "veterinary_medicine" },
        { label: "🧑‍⚕️👨‍🔬 Organisation de congrès médicaux", value: "medical_congress" },
        { label: "🚑🆘 Services médicaux d’urgence", value: "emergency_services" },
        { label: "💉📦 Gestion de matériel médical", value: "medical_equipment_management" },
        { label: "🏥🧠 Hôpitaux psychiatriques, soins ambulatoires en santé mentale", value: "mental_health_care" },
        { label: "🏭💊 Médecine du travail", value: "occupational_medicine" },
        { label: "🏥🩺 Prévention et dépistage du sida", value: "aids_prevention" },
        { label: "🏥🏋️‍♀️ Centres de réadaptation", value: "rehabilitation_centers" },
        { label: "🤰🩺 Accueil, information pour contraception et avortement", value: "reproductive_health" }
    ],
    "economy_promotion":[
        { label: "🌱 Associations d'exploitants agricoles, élevage, horticulture, aviculture, apiculture, viticulture, viniculture", value: "agriculture" },
        { label: "💼 Représentation d’intérêts économiques sectoriels", value: "economic_interests" },
        { label: "🗺️ Représentation d’intérêts régionaux et locaux", value: "regional_interests" },
        { label: "👥 Groupements professionnels", value: "professional_groups" },
        { label: "🛍️ Associations pour la représentation d'artisans, de commerçants", value: "craftsmen_merchants" },
        { label: "🛒 Mouvements de consommateurs", value: "consumer_groups" },
        { label: "👵 Associations de défense d'intérêts des retraités ou des personnes âgées", value: "senior_citizens" },
        { label: "⚓ Association d’intérêts maritimes, marins", value: "maritime_interests" },
        { label: "📚 Association de représentation de professions libérales", value: "liberal_professions" },
        { label: "🏢 Usagers de services publics", value: "public_services_users" },
        { label: "💰 Défense des contribuables", value: "taxpayers" },
        { label: "👥 Groupements de salariés à caractère syndical", value: "trade_unions" },
        { label: "💼 Unions patronales", value: "employer_unions" },
        { label: "💰 Actionnaires, épargnants", value: "shareholders_savers" }
    ],
    "social_services":[
        { label: "🆘 Aide aux personnes en danger, solitude, désespoir, soutien psychologique et moral", value: "help_people" },
        { label: "👪 Aide et conseils aux familles", value: "family_help" },
        { label: "🧑 Aide à l’insertion des jeunes", value: "youth_insertion" },
        { label: "👨‍👩‍👧‍👦 Associations familiales, services sociaux pour les familles", value: "family_services" },
        { label: "🌊 Aide aux victimes de calamités, de catastrophes naturelles", value: "disaster_victims_help" },
        { label: "🌍 Aide aux réfugiés et aux immigrés (hors droits fondamentaux)", value: "refugees_immigrants_help" },
        { label: "🏫 Centres sociaux et socioculturels, foyers de jeunes travailleurs, centres d'études et d'action sociale", value: "social_centers" },
        { label: "📚 Lutte contre l'illettrisme", value: "illiteracy_fight" },
        { label: "💼 Groupements de chômeurs, aide aux chômeurs", value: "unemployed_help" },
        { label: "🏠 Foyers socio-éducatifs", value: "socio_educational_centers" },
        { label: "👶 Aide aux victimes de violences faites aux enfants", value: "help_children_victims" },
        { label: "🚪 Soutien, reclassement des détenus", value: "prisoners_support" },
        { label: "👊 Lutte contre diverses formes de violence", value: "violence_fight" },
        { label: "💔 Aide aux victimes de violences conjugales", value: "domestic_violence_help" },
        { label: "🚪 Réinsertion des délinquants", value: "delinquents_reinsertion" },
        { label: "🚦 Lutte contre la violence routière", value: "road_safety" },
        { label: "💰 Lutte contre le surendettement", value: "debt_prevention" }
    ],
    "information_communication":[
        { label: "🎥 Audiovisuel", value: "audiovisual" },
        { label: "🌐 Réseaux internet", value: "internet_networks" },
        { label: "📻 Autres supports de communication", value: "other_communication_media" },
        { label: "📰 Presse, édition", value: "press_publishing" },
        { label: "📻 Radios privées", value: "private_radios" },
        { label: "👂 Auditeurs, consommateurs d'outils d'information et de communication", value: "information_consumers" },
        { label: "📊 Professionnels de l'information et de communication", value: "communication_professionals" }    
    ],
    "employment_localdev":[
        { label: "🏠 Comités de défense et d'animation de quartier, association locale ou municipale", value: "defense_committees" },
        { label: "🌍 Promotion d’initiatives de développement durable", value: "sustainable_development" },
        { label: "👥 Groupement d'employeurs", value: "employer_groups" },
        { label: "🏭 Aide à la création d’activités économiques individuelles", value: "economic_activities" },
        { label: "🤝 Entreprises d'insertion, associations intermédiaires, régies de quartier", value: "insertion_organizations" },
        { label: "💼 Comité, défense d'un emploi", value: "employment_defense" }
    ],
    "civil_rights_activism":[
        { label: "🗳️ Activités civiques", value: "civic_activities" },
        { label: "📚 Information civique", value: "civic_information" },
        { label: "🕊️ Défense des libertés publiques et des droits de l’Homme", value: "human_rights" },
        { label: "👩🏻‍🦱 Défense des droits des femmes, condition féminine", value: "women_rights" },
        { label: "🚫 Lutte contre les discriminations", value: "anti_discrimination" },
        { label: "🌍 Défense des droits des personnes étrangères ou immigrées, de personnes réfugiées", value: "immigrants_refugees_rights" },
        { label: "👦 Défense des droits des enfants", value: "children_rights" },
        { label: "♿️ Défense des droits des personnes en situation de handicap", value: "handicap_rights" },
        { label: "☮️ Défense de la paix", value: "peace" },
        { label: "🌈 Association pour la défense de droits de minorités", value: "minorities_rights" },
        { label: "🌈 Défense des droits des personnes homosexuelles", value: "homosexual_rights" },
        { label: "🏡 Défense des droits des personnes rapatriées", value: "repatriated_rights" }

    ],
    "heritage_preservation":[
        { label: "🏰 Comités de défense du patrimoine", value: "heritage_committees" },
        { label: "🎖️ Commémorations, entretien de monuments et sites historiques, souvenir militaire", value: "commemoration_maintenance" },
        { label: "📚 Associations, sociétés savantes pour des études historiques, histoire du patrimoine", value: "historical_studies" },
        { label: "🖼️ Musées, collections historiques", value: "museums_collections" },
        { label: "📚 Collections d'objets, de documents, bibliothèques spécialisées pour la sauvegarde et l'entretien du patrimoine", value: "heritage_collections" },
        { label: "📜 Sociétés, clubs de généalogie", value: "genealogy_clubs" },
        { label: "🏗️ Construction de monuments (sauf lieux de culte)", value: "monument_construction" }    
    ],
    "religion_spirituality":[
    ],
    "family_elderly_services":[
        { label: "👶🏼 Crèches, garderies, haltes garderies", value: "daycare_services" },
        { label: "🧑‍🦱 Aide à domicile", value: "home_aid" },
        { label: "🧓🏻 Foyers pour personnes âgées, maisons de retraite, maisons de retraite médicalisées", value: "retirement_homes" },
        { label: "☎️ Services aux personnes âgées (téléalarme...)", value: "elderly_services" }      
    ],
    "politics_activities":[
        { label: "💰 Soutien et financement de partis et de campagnes électorales", value: "campaign_financing" },
        { label: "🏠 Action politique locale", value: "local_politics" },
        { label: "🤝 Associations à caractère politique général", value: "political_associations" },
        { label: "🌎 Action politique globale", value: "global_politics" },
        { label: "🇪🇺 Activités citoyennes européennes", value: "european_citizenship" }    
    ],
    "reflection_debate":[
        { label: "🤔 Clubs de réflexion", value: "think_tank_clubs" },
        { label: "🎤 Organisation de conférences", value: "conference_organization" },
        { label: "🤝 Associations philanthropiques", value: "philanthropic_associations" },
        { label: "👥 Amicales laïques", value: "secular_friendship_associations" }      
    ],
    "hunting_fishing":[
        { label: "🏹 Chasse", value: "hunting" },
        { label: "🎣 Pêche", value: "fishing" },
    ],
    "medical_social_care":[
        { label: "👶🏼 Accueil et protection de la petite enfance", value: "childcare" },
        { label: "🤝 Aide sociale aux personnes en situation de handicap", value: "social_aid_handicap" },
        { label: "🏥 Établissements, services pour personnes handicapées (y compris les C.A.T)", value: "disability_services" },
        { label: "🧑‍🎓 Établissements et services pour adolescents en difficulté", value: "teen_services" },
        { label: "🚫 Prévention et lutte contre l’alcoolisme, la toxicomanie", value: "addiction_prevention" },
        { label: "🏥 Établissements et services pour adultes en difficulté, CHRS (centres d'hébergement et de réadaptation sociale)", value: "adult_services" },
        { label: "🚑 Aide aux accidentés du travail", value: "accident_victims" },
        { label: "💼 Aide aux victimes de maladies professionnelles", value: "illness_victims" }
    ],
    "housing":[
        { label: "🏠 Associations et comités de locataires, de propriétaires, comités de logement", value: "tenants_property_owners" },
        { label: "🏠 Aide au logement", value: "housing_aid" },
        { label: "🚧 Réhabilitation et construction de logements", value: "housing_rehabilitation_construction" }      
    ],
    "research_innovation":[
        { label: "🧑‍🔬 Association de recherches scientifiques, sciences physiques, sciences humaines…", value: "scientific_associations" },
        { label: "🔍 Autres associations de recherche", value: "other_research_associations" },
        { label: "📚 Diffusion de savoirs, sociétés savantes ou académiques", value: "knowledge_diffusion" },
        { label: "🎭 Recherche sur la culture", value: "cultural_research" },
        { label: "🏫 Recherche sur l'éducation et la formation", value: "education_research" },
        { label: "🌍 Recherche sur la vie sociale et politique", value: "social_political_research" },
        { label: "🌳 Recherche sur l'environnement et le climat", value: "environmental_research" }    
    ],
    "military_defense":[
        { label: "🎖️ Anciens combattants", value: "veterans" },
        { label: "👥 Associations de militaires, amicales, associations de conscrits", value: "military_associations" }
    ],
    "travel_tourism":[
        { label: "🌍 Syndicats d'initiative, offices de tourisme, salons du tourisme", value: "tourism_offices" },
        { label: "🏨 Auberges de jeunesse, organisation de voyages", value: "youth_hostels" },
        { label: "🏕️ Gîtes ruraux, camping, caravaning, naturisme", value: "rural_accommodation" },
        { label: "🌴 Maisons et villages de vacances", value: "holiday_resorts" }    
    ],
    "security_emergencyservices":[
        { label: "🚒 Amicale de sapeurs-pompiers", value: "firefighters_association" },    
        { label: "🆘 Sauvetage, secourisme, protection civile", value: "rescue_civil_protection" },  
        { label: "📚 Prévention, formation, cours de secourisme", value: "prevention_training" },  
        { label: "🚗 Sécurité routière", value: "road_safety" },   
        { label: "🌊 Sauvetage en mer", value: "sea_rescue" },    
        { label: "⛰️ Sécurité et sauvetage en montagne", value: "mountain_rescue" }
    ],
    "justice":[
        { label: "🤝 Médiation, prévention", value: "mediation_prevention" },
        { label: "👥 Défense des droits des victimes", value: "victims_rights" },
        { label: "🧑‍⚖️ Contrôle judiciaire, associations de personnels de justice", value: "judicial_control" },
        { label: "📝 Accès aux droits dans les tribunaux, assistance juridique", value: "legal_assistance" },
        { label: "🏛️ Maisons du droit, accès au droit", value: "access_to_law" }    
    ]

};
  
export default subcategories;

