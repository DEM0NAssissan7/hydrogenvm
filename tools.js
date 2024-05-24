function binary(integer) {
    
}
class Tools {
    static binary(number, bits) {
        if(!bits)
            return (number).toString(2);
        else {
            let retval = (number).toString(2);
            let str = "";
            for(let i = 0; i < bits - retval.length; i++)
                str += '0'
            retval = str + retval;
            return retval;
        }
    }
    static decimal(binary) {
        return parseInt(binary, 2);
    }
    static splitInt(integer, parts) {
        let bin = this.binary(integer, parts * 8);
        let retval = [];
        for(let i = 0; i < parts; i++) {
            let buffer = "";
            for(let j = 0; j < 8; j++) {
                let c = bin[i * 8 + j];
                buffer += c;
            }
            buffer = this.decimal(buffer);
            retval[i] = buffer;
        }
        return retval;
    }
    static combineInt(parts) {
        let retval = "";
        for(let i = 0; i < parts.length; i++) {
            let part = parts[i];
            retval += this.binary(part, 8);
        }
        console.log(retval)
        return this.decimal(retval);
    }
}