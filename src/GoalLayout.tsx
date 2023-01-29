import {
  Navigate,
  Outlet,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { Goal } from "./App";

type GoalLayoutProps = {
  goals: Goal[];
};

export function GoalLayout({ goals }: GoalLayoutProps) {
  const { id } = useParams();
  const goal = goals.find((n) => n.id === id);

  if (goal == null) return <Navigate to="/" replace />;

  return <Outlet context={goal} />;
}

export function useGoal() {
  return useOutletContext<Goal>();
}
