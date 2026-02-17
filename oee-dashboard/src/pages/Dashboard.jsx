import { useMemo, useState } from "react";
import dayjs from "dayjs";
import DashboardBlock from "../components/DashboardBlock";
import { makeBlockData } from "../components/RandomDate";

export default function Dashboard() {
  const [range, setRange] = useState([null, null]);
  const [appliedRange, setAppliedRange] = useState(null);
  const [dateApplied, setDateApplied] = useState(false);
  const [seed, setSeed] = useState(1);
  

  const data = useMemo(() => makeBlockData(appliedRange, seed), [appliedRange, seed]);

  const [views, setViews] = useState({
    block1: "table",
    block2: "line",
    block3: "table",
    block4: "line",
  });

  const setView = (key, view) => setViews((v) => ({ ...v, [key]: view }));

const applyDates = () => {
  const [from, to] = range || [];

  if (!from || !to || from.isAfter(to)) return;

  setAppliedRange({
    from: from.format("YYYY-MM-DD"),
    to: to.format("YYYY-MM-DD"),
  });

  setDateApplied(true);
};


  return (
    <div className="grid">
      <DashboardBlock
        title="Общая эффективность загрузки оборудования"
        view={views.block1}
        onViewChange={(v) => setView("block1", v)}
        table={data.oeeTable}
        chart={data.oeeSeries}
        dateFilter={{
          value: range,
          onChange: setRange,
          onApply: applyDates,
          showHint: !dateApplied,
          hidden: dateApplied
        }}
/>


      <DashboardBlock
        title="Данные по загрузке оборудования"
        view={views.block2}
        onViewChange={(v) => setView("block2", v)}
        table={data.loadTable}
        chart={data.loadSeries}
        topFilters
      />

      <DashboardBlock
        title="Эффективность загрузки оборудования"
        view={views.block3}
        onViewChange={(v) => setView("block3", v)}
        table={data.metricsTable}
        chart={data.metricsSeries}
      />

      <DashboardBlock
        title="Общее время аварийных ситуаций"
        view={views.block4}
        onViewChange={(v) => setView("block4", v)}
        table={data.downtimeTable}
        chart={data.downtimeSeries}
        topFilters
      />
    </div>
  );
}
