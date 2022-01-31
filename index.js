let $date = document.querySelector('.date');
let $currency__value = document.querySelector('.currency__value');
let $currency__name = document.querySelector('.currency__name');
let $hryvnia__value = document.querySelector('.hryvnia__value');
let $hryvnia__name = document.querySelector('.hryvnia__name'); 
let $select = document.querySelector('.currency');

fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
	.then((response) => {
   	return response.json();
  	})
  	.then((data) => {
  		for(let elem of data){
  			createOption(elem);
  		}
  		return data;
  	})
  	.then((data) => {
  		$select.addEventListener('change',function(){
   		checked = document.querySelector('option:checked').value;
   		for(let elem of data){
   			if(checked == elem.cc) {
   				if(+$currency__value.value == 0 || isNaN($currency__value.value)) {
   					$date.innerHTML = 'Введiть суму:';
   					$hryvnia__value.value = '';
   				} else{
   					$hryvnia__value.value = (+$currency__value.value * +elem.rate).toFixed(2);
   					$date.innerHTML = '';
   				}
   			}
   		}
		});
  	})


function createOption(obj){
	let $currency__name_title = document.createElement('option');
	$currency__name_title.innerHTML = `${obj.txt}, ${obj.cc}`;
	$currency__name_title.value = obj.cc;
	$currency__name.appendChild($currency__name_title);
}


