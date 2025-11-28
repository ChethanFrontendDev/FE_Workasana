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

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title);

export default function WorkDoneByLastWeek() {
  const { data: tasks } = useFetch("/tasks");

  if (!tasks) return null;

  // -------------------------------------------------------
  // 1. Create last 7 days with date + day name
  // -------------------------------------------------------
  const today = new Date();
  const last7Days = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);

    const dateStr = d.toISOString().slice(0, 10); // yyyy-mm-dd
    const dayName = d.toLocaleDateString("en-US", { weekday: "short" }); // Mon, Tue...

    last7Days.push({
      date: dateStr,
      day: dayName,
    });
  }

  // -------------------------------------------------------
  // 2. Filter Completed tasks within the last 7 days
  // -------------------------------------------------------
  const completedTasks = tasks.filter(
    (task) =>
      task.status === "Completed" &&
      last7Days.some((d) => d.date === task.createdAt.slice(0, 10))
  );

  // -------------------------------------------------------
  // 3. Count Completed tasks for each of the last 7 days
  // -------------------------------------------------------
  const countsByDay = last7Days.map((d) => {
    return completedTasks.filter(
      (task) => task.createdAt.slice(0, 10) === d.date
    ).length;
  });

  // -------------------------------------------------------
  // 4. Prepare Chart Data
  // -------------------------------------------------------
  const chartData = {
    labels: last7Days.map((d) => d.day), // ["Mon", "Tue", ...]
    datasets: [
      {
        label: "Completed Tasks",
        data: countsByDay,
        backgroundColor: "#4CAF50",
      },
    ],
  };

  // -------------------------------------------------------
  // 5. Chart Options with Title
  // -------------------------------------------------------
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
      title: {
        display: true,
        text: "Tasks Done by Last Week",
        font: { size: 18, weight: "bold" },
        padding: 20,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}
