let str1 = "java is fun";
let strArr = str1.split(" ");
let str2 = "";
for(let i = strArr.length;i>=1;i--){
    str2= str2 + strArr[i-1] + " ";
}
console.log(str2);