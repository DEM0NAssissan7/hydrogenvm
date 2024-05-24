asm(`set 1 1
add
mv 0 2
# 
set 1 10
lt
set 1 9
cjp
jmp 0
mv 2 0
str 100`)