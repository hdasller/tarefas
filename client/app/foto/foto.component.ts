import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'foto',
    templateUrl: './foto.component.html' ,
    styleUrls: ['./foto.component.css']
    
})
export class FotoComponent {

    @Input() titulo: string = '';
    @Input() url: string = '';
    @Input() grupo: string = '';
    descricao: string = '';
    _id: string = '';
    
}