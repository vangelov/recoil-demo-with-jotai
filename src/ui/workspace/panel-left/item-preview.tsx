import { memo } from "react";
import { State } from "state";
import "./item-preview.css";
import { Server } from "server";
import { Loader } from "ui/base/loader";
import { Data } from "data";

type Props = {
  itemId: string;
  isSelected: boolean;
};

export const ItemPreview = memo(({ itemId, isSelected }: Props) => {
  const item = State.Workspace.useItemWithId(itemId);
  const isChart = item.type === "chart";

  const chartSeriesQuery = Server.useLoadChartSeries({
    id: item.id,
    enabled: isChart,
  });

  const shouldShowLoader = isChart && chartSeriesQuery.state === "loading";

  return (
    <div
      className="ItemPreview"
      style={{ background: isSelected ? "var(--color-blue-1)" : undefined }}
    >
      {shouldShowLoader ? (
        <Loader />
      ) : (
        <>
          <div className="ItemPreview-Label" title={item.label}>
            {item.label}
          </div>
          <div className="ItemPreview-Position">
            {Data.Positions.toString(item.position)}
          </div>
        </>
      )}
    </div>
  );
});
