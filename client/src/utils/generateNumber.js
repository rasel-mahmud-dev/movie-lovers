function generateNumber(n){
    let twoRandomNumber = []
    let numbers = "0123456789"
    for (let i = 1; i <= n; i++) {
        twoRandomNumber.push(numbers[Math.round(Math.random() * 9)])
    }
    return twoRandomNumber
}

export default generateNumber