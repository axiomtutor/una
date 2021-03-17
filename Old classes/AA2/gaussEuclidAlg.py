from sympy import I, Abs, conjugate, re, im, Number, simplify

def a_gcd(a,b): 
    x, y = Number(1)*a, Number(1)*b
    if Abs(x) > Abs(y):
        x, y = y, x
    if x == 0:
        print(y)
        return y
    if y == 0: 
        print(x)
        return x
    print("a and b are ")
    print(str(a) + " and " + str(b))
    c = conjugate(x)
    pseudo_quot = simplify((y*c)/(x*c))
    print("The pseudo-quotient is ")
    print(str(pseudo_quot))
    p1, q1 = re(pseudo_quot), im(pseudo_quot)
    print("The fractional real and imaginary parts of the pseudo-quotient are ")
    print(str(p1) + " and " + str(q1))
    quot = p1.round() + I*q1.round()
    print("The nearest-integers-quotient is ")
    print(str(quot))
    rem = simplify(y-quot*x)
    print("The remainder is ")
    print(rem)
    print("---")
    a_gcd(x,rem)


a_gcd(1,2)
a_gcd(47-13*I,53+56*I)