import random
sentence = "Hello, you are looking *adj today."
sentence = sentence.split()
adjectives = ["beautiful", "handsome", "pretty", "warm", "fantastic"]
#;sentence[4] =  input("Enter an adjective: ")
#;print(sentence)

#;for word in sentence:
#;    print(word)
        
indexCount = 0
for word in sentence:
    if word == "*adj":
        wordChoice = random.choice(adjectives)
        sentence[indexCount] = wordChoice
    indexCount += 1

st = ""
for word in sentence:
    st += word + " "
print(st)
