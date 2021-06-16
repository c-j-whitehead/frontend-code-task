import React from 'react'

// grab all the category data and display it in tabular form
// in a final solution I would probbaly add in some charts for the data
const DatasetCategories = ({ dataset }) => {

  let rowCount = parseInt(dataset.stats.row_count);
  let categories = dataset.stats.categories;

  // process null values and round up
  // would probbaly add in some error trapping on the values in a final solution
  const processNulls = (category) => {
    let value = Number(category.best_representation.statistics.null_fraction);
    //if (isNaN(value)) return "-";
    return Math.round(rowCount * value);
  }

  // process null values - if value inverse then calculate total by inverting and multiplying by the row count
  // rounded up totals to avoid long floats
  // would probbaly add in some error trapping on the values in a final solution
  const processDistinct = (category) => {
    let value = Number(category.best_representation.statistics.distinct);
    //if (isNaN(value)) return "-"
    if (Math.sign(value)===-1) return Math.round(Math.abs(value) * rowCount)
    return value
  }

  // calculate the duplicate totals from the dervied distinct and null values
  const processDuplicates = (category) => {
    let difference = (rowCount - processDistinct(category) - processNulls(category));
    return difference
  }

  // added in a console logger for jsx loop testing
  const ConsoleLog = ({ children }) => {
    console.log(children);
    return null;
  };

  // display all categories and totals in tables
  // added bootstrap to make the tables tidier - added in some responsiveness
  // add in conditional for data without categories and display message
  return (
    <div className="mb-5">
      <h5 className="border-bottom pb-2 border-bottom-1 text-primary">Categories - Overview</h5>
        {/*<pre>{JSON.stringify(categories, null, 2)}</pre>*/}
        {categories.length > 0 ?
        <div className="table-responsive">
          <ConsoleLog>{ categories }</ConsoleLog>
          <table className="table table-striped">
            <thead><tr><th>ID</th><th>Label</th><th>Total Rows</th><th>Null Values</th><th>Distinct Values</th><th>Duplicate Values</th></tr></thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={index}><td>{category.id}</td><td>{category.name}</td><td>{rowCount}</td><td>{processNulls(category)}</td><td>{processDistinct(category)}</td><td>{processDuplicates(category)}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        : <div className="text-danger">No Categories found</div>
    }
    </div>
  )
};

export default DatasetCategories