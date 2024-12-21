import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

type PosterCreatorScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'PosterCreator'>;
  route: RouteProp<RootStackParamList, 'PosterCreator'>;
};

const PosterCreatorScreen = ({ navigation, route }: PosterCreatorScreenProps) => {
  const [movieTitle, setMovieTitle] = useState('');
  const [movieGenre, setMovieGenre] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { selectedActors } = route.params;

  const generatePoster = async () => {
    if (!movieTitle.trim()) {
      // Show error message
      return;
    }

    setIsGenerating(true);
    // TODO: Implement poster generation logic
    setTimeout(() => {
      setIsGenerating(false);
      // Navigate to preview or download screen
    }, 2000);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Create Movie Poster</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Movie Title</Text>
          <TextInput
            style={styles.input}
            value={movieTitle}
            onChangeText={setMovieTitle}
            placeholder="Enter movie title"
            placeholderTextColor="#95a5a6"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Genre</Text>
          <TextInput
            style={styles.input}
            value={movieGenre}
            onChangeText={setMovieGenre}
            placeholder="Enter movie genre"
            placeholderTextColor="#95a5a6"
          />
        </View>

        <View style={styles.selectedActorsContainer}>
          <Text style={styles.label}>Selected Cast</Text>
          <Text style={styles.actorsText}>
            {selectedActors.length} actors selected
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.generateButton,
            (!movieTitle.trim() || isGenerating) && styles.disabledButton
          ]}
          onPress={generatePoster}
          disabled={!movieTitle.trim() || isGenerating}
        >
          {isGenerating ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.generateButtonText}>Generate Poster</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2c3e50',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#34495e',
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#2c3e50',
    borderWidth: 1,
    borderColor: '#bdc3c7',
  },
  selectedActorsContainer: {
    marginBottom: 20,
  },
  actorsText: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  generateButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#95a5a6',
  },
  generateButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PosterCreatorScreen;
