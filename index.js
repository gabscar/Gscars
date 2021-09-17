/*
Hora de finalizar nosso projeto!
Já temos o cadastro funcionando e persistindo em memória;
Já estamos deletando o carro da tabela (no frontend).
Mas se você perceber, se você recarregar a tela, o carro ainda vai estar lá.
Agora você precisa fazer com que, ao clicar no botão de deletar, o carro seja
removido da tabela e também seja deletado do servidor.
Para fazer isso, você precisa enviar o verbo HTTP "DELETE" para a mesma URL
que você faz o POST para cadastrar o carro:
`http://localhost:3000/car`, só que, ao invés de enviar todas as informações
do carro, como você faz para cadastrar, você deve enviar somente a placa
do carro.
Fazendo isso, ao recarregar a tela, a tabela deve mostrar os carros atualizados.
A lógica do servidor que está criada nesso diretório desse desafio é o mesmo
do desafio anterior, com a diferença que, nesse desafio, nós temos a
implementação da regra para a deleção do carro =)
A regra é a mesma das anteriores: crie uma branch `challenge-33` no seu
repositório do GitHub, e envie o pull request para lá.
Depois, envie um pull request no repositório do curso, colocando no console.log
abaixo a URL do pull request no seu repositório.
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
    const $ajax = new XMLHttpRequest();
    return{
      start: function() {
        this.getCompany();
        this.events();
        this.getCar();
        
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
        let $tbody = new DOM('[data-js="table-car"').get()[0];
        
        $ajax.open("GET",'http://localhost:3000/car');
        $ajax.send();   
        $ajax.addEventListener('readystatechange',()=>{
          if($ajax.status === 200 & $ajax.readyState===4){
            
            let data = JSON.parse($ajax.responseText);
            console.log(data)
            if(data.length>0)
              data.forEach((item)=>{
                $tbody.appendChild(app.addCarOnTable(item));
              });
          }
        });
      },

      addCarOnTable: function(item){
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
        $delButton.addEventListener('click',(evt)=>{
          evt.preventDefault();
          this.deleteItem(item.plate)
        })
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

      deleteItem: function(item){        
        $ajax.open('DELETE',"http://localhost:3000/car")
        $ajax.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');       
        $ajax.send(JSON.stringify({plate:item}));
        window.location.reload();
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
        $ajax.open('POST',"http://localhost:3000/car")
        $ajax.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

        let data = JSON.stringify({
          image: $inputImage.get()[0].value,
          brandModel: $inputModel.get()[0].value.replace(/[<>]/g,''),
          year: $inputYear.get()[0].value.replace(/[<>]/g,''),
          plate: $inputPlate.get()[0].value.replace(/[<>]/g,''),
          color: $inputColor.get()[0].value.replace(/[<>]/g,''),
        });
        $ajax.send(data);
      }
    }
  })();
  app.start();
})(window.DOM);