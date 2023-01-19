function cardDateFormatter(e) {
    var inputChar = String.fromCharCode(e.keyCode);
    var code = e.keyCode;
    var allowedKeys = [8];
    if (allowedKeys.indexOf(code) !== -1) {
        return;
    }

    e.target.value = e.target.value.replace(
        /^([1-9]\/|[2-9])$/g, '0$1/' // 3 > 03/
    ).replace(
        /^(0[1-9]|1[0-2])$/g, '$1/' // 11 > 11/
    ).replace(
        /^([0-1])([3-9])$/g, '0$1/$2' // 13 > 01/3
    ).replace(
        /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2' // 141 > 01/41
    ).replace(
        /^([0]+)\/|[0]+$/g, '0' // 0/ > 0 and 00 > 0
    ).replace(
        /[^\d\/]|^[\/]*$/g, '' // To allow only digits and `/`
    ).replace(
        /\/\//g, '/' // Prevent entering more than 1 `/`
    );
}

function cardNumberFormatter (e) {
    if (e.keyCode !== 8) {
        if (this.value.length === 4 || this.value.length === 9 || this.value.length === 14) {
            this.value = this.value += ' ';
        }
    }
}

let card_number = document.querySelector('.card-number');
let card_date = document.querySelector('.card-date');
let card_cvv = document.querySelector('.card-cvv');
let card_name = document.querySelector('.card-name');
let payment_button = document.querySelector('.payment-submit');
let hidden_card = document.querySelector('.hidden-card');

card_number.addEventListener('keyup',cardNumberFormatter );
card_number.addEventListener('keypress',cardNumberFormatter );

card_date.addEventListener('keyup',cardDateFormatter);
card_date.addEventListener('keypress',cardDateFormatter);

payment_button.addEventListener('click',function(){
    alert("Card Number: " + card_number.value.replaceAll(' ', '') +"\nCard Date: "+ card_date.value+"\nCard CVV: "+card_cvv.value+"\nCard Name: "+card_name.value);
})


card_number.addEventListener('keyup',function(){
    if(card_number.value.length>0){
        if(card_number.value[0] == "4"){
            hidden_card.classList.add("hidden-visa");
        }
        else if(card_number.value[0] == "5"){
            hidden_card.classList.add("hidden-master");
        }
        else if(card_number.value[0] == "3"){
            hidden_card.classList.add("hidden-amex");
        }
    }
    else{
        hidden_card.classList.remove("hidden-visa");
        hidden_card.classList.remove("hidden-master");
        hidden_card.classList.remove("hidden-amex");
    }
})