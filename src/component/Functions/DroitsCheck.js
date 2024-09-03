
const DroitsCheck = (userDesc, arrayDroitsUser, arrayDroitsTask, x) => {
    if(x === 'true'){
        if(userDesc && userDesc.toLowerCase() === "administrateur"){
            return true;
        }
        return false;
    }
    if(userDesc && userDesc.toLowerCase() === "administrateur"){
        return true;
    }
    const found = arrayDroitsUser.reduce((acc, item) => {
        if (arrayDroitsTask.includes(item.Code.toString())) {
            return true;
        }
        return acc;
    }, false);

    console.log("Check if any Code is found in arrayDroitsTask:", found);
    return found;
};
export default DroitsCheck;