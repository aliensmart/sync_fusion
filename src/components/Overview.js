import * as React from 'react';
import { closest, isNullOrUndefined } from '@syncfusion/ej2-base';
import { GridComponent, ColumnsDirective, ColumnDirective, Filter, Inject, VirtualScroll, Sort } from '@syncfusion/ej2-react-grids';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { App } from '../App';
import ratingTemplate from './sub_components/ratingTemplate';
import progessTemplate from './sub_components/progressTemplate';
import trustTemplate from './sub_components/trustTemplate';
import empTemplate from './sub_components/empTemplate';
import coltemplate from './sub_components/coltemplate';
import trustdetails from './sub_components/trustdetails';
import ratingDetails from './sub_components/ratingDetails';
import statusdetails from './sub_components/statusDetails';
import statusTemplate from './sub_components/statusTemplate';
import { getData } from './data';
import './grid-overview.css';

export class OverView extends App {
    constructor() {
        super(...arguments);
        this.dReady = false;
        this.dtTime = false;
        this.isDataBound = false;
        this.isDataChanged = true;
        this.dropSlectedIndex = null;
        this.ddlData = [
            { text: '1,000 Rows and 11 Columns', value: '1000' },
            { text: '10,000 Rows and 11 Columns', value: '10000' },
            { text: '1,00,000 Rows and 11 Columns', value: '100000' }
        ];
        this.fields = { text: 'text', value: 'value' };
        this.getTradeData = getData(1000);
        this.check = {
            type: 'CheckBox'
        };
        this.select = {
            persistSelection: true,
            type: "Multiple",
            checkboxOnly: true
        };
        this.Filter = {
            type: 'Menu'
        };
        this.status = {
            type: 'CheckBox',
            itemTemplate: statusdetails
        };
        this.trust = {
            type: 'CheckBox',
            itemTemplate: trustdetails
        };
        this.rating = {
            type: 'CheckBox',
            itemTemplate: ratingDetails
        };
    }
    onQueryCellInfo(args) {
        if (args.column.field === 'Employees') {
            if (args.data.EmployeeImg === 'usermale') {
                args.cell.querySelector('.e-userimg').classList.add("sf-icon-Male");
            }
            else {
                args.cell.querySelector('.e-userimg').classList.add("sf-icon-FeMale");
            }
        }
        if (args.column.field === 'Status') {
            if (args.cell.textContent === "Active") {
                args.cell.querySelector(".statustxt").classList.add("e-activecolor");
                args.cell.querySelector(".statustemp").classList.add("e-activecolor");
            }
            if (args.cell.textContent === "Inactive") {
                args.cell.querySelector(".statustxt").classList.add("e-inactivecolor");
                args.cell.querySelector(".statustemp").classList.add("e-inactivecolor");
            }
        }
        if (args.column.field === 'Rating') {
            if (args.column.field === 'Rating') {
                for (var i = 0; i < args.data.Rating; i++) {
                    args.cell.querySelectorAll("span")[i].classList.add("checked");
                }
            }
        }
        if (args.column.field === "Software") {
            if (args.data.Software <= 20) {
                args.data.Software = args.data.Software + 30;
            }
            args.cell.querySelector(".bar").style.width = args.data.Software + "%";
            args.cell.querySelector(".barlabel").textContent = args.data.Software + "%";
            if (args.data.Status === "Inactive") {
                args.cell.querySelector(".bar").classList.add("progressdisable");
            }
        }
    }
    onDataBound() {
        clearTimeout(this.clrIntervalFun);
        clearInterval(this.intervalFun);
        this.dtTime = true;
    }
    onComplete(args) {
        if (args.requestType === "filterchoicerequest") {
            if (args.filterModel.options.field === "Trustworthiness" || args.filterModel.options.field === "Rating" || args.filterModel.options.field === "Status") {
                var span = args.filterModel.dialogObj.element.querySelectorAll('.e-selectall')[0];
                if (!isNullOrUndefined(span)) {
                    closest(span, '.e-ftrchk').classList.add("e-hide");
                }
            }
        }
    }
    onChange() {
        this.ddObj.hidePopup();
        this.gridInstance.showSpinner();
        this.dropSlectedIndex = null;
        let index = this.ddObj.value;
        clearTimeout(this.clrIntervalFun2);
        this.clrIntervalFun2 = setTimeout(() => {
            this.isDataChanged = true;
            this.stTime = null;
            let contentElement = this.gridInstance.contentModule.getPanel().firstChild;
            contentElement.scrollLeft = 0;
            contentElement.scrollTop = 0;
            this.gridInstance.pageSettings.currentPage = 1;
            this.stTime = performance.now();
            this.gridInstance.dataSource = getData(index);
            this.gridInstance.hideSpinner();
        }, 100);
    }
    onLoad(args) {
        document.getElementById('overviewgrid').ej2_instances[0].on('data-ready', () => {
            this.dReady = true;
            this.stTime = performance.now();
        });
        document.getElementById('overviewgrid').addEventListener('DOMSubtreeModified', () => {
            if (this.dReady && this.stTime && this.isDataChanged) {
                let msgEle = document.getElementById('msg');
                let val = (performance.now() - this.stTime).toFixed(0);
                this.stTime = null;
                this.dReady = false;
                this.dtTime = false;
                this.isDataChanged = false;
                msgEle.innerHTML = 'Load Time: ' + "<b>" + val + "</b>" + '<b>ms</b>';
                msgEle.classList.remove('e-hide');
            }
        });
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
        <div>
        <DropDownListComponent id="games" width='220' dataSource={this.ddlData} index={0} ref={(dropdownlist) => { this.ddObj = dropdownlist; }} fields={this.fields} change={this.onChange.bind(this)} placeholder="Select a Data Range" popupHeight="240px"/>
        <span id='msg'></span>
        <br />
        </div>
          <GridComponent id="overviewgrid" dataSource={this.getTradeData} enableHover={false} enableVirtualization={true} rowHeight={38} height='600' ref={(g) => { this.gridInstance = g; }} actionComplete={this.onComplete.bind(this)} load={this.onLoad.bind(this)} queryCellInfo={this.onQueryCellInfo.bind(this)} dataBound={this.onDataBound.bind(this)} filterSettings={this.Filter} allowFiltering={true} allowSorting={true} allowSelection={true} selectionSettings={this.select}>
            <ColumnsDirective>
            <ColumnDirective type='checkbox' allowSorting={false} allowFiltering={false} width='60'></ColumnDirective>
              <ColumnDirective field='EmployeeID' visible={false} headerText='Employee ID' isPrimaryKey={true} width='130'></ColumnDirective>
              <ColumnDirective field='Employees' headerText='Employee Name' width='230' clipMode='EllipsisWithTooltip' template={empTemplate} filter={this.check}/>
              <ColumnDirective field='Designation' headerText='Designation' width='170' filter={this.check} clipMode='EllipsisWithTooltip'/>
              <ColumnDirective field='Mail' headerText='Mail' filter={this.Filter} width='230'></ColumnDirective>
              <ColumnDirective field='Location' headerText='Location' width='140' filter={this.check} template={coltemplate}></ColumnDirective>
              <ColumnDirective field='Status' headerText='Status' filter={this.status} template={statusTemplate} width='130'></ColumnDirective>
              <ColumnDirective field='Trustworthiness' filter={this.trust} headerText='Trustworthiness' template={trustTemplate} width='160'></ColumnDirective>
              <ColumnDirective field='Rating' headerText='Rating' filter={this.rating} template={ratingTemplate} width='160'/>
              <ColumnDirective field='Software' allowFiltering={false} allowSorting={false} headerText='Software Proficiency' width='180' template={progessTemplate} format='C2'/>
              <ColumnDirective field='CurrentSalary' headerText='Current Salary' filter={this.Filter} width='160' format='C2'></ColumnDirective>
              <ColumnDirective field='Address' headerText='Address' width='240' filter={this.Filter} clipMode="EllipsisWithTooltip"></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Filter, VirtualScroll, Sort]}/>
          </GridComponent>
        </div>  
        <style>
            @import 'src/grid/Grid/style.css';
        </style>

</div>);
    }
}