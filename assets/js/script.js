function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.downBtn')) {
      var dropdowns = document.getElementsByClassName("catBar");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

//   body -- 5

$('#recipeCarousel').carousel({
    interval: 10000
  })
  
  $('.carousel .carousel-item').each(function(){
      var minPerSlide = 3;
      var next = $(this).next();
      if (!next.length) {
      next = $(this).siblings(':first');
      }
      next.children(':first-child').clone().appendTo($(this));
      
      for (var i=0;i<minPerSlide;i++) {
          next=next.next();
          if (!next.length) {
              next = $(this).siblings(':first');
            }
          
          next.children(':first-child').clone().appendTo($(this));
        }
  });



  // Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}



let addCart=document.querySelectorAll(".addCart");
  let addToCart=document.querySelectorAll(".addToCart");
  let productCount=document.querySelector(".counter");
  let notif=document.querySelector(".notification");
  let minus=document.querySelectorAll(".minus");
  let plus=document.querySelectorAll(".plus");
  let emptyBasket=document.querySelector(".emptyBasket");
  let fullBasket=document.querySelector(".fullBasket");
  let fullTable=document.getElementById("fullTable");
  let totalPrice =document.getElementById("totalBasket");

  if(localStorage.getItem("basket")==null){
    localStorage.setItem("basket",JSON.stringify([]));
  }

  let arr=JSON.parse(localStorage.getItem("basket"));

  function ButtonStyle(){

    for (const buttons of addCart) {
      let productId=buttons.parentElement.parentElement.getAttribute("id");
      let existProduct=arr.find(p=>p.id==productId);

      if(existProduct==undefined){
        buttons.style.display="flex";
        buttons.nextElementSibling.style.display="none";
      }
      else{
        buttons.style.display="none";
        buttons.nextElementSibling.style.display="flex";
        buttons.nextElementSibling.firstElementChild.innerText=existProduct.count;
      }
    }

  }

  CountProduct();
  ButtonStyle();
  PlusMinus();
  BasketIn();
  
  function BasketIn(){
    let arr=JSON.parse(localStorage.getItem("basket"));
    fullTable.innerHTML="";
    let total =0;
    let counter=0;
    for (const product of arr) {
      fullTable.innerHTML+=`<td style="width:228px;height:80px;display: flex;padding: 10px 0px;margin-bottom:5px;">
      <div class="image" style="width:64px;height:100%;padding: 4px;"><img src="${product.imageUrl}" alt="" srcset="" style="width:100%;height:100%;"></div>
      <div class="content" style="width:192px;height:100%;margin-left: 10px;font-size: 13px;font-family: inter,sans-serif;">
      <div class="namePro">${product.name}</div>
      <div class="quantityPro" style="display:flex;justify-content:start;align-items: center;">
      <div class="countPro">${product.count}</div>
      <span style="margin-left: 5px;">x</span>
      <div class="pricePro" style="color:#C70707;margin-left: 5px;">${product.price}</div>
      </div>
    </div>
    </td>`
    let money=product.price.split("$");
    counter=product.count*money[1];
    total+=counter;
    totalPrice.innerText=total.toFixed(2);
    }
  }
  
  function PlusMinus(){

  plus.forEach(p=>{
    p.addEventListener("click",function(e){
      e.preventDefault();
      let arr=JSON.parse(localStorage.getItem("basket"));
      let productId=this.parentElement.parentElement.parentElement.getAttribute("id");
      let existProduct=arr.find(p=>p.id==productId);
      existProduct.count++;


      notif.style.opacity=1;
        setTimeout(
          function() {
            notif.style.opacity=0;
          }, 4000);
        this.previousElementSibling.previousElementSibling.innerText=existProduct.count;
        notif.firstElementChild.innerText="Card Updated";
        notif.firstElementChild.nextElementSibling.innerText=`${existProduct.count} x ${this.parentElement.parentElement.previousElementSibling.firstElementChild.innerText} has been added tou your cart`;
        localStorage.setItem("basket",JSON.stringify(arr));
        CountProduct();
        BasketIn();
    })
  })

  minus.forEach(m=>{
    m.addEventListener("click",function(e){

      e.preventDefault();
      let arr=JSON.parse(localStorage.getItem("basket"));
      let productId=this.parentElement.parentElement.parentElement.getAttribute("id");
      let existProduct=arr.find(p=>p.id==productId);

      if(existProduct.count>1){
        existProduct.count--;
        localStorage.setItem("basket",JSON.stringify(arr));
        CountProduct();
      }

      else{
        let index = arr.indexOf(existProduct);
        arr.splice(index,1)
        localStorage.setItem("basket",JSON.stringify(arr));
        this.parentElement.parentElement.firstElementChild.style.display="flex";
        this.parentElement.parentElement.lastElementChild.style.display="none";
        CountProduct();
      }
      BasketIn();
        notif.style.opacity=1;
        setTimeout(
          function() {
            notif.style.opacity=0;
          }, 4000);
        this.previousElementSibling.innerText=existProduct.count;
        notif.firstElementChild.innerText="Card Updated";
        notif.firstElementChild.nextElementSibling.innerText=`${existProduct.count} x ${this.parentElement.parentElement.previousElementSibling.firstElementChild.innerText} has been changed tou your cart`;
      })
  })

}
  
  addCart.forEach(b=>{
    b.addEventListener("click",function(ev){
      if(localStorage.getItem("basket")==null){
        localStorage.setItem("basket",JSON.stringify([]));
      }
      let arr=JSON.parse(localStorage.getItem("basket"));

        ev.preventDefault();
        let productId=this.parentElement.parentElement.getAttribute("id");
        let existProduct=arr.find(p=>p.id==productId);

        if(existProduct==undefined){
            arr.push({
                id:productId,
                price:this.parentElement.previousElementSibling.lastElementChild.lastElementChild.innerText,
                imageUrl:this.parentElement.parentElement.firstElementChild.firstElementChild.getAttribute("src"),
                name:this.parentElement.previousElementSibling.firstElementChild.innerText,
                count:1
            })
            notif.firstElementChild.innerText=`"`+this.parentElement.previousElementSibling.firstElementChild.innerText+`"`+"has been added tou your cart";
            notif.firstElementChild.nextElementSibling.innerText="";
            this.parentElement.firstElementChild.style.display="none";
            this.parentElement.lastElementChild.style.display="flex";
          }
          else{
            PlusMinus();
          }
        localStorage.setItem("basket",JSON.stringify(arr));
        CountProduct();
        BasketIn();

        notif.style.opacity=1;
        setTimeout(
          function() {
            notif.style.opacity=0;
          }, 4000);
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
        BasketIn();
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

    if(arr.length>0)
    {
      emptyBasket.style.display="none"
      fullBasket.style.display="block";
    }
    else
    {
      emptyBasket.style.display="flex"
      fullBasket.style.display="none";
    }
  
  }


