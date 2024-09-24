import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  isVisible: boolean = false;
  message: string = '';

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.modalService.message$.subscribe((message: string) => {
      this.message = message;
      this.showModal();
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  hideModal(): void {
    this.isVisible = false;
  }
}
