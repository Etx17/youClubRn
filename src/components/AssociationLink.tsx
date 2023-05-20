import React from 'react';
import { Text, StyleSheet, Linking } from 'react-native';
import colors from '../themes/colors';

const AssociationLink = () => {
  const handlePress = () => {
    Linking.openURL(
      'mailto:youclubdev@gmail.com?subject=%5BDemande%20de%20v%C3%A9rification%20de%20profil%20d%27association%5D&body=%2A%2A%2ABonjour%2C%0D%0A%0D%0AVous%20faites%20partie%20des%20premi%C3%A8res%20associations%20%C3%A0%20revendiquer%20leur%20profil.%20La%20v%C3%A9rification%20est%20gratuite%21%20Nous%20avons%20besoin%20de%20:%0D%0A%0D%0A-%20Statuts%2C%20preuves%20d%27enregistrement%20ou%20PV%20de%20r%C3%A9union%20indiquant%20votre%20nomination%2C%0D%0A-%20Pi%C3%A8ce%20d%27identit%C3%A9%20ou%20passeport%2C%0D%0A-%20Num%C3%A9ro%20de%20t%C3%A9l%C3%A9phone%2C%0D%0A-%20Email%20de%20l%27association%2C%0D%0A-%20Num%C3%A9ro%20RNA.%0D%0A%0D%0AApr%C3%A8s%20v%C3%A9rification%2C%20vous%20recevrez%20vos%20identifiants.%20Vous%20pourrez%20modifier%20votre%20profil%20d%C3%A8s%20la%20prochaine%20MAJ.%0D%0A%0D%0AAjoutez%20vos%20infos%20apr%C3%A8s%20ce%20texte.%0D%0A%0D%0ACordialement%2C%0D%0AYouClub%2A%2A%2A'
    );
  };

  return (
    <Text style={styles.link} onPress={handlePress}>
      C'est votre association ? Cliquez ici
    </Text>
  );
};

const styles = StyleSheet.create({
  link: {
    color: colors.primary,
    marginTop: 10,
  },
  subCategoryTag:{
    marginVertical: 0,
    fontSize: 14,
    color: colors.primary,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    overflow: 'hidden',
    backgroundColor: 'transparent',
    width: "auto"
    },
});

export default AssociationLink;
