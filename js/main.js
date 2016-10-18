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
  let body = document.createElement('tbody');
  let subtotalRow = createSubtotalRow();
  let taxRow = createTaxRow();
  let totalRow = createTotalRow();

  table.setAttribute("id", "items");
  table.setAttribute("class", "striped");
  body.setAttribute("id", "body");

  orderTable.appendChild(table);
  table.appendChild(header);
  table.appendChild(body);
  table.appendChild(subtotalRow);
  table.appendChild(taxRow);
  table.appendChild(totalRow);
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
  let stRow  = document.createElement('tr');
  let tdLabel = document.createElement('td');
  let tdSubtotal = document.createElement('td');

  tdLabel.textContent = "Subtotal";
  tdLabel.style.textAlign="right";
  stRow.appendChild(tdLabel);
  tdSubtotal.textContent = 0;
  tdSubtotal.setAttribute("class", "currency");
  stRow.appendChild(tdSubtotal);
  stRow.setAttribute("id", "subtotal");

  return stRow;
}

//==============================================================================
// create tax row
function createTaxRow() {
  let taxRow  = document.createElement('tr');
  let tdLabel = document.createElement('td');
  let tdTax = document.createElement('td');

  tdLabel.textContent = "Tax";
  tdLabel.style.textAlign="right";
  taxRow.appendChild(tdLabel);
  tdTax.textContent = 0;
  tdTax.setAttribute("class", "currency");
  taxRow.appendChild(tdTax);
  taxRow.setAttribute("id", "tax");

  return taxRow;
}

//==============================================================================
// create total row
function createTotalRow() {
  let totalRow  = document.createElement('tr');
  let tdLabel = document.createElement('td');
  let tdTotal = document.createElement('td');

  tdLabel.textContent = "Total";
  tdLabel.style.textAlign="right";
  totalRow.appendChild(tdLabel);
  tdTotal.textContent = 0;
  tdTotal.setAttribute("class", "currency");
  totalRow.appendChild(tdTotal);
  totalRow.setAttribute("id", "total");

  return totalRow;
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

  let tableBody = document.getElementById("body");
  let newRow = createOrderRow(item[0].textContent, price[0].textContent);

  tableBody.appendChild(newRow);

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
  }

  let trSubtotal = document.getElementById("subtotal");
  let tdSubtotal = trSubtotal.lastChild;

  tdSubtotal.textContent = "$" + subtotal;
  calculateTax(subtotal);
}

//==============================================================================
// calculate / update tax
function calculateTax(subtotal) {
  let taxRate = .1 // 10%

  let trTax = document.getElementById("tax");
  let tdTax = trTax.lastChild;
  let tax = subtotal * taxRate;

  tdTax.textContent = "$" + tax.toFixed(2);
  calculateTotal(subtotal, tax);
}

//==============================================================================
// calculate / update total
function calculateTotal(subtotal, tax) {
  let taxRate = .1 // 10%

  let trTotal = document.getElementById("total");
  let tdTotal = trTotal.lastChild;
  let total = "$" + (subtotal + tax).toFixed(2);

  tdTotal.textContent = total;
}
