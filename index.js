/*
A loja de carros será nosso desafio final. Na aula anterior, você fez a parte
do cadastro dos carros. Agora nós vamos começar a deixar ele com cara de
projeto mesmo.
Crie um novo repositório na sua conta do GitHub, com o nome do seu projeto.
Na hora de criar, o GitHub te dá a opção de criar o repositório com um
README. Use essa opção.
Após criar o repositório, clone ele na sua máquina.
Crie uma nova branch chamada `challenge-30`, e copie tudo o que foi feito no
desafio da aula anterior para esse novo repositório, nessa branch
`challenge-30`.
Adicione um arquivo na raiz desse novo repositório chamado `.gitignore`.
O conteúdeo desse arquivo deve ser somente as duas linhas abaixo:
node_modules
npm-debug.log
Faça as melhorias que você achar que são necessárias no seu código, removendo
duplicações, deixando-o o mais legível possível, e então suba essa alteração
para o repositório do seu projeto.
Envie um pull request da branch `challenge-30` para a `master` e cole aqui
nesse arquivo, dentro do `console.log`, o link para o pull request no seu
projeto.
*/

console.log(
  'Link do seu projeto no seu github de forma privada, adicionando aristotelesFerreira'
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
        clearForm();


        
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

        $image.src = $inputImage.get()[0].value;
        $tdImage.appendChild($image);

        $tdModel.innerText = $inputModel.get()[0].value;
        $tdYear.innerText = $inputYear.get()[0].value;
        $tdPlate.innerText = $inputPlate.get()[0].value;
        $tdColor.innerText = $inputColor.get()[0].value;

        $tr.appendChild($tdImage);
        $tr.appendChild($tdModel);
        $tr.appendChild($tdYear);
        $tr.appendChild($tdPlate);
        $tr.appendChild($tdColor);
      
        $fragment.appendChild($tr);
       
        
        return $fragment;      
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