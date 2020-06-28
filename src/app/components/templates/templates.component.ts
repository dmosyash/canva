import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { ApiServiceService } from './../../services/api-service.service';

interface Template {
  id: string;
  author: string;
  download_url: URL;
  height: number;
  width: number;
  url: URL;
}

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit, AfterViewInit {

  private fullList: Array<Template>;
  private counter: number;
  private slotValue: number;
  public templateList: Array<Template>;

  constructor(private apiService: ApiServiceService) {
    this.templateList = [];
    this.counter = 0;
    this.slotValue = 6;
   }

  ngOnInit() {
    this.apiService.getTemplates().subscribe(res => {
      this.fullList = res;
      this.updateTemplateList();
    });
  }

  ngAfterViewInit() {
    const templateWrapper = document.getElementById('template-wrapper');
    templateWrapper.addEventListener('scroll', this.scrollHandler.bind(this));
  }

  scrollHandler(e) {
    const elem = e.target;
    const elemPercent = (elem.scrollTop / (elem.scrollHeight - elem.clientHeight)) * 100;
    if (elemPercent > 90) {
      this.updateTemplateList();
    }
  }

  updateTemplateList() {
    if (this.counter < this.fullList.length) {
      this.templateList = [...this.templateList, ...this.fullList.slice(this.counter, this.counter + this.slotValue)];
      this.counter += this.slotValue;
    }
  }

}
