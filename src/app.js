var a = 10
let b = 20
const c =30

console.log(a)
console.log(b)
console.log(c)

function display(){
    return "Welcome to the world of NodeJS"
}

display()

let add = function(x,y){
    return x + y
}

console.log(add(20, 20))

let sample = () => "We can also fat arrow functions"

console.log(sample())

const names = ["Scott", "Adam", "Tuan"]
names.forEach((name, index) => {
    console.log(name + ' - ' + index )
})
console.log(names)