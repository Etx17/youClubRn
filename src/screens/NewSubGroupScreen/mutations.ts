import { gql } from "@apollo/client";

export const CREATE_SUBGROUP = gql`
  mutation CreateSubGroup(
    $name: String!,
    $shortDescription: String!,
    $activityId: ID!,
    $minPrice: Float!,
    $classType: String!,
    $tarifications: [String!]
  ) {
    createSubGroup(
      input: {
        name: $name,
        shortDescription: $shortDescription,
        activityId: $activityId,
        minPrice: $minPrice,
        classType: $classType,
        tarifications: $tarifications
      }
    ) {
      id
    }
  }
`;


// export const CREATE_ACTIVITY = gql`
//   mutation CreateActivity($input: CreateActivityInput!) {
//     createActivity(input: $input) {
//       clubId
//       name
//       category
//       subcategories
//       fullDescription
//       images
//       freeTrial
//     }
//   }
// `;


// mutation {
//   createActivity (
//    input: {
//     name :"Dance Center",
//     category: "Sports, activités de plein air",
//     recurrence: "Annuel",
//     images: ["katanart.jpeg", "katanart.jpeg"],
//     subcategories: "Danse",
//     shortDescription: "De la danse tout types toux niveaux",
//     fullDescription: "Branche thérapeutique des arts martiaux, le Qi Gong permet de faire circuler harmonieusement les flux énergétiques du corps afin de préserver la santé. Art du mouvement conscient par excellence, il permet d’agir sur la respiration, l’oxygénation, la colonne vertébrale et l’ensemble des articulations. le terme “holistique” signifie qu’au travers de cette pratique, l’ensemble de la structure de l’être est harmonisée (physique, mental, émotionnel, spirituel). À tous les cours, à tous les âges, sont pratiqués des mouvements de Qi Gong.  Des cours totalement dédiés à cette pratique sont proposés. ",
//     clubId: 1
//    }
//  )
