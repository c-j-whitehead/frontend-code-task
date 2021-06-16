import React from 'react'
import { Doughnut } from 'react-chartjs-2';

// grab all the key data and display it in tabular form
// get the overview data for each key and display it in a doughnut using chart.js
const DatasetKeys = ({ dataset }) => {
  
  let rowCount = parseInt(dataset.stats.row_count);
  let keys = dataset.stats.keys;
  
  // process null values and round up
  // would probbaly add in some error trapping on the values in a final solution
  const processNulls = (key) => {
    let value = Number(key.null_fraction);
    //if (isNaN(value)) return "-";
    return Math.round(rowCount * value);
  }

  // process null values - if value inverse then calculate total by inverting and multiplying by the row count
  // rounded up totals to avoid long floats
  // would probbaly add in some error trapping on the values in a final solution
  const processDistinct = (key) => {
    let value = Number(key.distinct);
    //if (isNaN(value)) return "-"
    if (Math.sign(value)===-1) return Math.round(Math.abs(value) * rowCount)
    return value
  }

  // calculate the duplicate totals from the dervied distinct and null values
  const processDuplicates = (key) => {
    let duplicates = (rowCount - processDistinct(key) - processNulls(key));
    return duplicates
  }

  // generate doughnut chart data values from the key data for use by chart.js
  const generateChartData = (key) => {
    let data = {
    labels: ["Null Values","Distinct Values","Duplicate Values"],
    datasets: [{
      label: key.label,
      data: [processNulls(key),processDistinct(key),processDuplicates(key)],
      backgroundColor: [
      '#2BC2C2',
      '#4C90BA',
      '#F4B811'
      ],
      hoverOffset: 4
    }]
  };
  return data
  }

  // added in a console logger for jsx loop testing
  const ConsoleLog = ({ children }) => {
    console.log(children);
    return null;
  };
  
  // display all keys and totals in table and related charts
  // added bootstrap to make the tables tidier - added in some responsiveness
  // add in conditional for data without keys and display message
  return (
    <div className="mb-5">
      <h5 className="border-bottom pb-2 border-bottom-1 text-primary">Keys - Overview</h5>
      {/*<pre>{JSON.stringify(keys, null, 2)}</pre>*/}
      {keys.length > 0 ?
        <div className="table-responsive">
        <ConsoleLog>{ keys }</ConsoleLog>
        <table className="table table-striped">
          <thead><tr><th>ID</th><th>Label</th><th>Total Rows</th><th>Null Values</th><th>Distinct Values</th><th>Duplicate Values</th></tr></thead>
          <tbody>
            {keys.map((key, index) => (
              <tr key={index}><td>{key.id}</td><td>{key.label}</td><td>{rowCount}</td><td>{processNulls(key)}</td><td>{processDistinct(key)}</td><td>{processDuplicates(key)}</td></tr>
            ))}
          </tbody>
          </table>
          {keys.map((key, index) => (
            <div className="col-8 col-lg-4 mx-auto" key={index}>
              <div className="text-center mt-3"><h6>{key.label}</h6></div>
              <Doughnut
                data={generateChartData(key)}
                type="doughnut" />
            </div>
          ))}
        </div>
        : <div className="text-danger">No Keys found</div> 
      }

    </div>
  )
};

export default DatasetKeys