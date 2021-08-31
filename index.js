/*
Agora vamos criar a funcionalidade de "remover" um carro. Adicione uma nova
coluna na tabela, com um botão de remover.
Ao clicar nesse botão, a linha da tabela deve ser removida.
Faça um pull request no seu repositório, na branch `challenge-31`, e cole
o link do pull request no `console.log` abaixo.
Faça um pull request, também com a branch `challenge-31`, mas no repositório
do curso, para colar o link do pull request do seu repo.
*/

console.log(
  'Link do seu projeto no seu github de forma privada, adicionando anilton.veigaa@gmail.com'
);
(function (DOM) {
  'use strict';

  const app= (function(){     
    const $inputImage = new DOM('[data-js="inputImage"]');
    const $inputModel = new DOM('[data-js="inputModel"]');
    const $inputYear = new DOM('[data-js="inputYear"]');
    const $inputPlate = new DOM('[data-js="inputPlate"]');
    const $inputColor = new DOM('[data-js="inputColor"]');  
    return{
      start: function() {
        this.getCompany();
        this.events();
      }, 

      getCompany:function(){
        const $ajax = new XMLHttpRequest();
        $ajax.open('GET',"company.json",true);
        $ajax.send();     
        $ajax.addEventListener('readystatechange',this.setCompany); 
      },

      
      events: function(){ 
        let form = new  DOM('[data-js="form"]');    
        form.on('submit',this.createComponent);
      },
      

      createComponent: function(evt){        
        evt.preventDefault();
        let $tbody = new DOM('[data-js="table-car"').get()[0];

        $tbody.appendChild(app.addCar());
        this.clearForm;


        
      },

      addCar: function(){
        const $fragment =  document.createDocumentFragment(); 
        const $tr = document.createElement('tr');
        const $tdImage = document.createElement('td');
        const $image = document.createElement('img')
        const $tdModel = document.createElement('td');
        const $tdYear = document.createElement('td');
        const $tdPlate = document.createElement('td');
        const $tdColor = document.createElement('td');

        const $tdDelete = document.createElement('td');
        const $delButton = document.createElement('button');
        

        $delButton.style = 'height: 30px;width:60px; background:red; font-weight: 700;'
        $delButton.innerHTML='Deletar'
        
        
        
        $tdDelete.appendChild($delButton);
        $delButton.addEventListener('click',this.deleteItem)
        $image.src =$inputImage.get()[0].value;
        $tdImage.appendChild($image);

        $tdModel.innerText = $inputModel.get()[0].value.replace(/[<>]/g,'');
        $tdYear.innerText = $inputYear.get()[0].value.replace(/[<>]/g,'');
        $tdPlate.innerText = $inputPlate.get()[0].value.replace(/[<>]/g,'');
        $tdColor.innerText = $inputColor.get()[0].value.replace(/[<>]/g,'');

        $tr.appendChild($tdImage);
        $tr.appendChild($tdModel);
        $tr.appendChild($tdYear);
        $tr.appendChild($tdPlate);
        $tr.appendChild($tdColor);
        $tr.appendChild($tdDelete);
      
        $fragment.appendChild($tr);
       
        
        return $fragment;      
      },

      deleteItem: function(evt){        
        let element = evt.target;
        let td = element.parentNode;
        return td.parentNode.remove();
      },

      setCompany: function(){
        
        if(this.status === 200 & this.readyState===4){
          let data = JSON.parse(this.responseText);
          console.log(data)
          let companyName = new DOM('[data-js="companyName"]').get()[0];
          let companyPhone = new DOM('[data-js="companyPhone"]').get()[0];
          
          companyName.innerHTML = data.name;          
          companyPhone.innerHTML ="contato: "+ data.phone;
        }
      },

      clearForm: function(){
        $inputImage.get()[0].value='';
        $inputModel.get()[0].value='';
        $inputYear.get()[0].value='';
        $inputPlate.get()[0].value='';
        $inputColor.get()[0].value='';
      }   
    }
  })();
  app.start();
})(window.DOM);