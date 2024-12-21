import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

type SceneCreatorScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SceneCreator'>;
  route: RouteProp<RootStackParamList, 'SceneCreator'>;
};

const SceneCreatorScreen = ({ navigation, route }: SceneCreatorScreenProps) => {
  const [selectedDuration, setSelectedDuration] = useState<number>(5);
  const [isGenerating, setIsGenerating] = useState(false);
  const { selectedActors } = route.params;

  const durations = [5, 10, 20];

  const generateScene = async () => {
    setIsGenerating(true);
    // TODO: Implement scene generation logic
    setTimeout(() => {
      setIsGenerating(false);
      // Navigate back or to a preview screen
    }, 2000);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Create Your Scene</Text>
        
        <View style={styles.durationSelector}>
          <Text style={styles.sectionTitle}>Select Duration</Text>
          <View style={styles.durationButtons}>
            {durations.map(duration => (
              <TouchableOpacity
                key={duration}
                style={[
                  styles.durationButton,
                  selectedDuration === duration && styles.selectedDuration,
                ]}
                onPress={() => setSelectedDuration(duration)}
              >
                <Text style={[
                  styles.durationButtonText,
                  selectedDuration === duration && styles.selectedDurationText,
                ]}>
                  {duration}s
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.selectedActorsContainer}>
          <Text style={styles.sectionTitle}>Selected Cast</Text>
          <Text style={styles.actorsText}>
            {selectedActors.length} actors selected
          </Text>
        </View>

        <TouchableOpacity
          style={styles.generateButton}
          onPress={generateScene}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.generateButtonText}>Generate Scene</Text>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#34495e',
  },
  durationSelector: {
    marginBottom: 20,
  },
  durationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  durationButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#ecf0f1',
    minWidth: 80,
    alignItems: 'center',
  },
  selectedDuration: {
    backgroundColor: '#3498db',
  },
  durationButtonText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  selectedDurationText: {
    color: '#ffffff',
  },
  selectedActorsContainer: {
    marginVertical: 20,
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
  generateButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SceneCreatorScreen;
