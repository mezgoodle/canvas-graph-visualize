import random

random.seed(9312)
n = 11
for i in range(n):
	print(i+1, end=' ')
print('')
for i in range(n):
    for j in range(n):
    	el = round(random.random())
        # print(f'{}', end=' ')
    # print(i+1)
    # print('')