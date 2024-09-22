from transformers import AutoTokenizer, AutoModelForCausalLM
from flask import Flask, request, jsonify
from transformers import pipeline
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model = None
tokenizer = None
classifier = pipeline(task="text-classification", model="SamLowe/roberta-base-go_emotions", top_k=None) # Uncomment this line to download the model from the internet
# classifier = pipeline(task="text-classification", model="roberta-base-go_emotions", top_k=None) # Use this for the local model

@app.route("/load_model", methods=["GET"])
def load_model():
    global model, tokenizer
    # Uncomment the line below to download the model from the internet
    model_name = "google/gemma-2b-it"
    # model_name = "gemma-2b-it" # Use this for the local model
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForCausalLM.from_pretrained(model_name)
    return jsonify({"status": "Model loaded successfully"})


@app.route("/predict", methods=["POST"])
def predict():
    global model, tokenizer
    if model is None or tokenizer is None:
        return jsonify({"error": "Model not loaded. Please load the model by accessing the /load_model route."})

    data = request.json
    input_text = data.get("inputs", "")
    no_of_words = data.get("words", 3)
    emotions = classifier(input_text)[0]

    # Function to predict next words
    def predict_next_words(input_text, num_words=3):
        try:
            print("Tokenizing...")
            input_ids = tokenizer.encode(input_text, return_tensors="pt")
            print("Tokens are generating...")
            outputs = model.generate(
                input_ids=input_ids,
                max_length=len(input_ids[0]) + num_words,
                num_return_sequences=1,
                pad_token_id=tokenizer.eos_token_id
            )
            print("Words are decoding from tokens...")
            predictions = [tokenizer.decode(output, skip_special_tokens=True) for output in outputs]
            return predictions
        except Exception as e:
            return str(e)

    predicted_words = predict_next_words(input_text, no_of_words)
    print(f"input: {input_text}")
    print(f"output: {predicted_words[0]}")
    return jsonify([{"generated_text": predicted_words[0], "emotions": emotions}])

if __name__ == "__main__":
    app.run(host='0.0.0.0')
