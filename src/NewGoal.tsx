import { GoalData, Tag } from "./App";
import { GoalForm } from "./GoalForm";

type NewGoalProps = {
  onSubmit: (data: GoalData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export function NewGoal({ onSubmit, onAddTag, availableTags }: NewGoalProps) {
  return (
    <>
      <h1 className="mb-4">New Goal</h1>
      <GoalForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
}
