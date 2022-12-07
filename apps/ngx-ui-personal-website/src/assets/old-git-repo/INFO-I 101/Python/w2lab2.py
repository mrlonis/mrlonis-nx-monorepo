import random
from typing import cast

sentence: str = "Man I *emotion how *adj *noun looks."
sentence_split = cast(list[str], sentence.split())
adjectives = ["beautiful", "handsome", "pretty", "warm", "fantastic"]
nouns = ["Joey", "Matthew", "Morgen", "Chris", "Ethan", "Connor"]
emotions = ["love", "hate", "adore", "am obsessed with"]

indexCount = 0
for word in sentence_split:
    if word == "*adj":
        wordChoice = random.choice(adjectives)
        sentence_split[indexCount] = wordChoice
    if word == "*noun":
        wordChoice = random.choice(nouns)
        sentence_split[indexCount] = wordChoice
    if word == "*emotion":
        wordChoice = random.choice(emotions)
        sentence_split[indexCount] = wordChoice
    indexCount += 1

st = ""
for word in sentence_split:
    st += word + " "
print(st)

a = 33
while True:
    guess=int(input("Please guess a number:"))
    if (guess-a) >= 50:
        print("You're too high off by at least 50.")
    elif guess > int(a):
        print("Too high!")
    elif (a-guess) >= 50:
        print("You're too low off by at least 50.")
    elif guess < int(a):
        print("Too low!")
    else:
        print("You got it")
        break

item = ""
while adjectives:
    item = random.choice(adjectives)
    print(adjectives)
    adjectives.remove(item)
while nouns:
    item = random.choice(nouns)
    print(nouns)
    nouns.remove(item)
while emotions:
    item = random.choice(emotions)
    print(emotions)
    emotions.remove(item)
