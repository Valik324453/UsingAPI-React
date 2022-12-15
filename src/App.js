import "./App.css";
import { useEffect, useState } from "react";
import background from "./img/background.jpg";

import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

function App() {
  const [data, setData] = useState([]);
  const [planetId, setPlanetId] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const api = await fetch("https://swapi.dev/api/planets/?format=json");
    const json = await api.json();
    setData(json.results);
  }

  return (
    <div className="main" style={{ backgroundImage: `url(${background})` }}>
      {data.length > 0 ? (
        <div className="context">
          <div className="text">
            <Card style={{ width: "16rem" }}>
              <Form.Select
                onChange={(e) => setPlanetId(e.target.value)}
                value={planetId}
              >
                {data
                  ? Object.keys(data).map((i) => (
                      <option value={i}>{data[i].name}</option>
                    ))
                  : ""}
              </Form.Select>

              <Card.Img variant="top" src={data[planetId].name + ".jpg"} />
              <Card.Body className="card">
                <Card.Title></Card.Title>
                <Card.Text>
                  <p>
                    Rotation period: {data[planetId].rotation_period}
                    <br />
                    Orbital period: {data[planetId].orbital_period}
                    <br />
                    Climate: {data[planetId].climate}
                    <br />
                    Gravity: {data[planetId].gravity}
                    <br />
                    Terrain: {data[planetId].terrain}
                    <br />
                    Surface water: {data[planetId].surface_water}
                    <br />
                    Population: {data[planetId].population}
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      ) : (
        "Loading results..."
      )}
    </div>
  );
}

export default App;
