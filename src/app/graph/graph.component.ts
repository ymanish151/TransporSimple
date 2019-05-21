import { Component, OnInit, Input, OnChanges, SimpleChanges, HostListener, ViewChild, ElementRef, Renderer } from "@angular/core";

@Component({
  selector: "app-graph",
  templateUrl: "./graph.component.html",
  styleUrls: ["./graph.component.css"]
})
export class GraphComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  @ViewChild('svg') d1: ElementRef;
  @Input() startingLocation: string;
  @Input() endLocation: string;
  jsonObj = [];
  start: string;
  end: string;
  lable: string;
  width: number = 1000;
  screenHeight;
  screenWidth;
  count: number = 0;
  // public innerWidth: any;
  // public innerHeight: any;
  markerInitialized: any = false;

  constructor(private _el: ElementRef<any>, private _renderer: Renderer) {
    this.onResize();
  }

  ngOnInit() {
    // this.innerWidth = window.innerWidth;
    // this.innerHeight = window.innerHeight;

  }

  onResize(event?) {
    this.screenHeight = "70vh";
    this.screenWidth = document.body.clientWidth;
  }

  createJSON() {
    var item = {};
    item["start"] = this.startingLocation;
    item["end"] = this.endLocation;

    this.jsonObj.push(item);

    this.lable = this.startingLocation.substring(0, 3) + " - " + this.endLocation.substring(0, 3);

    //this.createJSON();
    // this.end = this.endLocation.substring(0, 3);
    console.log(this.startingLocation, " ", this.endLocation);
    if (this.jsonObj.length == 1) {
      this.drawCircle(100, 200, 10, "left-1", this.lable, "black", "black");
    } else if (this.jsonObj.length > 0 && this.jsonObj[this.jsonObj.length - 1]["start"] == this.jsonObj[this.jsonObj.length - 2]["end"]) {
      this.drawCircle(300, 200, 10, "right-1", this.lable, "red", "red");
      this.drawCurvedLine(125, 200, 300 - 25, 200, "black", -1);
    } else if (this.jsonObj.length > 0 && this.jsonObj[this.jsonObj.length - 1]["start"] != this.jsonObj[this.jsonObj.length - 2]["end"]) {
      //this.textLable(100, 200, -10, -10, "left-txt-1","black", "black");
      this.drawCircle(500, 200, 10, "right-2", this.lable, "white", "green");
      this.drawCurvedLineArrow(300 + 25, 200, 500 - 25, 200, "black", -1);
    } else if (this.jsonObj.length > 0 && this.jsonObj[this.jsonObj.length - 1]["start"] != this.jsonObj[this.jsonObj.length - 2]["end"]) {
      this.drawCircle(700, 100, 10, "right-3", this.lable, "white", "grey");
      this.drawCurvedLineUnconnect(525, 200, 700 - 25, 100, "grey", 1);

      this.drawCircle(900, 100, 10, "right-4", this.lable, "white", "grey");
      this.drawCurvedLineUnconnect(700 + 25, 100, 900 - 25, 100, "grey", 1);

      this.drawCircle(1100, 200, 10, "right-4", this.lable, "white", "blue");
      this.drawCurvedLineUnconnect(900 + 25, 100, 1100 - 25, 200, "grey", 1);
    } else {

    }
    console.log(this.jsonObj);
  }

  createSVG() {
    var svg: any = document.getElementById("svg-canvas");
    var add: any = document.getElementById("add");
    if (null == svg) {
      svg = document.createElementNS("http://www.w3.org/2000/svg",
        "svg");
      svg.setAttribute('id', 'svg-canvas');
      svg.setAttribute('style', 'position:absolute;top:0px;left:0px');
      svg.setAttribute('width', this.screenWidth);
      svg.setAttribute('height', this.screenHeight);
      svg.setAttributeNS("http://www.w3.org/2000/xmlns/",
        "xmlns:xlink",
        "http://www.w3.org/1999/xlink");
      //console.log(svg);
      add.appendChild(svg);
      //console.log(add);
    }
    return svg;
  }

  drawCircle(x, y, radius, nameId, txt, colorFill = " ", color = " ") {
    this.count++;
    this.width = (this.width / this.count);
    // var newX = document.getElementsByTagName(nameId)[0].setAttribute("cx", this.width);
    var svg = this.createSVG();
    var shape = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    shape.setAttributeNS(null, "cx", x);
    shape.setAttributeNS(null, "cy", y);
    shape.setAttributeNS(null, "r", radius);
    shape.setAttributeNS(null, "stroke", color);
    shape.setAttributeNS(null, "stroke-width", "2");
    shape.setAttributeNS(null, "fill", colorFill);
    shape.setAttributeNS(null, "id", nameId);
    svg.appendChild(shape);
    var dx = 0;
    var dy = 30;
    this.textLable(x, y, dx, dy, txt, colorFill, color);
  }

  textLable(x, y, dx, dy, txt, colorFill = " ", color = " ") {
    // var svg = this.createSVG();
    // var txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
    // txt.setAttributeNS(null, "x", x);
    // txt.setAttributeNS(null, "y", y);
    // txt.setAttributeNS(null, "dx",  dx);
    // txt.setAttributeNS(null, "dy",  dy);
    // txt.setAttributeNS(null, "font-size", "30");
    // txt.setAttributeNS(null, "font-family", "sans-serif");
    // txt.setAttributeNS(null, "text-anchor", "middle");
    // txt.setAttributeNS(null, "fill", colorFill);
    // txt.setAttributeNS(null, "stroke", color);
    // txt.setAttributeNS(null, "id", nameId);
    // svg.appendChild(txt);

    var d1 = this._el.nativeElement.querySelector('svg');
    d1.insertAdjacentHTML('beforeend', '<text x="' + x + '" y="' + y + '" dx="' + dx + '" dy="' + dy + '" font-size="" font-family="sans-serif" text-anchor="middle" fill="' + colorFill + '" stroke="' + color + '" >' + txt + '</text>');
  }

  findAbsolutePosition(htmlElement) {
    var x = htmlElement.offsetLeft;
    var y = htmlElement.offsetTop;

    //var x = this._el.nativeElement.offsetTop;

    console.log(x, ' ', y);
    // for (var x: any = 0, y: any = 0, el = htmlElement; 
    //     el != null; 
    //     el = el.offsetParent ) {
    //       x += el.offsetLeft;
    //       y += el.offsetTop;
    // }
    return {
      "x": x,
      "y": y
    };
  }


  createTriangleMarker() {
    if (this.markerInitialized)
      return;
    this.markerInitialized = true;
    var svg = this.createSVG();
    var defs = document.createElementNS('http://www.w3.org/2000/svg',
      'defs');
    svg.appendChild(defs);

    var marker = document.createElementNS('http://www.w3.org/2000/svg',
      'marker');
    marker.setAttribute('id', 'triangle');
    marker.setAttribute('viewBox', '0 0 10 10');
    marker.setAttribute('refX', '0');
    marker.setAttribute('refY', '5');
    marker.setAttribute('markerUnits', 'strokeWidth');
    marker.setAttribute('markerWidth', '10');
    marker.setAttribute('markerHeight', '8');
    marker.setAttribute('orient', 'auto');
    var path = document.createElementNS('http://www.w3.org/2000/svg',
      'path');
    marker.appendChild(path);
    path.setAttribute('d', 'M 0 0 L 10 5 L 0 10 z');
    defs.appendChild(marker);
  }


  drawCurvedLineArrow(x1, y1, x2, y2, color, tension) {
    this.createTriangleMarker();
    var svg = this.createSVG();
    var shape = document.createElementNS("http://www.w3.org/2000/svg",
      "path");
    if (tension < 0) {
      var delta = (y2 - y1) * tension;
      var hx1 = x1;
      var hy1 = y1 - delta;
      var hx2 = x2;
      var hy2 = y2 + delta;
      var path = "M " + x1 + " " + y1 +
        " C " + hx1 + " " + hy1 + " "
        + hx2 + " " + hy2 + " "
        + x2 + " " + y2;
    } else {
      var delta = (x2 - x1) * tension;
      var hx1 = x1 + delta;
      var hy1: number = y1;
      var hx2: any = x2 - delta;
      var hy2 = y2;
      var path = "M " + x1 + " " + y1 +
        " C " + hx1 + " " + hy1 + " "
        + hx2 + " " + hy2 + " "
        + x2 + " " + y2;
    }
    shape.setAttributeNS(null, "d", path);
    shape.setAttributeNS(null, "fill", "none");
    shape.setAttributeNS(null, "stroke", color);
    shape.setAttributeNS(null, "marker-start", "url(#trianglebackwards)");
    shape.setAttributeNS(null, "marker-end", "url(#triangle)");
    svg.appendChild(shape);
  }

  drawCurvedLineUnconnect(x1, y1, x2, y2, color, tension) {
    var svg = this.createSVG();
    var shape = document.createElementNS("http://www.w3.org/2000/svg",
      "path");

    if (tension < 0) {
      var delta = (y2 - y1) * tension;
      var hx1 = x1;
      var hy1 = y1 - delta;
      var hx2 = x2;
      var hy2 = y2 + delta;
      var path = "M " + x1 + " " + y1 +
        " C " + hx1 + " " + hy1 + " "
        + hx2 + " " + hy2 + " "
        + x2 + " " + y2;
    } else {
      var delta = (x2 - x1) * tension;
      var hx1 = x1 + delta;
      var hy1: number = y1;
      var hx2: any = x2 - delta;
      var hy2 = y2;
      var path = "M " + x1 + " " + y1 +
        " C " + hx1 + " " + hy1 + " "
        + hx2 + " " + hy2 + " "
        + x2 + " " + y2;
    }
    shape.setAttributeNS(null, "d", path);
    shape.setAttributeNS(null, "fill", "none");
    shape.setAttributeNS(null, "stroke", color);
    svg.appendChild(shape);
  }

  drawCurvedLine(x1, y1, x2, y2, color, tension) {
    var svg = this.createSVG();
    var shape = document.createElementNS("http://www.w3.org/2000/svg",
      "path");

    if (tension < 0) {
      var delta = (y2 - y1) * tension;
      var hx1 = x1;
      var hy1 = y1 - delta;
      var hx2 = x2;
      var hy2 = y2 + delta;
      var path = "M " + x1 + " " + y1 +
        " C " + hx1 + " " + hy1 + " "
        + hx2 + " " + hy2 + " "
        + x2 + " " + y2;
    } else {
      var delta = (x2 - x1) * tension;
      var hx1 = x1 + delta;
      var hy1: number = y1;
      var hx2: any = x2 - delta;
      var hy2 = y2;
      var path = "M " + x1 + " " + y1 +
        " C " + hx1 + " " + hy1 + " "
        + hx2 + " " + hy2 + " "
        + x2 + " " + y2;
    }
    shape.setAttributeNS(null, "d", path);
    shape.setAttributeNS(null, "fill", "none");
    shape.setAttributeNS(null, "stroke", color);
    svg.appendChild(shape);
  }


  connectDivs(leftId, rightId, color, tension) {
    var left = document.getElementById(leftId);
    var right = document.getElementById(rightId);

    var leftPos = this.findAbsolutePosition(left);
    var x1 = leftPos.x;
    var y1 = leftPos.y;
    x1 += left.offsetWidth;
    y1 += (left.offsetHeight / 2);

    var rightPos = this.findAbsolutePosition(right);
    var x2 = rightPos.x;
    var y2 = rightPos.y;
    y2 += (right.offsetHeight / 2);
    console.log(left, ' ', right, ' ', x2, ' ', y2);
    var width = x2 - x1;
    var height = y2 - y1;

    // this.drawCircle(x1, y1, 3, color);
    // this.drawCircle(x2, y2, 3, color);
    this.drawCurvedLine(x1, y1, x2, y2, color, tension);
  }
}
