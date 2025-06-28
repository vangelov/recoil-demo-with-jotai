import { WorkspaceChartItem } from "types";
import "./content-chart.css";
import { Server } from "server";
import { ReactNode, useLayoutEffect } from "react";
import { State } from "state";
import { Loader } from "ui/base/loader";

type Props = {
  item: WorkspaceChartItem;
};

export function ContentChart({ item }: Props) {
  const chartQuery = Server.useLoadChartSeries({ id: item.id });
  const updateItem = State.Workspace.useUpdateItem();

  let children: ReactNode = null;

  if (chartQuery.state === "loading") {
    children = <Loader />;
  } else if (chartQuery.state === "hasError") {
    children = "error";
  } else if (chartQuery.state === "hasData" && chartQuery.data) {
    const series = chartQuery.data;

    children = (
      <div style={{ width: "100%", paddingLeft: 5, paddingRight: 5 }}>
        <div className="ContentChart-Series">
          {series.map((value, index) => (
            <div
              key={index}
              style={{
                width: 20,
                height: 100 * value,
                flexShrink: 0,
                backgroundColor: "#1189c7",
              }}
            />
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 15 }}>{item.label}</div>
      </div>
    );
  }

  useLayoutEffect(() => {
    if (chartQuery.state === "hasData" && chartQuery.data) {
      const series = chartQuery.data;

      updateItem({
        id: item.id,
        updates: {
          size: {
            width: series.length * 20 + (series.length - 1) * 5 + 2 * 5 + 2,
            height: 145,
          },
        },
      });
    }
  }, [chartQuery, updateItem, item.id]);

  return (
    <div
      className="ContentChart"
      style={{
        alignItems:
          chartQuery.state === "hasData" && chartQuery.data
            ? "flex-end"
            : "center",
      }}
    >
      {children}
    </div>
  );
}
