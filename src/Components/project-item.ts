import { Draggable } from '../models/drag-and-drop';
import { Project } from '../models/project';
import { Component } from './base-components';
import { AutoBind } from '../decorators/autobind';


export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
    private project: Project;

    constructor(hostId: string, project: Project) {
        super('single-project', hostId, false, project.id);
        this.project = project;
        this.configure();
        this.renderContent();
    }
    @AutoBind

    dragStarHandler(event: DragEvent) {
        event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.effectAllowed = 'move';

    };
    dragEndHandler(_: DragEvent) {
        console.log('Drag End');
        
    }

    configure() {
        this.element.addEventListener('dragstart', this.dragStarHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);

    };

    renderContent() {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.project.people.toString() + ' Persons Assigned';
        this.element.querySelector('p')!.textContent = this.project.description;
    }
}
