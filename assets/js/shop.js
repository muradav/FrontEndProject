window.onload = function(){
    slideOne();
    slideTwo();
}

let sliderOne = document.getElementById("slider-1");
let sliderTwo = document.getElementById("slider-2");
let displayValOne = document.getElementById("range1");
let displayValTwo = document.getElementById("range2");
let minGap = 0;
let sliderTrack = document.querySelector(".slider-track");
let sliderMaxValue = document.getElementById("slider-1").max;

function slideOne(){
    if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap){
        sliderOne.value = parseInt(sliderTwo.value) - minGap;
    }
    displayValOne.textContent = sliderOne.value;
    fillColor();
}
function slideTwo(){
    if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap){
        sliderTwo.value = parseInt(sliderOne.value) + minGap;
    }
    displayValTwo.textContent = sliderTwo.value;
    fillColor();
}
function fillColor(){
    percent1 = (sliderOne.value / sliderMaxValue) * 100;
    percent2 = (sliderTwo.value / sliderMaxValue) * 100;
    sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% ,  black ${percent1}% , black ${percent2}%, #dadae5 ${percent2}%)`;
}

let addCart=document.querySelectorAll(".addC");
  let addToCart=document.querySelectorAll(".addToCart");
  let productCount=document.querySelector(".counter");
  let notif=document.querySelector(".notification")




  if(localStorage.getItem("basket")==null){
    localStorage.setItem("basket",JSON.stringify([]));
  }

  let arr=JSON.parse(localStorage.getItem("basket"));

  CountProduct();

  addCart.forEach(b=>{
    b.addEventListener("click",function(ev){
      if(localStorage.getItem("basket")==null){
        localStorage.setItem("basket",JSON.stringify([]));
      }
      let arr=JSON.parse(localStorage.getItem("basket"));

        ev.preventDefault();
        let productId=this.parentElement.getAttribute("id");
        let existProduct=arr.find(p=>p.id==productId);

        if(existProduct==undefined){
            arr.push({
                id:productId,
                price:this.previousElementSibling.lastElementChild.lastElementChild.innerText,
                imageUrl:this.parentElement.firstElementChild.firstElementChild.getAttribute("src"),
                name:this.previousElementSibling.firstElementChild.innerText,
                count:1
            })
            notif.firstElementChild.innerText=`"`+this.previousElementSibling.firstElementChild.innerText+`"`+"has been added tou your cart";
            notif.firstElementChild.nextElementSibling.innerText="";
        }
        else{
          existProduct.count++;
          notif.firstElementChild.innerText="Card Updated";
          notif.firstElementChild.nextElementSibling.innerText=`${existProduct.count} x ${this.previousElementSibling.firstElementChild.innerText} has been added tou your cart`;
        }
        localStorage.setItem("basket",JSON.stringify(arr));
        CountProduct();

        notif.style.opacity=1;
        setTimeout(
          function() {
            notif.style.opacity=0;
          }, 3000);

          
        
       
    })

  });


  addToCart.forEach(b=>{
    b.addEventListener("click",function(ev){

      if(localStorage.getItem("basket")==null){
        localStorage.setItem("basket",JSON.stringify([]));
      }
      let arr=JSON.parse(localStorage.getItem("basket"));

        ev.preventDefault();
        let productId=this.parentElement.parentElement.parentElement.getAttribute("id");
        let existProduct=arr.find(p=>p.id==productId);

        if(existProduct==undefined){
            arr.push({
                id:productId,
                price:this.parentElement.previousElementSibling.lastElementChild.innerText,
                imageUrl:this.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.firstElementChild.getAttribute("src"),
                name:this.parentElement.parentElement.firstElementChild.innerText,
                count:1,
            })
            notif.firstElementChild.innerText=`"`+this.parentElement.parentElement.firstElementChild.innerText+`"`+"has been added tou your cart";
            notif.firstElementChild.nextElementSibling.innerText="";
        }
        else{
          existProduct.count++;
          notif.firstElementChild.innerText="Card Updated";
          notif.firstElementChild.nextElementSibling.innerText=`${existProduct.count} x ${this.parentElement.parentElement.firstElementChild.innerText} has been added tou your cart`;
        }
        localStorage.setItem("basket",JSON.stringify(arr));
        CountProduct();

        notif.style.opacity=1;
        setTimeout(
          function() {
            notif.style.opacity=0;
          }, 3000);

    })

  });

  function CountProduct(){
    let arr=JSON.parse(localStorage.getItem("basket"));
    let test=0;
    for (const item of arr) {
      test+=item.count;
    }
    productCount.innerText=test;
  }


