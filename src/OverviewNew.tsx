import { useState, useEffect } from "react";
import groupsOriginal from "./groupsOriginal";
import axios from "axios";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import duration from "dayjs/plugin/duration";

dayjs.extend(customParseFormat);
dayjs.extend(duration);

const swapFromToSingle = (group) => {
  return {
    from: group.to,
    to: group.from,
    connections: group.connections
      .slice() // make a copy
      .reverse()
      .map((connection) => ({
        from: connection.to,
        to: connection.from,
      })),
  };
};

function ConnectionTable({ connections }) {
  const rows = connections.map((connection) => {
    const departure = dayjs(connection.from.departure);
    const departureFormatted = departure.format("HH:mm");
    const isDelayed = connection.from.delay > 0;
    const delayDay = dayjs.duration(connection.from.delay, "minutes");
    const delayFormatted = delayDay.format("m");
    const expectedDeparture = dayjs(connection.from.prognosis.departure);
    const expectedDepartureFormatted = expectedDeparture.format("HH:mm");

    const arrival = dayjs(connection.to.arrival);
    const arrivalFormatted = arrival.format("HH:mm");
    const expectedArrival = dayjs(connection.to.arrival).add(
      dayjs.duration(connection.from.delay, "minutes")
    );
    const expectedArrivalFormatted = expectedArrival.format("HH:mm");

    const durationFormatted = dayjs(connection.duration, "DDdHH:mm:ss").format(
      "m'"
    );

    const delayedDisplay = (
      <>
        {"+"}
        {delayFormatted} = {expectedDepartureFormatted}
      </>
    );

    const delayedDisplayArrival = (
      <>
        {"+"}
        {delayFormatted} = {expectedArrivalFormatted}
      </>
    );

    return (
      <tr key={connection.from.departure}>
        <td>
          {departureFormatted}
          {isDelayed && delayedDisplay}
        </td>
        <td>
          {arrivalFormatted}
          {isDelayed && delayedDisplayArrival}
        </td>
        <td>{connection.products.join(", ")}</td>
        <td>{connection.from.platform}</td>
        <td>{durationFormatted}</td>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Departure</th>
          <th>Arrival</th>
          <th>Connection</th>
          <th>Platform</th>
          <th>Duration</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

const Connection = ({ from, to, refreshKey }) => {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastReloaded, setLastReloaded] = useState(null);

  const loadConnections = async () => {
    setLoading(true);
    const response = await axios.get(
      "https://transport.opendata.ch/v1/connections",
      {
        params: {
          from: from,
          to: to,
        },
      }
    );
    const result = response.data.connections;
    console.log("got data connections", from, to, result);
    setConnections(result);
    setLoading(false);
    setLastReloaded(dayjs().format("HH:mm:ss"));
  };

  useEffect(() => {
    loadConnections();
  }, [from, to, refreshKey]);

  return (
    <div>
      <div role="group">
        <p>
          {from} - {to}
        </p>
        <p>{loading && <span aria-busy="true">Loading...</span>}</p>
        <p>
          <small>Last Reloaded: {lastReloaded}</small>
        </p>
      </div>
      <ConnectionTable connections={connections} />
    </div>
  );
};

export default function OverviewNew() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    const selectedObject = groupsOriginal.find(
      (group) => group.to === selectedValue
    );
    setSelectedOption(selectedObject);
  };

  const [isTravellingBack, setIsTravellingBack] = useState(false);

  const handleCheckboxChange = () => {
    setIsTravellingBack(!isTravellingBack);
  };

  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const travellingOption = !isTravellingBack
    ? selectedOption
    : swapFromToSingle(selectedOption);

  return (
    <main class="container">
      <div role="group">
        <div>
          <fieldset>
            {groupsOriginal.map((group, index) => (
              <>
                <input
                  type="radio"
                  id={`option-${group.to}`}
                  name="travel-option"
                  value={group.to}
                  checked={selectedOption?.to === group.to}
                  onChange={handleChange}
                />
                <label htmlFor={`option-${group.to}`}>{group.to}</label>
              </>
            ))}
          </fieldset>
        </div>

        {selectedOption && (
          <div>
            <fieldset>
              <label>
                <input
                  type="checkbox"
                  checked={isTravellingBack}
                  onChange={handleCheckboxChange}
                />
                Travelling Back
              </label>
            </fieldset>
          </div>
        )}
      </div>

      {/* {selectedOption && (
        <div>
          <pre>{JSON.stringify(travellingOption, null, 2)}</pre>
        </div>
      )} */}

      {travellingOption && (
        <div>
          <div role="group">
            <h3>
              {travellingOption.from} - {travellingOption.to}
            </h3>
            <a onClick={handleRefresh}>Reload</a>
          </div>
          <div>
            {travellingOption.connections.map((connection) => (
              <Connection refreshKey={refreshKey} {...connection} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
