import React, { useCallback, useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import 'devextreme/dist/css/dx.light.css';
import PivotGrid, { Export, FieldChooser, FieldPanel, HeaderFilter, PivotGridRef, Search } from 'devextreme-react/pivot-grid';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import 'devextreme/dist/css/dx.light.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { sales } from './data';


function App() {
  const [searchEnabled, setSearchEnabled] = useState(true);
  const [showRelevantValues, setShowRelevantValues] = useState(true);

  const dataSource = new PivotGridDataSource({
    fields: [
      {
        caption: 'Region',
        width: 120,
        dataField: 'region',
        area: 'row',
        sortBySummaryField: 'Total',
      },
      {
        caption: 'City',
        dataField: 'city',
        width: 150,
        area: 'row',
      },
      {
        dataField: 'date',
        dataType: 'date',
        area: 'column',
      },
      {
        groupName: 'date',
        groupInterval: 'month',
        visible: false,
      },
      {
        caption: 'Total',
        dataField: 'amount',
        dataType: 'number',
        summaryType: 'sum',
        format: 'currency',
        area: 'data',
      },
    ],
    store: sales,
  });



// Apply Css Dynamically  Start
// you can change style and behavior of grid as needed or conditionally

  // apply css on Column Header 
const customizeHeaderCells = useCallback((e:any) => {
  if (e.area === "column") {
      e.cellElement.style.backgroundColor = '#007CC0';
      e.cellElement.style.color = '#F2F2F2';
  }

  // apply perticular cell on condition
  if (e.cell.rowPath && e.cell.rowPath[0] === 'North' && e.cell.columnPath && e.cell.columnPath[0] === 'Coffee') {
    e.cellElement.style.backgroundColor = 'lightblue';
    e.cellElement.style.fontWeight = 'bold';
}
// apply css  on all cell
if (e.cell.rowPath) {
  e.cellElement.style.cursor= 'pointer';
}

///Apply on Data Area
if (e.area === "data" ) {
  e.cellElement.addEventListener('mouseover', () => {
      e.cellElement.style.backgroundColor = 'lightyellow';
  });
  e.cellElement.addEventListener('mouseout', () => {
      e.cellElement.style.backgroundColor = '';
  });
}

}, []);
// Apply Css Dynamically  End


  return (
    <div className="App">
      <div className="container mt-5">
        <div className="row w-100">
          <PivotGrid  
                      id="pivotgrid" 
                      showBorders={true}      
                      allowExpandAll={true}  
                      onCellPrepared={customizeHeaderCells} 
                      dataSource={dataSource} 
                      allowSorting={true} 
                      allowFiltering={true}
                      height="500">
                     
            <FieldChooser enabled={true} height={400} />
            <Export enabled={true} />
            <FieldPanel visible={true} />
            <HeaderFilter
          showRelevantValues={showRelevantValues}
          width={300}
          height={400}
        >
          <Search enabled={searchEnabled} />
        </HeaderFilter>
          </PivotGrid>
        </div>
</div>
</div>
  );
}

export default App;
