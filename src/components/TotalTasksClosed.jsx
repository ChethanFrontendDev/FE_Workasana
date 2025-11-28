import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

import useFetch from "../hooks/useFetch";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title
);

export default function TotalTasksClosed({ ownerwise }) {
  const { data: tasks } = useFetch("/tasks");

  if (!tasks) return null;

  const closedTasks = tasks.filter((task) => task.status === "Closed");

  const teams = [...new Set(tasks.map((task) => task.team?.name))];
  const closedCountByTeam = teams.map(
    (team) => closedTasks.filter((task) => task.team?.name === team).length
  );

  const owners = [
    ...new Set(tasks.flatMap((task) => task.owners?.map((o) => o.name) || [])),
  ];
  const closedCountByOwners = owners.map(
    (owner) =>
      closedTasks.filter((task) => task.owners?.some((o) => o.name === owner))
        .length
  );

  const chartData = {
    labels: ownerwise ? owners : teams,
    datasets: [
      {
        label: "Closed Tasks",
        data: ownerwise ? closedCountByOwners : closedCountByTeam,
        backgroundColor: "#800000",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: `Total Tasks Closed — ${ownerwise ? "Owner Wise" : "Team Wise"}`,
        font: { size: 18, weight: "bold" },
        padding: 20,
      },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return <Bar data={chartData} options={options} />;
}
