import random
print(random.randint(1, 10))
print(random.randint(1, 100))

colorsList = ["black", "brown", "orange", "green", "blue", "purple", "yellow"]
myColor = random.choice(colorsList)
print(myColor)
while colorsList:
    myColor = random.choice(colorsList)
    print(myColor)
    colorsList.remove(myColor)
