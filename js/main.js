"use strict"

// MAIN ENTRY
window.onload = function main() {
  createOrderTable();
  activateCards();
}

//==============================================================================
// create table skeleton
function createOrderTable() {
  let orderTable = document.getElementById('order-table');
  let table = document.createElement('table');
  let header = createHeader();
  // var subTotal = createSubTotal();
  // var tax = createTax();
  // var total = createTotal();

  orderTable.appendChild(table);
  table.appendChild(header);
  // table.appendChild(subTotal);
  // table.appendChild(tax);
}

//==============================================================================
// create order table header
function createHeader() {
  var tHead = document.createElement('thead');
  var tRow  = document.createElement('tr');
  var thItem = document.createElement('th');
  var thPrice = document.createElement('th');

  thItem.textContent = "Item";
  tRow.appendChild(thItem);
  thPrice.textContent = "Price";
  tRow.appendChild(thPrice);

  tHead.appendChild(tRow);

  return tHead;
}

//==============================================================================
// add event listener to the cards
function activateCards() {
  let cards = document.getElementsByClassName('card-action');

  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', clickCardHandler);
  }
}

//==============================================================================
// event handler to add the target to the order table
function clickCardHandler(event) {
  // do not allow the event to propogate to all cards
  if (event.target === event.currentTarget) {
    return;
  }

  event.preventDefault(); // prevents browser from getting another page
  createOrderRow(event.target);
}

//==============================================================================
// create order table row for the current card
function createOrderRow(card) {
  let gParent = card.parentElement.parentElement;
  let item = gParent.getElementsByClassName("item-label");
  let price = gParent.getElementsByClassName("item-price");
  console.log(item[0].textContent, price[0].textContent);
}
