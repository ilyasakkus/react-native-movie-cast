import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type CastingScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Casting'>;
};

// Temporary mock data - this will be replaced with actual API data
const mockActors = [
  { id: '1', name: 'Actor 1', image: 'https://via.placeholder.com/150' },
  { id: '2', name: 'Actor 2', image: 'https://via.placeholder.com/150' },
  { id: '3', name: 'Actor 3', image: 'https://via.placeholder.com/150' },
  // Add more mock actors here
];

const CastingScreen = ({ navigation }: CastingScreenProps) => {
  const [selectedActors, setSelectedActors] = useState<string[]>([]);

  const toggleActorSelection = (actorId: string) => {
    setSelectedActors(prev => 
      prev.includes(actorId)
        ? prev.filter(id => id !== actorId)
        : [...prev, actorId]
    );
  };

  const renderActorItem = ({ item }: { item: typeof mockActors[0] }) => (
    <TouchableOpacity
      style={[
        styles.actorCard,
        selectedActors.includes(item.id) && styles.selectedCard
      ]}
      onPress={() => toggleActorSelection(item.id)}
    >
      <Image source={{ uri: item.image }} style={styles.actorImage} />
      <Text style={styles.actorName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={mockActors}
        renderItem={renderActorItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, selectedActors.length === 0 && styles.disabledButton]}
          disabled={selectedActors.length === 0}
          onPress={() => navigation.navigate('SceneCreator', { selectedActors })}
        >
          <Text style={styles.buttonText}>Create Scene</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, selectedActors.length === 0 && styles.disabledButton]}
          disabled={selectedActors.length === 0}
          onPress={() => navigation.navigate('PosterCreator', { selectedActors })}
        >
          <Text style={styles.buttonText}>Create Poster</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  listContainer: {
    padding: 10,
  },
  actorCard: {
    flex: 1,
    margin: 5,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  selectedCard: {
    backgroundColor: '#e8f5e9',
    borderColor: '#4caf50',
    borderWidth: 2,
  },
  actorImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  actorName: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonContainer: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#2ecc71',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    minWidth: 150,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#bdc3c7',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CastingScreen;
