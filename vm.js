const kilobytesRam = 4;

let mem = new Uint8Array(1024 * kilobytesRam);

let pc = 0;
let reg = new Uint32Array(4);

function runInstruction(opcode, x, y) {
    switch(opcode) {
        case 0:
            // nul
            break;
        case 1:
            // add
            reg[0] = reg[0] + reg[1];
            break;
        case 2:
            // sub
            reg[0] = reg[0] - reg[1]
            break;
        case 3:
            // or
            reg[0] = reg[0] || reg[1]
            break;
        case 4:
            // and
            reg[0] = reg[0] && reg[1]
            break;
        case 5:
            // sl
            reg[0] = reg[0] << reg[1]
            break;
        case 6:
            // sr
            reg[0] = reg[0] >> reg[1]
            break;
        case 7:
            // lt
            reg[0] = (reg[0] < reg[1])?1:0
            break;
        case 8:
            // jmp
            pc = reg[1]
            return true;
            break;
        case 9:
            // cjp: Conditional jump
            if(reg[0]) pc = reg[1]
            break;
        case 10:
            // set
            reg[x] = y
            break;
        case 11:
            // mv
            reg[y] = reg[x]
            break;
        case 12:
            // ld
            reg[x] = mem[y]
            break;
        case 13:
            // str
            mem[x] = reg[0]
            break;
        case 14:
            // hlt
            console.log("Program HALTED.");
            break;
    }
}

const instructionSize = 9;

function cycleVM(cycles) {
    for(let i = 0; i < cycles ?? 1; i++) {
        let addr = pc * instructionSize;
        let opcode = mem[addr] // Opcode

        let x = [] // X
        for(let i = 0; i < 4; i++) // Recombine 4 bytes
            x.push(mem[addr + i + 1]);
        x = Tools.combineInt(x);


        let y = [] // Y
        for(let i = 0; i < 4; i++) // Recombine 4 bytes
            y.push(mem[addr + i + 5]);
        y = Tools.combineInt(y);

        console.log(pc, getVerb(opcode), x, y)
        let jumped = runInstruction(opcode, x, y); // Run instruction
        
        if(!jumped)
            pc++;
    }
}

function loadProgram(program) {
    /* Program format:
    [[opcode, x, y], ...]
    */
    let size = 0;
    for(let operation of program) {
        let opcode = operation[0];
        let x = operation[1];
        let y = operation[2];

        mem[size] = opcode; // Opcode

        let splitX = Tools.splitInt(x, 4); // X
        for(let j = 0; j < 4; j++)
            mem[size + j + 1] = splitX[j];

        let splitY = Tools.splitInt(y, 4); // Y
        for(let j = 0; j < 4; j++)
            mem[size + j + 5] = splitY[j];
        size += instructionSize; // Size of instruction
    }
    console.log(`Loaded program, taking up ${size} bytes of memory`)
}

function printRegisters() {
    for(let i = 0; i < reg.length; i++)
        console.log(`Register ${i}: ${reg[i]}`);
}

function printMemory() {
    for(let i = 0; i < mem.length; i++)
        console.log(`${i}: ${mem[i]}`);
}