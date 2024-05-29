import {
  Flex,
  Grid,
  Button,
  Text,
  Badge,
  Card,
  Group,
  Container,
  NativeSelect,
  Radio,
} from "@mantine/core";
import Connection from "./Connection";
import { useState } from "react";
import groupsOriginal from "./groupsOriginal";

const GroupView = ({ group, swapConnections }) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>
          {group.from} - {group.to}
        </Text>
        <Button variant="subtle" onClick={handleRefresh}>
          Reload
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
          <Connection refreshKey={refreshKey} {...connection} />
        ))}
      </Flex>
    </Card>
  );
};

function swapFromToSingle(group) {
  return {
    from: group.to,
    to: group.from,
    connections: group.connections
      .slice()
      .reverse()
      .map((connection) => ({
        from: connection.to,
        to: connection.from,
      })),
    //   connections: group.connections,
  };
}

function swapFromTo(groups) {
  return groups.map((group) => swapFromToSingle(group));
}

export default function Overview() {
  const [groups, setGroups] = useState(groupsOriginal);
  const [selectedGroupIndex, setSelectedGroupIndex] = useState("0");

  const selectedGroup = groups[parseInt(selectedGroupIndex)];
  const selectedGroupInverted = swapFromToSingle(selectedGroup);
  // const swapConnections = () => {
  //   const swappedGroups = swapFromTo(groups);
  //   setGroups(swappedGroups);
  // };

  return (
    <Container>
      <Radio.Group value={selectedGroupIndex} onChange={setSelectedGroupIndex}>
        <Group mt="xs">
          {groups.map((group, index) => (
            <Radio key={index} value={`${index}`} label={group.to} />
          ))}
        </Group>
      </Radio.Group>

      <GroupView group={selectedGroup} />
      <GroupView group={selectedGroupInverted} />
    </Container>
  );
}
