/*
Já temos as funcionalidades de adicionar e remover um carro. Agora, vamos persistir esses dados, 
salvando-os temporariamente na memória de um servidor.

Nesse diretório do `challenge-32` tem uma pasta `server`. É um servidor simples, em NodeJS, para 
que possamos utilizar para salvar as informações dos nossos carros.

Para utilizá-lo, você vai precisar fazer o seguinte:

- Via terminal, acesse o diretório `server`;
- execute o comando `npm install` para instalar as dependências;
- execute `node app.js` para iniciar o servidor.

Ele irá ser executado na porta 3000, que pode ser acessada via browser no endereço: 
`http://localhost:3000`

O seu projeto não precisa estar rodando junto com o servidor. Ele pode estar em outra porta.
As mudanças que você irá precisar fazer no seu projeto são:

- Para listar os carros cadastrados ao carregar o seu projeto, faça um request GET no endereço
`http://localhost:3000/car`
- Para cadastrar um novo carro, faça um POST no endereço `http://localhost:3000/car`, enviando
os seguintes campos:
  - `image` com a URL da imagem do carro;
  - `brandModel`, com a marca e modelo do carro;
  - `year`, com o ano do carro;
  - `plate`, com a placa do carro;
  - `color`, com a cor do carro.

Após enviar o POST, faça um GET no `server` e atualize a tabela para mostrar o novo carro cadastrado.

Crie uma branch `challenge-32` no seu projeto, envie um pull request lá e cole nesse arquivo a URL
do pull request.
*/
console.log('Link do pull request do seu projeto');
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
        this.getCar();
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
        app.postCarOnServer();
              
        app.clearForm();


        
      },

      getCar: function(){
        const $ajax = new XMLHttpRequest();
        let $tbody = new DOM('[data-js="table-car"').get()[0];
        
        $ajax.open("GET",'http://localhost:3000/car');
        $ajax.send();   

        $ajax.addEventListener('readystatechange',()=>{         
          if($ajax.status === 200 & $ajax.readyState===4){
             let data = JSON.parse($ajax.responseText);
            console.log(data)
            if(data.length>0)
              data.map((item)=>{                
                $tbody.appendChild(app.addCar(item));
              });           
          }
        });
      },

      addCar: function(item){
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
        $delButton.style = 'height: 30px;width:60px; background:red; font-weight: 700;';
        $delButton.innerHTML='Deletar';
         
        $tdDelete.appendChild($delButton);
        $delButton.addEventListener('click',this.deleteItem)
        $image.src =item.image;
        $tdImage.appendChild($image);

        $tdModel.innerText = item.brandModel;
        $tdYear.innerText = item.year;
        $tdPlate.innerText = item.plate;
        $tdColor.innerText = item.color;

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
      },   

      postCarOnServer:function(){
        const $ajax = new XMLHttpRequest();
        $ajax.open('POST',"http://localhost:3000/car");
        $ajax.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        $ajax.send(JSON.stringify({
          image: $inputImage.get()[0].value,
          brandModel: $inputModel.get()[0].value.replace(/[<>]/g,''),
          year: $inputYear.get()[0].value.replace(/[<>]/g,''),
          plate: $inputPlate.get()[0].value.replace(/[<>]/g,''),
          color: $inputColor.get()[0].value.replace(/[<>]/g,''),
        }));
      }
    }
  })();
  app.start();
})(window.DOM);