import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounce, debounceTime } from 'rxjs';
import { FlagsService } from '../services/flags.service'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  flags: any[] = [];
  loader: boolean = true;

  constructor(private flag: FlagsService) { }

  search =  new FormControl('');

  ngOnInit(): void {
    this.getAllFlags();

    this.search.valueChanges.pipe(debounceTime(300)).subscribe(value => {
      if(value === '') {
        console.log('empty');
        this.getAllFlags();
      }
      this.flags = this.flags.filter(flag => {

        /* return flag.name.common.toLowerCase().includes(value.toLowerCase()); */

        return flag.name.common.toLowerCase().indexOf(value.toLowerCase()) >= 0;
      });
      console.log(value);
    }
    );
  }

  getAllFlags() {
    this.flag.getAllFlags().subscribe((data:any) => {
      this.flags = data;
      this.flags.sort((a, b) => a.name.common.localeCompare(b.name.common));
      this.loader = false;
    },
    error => {
      console.log(error);
    });
  }

  getFlag(name: string) {
    this.flag.getFlag(name).subscribe((data:any) => {
      this.flags = data;
      console.log(this.flags);
    });
  }

}
