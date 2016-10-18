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
  let subtotalRow = createSubtotalRow();
  // let taxRow = createTaxRow();
  // let totalRow = createTotalRow();

  table.setAttribute("id", "items");
  table.setAttribute("class", "striped");
  
  orderTable.appendChild(table);
  table.appendChild(header);
  table.appendChild(subtotalRow);
  // table.appendChild(taxRow);
  // table.appendChild(totalRow);
}

//==============================================================================
// create order table header
function createHeader() {
  let tHead = document.createElement('thead');
  let tRow  = document.createElement('tr');
  let thItem = document.createElement('th');
  let thPrice = document.createElement('th');

  thItem.textContent = "Item";
  tRow.appendChild(thItem);
  thPrice.textContent = "Price";
  thPrice.setAttribute("class", "currency");
  tRow.appendChild(thPrice);

  tHead.appendChild(tRow);

  return tHead;
}


//==============================================================================
// create order table row
function createOrderRow(item, price) {
  let tRow  = document.createElement('tr');
  let tdItem = document.createElement('td');
  let tdPrice = document.createElement('td');

  tdItem.textContent = item;
  tRow.appendChild(tdItem);
  tdPrice.textContent = price;
  tdPrice.setAttribute("class", "currency amount");
  tRow.appendChild(tdPrice);

  return tRow;
}

//==============================================================================
// create subtotal row
function createSubtotalRow() {
  let tRow  = document.createElement('tr');
  let tdLabel = document.createElement('td');
  let tdSubtotal = document.createElement('td');

  tdLabel.textContent = "Subtotal";
  tdLabel.style.textAlign="right";
  tRow.appendChild(tdLabel);
  tdSubtotal.textContent = 0;
  tdSubtotal.setAttribute("class", "currency");
  tRow.appendChild(tdSubtotal);
  tRow.setAttribute("id", "subtotal");

  return tRow;
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
  addOrderRow(event.target);
}

//==============================================================================
// create order table row for the current card and insert it before subtotal row
function addOrderRow(card) {
  let gParent = card.parentElement.parentElement;
  let item = gParent.getElementsByClassName("item-label");
  let price = gParent.getElementsByClassName("item-price");

  let targetRow = document.getElementById("subtotal");
  let newRow = createOrderRow(item[0].textContent, price[0].textContent);
  let parent = targetRow.parentNode;

  parent.insertBefore(newRow, targetRow);
  calculateSubtotal();
}


//==============================================================================
// calculate / update subtotal
function calculateSubtotal() {
  let prices = document.getElementsByClassName("amount");
  let subtotal = 0;

  for (var i = 0; i < prices.length; i++) {
    var priceString = prices[i].textContent;
    var price = Number(priceString.replace(/[^0-9\.]+/g,""));

    subtotal += price;
    console.log(subtotal);
  }

  let trSubtotal = document.getElementById("subtotal");
  let tdSubtotal = trSubtotal.lastChild;

  tdSubtotal.textContent = "$" + subtotal;
}
