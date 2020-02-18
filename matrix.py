import random

random.seed(9312)
n = 11
for i in range(n):
    for j in range(n):
        print(f'{round(random.random())},', end=' ')
    print('')