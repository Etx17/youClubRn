import { gql } from "@apollo/client";

export const CREATE_ACTIVITY = gql`
  mutation CreateActivity(
    $name: String!,
    $category: String!,
    $recurrence: String,
    $images: [String!],
    $subcategories: String!,
    $shortDescription: String!,
    $fullDescription: String!,
    $clubId: ID!,
    $freeTrial: Boolean!
  ) {
    createActivity(
      input: {
        name: $name,
        category: $category,
        recurrence: $recurrence,
        images: $images,
        subcategories: $subcategories,
        shortDescription: $shortDescription,
        fullDescription: $fullDescription,
        clubId: $clubId,
        freeTrial: $freeTrial
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
