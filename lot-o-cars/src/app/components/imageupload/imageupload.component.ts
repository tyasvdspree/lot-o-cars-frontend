import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-imageupload',
  templateUrl: './imageupload.component.html',
  styleUrls: ['./imageupload.component.scss']
})
export class ImageuploadComponent implements OnInit {
  @ViewChild('file') file;
  @Input() entityId: string;
  @Output() onFilesSelected = new EventEmitter<FileList>();
  fileInfo = 'geen foto\'s geselecteerd';

  constructor() {}

  ngOnInit(): void {}

  onSelectFilesClicked(): void {
    // open dialog of file input
    this.file.nativeElement.click();
  }

  selectFiles(event) {
    const file = event.target.files.item(0);
 
    if (file.type.match('image.*')) {
      this.onFilesSelected.emit(event.target.files);
      this.fileInfo = "aantal geselecteerde foto's: " + event.target.files.length;
    } else {
      alert('selecteer een fotobestand (.jpg, .png, .gif)!');
    }
  }
 
}
