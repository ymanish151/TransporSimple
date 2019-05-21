import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { GraphComponent } from '../graph/graph.component';
import { MatDialog } from "@angular/material";

@Component({
  selector: "app-search-page",
  templateUrl: "./search-page.component.html",
  styleUrls: ["./search-page.component.css"]
})
export class SearchPageComponent implements OnInit {
  @ViewChild(GraphComponent) graph: GraphComponent;
  from: string = "";
  to: string = "";
  fromParent: string = "";
  toParent: string = "";
  searchLocationForm: FormGroup;
  submitted = false;
  show = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.searchLocationForm = this.formBuilder.group({
      from: ["", [Validators.required, Validators.maxLength(30)]],
      to: ["", [Validators.required, Validators.maxLength(30)]]
    });
  }
  get f() {
    return this.searchLocationForm.controls;
  }

  onSearch() {
    this.submitted = true;
    this.fromParent = this.from;
    this.toParent = this.to;
    //console.log(this.from, this.to);
    // stop here if form is invalid
    if (this.searchLocationForm.invalid) {
      return;
    }
    this.show = true;
    this.graph.createJSON();
    console.log("SUCCESS!! :-)" + this.fromParent + this.toParent);
    //alert("SUCCESS!! :-)" + this.fromParent + this.toParent);
    // if (this.from != "" && this.to != "") {
    //   console.log("search");
    // } else {
    //   alert("Invalid credentials");
    // }
  }
}
