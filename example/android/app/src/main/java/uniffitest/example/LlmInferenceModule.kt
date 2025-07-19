package uniffitest.example

import com.facebook.react.bridge.*
import com.google.mediapipe.tasks.genai.llminference.LlmInference

class LlmInferenceModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String = "LlmInferenceModule"

  private var llm: LlmInference? = null

  @ReactMethod
  fun init(promise: Promise) {
    Thread {
      try {
        // Copies asset to /data/data/<pkg>/files so MediaPipe can mmap it
        val assetName = "llm/gemma3-1b-it-int4.task"
        val outFile = reactApplicationContext.filesDir.resolve("gemma3-1b-it-int4.task")
        if (!outFile.exists()) {
          reactApplicationContext.assets.open(assetName).use { ins ->
            outFile.outputStream().use { outs -> ins.copyTo(outs) }
          }
        }

        val opts = LlmInference.LlmInferenceOptions.builder()
          .setModelPath(outFile.absolutePath)
          .setMaxTokens(1024)
          .build()

        llm = LlmInference.createFromOptions(reactApplicationContext, opts)
        promise.resolve("ok")
      } catch (e: Exception) {
        promise.reject("INIT", e.message, e)
      }
    }.start()
  }

  @ReactMethod
  fun generate(prompt: String, promise: Promise) {
    Thread {
      try {
        val res = llm?.generateResponse(prompt) ?: ""
        promise.resolve(res)
      } catch (e: Exception) {
        promise.reject("GEN", e.message, e)
      }
    }.start()
  }
}