interface Category {
  label: string;
  value: string;
}

const categories: Category[] = [
  { label: "🎨 Art et Culture", value: "artistic_activities" },
  { label: "⚽ Sports et activités de plein air", value: "sports" },
  { label: "👫 Amicales, groupements affinitaires, groupes d'entraide", value: "community_support" },
  { label: "🎓 Éducation et formation", value: "education_training" },
  { label: "🎉 Clubs de loisirs et de rencontres", value: "clubs_relationships" },
  { label: "🌳 Environnement et cadre de vie", value: "environment_living" },
  { label: "💼 Conduite d'activités économiques", value: "business_finance" },
  { label: "📣 Action socio-culturelle", value: "social_cultural_action" },
  { label: "❤️ Associations caritatives et bénévolat", value: "charity_volunteering" },
  { label: "💊 Santé et bien-être", value: "health_wellness" },
  { label: "📈 Représentation et défense d'intérêts économiques", value: "economy_promotion" },
  { label: "🏘️ Interventions sociales", value: "social_services" },
  { label: "💬 Information et communication", value: "information_communication" },
  { label: "🌻 Aide à l'emploi, développement local ", value: "employment_localdev" },
  { label: "🗽 Défense de droits fondamentaux et activités civiques", value: "civil_rights_activism" },
  { label: "🏰 Préservation du patrimoine", value: "heritage_preservation" },
  { label: "🙏 Activités religieuses, spirituelles ou philosophiques", value: "religion_spirituality" },
  { label: "👪 Services familiaux et aux personnes âgées", value: "family_elderly_services" },
  { label: "🗳️ Activités politiques", value: "politics_activities" },
  { label: "💭 Clubs et cercles de réflexion", value: "reflection_debate" },
  { label: "🎣 Chasse et pêche", value: "hunting_fishing" },
  { label: "🏥 Services et établissements médico-sociaux", value: "medical_social_care" },
  { label: "🏠 Logement", value: "housing" },
  { label: "🔬 Recherche et innovation", value: "research_innovation" },
  { label: "🎖️ Armée (dont préparation militaire, médailles)", value: "military_defense" },
  { label: "🌍 Tourisme", value: "travel_tourism" },
  { label: "🚨 Sécurité et services de secours", value: "security_emergencyservices" },
  { label: "⚖️ Justice", value: "justice" },
];

export default categories;