import React, { useState, useEffect } from 'react';
import { SeatsioSeatingChart, Region, SeatsioDesigner  ,SeatingChart, EventManager} from '@seatsio/seatsio-react';
import './seat.css';

type ColorScheme = 'light' | 'dark'
type ChartState = SeatingChart | EventManager | null;

const SeatingArrangement = () => {
  const [unusedState, setUnusedState] = useState(0);
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const [shown, setShown] = useState(true);
  const region: Region = 'eu';
  const pricing = [
    { category: '1', price: 70 },
    { category: '2', price: 120 },
    { category: '3', price: 180 }
  ];
  const [chart, setChart] = useState<ChartState>(null);

  useEffect(() => {
    console.log("chart",chart);
  }, [chart]);

  return (
    <>
      <div className='tool'>
        <SeatsioDesigner
          secretKey="302d6735-9cc3-4ec7-bb2c-14a9595456b7"
          chartKey="833dc3d4-d17f-36a5-c964-7dd4c2bcad63"
          region="eu"
        />
      </div>
      <div className={['container mt-5', colorScheme].join(' ')}>
        <div className="text-center">
          <select
            title='select any one '
            onChange={e => setColorScheme(e.target.value as ColorScheme)}
            value={colorScheme}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
          <select
            title='select any one '
            onChange={e => setUnusedState(parseInt(e.target.value))}
            value={unusedState}>
            <option>0</option>
            <option>1</option>
          </select>
          <select
            title='select any one '
            onChange={e => setShown(e.target.value === 'true')}
            value={shown + ''}>
            <option value="true">visible</option>
            <option value="false">hidden</option>
          </select>
          <h1> demo</h1>
          <div id="chart">
            {shown &&
              <SeatsioSeatingChart
                workspaceKey="ce4adea1-e888-4336-8f70-f501dbffe5cf"
                event ="demo"
                colorScheme={colorScheme}
                region={region}
                chartJsUrl="https://cdn.seatsio.net/chart.js"
                pricing={pricing}
                onRenderStarted={createdChart => { setChart(createdChart) }}
              />
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default SeatingArrangement;
