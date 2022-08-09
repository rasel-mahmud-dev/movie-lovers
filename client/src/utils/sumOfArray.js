function sumOfArray(array){
    let sum = 0
    for (let i = 0; i < array.length; i++) {
        sum += Number(array[i])
        
    }
    return sum
}

export default sumOfArray;