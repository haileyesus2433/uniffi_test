import { NativeModules } from 'react-native';
const { LlmInferenceModule } = NativeModules;

export const initLlm = (): Promise<string> => LlmInferenceModule.init();
export const generateLlm = (prompt: string): Promise<string> =>
  LlmInferenceModule.generate(prompt);
