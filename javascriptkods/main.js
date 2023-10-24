//console.log("bağlantı kontolü")

//1-Tüm koltukların kapsayıcısı olan container divini çek
//2- Container a click eventi ekle

// html tarafından querySelector ile className üzerinden eleman çekme
const container = document.querySelector(".container");
// html tarafından çekilen elemanın kontrolü
//console.log(container)

const infoText = document.querySelector(".infoText");
//console.log(infoText)

const movieList = document.querySelector("#movie");
//console.log(movieList)

const seatCount = document.getElementById("count");
//console.log(seatCount)

const totalAmount = document.getElementById("amount");
//console.log(totalAmount)

const seats = document.querySelectorAll(".seat:not(.reserved)");
//console.log(seats)

const saveToDataBase = (index) => {
  localStorage.setItem("seatsIndex", JSON.stringify(index));

  //film verisi kaydı

  localStorage.setItem("movieIndex",JSON.stringify(movieList.selectedIndex))
};

const getFromDataBase = () => {
  const dbSelectedSeats = JSON.parse(localStorage.getItem("seatIndex"));

  if (dbSelectedSeats !== null) {
    seats.forEach((seat, index) => {
      if (dbSelectedSeats.includes(index)) {
        seat.classList.add("selected");
      }
    });
  }
};

const dbSelectedMovie=JSON.parse(localStorage.getItem("movieIndex"));
movieList.selectedIndex=dbSelectedMovie
getFromDataBase();

const createIndex = () => {
  let allSeatsArray = [];
  seats.forEach((seat) => {
    allSeatsArray.push(seat);
  });
  //console.log(allSeatsArray)

  const allSelectedSeatsArray = [];
  const allSelectedSeats = container.querySelectorAll(".seat.selected");

  allSelectedSeats.forEach((selectedSeat) => {
    allSelectedSeatsArray.push(selectedSeat);
  });
  //console.log(allSelectedSeatsArray)

  const selectedSeatsIndex = allSelectedSeatsArray.map((selectedSeat) => {
    return allSeatsArray.indexOf(selectedSeat);
  });
};

const calculateTotal = () => {
  //console.log("calculate çalıştı")
  createIndex();
  let selectedSeatsCount = container.querySelectorAll(".seat.selected").length;
  //console.log(selectedSeatsCount)

  seatCount.innerText = selectedSeatsCount;
  //console.log(count);
  totalAmount.innerText = selectedSeatsCount * movieList.value;
  //console.log(totalAmount)

  if (selectedSeatsCount) {
    infoText.classList.add("open");
  } else {
    infoText.classList.remove("open");
  }
};

container.addEventListener("click", (pointerEvent) => {
  //console.log("container tıklandı")
  // console.log(pointerEvent.target.offsetParent)

  const clickedSeat = pointerEvent.target.offsetParent;
  if (
    clickedSeat.classList.contains("seat") &&
    !clickedSeat.classList.contains("reserved")
  ) {
    clickedSeat.classList.toggle("selected");
  }
  calculateTotal();
});

movieList.addEventListener("change", () => {
  calculateTotal();
});
