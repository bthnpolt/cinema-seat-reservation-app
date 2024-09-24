//DOM ELEMENTS
const container  = document.querySelector(".container");
const text = document.querySelector('.text');
const count = document.querySelector('.count');
const amount = document.querySelector('.amount');
const select = document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved)');
const btnShopping = document.querySelector('.btn-shopping');
const btnShoppingModal = document.querySelector('.btn-shopping-modal');
const modalContainer = document.querySelector('.modal-container');
const close = document.querySelector('.close');
const successAlerts = document.querySelector('.successAlerts');
const cardNumber = document.getElementById('cardNumber');
const cardName = document.getElementById('cartName');
const cardDate = document.getElementById('cardDate');
const cardSecurityNumber = document.getElementById('cardSecurityNumber');
const warningAlerts = document.querySelector('.warningAlerts');


let allSeatsArr = [];
let selectedSeatsArr = [];


container.addEventListener('click', (e) =>{
    let seats = e.target
    if (seats.classList.contains('seat') && !seats.classList.contains('reserved')) {
        seats.classList.toggle('selected');
        calculateTotal();
    }
});



const calculateTotal = () =>{
    
    let seatSelectedSeats =  container.querySelectorAll('.seat.selected');
    let seatSelectedCount = seatSelectedSeats.length;
    selectedSeatsArr = [...seatSelectedSeats];
    allSeatsArr = [...seats];
    let selectedSeatIndexs = selectedSeatsArr.map(seat=>{
      return  allSeatsArr.indexOf(seat);
    });

    if (!seatSelectedCount == 0) {
        btnShopping.style.display = 'block'
        text.style.display = 'flex';
        count.innerText = ` ${seatSelectedCount} `
        let price = select.value;
        amount.innerText = `${seatSelectedCount*price} `
        
    }else{
        btnShopping.style.display = 'none';
        text.style.display = 'none';
    }
    saveToLocalStroge(selectedSeatIndexs);
}
const openModal = () =>{
    modalContainer.style.display = 'block'
}
const closeModal = () =>{
    modalContainer.style.display = 'none';
}
const payment = (e) =>{
   
   //check inputs area
   const isCardNumberValid = cardNumber.value.length === 16;
   const isCardNameValid = cardName.value.length > 0;
   const isCardDate = cardDate.value.length === 5;
   const isCardSecurityNumberValid = cardSecurityNumber.value.length === 3;

   if (isCardNumberValid && isCardNameValid && isCardDate && isCardSecurityNumberValid) {
    successAlerts.style.display = 'flex';
        modalContainer.style.display = 'none';
        setTimeout(()=>{
            successAlerts.style.display = 'none';
        },2000);
        cardNumber.value = "";
        cardName.value = "";
        cardDate.value = "";
        cardSecurityNumber.value = "";
   }else{
        warningAlerts.style.display = 'flex';
        setTimeout(()=>{
            warningAlerts.style.display = 'none';
        },2000);
   }
}
btnShopping.addEventListener('click',openModal);
select.addEventListener('change',calculateTotal);
close.addEventListener('click',closeModal);
btnShoppingModal.addEventListener('click', payment);
const saveToLocalStroge = (indexs) =>{
    localStorage.setItem('selectedSeats', JSON.stringify(indexs));
    localStorage.setItem ('selectedMovie',JSON.stringify(select.selectedIndex));
}
const getFromLocalStroge = () =>{
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats !=null && selectedSeats.length >0) {
        seats.forEach((seat,index)=>{
            if (selectedSeats.indexOf(index)>-1) {
                seat.classList.add('selected');
            }
        });
    }
    const selectedMovie = JSON.parse(localStorage.getItem('selectedMovie'));
    if (selectedMovie != null) { 
        select.selectedIndex = selectedMovie;
    }
}
document.addEventListener('DOMContentLoaded',()=>{
    getFromLocalStroge();
    calculateTotal();
});