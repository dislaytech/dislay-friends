import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from "@angular/core";
import * as d3 from "d3";
import { Friend } from "../../models/Friend.model";

@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.scss"],
})
export class ChartComponent implements OnInit, OnChanges {
  @ViewChild("chart") private chartContainer: ElementRef;
  @Input() data: Friend[] = [];
  private margin: any = { top: 20, bottom: 20, left: 20, right: 20 };
  private width: number = 500;
  private height: number = 500;
  private chart: any;
  private xScale: any;
  private yScale: any;
  private colors: any;
  private xAxis: any;
  private yAxis: any;

  constructor(elem: ElementRef) {
    this.chartContainer = elem;
  }

  ngOnInit() {
    this.createChart();
    this.updateChart();
  }

  ngOnChanges() {
    if (this.chart) {
      this.updateChart();
    }
  }

  createChart() {
    let element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    let svg = d3
      .select(element)
      .append("svg")
      .attr("width", element.offsetWidth)
      .attr("height", element.offsetHeight);

    // chart plot area
    this.chart = svg
      .append("g")
      .attr("class", "bars")
      .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`);

    // define X & Y domains
    let xDomain = this.data.map((d) => d.letter);
    let yDomain = [0, d3.max(this.data, (d) => d.frequency) as number];

    // create scales
    this.xScale = d3
      .scaleBand()
      .padding(0.1)
      .domain(xDomain)
      .rangeRound([0, this.width]);
    this.yScale = d3.scaleLinear().domain(yDomain).range([this.height, 0]);

    // bar colors
    this.colors = d3
      .scaleLinear()
      .domain([0, this.data.length])
      .range(<any[]>["red", "blue"]);

    // x & y axis
    this.xAxis = svg
      .append("g")
      .attr("class", "axis axis-x")
      .attr(
        "transform",
        `translate(${this.margin.left}, ${this.margin.top + this.height})`
      )
      .call(d3.axisBottom(this.xScale));
    this.yAxis = svg
      .append("g")
      .attr("class", "axis axis-y")
      .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`)
      .call(d3.axisLeft(this.yScale));
  }

  updateChart() {
    // update scales & axis
    this.xScale.domain(this.data.map((d) => d.letter));
    this.yScale.domain([0, d3.max(this.data, (d) => d.frequency)]);
    this.colors.domain([0, this.data.length]);
    this.xAxis.transition().call(d3.axisBottom(this.xScale));
    this.yAxis.transition().call(d3.axisLeft(this.yScale));

    let update = this.chart.selectAll(".bar").data(this.data);

    // remove exiting bars
    update.exit().remove();

    // update existing bars
    this.chart
      .selectAll(".bar")
      .transition()
      .attr("x", (d: Friend) => this.xScale(d.letter))
      .attr("y", (d: Friend) => this.yScale(d.frequency))
      .attr("width", (d: Friend) => this.xScale.bandwidth())
      .attr("height", (d: Friend) => this.height - this.yScale(d.frequency))
      .style("fill", (d: Friend, i: any) => this.colors(i));

    // add new bars
    update
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d: Friend) => this.xScale(d.letter))
      .attr("y", (d: Friend) => this.yScale(0))
      .attr("width", this.xScale.bandwidth())
      .attr("height", 0)
      .style("fill", (d: Friend, i: any) => this.colors(i))
      .transition()
      .delay((d: Friend, i: any) => i * 10)
      .attr("y", (d: Friend) => this.yScale(d.frequency))
      .attr("height", (d: Friend) => this.height - this.yScale(d.frequency));
  }
}
