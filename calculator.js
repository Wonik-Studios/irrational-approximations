function calculateIrrational(irrational, startDenominator, endDenominator, take, precision) {
    let numerators = [];
    let start = approximate(irrational, startDenominator);
    numerators[0] = [startDenominator, Math.abs(irrational - )];

    if(startDenominator <= endDenominator) {
        bestApproxes = [];

        for(let i=startDenominator + 1; i <= endDenominator; i++) {
            let n = approximate(irrational, i);
            console.log(n/i);
            console.log(numerators[numerators.length - 1][1] / numerators[numerators.length - 1][0]);
            
            if(numerators.length < take) {
                binaryAdd(numerators, [i, n]);
            }
            else if(n/i < numerators[numerators.length - 1][1] / numerators[numerators.length - 1][0]) {
                numerators.pop();
                binaryAdd(numerators, [i, n]);
            }
        }
    }
    return numerators;
}


function approximate(irrational, denominator) {
    let numerator = irrational * denominator;

    if(irrational - Math.floor(numerator)/denominator >= Math.ceil(numerator)/denominator - irrational) {
        return Math.ceil(numerator);
    } else {
        return Math.floor(numerator);
    }
}


precise


function binaryAdd(arr, element) {
    let start = 0;
    let end = arr.length - 1;

    if(arr.length == 0) {
        arr.splice(0, 0, element);
        return;
    }

    while(start <= end) {
        let compare = arr[Math.floor((end + start)/2)][1];

        // console.log("Compare: " + compare);
        // console.log("Start: " + start);
        // console.log("End: " + end);
        // console.log(element[1]);

        if(compare > element[1]) {
            end = Math.floor((end + start)/2) - 1;
        }
        else if(compare < element[1]) {
            start = Math.floor((end + start)/2) + 1;
        }
        else if(compare == element[1]) {
            start = Math.floor((end + start)/2);
            break;
        }
    }
    arr.splice(start, 0, element);
}

console.log(calculateIrrational(Math.PI, 1, 33215, 10));