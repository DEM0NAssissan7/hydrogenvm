const kilobytesRam = 4;

let mem = new Uint8Array(1024 * kilobytesRam);

let pc = 0;
let reg = new Uint32Array(4);

function runInstruction(setid, opcode, x, y) {
    switch(setid) {
        case 0:
            switch(opcode) {
                case 0:
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
                    pc = reg[0]
                    break;
                case 9:
                    // cjp
                    if(reg[0]) pc = reg[1]
                    break;
                case 10:
                    // set
                    reg[x] = y
                    break;
                case 11:
                    // mv
                    reg[x] = reg[y]
                    break;
                case 12:
                    // ld
                    reg[x] = mem[y]
                    break;
                case 13:
                    // str
                    mem[x] = reg[y]
                    break;
            }
            break;
    }
}

function cycleVM() {

}

function loadProgram(program) {
    
}

function printRegisters() {
    for(let i = 0; i < reg.length; i++)
        console.log(`Register ${i}: ${reg[i]}`);
}

function printMemory() {
    for(let i = 0; i < mem.length; i++)
        console.log(`${i}: ${mem[i]}`);
}