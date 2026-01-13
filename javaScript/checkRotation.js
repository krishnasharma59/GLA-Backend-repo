str1 = "ARCD";
str2= "DRAC";
str1Arr= str1.split("");
str2Arr= str2.split("");
str1Sorted= str1Arr.sort();
str2Sorted = str2Arr.sort();
let a = false;
for(let i = 0; i<str1.length;i++){
    if(str1Sorted[i]==str2Sorted[i]){
    a = true;
    }
}
console.log(a);