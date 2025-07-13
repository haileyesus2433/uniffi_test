/* eslint-disable react/no-unstable-nested-components */
import { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import {
  TextAnalyzer,
  type TextAnalysisResult,
  quickPalindromeCheck,
  quickWordCount,
  quickReverseText,
} from 'react-native-uniffi_test';

const { width } = Dimensions.get('window');

// Create a global analyzer instance
const analyzer = new TextAnalyzer();

export default function App() {
  const [inputText, setInputText] = useState('');
  const [analysisResult, setAnalysisResult] =
    useState<TextAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeText = async () => {
    if (!inputText.trim()) {
      Alert.alert('Error', 'Please enter some text to analyze');
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = analyzer.analyzeText(inputText);
      setAnalysisResult(result);
    } catch (error: any) {
      Alert.alert('Analysis Error', error.toString());
    }
    setIsAnalyzing(false);
  };

  const clearAll = () => {
    setInputText('');
    setAnalysisResult(null);
    analyzer.clearHistory();
  };

  const quickAnalysis = () => {
    if (!inputText.trim()) {
      Alert.alert('Error', 'Please enter some text for quick analysis');
      return;
    }

    const wordCount = quickWordCount(inputText);
    const isPalindrome = quickPalindromeCheck(inputText);
    const reversed = quickReverseText(inputText);

    Alert.alert(
      'Quick Analysis',
      `Words: ${wordCount}\nPalindrome: ${isPalindrome ? 'Yes' : 'No'}\nReversed: "${reversed}"`
    );
  };

  const ResultCard = ({
    title,
    value,
    icon,
  }: {
    title: string;
    value: string | number;
    icon: string;
  }) => (
    <View style={styles.resultCard}>
      <Text style={styles.resultIcon}>{icon}</Text>
      <View style={styles.resultContent}>
        <Text style={styles.resultTitle}>{title}</Text>
        <Text style={styles.resultValue}>{value}</Text>
      </View>
    </View>
  );

  const TextVariationCard = ({
    title,
    text,
  }: {
    title: string;
    text: string;
  }) => (
    <View style={styles.textVariationCard}>
      <Text style={styles.textVariationTitle}>{title}</Text>
      <Text style={styles.textVariationContent} numberOfLines={3}>
        {text}
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📝 Text Analyzer</Text>
        <Text style={styles.subtitle}>Powered by Rust + UniFFI</Text>
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.sectionTitle}>Enter Your Text</Text>
        <TextInput
          style={styles.textInput}
          multiline
          placeholder="Type or paste your text here..."
          placeholderTextColor="#999"
          value={inputText}
          onChangeText={setInputText}
          textAlignVertical="top"
        />

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={analyzeText}
            disabled={isAnalyzing}
          >
            <Text style={styles.buttonText}>
              {isAnalyzing ? '🔄 Analyzing...' : '🔍 Analyze Text'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={quickAnalysis}
          >
            <Text style={styles.secondaryButtonText}>⚡ Quick</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.clearButton]}
            onPress={clearAll}
          >
            <Text style={styles.clearButtonText}>🗑️ Clear</Text>
          </TouchableOpacity>
        </View>
      </View>

      {analysisResult && (
        <View style={styles.resultsSection}>
          <Text style={styles.sectionTitle}>Analysis Results</Text>

          {/* Basic Stats */}
          <View style={styles.statsGrid}>
            <ResultCard
              title="Characters"
              value={analysisResult.characterCount}
              icon="🔤"
            />
            <ResultCard
              title="Words"
              value={analysisResult.wordCount}
              icon="📝"
            />
            <ResultCard
              title="Sentences"
              value={analysisResult.sentenceCount}
              icon="💬"
            />
            <ResultCard
              title="Paragraphs"
              value={analysisResult.paragraphCount}
              icon="📄"
            />
          </View>

          {/* Special Analysis */}
          <View style={styles.specialAnalysis}>
            <View
              style={[
                styles.palindromeCard,
                analysisResult.isPalindrome
                  ? styles.palindromeYes
                  : styles.palindromeNo,
              ]}
            >
              <Text style={styles.palindromeIcon}>
                {analysisResult.isPalindrome ? '✅' : '❌'}
              </Text>
              <Text style={styles.palindromeText}>
                {analysisResult.isPalindrome
                  ? 'Is a Palindrome!'
                  : 'Not a Palindrome'}
              </Text>
            </View>
          </View>

          {/* Language Stats */}
          <View style={styles.languageStats}>
            <ResultCard
              title="Vowels"
              value={analysisResult.vowelCount}
              icon="🔤"
            />
            <ResultCard
              title="Consonants"
              value={analysisResult.consonantCount}
              icon="🔡"
            />
            {analysisResult.mostCommonWord && (
              <View style={styles.mostCommonCard}>
                <Text style={styles.mostCommonTitle}>Most Common Word</Text>
                <Text style={styles.mostCommonWord}>
                  "{analysisResult.mostCommonWord}"
                </Text>
                <Text style={styles.mostCommonCount}>
                  ({analysisResult.mostCommonWordCount} times)
                </Text>
              </View>
            )}
          </View>

          {/* Text Variations */}
          <View style={styles.textVariations}>
            <Text style={styles.subsectionTitle}>Text Variations</Text>
            <TextVariationCard
              title="UPPERCASE"
              text={analysisResult.uppercaseText}
            />
            <TextVariationCard
              title="lowercase"
              text={analysisResult.lowercaseText}
            />
            <TextVariationCard
              title="Title Case"
              text={analysisResult.titleCaseText}
            />
            <TextVariationCard
              title="Reversed"
              text={analysisResult.reversedText}
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#4a90e2',
    padding: 20,
    paddingTop: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#e3f2fd',
  },
  inputSection: {
    padding: 20,
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    minHeight: 120,
    backgroundColor: '#fafafa',
    fontFamily: 'monospace',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
  },
  primaryButton: {
    backgroundColor: '#4a90e2',
    flex: 2,
  },
  secondaryButton: {
    backgroundColor: '#28a745',
  },
  clearButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  clearButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  resultsSection: {
    padding: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  resultCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: (width - 50) / 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  resultIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  resultContent: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  resultValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  specialAnalysis: {
    marginBottom: 20,
  },
  palindromeCard: {
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  palindromeYes: {
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb',
    borderWidth: 1,
  },
  palindromeNo: {
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
    borderWidth: 1,
  },
  palindromeIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  palindromeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  languageStats: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  mostCommonCard: {
    backgroundColor: '#fff3cd',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    borderColor: '#ffeaa7',
    borderWidth: 1,
  },
  mostCommonTitle: {
    fontSize: 12,
    color: '#856404',
    fontWeight: '500',
  },
  mostCommonWord: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 5,
  },
  mostCommonCount: {
    fontSize: 12,
    color: '#666',
  },
  textVariations: {
    marginTop: 10,
  },
  subsectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  textVariationCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  textVariationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4a90e2',
    marginBottom: 8,
  },
  textVariationContent: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'monospace',
    lineHeight: 22,
  },
});
