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

export default function OwnerWisePendingTasks() {
  const { data: tasks } = useFetch("/tasks");

  if (!tasks) return null;

  const pendingStatuses = ["To Do", "In Progress"];

  const owners = [
    ...new Set(tasks.flatMap((task) => task.owners?.map((o) => o.name) || [])),
  ];

  // Count pending tasks for each owner
  const pendingCountByOwner = owners.map(
    (owner) =>
      tasks.filter(
        (task) =>
          pendingStatuses.includes(task.status) &&
          task.owners?.some((o) => o.name === owner)
      ).length
  );

  const colorPalette = [
    "#FF9800",
    "#2196F3",
    "#4CAF50",
    "#E91E63",
    "#9C27B0",
    "#3F51B5",
    "#00BCD4",
    "#8BC34A",
    "#FFC107",
    "#FF5722",
  ];

  // Generate background colors matching number of owners
  const backgroundColors = owners.map(
    (_, i) => colorPalette[i % colorPalette.length]
  );

  const chartData = {
    labels: owners,
    datasets: [
      {
        label: "Pending Tasks",
        data: pendingCountByOwner,
        backgroundColor: backgroundColors,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
      title: {
        display: true,
        text: "Total Pending Tasks",
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
