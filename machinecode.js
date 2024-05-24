// Psuedo assembly language: speeds up development significantly

let verbTable = [
    "nul",
    "add",
    "sub",
    "or",
    "and",
    "sl",
    "sr",
    "lt",
    "jmp",
    "cjp",
    "set",
    "mv",
    "ld",
    "str",
    "hlt"    
]

function getVerb(opcode) {
    return verbTable[opcode]
}

function parseVerb(verb) {
    return verbTable.indexOf(verb);
}

function machinecode(code) {
    let program = [];
    let instruction = "";

    let operation = "";
    let x = null;
    let y = null;
    let buffer = "";
    let comment = false;
    let parameter = 0;
    let instructions = 0;
    function parseBuffer() {
        if(buffer.length === 0) return;
        switch (parameter) {
            case 0:
                // operation
                operation = buffer;
                break;
            case 1:
                // x
                x = parseInt(buffer);
                break;
            case 2:
                // y
                y = parseInt(buffer);
                break;
            case 3:
                // Too many operations
                throw new Error(`Too many parameters; instruction ${instructions}`)
        }
        buffer = "";
        parameter++;
    }
    for(let index = 0; index < code.length; index++) {
        let c = code[index]
        if(c === '#'){
            comment = true;
            continue;
        }
        if(comment === true) {
            if(c.charCodeAt(0) === 10)
                    comment = false;
            else
                continue;
        }
        if(c === ' ') {
            parseBuffer()
            continue;
        }
        if(c.charCodeAt(0) === 10 || c === ';' || index === code.length - 1){
            // Newline; parse full instruction and convert to binary
            if(index === code.length - 1 && (c.charCodeAt(0) !== 10 || c !== ';' )) buffer += c;
            if(buffer.length !== 0) parseBuffer();

            let opcode = parseVerb(operation);
            if(opcode < 0) throw new Error(`Invalid verb ${operation}: instruction ${instructions + 1}`)
            console.log(operation, x, y);
            program.push([opcode, x, y])

            operation = "";
            x = null;
            y = null;

            instructions++;
            parameter = 0;
            continue;
        }
        buffer += c;
    }
    console.log(program)
    loadProgram(program);
    return {
        size: instructions * 9
    }
}

function runMachineCode(machineCode) {
    let setid = 0;
    for(let instruction of machineCode) {
        let opcode = instruction[0];

    }
}