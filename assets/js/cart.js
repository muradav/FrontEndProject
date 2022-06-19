let emptyScreen=document.getElementById("empty")
let fullScreen=document.getElementById("full")
let table=document.getElementById("mainTable")
let mini=document.getElementById("mini")
let miniTotalPrice=document.querySelector(".totalPrice")
let endPrice=document.getElementById("totalPrice")
let productCount=document.querySelector(".counter");


let totalPrice=0;
let totally=0;


if(localStorage.getItem("basket")==null){
    localStorage.setItem("basket",JSON.stringify([]));
  }

  let arr=JSON.parse(localStorage.getItem("basket"));

  if(arr.length!=0){
    fullScreen.style.display="flex";
    mini.style.display="flex";
    emptyScreen.style.display="none";
  }
  else{
    emptyScreen.style.display="flex";
    fullScreen.style.display="none";
    mini.style.display="none";
  }

  CountProduct();


  arr.forEach(product => {
      let tr =document.createElement("tr");

      let tdImage=document.createElement("td");
      let image=document.createElement("img");
      image.style.width="70px";
      image.style.height="70px";
      image.setAttribute("src",product.imageUrl);
      tdImage.append(image);

      let tdName=document.createElement("td");
      tdName.innerText=product.name;
      tdName.style.paddingTop="30px";

      let tdPrice=document.createElement("td");
      tdPrice.innerText=product.price;
      tdPrice.style.paddingTop="30px";

      let tdCount=document.createElement("td");
      let quantity=document.createElement("span");
      quantity.innerText=product.count;
      tdCount.style.padding="30px";
      tdCount.style.position="relative";

      let minus=document.createElement("div") 
      minus.style.width="25px";
      minus.style.height="25px";
      minus.style.borderRadius="50%";
      minus.style.backgroundColor="#dedede";
      minus.style.textAlign="center";
      minus.style.cursor="pointer"
      minus.style.position="absolute";
      minus.style.left="-5px";
      minus.style.top="30px";
      minus.innerText="-"

      let plus=document.createElement("div")
      plus.style.width="25px";
      plus.style.height="25px";
      plus.style.borderRadius="50%";
      plus.style.backgroundColor="#dedede";
      plus.style.textAlign="center";
      plus.style.cursor="pointer"
      plus.style.position="absolute";
      plus.style.left="50px";
      plus.style.top="30px";
      plus.innerText="+";

      let counter=product.count;
      plus.addEventListener("click",function(){
        let beforeTotal=product.count*money[1];
        counter++;
        tdCount.firstChild.innerText=counter;
        product.count++;
        localStorage.setItem("basket",JSON.stringify(arr));
        totalPrice=product.count*money[1];
        let result=totalPrice-beforeTotal;
        totally+=result;;
        miniTotalPrice.innerText="$"+""+(totally).toFixed(2);
        endPrice.innerText=(totally+(totally*18)/100).toFixed(2);
        tdTotal.innerText="$"+totalPrice.toFixed(2);
        CountProduct();
      })
      minus.addEventListener("click",function(){

        if(counter>1){
          counter--;
          let beforeTotal=product.count*money[1];
          tdCount.firstChild.innerText=counter;
          product.count--;
          localStorage.setItem("basket",JSON.stringify(arr));
          totalPrice=product.count*money[1];
          let result=beforeTotal-totalPrice;
          totally-=result;;
          miniTotalPrice.innerText="$"+""+(totally).toFixed(2);
          endPrice.innerText=(totally+(totally*18)/100).toFixed(2);
          tdTotal.innerText="$"+totalPrice.toFixed(2);
          CountProduct();
        }
        else{
          tdDel.parentElement.remove()
          let index = arr.indexOf(product);
          arr.splice(index,1)
          localStorage.setItem("basket",JSON.stringify(arr));
          CountProduct();
        }
      })
      tdCount.append(quantity,minus,plus);

      let tdTotal=document.createElement("td");
      let money=product.price.split("$");
      totalPrice=product.count*money[1];
      tdTotal.innerText="$"+totalPrice;
      tdTotal.style.padding="30px";

      let tdDel=document.createElement("td")
      tdDel.innerHTML=`<div><i class="fa-solid fa-xmark"></i></div>`
      tdDel.firstElementChild.style.cursor="pointer";
      tdDel.style.padding="30px";

      tdDel.addEventListener("click",function(){
        tdDel.parentElement.remove()
        let index = arr.indexOf(product);
        arr.splice(index,1)
        localStorage.setItem("basket",JSON.stringify(arr));
        CountProduct();
      })
   

      tr.append(tdImage,tdName,tdPrice,tdCount,tdTotal,tdDel);
      table.lastElementChild.append(tr);
      tr.style.width="100%";
      CountProduct();
      UpdateCart();
  });


  function UpdateCart(){
    let arr=JSON.parse(localStorage.getItem("basket"));
    totally+=totalPrice;;
    miniTotalPrice.innerText="$"+""+(totally).toFixed(2);
    endPrice.innerText=(totally+(totally*18)/100).toFixed(2);
    localStorage.setItem("basket",JSON.stringify(arr));
  }

  function CountProduct(){
    let arr=JSON.parse(localStorage.getItem("basket"));
    let test=0;
    for (const item of arr) {
      test+=item.count;
    }
    productCount.innerText=test;
  }
