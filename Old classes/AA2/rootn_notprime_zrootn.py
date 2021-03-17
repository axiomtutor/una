from sympy import I, simplify, im, re, sqrt, symbols, factor_list, Number

n = symbols('n')
sqrtnegn = sqrt(n)*I

def divides(a,b):
    x = b/a
    print(re(x))
    real = factor_list(re(x)*Number(1))[0]
    imaginary = factor_list(im(x)*Number(1))[0]
    return real.is_Integer and imaginary.is_Integer


a1 = 2*sqrt(n)
a2 = a1*I
a3 = sqrt(n)*I*(1+I)
doesdivide = [a1,a2,a3,n]
notdivides = [1, 1+n, 1+2*n]

print(1/sqrtnegn)

for num in doesdivide:
    print(divides(sqrtnegn,num))
for num in notdivides:
    print(divides(sqrtnegn,num))
