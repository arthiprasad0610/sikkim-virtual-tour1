import { useState } from 'react';
import { planCircuit } from '../services/api.js';
export default function Planner() {
  const [monastery, setMonastery] = useState('');
  const [list, setList] = useState([]);
  const [plan, setPlan] = useState(null);
  function addMonastery() {
    if (!monastery) return;
    setList([...list, monastery]);
    setMonastery('');
  }
  async function planRoute() {
    const res = await planCircuit(list);
    setPlan(res);
  }
  return (
    <div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input placeholder="Add monastery" value={monastery} onChange={e => setMonastery(e.target.value)} />
        <button onClick={addMonastery}>Add</button>
        <button onClick={planRoute} disabled={!list.length}>Plan Circuit</button>
      </div>
      <div style={{ marginTop: 12 }}>
        <strong>Selected:</strong>
        <ul>
          {list.map((m,i) => <li key={i}>{m}</li>)}
        </ul>
      </div>
      {plan && (
        <div style={{ marginTop: 12 }}>
          <strong>Route:</strong>
          <ol>
            {plan.route.map(r => <li key={r.order}>{r.monastery}</li>)}
          </ol>
          <div>Estimated Distance: {plan.distanceKm} km</div>
        </div>
      )}
    </div>
  );
}
