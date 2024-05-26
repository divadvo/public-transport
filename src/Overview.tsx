import {
  Flex,
  Grid,
  Button,
  Text,
  Badge,
  Card,
  Group,
  Container,
} from "@mantine/core";
import Connection from "./Connection";
import { useState } from "react";

const GroupView = ({ group, swapConnections }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>
          {group.from} - {group.to}
        </Text>
        <Button variant="subtle" onClick={(e) => swapConnections()}>
          Opposite
        </Button>
      </Group>

      <Flex
        mih={50}
        gap="md"
        justify="flex-start"
        align="flex-start"
        direction="row"
        wrap="wrap"
      >
        {group.connections.map((connection) => (
          <Connection {...connection} />
        ))}
      </Flex>
    </Card>
  );
};

const groupsOriginal = [
  {
    from: "Home",
    to: "Salsa",
    connections: [
      { from: "Zürich, Seebach", to: "Zürich Oerlikon, Bahnhof Ost" },
      { from: "Zürich Oerlikon", to: "Zürich Hardbrücke" },
    ],
  },
  {
    from: "Home",
    to: "HB",
    connections: [
      { from: "Zürich, Seebach", to: "Zürich Oerlikon, Bahnhof Ost" },
      { from: "Zürich Oerlikon", to: "Zürich HB" },
    ],
  },
  {
    from: "Home",
    to: "Altstetten",
    connections: [
      { from: "Zürich, Seebach", to: "Zürich Oerlikon, Bahnhof Ost" },
      { from: "Zürich Oerlikon", to: "Zürich Altstetten" },
    ],
  },
  {
    from: "Home",
    to: "Airport",
    connections: [{ from: "Zürich, Seebach", to: "Zürich Flughafen" }],
  },
];

function swapFromTo(groups) {
  return groups.map((group) => {
    return {
      from: group.to,
      to: group.from,
      connections: group.connections.reverse().map((connection) => ({
        from: connection.to,
        to: connection.from,
      })),
      //   connections: group.connections,
    };
  });
}

export default function Overview() {
  const [groups, setGroups] = useState(groupsOriginal);
  const swapConnections = () => {
    const swappedGroups = swapFromTo(groups);
    setGroups(swappedGroups);
  };

  return (
    <Container>
      {groups.map((group) => (
        <GroupView group={group} swapConnections={swapConnections} />
      ))}
    </Container>
  );
}
