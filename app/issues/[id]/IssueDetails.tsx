import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkDown from "react-markdown";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex className="space-x-3" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text> {issue.created.toDateString()}</Text>
      </Flex>
      <Card>
        <ReactMarkDown className="prose">{issue.description}</ReactMarkDown>
      </Card>
    </>
  );
};

export default IssueDetails;
