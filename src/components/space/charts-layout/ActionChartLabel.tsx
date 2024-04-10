const RADIAN = Math.PI / 180;

type Props = {
  cx: number;
  cy: number;
  innerRadius: number;
  outerRadius: number;
  midAngle: number;
  percent: number;
  fill: string;
  type: string;
};

const ActionChartLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  fill,
  type,
}: Props): JSX.Element => {
  const radius = innerRadius + (outerRadius - innerRadius) * 1.15;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill={fill} fontSize={14} textAnchor={'middle'}>
      <tspan>{type}</tspan>
      <tspan x={x} y={y + 15}>{`${(percent * 100).toFixed(0)}%`}</tspan>
    </text>
  );
};

export default ActionChartLabel;
