import openai
import gradio
import os

openai.api_key = "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"

messages = [{"role": "system", "content": "you can answer anything"}]

def CustomChatGPT(user_input):
    messages.append({"role": "user", "content": user_input})
    response = openai.ChatCompletion.create(
        model = "gpt-3.5-turbo",
        messages = messages
    )
    ChatGPT_reply = response["choices"][0]["message"]["content"]
    messages.append({"role": "assistant", "content": ChatGPT_reply})
    return ChatGPT_reply

demo = gradio.Interface(fn=CustomChatGPT, inputs = "text", outputs = "text", title = "Xohoj.ai")

demo.launch(share=True)