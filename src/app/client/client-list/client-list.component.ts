import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { Observable } from 'rxjs';
import { Client }  from '../client'

import {
  AngularFireStorage,
  AngularFireUploadTask
} from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { tap, finalize } from 'rxjs/operators';
@Component({
  selector: 'client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

    // Main task
    task: AngularFireUploadTask;

    // Progress monitoring
    percentage: Observable<number>;
  
    snapshot: Observable<any>;
  
    // Download URL
    downloadURL: Observable<string>;
  
    // State for dropzone CSS toggling
    isHovering: boolean;
  
  public clients: any;
  tasks: Observable<any[]>;
  selectedClient:Client;


  public clientList:any;

  constructor(
    public clientSrv: ClientService,
    private storage: AngularFireStorage,
    private db: AngularFirestore
  ) { }

  ngOnInit() {
    console.log("Getting List");
    this.getClients();
  }

  getClients() {
    this.clientSrv.getAllClients().snapshotChanges().subscribe(clients => {
      return this.clients = clients.map(c => ({ key: c.payload.key, ...c.payload.val() })) 
    });
  };

  onSelectClient(myClient:Client){
    console.log("Clent Selected: " + myClient)
    this.selectedClient = myClient;
    console.log(JSON.stringify(myClient))
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList) {
    // The File object
    const file = event.item(0);

    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ');
      return;
    }

    // The storage path
    const path = `test/${new Date().getTime()}_${file.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'My AngularFire-powered PWA!' };

    // The main task
    this.task = this.storage.upload(path, file, { customMetadata });

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      tap(snap => {
        if (snap.bytesTransferred === snap.totalBytes) {
          // Update firestore on completion
          this.db.collection('photos').add({ path, size: snap.totalBytes });
        }
      }),
      finalize(() => this.downloadURL = this.storage.ref(path).getDownloadURL() )
    );


    // The file's download URL
  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return (
      snapshot.state === 'running' &&
      snapshot.bytesTransferred < snapshot.totalBytes
    );
  }

}
