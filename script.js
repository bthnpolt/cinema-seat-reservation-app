const container  = document.querySelector(".container");
const text = document.querySelector('.text');
const count = document.querySelector('.count');
const amount = document.querySelector('.amount');
const select = document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved)');
const btnShopping = document.querySelector('.btn-shopping');
const btnShoppingModal = document.querySelector('.btn-shopping-modal');
const modalContainer = document.querySelector('.modal-container');
//modalı aktif hale getir





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
        text.style.display = 'flex';
        count.innerText = ` ${seatSelectedCount} `
        let price = select.value;
        amount.innerText = `${seatSelectedCount*price} `
        
    }else{
        text.style.display = 'none'
    }
    saveToLocalStroge(selectedSeatIndexs);
}

select.addEventListener('change',calculateTotal);
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