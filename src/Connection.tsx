import { Container, Table } from "@mantine/core";
import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import duration from "dayjs/plugin/duration";

dayjs.extend(customParseFormat);
dayjs.extend(duration);

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
      <Table.Tr key={connection.from.departure}>
        <Table.Td>
          {departureFormatted}
          {isDelayed && delayedDisplay}
        </Table.Td>
        <Table.Td>
          {arrivalFormatted}
          {isDelayed && delayedDisplayArrival}
        </Table.Td>
        <Table.Td>
          {connection.products}
          {connection.from.platform && " - Gl. " + connection.from.platform}
          {" - "}
          {durationFormatted}
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Departure</Table.Th>
          <Table.Th>Arrival</Table.Th>
          <Table.Th>Details</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}

export default function Connection({ from, to }) {
  const [connections, setConnections] = useState([]);

  const loadConnections = async () => {
    console.log("connections", from, to);

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
  };

  useEffect(() => {
    loadConnections();
  }, [from]);

  return (
    <Container>
      <p>
        {from} - {to}
      </p>
      <ConnectionTable connections={connections} />
    </Container>
  );
}
