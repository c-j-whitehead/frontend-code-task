import React from 'react'
import DatasetKeys from '../components/DatasetKeys'
import DatasetCategories from '../components/DatasetCategories'
import DatasetCategoriesMostCommon from '../components/DatasetCategoriesMostCommon'

const ListDatasets = ({ datasets }) => {

  // format the dates for user friendly viewing
  function formatDate(d) {
    let date = new Date(d);
    let formatted = new Intl.DateTimeFormat('en-GB', { dateStyle: 'short', timeStyle: 'short' }).format(date);
    return formatted;
  }

  // set up cards to take each iterated dataset
  // add dates to datset card footer
  return (
    <div>
      {datasets.map((dataset, index) => (
        <div className="card mb-5" key={index}>
          <div className="card-header bg-primary text-white">Name: <strong>{dataset.name}</strong></div>
          <div className="card-body">
            <DatasetKeys dataset={dataset}></DatasetKeys>
            <DatasetCategories dataset={dataset}></DatasetCategories>
            <DatasetCategoriesMostCommon dataset={dataset}></DatasetCategoriesMostCommon>
          </div>
          <div className="card-footer text-secondary">
            Created: {formatDate(dataset.created_at)} / Updated: {formatDate(dataset.updated_at)}
          </div>
        </div>
        
      ))}
    </div>
  )
};

export default ListDatasets