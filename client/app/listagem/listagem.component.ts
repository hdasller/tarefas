import { Component } from '@angular/core';
import { FotoService } from '../foto/foto.service';
import { FotoComponent } from '../foto/foto.component';
import { PainelComponent } from '../painel/painel.component'

@Component({
    moduleId: module.id,
    selector: 'listagem',
    templateUrl: './listagem.component.html',
    styleUrls: ['./listagem.component.css']
})
export class ListagemComponent {

    fotos: FotoComponent[] = [];
    service: FotoService;
    mensagem: string = '';

    constructor(service: FotoService) {
        this.service = service;
        service
            .lista()
            .subscribe(fotos => {
                this.fotos = fotos;
            }, erro => console.log(erro))
    }

    remove(foto: FotoComponent, painel: PainelComponent) {

        this.service
            .remove(foto)
            .subscribe(() => {

          

                    let novasFotos = this.fotos.slice(0);
                    let indice = novasFotos.indexOf(foto)
                    novasFotos.splice(indice, 1);
                    this.fotos = novasFotos;
                    this.mensagem = 'Tarefa removida com sucesso';


                

            },
            erro => {
                console.log(erro);
                this.mensagem = "nao foi possivel remover a tarefa";
            })
    }

}