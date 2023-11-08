if (numberVariable === 42) {
    console.log("This is printed if `numberVariable` equals 42");
} else if (stringVariable !== "test") {
    console.log("This is printed if `stringVariable` is not equal to `\"test\"'");
} else {
    console.log("If none of the conditions above are true, this will happen");
}

switch (stringVariable) {
    case dateVariable:
        console.log(`This will trigger if stringVariable equals ${dateVariable}"`);
        break;
    case "foo":
    case "bar":
        console.log('This will trigger if stringVariable is equal to the strings "foo" or "bar"');
        break;
    default:
        console.log("This will trigger if no other conditions are met");
}

for (const entry of arrayVariable) {
    console.log(entry);
}

for (const property in mapVariable) {
    console.log(property, mapVariable[property]);
}

for (let index1 = 0; index1 < 5; index1++) {
    console.log(index1);
}

let index2 = 0;
while (index2 < 5) {
    console.log(index2);
    index2++;
}

let index3 = 0;
do {
    console.log(index3);
} while (index3 < 5);