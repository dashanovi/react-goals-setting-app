import "bootstrap/dist/css/bootstrap.min.css";
import { useMemo } from "react";
import { Container } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import { NewGoal } from "./NewGoal";
import { useLocalStorage } from "./useLocalStorage";
import { v4 as uuidV4 } from "uuid";
import { GoalList } from "./GoalList";
import { GoalLayout } from "./GoalLayout";
import { Goal } from "./Goal";
import { EditGoal } from "./EditGoal";

export type Goal = {
  id: string;
} & GoalData;

export type GoalData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

export type RowGoal = {
  id: string;
} & RowGoalData;

export type RowGoalData = {
  title: string;
  markdown: string;
  tagIds: string[];
};

export type Tag = {
  id: string;
  label: string;
};

function App() {
  const [goals, setGoals] = useLocalStorage<RowGoal[]>("GOALS", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const goalsWithTags = useMemo(() => {
    return goals.map((goal) => {
      return {
        ...goal,
        tags: tags.filter((tag) => goal.tagIds.includes(tag.id)),
      };
    });
  }, [goals, tags]);

  function onCreateGoal({ tags, ...data }: GoalData) {
    setGoals((prevGoals) => {
      return [
        ...prevGoals,
        { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  }

  function onUpdateGoal(id: string, { tags, ...data }: GoalData) {
    setGoals((prevGoals) => {
      return prevGoals.map((goal) => {
        if (goal.id === id) {
          return { ...goal, ...data, tagIds: tags.map((tag) => tag.id) };
        } else {
          return goal;
        }
      });
    });
  }

  function onDeleteGoal(id: string) {
    setGoals((prevGoals) => {
      return prevGoals.filter((goal) => goal.id !== id);
    });
  }

  function onAddTag(tag: Tag) {
    setTags((prev) => [...prev, tag]);
  }

  function onUpdateTag(id: string, label: string) {
    setTags((prevTags) => {
      return prevTags.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label };
        } else {
          return tag;
        }
      });
    });
  }

  function onDeleteTag(id: string) {
    setTags((prevTags) => {
      return prevTags.filter((tag) => tag.id !== id);
    });
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={
            <GoalList
              goals={goalsWithTags}
              availableTags={tags}
              onUpdateTag={onUpdateTag}
              onDeleteTag={onDeleteTag}
            />
          }
        />
        <Route
          path="/new"
          element={
            <NewGoal
              onSubmit={onCreateGoal}
              onAddTag={onAddTag}
              availableTags={tags}
            />
          }
        />
        <Route path="/:id" element={<GoalLayout goals={goalsWithTags} />}>
          <Route index element={<Goal onDelete={onDeleteGoal} />} />
          <Route
            path="edit"
            element={
              <EditGoal
                onSubmit={onUpdateGoal}
                onAddTag={onAddTag}
                availableTags={tags}
              />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default App;
