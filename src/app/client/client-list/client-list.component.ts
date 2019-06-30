import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  public clients: any;
  tasks: Observable<any[]>;


  public clientList:any;

  constructor(
    public clientSrv: ClientService
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

}
