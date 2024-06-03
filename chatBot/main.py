import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

# Load pre-trained DialoGPT medium model and tokenizer from Hugging Face
model_name = 'microsoft/DialoGPT-small'
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

# If you have a GPU, move the model to GPU and set it to FP16
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model.to(device)
model.half()  # Set model weights to FP16 for better performance
max_tokens = 8192
print("Using device:", device)

# Function to generate a response from the model using beam search
def generate_response(text: str, chat_history_ids=None):
    # Tokenizing the text after appending with <EOS> token.
    new_user_input_ids = tokenizer.encode(text + tokenizer.eos_token, return_tensors='pt').to(device)

    # Concatenating with the chat history if any.
    if chat_history_ids is not None:
        bot_input_ids = torch.cat([chat_history_ids, new_user_input_ids], dim=-1)
    else:
        bot_input_ids = new_user_input_ids

    # Generate a response using beam search
    chat_history_ids = model.generate(
        bot_input_ids,
        max_length=max_tokens,
        pad_token_id=tokenizer.eos_token_id,
        num_beams=3,
        early_stopping=True
    )

    # Decoding the generated response
    response = tokenizer.decode(chat_history_ids[:, bot_input_ids.shape[-1]:][0], skip_special_tokens=True)

    return response, chat_history_ids

# Initial message to be included in the context
initial_message = '''My name is MonkeMan,
I am a DialoGPT-based chatbot.
I am interacting with a user.
I will only speak in English.
I will keep my responses as small as possible unless told otherwise.
My job/task is to help the user with their monke chat related questions.
The user can type 'exit' to end the conversation.'''
history = tokenizer.encode(initial_message + tokenizer.eos_token, return_tensors='pt').to(device)

print("Hello! I am a DialoGPT-medium chatbot. How can I help you today? Type 'exit' to end the conversation.")
while True:
    user_input = input("You: ")
    if user_input.lower() == 'exit':
        print("Goodbye!")
        break

    # Generate and print response from the model
    response, history = generate_response(user_input, history)
    print("Bot:", response)

    # Ensure history length is manageable (up to 2048 tokens, keeping the initial message)
    if history.shape[1] > max_tokens:
        history = history[:, -max_tokens:]
