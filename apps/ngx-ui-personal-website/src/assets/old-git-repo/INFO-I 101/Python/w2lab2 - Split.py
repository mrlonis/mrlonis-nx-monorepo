import random
from typing import cast

sentence = "Hello, you are looking *adj today."
sentence_split = cast(list[str], sentence.split())
adjectives = ["beautiful", "handsome", "pretty", "warm", "fantastic"]
#;sentence[4] =  input("Enter an adjective: ")
#;print(sentence)

#;for word in sentence:
#;    print(word)

indexCount = 0
for word in sentence_split:
    if word == "*adj":
        wordChoice: str = random.choice(adjectives)
        sentence_split[indexCount] = wordChoice
    indexCount += 1

st = ""
for word in sentence:
    st += word + " "
print(st)
