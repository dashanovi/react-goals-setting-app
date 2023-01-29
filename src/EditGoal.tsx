import { GoalData, Tag } from "./App";
import { GoalForm } from "./GoalForm";
import { useGoal } from "./GoalLayout";

type EditGoalProps = {
  onSubmit: (id: string, data: GoalData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export function EditGoal({ onSubmit, onAddTag, availableTags }: EditGoalProps) {
  const goal = useGoal();
  return (
    <>
      <h1 className="mb-4">Edit Goal</h1>
      <GoalForm
        title={goal.title}
        markdown={goal.markdown}
        tags={goal.tags}
        onSubmit={(data) => onSubmit(goal.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
}
