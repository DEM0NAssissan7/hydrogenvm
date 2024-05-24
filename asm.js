// Psuedo assembly language: speeds up development significantly

function asm(code) {
    let binaryCode = [];
    let instruction = "";

    let operation = "";
    let x = 0;
    let y = 0;
    let buffer = "";
    let comment = false;
    let i = 0;
    for(let c of code) {
        if(c === '#'){
            comment = true;
            continue;
        }
        if(c.charCodeAt(0) === 10 || (c === ';' && comment === false)){
            // Newline; parse full instruction and convert to binary

            i = 0;
            continue;
        }
        if(c === ' ') {
            switch (i) {
                case 0:
                    
            }
            i++;    
        }
    }
        console.log(`${c.charCodeAt(10)}`);
}

function runMachineCode(machineCode) {
    let setid = 0;
    for(let instruction of machineCode) {
        let opcode = instruction[0];

    }
}