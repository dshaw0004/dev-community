import { Link } from 'expo-router';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Title, Paragraph, Divider, List } from 'react-native-paper';


export default function About() {
  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Dev Community Mobile</Title>
          <Paragraph style={styles.paragraph}>
            A mobile client for DEV Community (dev.to), designed to bring you the best developer content on the go.
            Made by <Link href={'https://dshaw0004.netlify.app'} target='_blank'>@dshaw0004</Link>
          </Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant='bodyLarge' style={styles.subtitle}>Disclaimer</Text>
          <Divider style={styles.divider} />
          <List.Item
            left={props => <List.Icon {...props} icon="information" />}
            title="Content Attribution"
            description="This app does not own any of the post data. All content is sourced directly from DEV Community (dev.to) through their public API."
          />
          <List.Item
            left={props => <List.Icon {...props} icon="api" />}
            title="API Usage"
            description="This app serves as a wrapper around the official DEV Community API, providing a mobile-friendly interface to access their content."
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant='bodyLarge' style={styles.subtitle}>About DEV Community</Text>
          <Divider style={styles.divider} />
          <Text variant='bodySmall' style={styles.paragraph}>
            DEV Community is a community of software developers getting together to help one another out. The platform is open source and free to use.
          </Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
  },
  divider: {
    marginVertical: 12,
  },
});
