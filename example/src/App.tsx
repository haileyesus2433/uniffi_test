import { useState, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { useLlm } from './useLlm';

type Message = { id: string; from: 'me' | 'ai'; text: string };

export default function App() {
  const { ready, loading, error, ask } = useLlm();
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const send = useCallback(async () => {
    const p = prompt.trim();
    if (!p) return;
    setMessages((m) => [
      ...m,
      { id: Date.now().toString(), from: 'me', text: p },
    ]);
    setPrompt('');
    try {
      const ans = await ask(p);
      setMessages((m) => [
        ...m,
        { id: Date.now().toString(), from: 'ai', text: ans },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          id: Date.now().toString(),
          from: 'ai',
          text: 'Error generating answer.',
        },
      ]);
    }
  }, [prompt, ask]);

  if (!ready && !error)
    return (
      <View style={styles.center}>
        <Text style={styles.loading}>Loading model…</Text>
      </View>
    );

  if (error)
    return (
      <View style={[styles.center, { backgroundColor: '#fee' }]}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Text style={styles.title}>UNIFFI WITH LLM INFERENCE</Text>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[styles.bubble, item.from === 'me' ? styles.me : styles.ai]}
          >
            <Text style={styles.msg}>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={styles.messages}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.inputBar}>
          <TextInput
            style={styles.input}
            placeholder="Ask anything…"
            value={prompt}
            onChangeText={setPrompt}
            multiline
            maxLength={512}
          />
          <TouchableOpacity
            style={[
              styles.send,
              (!prompt.trim() || loading) && styles.disabled,
            ]}
            onPress={send}
            disabled={!prompt.trim() || loading}
          >
            <Text style={styles.sendTxt}>{loading ? '…' : 'Send'}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loading: { fontSize: 16, color: '#555' },
  errorText: { fontSize: 16, color: '#c33' },
  title: {
    fontSize: 22,
    fontWeight: '600',
    alignSelf: 'center',
    marginVertical: 12,
  },
  messages: { paddingHorizontal: 16, paddingBottom: 8 },
  bubble: { maxWidth: '80%', borderRadius: 16, padding: 12, marginVertical: 4 },
  me: { alignSelf: 'flex-end', backgroundColor: '#e3f2fd' },
  ai: { alignSelf: 'flex-start', backgroundColor: '#f1f3f4' },
  msg: { fontSize: 15, color: '#111' },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 8,
    borderTopWidth: 0.5,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    marginRight: 8,
    maxHeight: 100,
  },
  send: {
    backgroundColor: '#1976d2',
    borderRadius: 20,
    minWidth: 56,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: { backgroundColor: '#bdbdbd' },
  sendTxt: { color: '#fff', fontSize: 14, fontWeight: '500' },
});
