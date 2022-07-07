function calculateIrrationalBestApproximator(irrational, startDenominator, endDenominator, take) {
    let numerators = [];
    let intPart = Math.floor(irrational);
    irrational = irrational.split(".");

    let start = approximate(irrational, startDenominator);
    numerators[0] = [startDenominator, Math.abs(irrational * 10 ** 17 - start * 10 ** 17), start];

    if(startDenominator <= endDenominator) {
        bestApproxes = [];

        for(let i=startDenominator + 1; i <= endDenominator; i++) {
            let n = approximate(irrational, i);
            // console.log("This is the current approximation: " + n/i);
            // console.log(numerators[numerators.length - 1][1] / numerators[numerators.length - 1][0]);
            let dif = Math.abs(irrational * 10 ** 17 - n/i * 10 ** 17);
            
            if(numerators.length < take) {
                binaryAdd(numerators, [i, dif, n]);
            }
            else if(dif  < numerators[numerators.length - 1][1]) {
                numerators.pop();
                binaryAdd(numerators, [i, dif, n]);
            }
        }
    }

    for(let i=0; i < numerators.length; i++) {
        numerators[i][2] += intPart * numerators[i][0];
    }
    return numerators;
}

function calculateIrrationalSmallest(irrational, startDenominator, endDenominator, take, precision) {
    let numerators = [];
    let intPart = Math.floor(irrational);
    irrational = irrational - intPart;

    if(startDenominator <= endDenominator) {
        bestApproxes = [];

        for(let i=startDenominator; i < endDenominator; i++) {
            if(numerators.length == take) {
                break;
            }
            
            let n = approximate(irrational, i);
            let dif = Math.abs(irrational * 10 ** 17 - n/i * 10 ** 17);

            console.log(17 - dif.toString().length);
            if(17 - dif.toString().length >= precision) {
                binaryAdd(numerators, [i, dif, n]);
            }
        }
    }

    for(let i=0; i < numerators.length; i++) {
        numerators[i][2] += intPart * numerators[i][0];
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



// **EXAMPLES**
// console.log(calculateIrrationalBestApproximator(Math.PI, 1, 33215, 10));
// console.log(calculateIrrationalSmallest(Math.PI, 1, 33215, 10, 5));