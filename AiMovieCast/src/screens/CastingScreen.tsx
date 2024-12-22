import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
  SafeAreaView,
  TextInput,
  ScrollView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type CastingScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Casting'>;
};

const categories = ['All', 'Hollywood', 'Bollywood', 'European', 'Asian', 'Turkish'];

const mockActors = [
  { id: '1', name: 'Tom Cruise', category: 'Hollywood', image: 'https://via.placeholder.com/150' },
  { id: '2', name: 'Shah Rukh Khan', category: 'Bollywood', image: 'https://via.placeholder.com/150' },
  { id: '3', name: 'Marion Cotillard', category: 'European', image: 'https://via.placeholder.com/150' },
  { id: '4', name: 'Actor 1', category: 'Hollywood', image: 'https://via.placeholder.com/150' },
  { id: '5', name: 'Actor 2', category: 'Bollywood', image: 'https://via.placeholder.com/150' },
  { id: '6', name: 'Actor 3', category: 'European', image: 'https://via.placeholder.com/150' },
];

const CastingScreen = ({ navigation }: CastingScreenProps) => {
  const [selectedActors, setSelectedActors] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const toggleActorSelection = (actorId: string) => {
    setSelectedActors(prev => 
      prev.includes(actorId)
        ? prev.filter(id => id !== actorId)
        : [...prev, actorId]
    );
  };

  const filteredActors = mockActors.filter(actor => {
    const matchesSearch = actor.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || actor.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search actors..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            style={[styles.categoryButton, selectedCategory === category && styles.selectedCategory]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[styles.categoryText, selectedCategory === category && styles.selectedCategoryText]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filteredActors}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.actorCard, selectedActors.includes(item.id) && styles.selectedCard]}
            onPress={() => toggleActorSelection(item.id)}
          >
            <Image source={{ uri: item.image }} style={styles.actorImage} />
            <Text style={styles.actorName}>{item.name}</Text>
          </TouchableOpacity>
        )}
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
    padding: 10,
  },
  searchInput: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 25,
    marginBottom: 10,
  },
  categoriesContainer: {
    marginBottom: 10,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#ffffff',
  },
  selectedCategory: {
    backgroundColor: '#e74c3c',
  },
  categoryText: {
    color: '#34495e',
  },
  selectedCategoryText: {
    color: '#ffffff',
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
  listContainer: {
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
  },
  button: {
    backgroundColor: '#e74c3c',
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
    fontWeight: 'bold',
  },
});

export default CastingScreen;
