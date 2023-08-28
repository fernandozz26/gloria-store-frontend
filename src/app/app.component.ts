import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MainViewService } from './services/main.view.serive';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})


export class AppComponent {
  title = 'Floris loquisss';

  constructor(private readonly mainViewSvc: MainViewService){

  }

  radioOptionsPedido = [
    {id: "radioAgregar", value: "agregar"},
    {id: "radioBuscar", value: "buscar"}
  
  ]

  radioTipoAccion:string = "agregar";
  
  radioChangeHandler():void{
    console.log(this.radioTipoAccion);
  }

  copiar(e:any):void {
      for(var i = 0 ; i < e.clipboardData.items.length ; i++){
          // get the clipboard item
          var clipboardItem = e.clipboardData.items[i];
          var type = clipboardItem.type;

          // if it's an image add it to the image field
        if (type.indexOf("image") != -1) {

          // get the image content and create an img dom element
          var blob = clipboardItem.getAsFile();
          var blobUrl = window.webkitURL.createObjectURL(blob);
          var img:HTMLElement | null = document.getElementById("img-clipboard");
          img?.setAttribute("src", blobUrl);
          
        }
    }
}

  ngOnInit():void{
    window.addEventListener("paste",this.copiar);
    
    
  }


  tabChanged(event: MatTabChangeEvent):void{
    if(event.tab.textLabel == "Buscar Pedido"){
      
      this.mainViewSvc.setFindOrderChecker(true);
    }
  }
}
