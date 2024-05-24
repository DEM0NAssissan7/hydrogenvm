machinecode(`set 1 1
add # Increment
mv 0 2 # Store for future use
mv 0 1
set 0 9
lt # If less than
set 1 10 # Prepare jump
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