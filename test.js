machinecode(`set 1 1
add # Increment
mv 0 2 # Store for future use
mv 0 1 # 9 < [x]
set 0 9 # [9] < x
lt # If less than
set 1 11 # Prepare jump
cjp # Jump if more than 10
set 1 0
mv 2 0
jmp
mv 2 0
str 100
hlt`)

cycleVM(110);

printRegisters();
console.log(mem);