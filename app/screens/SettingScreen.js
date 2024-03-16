import { Button, StyleSheet, Text, View } from 'react-native';

export default function SettingScreen({ signOut }) {
  return (
    <View style={styles.container}>
      <Text>Setting Screen</Text>
      <Button
        onPress={() => signOut()}
        title="Log out"
        color="blue"
        accessibilityLabel="Log out button"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
