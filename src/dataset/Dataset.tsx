import React, {useEffect, useState} from 'react';
import { getDatasets } from '../api/api';
import ListDatasets  from '../components/ListDatasets'

const Dataset: React.FC = () => {

  //set a state for the datasets
  const [datasets, setDatasets] = React.useState([]);

  // set a useffecthook  to load the data on render
  // set the data and catch any errors to console
  React.useEffect(() => {
          const getAllDatasets = async () => {
            try {
                  const result = await getDatasets();
                  console.table(result);
                  setDatasets(result);
              } catch (e) {
                  console.log(e);
              }
          };
          getAllDatasets();
      }, []);

  return (
    <div>
      <h1 className="text-primary mb-4">Dataset Statistics</h1>
      <ListDatasets datasets={datasets} />
    </div>
  )

};

export default Dataset;
