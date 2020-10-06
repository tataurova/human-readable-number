const digits = {
    0: `zero`,
    1: `one`,
    2: `two`,
    3: `three`,
    4: `four`,
    5: `five`,
    6: `six`,
    7: `seven`,
    8: `eight`,
    9: `nine`,
}

const decades = {
    10: `ten`,
    11: `eleven`,
    12: `twelve`,
    13: `thirteen`,
    14: `fourteen`,
    15: `fifteen`,
    16: `sixteen`,
    17: `seventeen`,
    18: `eighteen`,
    19: `nineteen`,
    20: `twenty`,
    30: `thirty`,
    40: `forty`,
    50: `fifty`,
    60: `sixty`,
    70: `seventy`,
    80: `eighty`,
    90: `ninety`,
}

const NumberLength = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
};

module.exports = function toReadable (number) {
    const numberArray = number.toString().split(``);
    switch (numberArray.length) {
        case NumberLength.ONE:
            return digits[number];
        case NumberLength.TWO:
            return decades[number] || `${decades[`${numberArray[0]}0`]} ${digits[numberArray[1]]}`;
        case NumberLength.THREE:
            let secondPart = ``;
            if (decades[numberArray.slice(-2).join(``)]) { // if digit is in dict
                secondPart = decades[numberArray.slice(-2).join(``)]; // get from dict
            } else {
                switch (numberArray[1]) {
                    case `0`:
                        numberArray[2] === `0`
                            ? secondPart = `` // if like 200 300
                            : secondPart = digits[numberArray[2]]; // if like 101 102 103
                        break;
                    default:
                        secondPart = `${decades[`${numberArray[1]}0`]} ${digits[numberArray[2]]}`;
                }
            }
            return `${digits[numberArray[0]]} hundred ${secondPart}`.trim();
        default:
            return `unknown`;
    }
}
