import React from 'react'

// grab all the category most_common data and display it in tabular form
// in a final solution I would probbaly add in suitable charting 
// - however some of the category data here is better suited to one chart type than another - I think it needs more thought
const DatasetCategoriesMostCommon = ({ dataset }) => {

  let rowCount = parseInt(dataset.stats.row_count);
  let categories = dataset.stats.categories;

  const total = (frequency) => {
    // Assumption here that frequency is amongst all values and not just 'not nulls'
    // generate total and round up
    return Math.round(rowCount*frequency);
  }

  const top10 = (array) => {
    let max = 10
    // sort the data into frequency order
    let sorted = array.sort(function(a, b){
      return b.frequency-a.frequency
    })
    //Grab the top 10 from the sorted array as we don't want a long list 
    return sorted.slice(0, max);
  }

  // added in a console logger for jsx loop testing
  const ConsoleLog = ({ children }) => {
    console.log(children);
    return null;
  };

  // display category most common data - create table for each set
  // added bootstrap to make the tables tidier - added in some responsiveness
  // added in conditionals for data without categories or values
    return (
    <div className="mb-5">
      <h5 className="border-bottom pb-2 border-bottom-1 text-primary">Categories - Most Common</h5>
        {/*<pre>{JSON.stringify(categories, null, 2)}</pre>*/}
        {categories.length > 0 ?
        <div>
          <ConsoleLog>{ categories }</ConsoleLog>
            {categories.map((category, index) => (
            <React.Fragment key={index}>
              <h6 className="mt-3 text-secondary">{category.name} (ID:{category.id}) {category.best_representation.statistics.most_common.length > 10 ? <span>- Top 10 Displayed</span> : ""}</h6>
              <div className="table-responsive">
                <table className="table table-striped mb-4">
                  <thead><tr><th>Representation ID</th><th>Representation Name</th><th>Value</th><th>Total</th><th>%</th></tr></thead>
                  <tbody>
                  {category.best_representation.statistics.most_common.length > 0 ?
                      <React.Fragment>
                        <ConsoleLog>{ category.best_representation.statistics.most_common }</ConsoleLog>
                        { top10(category.best_representation.statistics.most_common).map((categoryValue, index) => (
                          <tr key={index}><td>{category.best_representation.representation_id}</td><td>{category.best_representation.representation_name}</td><td>{categoryValue.value.text}</td><td>{total(categoryValue.frequency)}</td><td>{Math.round(categoryValue.frequency * 100000) / 1000}</td></tr>
                        ))}
                      </React.Fragment>
                    : <tr><td colSpan={7} className="text-danger">No Values found</td></tr>
                  }
                  </tbody>
                  </table>
                </div>
              </React.Fragment>
          ))}
        </div>
        : <div className="text-danger">No Categories found</div>
    }
    </div>
  )
};

export default DatasetCategoriesMostCommon