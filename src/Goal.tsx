import React from "react";
import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useGoal } from "./GoalLayout";
import ReactMarkdown from "react-markdown";
import { NoticeProps } from "react-select";

type GoalProps = {
  onDelete: (id: string) => void;
};

export function Goal({ onDelete }: GoalProps) {
  const goal = useGoal();
  const navigate = useNavigate();

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>{goal.title}</h1>
          {goal.tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className="flex-wrap">
              {goal.tags.map((tag) => (
                <Badge className="text-truncate" key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={`/${goal.id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>
            <Button
              onClick={() => {
                onDelete(goal.id);
                navigate("/");
              }}
              variant="outline-danger"
            >
              Delete
            </Button>
            <Link to="/">
              <Button variant="outline-secondary">Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{goal.markdown}</ReactMarkdown>
    </>
  );
}
