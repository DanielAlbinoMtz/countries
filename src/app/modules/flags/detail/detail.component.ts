import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlagsService } from '../services/flags.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  name: string = this.activated.snapshot.params['name'];
  flag: any;
  foto: any;
  languages: any;

  constructor(private activated: ActivatedRoute, private service: FlagsService) { }

  ngOnInit(): void {
    this.getFlag();
    console.log(this.languages);
  }

  getFlag() {
    this.service.getFlag(this.name).subscribe((data:any) => {
      this.foto = data[0].flags.png;
      const lang = Object.values(data[0].languages);
      this.languages = lang;
      this.flag = data[0];
      console.log(this.flag);
    });
  }

}
