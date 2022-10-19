while True:
    a = input("Enter a number between 1 and 100: ")
    if a=="end":
        break
    else:
        while True:
            guess=int(input("Please guess a number:"))
            if guess > int(a):
                print("Too high!")
            elif guess < int(a):
                print("Too low!")
            else:
                print("You got it")
                break
